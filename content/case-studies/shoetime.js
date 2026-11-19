/* Case study: shoetime. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md. */
SITE.caseStudies["shoetime"] = {
  style: "panel",              // every section opens on its own card, like a research report
  headline: "Shoes you can trust from a screen.",
  subhead: "A new-age footwear shopping experience: every brand in one place, collections that follow seasons and trends, honest sizing and verified products.",
  tldr: [
    { label: "Problem", text: "There's no single platform with every brand, so finding genuine options, variety and offers is hard. Without touching or trying the shoe, people doubt the fit and the quality, and it spoils the purchase." },
    { label: "Approach", text: "Secondary research on India's footwear market, a survey of 220+ people, 15+ interviews, a stakeholder study, a morphological matrix and stakeholder validation, reviewed by faculty from IISc Bengaluru." },
    { label: "Outcome", text: "Eight product requirements, four that mattered most, and a high-fidelity prototype of a multi-brand store." }
  ],
  numbers: [ { n: "220", l: "people surveyed" }, { n: "15", l: "interviews" }, { n: "8", l: "requirements" }, { n: "4", l: "that mattered most" } ],
  highlights: [
    "Only 40% trusted how product photos matched the shoe.",
    "77% buy shoes just once a year, so each purchase has to be right.",
    "Collections follow seasons, films and festivals.",
    "Every listing carries proof that it's authentic."
  ],
  sections: [
    { key: "overview-s", kicker: "Overview", title: "Between what people want, what's feasible and what pays.", paras: [
      "ShoeTime is a user-centred online shoe store concept that sits between what people want, what's technologically feasible and what's economically viable. It aims for a seamless multi-brand experience that shows shoes by evolving themes and trends all year round, through collections inspired by seasons, pop culture and lifestyle.",
      "It also serves the business: it promotes bulk purchases and highlights unique product lines with trend-based marketing. And it answers the main pain points (poor sizing information, low trust in brands, and weak discovery) with high-quality visuals, standard size guides and smart filters."
    ], quote: "",
      blocks: [
        // Redrawn from the original process slide (assets/img/projects/shoetime/process.webp)
        { type: "process", title: "Project process", items: [
          { title: "Primary research", notes: ["Survey", "User interviews"] },
          { title: "Secondary research", notes: ["Market study", "Competitive analysis"] },
          { title: "Stakeholder study", notes: ["Mapping, journey and justification"] },
          { title: "SDPS", notes: ["Final SDPS formed after two revisions"] },
          { title: "Morphological matrix", notes: ["Concept evaluation"] },
          { title: "Concept finalisation", notes: ["Finalisation of the concepts for implementation"] },
          { title: "Stakeholder validation", notes: ["Finalisation of the concepts for implementation"] }
        ] }
      ] },

    { key: "secondary-s", kicker: "Secondary research", title: "A fast-growing market, and a crowded one.", paras: [
      "Projections put the Indian footwear market at USD 45.54 billion by 2032, growing at a CAGR of 12.39% from 2023. Online was expected to bring in USD 6.96 billion in 2023, about 26.1% of India's fashion e-commerce.",
      "The market is competitive: Ajio leads online footwear; Flipkart and Amazon compete on range, price and delivery; Bata, Liberty and Metro Brands combine strong offline presence with growing online stores. Demand is hard to forecast because it moves with culture, seasons and fashion."
    ], quote: "",
      blocks: [
        { type: "chips", title: "Trends shaping the market", items: ["The athleisure boom", "Customisation and personalisation", "Social media and celebrity endorsements"] },
        { type: "table", title: "From insight to requirement", cols: ["Insight", "Requirement"], rows: [
          ["Users trust variety and value", "Multi-brand access with clear pricing and combo deals"],
          ["Size mismatches cause dissatisfaction", "Comprehensive size guides with visual fit indicators"],
          ["Trends influence shopping behaviour", "Filters for season, style, collaborations and trending products"],
          ["Brand listings online aren't trusted", "Verified products with brand-assured authenticity and material previews"]
        ] }
      ] },

    { key: "survey", show: [
        { type: "chart", title: "What 220 shoppers said", charts: [
          { kind: "hbar", title: "What they buy most", sub: "By type of shoe", unit: "%", max: 100, n: "220+", source: "ShoeTime survey", note: "More than one answer allowed", data: [ { l: "Sport shoes", v: 41.8, hl: 1 }, { l: "Sandals", v: 37.7 }, { l: "Sneakers", v: 36.8 } ] },
          { kind: "donut", title: "Do photos match the shoe?", sub: "Trust in product photos", unit: "%", center: "40%", centerLabel: "trust them", n: "220+", source: "ShoeTime survey", data: [ { l: "Trust the photos", v: 40 }, { l: "Not sure", v: 45.6 }, { l: "Unhappy with the match", v: 14.4 } ] },
          { kind: "bar", title: "What they spend on a pair", sub: "Price range", unit: "%", max: 60, n: "220+", source: "ShoeTime survey", data: [ { l: "₹500–1,000", v: 50.5, hl: 1 }, { l: "₹1,000–2,000", v: 27.3 }, { l: "Up to ₹5,000", v: 15.9 } ] }
        ] },
        { type: "words", text: "Most people buy shoes once a year, so *every purchase has to be right*." }
      ],
      kicker: "Primary research", title: "What 220 shoppers told us.", paras: [
      "To understand how people really shop for shoes online, we surveyed more than 220 people across age groups and shopping habits, and interviewed more than 15. The survey showed what people buy, how often, what they spend, where they shop, and where online shopping lets them down."
    ], quote: "",
      blocks: [
        { type: "stats", items: [
          { n: "77.3%", l: "buy once a year", t: "Occasional but thoughtful purchases, so every one has to be right." },
          { n: "86.4%", l: "have never bought in bulk", t: "Design for the individual buyer, and offer bulk deals as a bonus." },
          { n: "15%", l: "shop only online", t: "Nearly half shop both online and in stores: room for a hybrid kind of trust." }
        ] }
      ] },

    { key: "persona", kicker: "Persona", title: "Stand out, and survive hostel life.", paras: [
      "Our persona is a 22-year-old engineering student in Bengaluru who balances classes with a busy social life. He shops online for fashion, gadgets and shoes, follows Instagram trends and his friends, and sees shoes as an expression of style, not just something to wear.",
      "He wants trendy, durable shoes for college and casual wear, good deals within a student budget, and new brands without hours of searching. He's frustrated by sizing that changes between brands, inconsistent photos and vague material details, not finding every brand in one place, and not knowing which shoes suit college life or how to care for them."
    ], quote: "",
      blocks: [
        // The persona, redrawn for the web (was persona.webp)
        { type: "personas", items: [
          { name: "Shashank", role: "Student, Bengaluru", img: "assets/img/projects/shoetime/persona-photo.webp", meta: "22 · Engineering student · Fashion enthusiast, regular online shopper",
            bio: "A second-year engineering student who balances classes with an active social life. Highly influenced by Instagram, fashion trends and what his friends wear. Shoes are part of his identity, not just something to wear.",
            quote: "I want my shoes to stand out, but they also need to survive hostel life and bike rides.",
            groups: [
              { title: "Goals and needs", points: ["Trendy, durable shoes for college and casual looks", "Good deals within a student budget (₹1,000–2,000)", "New brands and sneaker drops without hours of searching"] },
              { title: "Frustrations", points: ["Sizing that changes between brands", "Inconsistent photos and unclear material details", "No single place with every style and brand", "Little knowledge of shoe care, or which shoes suit college life"] }
            ] }
        ] }
      ] },

    { key: "stakeholders", kicker: "Stakeholder study", title: "Everyone with a stake in the shoe.", paras: [
      "We mapped the roles and relationships of everyone in online footwear, so that the design would serve the market as well as the user."
    ], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "Primary: consumers", text: "Students, athletes, professionals and enthusiasts who treat shoes as part of their identity. They drive trends, and they suffer most from poor sizing, unclear visuals and the lack of a multi-brand store." },
          { title: "Secondary: employees and retailers", text: "Logistics, warehouse and support staff, retailers and wholesalers. Clear listings and organised catalogues mean fewer confused customers, more accurate orders and more sales." },
          { title: "Tertiary: government and economy", text: "A growing digital footwear market brings revenue, digital participation and support for small businesses, with more jobs in cities and villages alike." }
        ] }
      ] },

    { key: "requirements", kicker: "Requirements", title: "Eight requirements, four that mattered most.", paras: [
      "Surveys, stakeholder insights and market analysis turned into eight requirements. Demand turned out to be driven by trends and culture: seasons, films and lifestyle. People mostly shop on third-party sites without knowing where multi-brand collections exist. They're unhappy with sizing and with how materials are shown. Bulk buying is rare, but value and combo offers are welcome, and authenticity matters."
    ], quote: "",
      blocks: [
        { type: "table", cols: ["", "Requirement", "What it means"], rows: [
          ["R1", "Product discovery", "Show shoes by climate, season and trend: films, sports, festivals"],
          ["R2", "Size and fit clarity", "Size guides in several formats, with visual cues and measurements"],
          ["R3", "Material representation", "Close-ups, 360° views and material details"],
          ["R4", "Value offers", "Combo deals, value-based sorting and clear categories"],
          ["R5", "Multi-brand access", "Every brand's models in one place, with accurate data and filters"],
          ["R6", "Authenticity assurance", "Proof tags and badges on every product"],
          ["R7", "User education", "Short guides on shoe types, uses and care"],
          ["R8", "Personalised filters", "Sort by occasion, trend or use to cut search fatigue"]
        ] },
        // The four finalised requirements, redrawn for the web (was requirements.webp)
        { type: "reqmap", title: "Finalised requirements", items: [
          { r: "1", title: "Time and trend-based categories", text: "Shoes by climate and season, trending topics like films, and merchandise." },
          { r: "4", title: "Combo offers for value", text: "Combo offers and proper categories that maximise value for money, and promote bulk buying." },
          { r: "3", title: "Detailed information", text: "Size information in every format, and close-ups of the materials used." },
          { r: "6", title: "Authenticity", text: "Proof of authenticity on every product, with every model listed exactly as the brand lists it." }
        ] }
      ] },

    { key: "design-s", kicker: "Designing the solution", title: "Collections for seasons, films and moods.", paras: [
      "The interface is set in Poppins, in black and white, so the shoes bring the colour. Home leads with collections (for her, for him, an MCU collection, a winter collection) and brand rows. Product pages carry sizes, colours, materials and price up front, and filters cover size, colour and price."
    ], quote: "",
      blocks: [
        { type: "images", items: [ { src: "assets/img/projects/shoetime/solution.webp", caption: "Collections, home and a product page" } ] },
        { type: "images", items: [ { src: "assets/img/projects/shoetime/screens-1.webp", caption: "Sign in, home, collections and a product page" } ] },
        { type: "images", items: [ { src: "assets/img/projects/shoetime/screens-2.webp", caption: "Results, wishlist, filters and profile" } ] }
      ] }
  ]
};
