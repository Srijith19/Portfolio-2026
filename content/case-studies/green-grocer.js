/* Case study: green-grocer. A business pitch from the Design, Innovation & Management course.
   Built from the ISA-1 deck, the consolidated report and the team's research and financials sheet.
   Interviewees and validators are private people, so they're described, never named.
   ggx blocks (course, chain, journey, route, loops, voices, diff, runway, gtm, team) are drawn in code. */
SITE.caseStudies["green-grocer"] = {
  style: "steps",
  phases: ["Research", "Define", "Ideate", "Validate", "Business"],
  headline: "A market on wheels that pays for itself.",
  subhead: "A business we designed in an entrepreneurship course: an auto-rickshaw that collects small farmers' produce, sells it where demand is high, and covers its costs with the ads on its sides. Plus the app that runs it, which I've rebuilt for today.",
  tldr: [
    { label: "Why", text: "Small farmers can't see how demand moves prices and can't afford to move their own harvest, so middlemen buy low at the farm gate and sell high in the city." },
    { label: "What", text: "A moving farmers' market for a small commission, with a screen on the vehicle sold as ad space, and an app for both farmers and advertisers." },
    { label: "How", text: "Secondary research, interviews with farmers, a competitive audit, validation with farmers, buyers and ad clients, a costed plan and a go-to-market strategy." }
  ],
  conclusion: {
    title: "A business that could pay its own way.",
    why: "Small farmers lose most of the price of their crop to middlemen, because they can't see where demand is and can't afford to move the harvest themselves. The course asked us to find a problem worth building a business around, and this was ours.",
    how: "A moving market that carries several small farms' produce to where demand is high, for a small commission, with a screen on its side sold as ad space to cover the running costs. And an app for both sides: farmers and advertisers.",
    ended: "As a costed, validated pitch: farmers, buyers and an ad client tested the model, farmers and business users tested the first screens, and the plan set out what it would take to start and run.",
    hard: ["Farmers trust people they know, so a newcomer has to prove it works first.", "Moving produce across a state border brings permits, road tax and commercial registration.", "Early income from commission and ads sits below the running cost.", "Surplus has to go somewhere, or the model wastes what it set out to save."]
  },
  sections: [
    { key: "course", kicker: "The course", phase: 0, title: "An entrepreneurship course, not a design brief.", paras: [
      "Design, Innovation & Management asked each team to pick an industry, find a problem worth building a business around, and take it all the way to a pitch: research, a solution, validation with real stakeholders, costs and a plan to launch.",
      "We picked agricultural produce and marketing. Most of us had grown up close to farming families, and we'd all heard the same story: the harvest goes to a middleman at whatever price he names."
    ], blocks: [
      { type: "ggx", kind: "course", code: "DIM · PES University", name: "Design, Innovation & Management",
        text: "A team of six, one semester, judged as a business: is it desirable, can it be built, and does it pay?",
        steps: [
          { t: "Pick an industry", d: "Agricultural produce and marketing" },
          { t: "Research it", d: "Articles, papers and farmers, in their own words" },
          { t: "Frame the problem", d: "Why small farmers lose money to middlemen" },
          { t: "Design the business", d: "A moving market, funded by ads" },
          { t: "Validate", d: "Farmers, buyers, ad clients and app users" },
          { t: "Cost it and pitch", d: "Start-up costs, funding and launch plan", us: true }
        ] }
    ] },

    { key: "research", kicker: "Research", phase: 0, title: "The farmer sees the harvest. The middleman sees the market.", paras: [
      "Small farmers grow a large share of India's food on very small plots. But they rarely know what their crop sells for in the city, they can't store it, and moving it themselves costs more than the load is worth. So they sell at the farm gate.",
      "In the interviews, one farmer told us she sold her first sack of cotton at ₹100 a kilo and her last at ₹60 in the same season. She never learnt what the middleman sold it for. Another said that when prices drop, he leaves the crop in the field, because harvesting it would cost more than he'd get."
    ], blocks: [
      { type: "chart", title: "What we found", charts: [
        { kind: "hbar", title: "Small farms, big share", sub: "What small and marginal farms account for in India", unit: "%", max: 100,
          data: [ { l: "Fields under two hectares", v: 85, hl: true }, { l: "High-value crops", v: 70 }, { l: "Agricultural output", v: 51 }, { l: "Operating land", v: 46 } ],
          source: "Secondary research: Agrarian Studies Foundation and others" },
        { kind: "bar", title: "One season of cotton", sub: "Price per kilo, sold to a middleman", unit: "", max: 100,
          data: [ { l: "First sack", v: 100 }, { l: "Last sack", v: 60, hl: true } ],
          note: "₹ per kg", source: "Interview, a farmer near Salem" },
        { kind: "donut", title: "Where the price can go", sub: "In the worst cases we read about", unit: "%", center: "75%", centerLabel: "to middlemen",
          data: [ { l: "Middlemen's cut, at most", v: 75 }, { l: "Left for the farmer", v: 25 } ],
          source: "Secondary research" }
      ] },
      { type: "ggx", kind: "chain", title: "Who touches a tomato", labels: ["Today", "With Green Grocer"],
        now: [ { t: "Farmer", i: "farm" }, { t: "Itinerant trader", i: "truck", mid: true }, { t: "Broker", i: "hand", mid: true }, { t: "Commission agent", i: "hand", mid: true }, { t: "Wholesaler", i: "box", mid: true }, { t: "Retailer", i: "store", mid: true }, { t: "You", i: "you", end: true } ],
        gg: [ { t: "Farmer", i: "farm" }, { t: "Collection point", i: "pin" }, { t: "Moving market", i: "truck" }, { t: "You", i: "you", end: true } ],
        capNow: "Vegetables change hands three or four times between the farm and the buyer, and every hand takes a cut. The farmer, who did the work, is paid first and least.",
        capGg: "We collect, grade and drive the produce to where it's wanted. The farmer is paid an advance at pickup and the rest when it sells, minus a small commission." }
    ] },

    { key: "problem", kicker: "Problem", phase: 1, title: "Not a lack of crops. A lack of reach.", paras: [
      "Laid side by side, the two journeys explain it. The farmer does all the slow, risky work and stops at the farm gate. The intermediary starts there: he already knows the harvest dates, has the money, the transport and the storage, and waits for demand before he sells."
    ], blocks: [
      { type: "words", kicker: "Problem statement", text: "Because they don't know how *demand* moves *prices*, and *transport* is hard to arrange, small farmers rely on middlemen to sell their produce, and are *exploited* for it." },
      { type: "ggx", kind: "journey", title: "A small farmer's season", labels: ["Selling to a middleman", "Selling with Green Grocer"], shared: 6,
        before: ["Gets a loan or government support", "Buys saplings and seeds", "Plants", "Irrigates", "Harvests", "Keeps enough for home", "Sells at the farm gate to an intermediary", "Takes a heavy loss"],
        after: ["Gets a loan or government support", "Buys saplings and seeds", "Plants", "Irrigates", "Harvests", "Keeps enough for home", "Books a pickup with us", "Gets an advance at pickup", "Produce goes to the collection point", "Graded by quality", "Sold where it's in demand", "Paid in full, minus a small commission"] }
    ] },

    { key: "idea", kicker: "The idea", phase: 2, title: "Give the farmers wheels. Let the ads pay for them.", paras: [
      "If the problem is reach, the answer is mobility. We collect produce from several small farms, grade it at a collection point, and sell it from a moving market in parts of the city where there's demand and few shops.",
      "That raised the obvious question: how does a business that only takes a small commission pay for vehicles, fuel and drivers? Our answer was to advertise as we go. The market's side becomes a screen, and local businesses pay to be on it."
    ], blocks: [
      { type: "ggx", kind: "route", title: "The first route", alt: "A map from Krishnagiri along NH44 to Marathahalli, ending at Silver Springs Layout in Munnekollal",
        from: "Krishnagiri", to: "Marathahalli", last: "Silver Springs Layout",
        notes: [
          { k: "Pickup", t: "Krishnagiri", d: "Farms around the town, where we'd collect, grade and load." },
          { k: "94 km on NH44", t: "Two to two and a half hours", d: "Close enough to arrive in the morning with produce picked at dawn." },
          { k: "Sell", t: "Silver Springs Layout, Munnekollal", d: "Dense housing with few markets nearby, so demand is high." }
        ] },
      { type: "ggx", kind: "loops", title: "Two businesses on one vehicle", img: "assets/img/projects/green-grocer/rickshaw.webp", loops: [
        { t: "The produce loop", c: "Commission", cs: "small, on each sale", steps: ["Farmer books a pickup", "Collected and graded", "Sold from the moving market", "Farmer paid, minus a small cut"],
          d: "This loop is for the farmers. We keep only a small commission, so most of the city price goes back to the farm." },
        { t: "The ad loop", c: "Ad income", cs: "pays for the run", steps: ["A business books screen time", "Its ad loops on the side screen", "Seen on the road and at every stop", "Income covers fuel and drivers"],
          d: "This loop pays the bills. A moving screen reaches people on the street that a TV ad, which can be muted, doesn't." }
      ] },
      { type: "hscroll", title: "The moving market", items: [
        { src: "assets/img/projects/green-grocer/rickshaw.webp", caption: "A second-hand auto, modified with shelves", ar: "16 / 9" },
        { src: "assets/img/projects/green-grocer/rickshaw-road.webp", caption: "Produce collected that morning", ar: "1600 / 938" },
        { src: "assets/img/projects/green-grocer/rickshaw-road-2.webp", caption: "Hired drivers, on the route", ar: "1600 / 938" },
        { src: "assets/img/projects/green-grocer/rickshaw-ad.webp", caption: "The screen at the back, for advertising", ar: "16 / 9" }
      ] },
      { type: "images", title: "The brand", items: [
        { src: "assets/img/projects/green-grocer/logo-dark.webp", caption: "A farmer carrying his harvest, in a round badge" },
        { src: "assets/img/projects/green-grocer/logo.webp", caption: "“From farmers to you”, painted on the vehicle" }
      ] }
    ] },

    { key: "validate", kicker: "Validation", phase: 3, title: "We asked before we built.", paras: [
      "A business needs more than one kind of yes. We took the model to farmers, to people who'd buy from the market, and to a business owner who'd pay for the screen. Then we tested the first app screens with farmers and with ad clients."
    ], blocks: [
      { type: "ggx", kind: "voices", title: "What each group told us", groups: [
        { t: "Farmers", who: "Farmers and farming families around Bengaluru and Hosur.",
          heard: ["Trust comes first. Show us it has worked for someone before.", "Have a plan for surplus, so nothing gets wasted.", "Check demand area by area, against the cost of the produce.", "Build the network online and offline. If a few farmers do well, word of mouth will bring the rest."],
          so: "made every sale visible to the farmer: where it sold, at what price, and what we kept. Extra produce moves on to the next stop on the route." },
        { t: "Buyers", who: "People in Bengaluru who cook at home, one living alone and one working from home.",
          heard: ["A moving market would help where there are no grocery shops nearby.", "Fresher produce is the reason to buy.", "Online grocery is convenient but expensive.", "Some would pay a little more for convenience; some would always pick the cheaper option."],
          so: "chose stops in dense areas with few shops, and priced to sit under online grocery." },
        { t: "Ad clients", who: "The owner of a manufacturing business who already spends on physical advertising.",
          heard: ["People will pay for ads on vehicles like autos.", "At first you'll have to go and find clients. Once you're known, they'll come to you.", "Start with small businesses.", "Tell them a TV ad can be muted or skipped. A screen on the street can't."],
          so: "planned to start with small local businesses on our own routes, and to give every client a report of where and how long their ad ran." },
        { t: "App test", who: "Farmers and people from business services, each given a few tasks on the first Figma screens while we watched.",
          heard: ["The terms were easy to understand and the screens easy to move through.", "Information in our own language would help.", "Show us the routes, prices and transport, so we can trust it.", "Payments must be safe from scams.", "A chat that answers quickly would help.", "Advertisers want data on who saw what."],
          so: "built language choice into the first screen, live tracking, a line-by-line payout, a help chat in the farmer's language, and a campaign report." }
      ] }
    ] },

    { key: "app", kicker: "The app", phase: 2, title: "One app, two front doors.", paras: [
      "The app has a door for farmers and a door for advertisers. We tested the 2023 version with both. For this site I've rebuilt it from scratch, using the same brand and the feedback we got, so that it meets today's standards: bigger touch targets, one main action per screen, plain numbers, and the farmer's own language from the first tap."
    ], blocks: [
      { type: "story", device: "phone", title: "The app, rebuilt", steps: [
        { label: "Start", title: "Pick your language, then your door.", text: "English, Kannada or Tamil, chosen before anything else. Then: I grow produce, or I want to advertise. You sign in with a phone number and a code, so there's no password to forget.", img: "assets/img/projects/green-grocer/s-welcome.webp" },
        { label: "Farmer home", title: "Where your crop sells today.", text: "The next pickup, and the thing farmers never had: today's price for their crop in each area we sell in, next to the farm-gate price.", img: "assets/img/projects/green-grocer/s-home.webp" },
        { label: "Book", title: "A pickup in three taps.", text: "What, how much and when. The advance is shown up front: forty percent at pickup, the rest when it sells.", img: "assets/img/projects/green-grocer/s-book.webp" },
        { label: "Track", title: "Watch it travel.", text: "Picked up, graded, on NH44, selling at Silver Springs Layout. And the driver's name, with a call button, for the farmers who'd rather talk.", img: "assets/img/projects/green-grocer/s-track.webp" },
        { label: "Earnings", title: "Every rupee, explained.", text: "Each batch shows where it sold, for how much, the advance, our commission and what reached the bank. This is how we earn trust, which is what the farmers asked for.", img: "assets/img/projects/green-grocer/s-earn.webp" },
        { label: "Help", title: "Ask in your own words.", text: "A help chat that answers in the farmer's language, typed or spoken, with a person one tap away.", img: "assets/img/projects/green-grocer/s-help.webp" },
        { label: "Advertise", title: "Book the screen.", text: "A business picks the areas, the length of the campaign and sees its ad on the market's screen before paying.", img: "assets/img/projects/green-grocer/s-ad.webp" },
        { label: "Report", title: "Proof that it ran.", text: "Hours on screen, stops and areas, day by day. The ad client in our validation said this is what brings clients back.", img: "assets/img/projects/green-grocer/s-report.webp" }
      ] }

    ] },

    { key: "compete", kicker: "Competition", phase: 3, title: "They buy the produce. We move it.", paras: [
      "Farm-to-home start-ups already exist. But most of them buy from farms, store the produce and sell it on at a profit. That's a better middleman, not no middleman. Green Grocer never owns the produce: it carries it, sells it, and passes the price back."
    ], blocks: [
      { type: "table", title: "Competitive audit", cols: ["Who", "Type", "Where", "Model", "What they promise"], rows: [
        ["Bigbasket", "Indirect", "Bengaluru, across many Indian cities", "B2C and B2B", "Groceries and health products delivered on time"],
        ["Harvesting Farmer Network", "Direct", "Chandigarh, Punjab", "C2C", "Farmers buy good, affordable inputs and get loans and insurance"],
        ["Otipy", "Direct", "Gurgaon, Haryana", "C2C", "Farm to home in twelve hours"],
        ["Deep Rooted", "Direct", "Bengaluru, Hyderabad, Chennai", "C2C", "The freshest fruit and vegetables, and conscious living"],
        ["Green Grocer", "Direct", "Krishnagiri to Bengaluru, to start", "Commission and ads", "Farmers' own produce, sold where demand is high"]
      ] },
      { type: "ggx", kind: "diff", cols: [
        { k: "Most competitors", t: "A better middleman", steps: ["Buy from the farm", "Store it", "Sell it at a markup"], r: "The margin stays with the company." },
        { k: "Green Grocer", t: "No middleman", steps: ["Collect from small farms", "Drive it to where it's wanted", "Sell it from the moving market"], r: "The price goes back to the farmer, minus a small commission." }
      ] }
    ] },

    { key: "business", kicker: "Business", phase: 4, title: "What it costs to start, and how we'd launch.", paras: [
      "We costed the whole operation: vehicles, trucks to bring produce into the city, licences, people, insurance and a safety fund. It came to about ₹40 lakh to start, and ₹1.5 to 2 lakh a month to run before taxes and advances to farmers.",
      "Early income, from commission and ads together, wouldn't cover that, so we planned a first funding round of ₹80 lakh to ₹1 crore to carry us through the first months while we proved the model."
    ], blocks: [
      { type: "chart", title: "The costs", charts: [
        { kind: "hbar", title: "Setting up", sub: "One-time costs, ₹ lakh", unit: " L",
          data: [ { l: "Emergency fund", v: 10 }, { l: "Three mobile-market autos", v: 9, hl: true }, { l: "Truck to bring produce in", v: 7 }, { l: "Labour, drivers and loaders", v: 1 }, { l: "Modifying the autos", v: 0.45 }, { l: "Website and app", v: 0.35 }, { l: "FSSAI and trade licences", v: 0.17 } ],
          source: "Team financials" },
        { kind: "hbar", title: "Every month", sub: "Running costs, ₹ lakh", unit: " L",
          data: [ { l: "Fuel, truck and autos", v: 0.6, hl: true }, { l: "Legal and professional", v: 0.5 }, { l: "Insurance", v: 0.5 }, { l: "Office rent", v: 0.3 } ],
          note: "Plus road tax and advances to farmers", source: "Team financials" }
      ] },
      { type: "ggx", kind: "runway", title: "Money in, money out",
        monthTitle: "Each month, at the start", monthMax: 2.4, monthNote: "Commission and ad income start below the running cost. The gap is what the funding round covers.",
        month: [ { l: "Running cost", a: 1.5, b: 2, v: "₹1.5–2 L" }, { l: "Expected income", a: 0.7, b: 1, v: "₹0.7–1 L" } ],
        fundTitle: "First funding round", max: 100, startup: 40, fundA: 80, fundB: 100, startupL: "Start-up · ₹40 L", restL: "Runs the first 4–5 months", ticks: [0, 20, 40, 60, 80, 100],
        fundNote: "₹80 lakh to ₹1 crore: the start-up costs, then enough to run while the model proves itself in a few areas." },
      { type: "ggx", kind: "gtm", title: "Going to market", phases: [
        { t: "Earn trust", steps: ["Target marketing", "Gain the farmers' trust", "Word of mouth"] },
        { t: "Get seen", steps: ["Campaign", "Build an online presence", "Sign ad-space clients"] },
        { t: "Prove it", steps: ["Start selling", "Prove the model in small areas", "Then charge commission"] }
      ] }
    ] },

    { key: "team", kicker: "The team", phase: 4, title: "Six of us, one pitch.", paras: [
      "We split the work by strength. My part was the app: I designed the UI screens with Dara Shashank and Keziah, and presented them in the pitch. For this portfolio I rebuilt that interface and turned our slides into the interactive figures you've just scrolled through."
    ], blocks: [
      { type: "ggx", kind: "team", names: ["Alan Mathew", "Dinesh Kumar A", "Dara Shashank", "Keziah", "Pooja Shenoy", "Srijith D Raj"] }
    ] }
  ]
};
