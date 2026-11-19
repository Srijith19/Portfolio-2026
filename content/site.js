/* ==========================================================================
   content/site.js — who you are, and how the home page is put together.
   Edit freely: names, links, the three UX picks, the orbit, the résumé.
   Projects live in content/projects.js, long write-ups in content/case-studies/.
   ========================================================================== */
window.SITE = {
  owner: {
    name: "Srijith D Raj",
    role: "Interaction designer",
    base: "Bengaluru, India",
    email: "srijithkarur@gmail.com",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@srijithdraj" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/srijithdraj/" },
      { label: "Behance", href: "https://www.behance.net/srijithdhanday" },
      { label: "Instagram", href: "" },           // TO ADD
      { label: "X / Twitter", href: "" }          // TO ADD
    ],
    // Headline and bio are kept word for word from the old site.
    headline: "A multidisciplinary designer working across UX, XR, Games, and Visual Media",
    bio: "A multidisciplinary designer working across UX, XR, Games, and Visual media. Focused on research-driven, niche, and large-scale problems, with a strong interest in experimentation and storytelling. Enjoys building uncommon ideas, exploring new tools, and creating meaningful experiences beyond conventional design boundaries.",
    facts: [
      { label: ".currently at", value: "i3 Digital Health", sub: "Interaction designer" },
      { label: ".studied at", value: "IIT Jodhpur", sub: "M.Des, XR Design" },
      { label: ".before that", value: "PES University", sub: "B.Des, Interaction Design" }
    ],
    freelance: "Write to me and we'll see how we can work together.",
    freelanceSub: "Or find me on my socials.",
    resumePdf: "",                                // e.g. "assets/files/srijith-d-raj-resume.pdf"
    portrait: "assets/img/people/srijith.webp",
    orbitPhoto: "assets/img/people/srijith-orbit.webp",   // the cut-out in the home hero; "" brings back the pictogram
    workSetup: "assets/img/people/work-setup.webp",
    updated: "November 2026",
    since: 2020
  },

  /* ---- How the archive is organised: four independent ways to slice it ---- */
  facets: {
    discipline: {
      label: "Discipline",
      values: ["UX", "XR", "Game", "Film", "Visual", "Physical"],
      notes: {
        UX: "Screens people use to get something done",
        XR: "Mixed and virtual reality",
        Game: "Things you play",
        Film: "Moving image, flat and 360°",
        Visual: "Images and worldbuilding",
        Physical: "Board, chalk and paper"
      }
    },
    chapter: {
      label: "Chapter",
      values: ["Practice", "IIT Jodhpur", "PES University"],
      notes: {
        "Practice": "Paid work: industry, internship and freelance",
        "IIT Jodhpur": "M.Des in XR Design, 2024–2026",
        "PES University": "B.Des in Interaction Design, 2020–2024"
      }
    },
    theme: {
      label: "Theme",
      values: ["Systems and commerce", "Care and access", "Moving image and space", "Play and worlds", "Everyday interfaces"]
    },
    depth: {
      label: "Depth",
      values: ["Case study", "Entry", "Glimpse"],
      notes: {
        "Case study": "The full story: research, decisions, outcome",
        "Entry": "A short page: what, how, what I learned",
        "Glimpse": "One image and a caption"
      }
    }
  },

  /* ---- Home page curation ---- */
  // Home page: the UX projects shown first, two to a row.
  homeUx: ["texgenie", "dignity", "shoetime", "gpay-wrist"],
  // The Work page's UX shelf. (The home page shows the UX Design projects listed under `areas` below.)
  uxFeatured: ["texgenie", "dignity", "shoetime"],

  // Current role, shown under the UX case studies. When Oncopilot can go public,
  // set `project: "oncopilot"` and un-hide it; this slot becomes its case study row.
  current: { org: "i3 Digital Health", role: "Interaction designer", line: "Designing AI-supported tools for oncologists. The work is under wraps for now.", project: "" },

  // One project from every flavour, shown in the home accordion.
  flavours: [
    { label: "XR", name: "Extended reality", id: "immerse-editor-pro" },
    { label: "Games", name: "Games", id: "reven-vr" },
    { label: "Film", name: "360° film", id: "who-vr" },
    { label: "Visual", name: "Visual media", id: "akai-tsuki" },
    { label: "Physical", name: "Physical play", id: "rasta-la-vista" }
  ],

  // Home page tabs, and the three discipline pages. `projects` are the ones shown, in this order; `more` are named in one small line under them.
  // To add a video: put a muted .mp4 in assets/video/ and set video: "assets/video/area-ux.mp4".
  areas: [
    { key: "ux", slug: "ux-design", label: "UX Design", short: "UX", disciplines: ["UX"], projects: ["texgenie", "dignity", "shoetime", "gpay-wrist", "internshala"], leadWide: true, more: ["kego-care", "dreambig", "jiosaavn", "cookr", "kalviexpert", "youtube-redesign", "conversational-ux"],
      line: "UX projects addressing uncommon, real-world problems through research-driven design.",
      // The board in the UX page's header: each step, one line, and where it happened in my projects
      how: [
        { step: "Research", line: "Go where the work happens, and listen.", ev: [
          { p: "texgenie", t: "Interviewed five business owners" }, { p: "dignity", t: "A field visit and interviews at AIIMS Jodhpur" }, { p: "shoetime", t: "A survey of 220+ people and 15+ interviews" } ] },
        { step: "Define", line: "Name the one problem worth solving.", ev: [
          { p: "dignity", t: "Six insights, an action priority matrix and a persona" }, { p: "shoetime", t: "Eight requirements, four that mattered most" }, { p: "internshala", t: "Paid internships first, then fraud protection" } ] },
        { step: "Ideate", line: "Go wide before going deep.", ev: [
          { p: "dignity", t: "Brain dumping, then SCAMPER" }, { p: "shoetime", t: "A morphological matrix to weigh concepts" }, { p: "internshala", t: "A new information architecture, with a branch for fraud" } ] },
        { step: "Prototype", line: "Make it real enough to argue with.", ev: [
          { p: "dignity", t: "Five iterations, tested and refined" }, { p: "gpay-wrist", t: "A watch prototype you can tap through" }, { p: "texgenie", t: "Rebuilt in React in 2026" } ] },
        { step: "Test", line: "Put it in front of people, then go round again.", ev: [
          { p: "shoetime", t: "Validated with stakeholders, reviewed by faculty from IISc Bengaluru" }, { p: "internshala", t: "Benchmarked against LinkedIn and Glassdoor" }, { p: "texgenie", t: "Tested the spine with updates arriving out of order" } ] }
      ],
      video: "", poster: "assets/img/projects/gpay-wrist/cover.webp", pagePoster: "assets/img/projects/internshala/hero.webp" },
    { key: "xr", slug: "xr-design", label: "XR Design", short: "XR", disciplines: ["XR"], tone: "deep", projects: ["atelier-xr", "immerse-editor-pro", "reven-vr", "who-vr", "uxplore"], more: ["vannavision"],
      line: "Immersive experiences exploring interaction, narrative, and presence through XR design.",
      video: "", poster: "assets/img/projects/immerse-editor-pro/cover.webp" },
    { key: "gg", slug: "graphics-and-games", label: "Graphics and Games", short: "Graphics & Games", disciplines: ["Game", "Visual", "Physical"], tone: "night", projects: ["reven-vr", "akai-tsuki", "rasta-la-vista", "fredrick-runs", "native-packaging", "type-and-image", "geometrica"], more: ["green-grocer", "spatial-pod"],
      line: "Games, worldbuilding and visual media.",
      video: "", poster: "assets/img/projects/akai-tsuki/render-wall.webp" }
  ],


  // The orbit around the figure in the home hero. `ring` 0 is the outer ring.
  orbit: [
    { label: "UX Design", icon: "UX", ring: 0, href: "#ux-design" },
    { label: "Extended Reality", icon: "XR", ring: 0, href: "#xr-design" },
    { label: "Games", icon: "Game", ring: 0, href: "#graphics-and-games" },
    { label: "Film", icon: "Film", ring: 1, href: "#films" },
    { label: "Visual Media", icon: "Visual", ring: 1, href: "#graphics-and-games" },
    { label: "Research", icon: "Research", ring: 1, href: "#writing" },
    { label: "Figma", ring: 2 }, { label: "Unity", ring: 2 }, { label: "Blender", ring: 2 }, { label: "React", ring: 2 }
  ],

  marquee: ["UX Design", "Extended Reality", "Games", "Film", "Visual Media", "Research", "Figma", "Unity", "Blender", "React", "Premiere Pro", "After Effects"],

  writing: [
    { title: "From 2D Timelines to Immersive Spaces", venue: "ICoRD 2027", year: "2027", status: "Conditionally accepted",
      basedOn: "immerse-editor-pro", abstract: "", href: "" }
  ],

  // The keycaps in the "say hello" section, left to right. A key shows only when it has somewhere to go:
  // Mail uses owner.email, Résumé uses owner.resumePdf (or the résumé page), the rest use the matching owner.links.
  // letter = the key on a real keyboard that presses it. tone: "blue", "light", "dark", "rec" or "marker".
  // note = the handwritten line beside it; rewrite these in your own voice.
  contactKeys: [
    { label: "Mail", kind: "mail", letter: "M", tone: "blue", note: "projects, ideas, or just a hello" },
    { label: "LinkedIn", letter: "L", tone: "light", note: "the work side of me" },
    { label: "YouTube", letter: "Y", tone: "rec", note: "where the films live" },
    { label: "Behance", letter: "B", tone: "light", note: "older boards and visuals" },
    { label: "Instagram", letter: "I", tone: "light", note: "the everyday side" },
    { label: "X / Twitter", letter: "X", tone: "dark", note: "thinking out loud" },
    { label: "Résumé", kind: "resume", letter: "R", tone: "marker", note: "the whole story, on one page" }
  ],

  /* ---- About and résumé ---- */
  journey: [
    { place: "PES University", years: "2020–2024", line: "B.Des in Interaction Design. Thesis: TexGenie." },
    { place: "Cookr", years: "2022–23", line: "Design intern: UX across five products, plus content and campaign design." },
    { place: "IIT Jodhpur", years: "2024–2026", line: "M.Des in XR Design (extended reality). Thesis: Immerse Editor Pro." },
    { place: "i3 Digital Health", years: "2026–", line: "Interaction designer in Bengaluru, working on AI tools for oncologists." }
  ],

  resume: {
    experience: [
      { org: "i3 Digital Health", role: "Interaction designer", years: "2026–present", place: "Bengaluru", line: "AI-supported oncology tools for doctors." },
      { org: "Savoury Skies Kitchen", role: "Creative head", years: "2023–24", place: "", line: "Branding, website, stationery and social media for a subscription cloud kitchen I ran with friends." },
      { org: "Cookr", role: "Design intern", years: "2022–23", place: "Hosur", line: "Contributed UX design across five of Cookr's own products, improving usability and satisfaction. Made Instagram and YouTube content, and designed posters and ads with the marketing team." },
      { org: "CogniVed Solutions", role: "UI/UX design intern", years: "Sep–Dec 2022", place: "Bengaluru", line: "" },
      { org: "classhour", role: "Graphic design intern", years: "Jul–Oct 2022", place: "", line: "" },
      { org: "Engineer's Cradle", role: "UI/UX design intern", years: "Jun–Sep 2022", place: "", line: "" },
      { org: "Freelance", role: "UI/UX and graphic design", years: "", place: "", line: "Responsive websites, ad campaign content and social media pages, working closely with companies' strategy and marketing teams." }
    ],
    education: [
      { org: "IIT Jodhpur", role: "M.Des, XR Design", years: "2024–2026", line: "Thesis: Immerse Editor Pro." },
      { org: "PES University", role: "B.Des, Interaction Design", years: "2020–2024", line: "Thesis: TexGenie." }
    ],
    skills: [
      { group: "Design", items: ["Interaction design", "UX research", "Design systems", "Prototyping", "XR interaction"] },
      { group: "Tools", items: ["Figma", "FigJam", "Unity", "Blender", "React", "Premiere Pro", "After Effects", "Reaper"] }
    ]
  },

  // Filled in by the other content files
  projects: [],
  caseStudies: {},
  entries: {},
  films: {}
};
