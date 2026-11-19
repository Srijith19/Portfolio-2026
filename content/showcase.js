/* The presentation on each short project page (Entry and Glimpse), under the summary.
   Case studies keep theirs inside content/case-studies/<id>.js, as "show" on a section.
   Block types are listed in README.md.

   Stand-ins: a picture or video path that doesn't exist yet shows a designed stand-in
   that names the file. Put a file with exactly that name in the project's folder and it
   replaces itself. Titles that say "to come" are placeholders to write. */
SITE.showcase = {

  /* ---------- UX ---------- */

  "kego-care": [
    { type: "story", device: "phone", title: "The app", steps: [
      { label: "Screen 01", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/kego-care/screen-1.webp" },
      { label: "Screen 02", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/kego-care/screen-2.webp" },
      { label: "Screen 03", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/kego-care/screen-3.webp" },
      { label: "Screen 04", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/kego-care/screen-4.webp" }
    ] },
    { type: "hscroll", title: "The design system", items: [
      { src: "assets/img/projects/kego-care/system-colour.webp", caption: "Colour", ar: "4 / 3" },
      { src: "assets/img/projects/kego-care/system-type.webp", caption: "Type", ar: "4 / 3" },
      { src: "assets/img/projects/kego-care/system-components.webp", caption: "Components", ar: "16 / 10" }
    ] }
  ],

  dreambig: [
    { type: "story", device: "phone", title: "The app", steps: [
      { label: "Screen 01", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/dreambig/screen-1.webp" },
      { label: "Screen 02", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/dreambig/screen-2.webp" },
      { label: "Screen 03", title: "Title to come", text: "One line on what this screen does.", img: "assets/img/projects/dreambig/screen-3.webp" }
    ] }
  ],

  jiosaavn: [
    { type: "words", text: "A minimal redesign of the music app I use every day, *keeping its own brand guidelines*." },
    { type: "story", device: "phone", title: "The redesign", steps: [
      { label: "Screen 01", title: "Title to come", text: "One line on what changed.", img: "assets/img/projects/jiosaavn/screen-1.webp" },
      { label: "Screen 02", title: "Title to come", text: "One line on what changed.", img: "assets/img/projects/jiosaavn/screen-2.webp" },
      { label: "Screen 03", title: "Title to come", text: "One line on what changed.", img: "assets/img/projects/jiosaavn/screen-3.webp" }
    ] }
  ],

  cookr: [
    { type: "hscroll", title: "Five products", items: [
      { src: "assets/img/projects/cookr/product-1.webp", caption: "Product name to come", ar: "16 / 10" },
      { src: "assets/img/projects/cookr/product-2.webp", caption: "Product name to come", ar: "16 / 10" },
      { src: "assets/img/projects/cookr/product-3.webp", caption: "Product name to come", ar: "16 / 10" },
      { src: "assets/img/projects/cookr/product-4.webp", caption: "Product name to come", ar: "16 / 10" },
      { src: "assets/img/projects/cookr/product-5.webp", caption: "Product name to come", ar: "16 / 10" }
    ] },
    { type: "hscroll", title: "Content and campaigns", items: [
      { src: "assets/img/projects/cookr/campaign-1.webp", caption: "Campaign to come", ar: "4 / 5" },
      { src: "assets/img/projects/cookr/campaign-2.webp", caption: "Campaign to come", ar: "4 / 5" },
      { src: "assets/img/projects/cookr/campaign-3.webp", caption: "Campaign to come", ar: "4 / 5" },
      { src: "assets/img/projects/cookr/campaign-4.webp", caption: "Campaign to come", ar: "4 / 5" }
    ] }
  ],

  "gpay-wrist": [
    { type: "words", text: "Pay with UPI from your wrist, over NFC, *with no phone needed*." },
    // A working prototype, built from the screens in the gallery below. To use your Figma prototype instead,
    // add  figma: "https://www.figma.com/proto/…"  to this project in content/projects.js.
    { type: "watch", title: "Try it on the wrist.", text: "This one works. Tap the screen, press the side button to unlock, and go back home with the crown." }
  ],

  kalviexpert: [
    { type: "story", device: "laptop", title: "The website", steps: [
      { label: "Page 01", title: "Title to come", text: "One line on this page.", img: "assets/img/projects/kalviexpert/desktop-1.webp" },
      { label: "Page 02", title: "Title to come", text: "One line on this page.", img: "assets/img/projects/kalviexpert/desktop-2.webp" },
      { label: "Page 03", title: "Title to come", text: "One line on this page.", img: "assets/img/projects/kalviexpert/desktop-3.webp" }
    ] }
  ],

  "namma-metro": [
    { type: "cbsim", title: "See the map the way a colour-blind rider does", src: "assets/img/projects/namma-metro/cover.webp", ar: "600 / 338",
      caption: "Move the lens over the map, or switch to the whole frame. The filters simulate each kind of colour vision." }
  ],

  /* ---------- XR ---------- */

  vannavision: [
    { type: "cbsim", title: "Try the idea here", src: "assets/img/projects/akai-tsuki/render-hall.webp", ar: "1276 / 694",
      caption: "Move the lens and pick a kind of colour vision. In the headset, the lens is your whole view of the room. (Demo picture: a render from Akai Tsuki, to swap for a capture from the headset.)" },
    { type: "holo", title: "In the headset", items: [
      { label: "View to come", text: "A capture from the headset.", src: "assets/img/projects/vannavision/view-1.webp" },
      { label: "View to come", text: "A capture from the headset.", src: "assets/img/projects/vannavision/view-2.webp" },
      { label: "View to come", text: "A capture from the headset.", src: "assets/img/projects/vannavision/view-3.webp" }
    ] }
  ],

  /* ---------- Graphics and Games ---------- */

  "akai-tsuki": [
    { type: "words", kicker: "The world", text: "The City of the Red Moon: a hidden mountain city, *frozen in time* under a crimson moon." },
    { type: "note", entry: 0 },
    { type: "hscroll", title: "Renders", items: [
      { src: "assets/img/projects/akai-tsuki/render-gate.webp", caption: "The gate", ar: "1276 / 718" },
      { src: "assets/img/projects/akai-tsuki/render-street.webp", caption: "The street", ar: "1276 / 694" },
      { src: "assets/img/projects/akai-tsuki/render-hall.webp", caption: "The hall", ar: "1276 / 694" },
      { src: "assets/img/projects/akai-tsuki/render-palace.webp", caption: "The palace", ar: "1276 / 694" },
      { src: "assets/img/projects/akai-tsuki/render-throne.webp", caption: "The throne room", ar: "1276 / 694" },
      { src: "assets/img/projects/akai-tsuki/render-wall.webp", caption: "The wall", ar: "1276 / 717" }
    ] },
    { type: "note", entry: 1, side: "right" },
    { type: "compare", title: "Concept to render", ar: "1276 / 694", before: { src: "assets/img/projects/akai-tsuki/concept-street.webp", label: "Concept" }, after: { src: "assets/img/projects/akai-tsuki/render-street.webp", label: "Render" } },
    { type: "note", entry: 3 },
    { type: "images", items: [
      { src: "assets/img/projects/akai-tsuki/board-gate.webp", caption: "The gate" },
      { src: "assets/img/projects/akai-tsuki/board-courtyard.webp", caption: "The courtyard" },
      { src: "assets/img/projects/akai-tsuki/board-plaza.webp", caption: "The plaza" },
      { src: "assets/img/projects/akai-tsuki/board-storm.webp", caption: "The storm" }
    ] },
    { type: "note", entry: 4, side: "right" },
    { type: "note", entry: 2 },
    { type: "hscroll", title: "Concepts and stills", items: [
      { src: "assets/img/projects/akai-tsuki/concept-torii.webp", caption: "Concept: the torii", ar: "645 / 429" },
      { src: "assets/img/projects/akai-tsuki/concept-1.webp", caption: "Concept", ar: "385 / 342" },
      { src: "assets/img/projects/akai-tsuki/concept-2.webp", caption: "Concept", ar: "411 / 333" },
      { src: "assets/img/projects/akai-tsuki/concept-3.webp", caption: "Concept", ar: "377 / 350" },
      { src: "assets/img/projects/akai-tsuki/still-2.webp", caption: "Still", ar: "1191 / 706" },
      { src: "assets/img/projects/akai-tsuki/still-3.webp", caption: "Still", ar: "1191 / 680" }
    ] }
  ],

  "savoury-skies": [
    { type: "hscroll", title: "The brand", items: [
      { src: "assets/img/projects/savoury-skies/cover.webp", caption: "Savoury Skies Kitchen", ar: "1800 / 1300" },
      { src: "assets/img/projects/savoury-skies/board.webp", caption: "Brand board", ar: "477 / 761" },
      { src: "assets/img/projects/savoury-skies/logo.webp", caption: "Logo to come", ar: "1 / 1" },
      { src: "assets/img/projects/savoury-skies/menu.webp", caption: "Menu to come", ar: "3 / 4" },
      { src: "assets/img/projects/savoury-skies/website.webp", caption: "Website to come", ar: "16 / 10" },
      { src: "assets/img/projects/savoury-skies/social-1.webp", caption: "Social post to come", ar: "4 / 5" },
      { src: "assets/img/projects/savoury-skies/social-2.webp", caption: "Social post to come", ar: "4 / 5" }
    ] }
  ],

  "fredrick-runs": [
    // Playable: the real backdrops, character and car from the Scratch project
    { type: "fgame", dir: "assets/img/projects/fredrick-runs", title: "Run, Johnny.", text: "The four backdrops, the character and the traffic from the Scratch game, rebuilt to play right here. As the level rises, the traffic speeds up. Points multiply until you're hit. Boosters arrive from level 2." },
    { type: "note", entry: 2 },
    { type: "video", title: "The original, in Scratch", src: "assets/video/fredrick-runs.mp4", ar: "1920 / 1032", caption: "Gameplay from the Scratch build." },
    { type: "hscroll", title: "Four backdrops, one run", items: [
      { src: "assets/img/projects/fredrick-runs/bg-city.webp", caption: "Level 1 · City side", ar: "5 / 4" },
      { src: "assets/img/projects/fredrick-runs/bg-beach.webp", caption: "Level 2 · Beach side", ar: "5 / 4" },
      { src: "assets/img/projects/fredrick-runs/bg-seashore.webp", caption: "Level 3 · Seashore", ar: "5 / 4" },
      { src: "assets/img/projects/fredrick-runs/bg-forest.webp", caption: "Forest area", ar: "5 / 4" },
      { src: "assets/img/projects/fredrick-runs/start.webp", caption: "The start screen", ar: "5 / 4" }
    ] },
    { type: "note", entry: 3, side: "right" },
    { type: "compare", title: "Wireframe to game", ar: "1361 / 1106", before: { src: "assets/img/projects/fredrick-runs/wire-city.webp", label: "Wireframe" }, after: { src: "assets/img/projects/fredrick-runs/bg-city.webp", label: "Game" } },
    { type: "images", items: [
      { src: "assets/img/projects/fredrick-runs/idea-fundamental.webp", caption: "Fundamental action: dodge obstacles" },
      { src: "assets/img/projects/fredrick-runs/idea-composite.webp", caption: "Composite action: increase the score" }
    ] },
    { type: "note", entry: 4 },
    { type: "voices", title: "What players said", items: [
      { text: "The concept and visuals are good. Nice story.", who: "Player 1 and 2" },
      { text: "The visuals are colourful and interesting.", who: "Player 3" },
      { text: "The characters are small, and the movement is kind of pixelated.", who: "Players 1 and 2" },
      { text: "The obstacles weren't tough enough.", who: "Players 3 and 4" }
    ] },
    { type: "note", entry: 5, side: "right" },
    { type: "hscroll", title: "Wireframes and the poster", items: [
      { src: "assets/img/projects/fredrick-runs/wire-start.webp", caption: "Wireframe: the start", ar: "1356 / 1098" },
      { src: "assets/img/projects/fredrick-runs/wire-seashore.webp", caption: "Wireframe: the seashore", ar: "1362 / 1105" },
      { src: "assets/img/projects/fredrick-runs/wire-forest.webp", caption: "Wireframe: the forest", ar: "1413 / 1099" },
      { src: "assets/img/projects/fredrick-runs/wire-well-done.webp", caption: "Wireframe: “Well done, hero!”", ar: "1352 / 1096" },
      { src: "assets/img/projects/fredrick-runs/poster.webp", caption: "The poster", ar: "842 / 1191" }
    ] }
  ],

  "rasta-la-vista": [
    { type: "hscroll", title: "The game", items: [
      { src: "assets/img/projects/rasta-la-vista/board.webp", caption: "The board", ar: "1 / 1" },
      { src: "assets/img/projects/rasta-la-vista/cards.webp", caption: "The cards", ar: "4 / 3" },
      { src: "assets/img/projects/rasta-la-vista/box.webp", caption: "The box", ar: "4 / 3" },
      { src: "assets/img/projects/rasta-la-vista/playtest.webp", caption: "Playtesting", ar: "16 / 10" }
    ] },
    { type: "video", title: "A round, played", src: "assets/video/rasta-la-vista.mp4", caption: "A short muted loop of a playtest goes here." }
  ],

  "shape-chase": [
    { type: "hscroll", title: "Chalk, shapes and a chase", items: [
      { src: "assets/img/projects/shape-chase/court.webp", caption: "The chalk court", ar: "4 / 3" },
      { src: "assets/img/projects/shape-chase/play-1.webp", caption: "Playing", ar: "4 / 3" },
      { src: "assets/img/projects/shape-chase/play-2.webp", caption: "Playing", ar: "4 / 3" }
    ] },
    { type: "video", title: "In play", src: "assets/video/shape-chase.mp4", caption: "A short muted loop of the game in play goes here." }
  ],

  "native-packaging": [
    // Pick a label and it wraps the tin; the grandmother sits on the lid
    { type: "shelf", title: "The range, on the tin", pick: "Pick a label", lid: "assets/img/projects/packaging/lid.webp", caption: "Drag the tin to turn it. The labels' contact details are left out here.", items: [
      { src: "assets/img/projects/packaging/label-kongu.webp", name: "Kongu masala mundhiri" },
      { src: "assets/img/projects/packaging/label-murungai.webp", name: "Murungai masala mundhiri" },
      { src: "assets/img/projects/packaging/label-uppu-kari.webp", name: "Uppu kari masala" },
      { src: "assets/img/projects/packaging/label-65-masala.webp", name: "65 masala" },
      { src: "assets/img/projects/packaging/label-ragi.webp", name: "Sprouted ragi mix" },
      { src: "assets/img/projects/packaging/sticker-native-groceries.webp", name: "Native groceries" },
      { src: "assets/img/projects/packaging/sticker-day-today.webp", name: "Day today snacks" },
      { src: "assets/img/projects/packaging/sticker-kids.webp", name: "Kids snack pack" }
    ] },
    { type: "hscroll", title: "Beyond the tin", items: [
      { src: "assets/img/projects/packaging/lid.webp", caption: "The lid: the grandmother, and the village at work", ar: "1025 / 721" },
      { src: "assets/img/projects/packaging/box-dieline.webp", caption: "The box, flat", ar: "1449 / 655" },
      { src: "assets/img/projects/packaging/poster-murungai.webp", caption: "A launch post", ar: "1 / 1" },
      { src: "assets/img/projects/packaging/wrap-1.webp", caption: "A gift wrap", ar: "434 / 1689" },
      { src: "assets/img/projects/packaging/wrap-2.webp", caption: "A gift wrap", ar: "434 / 1689" },
      { src: "assets/img/projects/packaging/lettering.webp", caption: "Tamil lettering", ar: "347 / 300" }
    ] }
  ],

  "space-plan": [
    { type: "compare", title: "Paper to 3D", ar: "16 / 9", before: { src: "assets/img/projects/space-plan/paper.webp", label: "On paper" }, after: { src: "assets/img/projects/space-plan/cover.webp", label: "In 3D" } }
  ],

  "smart-device": [
    { type: "video", title: "It senses, then shows", src: "assets/video/smart-device.mp4", caption: "A short muted loop of the prototype working goes here." }
  ]
};
