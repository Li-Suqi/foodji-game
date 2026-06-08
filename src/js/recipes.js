const ALL_INGREDIENTS = [
  {
    id: "asparagus",
    file: "asparagus.png",
    name: "Spargel",
    nameEn: "Asparagus",
  },
  { id: "bacon", file: "bacon.png", name: "Speck", nameEn: "Bacon" },
  { id: "carrot", file: "Carrot.png", name: "Karotte", nameEn: "Carrot" },
  { id: "bagel", file: "bagal.png", name: "Bagel", nameEn: "Bagel" },
  {
    id: "basil-leaves",
    file: "basil leaves.png",
    name: "Basilikum",
    nameEn: "Basil Leaves",
  },
  {
    id: "beef-steak",
    file: "beef steak.png",
    name: "Rindersteak",
    nameEn: "Beef Steak",
  },
  {
    id: "broccoli",
    file: "broccoli.png",
    name: "Brokkoli",
    nameEn: "Broccoli",
  },
  { id: "cheese", file: "cheese.png", name: "Käse", nameEn: "Cheese" },
  {
    id: "cheese-balls",
    file: "cheese balls.png",
    name: "Käsebällchen",
    nameEn: "Cheese Balls",
  },
  {
    id: "chicken-breast",
    file: "Chicken breast.png",
    name: "Hähnchenbrust",
    nameEn: "Chicken Breast",
  },
  {
    id: "coconut-milk",
    file: "coconut milk.png",
    name: "Kokosmilch",
    nameEn: "Coconut Milk",
  },
  { id: "corn", file: "corn.png", name: "Mais", nameEn: "Corn" },
  { id: "cream", file: "cream.png", name: "Sahne", nameEn: "Cream" },
  {
    id: "curry-sauce",
    file: "curry sauce.png",
    name: "Currysauce",
    nameEn: "Curry Sauce",
  },
  {
    id: "duck-meat",
    file: "duck meat.png",
    name: "Entenfleisch",
    nameEn: "Duck Meat",
  },
  {
    id: "dumplings",
    file: "dumplings.png",
    name: "Klöße",
    nameEn: "Dumplings",
  },
  { id: "egg", file: "egg.png", name: "Ei", nameEn: "Egg" },
  {
    id: "green-beans",
    file: "green beans.png",
    name: "Grüne Bohnen",
    nameEn: "Green Beans",
  },
  {
    id: "green-chili",
    file: "green chili.png",
    name: "Grüne Chili",
    nameEn: "Green Chili",
  },
  {
    id: "green-salad",
    file: "green salad.png",
    name: "Grüner Salat",
    nameEn: "Green Salad",
  },
  {
    id: "grilled-meat",
    file: "grilled meat.png",
    name: "Grillfleisch",
    nameEn: "Grilled Meat",
  },
  {
    id: "jasmin-rice",
    file: "jasmin rice.png",
    name: "Jasminreis",
    nameEn: "Jasmine Rice",
  },
  { id: "kale", file: "kale.png", name: "Grünkohl", nameEn: "Kale" },
  { id: "lasagna", file: "lasagna.png", name: "Lasagne", nameEn: "Lasagna" },
  { id: "lemon", file: "lemon.png", name: "Zitrone", nameEn: "Lemon" },
  { id: "lettuce", file: "lettuce.png", name: "Salat", nameEn: "Lettuce" },
  {
    id: "mashed-potato",
    file: "mashed patato.png",
    name: "Kartoffelpüree",
    nameEn: "Mashed Potato",
  },
  {
    id: "meatballs",
    file: "meatballs.png",
    name: "Fleischbällchen",
    nameEn: "Meatballs",
  },
  {
    id: "mixed-grain-rice",
    file: "mixed grain rice.png",
    name: "Mehrkornreis",
    nameEn: "Mixed Grain Rice",
  },
  { id: "mushroom", file: "Mushroom.png", name: "Pilze", nameEn: "Mushroom" },
  { id: "pasta", file: "pasta.png", name: "Pasta", nameEn: "Pasta" },
  { id: "peas", file: "Peas.png", name: "Erbsen", nameEn: "Peas" },
  { id: "pesto", file: "pesto.png", name: "Pesto", nameEn: "Pesto" },
  {
    id: "pork-chop",
    file: "pork chop.png",
    name: "Schweinekotelett",
    nameEn: "Pork Chop",
  },
  {
    id: "potato-cubes",
    file: "patato cubes.png",
    name: "Kartoffelwürfel",
    nameEn: "Potato Cubes",
  },
  { id: "tomato", file: "tomato.png", name: "Tomate", nameEn: "Tomato" },
  { id: "pumpkin", file: "pumpkin.png", name: "Kürbis", nameEn: "Pumpkin" },
  { id: "quinoa", file: "quinoa.png", name: "Quinoa", nameEn: "Quinoa" },
  {
    id: "red-chili",
    file: "red chili.png",
    name: "Rote Chili",
    nameEn: "Red Chili",
  },
  { id: "salmon", file: "salmon.png", name: "Lachs", nameEn: "Salmon" },
  { id: "sausage", file: "sausage.png", name: "Wurst", nameEn: "Sausage" },
  { id: "sesame", file: "sesame.png", name: "Sesam", nameEn: "Sesame" },
  {
    id: "sliced-ham",
    file: "sliced ham.png",
    name: "Schinken",
    nameEn: "Sliced Ham",
  },
  {
    id: "spaghetti",
    file: "spaghetti.png",
    name: "Spaghetti",
    nameEn: "Spaghetti",
  },
  { id: "spinach", file: "spinach.png", name: "Spinat", nameEn: "Spinach" },
  {
    id: "sweet-potato",
    file: "sweet patato.png",
    name: "Süßkartoffel",
    nameEn: "Sweet Potato",
  },
  { id: "tofu", file: "tofu.png", name: "Tofu", nameEn: "Tofu" },
  {
    id: "tomato-sauce",
    file: "tomato sauce.png",
    name: "Tomatensauce",
    nameEn: "Tomato Sauce",
  },
  { id: "truffle", file: "truffle.png", name: "Trüffel", nameEn: "Truffle" },
  {
    id: "udon-noodles",
    file: "udon noodles.png",
    name: "Udon Nudeln",
    nameEn: "Udon Noodles",
  },
  {
    id: "zucchini",
    file: "zucchini.png",
    name: "Zucchini",
    nameEn: "Zucchini",
  },
];

const RECIPES = [
  {
    id: "caesar-salat",
    name: "Caesar Salat",
    nameEn: "Caesar Salad",
    food: "Caesar Salat.png",
    ingredients: ["green-salad", "chicken-breast", "tomato", "egg"],
  },
  {
    id: "fleischbaellchen",
    name: "Fleischbällchen mit Kartoffelpüree",
    nameEn: "Meatballs with Mashed Potato",
    food: "Fleischbällchen mit Kartoffelpüree und Erbsen.png",
    ingredients: ["meatballs", "mashed-potato", "peas"],
  },
  {
    id: "gemuese-lasagne",
    name: "Gemüselasagne",
    nameEn: "Veggie Lasagna",
    food: "Gemüselasagne mit Tomatensoße.png",
    ingredients: ["lasagna", "tomato-sauce", "basil-leaves"],
  },
  {
    id: "haehnchen-kokos",
    name: "Hähnchen mit Brokkoli & Kokos",
    nameEn: "Chicken with Broccoli & Coconut",
    food: "Hähnchen mit Brokkoli-Reis und Kokossoße.png",
    ingredients: ["jasmin-rice", "chicken-breast", "broccoli", "coconut-milk"],
  },
  {
    id: "haehnchen-kartoffeln",
    name: "Hähnchen mit Kartoffeln",
    nameEn: "Chicken with Potatoes",
    food: "Hähnchen mit Kartoffeln und Brokkoli.png",
    ingredients: ["chicken-breast", "potato-cubes", "broccoli", "tomato-sauce"],
  },
  {
    id: "pilzravioli",
    name: "Pilzravioli mit Trüffelbutter",
    nameEn: "Mushroom Ravioli with Truffle Butter",
    food: "Pilzravioli mit Trüffelbutter.png",
    ingredients: ["dumplings", "mushroom", "truffle", "cream"],
  },
  {
    id: "rindergulasch",
    name: "Rindergulasch mit Klößen",
    nameEn: "Beef Goulash with Dumplings",
    food: "Rindergulasch mit Schupfnudeln und Brokkoli.png",
    ingredients: ["beef-steak", "dumplings", "broccoli"],
  },
  {
    id: "lachs-quinoa",
    name: "Lachsbowl mit Quinoa",
    nameEn: "Salmon Bowl with Quinoa",
    food: "Salatbowl mit geräuchertem Lachs und Quinoa.png",
    ingredients: ["green-salad", "salmon", "quinoa", "peas"],
  },
  {
    id: "salat-tomate-mozzarella",
    name: "Salatbowl Tomate-Mozzarella",
    nameEn: "Salad Bowl Tomato Mozzarella",
    food: "Salatbowl mit Tomate-Mozzarella.png",
    ingredients: ["green-salate", "tomato", "cheese-balls", "pasta"],
  },
  {
    id: "bagel-schinken",
    name: "Sesambagel mit Schinken",
    nameEn: "Sesame Bagel with Ham",
    food: "Sesambagel mit Schinken.png",
    ingredients: ["bagel", "sliced-ham", "lettuce", "tomato"],
  },
  {
    id: "bagel-caprese",
    name: "Sesambagel Tomate-Mozzarella",
    nameEn: "Sesame Bagel Caprese",
    food: "Sesambagel mit Tomate Mozzarella.png",
    ingredients: ["bagel", "egg", "cheese", "lettuce"],
  },
  {
    id: "spaghetti-pesto",
    name: "Spaghetti mit Basilikumpesto",
    nameEn: "Spaghetti with Basil Pesto",
    food: "Spaghetti mit Basilikumpesto.png",
    ingredients: ["spaghetti", "pesto", "basil-leaves", "tomato"],
  },
  {
    id: "udon-tofu",
    name: "Udon mit geräuchertem Tofu",
    nameEn: "Udon with Smoked Tofu",
    food: "Udon-Nudeln mit geräuchertem Tofu.png",
    ingredients: ["udon-noodles", "tofu", "broccoli", "sesame"],
  },
  {
    id: "bombay-masala",
    name: "Bombay Masala",
    nameEn: "Bombay Masala",
    food: "Bombay Masala mit Hähnchenbrustfilet und Reis.png",
    ingredients: ["jasmin-rice", "chicken-breast", "curry-sauce", "carrot"],
  },
  {
    id: "linsencurry",
    name: "Buntes Linsencurry",
    nameEn: "Colorful Lentil Curry",
    food: "Buntes Linsencurry mit Reis.png",
    ingredients: ["jasmin-rice", "curry-sauce", "basil-leaves", "red-chili"],
  },
];

const FOODS = [
  {
    file: "Bombay Masala mit Hähnchenbrustfilet und Reis.png",
    name: "Bombay Masala",
    nameEn: "Bombay Masala",
  },
  {
    file: "Buntes Linsencurry mit Reis.png",
    name: "Linsencurry",
    nameEn: "Lentil Curry",
  },
  { file: "Caesar Salat.png", name: "Caesar Salat", nameEn: "Caesar Salad" },
  {
    file: "Fleischbällchen mit Kartoffelpüree und Erbsen.png",
    name: "Fleischbällchen",
    nameEn: "Meatballs",
  },
  {
    file: "Gemüselasagne mit Tomatensoße.png",
    name: "Gemüselasagne",
    nameEn: "Veggie Lasagna",
  },
  {
    file: "Hähnchen mit Brokkoli-Reis und Kokossoße.png",
    name: "Hähnchen Bowl",
    nameEn: "Chicken Bowl",
  },
  {
    file: "Hähnchen mit Kartoffeln und Brokkoli.png",
    name: "Hähnchen & Kartoffeln",
    nameEn: "Chicken & Potatoes",
  },
  {
    file: "Pilzravioli mit Trüffelbutter.png",
    name: "Pilzravioli",
    nameEn: "Mushroom Ravioli",
  },
  {
    file: "Rindergulasch mit Schupfnudeln und Brokkoli.png",
    name: "Rindergulasch",
    nameEn: "Beef Goulash",
  },
  {
    file: "Salatbowl mit geräuchertem Lachs und Quinoa.png",
    name: "Lachsbowl",
    nameEn: "Salmon Bowl",
  },
  {
    file: "Salatbowl mit Tomate-Mozzarella.png",
    name: "Salatbowl",
    nameEn: "Salad Bowl",
  },
  {
    file: "Sesambagel mit Schinken.png",
    name: "Bagel mit Schinken",
    nameEn: "Bagel with Ham",
  },
  {
    file: "Sesambagel mit Tomate Mozzarella.png",
    name: "Bagel Caprese",
    nameEn: "Caprese Bagel",
  },
  {
    file: "Spaghetti mit Basilikumpesto.png",
    name: "Pesto Spaghetti",
    nameEn: "Pesto Spaghetti",
  },
  {
    file: "Udon-Nudeln mit geräuchertem Tofu.png",
    name: "Udon Bowl",
    nameEn: "Udon Bowl",
  },
];

const DRINKS = [
  {
    file: "Adelholzener Lemon Sport.png",
    name: "Lemon Sport",
    nameEn: "Lemon Sport",
  },
  { file: "ChariTea Mate.png", name: "ChariTea Mate", nameEn: "ChariTea Mate" },
  {
    file: "Lemonaid Limette.png",
    name: "Lemonaid Limette",
    nameEn: "Lemonaid Lime",
  },
  {
    file: "Lemonaid Maracuja.png",
    name: "Lemonaid Maracuja",
    nameEn: "Lemonaid Passion Fruit",
  },
  {
    file: "Rauch Eiskaffee-style Latte Macchiato Vanilla.png",
    name: "Latte Macchiato",
    nameEn: "Latte Macchiato",
  },
  {
    file: "Rauch Eistee mit schwarzem Tee und Pfirsich.png",
    name: "Pfirsich Eistee",
    nameEn: "Peach Iced Tea",
  },
  {
    file: "Rauch Multivitamin-Saft.png",
    name: "Multivitaminsaft",
    nameEn: "Multivitamin Juice",
  },
  {
    file: "True fruits Smoothie Beerenmix.png",
    name: "Beeren-Smoothie",
    nameEn: "Berry Smoothie",
  },
  {
    file: "Vitamin Well Vitaminwasser Himbeere zuckerfrei.png",
    name: "Vitaminwasser",
    nameEn: "Vitamin Water",
  },
];

function getRandomFood() {
  return FOODS[Math.floor(Math.random() * FOODS.length)];
}
function getRandomDrink() {
  return DRINKS[Math.floor(Math.random() * DRINKS.length)];
}

function orderItemName(item) {
  return I18N.getLang() === "en" ? item.nameEn : item.name;
}

function getIngredientById(id) {
  return ALL_INGREDIENTS.find((i) => i.id === id);
}

function ingredientPath(file) {
  return `assets/images/ingredients/${encodeURIComponent(file)}`;
}

function ingName(ing) {
  return I18N.getLang() === "en" ? ing.nameEn : ing.name;
}

function recipeName(recipe) {
  return I18N.getLang() === "en" ? recipe.nameEn : recipe.name;
}

function buildPantry(recipe) {
  const required = recipe.ingredients.map((id) => getIngredientById(id));
  const distractors = ALL_INGREDIENTS.filter(
    (i) => !recipe.ingredients.includes(i.id),
  )
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
  return [...required, ...distractors].sort(() => Math.random() - 0.5);
}
