const I18N = (() => {
  const STRINGS = {
    de: {
      startTitle:    'Kitchen Challenge',
      startDesc:     'Ein Kunde bestellt ein Gericht. Leg die richtigen Zutaten in die Schüssel — ganz ohne Hinweise! Du hast <strong>60 Sekunden</strong>.',
      startBtn:      'Jetzt kochen!',
      orderLabel:    'Ich hätte gerne:',
      pantryLabel:   'Kühlschrank',
      bowlHint:      'Zutaten ablegen',
      bowlHintSub:   'ziehen oder klicken',
      submitBtn:     'Gericht fertig! ✓',
      scoreTitle:    'Ergebnis',
      accuracy:      'Zutaten-Korrektheit',
      completeness:  'Vollständigkeit',
      speedBonus:    'Speed Bonus',
      drinkBonus:    'Richtiges Getränk',
      recipeSection: 'Rezept',
      wrongSection:  'Falsche Zutaten',
      playAgain:     'Nochmal spielen',
      pausedTitle:   'Pausiert',
      resumeBtn:          '▶ Weiter',
      restartBtn:         '↺ Neu starten',
      restartConfirmTitle:'Neu starten?',
      restartConfirmSub:  'Das aktuelle Spiel geht verloren.',
      restartConfirmYes:  '↺ Ja, neu starten',
      restartConfirmNo:   'Abbrechen',
      drinksLabel:   'Getränke',
      chooseDrink:   'Getränk wählen',
      drinkDone:     'Fertig',
    },
    en: {
      startTitle:    'Kitchen Challenge',
      startDesc:     'A customer places an order. Add the right ingredients to the bowl — no hints! You have <strong>60 seconds</strong>.',
      startBtn:      'Start Cooking!',
      orderLabel:    'I\'d like:',
      pantryLabel:   'Fridge',
      bowlHint:      'Drop ingredients here',
      bowlHintSub:   'drag or click',
      submitBtn:     'Dish ready! ✓',
      scoreTitle:    'Results',
      accuracy:      'Ingredient Accuracy',
      completeness:  'Completeness',
      speedBonus:    'Speed Bonus',
      drinkBonus:    'Correct Drink',
      recipeSection: 'Recipe',
      wrongSection:  'Wrong Ingredients',
      playAgain:     'Play Again',
      pausedTitle:   'Paused',
      resumeBtn:          '▶ Resume',
      restartBtn:         '↺ Restart',
      restartConfirmTitle:'Restart?',
      restartConfirmSub:  'Your current game will be lost.',
      restartConfirmYes:  '↺ Yes, restart',
      restartConfirmNo:   'Cancel',
      drinksLabel:   'Drinks',
      chooseDrink:   'Choose a Drink',
      drinkDone:     'Done',
    },
  };

  let current = localStorage.getItem('foodji_lang') || 'de';

  function t(key) {
    return (STRINGS[current] && STRINGS[current][key]) ?? STRINGS.de[key] ?? key;
  }

  function getLang() { return current; }

  function setLang(lang) {
    if (!STRINGS[lang]) return;
    current = lang;
    localStorage.setItem('foodji_lang', lang);
  }

  function toggle() {
    setLang(current === 'de' ? 'en' : 'de');
    return current;
  }

  return { t, getLang, setLang, toggle };
})();
