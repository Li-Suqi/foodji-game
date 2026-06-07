const ALL_INGREDIENTS = [
  { id: 'asparagus',        file: 'asparagus.png',        name: 'Spargel',           nameEn: 'Asparagus' },
  { id: 'bacon',            file: 'bacon.png',             name: 'Speck',             nameEn: 'Bacon' },
  { id: 'beef-steak',       file: 'beef steak.png',        name: 'Rindersteak',       nameEn: 'Beef Steak' },
  { id: 'broccoli',         file: 'broccoli.png',          name: 'Brokkoli',          nameEn: 'Broccoli' },
  { id: 'chicken-breast',   file: 'Chicken breast.png',    name: 'Hähnchenbrust',     nameEn: 'Chicken Breast' },
  { id: 'coconut-milk',     file: 'coconut milk.png',      name: 'Kokosmilch',        nameEn: 'Coconut Milk' },
  { id: 'corn',             file: 'corn.png',              name: 'Mais',              nameEn: 'Corn' },
  { id: 'cream',            file: 'cream.png',             name: 'Sahne',             nameEn: 'Cream' },
  { id: 'curry-sauce',      file: 'curry sauce.png',       name: 'Currysauce',        nameEn: 'Curry Sauce' },
  { id: 'duck-meat',        file: 'duck meat.png',         name: 'Entenfleisch',      nameEn: 'Duck Meat' },
  { id: 'green-chili',      file: 'green chili.png',       name: 'Grüne Chili',       nameEn: 'Green Chili' },
  { id: 'green-salad',      file: 'green salad.png',       name: 'Grüner Salat',      nameEn: 'Green Salad' },
  { id: 'grilled-meat',     file: 'grilled meat.png',      name: 'Grillfleisch',      nameEn: 'Grilled Meat' },
  { id: 'jasmin-rice',      file: 'jasmin rice.png',       name: 'Jasminreis',        nameEn: 'Jasmine Rice' },
  { id: 'kale',             file: 'kale.png',              name: 'Grünkohl',          nameEn: 'Kale' },
  { id: 'lasagna',          file: 'lasagna.png',           name: 'Lasagne',           nameEn: 'Lasagna' },
  { id: 'lemon',            file: 'lemon.png',             name: 'Zitrone',           nameEn: 'Lemon' },
  { id: 'meatball',         file: 'meatball.png',          name: 'Frikadelle',        nameEn: 'Meatball' },
  { id: 'mixed-grain-rice', file: 'mixed grain rice.png',  name: 'Mehrkornreis',      nameEn: 'Mixed Grain Rice' },
  { id: 'mushroom',         file: 'Mushroom.png',          name: 'Pilze',             nameEn: 'Mushroom' },
  { id: 'pasta',            file: 'pasta.png',             name: 'Pasta',             nameEn: 'Pasta' },
  { id: 'potato-cubes',     file: 'patato cubes.png',      name: 'Kartoffelwürfel',   nameEn: 'Potato Cubes' },
  { id: 'potato',           file: 'patato.png',            name: 'Kartoffel',         nameEn: 'Potato' },
  { id: 'pesto',            file: 'pesto.png',             name: 'Pesto',             nameEn: 'Pesto' },
  { id: 'pork-chop',        file: 'pork chop.png',         name: 'Schweinekotelett',  nameEn: 'Pork Chop' },
  { id: 'pumpkin',          file: 'pumpkin.png',           name: 'Kürbis',            nameEn: 'Pumpkin' },
  { id: 'quinoa',           file: 'quinoa.png',            name: 'Quinoa',            nameEn: 'Quinoa' },
  { id: 'red-chili',        file: 'red chili.png',         name: 'Rote Chili',        nameEn: 'Red Chili' },
  { id: 'salmon',           file: 'salmon.png',            name: 'Lachs',             nameEn: 'Salmon' },
  { id: 'sausage',          file: 'sausage.png',           name: 'Wurst',             nameEn: 'Sausage' },
  { id: 'sesame',           file: 'sesame.png',            name: 'Sesam',             nameEn: 'Sesame' },
  { id: 'spinach',          file: 'spinach.png',           name: 'Spinat',            nameEn: 'Spinach' },
  { id: 'sweet-potato',     file: 'sweet patato.png',      name: 'Süßkartoffel',      nameEn: 'Sweet Potato' },
  { id: 'tofu',             file: 'tofu.png',              name: 'Tofu',              nameEn: 'Tofu' },
  { id: 'tomato-sauce',     file: 'tomato sauce.png',      name: 'Tomatensauce',      nameEn: 'Tomato Sauce' },
  { id: 'udon-noodles',     file: 'udon noodles.png',      name: 'Udon Nudeln',       nameEn: 'Udon Noodles' },
];

const RECIPES = [
  {
    id: 'salat-bowl',
    name: 'Salatbowl mit Tomate', nameEn: 'Tomato Salad Bowl',
    ingredients: ['green-salad', 'tomato-sauce', 'corn', 'lemon'],
    customer: 'lady1'
  },
  {
    id: 'lachs-bowl',
    name: 'Asiatische Lachsbowl', nameEn: 'Asian Salmon Bowl',
    ingredients: ['jasmin-rice', 'salmon', 'sesame', 'broccoli'],
    customer: 'man1'
  },
  {
    id: 'curry-bowl',
    name: 'Curry Bowl', nameEn: 'Curry Bowl',
    ingredients: ['jasmin-rice', 'chicken-breast', 'curry-sauce', 'coconut-milk'],
    customer: 'lady2'
  },
  {
    id: 'pasta-tomate',
    name: 'Pasta mit Tomatensauce', nameEn: 'Pasta with Tomato Sauce',
    ingredients: ['pasta', 'tomato-sauce', 'meatball', 'mushroom'],
    customer: 'man2'
  },
  {
    id: 'buddha-bowl',
    name: 'Buddha Bowl', nameEn: 'Buddha Bowl',
    ingredients: ['quinoa', 'kale', 'sweet-potato', 'broccoli'],
    customer: 'lady1'
  },
  {
    id: 'pesto-pasta',
    name: 'Pesto Pasta', nameEn: 'Pesto Pasta',
    ingredients: ['pasta', 'pesto', 'chicken-breast', 'asparagus'],
    customer: 'man1'
  },
  {
    id: 'udon-bowl',
    name: 'Udon Bowl', nameEn: 'Udon Bowl',
    ingredients: ['udon-noodles', 'tofu', 'spinach', 'sesame'],
    customer: 'lady2'
  },
  {
    id: 'grill-bowl',
    name: 'Grillbowl mit Gemüse', nameEn: 'Grilled Meat Bowl',
    ingredients: ['mixed-grain-rice', 'grilled-meat', 'corn', 'pumpkin'],
    customer: 'man2'
  },
  {
    id: 'spinat-pasta',
    name: 'Spinat-Sahne Pasta', nameEn: 'Spinach Cream Pasta',
    ingredients: ['pasta', 'spinach', 'cream', 'mushroom'],
    customer: 'lady1'
  },
  {
    id: 'enten-bowl',
    name: 'Entenfleisch Bowl', nameEn: 'Duck Meat Bowl',
    ingredients: ['mixed-grain-rice', 'duck-meat', 'broccoli', 'sesame'],
    customer: 'man2'
  }
];

const FOODS = [
  { file: 'Bombay Masala mit Hähnchenbrustfilet und Reis.png',  name: 'Bombay Masala',        nameEn: 'Bombay Masala' },
  { file: 'Buntes Linsencurry mit Reis.png',                    name: 'Linsencurry',           nameEn: 'Lentil Curry' },
  { file: 'Caesar Salat.png',                                   name: 'Caesar Salat',          nameEn: 'Caesar Salad' },
  { file: 'Fleischbällchen mit Kartoffelpüree und Erbsen.png',  name: 'Fleischbällchen',       nameEn: 'Meatballs' },
  { file: 'Gemüselasagne mit Tomatensoße.png',                  name: 'Gemüselasagne',         nameEn: 'Veggie Lasagna' },
  { file: 'Hähnchen mit Brokkoli-Reis und Kokossoße.png',       name: 'Hähnchen Bowl',         nameEn: 'Chicken Bowl' },
  { file: 'Hähnchen mit Kartoffeln und Brokkoli.png',           name: 'Hähnchen & Kartoffeln', nameEn: 'Chicken & Potatoes' },
  { file: 'Pilzravioli mit Trüffelbutter.png',                  name: 'Pilzravioli',           nameEn: 'Mushroom Ravioli' },
  { file: 'Rindergulasch mit Schupfnudeln und Brokkoli.png',    name: 'Rindergulasch',         nameEn: 'Beef Goulash' },
  { file: 'Salatbowl mit geräuchertem Lachs und Quinoa.png',    name: 'Lachsbowl',             nameEn: 'Salmon Bowl' },
  { file: 'Salatbowl mit Tomate-Mozzarella.png',                name: 'Salatbowl',             nameEn: 'Salad Bowl' },
  { file: 'Sesambagel mit Schinken.png',                        name: 'Bagel mit Schinken',    nameEn: 'Bagel with Ham' },
  { file: 'Sesambagel mit Tomate Mozzarella.png',               name: 'Bagel Caprese',         nameEn: 'Caprese Bagel' },
  { file: 'Spaghetti mit Basilikumpesto.png',                   name: 'Pesto Spaghetti',       nameEn: 'Pesto Spaghetti' },
  { file: 'Udon-Nudeln mit geräuchertem Tofu.png',              name: 'Udon Bowl',             nameEn: 'Udon Bowl' },
];

const DRINKS = [
  { file: 'Adelholzener Lemon Sport.png',                             name: 'Lemon Sport',         nameEn: 'Lemon Sport' },
  { file: 'ChariTea Mate.png',                                        name: 'ChariTea Mate',       nameEn: 'ChariTea Mate' },
  { file: 'Lemonaid Limette.png',                                     name: 'Lemonaid Limette',    nameEn: 'Lemonaid Lime' },
  { file: 'Lemonaid Maracuja.png',                                    name: 'Lemonaid Maracuja',   nameEn: 'Lemonaid Passion Fruit' },
  { file: 'Rauch Eiskaffee-style Latte Macchiato Vanilla.png',        name: 'Latte Macchiato',     nameEn: 'Latte Macchiato' },
  { file: 'Rauch Eistee mit schwarzem Tee und Pfirsich.png',          name: 'Pfirsich Eistee',     nameEn: 'Peach Iced Tea' },
  { file: 'Rauch Multivitamin-Saft.png',                              name: 'Multivitaminsaft',    nameEn: 'Multivitamin Juice' },
  { file: 'True fruits Smoothie Beerenmix.png',                       name: 'Beeren-Smoothie',     nameEn: 'Berry Smoothie' },
  { file: 'Vitamin Well Vitaminwasser Himbeere zuckerfrei.png',       name: 'Vitaminwasser',       nameEn: 'Vitamin Water' },
];

function getRandomFood()  { return FOODS[Math.floor(Math.random()  * FOODS.length)]; }
function getRandomDrink() { return DRINKS[Math.floor(Math.random() * DRINKS.length)]; }

function orderItemName(item) {
  return I18N.getLang() === 'en' ? item.nameEn : item.name;
}

function getIngredientById(id) {
  return ALL_INGREDIENTS.find(i => i.id === id);
}

function ingredientPath(file) {
  return `assets/images/ingredients/${encodeURIComponent(file)}`;
}

function ingName(ing) {
  return I18N.getLang() === 'en' ? ing.nameEn : ing.name;
}

function recipeName(recipe) {
  return I18N.getLang() === 'en' ? recipe.nameEn : recipe.name;
}

function buildPantry(recipe) {
  const required = recipe.ingredients.map(id => getIngredientById(id));
  const distractors = ALL_INGREDIENTS
    .filter(i => !recipe.ingredients.includes(i.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
  return [...required, ...distractors].sort(() => Math.random() - 0.5);
}
