/* Case study: texgenie. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md. */
SITE.caseStudies["texgenie"] = {
  style: "rail",               // the section title stays beside the text while you read
  headline: "Where is PO 6522?",
  subhead: "A production-tracking system for home-textile makers whose orders pass through outside dyers, weavers and stitching units.",
  tldr: [
    { label: "Problem", text: "A home-textile order leaves the owner's building several times. Each hand-off is a phone call, so nobody can see where an order is." },
    { label: "Approach", text: "Five interviews with business owners, then one shared record per purchase order that every unit updates from its own surface." },
    { label: "Outcome", text: "16 modules, five role-based surfaces and Genie, a voice layer that turns voice notes into records. Rebuilt in React in 2026." }
  ],
  numbers: [
    { n: "5", l: "business owners interviewed" },
    { n: "16", l: "modules, yarn to dispatch" },
    { n: "5", l: "role-based surfaces" },
    { n: "1", l: "shared record per order" }
  ],
  highlights: [
    "Information breaks where work leaves the building.",
    "I interviewed five business owners.",
    "Version 1 served only the owner.",
    "Five surfaces share one order spine.",
    "Genie turns voice notes into records."
  ],
  sections: [
    { key: "research", kicker: "Research", title: "Information breaks where work leaves the building.", paras: [
      "TexGenie began as an effort to help India's home-textile manufacturers raise their productivity and keep up with global competition, without taking away the people who do the work.",
      "A single home-textile order moves from yarn to dyer, weaver and stitching unit before it is packed for dispatch. Most of those units sit outside the owner's building, and each hand-off is a phone call.",
      "I interviewed five business owners. Every one of them could find an order eventually. None of them could see it."
    ], quote: "The information was there. It broke wherever work left the building.",
      show: [
        // The order's path, taken straight from the paragraph above
        { type: "timeline", title: "One order, from yarn to dispatch", items: [
          { when: "Start", title: "Yarn", text: "The order begins." },
          { when: "Outside", title: "Dyer", text: "Out of the owner's building. The hand-off is a phone call." },
          { when: "Outside", title: "Weaver", text: "Another unit, another phone call." },
          { when: "Outside", title: "Stitching unit", text: "Another unit, another phone call." },
          { when: "Finish", title: "Packed for dispatch", text: "Every owner could find the order eventually. None of them could see it." }
        ] },
        // Pictures to add: drop files with these names into assets/img/projects/texgenie/
        { type: "images", items: [
          { src: "assets/img/projects/texgenie/research-1.webp", caption: "Interview notes" },
          { src: "assets/img/projects/texgenie/research-2.webp", caption: "The units an order passes through" }
        ] }
      ] },
    { key: "design", kicker: "Design", title: "Version 1 served only the owner.", paras: [
      "The first version gave owners a clean dashboard and asked nobody else to change how they worked. It was only ever as current as the last phone call.",
      "The redesign puts every unit on the same record. Five surfaces share one order spine: each unit sees its own step, and every update lands on the same purchase order."
    ], quote: "Five surfaces, one order spine.",
      show: [
        { type: "compare", title: "Version 1, and the redesign", before: { src: "assets/img/projects/texgenie/v1.webp", label: "Version 1" }, after: { src: "assets/img/projects/texgenie/v2.webp", label: "Redesign" }, ar: "16 / 10" },
        { type: "hscroll", title: "Five surfaces, one order spine", items: [
          { src: "assets/img/projects/texgenie/surface-1.webp", caption: "Surface 1", ar: "9 / 19.5" },
          { src: "assets/img/projects/texgenie/surface-2.webp", caption: "Surface 2", ar: "9 / 19.5" },
          { src: "assets/img/projects/texgenie/surface-3.webp", caption: "Surface 3", ar: "9 / 19.5" },
          { src: "assets/img/projects/texgenie/surface-4.webp", caption: "Surface 4", ar: "9 / 19.5" },
          { src: "assets/img/projects/texgenie/surface-5.webp", caption: "Surface 5", ar: "9 / 19.5" }
        ] }
      ] },
    { key: "reflection", kicker: "Reflection", title: "Meet people where their hands already are.", paras: [
      "Genie, the voice layer, came from the floor: supervisors' hands are busy, and their phones are already full of voice notes. Turning those notes into records meant the system asked for less, not more.",
      "Revisiting the project in 2026 let me rebuild it in React and test the spine with real updates arriving out of order."
    ], quote: "",
      show: [
        { type: "images", items: [
          { src: "assets/img/projects/texgenie/genie.webp", caption: "Genie, the voice layer" },
          { src: "assets/img/projects/texgenie/build-2026.webp", caption: "TexGenie, 2026 build" }
        ] }
      ] }
  ],
  steps: [
    { title: "Press Update", img: "assets/img/projects/texgenie/step-1.webp", caption: "A supervisor opens PO 6522 at their own step and presses one button." },
    { title: "Hold to speak", img: "assets/img/projects/texgenie/step-2.webp", caption: "They describe what happened, the way they would in a voice note." },
    { title: "Check what Genie heard", img: "assets/img/projects/texgenie/step-3.webp", caption: "Genie turns the note into fields. Nothing is saved until a person agrees." },
    { title: "Saved", img: "assets/img/projects/texgenie/step-4.webp", caption: "The update lands on the order spine, and every unit sees it." }
  ],
  specs: [
    { group: "Surfaces", rows: [
      { label: "Order spine", detail: "One record per purchase order, shared by every unit that touches it" },
      { label: "Surfaces", detail: "Five, one for each role along the order" },
      { label: "Owner view", detail: "Every open order and where it is now" } ] },
    { group: "AI", rows: [
      { label: "Genie", detail: "Turns spoken voice notes into structured order updates" },
      { label: "Confirmation", detail: "Shows what Genie heard before anything is saved" } ] },
    { group: "Build", rows: [
      { label: "Modules", detail: "16, from yarn purchase to dispatch" },
      { label: "Outside units", detail: "Dyers, weavers and stitching units update their own step" },
      { label: "Tools", detail: "Figma (2023), React (2026)" } ] }
  ]
};
