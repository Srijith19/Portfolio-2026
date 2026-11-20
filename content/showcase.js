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
    { type: "note", entry: 0 },
    { type: "story", layout: "center", device: "watch", title: "On the wrist", steps: [
      { label: "Unlock", title: "Press the side button.", points: ["Wakes straight into Google Pay"], text: "The watch opens on Google Pay. One press of the side button and you're in.", img: "assets/img/projects/gpay-wrist/w-01.webp" },
      { label: "PIN", title: "Your UPI PIN, on a keypad you can hit.", points: ["Large keys for a small screen"], text: "Big round keys sized for a fingertip on a 45 mm screen, with four dots that fill as you type.", img: "assets/img/projects/gpay-wrist/w-16.webp" },
      { label: "Home", title: "Everything one tap away.", points: ["Pay by NFC", "Pay a contact", "Switch bank"], text: "Three big actions down the side, your people in a grid, and your history underneath.", img: "assets/img/projects/gpay-wrist/w-02.webp" },
      { label: "Pay by NFC", title: "Slide to pay.", points: ["A slide, not a tap", "No accidental payments"], text: "Paying takes a slide rather than a tap, so a brush of the sleeve can't send money.", img: "assets/img/projects/gpay-wrist/w-03.webp" },
      { label: "Scan", title: "Hold it near the scanner.", points: ["NFC, like a card"], text: "The watch already speaks NFC, so it pays at the counter the way a card would, and it can carry your cards too.", img: "assets/img/projects/gpay-wrist/w-11.webp" },
      { label: "Contacts", title: "Pay the people you pay most.", points: ["Slide to pay a contact"], text: "Your frequent contacts, one slide away.", img: "assets/img/projects/gpay-wrist/w-22.webp" },
      { label: "Bank", title: "Choose which account pays.", points: ["Switch accounts per payment"], text: "Switch the bank account behind a payment without picking up your phone.", img: "assets/img/projects/gpay-wrist/w-23.webp" },
      { label: "History", title: "What went in and out.", points: ["Glanceable amounts"], text: "Every payment, with a green or red amount you can read at a glance.", img: "assets/img/projects/gpay-wrist/w-15.webp" }
    ] },
    { type: "note", entry: 1, side: "right" },
    { type: "collage", title: "More screens", bg: "sky", items: [
      { src: "assets/img/projects/gpay-wrist/w-09.webp", caption: "Cards" },
      { src: "assets/img/projects/gpay-wrist/w-13.webp", caption: "Contacts" },
      { src: "assets/img/projects/gpay-wrist/w-14.webp", caption: "Banks" },
      { src: "assets/img/projects/gpay-wrist/w-24.webp", caption: "Settings" }
    ] },
    { type: "concl", why: "UPI is everywhere in India, but paying with it still means taking out your phone. I wanted to see whether a watch could do it alone.", how: "The watch already speaks NFC, so it can pay at a counter like a card. On top of that: a PIN keypad sized for the wrist, a slide instead of a tap so nothing is paid by accident, and contacts and bank accounts one step from home.", ended: "As a concept and a clickable prototype, designed around the 45 mm Apple Watch screen." }
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
    // Played like an arcade game: the printed map, its routes traced, the real event and action cards
    { type: "rgame", dir: "assets/img/projects/rasta-la-vista", title: "Rasta La Vista", text: "The printed board with its routes traced, the ticket, event and action cards from the game, and up to three computer travellers. Events that rotate the junction tiles are left out of this digital version." },
    { type: "images", items: [
      { src: "assets/img/projects/rasta-la-vista/concept.webp", caption: "How do you teach the next generation about India's geography in a way that's engaging and fun?" }
    ] },
    { type: "rlv", kind: "strategy", title: "Design strategy", items: [
      { t: "Educational", d: "Demystify public transport for all ages through an intuitive game: route planning, resource management and the trade-offs between buses, trains and ferries, so a child feels like an empowered adventurer.", k: "Attention to detail" },
      { t: "Strategic", d: "A satisfying puzzle that scales with the player. A child should feel clever in their choices, while a seasoned gamer feels the weight of long-term decisions, all within the same framework.", k: "Satisfaction" },
      { t: "Engaging", d: "Lively interaction that feels different every time it comes to the table: memorable moments, friendly rivalries and a shared story families want to revisit.", k: "Memorable" } ] },
    { type: "rlv", kind: "process", title: "Design process", items: [
      { t: "Empathise", d: "We started by empathising with kids and with the adventurous, chaotic spirit of Indian public transport, to create a truly relatable experience." },
      { t: "Define", d: "The goal became a single challenge: turn the complex logistics of Indian travel into a simple, joyful and educational tabletop adventure." },
      { t: "Ideate", d: "Ideation focused on the strategic placement of cities and routes, with key reshuffle elements so every playthrough feels new and unpredictable." },
      { t: "Prototype", d: "Through rapid, hands-on prototyping with paper and pen, we refined every mechanic, from movement to the final scoring system." },
      { t: "Test", d: "Continuous playtesting with our batchmates was our compass: it balanced the card deck, clarified rules and kept the game fun and fair for all ages." } ] },
    { type: "rlv", kind: "timeline", title: "Nine days, start to finish", days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9"], caption: "A rapid, intensive sprint focused on creativity, prototyping and feedback from players.", items: [
      { t: "Research and case studies", s: 1, e: 2, c: "m" }, { t: "Core mechanics", s: 2, e: 3, c: "t" }, { t: "Ideation", s: 3, e: 3, c: "o" },
      { t: "First low-fidelity prototype", s: 3, e: 4, c: "b" }, { t: "Proof of concept, second prototype", s: 4, e: 5, c: "o" }, { t: "Player feedback", s: 5, e: 6, c: "t" },
      { t: "Iterations", s: 6, e: 7, c: "g" }, { t: "High-fidelity build", s: 7, e: 8, c: "o" }, { t: "Final exhibition", s: 9, e: 9, c: "g" } ] },
    { type: "rlv", kind: "cases", title: "What we borrowed from other games", caption: "We took apart games we knew, looking for what made each one engaging and where it could improve.", items: [
      { t: "Catan", d: "Rearrangeable hexagonal tiles let the map change every game, so each session is unique. A hexagon also gives more directions to move.", k: "the modular hex board" },
      { t: "Abalone", d: "Strategic movement and careful positioning shape how players plan their steps. Every move matters.", k: "a thoughtful, tactical pace" },
      { t: "Scotland Yard", d: "Crossing paths adds tension and surprise; the chance of meeting others on the board keeps play social and unpredictable.", k: "routes that cross" },
      { t: "Monopoly", d: "Developing and owning spaces creates a sense of progression, so travel becomes a story of ownership and collection.", k: "claiming places" } ] },
    { type: "note", entry: 2, side: "right" },
    { type: "rlv", kind: "boards", title: "Core mechanic: a board that changes", proof: "assets/img/projects/rasta-la-vista/board-proof.webp", final: "assets/img/projects/rasta-la-vista/map-final.webp" },
    { type: "images", items: [ { src: "assets/img/projects/rasta-la-vista/lofi.webp", caption: "Paper prototypes and the first playtests" } ] },
    { type: "note", entry: 3 },
    { type: "rlv", kind: "feedback", title: "What players told us", good: ["The game was engaging", "The rules were easy to understand", "The rearrangeable map was appreciated"], bad: ["Too few player-to-player conflicts early in the game", "Players kept making mistakes when rearranging the map, even with colour coding", "Unvisited places were hard to spot at a glance"] },
    { type: "rlv", kind: "iterations", title: "Iterations", items: [
      { t: "Adding action cards", d: "Action cards brought more player-to-player conflict. They can be drawn throughout the game and change its course at crucial moments.", img: "assets/img/projects/rasta-la-vista/deck/act-4.webp" },
      { t: "Interlocking hex tiles", d: "To prevent placement errors, tiles got three puzzle-like edges, one shape per route type, so a tile physically can't connect the wrong way.", img: "assets/img/projects/rasta-la-vista/tiles.webp" },
      { t: "Player pegs", d: "Pegs mark the places each player has visited, so nobody has to remember: players can spend that attention on strategy.", img: "assets/img/projects/rasta-la-vista/pegs.webp" } ] },
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
    { type: "rlv", kind: "passport", title: "The rulebook is a passport", caption: "Tap the page or use the arrows to turn it.", pages: [
      { src: "assets/img/projects/rasta-la-vista/pp-0.webp", cap: "The cover" }, { src: "assets/img/projects/rasta-la-vista/pp-1.webp", cap: "01 Introduction · 14 Final scoring" }, { src: "assets/img/projects/rasta-la-vista/pp-6.webp", cap: "02 Introduction · 13 Junctions and action cards" },
      { src: "assets/img/projects/rasta-la-vista/pp-2.webp", cap: "03 Objective · 12 Claiming a location" }, { src: "assets/img/projects/rasta-la-vista/pp-3.webp", cap: "04 Components · 11 Movement and tickets" }, { src: "assets/img/projects/rasta-la-vista/pp-4.webp", cap: "05 Game setup · 10 Playing the game" },
      { src: "assets/img/projects/rasta-la-vista/pp-5.webp", cap: "06 Assets · 09 Playing the game" }, { src: "assets/img/projects/rasta-la-vista/pp-7.webp", cap: "07 Game setup · 08 Assets" } ] },
    { type: "note", entry: 4 },
    { type: "images", items: [ { src: "assets/img/projects/rasta-la-vista/build.webp", caption: "Laser-cutting the acrylic tiles" } ] },
    { type: "rlv", kind: "learnings", title: "What we learned", items: [
      { t: "Physical design", d: "Prevent player error with the object itself, like interlocking tiles, rather than relying on players to remember rules." },
      { t: "Offload memory", d: "Pegs for visited places free players to focus on deeper strategy." },
      { t: "Rapid prototyping", d: "The most effective way to test competing ideas early and drop the ones that don't work." },
      { t: "Modularity", d: "A variable hex-tile board is a direct and powerful driver of replayability." },
      { t: "Real-world observation", d: "The ultimate test of a design's intuitiveness and appeal." } ] },
    { type: "rlv", kind: "future", title: "Where it goes next", items: [
      { t: "Formal feedback analysis", d: "Review what we saw at the exhibition: where players were confused, made mistakes or got stuck, and refine the rules and pieces." },
      { t: "Rigorous balance testing", d: "It works, but is it balanced? Focused sessions with experienced players to find and remove dominant strategies." },
      { t: "Rulebook optimisation", d: "A clearly illustrated rulebook, tested by people who have never seen the game learning it without any explanation." } ] }
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
    { type: "note", entry: 0 },
    { type: "note", entry: 1, side: "right" },
    // The first products came in round tins, so their labels wrap all the way round
    { type: "shelf", title: "The first range, in tins", pick: "Pick a label", caption: "Drag the tin to turn it. The labels' contact details are left out here.", items: [
      { src: "assets/img/projects/packaging/label-kongu.webp", name: "Kongu masala mundhiri" },
      { src: "assets/img/projects/packaging/label-murungai.webp", name: "Murungai masala mundhiri" },
      { src: "assets/img/projects/packaging/label-uppu-kari.webp", name: "Uppu kari masala" },
      { src: "assets/img/projects/packaging/label-65-masala.webp", name: "65 masala", ar: "2" },
      { src: "assets/img/projects/packaging/label-ragi.webp", name: "Sprouted ragi mix" }
    ] },
    { type: "note", entry: 2 },
    // Later ranges came in boxes: a sticker on the front, the grandmother on the lid, plain board everywhere else
    { type: "boxshelf", plain: true, dir: "assets/img/projects/packaging", title: "The later ranges, boxed", pick: "Pick a box", lid: "assets/img/projects/packaging/lid.webp", caption: "Drag the box to turn it.", items: [
      { src: "assets/img/projects/packaging/sticker-native-groceries.webp", name: "Native groceries", ar: "2" },
      { src: "assets/img/projects/packaging/sticker-day-today.webp", name: "Day today snacks", ar: "2" },
      { src: "assets/img/projects/packaging/sticker-kids.webp", name: "Kids snack pack", ar: "2" }
    ] },
    { type: "images", title: "Gift wraps", layout: "wraps", items: [
      { src: "assets/img/projects/packaging/wrap-1-h.webp", caption: "Gift wrap: best wishes, in green" },
      { src: "assets/img/projects/packaging/wrap-2-h.webp", caption: "Gift wrap: best wishes, with hearts" }
    ] },
    { type: "images", title: "Launch", items: [
      { src: "assets/img/projects/packaging/lid.webp", caption: "The lid: the grandmother, and the village at work" },
      { src: "assets/img/projects/packaging/poster-murungai.webp", caption: "A launch post" }
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
    { type: "story", layout: "center", device: "tablet", title: "One lesson, start to finish", steps: [
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
    { type: "note", entry: 5 },
    { type: "concl", why: "Beginners read about the laws of UX instead of feeling them, so they struggle to apply them. The Instructional Design course asked us to design how something hard should be taught.", how: "Lessons on a tablet that let you feel each law: in AR, in the room you're in, for the laws you learn with your body, and in 2D simulations for the analytical ones. Built with the SAM model, with feedback after every step.", ended: "As a designed course and a lesson-by-lesson prototype, compared against learning the same laws from videos or a textbook." }
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
    { type: "images", items: [ { src: "assets/img/projects/geometrica/board-3d.webp", caption: "The board: rows of holes in orange, blue and green, where the shape frames sit" } ] },
    { type: "geoplay", title: "Play a clue", caption: "The clue card is printed in ink and in braille, like the real ones.", clues: [
      { q: "Make two fifths of a regular pentagon", parts: 5, need: 2, yes: "Two of five parts. That's two fifths!" },
      { q: "Make three quarters of a square", parts: 4, need: 3, yes: "Three of four parts. Three quarters!" },
      { q: "Make half of a regular hexagon", parts: 6, need: 3, yes: "Three of six parts make a half!" },
      { q: "Make one third of a hexagon", parts: 6, need: 2, yes: "Two of six parts. One third!" }
    ] },
    { type: "note", entry: 2, side: "right" },
    { type: "braille", title: "Every clue, in ink and in braille", cards: [
      { kind: "Shapes", q: "Build the shape made of two triangles placed next to each other", a: "A rhombus" },
      { kind: "Fractions", q: "Make two fifths of a regular shape with five sides", a: "Two of the pentagon's five parts" },
      { kind: "Shapes", q: "Make a regular shape with four equilateral triangles", a: "A larger equilateral triangle" }
    ] },
    { type: "note", entry: 3 },
    { type: "collage", title: "In the box", bg: "cream", items: [
      { src: "assets/img/projects/geometrica/contents.webp", caption: "What's in the box", wide: true },
      { src: "assets/img/projects/geometrica/rules-1.webp", caption: "The rules" },
      { src: "assets/img/projects/geometrica/rules-2.webp", caption: "How points are won" }
    ] },
    { type: "note", entry: 1, side: "right" },
    { type: "collage", title: "Answer keys and cards", bg: "sky", items: [
      { src: "assets/img/projects/geometrica/answers-shapes.webp", caption: "Answer key: shapes" },
      { src: "assets/img/projects/geometrica/card-front.webp", caption: "A clue card" },
      { src: "assets/img/projects/geometrica/answers-fractions.webp", caption: "Answer key: fractions" }
    ] },
    { type: "note", entry: 4 },
    { type: "images", items: [ { src: "assets/img/projects/geometrica/board-flat.webp", caption: "The board, flat" } ] }
  ],

  "spatial-design": [
    { type: "note", entry: 0 },
    { type: "note", entry: 1, side: "right" },
    { type: "images", title: "Store front", items: [
      { src: "assets/img/projects/spatial-design/facade.webp", caption: "Facade elevation: two windows either side of the entrance" },
      { src: "assets/img/projects/spatial-design/plan.webp", caption: "Plan: the window depths and the entry" }
    ] },
    { type: "note", entry: 2 },
    { type: "images", title: "Final renders", items: [
      { src: "assets/img/projects/spatial-design/render-front.webp", caption: "Facade" },
      { src: "assets/img/projects/spatial-design/render-side.webp", caption: "Side elevation" }
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
