const Game = (() => {
  let state = 'idle';
  let paused = false;
  let currentRecipe = null;
  let currentFood = null;
  let currentDrink = null;
  let selectedDrink = null;
  let placedIngredients = new Set();
  let currentPantryIngredients = [];
  let timer = null;
  let dragDrop = null;

  function init() {
    AudioManager.init();
    applyTranslations();

    document.getElementById('btn-start').addEventListener('click', () => {
      AudioManager.playSFX('click');
      document.getElementById('btn-start').disabled = true;
      startGame();
    });
    document.getElementById('btn-submit').addEventListener('click', () => submitDish('manual'));
    document.getElementById('btn-play-again').addEventListener('click', showStartScreen);
    document.getElementById('timer-ring').addEventListener('click', togglePause);
    document.getElementById('btn-resume').addEventListener('click', togglePause);
    document.getElementById('btn-restart').addEventListener('click', () => {
      AudioManager.playSFX('click');
      startGame();
    });
    document.getElementById('drink-cabinet').addEventListener('click', () => { AudioManager.playSFX('click'); openDrinkModal(); });
    document.getElementById('btn-drink-done').addEventListener('click', () => { AudioManager.playSFX('click'); closeDrinkModal(); });
    document.getElementById('drink-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('drink-modal')) closeDrinkModal(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') togglePause();
    });

    document.getElementById('btn-mute').addEventListener('click', () => {
      const muted = AudioManager.toggleMute();
      const btn = document.getElementById('btn-mute');
      btn.textContent = muted ? '🔇' : '🔊';
      btn.classList.toggle('muted', muted);
    });

    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        AudioManager.playSFX('click');
        I18N.setLang(btn.dataset.lang);
        updateLangToggle();
        applyTranslations();
        refreshGameText();
      });
    });

    document.getElementById('btn-restart-game').addEventListener('click', () => {
      if (state !== 'playing') return;
      AudioManager.playSFX('click');
      if (paused) { timer.pause(); AudioManager.pauseBGM(); }
      else { timer.pause(); AudioManager.pauseBGM(); }
      document.getElementById('restart-overlay').style.display = 'flex';
    });

    document.getElementById('btn-restart-confirm').addEventListener('click', () => {
      AudioManager.playSFX('click');
      document.getElementById('restart-overlay').style.display = 'none';
      document.getElementById('pause-overlay').style.display = 'none';
      paused = false;
      startGame();
    });

    document.getElementById('btn-restart-cancel').addEventListener('click', () => {
      AudioManager.playSFX('click');
      document.getElementById('restart-overlay').style.display = 'none';
      if (!paused) { timer.resume(); AudioManager.resumeBGM(); }
    });

    updateLangToggle();
    showScreen('start');
  }

  function updateLangToggle() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === I18N.getLang());
    });
  }

  // Update all elements marked with data-i18n / data-i18n-html
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = I18N.t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = I18N.t(el.dataset.i18nHtml);
    });
  }

  function renderOrderBubble() {
    const container = document.getElementById('order-items');
    container.innerHTML = '';
    [[currentFood, 'food'], [currentDrink, 'drinks']].forEach(([item, folder]) => {
      if (!item) return;
      const div = document.createElement('div');
      div.className = 'order-item';
      div.innerHTML =
        '<img src="assets/images/' + folder + '/' + encodeURIComponent(item.file) + '" alt="' + orderItemName(item) + '">' +
        '<span>' + orderItemName(item) + '</span>';
      container.appendChild(div);
    });
  }

  // Refresh dynamic in-game text when language changes mid-game
  function refreshGameText() {
    if (!currentRecipe) return;
    if (currentFood || currentDrink) renderOrderBubble();
    if (state === 'scoring') {
      const nameEl = document.getElementById('score-recipe-name');
      if (nameEl) nameEl.textContent = recipeName(currentRecipe);
    }
    if (state === 'playing') {
      renderPantry(currentPantryIngredients);
      renderBowl();
      if (selectedDrink) {
        document.getElementById('counter-drink-name').textContent = orderItemName(selectedDrink);
      }
    }
  }

  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + name).classList.add('active');
  }

  function startGame() {
    state = 'playing';
    paused = false;
    document.getElementById('pause-overlay').style.display = 'none';
    const ring = document.getElementById('timer-ring');
    ring.classList.remove('urgent');
    document.getElementById('timer-progress').style.strokeDashoffset = '0';
    document.getElementById('timer-progress').style.stroke = '#FADD50';
    placedIngredients = new Set();

    const pool = RECIPES.slice();
    currentRecipe = pool[Math.floor(Math.random() * pool.length)];

    const customers = ['lady1', 'lady2', 'lady3', 'man1', 'man2', 'man3'];
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const customerImg = document.getElementById('customer-img');
    customerImg.classList.remove('entering');
    void customerImg.offsetWidth;
    customerImg.src = 'assets/images/customers/' + randomCustomer + '.png';
    customerImg.classList.add('entering');

    currentFood  = { file: currentRecipe.food, name: currentRecipe.name, nameEn: currentRecipe.nameEn };
    currentDrink = getRandomDrink();
    selectedDrink = null;
    renderOrderBubble();

    const counterDrink = document.getElementById('counter-drink');
    counterDrink.style.display = 'none';
    counterDrink.classList.remove('entering');
    document.getElementById('drink-modal').style.display = 'none';

    const bowl = document.getElementById('bowl-drop-zone');
    bowl.classList.remove('entering');
    void bowl.offsetWidth;
    bowl.classList.add('entering');

    const board = document.querySelector('.cutting-board');
    if (board) { board.classList.remove('entering'); void board.offsetWidth; board.classList.add('entering'); }

    const cabinet = document.getElementById('drink-cabinet');
    cabinet.classList.remove('entering');
    void cabinet.offsetWidth;
    cabinet.classList.add('entering');

    currentPantryIngredients = buildPantry(currentRecipe);
    renderPantry(currentPantryIngredients);
    renderBowl();

    if (dragDrop) dragDrop.destroy();
    dragDrop = new DragDrop({
      pantryEl:    document.getElementById('ingredients-grid'),
      bowlEl:      document.getElementById('bowl-drop-zone'),
      onAdd:       addIngredient,
      onRemove:    removeIngredient,
      onDragStart: () => AudioManager.playSFX('drag'),
    });
    dragDrop.init();

    if (timer) timer.stop();
    timer = new GameTimer({
      duration:   60,
      onTick:     updateTimer,
      onComplete: () => submitDish('timeout'),
    });

    animateLogoTransition(() => {
      showScreen('game');
      AudioManager.startBGM();
      timer.start();
    });
  }

  function animateLogoTransition(callback) {
    const container  = document.getElementById('game-container');
    const startLogo  = document.querySelector('.start-logo');
    const cRect = container.getBoundingClientRect();
    const lRect = startLogo.getBoundingClientRect();

    const fromX = lRect.left - cRect.left;
    const fromY = lRect.top  - cRect.top;
    const fromW = lRect.width;
    const fromH = lRect.height;

    // Destination: game logo (position: absolute; left:18; top:14; height:28px)
    const toH = 28;
    const toW = Math.round(fromW * toH / fromH);

    // Create a flying clone positioned over the canvas
    const clone = document.createElement('img');
    clone.src = 'assets/images/layout/logo.svg';
    Object.assign(clone.style, {
      position: 'absolute',
      left: fromX + 'px',
      top:  fromY + 'px',
      width:  fromW + 'px',
      height: fromH + 'px',
      zIndex: '999',
      pointerEvents: 'none',
      transformOrigin: 'center center',
    });
    container.appendChild(clone);
    startLogo.style.opacity = '0'; // hide original while clone flies

    // Phase 1 — elastic scale-up (230ms)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      clone.style.transition = 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)';
      clone.style.transform  = 'scale(1.38)';
    }));

    // Phase 2 — fly to top-left game logo position (starts at 240ms)
    setTimeout(() => {
      callback(); // show game screen, start timer & BGM

      const gameLogo = document.querySelector('.game-logo');
      if (gameLogo) gameLogo.style.opacity = '0'; // hide destination logo during flight

      clone.style.transition =
        'left 0.42s cubic-bezier(0.4,0,0.2,1),' +
        'top  0.42s cubic-bezier(0.4,0,0.2,1),' +
        'width  0.42s cubic-bezier(0.4,0,0.2,1),' +
        'height 0.42s cubic-bezier(0.4,0,0.2,1),' +
        'transform 0.42s ease-out';
      clone.style.transform = 'scale(1)';
      clone.style.left   = '18px';
      clone.style.top    = '14px';
      clone.style.width  = toW + 'px';
      clone.style.height = toH + 'px';

      // Phase 2 done — land, reveal game logo, re-enable start button
      setTimeout(() => {
        if (gameLogo) gameLogo.style.opacity = '1';
        clone.remove();
        document.getElementById('btn-start').disabled = false;
      }, 450);
    }, 240);
  }

  const CIRCUMFERENCE = 194.78; // 2π × 31

  function updateTimer(remaining) {
    document.getElementById('timer-count').textContent = remaining;

    const offset = CIRCUMFERENCE * (1 - remaining / 60);
    const progress = document.getElementById('timer-progress');
    progress.style.strokeDashoffset = offset;
    progress.style.stroke = remaining > 20 ? '#FADD50'
                           : remaining > 10 ? '#f59e0b'
                           :                  '#ef4444';

    document.getElementById('timer-ring').classList.toggle('urgent', remaining <= 10);
  }

  function renderPantry(ingredients) {
    const grid = document.getElementById('ingredients-grid');
    grid.innerHTML = '';
    ingredients.forEach((ing, index) => {
      const card = document.createElement('div');
      card.className = 'ingredient-card' + (placedIngredients.has(ing.id) ? ' in-bowl' : '');
      card.draggable = true;
      card.dataset.ingredientId = ing.id;
      card.style.animationDelay = (index * 0.04) + 's';
      card.innerHTML =
        '<img src="' + ingredientPath(ing.file) + '" alt="' + ingName(ing) + '">' +
        '<span>' + ingName(ing) + '</span>' +
        (placedIngredients.has(ing.id) ? '<div class="in-bowl-badge">✓</div>' : '');
      grid.appendChild(card);
    });
  }

  function renderBowl() {
    const bowl = document.getElementById('bowl-ingredients');
    const hint = document.getElementById('bowl-hint');
    const counter = document.getElementById('bowl-counter');
    bowl.innerHTML = '';

    const total = currentRecipe ? currentRecipe.ingredients.length : 0;
    const placed = placedIngredients.size;

    if (counter) {
      counter.textContent = placed + ' / ' + total;
      counter.classList.toggle('full', placed >= total && total > 0);
    }

    if (placed === 0) {
      hint.style.display = '';
      return;
    }
    hint.style.display = 'none';

    for (const id of placedIngredients) {
      const ing = getIngredientById(id);
      if (!ing) continue;
      const item = document.createElement('div');
      item.className = 'bowl-item';
      item.dataset.id = id;
      item.draggable = true;
      item.innerHTML =
        '<img src="' + ingredientPath(ing.file) + '" alt="' + ingName(ing) + '">' +
        '<button class="remove-btn" aria-label="Remove">×</button>';
      bowl.appendChild(item);
    }

    bowl.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeIngredient(btn.closest('.bowl-item').dataset.id);
      });
    });
  }

  function addIngredient(id) {
    if (state !== 'playing' || paused || placedIngredients.has(id)) return;
    if (placedIngredients.size >= currentRecipe.ingredients.length) return;
    placedIngredients.add(id);
    renderBowl();
    AudioManager.playSFX('drop');
    const card = document.querySelector('.ingredient-card[data-ingredient-id="' + id + '"]');
    if (card) {
      card.classList.add('in-bowl');
      if (!card.querySelector('.in-bowl-badge')) {
        const badge = document.createElement('div');
        badge.className = 'in-bowl-badge';
        badge.textContent = '✓';
        card.appendChild(badge);
      }
    }
  }

  function removeIngredient(id) {
    if (state !== 'playing') return;
    AudioManager.playSFX('click');
    placedIngredients.delete(id);
    renderBowl();
    const card = document.querySelector('.ingredient-card[data-ingredient-id="' + id + '"]');
    if (card) {
      card.classList.remove('in-bowl');
      const badge = card.querySelector('.in-bowl-badge');
      if (badge) badge.remove();
    }
  }

  function submitDish(reason) {
    if (state !== 'playing') return;
    state = 'scoring';
    if (timer) timer.stop();

    AudioManager.playSFX(reason === 'timeout' ? 'timeout' : 'success');

    const timeRemaining = timer ? timer.getRemaining() : 0;
    const result = calculateScore(currentRecipe, [...placedIngredients], timeRemaining, selectedDrink, currentDrink);
    showScore(result);
  }

  function showScore(result) {
    const nameEl = document.getElementById('score-recipe-name');
    if (nameEl) nameEl.textContent = recipeName(currentRecipe);

    animateNumber('score-number', result.total, 800);

    document.getElementById('score-accuracy').textContent     = result.correctness + '/40';
    document.getElementById('score-completeness').textContent = result.completeness + '/25';
    document.getElementById('score-speed').textContent        = result.speed + '/15';
    document.getElementById('score-drink').textContent        = result.drink + '/20';

    setTimeout(() => {
      setBar('score-bar-accuracy',     result.correctness / 40);
      setBar('score-bar-completeness', result.completeness / 25);
      setBar('score-bar-speed',        result.speed / 15);
      setBar('score-bar-drink',        result.drink / 20);
    }, 150);

    renderReveal(result);
    showScreen('score');
  }

  function setBar(id, fraction) {
    document.getElementById(id).style.width = Math.round(fraction * 100) + '%';
  }

  function animateNumber(id, target, duration) {
    const el = document.getElementById(id);
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(t * target);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderReveal(result) {
    const container = document.getElementById('ingredient-reveal');
    container.innerHTML = '';

    function makeRevealItem(ing, statusClass, label) {
      const el = document.createElement('div');
      el.className = 'reveal-item ' + statusClass;
      el.innerHTML =
        '<img src="' + ingredientPath(ing.file) + '" alt="' + ingName(ing) + '">' +
        '<span>' + ingName(ing) + '</span>' +
        '<div class="reveal-badge">' + label + '</div>';
      return el;
    }

    const recipeSection = document.createElement('div');
    recipeSection.className = 'reveal-section';
    recipeSection.innerHTML = '<h4>' + I18N.t('recipeSection') + '</h4>';
    const recipeGrid = document.createElement('div');
    recipeGrid.className = 'reveal-grid';

    for (const id of currentRecipe.ingredients) {
      const ing = getIngredientById(id);
      if (!ing) continue;
      const isCorrect = result.correctIds.includes(id);
      recipeGrid.appendChild(
        makeRevealItem(ing, isCorrect ? 'reveal-correct' : 'reveal-missing', isCorrect ? '✓' : '✗')
      );
    }
    recipeSection.appendChild(recipeGrid);
    container.appendChild(recipeSection);

    if (result.wrongIds.length > 0) {
      const wrongSection = document.createElement('div');
      wrongSection.className = 'reveal-section';
      wrongSection.innerHTML = '<h4>' + I18N.t('wrongSection') + '</h4>';
      const wrongGrid = document.createElement('div');
      wrongGrid.className = 'reveal-grid';
      for (const id of result.wrongIds) {
        const ing = getIngredientById(id);
        if (ing) wrongGrid.appendChild(makeRevealItem(ing, 'reveal-wrong', '✗'));
      }
      wrongSection.appendChild(wrongGrid);
      container.appendChild(wrongSection);
    }
  }

  function openDrinkModal() {
    if (state !== 'playing' || paused) return;
    const grid = document.getElementById('drink-grid');
    grid.innerHTML = '';
    DRINKS.forEach(drink => {
      const tile = document.createElement('div');
      const isSelected = selectedDrink && selectedDrink.file === drink.file;
      tile.className = 'drink-tile' + (isSelected ? ' selected' : '');
      tile.innerHTML =
        '<img src="assets/images/drinks/' + encodeURIComponent(drink.file) + '" alt="' + orderItemName(drink) + '">' +
        '<span>' + orderItemName(drink) + '</span>';
      tile.addEventListener('click', () => {
        AudioManager.playSFX('drop');
        selectedDrink = drink;
        grid.querySelectorAll('.drink-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
      });
      grid.appendChild(tile);
    });
    document.getElementById('drink-modal').style.display = 'flex';
  }

  function closeDrinkModal(confirm = true) {
    document.getElementById('drink-modal').style.display = 'none';
    if (confirm && selectedDrink) renderCounterDrink();
  }

  function renderCounterDrink() {
    const img  = document.getElementById('counter-drink-img');
    const name = document.getElementById('counter-drink-name');
    const el   = document.getElementById('counter-drink');
    img.src  = 'assets/images/drinks/' + encodeURIComponent(selectedDrink.file);
    img.alt  = orderItemName(selectedDrink);
    name.textContent = orderItemName(selectedDrink);
    el.classList.remove('entering');
    void el.offsetWidth;
    el.style.display = 'flex';
    el.classList.add('entering');
  }

  function togglePause() {
    if (state !== 'playing') return;
    AudioManager.playSFX('click');
    paused = !paused;
    const overlay = document.getElementById('pause-overlay');
    if (paused) {
      timer.pause();
      AudioManager.pauseBGM();
      overlay.style.display = 'flex';
    } else {
      timer.resume();
      AudioManager.resumeBGM();
      overlay.style.display = 'none';
    }
  }

  function showStartScreen() {
    state = 'idle';
    if (timer) { timer.stop(); timer = null; }
    // Reset any inline opacity left by the logo animation
    const startLogo = document.querySelector('.start-logo');
    const gameLogo  = document.querySelector('.game-logo');
    if (startLogo) startLogo.style.opacity = '';
    if (gameLogo)  gameLogo.style.opacity  = '';
    document.getElementById('btn-start').disabled = false;
    showScreen('start');
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Game.init());
