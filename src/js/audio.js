const AudioManager = (() => {
  const SFX = {
    drag:    'assets/audio/sfx/drag_master_of_dreams_wine_bottle_cork_pop_3_961.mp3',
    drop:    'assets/audio/sfx/drop_master_of_dreams_pop_08_559.mp3',
    success: 'assets/audio/sfx/success_master_of_dreams_christmas_bell_tree_3_without_windchimes_282.mp3',
    timeout: 'assets/audio/sfx/timeout_master_of_dreams_christmas_bell_tree_3_without_windchimes_282.mp3',
    click:   'assets/audio/sfx/click_master_of_dreams_tongue_click_7_824.mp3',
  };

  let bgm = null;
  const sfx = {};
  let muted = false;

  function init() {
    bgm = new Audio('assets/audio/bgm.mp3');
    bgm.loop = true;
    bgm.volume = 0.3;

    for (const [name, path] of Object.entries(SFX)) {
      const a = new Audio(path);
      a.preload = 'auto';
      sfx[name] = a;
    }
  }

  function startBGM() {
    if (!bgm || muted) return;
    bgm.currentTime = 0;
    bgm.play().catch(() => {});
  }

  function stopBGM() {
    if (!bgm) return;
    bgm.pause();
    bgm.currentTime = 0;
  }

  function pauseBGM() {
    if (!bgm) return;
    bgm.pause();
  }

  function resumeBGM() {
    if (!bgm || muted) return;
    bgm.play().catch(() => {});
  }

  function playSFX(name) {
    if (muted) return;
    const a = sfx[name];
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  function toggleMute() {
    muted = !muted;
    if (bgm) {
      if (muted) bgm.pause();
      else bgm.play().catch(() => {});
    }
    return muted;
  }

  return { init, startBGM, stopBGM, pauseBGM, resumeBGM, playSFX, toggleMute };
})();
