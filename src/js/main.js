const Game = (() => {
  let state = 'idle';
  let paused = false;
  let currentRecipe = null;
  let placedIngredients = new Set();
  let currentPantryIngredients = [];
  let timer = null;
  let dragDrop = null;

  function init() {
    AudioManager.init();
    applyTranslations();

    document.getElementById('btn-start').addEventListener('click', startGame);
    document.getElementById('btn-submit').addEventListener('click', () => submitDish('manual'));
    document.getElementById('btn-play-again').addEventListener('click', showStartScreen);
    document.getElementById('btn-pause').addEventListener('click', togglePause);
    document.getElementById('btn-resume').addEventListener('click', togglePause);
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
        I18N.setLang(btn.dataset.lang);
        updateLangToggle();
        applyTranslations();
        refreshGameText();
      });
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

  // Refresh dynamic in-game text when language changes mid-game
  function refreshGameText() {
    if (!currentRecipe) return;
    const name = recipeName(currentRecipe);
    document.getElementById('order-text').textContent = name;
    document.getElementById('dish-name').textContent = name;
    if (state === 'scoring') {
      const nameEl = document.getElementById('score-recipe-name');
      if (nameEl) nameEl.textContent = name;
    }
    if (state === 'playing') {
      renderPantry(currentPantryIngredients);
      renderBowl();
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
    document.getElementById('btn-pause').textContent = '⏸';
    placedIngredients = new Set();

    const pool = RECIPES.slice();
    currentRecipe = pool[Math.floor(Math.random() * pool.length)];

    const name = recipeName(currentRecipe);
    const customerImg = document.getElementById('customer-img');
    customerImg.classList.remove('entering');
    void customerImg.offsetWidth; // force reflow to restart animation
    customerImg.src = 'assets/images/customers/' + currentRecipe.customer + '.png';
    customerImg.classList.add('entering');
    document.getElementById('order-text').textContent = name;
    document.getElementById('dish-name').textContent = name;

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

    showScreen('game');
    AudioManager.startBGM();
    timer.start();
  }

  function updateTimer(remaining) {
    const el = document.getElementById('timer-count');
    el.textContent = remaining;
    el.classList.toggle('urgent', remaining <= 10);
  }

  function renderPantry(ingredients) {
    const grid = document.getElementById('ingredients-grid');
    grid.innerHTML = '';
    for (const ing of ingredients) {
      const card = document.createElement('div');
      card.className = 'ingredient-card' + (placedIngredients.has(ing.id) ? ' in-bowl' : '');
      card.draggable = true;
      card.dataset.ingredientId = ing.id;
      card.innerHTML =
        '<img src="' + ingredientPath(ing.file) + '" alt="' + ingName(ing) + '">' +
        '<span>' + ingName(ing) + '</span>' +
        (placedIngredients.has(ing.id) ? '<div class="in-bowl-badge">✓</div>' : '');
      grid.appendChild(card);
    }
  }

  function renderBowl() {
    const bowl = document.getElementById('bowl-ingredients');
    const hint = document.getElementById('bowl-hint');
    bowl.innerHTML = '';

    if (placedIngredients.size === 0) {
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
      item.innerHTML =
        '<img src="' + ingredientPath(ing.file) + '" alt="' + ingName(ing) + '">' +
        '<span>' + ingName(ing) + '</span>' +
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
    const result = calculateScore(currentRecipe, [...placedIngredients], timeRemaining);
    showScore(result);
  }

  function showScore(result) {
    const nameEl = document.getElementById('score-recipe-name');
    if (nameEl) nameEl.textContent = recipeName(currentRecipe);

    animateNumber('score-number', result.total, 800);

    document.getElementById('score-accuracy').textContent    = result.correctness + '/50';
    document.getElementById('score-completeness').textContent = result.completeness + '/30';
    document.getElementById('score-speed').textContent       = result.speed + '/20';

    setTimeout(() => {
      setBar('score-bar-accuracy',     result.correctness / 50);
      setBar('score-bar-completeness', result.completeness / 30);
      setBar('score-bar-speed',        result.speed / 20);
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

  function togglePause() {
    if (state !== 'playing') return;
    paused = !paused;
    const overlay = document.getElementById('pause-overlay');
    const btnPause = document.getElementById('btn-pause');
    if (paused) {
      timer.pause();
      AudioManager.pauseBGM();
      overlay.style.display = 'flex';
      btnPause.textContent = '▶';
    } else {
      timer.resume();
      AudioManager.resumeBGM();
      overlay.style.display = 'none';
      btnPause.textContent = '⏸';
    }
  }

  function showStartScreen() {
    state = 'idle';
    if (timer) { timer.stop(); timer = null; }
    showScreen('start');
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Game.init());
