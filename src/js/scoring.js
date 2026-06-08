function calculateScore(recipe, placedIds, timeRemaining, selectedDrink, requiredDrink) {
  const required = new Set(recipe.ingredients);
  const placed = new Set(placedIds);

  const correctIds = [...placed].filter(id => required.has(id));
  const wrongIds   = [...placed].filter(id => !required.has(id));
  const missingIds = [...required].filter(id => !placed.has(id));

  const correct = correctIds.length;
  const totalRequired = required.size;

  // Precision: of what you put in, how many were correct?
  const precision = placed.size > 0 ? correct / placed.size : 0;
  const correctnessScore = Math.round(precision * 40);

  // Recall: did you find all needed ingredients?
  const completenessScore = Math.round((correct / totalRequired) * 25);

  // Speed: bonus only if at least one correct ingredient was placed
  const speedScore = correct > 0 ? Math.round((timeRemaining / 60) * 15) : 0;

  // Drink: correct drink selected?
  const drinkCorrect = selectedDrink && requiredDrink && selectedDrink.file === requiredDrink.file;
  const drinkScore = drinkCorrect ? 20 : 0;

  return {
    correctness: correctnessScore,
    completeness: completenessScore,
    speed: speedScore,
    drink: drinkScore,
    drinkCorrect,
    total: correctnessScore + completenessScore + speedScore + drinkScore,
    correctIds,
    wrongIds,
    missingIds,
  };
}
