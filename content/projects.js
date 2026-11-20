/* ==========================================================================
   content/projects.js — every project, one object each, in the order they
   appear. To add one: copy an object, give it a new id, put its images in
   assets/img/projects/<id>/. Fields left "" are hidden on the site.
   depth: "Case study" (needs a file in content/case-studies/), "Entry" (text
   in content/entries.js) or "Glimpse" (one image and a line).
   ========================================================================== */
SITE.projects = [
  { id: "texgenie", title: "TexGenie", year: "2023 / 2026", sortYear: 2026, context: "PES University", chapter: "PES University", note: "B.Des thesis, rebuilt in 2026",
    discipline: "UX", also: ["AI"], theme: "Systems and commerce", depth: "Case study", status: "Thesis",
    role: "", team: "", tools: "Figma, React", readMins: 8,
    summary: "A production manager for home-textile factories that makes people faster, not fewer: a desktop for the office, a phone app for the floor.",
    outcome: "One live record of every order, shared by the office desktop and the floor phone app.",
    cover: "assets/img/projects/texgenie/cover.webp", focus: "50% 50%", hero: "assets/img/projects/texgenie/hero.webp", gallery: [] },

  { id: "immerse-editor-pro", title: "Immerse Editor Pro", year: "2026", sortYear: 2026, context: "IIT Jodhpur", chapter: "IIT Jodhpur", note: "M.Des thesis",
    discipline: "XR", also: ["UX", "Film"], theme: "Moving image and space", depth: "Case study", status: "Thesis",
    role: "Researcher and designer", team: "Solo", guide: "Dr Pranjal Protim Borah", tools: "Figma, Unity", readMins: 10,
    summary: "A spatial-first editing framework for immersive films, across desktop and VR, grounded in interviews with 7 production teams.",
    outcome: "16 screens across desktop and VR, built on 16 interviews across 7 teams and confirmed by 3 practitioners. Became an ICoRD 2027 paper.",
    cover: "assets/img/projects/immerse-editor-pro/cover.webp", focus: "50% 50%", hero: "assets/img/projects/immerse-editor-pro/hero.webp",
    thumbs: ["assets/img/projects/immerse-editor-pro/roi.webp", "assets/img/projects/immerse-editor-pro/vr-audio.webp"], gallery: [] },

  // Hidden while I work there. Set hidden: false to publish it in the i3 slot and everywhere else.
  { id: "oncopilot", hidden: true, title: "Oncopilot", year: "2026", sortYear: 2026, context: "i3 Digital Health", chapter: "Practice", note: "Full-time role",
    discipline: "UX", also: ["AI"], theme: "Care and access", depth: "Case study", status: "In progress",
    role: "Interaction designer", team: "", tools: "Figma, FigJam", readMins: 4, confidential: true,
    summary: "AI-supported tools that help oncologists find trials, experts and answers.",
    outcome: "OncoCommunity, OncoTrials and Ask AI, on a shared typography system.",
    cover: "", hero: "", gallery: [] },

  { id: "atelier-xr", title: "Atelier XR", year: "2025", sortYear: 2025, context: "IIT Jodhpur", chapter: "IIT Jodhpur",
    discipline: "XR", also: ["UX"], theme: "Systems and commerce", depth: "Case study", status: "In progress",
    role: "", team: "", tools: "Figma, Unity", readMins: 4,
    // figma: "https://www.figma.com/proto/…",  ← paste the prototype's share link here for a live prototype on the page
    summary: "A mixed-reality home-textile studio for trying curtains and linens in your own room before buying.",
    outcome: "Personalised visualisation and design exploration, in the room the textiles are for.",
    cover: "assets/img/projects/atelier-xr/cover.webp", focus: "50% 45%", hero: "", gallery: [] },

  { id: "who-vr", title: "WHO VR", year: "2025", sortYear: 2025, context: "IIT Jodhpur", chapter: "IIT Jodhpur", note: "Immersive Media Experience Design Lab",
    videos: [{ label: "Watch the teaser", runtime: "0:40", q: "WhoVR Teaser" }],
    discipline: "Film", also: ["XR"], theme: "Moving image and space", depth: "Case study", status: "Coursework", readMins: 9,
    role: "Co-director, edit and VFX", duration: "12 days", guide: "Dr Jayesh Pillai", team: "Daniel Pushparaj, Edwin Meleth, Nidhin Martin, Srijith D Raj", tools: "Insta360, Premiere Pro, After Effects, Reaper",
    summary: "A 360° short film that tests whether cinema's editing tricks survive in VR.",
    outcome: "A 360° film screened in headsets at Immersive Realities, IIT Jodhpur, with written reviews from viewers.",
    cover: "assets/img/projects/who-vr/cover.webp", focus: "62% 50%", hero: "", gallery: [], video: "" },

  { id: "reven-vr", title: "Reven VR", year: "2025", sortYear: 2025, context: "IIT Jodhpur", chapter: "IIT Jodhpur", note: "SDR Studios · Chapter 1",
    videos: [{ label: "Watch the trailer", runtime: "0:57", q: "RevenVR Trailer" }, { label: "Watch a gameplay glimpse", q: "Reven VR gameplay" }],
    discipline: "Game", also: ["XR"], theme: "Play and worlds", depth: "Case study", status: "Coursework", readMins: 5, tone: "night",
    role: "Game designer and developer", team: "Solo", tools: "Unity, Blender, hand tracking",
    summary: "A hand-tracked VR action game with katana combat, set in an abandoned amusement park.",
    outcome: "Chapter 1: a playable level with hand-tracked katana and axe combat, enemy AI and cinematic cutscenes.",
    cover: "assets/img/projects/reven-vr/cover.webp", focus: "42% 50%", hero: "assets/img/projects/reven-vr/hero.webp", gallery: [], video: "" },

  { id: "vannavision", title: "VannaVision", year: "", sortYear: null, context: "IIT Jodhpur", chapter: "IIT Jodhpur",
    discipline: "XR", also: [], theme: "Care and access", depth: "Entry", status: "In development",
    role: "", team: "", tools: "Meta Quest",
    summary: "A colour-blindness simulator for Meta Quest: see the room the way a colour-blind person does.",
    cover: "", hero: "", gallery: [] },

  { id: "kego-care", title: "Kego Care", year: "", sortYear: null, context: "Freelance", chapter: "Practice",
    discipline: "UX", also: [], theme: "Care and access", depth: "Entry", status: "Completed",
    role: "", team: "", tools: "",
    summary: "An app and design system for urology and pelvic-floor health.",
    cover: "", hero: "", gallery: [] },

  { id: "dreambig", title: "Dreambig fitness app", year: "", sortYear: null, context: "Freelance", chapter: "Practice", note: "Dreambig Soccer School",
    discipline: "UX", also: [], theme: "Care and access", depth: "Entry", status: "Client work",
    role: "Designer and builder", team: "", tools: "PWA, Android",
    summary: "A fitness-assessment app built for a youth football coach.",
    cover: "", hero: "", gallery: [] },

  { id: "shoetime", title: "ShoeTime", year: "2023", sortYear: 2023, context: "PES University", chapter: "PES University", note: "Reviewed by faculty from IISc Bengaluru",
    discipline: "UX", also: [], theme: "Everyday interfaces", depth: "Case study", status: "Coursework", readMins: 6,
    role: "", team: "", tools: "Figma, Google Forms",
    links: [{ label: "Try the prototype", href: "https://tiny.cc/ShoeTime" }, { label: "Research documentation", href: "https://tiny.cc/ShoeTimeD" }],
    summary: "Making online shoe shopping more reliable and exciting, from a survey of 220+ people and 15+ interviews.",
    outcome: "Eight product requirements, four that mattered most, and a high-fidelity prototype of a multi-brand store.",
    cover: "assets/img/projects/shoetime/cover.webp", focus: "22% 50%", hero: "assets/img/projects/shoetime/hero.webp", gallery: [] },

  { id: "internshala", title: "Internshala redesign", year: "2021", sortYear: 2021, context: "PES University", chapter: "PES University", note: "B.Des project",
    discipline: "UX", also: [], theme: "Everyday interfaces", depth: "Case study", status: "Coursework", readMins: 7,
    role: "Research, wireframes, design system and prototype", team: "Team project", tools: "Figma",
    links: [{ label: "Try the prototype", href: "https://tiny.cc/ISProto" }, { label: "Research documentation", href: "https://tiny.cc/InterShala" }],
    summary: "Redesigning India's biggest internship app from the student's side, built on a survey, market research and a three-platform benchmark.",
    outcome: "Four ranked needs, a new information architecture and a high-fidelity prototype with nine ways to browse internships, an internship calendar and fraud reporting.",
    cover: "assets/img/projects/internshala/cover.webp", focus: "55% 50%", hero: "assets/img/projects/internshala/hero.webp",
    thumbs: ["assets/img/projects/internshala/s-companies.webp", "assets/img/projects/internshala/s-home.webp"], gallery: [] },

  { id: "jiosaavn", title: "JioSaavn redesign", year: "", sortYear: null, context: "Personal project", chapter: "PES University",
    discipline: "UX", also: ["Visual"], theme: "Everyday interfaces", depth: "Entry", status: "Concept",
    role: "Solo", team: "", tools: "Figma",
    links: [{ label: "Try the prototype", href: "https://tiny.cc/JioSavn" }],
    summary: "A minimal redesign of the music app I use every day, keeping its own brand guide.",
    cover: "assets/img/projects/jiosaavn/cover.webp", focus: "20% 50%", hero: "assets/img/projects/jiosaavn/cover.webp",
    gallery: [
      { src: "assets/img/projects/jiosaavn/phones.webp", caption: "Home, top charts and now playing" },
      { src: "assets/img/projects/jiosaavn/section.webp", full: true, caption: "What changed, and why" }
    ] },

  { id: "dignity", title: "Dignity in Health Care", year: "2024", sortYear: 2024, context: "IIT Jodhpur", chapter: "IIT Jodhpur", note: "School of Design",
    discipline: "UX", also: ["Physical"], theme: "Care and access", depth: "Case study", status: "Coursework", readMins: 6,
    role: "", duration: "4 weeks", guide: "Nishant Sharma", team: "Bhavika, Srijith D Raj, Kashish, Aakarsh, Vishakha and Sudhanshu", tools: "",
    summary: "Product design and design research on defecation for bedridden patients: a problem people find too awkward to talk about.",
    outcome: "Six key insights from a field visit to AIIMS Jodhpur, five prototype iterations, and a final design that stays confidential.",
    cover: "assets/img/projects/dignity/cover.webp", focus: "0% 50%", hero: "", gallery: [] },

  { id: "cookr", title: "Cookr", year: "2022–23", sortYear: 2022, context: "Internship", chapter: "Practice",
    discipline: "UX", also: ["Visual"], theme: "Everyday interfaces", depth: "Entry", status: "Shipped",
    role: "Design intern", team: "", tools: "",
    summary: "UX across five products, plus content and campaign design.",
    cover: "assets/img/projects/cookr/cover.webp", focus: "50% 40%", hero: "", gallery: [] },

  { id: "savoury-skies", title: "Savoury Skies Kitchen", year: "2023–24", sortYear: 2023, context: "Cloud kitchen startup", chapter: "Practice", note: "Run with friends",
    discipline: "Visual", also: ["UX"], theme: "Everyday interfaces", depth: "Entry", status: "Ran 2023–24",
    role: "Creative head", team: "", tools: "Illustrator, Photoshop, Figma",
    summary: "Branding, a website and social media for a subscription cloud kitchen I ran with friends.",
    cover: "assets/img/projects/savoury-skies/cover.webp", focus: "50% 50%", hero: "assets/img/projects/savoury-skies/cover.webp",
    gallery: [ { src: "assets/img/projects/savoury-skies/board.webp", natural: true, caption: "Logo, website, Instagram and stationery" } ] },

  { id: "kalviexpert", title: "KalviExpert", year: "", sortYear: null, context: "Freelance", chapter: "Practice",
    discipline: "UX", also: [], theme: "Everyday interfaces", depth: "Glimpse", status: "Client work",
    role: "UI/UX designer", team: "", tools: "Figma",
    summary: "A responsive website for KalviExpert, a place for students to learn everything about their education.",
    cover: "assets/img/projects/kalviexpert/cover.webp", focus: "50% 50%", hero: "",
    gallery: [ { src: "assets/img/projects/kalviexpert/mobile.webp", natural: true, caption: "The mobile layout" } ] },

  { id: "native-packaging", title: "Native groceries packaging", year: "", sortYear: null, context: "Packaging design", chapter: "Practice",
    discipline: "Visual", also: ["Physical"], theme: "Everyday interfaces", depth: "Glimpse", status: "",
    role: "Packaging designer", team: "", tools: "Illustrator",
    summary: "Boxes, labels and wraps for a traditional groceries brand, with a grandmother on the lid and village life running round the base.",
    cover: "assets/img/projects/packaging/cover.webp", focus: "50% 50%", hero: "", gallery: [] },

  { id: "gpay-wrist", title: "GPay for Apple Watch", year: "2022", sortYear: 2022, context: "PES University", chapter: "PES University",
    discipline: "UX", also: ["Visual"], theme: "Everyday interfaces", depth: "Entry", status: "Concept",
    role: "", team: "", tools: "Figma, NFC",
    links: [{ label: "Try the prototype", href: "https://tiny.cc/GpayAW" }],
    summary: "A concept for paying with UPI from a smartwatch over NFC, with no phone needed.",
    cover: "assets/img/projects/gpay-wrist/cover.webp", focus: "80% 50%", hero: "assets/img/projects/gpay-wrist/watch.webp",
    gallery: [
      { src: "assets/img/projects/gpay-wrist/screens-a.webp", full: true, caption: "Scan to pay, PIN, contacts and banks" },
      { src: "assets/img/projects/gpay-wrist/screens-b.webp", full: true, caption: "Cards, unlock, switching accounts, payment done, pay through NFC and settings" }
    ] },

  { id: "akai-tsuki", title: "Akai Tsuki no Miyako", year: "2025", sortYear: 2025, context: "IIT Jodhpur", chapter: "IIT Jodhpur",
    videos: [{ label: "Watch the cinematic trailer", runtime: "0:46", q: "AkaiTsukinoMiyako Cinematic Trailer" }, { label: "Watch the environment walkthrough", runtime: "3:42", q: "Akai Tsuki no Miyako Walkthrough" }],
    discipline: "Visual", also: ["Game"], theme: "Play and worlds", depth: "Entry", status: "Coursework", note: "SDR Studios",
    role: "", team: "", tools: "",
    summary: "The City of the Red Moon: a hidden mountain city frozen in time under a crimson moon.",
    tone: "night", wordmark: "assets/img/projects/akai-tsuki/wordmark.webp",
    cover: "assets/img/projects/akai-tsuki/render-wall.webp", focus: "45% 40%", hero: "assets/img/projects/akai-tsuki/render-palace.webp",
    thumbs: ["assets/img/projects/akai-tsuki/concept-torii.webp", "assets/img/projects/akai-tsuki/render-hall.webp"],
    gallery: [] },

  { id: "rasta-la-vista", title: "Rasta La Vista", year: "2025", sortYear: 2025, context: "IIT Jodhpur", chapter: "IIT Jodhpur", note: "Board Game Design, guided by Prof. Prasad Bokil", tone: "fiesta",
    discipline: "Physical", also: ["Game"], theme: "Play and worlds", depth: "Entry", status: "Coursework",
    role: "Game designer", team: "Edwin, Mariya, Nidhin and Srijith", tools: "Illustrator, laser-cut acrylic",
    summary: "A board game for travellers and explorers: buy a ticket, ride India's buses, trains, ferries and planes, and claim places before anyone else. Play it right here.",
    cover: "assets/img/projects/rasta-la-vista/hero.webp", focus: "50% 55%", hero: "assets/img/projects/rasta-la-vista/hero.webp", gallery: [] },

  { id: "shape-chase", title: "Shape Chase", year: "", sortYear: null, context: "Coursework", chapter: "IIT Jodhpur",
    discipline: "Physical", also: ["Game"], theme: "Play and worlds", depth: "Glimpse", status: "Coursework",
    role: "", team: "", tools: "Chalk",
    summary: "A chalk-drawn curriculum game for learning shapes.",
    cover: "", hero: "", gallery: [] },

  { id: "fredrick-runs", title: "Fredrick Runs", year: "", sortYear: null, context: "PES University", chapter: "PES University", note: "A game from D/SDR",
    videos: [{ label: "Watch the gameplay", href: "https://tiny.cc/FDR" }],
    discipline: "Game", also: ["Visual"], theme: "Play and worlds", depth: "Entry", status: "Coursework",
    role: "Game designer", team: "", tools: "Scratch",
    summary: "A 2D runner through New York, built in Scratch, with its own poster.",
    cover: "assets/img/projects/fredrick-runs/poster.webp", focus: "50% 30%", hero: "assets/img/projects/fredrick-runs/level-2.webp",
    thumbs: ["assets/img/projects/fredrick-runs/level-1.webp", "assets/img/projects/fredrick-runs/level-3.webp"],
    gallery: [] },

  { id: "namma-metro", title: "Namma Metro map for colour blindness", year: "", sortYear: null, context: "PES University", chapter: "PES University",
    discipline: "Visual", also: ["UX"], theme: "Care and access", depth: "Glimpse", status: "Coursework",
    role: "", team: "Srijith D Raj, Dara Shashank, Vishwak Tummala", tools: "",
    links: [{ label: "The role of colour in a map", href: "https://tiny.cc/NMR" }],
    summary: "Redesigning Bengaluru's metro map so that people with colour blindness can read it.",
    cover: "assets/img/projects/namma-metro/cover.webp", focus: "50% 50%", hero: "", gallery: [] },

  { id: "space-plan", title: "Human-centred space plan", year: "", sortYear: null, context: "PES University", chapter: "PES University", note: "Human-Centred Design and Ergonomics",
    videos: [{ label: "Walk through the 3D model", id: "ozqf17z4oyo" }],
    discipline: "Physical", also: [], theme: "Everyday interfaces", depth: "Glimpse", status: "Coursework",
    role: "", team: "", tools: "",
    summary: "An ergonomic plan for a shared hall, worked out on paper and then modelled in 3D.",
    cover: "assets/img/projects/space-plan/cover.webp", focus: "50% 50%", hero: "", gallery: [] },

  { id: "smart-device", title: "Interactive smart device", year: "", sortYear: null, context: "PES University", chapter: "PES University",
    discipline: "Physical", also: [], theme: "Everyday interfaces", depth: "Glimpse", status: "Coursework",
    role: "", team: "", tools: "Arduino",
    links: [{ label: "See the design process", href: "https://tiny.cc/InSD" }],
    summary: "An Arduino prototype that senses objects with an ultrasonic sensor and shows how far away they are.",
    cover: "assets/img/projects/smart-device/cover.webp", focus: "50% 50%", hero: "",
    gallery: [ { src: "assets/img/projects/smart-device/renders.webp", natural: true, caption: "Form studies for the device" } ] },

  // Added from the 2nd–4th year folders and the Instructional Design deck
  { id: "uxplore", title: "UXplore", year: "2025", sortYear: 2025, context: "IIT Jodhpur", chapter: "IIT Jodhpur", note: "Instructional Design",
    discipline: "XR", also: ["UX"], theme: "Care and access", depth: "Entry", status: "Coursework",
    role: "", team: "Edwin, Nischay, Bhoomika and Srijith", tools: "Figma, AR",
    summary: "An instructional design project: using the SAM model, constructivism and situated learning to teach beginners the laws of UX, by making them feel each law in AR and in 2D.",
    cover: "assets/img/projects/uxplore/hick-ungrouped.webp", focus: "50% 50%", hero: "assets/img/projects/uxplore/hick-grouped.webp", gallery: [] },

  { id: "graphic-design-days", title: "Graphic Design Days", year: "2021–22", sortYear: 2021, context: "PES University", chapter: "PES University", note: "Graphic Design and Advanced Graphic Design",
    discipline: "Visual", also: [], theme: "Moving image and space", depth: "Entry", status: "Coursework",
    role: "", team: "", tools: "Illustrator, Photoshop, After Effects",
    summary: "Two semesters of graphic design in college, kept the way a graphic designer keeps a folio: posters, type, packaging, signs, pop art, and a word that moos.",
    cover: "assets/img/projects/graphic-design-days/bag-front.webp", focus: "50% 50%", hero: "", gallery: [] },

  { id: "geometrica", title: "Geometrica", year: "2021", sortYear: 2021, context: "PES University", chapter: "PES University", note: "Game Design",
    discipline: "Game", also: ["Physical"], theme: "Play and worlds", depth: "Entry", status: "Coursework",
    role: "Game designer", team: "Dharanetha P and Srijith D Raj", tools: "Illustrator",
    summary: "A tabletop game that teaches children geometry and fractions with shape frames on a textured board, and clue cards printed in braille, so children who can't see can play too.",
    cover: "assets/img/projects/geometrica/board-art.webp", focus: "50% 50%", hero: "assets/img/projects/geometrica/board-flat.webp", gallery: [] },

  { id: "green-grocer", title: "Green Grocer", year: "2023", sortYear: 2023, context: "PES University", chapter: "PES University", note: "Design Innovation and Management",
    discipline: "Visual", also: ["UX"], theme: "Systems and commerce", depth: "Entry", status: "Concept",
    role: "", team: "", tools: "Illustrator, Figma, Blender",
    summary: "A moving farmers' market: an auto-rickshaw that carries small farmers' produce to where the demand is, and pays for itself with the ads on its sides.",
    cover: "assets/img/projects/green-grocer/rickshaw.webp", focus: "50% 55%", hero: "assets/img/projects/green-grocer/rickshaw-road-2.webp", gallery: [] },

  { id: "youtube-redesign", title: "YouTube redesign", year: "2022", sortYear: 2022, context: "PES University", chapter: "PES University", note: "UI UX II",
    discipline: "UX", also: [], theme: "Everyday interfaces", depth: "Glimpse", status: "Coursework",
    role: "", team: "", tools: "Figma",
    summary: "Interviews and task tests on the YouTube app, then redesigns of playlist creation, a “New” feature and a well-being view of time spent.",
    cover: "assets/img/projects/youtube-redesign/wellbeing.webp", focus: "50% 50%", hero: "",
    gallery: [
      { src: "assets/img/projects/youtube-redesign/wellbeing.webp", natural: true, caption: "Well-being: time watched, by category" },
      { src: "assets/img/projects/youtube-redesign/new-feature.webp", natural: true, caption: "The “New” feature" },
      { src: "assets/img/projects/youtube-redesign/playlist.webp", natural: true, caption: "Creating a playlist, before and after" }
    ] },

  { id: "conversational-ux", title: "Conversational interfaces", year: "2022", sortYear: 2022, context: "PES University", chapter: "PES University", note: "Design for Conversational UX",
    discipline: "UX", also: [], theme: "Everyday interfaces", depth: "Glimpse", status: "Coursework",
    role: "", team: "", tools: "Figma",
    summary: "Studying how Kuki, Replika and Google Assistant hold a conversation, then designing a voice assistant for a car that keeps the driver's eyes on the road.",
    cover: "assets/img/projects/conversational-ux/dash.webp", focus: "50% 50%", hero: "",
    gallery: [
      { src: "assets/img/projects/conversational-ux/dash.webp", natural: true, caption: "The in-car assistant: “How can I help you?”" },
      { src: "assets/img/projects/conversational-ux/journey.webp", natural: true, caption: "The driver's journey, from trip start to the last mile" },
      { src: "assets/img/projects/conversational-ux/replika.webp", natural: true, caption: "Studying a companion bot's conversation" }
    ] },

  { id: "evoke", title: "Evoke", year: "2023", sortYear: 2023, context: "PES University", chapter: "PES University", note: "Spatial Design",
    discipline: "Physical", also: [], theme: "Moving image and space", depth: "Entry", status: "Coursework",
    role: "", team: "Dara Shashank, Vishwak Tummala and Srijith D Raj", tools: "Sketching, model making",
    summary: "A spatial design project: a work pod shaped by the peanut shell. Two rounded pods, a short passage between them, and a ribbed shell that is light, private, textured and quiet.",
    cover: "assets/img/projects/evoke/model.webp", focus: "50% 50%", hero: "assets/img/projects/evoke/concept.webp", gallery: [] },

  { id: "classhour", title: "Classhour lesson design", year: "2022", sortYear: 2022, context: "Classhour", chapter: "Practice", note: "Graphic design internship",
    discipline: "Visual", also: [], theme: "Care and access", depth: "Glimpse", status: "Internship",
    role: "Graphic design intern", team: "", tools: "Figma, PowerPoint",
    summary: "Lesson decks for CBSE physics: a title system, backgrounds and question slides for Light, Refraction, the Human Eye, Electric Field and Magnetic Field.",
    cover: "assets/img/projects/classhour/light.webp", focus: "50% 50%", hero: "",
    gallery: [
      { src: "assets/img/projects/classhour/electric.webp", natural: true, caption: "Electric Field: a lecture title" },
      { src: "assets/img/projects/classhour/eye.webp", natural: true, caption: "The Human Eye: the title wraps an iris" },
      { src: "assets/img/projects/classhour/magnetic.webp", natural: true, caption: "Magnetic Field" },
      { src: "assets/img/projects/classhour/refraction.webp", natural: true, caption: "Refraction" },
      { src: "assets/img/projects/classhour/light-cover.webp", natural: true, caption: "Light: one title system, a colour per chapter" },
      { src: "assets/img/projects/classhour/question.webp", natural: true, caption: "A question slide" },
      { src: "assets/img/projects/classhour/magnetic-bg.webp", natural: true, caption: "A content background for Magnetic Field" }
    ] }
];
