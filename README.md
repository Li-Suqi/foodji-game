# Foodji Kitchen Challenge

**Play it live: [li-suqi.github.io/foodji-game](https://li-suqi.github.io/foodji-game/)**

A 60-second browser-based cooking game built for the Foodji brand. A customer walks in and orders a dish — no ingredient list given. The player must identify the correct ingredients, assemble the plate, and pick the right drink before time runs out.

## How to Play

1. Click **"Start Cooking!"** to begin
2. A random customer appears and shows their order (dish photo + drink)
3. The pantry at the bottom shows 12 ingredients: the correct ones mixed with distractors
4. **Drag** ingredients into the plate, or **click** them to add instantly
5. **Drag** ingredients back out of the plate to the pantry, or click **×** to remove
6. The plate fills up once all required ingredients are placed — no over-adding
7. Open the **drink fridge** on the left and select the matching drink
8. Hit **"Dish ready! ✓"** to submit, or wait for the 60-second timer

### Controls

| Action            | How                                                    |
| ----------------- | ------------------------------------------------------ |
| Add ingredient    | Drag to plate, or click card                           |
| Remove ingredient | Drag back to pantry, click ✓ card, or click × on plate |
| Pause             | Click the timer ring or press `Esc`                    |
| Restart           | ↺ button (top-right) or from the pause menu            |
| Mute              | 🔊 button (top-right)                                  |
| Language          | DE / EN toggle (top-left)                              |

## Scoring

| Category            | Points  | How                                                 |
| ------------------- | ------- | --------------------------------------------------- |
| Ingredient Accuracy | 40      | Precision: correct items ÷ total items placed       |
| Completeness        | 25      | Recall: correct items ÷ required items              |
| Speed Bonus         | 15      | Time remaining ÷ 60 × 15 (only if ≥ 1 correct)      |
| Correct Drink       | 20      | Full points if the selected drink matches the order |
| **Total**           | **100** |                                                     |

The score screen reveals the full recipe with colour-coded feedback: green (correct), red (wrong or missing).

## Running Locally

No build step required. Serve the project root over HTTP:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765` in your browser.

> Opening `index.html` directly as a `file://` URL may block audio and image loading in some browsers — the HTTP server approach is recommended.

## Project Structure

```
foodji-kitchen-challenge/
├── index.html
├── assets/
│   ├── audio/
│   │   ├── bgm.mp3                  # background music (loops during gameplay)
│   │   └── sfx/
│   │       ├── click_*.mp3          # UI button clicks
│   │       ├── drag_*.mp3           # ingredient drag start
│   │       ├── drop_*.mp3           # ingredient drop / drink select
│   │       ├── success_*.mp3        # manual submit
│   │       └── timeout_*.mp3        # timer expires
│   └── images/
│       ├── customers/               # lady1–3, man1–3
│       ├── drinks/                  # 9 drink images
│       ├── food/                    # 15 dish photos
│       ├── ingredients/             # 50+ ingredient images
│       └── layout/                  # board.png, plate.png, logo.svg, drink refrigerator.png
└── src/
    ├── css/
    │   ├── main.css                 # global styles, typography, buttons
    │   ├── kitchen.css              # game screen layout and animations
    │   └── score.css                # score screen, ingredient reveal
    └── js/
        ├── audio.js                 # AudioManager — BGM, SFX, mute toggle
        ├── i18n.js                  # DE / EN translations
        ├── recipes.js               # ALL_INGREDIENTS, RECIPES (15 dishes), DRINKS
        ├── timer.js                 # GameTimer — 60s countdown, pause/resume
        ├── dragdrop.js              # DragDrop — pantry ↔ bowl drag and click
        ├── scoring.js               # calculateScore() — accuracy/completeness/speed/drink
        └── main.js                  # game state machine, rendering, event wiring
```

## Recipes

15 dishes, each with 2–4 required ingredients. All defined in `src/js/recipes.js` — edit the `RECIPES` array to customise dishes and their ingredients.

| Dish                               | Key Ingredients                                      |
| ---------------------------------- | ---------------------------------------------------- |
| Caesar Salat                       | Green salad, chicken breast, tomato, egg             |
| Fleischbällchen mit Kartoffelpüree | Meatballs, mashed potato, peas                       |
| Gemüselasagne                      | Lasagna, tomato sauce, basil leaves                  |
| Hähnchen mit Brokkoli & Kokos      | Jasmine rice, chicken breast, broccoli, coconut milk |
| Hähnchen mit Kartoffeln            | Chicken breast, potato cubes, broccoli, tomato sauce |
| Pilzravioli mit Trüffelbutter      | Pasta, mushroom, truffle, cream                      |
| Rindergulasch mit Klößen           | Beef steak, dumplings, broccoli                      |
| Lachsbowl mit Quinoa               | Green salad, salmon, quinoa, peas                    |
| Salatbowl Tomate-Mozzarella        | Lettuce, tomato, cheese balls, pasta                 |
| Sesambagel mit Schinken            | Bagel, sliced ham, lettuce, tomato                   |
| Sesambagel Tomate-Mozzarella       | Bagel, egg, cheese, lettuce                          |
| Spaghetti mit Basilikumpesto       | Spaghetti, pesto, basil leaves, tomato               |
| Udon mit geräuchertem Tofu         | Udon noodles, tofu, broccoli, sesame                 |
| Bombay Masala                      | Jasmine rice, chicken breast, curry sauce, carrot    |
| Buntes Linsencurry                 | Jasmine rice, curry sauce, basil leaves, red chili   |

## Tech Stack

Vanilla HTML5, CSS3, and JavaScript — no frameworks, no build tools. Uses the HTML5 Drag and Drop API and the Web Audio API.
