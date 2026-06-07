# Foodji Kitchen Challenge

A 60-second browser-based cooking game built for the Foodji brand. A customer places an order — no hints given — and the player must drag the right ingredients into the bowl before time runs out.

## How to Play

1. Click **"Jetzt kochen!"** to start
2. A customer appears with an order (dish name only — no ingredient list)
3. The pantry shows 12 ingredients: 4 correct ones mixed with 8 distractors
4. **Drag** ingredients from the pantry into the bowl, or **click** them to add instantly
5. Click **×** on any bowl item to remove it
6. Hit **"Gericht fertig! ✓"** to submit early, or wait for the 60-second timer

## Scoring

| Category            | Points | How                                           |
| ------------------- | ------ | --------------------------------------------- |
| Ingredient Accuracy | 50     | Precision: correct items ÷ total items placed |
| Completeness        | 30     | Recall: correct items ÷ required items        |
| Speed Bonus         | 20     | Time remaining ÷ 60 × 20 (only if ≥1 correct) |

The score screen reveals the full recipe with colour-coded feedback: green (placed correctly), yellow (missed), red (wrong ingredient added).

## Running Locally

No build step required. Serve the project root over HTTP:

```bash
python3 -m http.server 8765
```

Then open `http://localhost:8765` in your browser.

> Opening `index.html` directly as a `file://` URL may block image loading in some browsers due to CORS restrictions — the HTTP server approach is recommended.

## Project Structure

```
foodji-kitchen-challenge/
├── index.html
├── assets/
│   ├── audio/
│   │   ├── bgm.mp3                  # background music (loops during gameplay)
│   │   └── sfx/
│   │       ├── drag_*.mp3           # played on dragstart
│   │       ├── drop_*.mp3           # played when ingredient lands in bowl
│   │       ├── success_*.mp3        # played on manual submit
│   │       └── timeout_*.mp3        # played when timer expires
│   ├── fonts/
│   └── images/
│       ├── customers/               # lady1, lady2, man1, man2
│       ├── ingredients/             # 36 ingredient images
│       └── layout/                  # clock.png, logo.svg
└── src/
    ├── css/
    │   ├── main.css                 # global styles, start screen
    │   ├── kitchen.css              # game screen: header, bowl, pantry
    │   └── score.css                # score screen, ingredient reveal
    └── js/
        ├── audio.js                 # AudioManager (BGM + SFX, mute toggle)
        ├── recipes.js               # ingredient catalogue + 10 recipes
        ├── timer.js                 # GameTimer class (60s countdown)
        ├── dragdrop.js              # DragDrop class (HTML5 drag + click-to-add)
        ├── scoring.js               # calculateScore() — precision/recall/speed
        └── main.js                  # game state machine, rendering
```

## Recipes

The game includes 10 dishes, each requiring exactly 4 ingredients:

| Dish                   | Ingredients                                            |
| ---------------------- | ------------------------------------------------------ |
| Salatbowl mit Tomate   | Green salad, tomato sauce, corn, lemon                 |
| Asiatische Lachsbowl   | Jasmin rice, salmon, sesame, broccoli                  |
| Curry Bowl             | Jasmin rice, chicken breast, curry sauce, coconut milk |
| Pasta mit Tomatensauce | Pasta, tomato sauce, meatball, mushroom                |
| Buddha Bowl            | Quinoa, kale, sweet potato, broccoli                   |
| Pesto Pasta            | Pasta, pesto, chicken breast, asparagus                |
| Udon Bowl              | Udon noodles, tofu, spinach, sesame                    |
| Grillbowl mit Gemüse   | Mixed grain rice, grilled meat, corn, pumpkin          |
| Spinat-Sahne Pasta     | Pasta, spinach, cream, mushroom                        |
| Entenfleisch Bowl      | Mixed grain rice, duck meat, broccoli, sesame          |

## Tech Stack

Vanilla HTML5, CSS3, and JavaScript — no frameworks, no build tools. Uses the native HTML5 Drag and Drop API.
