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
    ] },
    { type: "hscroll", title: "Inside the city, from the build", items: [
      { src: "assets/img/projects/akai-tsuki/shot-01.webp", caption: "Under the red moon", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-05.webp", caption: "The street of pagodas", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-08.webp", caption: "Dusk over the rooftops", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-11.webp", caption: "The throne hall", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-14.webp", caption: "Lanterns and pillars", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-17.webp", caption: "Looking up into the eaves", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-20.webp", caption: "The moon behind the gate", ar: "16 / 9" },
      { src: "assets/img/projects/akai-tsuki/shot-22.webp", caption: "The palace, far away", ar: "16 / 9" }
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
    // Playable: the printed map, the routes traced from it, the real event and action cards
    { type: "rgame", dir: "assets/img/projects/rasta-la-vista", title: "Play a journey.", text: "The printed board with its routes traced, the ticket, event and action cards from the game, and up to three computer travellers. Events that rotate the junction tiles are left out of this digital version." },
    { type: "images", items: [
      { src: "assets/img/projects/rasta-la-vista/concept.webp", caption: "How do you teach India's geography in a way that's fun?" }
    ] },
    { type: "note", entry: 2, side: "right" },
    { type: "images", items: [
      { src: "assets/img/projects/rasta-la-vista/mechanics.webp", caption: "Ideation: rivers, roads and railways as coloured dots on hex edges" },
      { src: "assets/img/projects/rasta-la-vista/proof.webp", caption: "Proof of concept: routes across swappable numbered tiles" }
    ] },
    { type: "note", entry: 3 },
    { type: "images", items: [ { src: "assets/img/projects/rasta-la-vista/lofi.webp", caption: "Paper prototypes and the first playtests" } ] },
    { type: "note", entry: 4, side: "right" },
    { type: "images", items: [
      { src: "assets/img/projects/rasta-la-vista/tiles.webp", caption: "Interlocking edges: a tile can't connect the wrong way" },
      { src: "assets/img/projects/rasta-la-vista/pegs.webp", caption: "Pegs mark the places you've claimed" }
    ] },
    { type: "deck", kind: "tickets", title: "Four tickets, unlocked as you travel", hint: "Tap a ticket", items: [
      { src: "assets/img/projects/rasta-la-vista/t-bus.webp", caption: "Bus: unlocks with your first place" },
      { src: "assets/img/projects/rasta-la-vista/t-rail.webp", caption: "Rail: unlocks with two places" },
      { src: "assets/img/projects/rasta-la-vista/t-ferry.webp", caption: "Ferry: unlocks with three places" },
      { src: "assets/img/projects/rasta-la-vista/t-plane.webp", caption: "Plane: unlocks with five places, and scores 3 if you keep it" }
    ] },
    { type: "deck", title: "Action cards: drawn at every junction", hint: "Tap a card to read it", items: [
      { src: "assets/img/projects/rasta-la-vista/deck/act-1.webp", caption: "Chip In! Ask an opponent for one ticket of their choice" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-2.webp", caption: "Hitchhiker's Luck: move to the next place for free" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-3.webp", caption: "NO MEANS NO! Cancel an action played on you" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-4.webp", caption: "Pickpocket: steal a bus ticket" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-10.webp", caption: "Pickpocket: steal a train ticket" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-5.webp", caption: "Pickpocket: steal a ferry ticket" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-6.webp", caption: "Quarantine: stop an opponent for a round" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-7.webp", caption: "Rivalry: take one of their destination cards" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-8.webp", caption: "Black Tickets: return one, take two" },
      { src: "assets/img/projects/rasta-la-vista/deck/act-9.webp", caption: "Double Decker: two modes of transport this turn" }
    ] },
    { type: "deck", title: "Events: one every round, good, bad or neither", hint: "Tap a card to read it", items: [
      { src: "assets/img/projects/rasta-la-vista/deck/ev-negative-events-2.webp", caption: "Negative: Protests on the Golden Quadrilateral" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-negative-events-6.webp", caption: "Negative: Widespread signal failure" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-negative-events-3.webp", caption: "Negative: Heatwave in the North" },
      { src: "assets/img/projects/rasta-la-vista/deck/events-cover.webp", caption: "The event deck" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-neutral-events-2.webp", caption: "Neutral: Major detour" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-neutral-events-7.webp", caption: "Neutral: Priority boarding" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-neutral-events-3.webp", caption: "Neutral: Rush hour" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-positive-events-1.webp", caption: "Positive: Economic boom" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-positive-events-10.webp", caption: "Positive: Festival of Kites" },
      { src: "assets/img/projects/rasta-la-vista/deck/ev-positive-events-3.webp", caption: "Positive: Bollywood Film Awards in Mumbai" }
    ] },
    { type: "postcards", title: "Claim a place, keep its postcard", caption: "The landmark on the front, the place and a fact on the back. Hover or tap to turn one over.", items: [
      { name: "Hampi", front: "assets/img/projects/rasta-la-vista/pc/f-hampi.webp", back: "assets/img/projects/rasta-la-vista/pc/b-hampi.webp" },
      { name: "Jaipur", front: "assets/img/projects/rasta-la-vista/pc/f-jaipur.webp", back: "assets/img/projects/rasta-la-vista/pc/b-jaipur.webp" },
      { name: "Kolkata", front: "assets/img/projects/rasta-la-vista/pc/f-kolkata.webp", back: "assets/img/projects/rasta-la-vista/pc/b-kolkata.webp" },
      { name: "Goa", front: "assets/img/projects/rasta-la-vista/pc/f-goa.webp", back: "assets/img/projects/rasta-la-vista/pc/b-goa.webp" },
      { name: "Konark", front: "assets/img/projects/rasta-la-vista/pc/f-konark.webp", back: "assets/img/projects/rasta-la-vista/pc/b-konark.webp" },
      { name: "Guwahati", front: "assets/img/projects/rasta-la-vista/pc/f-guwahati.webp", back: "assets/img/projects/rasta-la-vista/pc/b-guwahati.webp" },
      { name: "Mumbai", front: "assets/img/projects/rasta-la-vista/pc/f-mumbai.webp", back: "assets/img/projects/rasta-la-vista/pc/b-mumbai.webp" },
      { name: "Jaisalmer", front: "assets/img/projects/rasta-la-vista/pc/f-jaisalmer.webp", back: "assets/img/projects/rasta-la-vista/pc/b-jaisalmer.webp" }
    ] },
    { type: "images", items: [ { src: "assets/img/projects/rasta-la-vista/passport.webp", caption: "The rulebook, printed as a passport" } ] },
    { type: "note", entry: 5 },
    { type: "images", items: [ { src: "assets/img/projects/rasta-la-vista/build.webp", caption: "Laser-cutting the acrylic tiles" } ] }
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
    // Pick a label and it goes on the front of the box; the grandmother sits on the lid
    { type: "boxshelf", dir: "assets/img/projects/packaging", title: "The range, boxed", pick: "Pick a label", lid: "assets/img/projects/packaging/lid.webp", caption: "Drag the box to turn it. The labels' contact details are left out here.", items: [
      { src: "assets/img/projects/packaging/label-kongu.webp", name: "Kongu masala mundhiri" },
      { src: "assets/img/projects/packaging/label-murungai.webp", name: "Murungai masala mundhiri" },
      { src: "assets/img/projects/packaging/label-uppu-kari.webp", name: "Uppu kari masala" },
      { src: "assets/img/projects/packaging/label-65-masala.webp", name: "65 masala" },
      { src: "assets/img/projects/packaging/label-ragi.webp", name: "Sprouted ragi mix" },
      { src: "assets/img/projects/packaging/sticker-native-groceries.webp", name: "Native groceries" },
      { src: "assets/img/projects/packaging/sticker-day-today.webp", name: "Day today snacks" },
      { src: "assets/img/projects/packaging/sticker-kids.webp", name: "Kids snack pack" }
    ] },
    { type: "hscroll", title: "Beyond the box", items: [
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
  ,
  uxplore: [
    { type: "note", entry: 0 },
    { type: "table", title: "Learning objectives, written as ABCD and placed on Bloom's ladder", hl: -1, cols: ["", "Behaviour", "Condition", "Degree", "Bloom's level"], rows: [
      ["Hick's Law", "Identify the faster menu variant, and justify it", "Using AR overlays on real walls", "Four in five correct", "Analyse"],
      ["Fitts's Law", "Tap targets and reposition calls to action", "In a scanned, real-world room", "Interaction gets a fifth faster", "Apply"],
      ["Tesler's Law", "Compare two flows and justify the simpler one", "In a 2D image-based simulation", "Three of four correct", "Evaluate"],
      ["All together", "Apply at least two laws to redesign a real app scenario", "Using what the AR and 2D lessons taught", "One working redesign prototype", "Create"]
    ] },
    { type: "note", entry: 1, side: "right" },
    { type: "process", title: "The instructional model, and the theories under it", items: [
      { title: "Iterative", notes: ["SAM: build a lesson, test it, refine it, quickly."] },
      { title: "Feedback-driven", notes: ["Learners see the result of every choice straight away."] },
      { title: "Hands-on", notes: ["Every lesson is something you do, not something you read."] },
      { title: "Constructivism", notes: ["Learners build knowledge by experimenting."] },
      { title: "Situated learning", notes: ["AR lessons are anchored in the room you're actually in."] }
    ] },
    { type: "note", entry: 2 },
    { type: "table", title: "Cognitive design principles, and where they show up", hl: -1, cols: ["Principle", "In UXplore"], rows: [
      ["Chunking", "A micro-lesson per law, with a few mini-challenges each"],
      ["Dual coding", "Visual AR overlays and explanatory text, together, in real time"],
      ["Immediate feedback", "Live timers, points and badges after every step"],
      ["Progressive disclosure", "AR instructions revealed one step at a time, so nothing overloads"]
    ] },
    { type: "appframe", title: "One lesson, start to finish", app: "UXplore", items: [
      { label: "Start", title: "Learn UX laws the interactive way.", text: "A calm teal opening, then a welcome that offers to explain more or to start learning straight away.", img: "assets/img/projects/uxplore/splash.webp" },
      { label: "Mode", title: "Choose how you want to learn.", text: "Spatial mode learns through your real environment with the camera; 2D learning runs guided on-screen activities.", img: "assets/img/projects/uxplore/mode.webp" },
      { label: "Journey", title: "Your learning journey.", text: "One law per tile. Finish a lesson and the next one opens.", img: "assets/img/projects/uxplore/journey.webp" },
      { label: "Lesson", title: "Twenty tiny, or five grouped?", text: "Each lesson says what you are about to feel before you feel it, with a way to learn more and a button to set up AR.", img: "assets/img/projects/uxplore/hick.webp" },
      { label: "Scan", title: "Your room becomes the lesson.", text: "Allow the camera, scan the space, and the buttons are placed on your own walls.", img: "assets/img/projects/uxplore/permission.webp" },
      { label: "Fitts's Law", title: "Big and near, or small and far.", text: "Tap the targets as they float in the room. The timer shows which is faster, and why.", img: "assets/img/projects/uxplore/fitts.webp" },
      { label: "Tesler's Law", title: "Where should the complexity live?", text: "In 2D, compare two flows for the same task and see who carries the complexity: you, or the system.", img: "assets/img/projects/uxplore/tesler.webp" },
      { label: "Done", title: "Lesson complete.", text: "Time taken, grouped against ungrouped, points earned and progress, then back to the hub or try again.", img: "assets/img/projects/uxplore/complete.webp" },
      { label: "Access", title: "Settings for every learner.", text: "High contrast, colour-blind friendly icons, larger targets, captions, narration, haptics and reduced motion.", img: "assets/img/projects/uxplore/access.webp" }
    ] },
    { type: "table", title: "Learning in AR: the CAMIL factors", hl: -1, cols: ["Factor", "How UXplore addresses it"], rows: [
      ["Presence", "Overlays anchored in the learner's real environment"],
      ["Agency", "Learners choose buttons, move calls to action and retry tasks"],
      ["Motivation", "Badges, points and bonus challenges"],
      ["Embodiment", "Learners reach out and touch floating AR elements"],
      ["Load", "Chunked tasks and step-by-step guidance"],
      ["Self-regulation", "Learners set the pace, retry lessons and can switch to 2D"]
    ] },
    { type: "note", entry: 4, side: "right" },
    { type: "hscroll", title: "The story, storyboarded", items: [
      { src: "assets/img/projects/uxplore/story-1.webp", caption: "From the chaos of learning UX to the first AR lesson", ar: "1398 / 715" },
      { src: "assets/img/projects/uxplore/story-2.webp", caption: "From Hick's Law in action to the learner's transformation", ar: "1469 / 715" }
    ] },
    { type: "note", entry: 5 }
  ],

  "graphic-design-days": [
    // A small graphic designer's folio: filter by medium, switch between grid and index, open any piece
    { type: "gdsite", intro: "College, 2021–22. Two semesters of graphic design: composition and silhouettes first, then type, posters, packaging and motion.", works: [
      { t: "Anil Fireworks", m: "Poster", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/anil-poster.webp"], d: "A poster for a Sivakasi fireworks maker: the name set big, a whole shop of crackers stacked under it, and a sky going off above." },
      { t: "Krrish, in one mask", m: "Poster", s: "Sem 4", img: ["assets/img/projects/graphic-design-days/poster-krrish.webp"], d: "A film poster reduced to a single strong image: the hero's mask, cut from black against a blue sky." },
      { t: "Schindler's List, in one fist", m: "Poster", s: "Sem 4", img: ["assets/img/projects/graphic-design-days/poster-schindler.webp"], d: "The same brief, opposite mood: a raised fist breaking the symbol it stands against, in black and white." },
      { t: "Hey you! Stop using plastic bags", m: "Packaging", s: "Sem 4", img: ["assets/img/projects/graphic-design-days/bag-front.webp", "assets/img/projects/graphic-design-days/bag-back.webp"], d: "The brown-bag project: a paper bag that argues against plastic, with an alien who'd rather you reused it, front and back." },
      { t: "Life as a Typophile", m: "Typography", s: "Sem 4", img: ["assets/img/projects/graphic-design-days/typophile-8.webp", "assets/img/projects/graphic-design-days/typophile-11.webp", "assets/img/projects/graphic-design-days/typophile-12.webp", "assets/img/projects/graphic-design-days/typophile-13.webp"], d: "One page of text about typophiles, set again and again to explore hierarchy: size, weight, direction and colour doing the work." },
      { t: "Lakshmi style", m: "Typography", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/alphabet.webp"], d: "An alphabet, numerals and symbols built from a style of my own." },
      { t: "Letters from crackers", m: "Typography", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/physical-1.webp", "assets/img/projects/graphic-design-days/physical-2.webp"], d: "Physical type: numerals laid out with firecrackers and photographed." },
      { t: "Found letters", m: "Typography", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/found-1.webp", "assets/img/projects/graphic-design-days/found-2.webp"], d: "Letters hiding in the world: the corners of a football pitch and a goalpost." },
      { t: "Letter abstraction", m: "Typography", s: "Sem 4", img: ["assets/img/projects/graphic-design-days/letter-abstract.webp"], d: "Letterforms cut, rotated and recombined until they become pattern." },
      { t: "Signs for new places", m: "Signage", s: "Sem 4", img: ["assets/img/projects/graphic-design-days/road-signs.webp"], d: "Road signs for places that don't have them yet: a gaming zone, a VR zone, kite flying and EV charging." },
      { t: "A cube of pop art", m: "Illustration", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/pop-1.webp", "assets/img/projects/graphic-design-days/pop-3.webp", "assets/img/projects/graphic-design-days/pop-5.webp", "assets/img/projects/graphic-design-days/pop-6.webp"], d: "Faces for a graphic cube in the spirit of pop art: halftone dots, flat colour, bursts and patterns." },
      { t: "Squares under tension", m: "Composition", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/shapes.webp"], d: "Squares turned, stacked and broken to show stability, chaos, tension and peace." },
      { t: "Silhouettes", m: "Illustration", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/icons.webp"], d: "Everyday things cut down to black silhouettes." },
      { t: "A rhyme in six frames", m: "Illustration", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/rhymes.webp"], d: "A nursery rhyme told in six small black-and-white frames." },
      { t: "Editorial spread", m: "Editorial", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/editorial.webp"], d: "A two-page magazine spread: headline, standfirst, columns and pictures, set on a grid." },
      { t: "The fireworks box", m: "Packaging", s: "Sem 3", img: ["assets/img/projects/graphic-design-days/cracker-box.webp"], d: "Packaging for the same fireworks maker, as a box you'd find on a shop shelf." }
    ] },
    { type: "moo", title: "An animal's sound, in type", word: "Moooo", text: "Motion, Sem 4: a sound turned into type that grows and bounces. Tap it to make it moo again.", stills: [ { src: "assets/img/projects/graphic-design-days/moo-1.webp", caption: "The first frame" }, { src: "assets/img/projects/graphic-design-days/moo-4.webp", caption: "The last frame" } ] }
  ],

  geometrica: [
    { type: "note", entry: 0 },
    { type: "images", items: [ { src: "assets/img/projects/geometrica/board-art.webp", caption: "The textured board: shape frames sit in its rows of holes" } ] },
    { type: "note", entry: 2, side: "right" },
    { type: "braille", title: "Every clue, in ink and in braille", cards: [
      { kind: "Shapes", q: "Build the shape made of two triangles placed next to each other", a: "A rhombus" },
      { kind: "Fractions", q: "Make two fifths of a regular shape with five sides", a: "Two of the pentagon's five parts" },
      { kind: "Shapes", q: "Make a regular shape with four equilateral triangles", a: "A larger equilateral triangle" }
    ] },
    { type: "note", entry: 3 },
    { type: "images", items: [
      { src: "assets/img/projects/geometrica/contents.webp", caption: "What's in the box" },
      { src: "assets/img/projects/geometrica/rules-1.webp", caption: "The rules" },
      { src: "assets/img/projects/geometrica/rules-2.webp", caption: "How points are won" }
    ] },
    { type: "note", entry: 1, side: "right" },
    { type: "images", items: [
      { src: "assets/img/projects/geometrica/answers-shapes.webp", caption: "Answer key: shapes" },
      { src: "assets/img/projects/geometrica/answers-fractions.webp", caption: "Answer key: fractions" },
      { src: "assets/img/projects/geometrica/card-front.webp", caption: "A clue card" }
    ] },
    { type: "note", entry: 4 },
    { type: "images", items: [ { src: "assets/img/projects/geometrica/board-flat.webp", caption: "The board, flat" } ] }
  ],

  "green-grocer": [
    { type: "note", entry: 1 },
    { type: "hscroll", title: "A market on three wheels", items: [
      { src: "assets/img/projects/green-grocer/rickshaw.webp", caption: "The modified auto-rickshaw", ar: "16 / 9" },
      { src: "assets/img/projects/green-grocer/rickshaw-road.webp", caption: "Produce on the shelves", ar: "1600 / 938" },
      { src: "assets/img/projects/green-grocer/rickshaw-road-2.webp", caption: "Ad space on the side", ar: "1600 / 938" },
      { src: "assets/img/projects/green-grocer/rickshaw-ad.webp", caption: "Advertising as it goes", ar: "16 / 9" }
    ] },
    { type: "note", entry: 2, side: "right" },
    { type: "images", items: [
      { src: "assets/img/projects/green-grocer/logo-dark.webp", caption: "The badge" },
      { src: "assets/img/projects/green-grocer/logo.webp", caption: "From farmers to you" }
    ] },
    { type: "note", entry: 3 },
    { type: "images", items: [
      { src: "assets/img/projects/green-grocer/journeys.webp", caption: "The journeys of small farmers and of intermediaries" }
    ] },
    { type: "note", entry: 5, side: "right" },
    { type: "images", layout: "phones", items: [
      { src: "assets/img/projects/green-grocer/app-1.webp", caption: "Farmers or advertisers" },
      { src: "assets/img/projects/green-grocer/app-2.webp", caption: "Sign up" },
      { src: "assets/img/projects/green-grocer/app-3.webp", caption: "Orders and earnings" },
      { src: "assets/img/projects/green-grocer/app-4.webp", caption: "Tracking" },
      { src: "assets/img/projects/green-grocer/app-6.webp", caption: "Marketing services" },
      { src: "assets/img/projects/green-grocer/app-7.webp", caption: "About us" }
    ] },
    { type: "images", items: [
      { src: "assets/img/projects/green-grocer/gtm.webp", caption: "Going to market" }
    ] }
  ],
  evoke: [
    { type: "note", entry: 0 },
    { type: "images", items: [ { src: "assets/img/projects/evoke/study.webp", caption: "Study of the groundnut: pod, seed coat, hull, kernel and skin" } ] },
    { type: "note", entry: 1, side: "right" },
    { type: "causes", title: "Four things to borrow from a shell", items: [
      { title: "Lightweight", text: "A thin shell that is still strong, so the structure stays easy to build and move." },
      { title: "A closed pod", text: "Two halves that fit snugly make a protective enclosure, and a sense of privacy." },
      { title: "Texture", text: "Ridged and bumpy outside, soft and smooth inside, which feels like comfort." },
      { title: "Insulation", text: "Air pockets within the walls: a double layer that keeps sound out." }
    ] },
    { type: "images", items: [ { src: "assets/img/projects/evoke/ideations.webp", caption: "Concepts and ideations, with the mood board" }, { src: "assets/img/projects/evoke/moodboard.webp", caption: "Shells, domes and timber" } ] },
    { type: "note", entry: 2 },
    { type: "images", items: [ { src: "assets/img/projects/evoke/concept.webp", caption: "Concept sketches: the full structure, a single pod and the tables" } ] },
    { type: "note", entry: 3, side: "right" },
    { type: "images", items: [ { src: "assets/img/projects/evoke/branding.webp", caption: "Logo, type, colour and mood" }, { src: "assets/img/projects/evoke/model.webp", caption: "The final model" } ] }
  ]
};
