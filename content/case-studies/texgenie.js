/* Case study: texgenie. The narrative follows the thesis: context, research,
   problem, concept, design, AI, testing. Desktop and phone screens are built in
   code (render source kept outside the site) and rendered to images; the
   research figures, design system and the live prototype are built in code
   (block types tgchain, tgrings, tgmap, tgswot, tgmatrix, tgmind, tgeval, tgds,
   tgai, tgroles and tgsuite in app.js). DesignStyle and Sangeetha in the
   screens are deliberate. */
SITE.caseStudies["texgenie"] = {
  style: "rail",
  headline: "Faster people, not fewer.",
  subhead: "A production manager for India's home-textile factories. The office works on a desktop, the floor works on a phone, Genie (the AI layer) keeps both in step, and every order has one live record.",
  tldr: [
    { label: "Problem", text: "In large home-textile firms, plans and updates travel by phone call, paper and chat. Orders slow down, records go missing and mistakes are found late." },
    { label: "Solution", text: "TexGenie gives each person the part of the order they need: a desktop for the office, a phone app for the floor, and Genie to write reports, flag delays and turn voice notes into updates." },
    { label: "Benefit", text: "Nobody's job is cut. The same people lose less time between each other, the owner stops chasing updates, and problems surface while they can still be fixed." }
  ],
  highlights: [
    "I started with the industry, then the people in it.",
    "Owners kept naming the same pain: updates that never arrive.",
    "Make people faster, not fewer.",
    "A desktop for the office, a phone for the floor.",
    "Genie suggests. People decide."
  ],
  sections: [
    { key: "context", kicker: "Context", title: "India furnishes the world's homes.", paras: [
      "India is the sixth largest textile and apparel exporter in the world. Home textiles and garments made up 9.79% of the country's exports in 2020–21, around $41.3 billion, shipped mostly to the United States, Europe and the Middle East.",
      "Bed linen, towels, curtains and rugs come from a mix of handwoven craft and capital-heavy mills. Yet with so much manual work and so many units involved, efficiency has lagged behind competitors like China, Bangladesh and Vietnam.",
      "I began the thesis with a literature review: how the industry is growing, how a product is made, and what holds the sector back."
    ], quote: "",
      show: [
        { type: "chart", title: "An industry still growing fast", charts: [
          { kind: "bar", title: "Textile and apparel industry in India", unit: "", source: "Ministry of Textiles, via the thesis · USD billions · 2023 estimated", data: [
            { l: "2009", v: 70 }, { l: "2010", v: 78 }, { l: "2011", v: 89 }, { l: "2014", v: 99 }, { l: "2015", v: 109 }, { l: "2016", v: 137 }, { l: "2017", v: 150 }, { l: "2023*", v: 226, hl: true } ] }
        ] },
        { type: "tgchain", title: "How a home textile is made", caption: "Each step is a hand-off, often to a different unit, and each one needs an update.", items: [
          { t: "Raw material", d: "Cotton, linen, silk or polyester, chosen for feel, durability and price." },
          { t: "Spinning", d: "Fibre becomes yarn. Its thickness and strength are set here." },
          { t: "Weaving or knitting", d: "Warp and weft interlace on the loom to make fabric." },
          { t: "Dyeing and printing", d: "Colour and pattern, on the yarn or on the fabric." },
          { t: "Cutting and sewing", d: "Fabric is cut and stitched into sheets, covers and towels." },
          { t: "Finishing", d: "Softening, anti-wrinkle treatments, labels and trims." },
          { t: "Quality control", d: "Inspections at raw material, mid-way and finished stages." },
          { t: "Packing and dispatch", d: "Folded, labelled and shipped to buyers." }
        ] },
        { type: "chips", title: "What holds the sector back", items: ["Global competition", "Infrastructure bottlenecks", "Lack of skilled labour", "Standards and compliance", "Access to finance", "Raw material availability", "Complex tax rules", "Rising input costs", "Market volatility"] }
      ] },
    { key: "stakeholders", kicker: "Stakeholders", title: "Everyone an order touches.", paras: [
      "I mapped who has a stake in a home-textile factory, from the people inside it to the bodies that regulate and fund it.",
      "The inner ring is where the daily friction lives: owners, managers, workers, suppliers and buyers passing the same order between them. That ring became TexGenie's users."
    ], quote: "",
      show: [
        { type: "tgrings", title: "Stakeholder map", core: "Indian home-textile manufacturing",
          inner: ["Manufacturers and producers", "Suppliers", "Customers", "Employees and labour unions", "Retailers and distributors", "Logistics providers"],
          outer: ["Government and regulators", "Research and development", "Media and marketing", "Industry associations", "Technology providers", "Financial institutions"],
          caption: "Primary stakeholders sit inside. Secondary and tertiary stakeholders form the outer ring." }
      ] },
    { key: "market", kicker: "Market", title: "Plenty of software. None of it for the floor.", paras: [
      "I studied the desktop software and mobile apps textile businesses already use: Marg, MRPeasy, Bigdbiz, ERPNext and Vastra on the desktop; AlignBooks, myBillBook, Vyapar and Wrike on the phone.",
      "Most handle one job well, billing or stock or projects. The textile-specific ones look like programs from a decade ago. None was built for the people who actually move an order through the factory."
    ], quote: "",
      show: [
        { type: "tgmap", title: "Where existing tools sit", x: ["Generic", "Made for textiles"], y: ["One job", "The whole factory"],
          caption: "My reading of the 2023 market study. Squares are desktop software, circles are mobile apps.",
          items: [
            { n: "Marg", x: 74, y: 42, k: "desk" }, { n: "MRPeasy", x: 58, y: 72, k: "desk" }, { n: "Bigdbiz", x: 82, y: 60, k: "desk" },
            { n: "ERPNext", x: 16, y: 80, k: "desk" }, { n: "Vastra", x: 70, y: 22, k: "desk" },
            { n: "AlignBooks", x: 26, y: 46, k: "app" }, { n: "myBillBook", x: 14, y: 32, k: "app" }, { n: "Vyapar", x: 8, y: 16, k: "app" }, { n: "Wrike", x: 34, y: 62, k: "app" },
            { n: "TexGenie", x: 84, y: 88, k: "us" } ] },
        { type: "causes", title: "What was wrong with them", items: [
          { title: "Several apps for one factory", text: "Billing, stock and tracking each live in a different product, so nothing connects." },
          { title: "Features bolted on", text: "Each feature is implemented separately, and the whole thing slows down." },
          { title: "Interfaces from another decade", text: "Many look like word processors: cramped, grey and hard to learn." },
          { title: "No room for how you work", text: "Every company runs its process differently, and the software can't adapt." }
        ] }
      ] },
    { key: "swot", kicker: "SWOT", title: "Strong craft, weak links.", paras: [
      "A SWOT analysis of the industry showed the same shape again: real strengths in tradition, products and skilled people, held back by infrastructure, imports and competition."
    ], quote: "",
      show: [
        { type: "tgswot", title: "SWOT of the Indian home-textile industry", items: [
          { k: "S", n: "Strengths", l: ["Rich textile tradition", "Diverse range of products", "Skilled workforce", "Global export hub", "Technological advancement"] },
          { k: "W", n: "Weaknesses", l: ["Infrastructure challenges", "Environmental impact", "Dependence on raw material imports", "Competition from low-cost countries", "Regulatory compliance"] },
          { k: "O", n: "Opportunities", l: ["Sustainable practices", "E-commerce growth", "Innovation in design and technology", "Government initiatives", "Emerging markets"] },
          { k: "T", n: "Threats", l: ["Global economic swings", "Changing consumer trends", "Currency exchange rates", "Intense competition", "Geopolitical factors"] }
        ] }
      ] },
    { key: "interviews", kicker: "Interviews", title: "Owners told me where it hurts.", paras: [
      "I interviewed people in senior management at large home-textile firms. I wanted to understand the industry's strengths and weaknesses, the problems they face in managing a factory, and what goes wrong when they try digital tools.",
      "The questions moved from their experience and common problems to manpower, documentation, how far records were digitised, and the software they already used."
    ], quote: "Work planning and updates are not communicated properly, and it changes for every order and every new product.",
      show: [
        { type: "tgmatrix", title: "Pain points, by interviewee", cols: ["A", "B", "C", "D", "E"], note: "Interviewees are owners and senior managers. Names withheld.",
          rows: [
            { t: "Updates and work plans aren't communicated", d: [0, 1, 1, 1, 1], hl: true },
            { t: "Raw material prices keep fluctuating", d: [1, 1, 1, 1, 0] },
            { t: "No infrastructure support for their process", d: [1, 1, 1, 1, 0] },
            { t: "No one platform that does it all", d: [0, 1, 0, 1, 1], hl: true },
            { t: "Low government support lately", d: [1, 1, 0, 0, 1] },
            { t: "Work is hard to track with outsourcing", d: [1, 0, 0, 0, 0], hl: true },
            { t: "Human error on the floor", d: [0, 0, 0, 0, 1], hl: true } ],
          questions: ["Can you share your overall experience in the industry?", "What common problems have you faced over the years?", "How much of an advantage is automated infrastructure?", "How do you manage manpower? Is it easy or hard?", "How well is the manufacturing process documented?", "How far are records and communication digitised?", "Do you use any software to manage the business?", "How supportive is the government to the industry?"] }
      ] },
    { key: "problem", kicker: "Problem", title: "The work was skilled. The information around it wasn't.", paras: [
      "Combining the SWOT and the interviews, two problem statements came out. The first, supply shortages and infrastructure, sits beyond what a designer can fix. The second I could do something about:",
      "Raw material prices and government support were outside anyone's control. The highlighted rows in the interviews weren't: they were all about information failing to move between people."
    ], quote: "The home-textile industry in India faces a lack of efficiency in manual work, due to poor communication.",
      show: [
        { type: "causes", title: "Key findings", items: [
          { title: "Updates get lost", text: "Plans and changes travel by word of mouth, and they change with every order and product." },
          { title: "Tracking breaks at hand-offs", text: "Outsourced steps and even the weather make work hard to follow from the office." },
          { title: "Mistakes surface late", text: "Human errors repeat because nobody sees them until the goods reach inspection." },
          { title: "Many apps, none for them", text: "Owners try tools for each task, but nothing is a one-stop solution made for their needs." }
        ] }
      ] },
    { key: "idea", kicker: "Idea", title: "Make people faster, not fewer.", paras: [
      "The usual answer to inefficiency is automation that replaces people. In this industry that would throw away the craft that makes the product worth buying, and one owner warned that digitisation can never be total here.",
      "So the design brief: a digital platform with a clean experience, specific and customisable for home-textile manufacturing, that organises the work people already do instead of replacing them.",
      "I mind-mapped the research into needs, turned the needs into functions, and scored each function against the stakeholders who would use it."
    ], quote: "Keep the people. Remove the waiting between them.",
      show: [
        { type: "tgmind", title: "From research to requirements", center: "Textile production", branches: [
          { n: "Financials", l: ["Budgeting", "Raw material rates", "Workforce and machinery payments"] },
          { n: "Metrics", l: ["Weaving and knitting calculations", "Unit conversions and standards", "Raw material requirements"] },
          { n: "Task management", l: ["Progress tracking", "Deliverables checking", "Accounts"] },
          { n: "Data management", l: ["Stocks", "Work done", "Resource transfer"] },
          { n: "Supplies and labour", l: ["Dealer and supplier relations", "Labour hiring", "Wage accounts"] } ],
          out: ["Orders and task manager", "Inventory manager", "Finance manager", "Reports and documents", "Metrics calculator", "Supply chain manager", "Daily report generator", "Quality control protocol"] },
        { type: "tgeval", title: "Concept evaluation", caption: "How much each stakeholder group needs each function. Filled dots are need, out of five.",
          cols: ["Manufacturers", "Employees", "Retailers", "Suppliers"],
          rows: [
            { t: "Orders and task management", v: [5, 5, 1, 3] },
            { t: "Inventory management", v: [4, 5, 5, 3] },
            { t: "Finance management", v: [5, 2, 2, 3] },
            { t: "Reports and documentation", v: [5, 2, 2, 3] },
            { t: "Metrics calculations", v: [3, 5, 2, 1] },
            { t: "Supply chain management", v: [5, 5, 4, 2] },
            { t: "Daily report generation", v: [5, 5, 4, 3] } ] },
        { type: "tgroles", title: "Who uses it, and where", groups: [
          { where: "In the office", device: "desk", label: "Desktop", roles: [
            { name: "Owner", need: "Sees every order and what needs a decision." },
            { name: "Production manager", need: "Plans work and moves orders between units." },
            { name: "Accounts", need: "Approves bills, payroll and buyer payments." } ] },
          { where: "On the floor", device: "phone", label: "Phone", roles: [
            { name: "Floor supervisor", need: "Marks steps done and raises problems." },
            { name: "Quality checker", need: "Records inspections against the order." },
            { name: "Floor worker", need: "Sees today's tasks, in plain words." } ] },
          { where: "Outside", device: "link", label: "Shared view", roles: [
            { name: "Buyer", need: "Sees how far their order has got, without calling." },
            { name: "Supplier", need: "Sees what to deliver, and when." } ] }
        ] }
      ] },
    { key: "structure", kicker: "Structure", title: "Four places, one home.", paras: [
      "The information architecture puts everything under four areas: Orders, Inventory, Documents and Finance, with a profile, a metrics calculator and notifications one step from home. Documents link back to the orders and payments they belong to.",
      "I sketched the key screens as greyscale wireframes before any colour went in."
    ], quote: "",
      show: [
        { type: "iatree", title: "Information architecture", root: "Home", caption: "Redrawn from the thesis.", branches: [
          { name: "Orders", items: [{ name: "Running PO", items: ["Process tracking", "Raised issues"] }, { name: "Today's tasks", items: ["Add tasks", "Reminders"] }, "Daily report", "Progress dashboard"] },
          { name: "Inventory", items: [{ name: "Textile", items: ["Yarn", "Fabric", "Trims", "Finished goods", "Previous samples"] }, { name: "Other", items: ["Packaging", "Tools and repairs", "Office supplies"] }] },
          { name: "Documents", items: ["Purchase orders", "Styling specs", "Logistics records", "Inspection records", "Production reports", "Inventory reports", "Purchase bills", "Sales invoices", "Audit and tax records"] },
          { name: "Finance", items: [{ name: "Market statistics", items: ["Cotton price", "Currency"] }, { name: "Dashboard", items: ["Ledger", "Payroll", "Buyer payments", "Transactions"] }] }
        ] },
        { type: "images", layout: "phones", items: [
          { src: "assets/img/projects/texgenie/wf-login.webp", caption: "Login" },
          { src: "assets/img/projects/texgenie/wf-home.webp", caption: "Home" },
          { src: "assets/img/projects/texgenie/wf-track.webp", caption: "Order tracking" },
          { src: "assets/img/projects/texgenie/wf-stock.webp", caption: "Inventory" },
          { src: "assets/img/projects/texgenie/wf-docs.webp", caption: "Documents" },
          { src: "assets/img/projects/texgenie/wf-money.webp", caption: "Finance" }
        ] }
      ] },
    { key: "system", kicker: "Design system", nav: "Design system", title: "One visual language for busy hands.", paras: [
      "TexGenie blue, black and white. Plus Jakarta Sans for its open, legible shapes at small sizes. Light-blue tiles for anything you can tap, black cards for what's running right now, and status colours a supervisor can read from across the floor.",
      "The same components build the phone app and the desktop."
    ], quote: "",
      show: [ { type: "tgds", title: "The TexGenie design system" } ] },
    { key: "mobile", kicker: "Mobile", title: "The factory, in your pocket.", paras: [
      "The phone app is for people on the move: owners between units, supervisors on the floor. It opens on what matters today, and every screen ends in one clear action.",
      "Scroll through it screen by screen."
    ], quote: "Big type, big buttons, plain words.",
      show: [
        { type: "story", device: "phone", title: "The phone app", steps: [
          { label: "Login", title: "One account per person.", text: "Each role signs in to see only its own part of the order.", img: "assets/img/projects/texgenie/p-login.webp" },
          { label: "Home", title: "Today, at a glance.", text: "The daily report Genie wrote, the most important task, the running purchase order with its progress and issues, and the day's checklist.", img: "assets/img/projects/texgenie/p-home.webp" },
          { label: "Order tracking", title: "Where is PO 6577?", text: "Every step with its time and status, quick call and message buttons for the unit, and the purchase order or bill one tap away. A printable summary sits on top.", img: "assets/img/projects/texgenie/p-track.webp" },
          { label: "Issues", title: "Problems, sorted by urgency.", text: "Urgent, priority and review, in colours readable at arm's length. Add an issue or edit the list without leaving the screen.", img: "assets/img/projects/texgenie/p-issues.webp" },
          { label: "Genie", title: "Talk, don't type.", text: "A supervisor says what happened in Tamil, Hindi or English. Genie fills in the order, step, issue and new date, and nothing is saved until they confirm.", img: "assets/img/projects/texgenie/p-voice.webp" },
          { label: "Inventory", title: "Stock that warns you.", text: "Product and office stock in tiles. Genie spots trims running short for an upcoming step and offers a reorder.", img: "assets/img/projects/texgenie/p-stock.webp" },
          { label: "Documents", title: "Every record, one search away.", text: "Purchase orders, styling specs, inspection records, invoices and reports, in one list.", img: "assets/img/projects/texgenie/p-docs.webp" },
          { label: "Finance", title: "Money and markets.", text: "Cotton price and the dollar rate, credit and debit, payroll and ledger, and recent transactions.", img: "assets/img/projects/texgenie/p-money.webp" }
        ] }
      ] },
    { key: "desktop", kicker: "Desktop", title: "The whole factory, on one screen.", paras: [
      "The office needs the wide view: every order, every unit, every rupee. The desktop keeps the phone's visual language and adds space for planning, comparing and approving.",
      "Scroll and the workspace changes."
    ], quote: "",
      show: [
        { type: "appframe", title: "Eight workspaces", app: "TexGenie", items: [
          { label: "Dashboard", title: "Good morning, Sangeetha.", text: "Running orders with their progress and where each one is now, the issues raised, what is due for dispatch, the cotton price, today's tasks, and a morning report Genie has already written.", img: "assets/img/projects/texgenie/d-dash.webp" },
          { label: "Order", title: "One order, end to end.", text: "PO 6522's journey from order to dispatch, updates as they arrive from the floor, where it is right now with a button to call the unit, and every document attached to it.", img: "assets/img/projects/texgenie/d-order.webp" },
          { label: "Production", title: "Every order at its step.", text: "A board with one column per stage. Genie flags the order that will miss its date and suggests the fix.", img: "assets/img/projects/texgenie/d-prod.webp" },
          { label: "Issues", title: "Raised anywhere, resolved here.", text: "Issues from the floor app, voice notes, the desktop and Genie's own predictions, each with an owner and a status. Genie also spots patterns, like a check that keeps running late.", img: "assets/img/projects/texgenie/d-issues.webp" },
          { label: "Inventory", title: "Know before you run out.", text: "Stock levels for yarn, fabric, trims and finished goods, with Genie suggesting what to reorder and what to hold, based on running orders.", img: "assets/img/projects/texgenie/d-stock.webp" },
          { label: "Documents", title: "Filed against the order.", text: "Every document type from the information architecture, a list for each, and a preview without opening another app.", img: "assets/img/projects/texgenie/d-docs.webp" },
          { label: "Finance", title: "Markets, approvals, transactions.", text: "Cotton and currency trends, credit and debit, a queue of approvals, and every transaction tied to its order.", img: "assets/img/projects/texgenie/d-money.webp" },
          { label: "Genie", title: "Ask your factory a question.", text: "“Where is PO 6522, and will it ship on time?” Genie answers from the factory's own records, shows its sources, and offers the next action for a person to take.", img: "assets/img/projects/texgenie/d-genie.webp" }
        ] }
      ] },
    { key: "genie", kicker: "AI", nav: "Genie", title: "Genie suggests. People decide.", paras: [
      "The thesis ended with AI as the future scope: better productivity, quality control, resource use and decisions. In the 2026 revisit I designed that layer and called it Genie.",
      "Genie never replaces anyone's judgement. It reads what's already flowing through TexGenie, saves people time, and always asks before anything is saved, sent or paid."
    ], quote: "AI that saves people time, not AI that replaces them.",
      show: [
        { type: "tgai", title: "What Genie does", items: [
          { ic: "doc", t: "Writes the daily report", d: "Reads the day's updates and writes the owner's morning summary: what moved, what slipped, what needs a decision.", w: "Desktop and phone" },
          { ic: "mic", t: "Turns voice notes into updates", d: "Supervisors speak in their own language. Genie fills in the order, step and issue, and they confirm.", w: "Phone" },
          { ic: "clock", t: "Warns about delays", d: "Compares loom schedules, stitching plans and ship dates, flags the orders at risk, and suggests a fix.", w: "Desktop" },
          { ic: "cam", t: "Checks quality from a photo", d: "A quality checker photographs a piece. Genie flags a possible defect, and a person decides.", w: "Phone" },
          { ic: "box", t: "Suggests what to reorder", d: "Matches stock against running orders, so trims and yarn arrive before the step that needs them.", w: "Desktop and phone" },
          { ic: "chat", t: "Answers questions", d: "“Where is PO 6522?” Answers come from the factory's own records, with sources shown.", w: "Desktop" }
        ] }
      ] },
    { key: "together", kicker: "Together", title: "One tap on the floor, seen in the office.", paras: [
      "This is the whole idea, live. The supervisor marks a step done on the phone, and the owner's desktop updates at once. Raise an issue on the phone and it lands at the top of the owner's list.",
      "Try it."
    ], quote: "",
      show: [ { type: "tgsuite", mode: "duo", title: "Both screens, one order", caption: "Press the big button on the phone and watch the desktop." } ] },
    { key: "testing", kicker: "Testing", title: "Less waiting, same people.", paras: [
      "I tested the prototype with the stakeholders using the think-aloud method. They were happy with it, said it would be more valuable once it was functional, and singled out documents and order tracking as the parts that would help most.",
      "Their comments changed the design."
    ], quote: "",
      show: [
        { type: "table", title: "What testing changed", cols: ["What testers said", "What I changed"], rows: [
          ["The text was too small to read.", "Larger type and bigger tap targets, especially on the phone."],
          ["Some functions weren't clear at first glance.", "A word under every icon in the navigation."],
          ["The documents section would help their work.", "Documents open from the order they belong to."],
          ["Order tracking was good, but they wanted more detail.", "Each step shows where the order is, who updated it, and who to call."]
        ] },
        { type: "causes", title: "What changes for the factory", items: [
          { title: "The owner stops chasing", text: "Every order and where it is, on one screen, without a phone call." },
          { title: "The floor reports once", text: "One tap or one voice note updates everyone who needs to know." },
          { title: "Problems surface early", text: "Issues from the floor, and Genie's warnings, reach the office while they can still be fixed." },
          { title: "Records stay with the order", text: "Bills, specs and inspection reports attach to the order they belong to." }
        ] },
        { type: "images", items: [ { src: "assets/img/projects/texgenie/poster-results.webp", caption: "Where it started: the 2023 thesis screens, from the final poster" } ] }
      ] }
  ],
  specs: [
    { group: "Screens", rows: [
      { label: "Desktop", detail: "Owner, production manager and accounts" },
      { label: "Phone", detail: "Owners on the move, floor supervisors, quality checkers and workers" },
      { label: "Shared view", detail: "Buyers and suppliers follow their own order" },
      { label: "Genie", detail: "Reports, voice updates, delay warnings, photo checks, reorders, questions" } ] },
    { group: "Design system", rows: [
      { label: "Type", detail: "Plus Jakarta Sans" },
      { label: "Colour", detail: "TexGenie blue #004796, black and white" } ] },
    { group: "Process", rows: [
      { label: "Secondary research", detail: "Literature review, stakeholder map, market study, SWOT" },
      { label: "Primary research", detail: "Interviews with owners and senior managers" },
      { label: "Concept", detail: "Mind map, requirements, concept evaluation, design brief" },
      { label: "Design", detail: "Information architecture, wireframes, design system, high-fidelity screens" },
      { label: "Testing", detail: "Think-aloud sessions with stakeholders" },
      { label: "Tools", detail: "Figma (2023), HTML and React (2026)" } ] }
  ]
};
