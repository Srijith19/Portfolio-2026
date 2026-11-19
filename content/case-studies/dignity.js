/* Case study: dignity. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md. */
SITE.caseStudies["dignity"] = {
  style: "diamond",            // every section shows where it sits on the double diamond
  phases: ["Discover", "Define", "Ideate", "Design"],
  headline: "Let's talk about defecation.",
  subhead: "Product design and design research on defecation for bedridden patients. What we find awkward to even talk about is a harsh reality for many, with consequences that range from a loss of dignity to serious health risks.",
  // The opening lines, read out one by one as you scroll, before the story starts
  opener: { type: "words", kicker: "Let's talk about defecation", text: "Uncomfortable, right? What if you had to do it right here? *Lying down. In front of everyone.* Nonsense, you must think." },
  iterationsPhase: 3,
  tldr: [
    { label: "Problem", text: "Bedridden and semi-mobile patients defecate into a bedpan: unergonomic for them, unhygienic for their caregivers, with only a curtain between them and the rest of the ward." },
    { label: "Approach", text: "A double-diamond process: secondary research, a field visit and interviews at AIIMS Jodhpur, affinity mapping, an action priority matrix and a persona, then brain dumping, SCAMPER and prototypes." },
    { label: "Outcome", text: "Six key insights, five iterations, and a final design that is now under consideration for a patent filing." }
  ],
  numbers: [
    { n: "4", l: "weeks" },
    { n: "5", l: "existing solutions reviewed" },
    { n: "6", l: "key insights" },
    { n: "5", l: "design iterations" }
  ],
  highlights: [
    "Some patients stop eating to avoid it.",
    "Only a curtain separates them from the ward.",
    "We visited AIIMS Jodhpur to see the whole process.",
    "One size of bedpan does not fit all.",
    "Five iterations, one final design under patent consideration."
  ],
  sections: [
    { key: "method", phase: "all", show: [
        // Our methodology, redrawn for the web (was methodology.webp)
        { type: "ddiamond", phases: [
          { name: "Discover", items: ["Introduction", "Secondary research", "Field visit", "Interviews"] },
          { name: "Define", items: ["Affinity mapping", "Deriving key insights", "Action priority matrix", "User persona", "Problem statement"] },
          { name: "Ideate", items: ["Brain dumping", "Brainstorming", "SCAMPER", "Prototype", "Iterate"] },
          { name: "Design", items: ["High-fidelity prototype", "Demonstration", "Feedback"] }
        ] }
      ],
      kicker: "Methodology", title: "Two diamonds: discover, define, ideate, design.", paras: [
      "We worked through a double diamond. Discover: an introduction to the space, secondary research, a field visit and interviews. Define: affinity mapping, deriving key insights, an action priority matrix, a user persona and the problem statement. Ideate: brain dumping, brainstorming, SCAMPER, prototypes and iteration. Design: a high-fidelity prototype, demonstration and feedback."
    ], quote: "" },

    { key: "discover", phase: 0, show: [
        { type: "words", text: "Patients are conscious of every sound and smell, when *the only thing separating them* from other patients is a curtain." }
      ],
      kicker: "Understanding the problem", title: "Only a curtain between them and everyone else.", paras: [
      "Defecation is an extremely vulnerable and sensitive activity for bedridden or semi-mobile patients and their caregivers. The current method on the bed is a bedpan, which means unergonomic, uncomfortable positions for the patient and unhygienic tasks for the caregiver.",
      "It often involves extreme mental preparation, and many patients try to avoid it by taking extreme steps, like not eating. They are extremely conscious of the sounds and smells of defecating in a shared space, when the only thing separating them from other patients is a curtain.",
      "Defecation also demands energy for bowel movements that weak and frail patients may not have. And cleaning up on the bed without water feels extremely dirty, especially in the Indian context."
    ], quote: "", image: { src: "assets/img/projects/dignity/problem-photo.webp", caption: "What defecation is for bedridden patients" },
      blocks: [
        { type: "text", title: "Contextual awareness and sensory mapping", paras: [
          "We began by familiarising ourselves with the hospital environment to understand the lived realities within that space, grounding the process in empathy. We shared memories of hospitals and past IPD experiences, and ran a memory and ICU association activity. Then we took one memory and studied the problem through every sense.",
          "We used a 2D cut-out of a cube to represent the hospital environment visually and spatially, and stickers to map sensory triggers and emotional responses: positive and negative experiences across touch, sight, smell, sound and taste."
        ] },
        { type: "images", items: [ { src: "assets/img/projects/dignity/sensory.webp", caption: "Sensory mapping on a cube cut-out of the hospital" } ] }
      ] },

    { key: "secondary", phase: 0, kicker: "Secondary research", title: "Why it happens, and why today's solutions fail.", paras: [
      "Shame and embarrassment around defecation in hospitals lead to emotional distress, a higher risk of infection, pressure ulcers, physical discomfort and slower recovery. In the long term they affect patients' posture, bring shame to every hospital visit, and stigmatise the people who handle and dispose of faeces."
    ], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "Psychological and emotional causes", text: "Defecating, especially in shared spaces, causes mental distress through awareness of smell, sound and unhygienic conditions, and causes embarrassment." },
          { title: "Lack of mental health awareness", text: "A lack of privacy and dignity increases discomfort for the patient and is equally hard on the caregiver." },
          { title: "Disposal issues", text: "Handling and disposal can be a major hazard for those in charge." },
          { title: "Unergonomic positions and physical causes", text: "Bedpans in government facilities may be uncomfortable and cause posture-related issues. Generic bedpans may not suit special cases such as post-partum mothers." },
          { title: "Taboo and discomfort for caregivers", text: "Caregivers face social stigma and discrimination because of the nature of their job. They are vulnerable to infections and can become carriers too." }
        ] },
        { type: "images", items: [ { src: "assets/img/projects/dignity/solutions.webp", caption: "Available solutions: bedpans, adult diapers, portable chairs, multifunctional beds and patient bidet systems" } ] },
        { type: "text", title: "Why the solutions don't work", paras: [
          "They deal with cleaning the patient, but fail to protect the patient's shame and dignity. They also depend heavily on the caregiver's state of mind: cleaning someone else's excreta is a disturbing experience, and carrying it can spread disease and infection."
        ] },
        { type: "text", title: "Knowledge gaps to bridge", paras: [
          "Before the field visit we listed what we still needed to learn: how shared spaces affect dignity and self-esteem; what stops people asking for help; caregivers' routines and where bedpans, diapers and portable pots are kept; the ergonomics for patients and caregivers; hospital waste disposal and hygiene practice; how patients and caregivers are oriented at admission; and the equipment and materials used across hospitals."
        ] },
        { type: "images", items: [ { src: "assets/img/projects/dignity/gaps-chart.webp", caption: "We consolidated key details into a chart to keep revisiting throughout the process" } ] }
      ] },

    { key: "field", phase: 0, kicker: "Primary research", title: "What we saw at AIIMS Jodhpur.", paras: [
      "To understand defecation among bedridden patients, we visited AIIMS Jodhpur. We saw the entire process, the struggles of patients in different departments and the tools in use, and noted how regulations and disparities affect care, especially in rural hospitals.",
      "Used bedpans were left open in shared bathrooms, and a single bedpan was often used by five or six patients. Protective kits were available for cleaning staff, but they admitted to rarely using them."
    ], quote: "",
      blocks: [
        { type: "images", items: [
          { src: "assets/img/projects/dignity/aiims.webp", caption: "AIIMS Jodhpur" },
          { src: "assets/img/projects/dignity/departments.webp", caption: "Departments visited: gynaecology, neurology, paediatrics, oncology and psychiatry" },
          { src: "assets/img/projects/dignity/bathrooms.webp", caption: "Shared bathrooms, where used bedpans were left open" },
          { src: "assets/img/projects/dignity/bedpans.webp", caption: "Bedpans in use" }
        ] },
        { type: "images", items: [ { src: "assets/img/projects/dignity/products.webp", caption: "Products used for defecation and disposal: portable commode chairs, bedpans, colour-coded disposal bags (Bio-Medical Waste Management and Handling Rules, 2016), covered bedpans and diapers" } ] },
        { type: "voices", title: "What we heard across the hospital", items: [
          { text: "I had to carry the used diaper bag across the nurse station from my ward to reach the dumpster to dispose it. There were no disposal bags provided to me.", who: "Om Prakash, attendant, oncology medicine" },
          { text: "Patients' discharges sometimes spill over and I wear the same clothes until day end and have to wash them on my own. Next day, I wear the same pair.", who: "Rekha, housekeeper, general IPD" },
          { text: "I often fall sick and have infections. There is a lack of attention paid to our safety or health.", who: "Arvind, housekeeper, neurology IPD" },
          { text: "Currently the only best option available is bedpans and diapers, considering the availability and economy.", who: "Dr Arjun, junior doctor" }
        ] }
      ] },

    { key: "analysis", phase: 1, kicker: "Analysis", title: "From a wall of notes to six insights.", paras: [
      "We gathered and visually organised every observation, quote and finding. This unstructured clustering showed patterns and problem areas before we moved to structured affinity mapping.",
      "Building on those clusters, we sorted insights, quotes and observations under broader categories, and refined them into themes through several rounds of physical affinity mapping and discussion."
    ], quote: "",
      blocks: [
        // Information gathering and initial clustering, redrawn for the web (was clustering.webp)
        { type: "clusters", title: "Information gathering and initial clustering", groups: [
          { title: "Training and mental preparation of caregivers", notes: ["Training given to nurses but not extended to housekeeping", "No physiology education given to caregivers, where injury may get worse through mishandling"] },
          { title: "AIIMS compared with rural hospitals (doctors' insights)", notes: ["AIIMS has many facilities for patients. At a rural hospital, there were no housekeeping departments", "Attendants cater directly to patients' defecation, use polythene bags and dispose of them off the main building, unsupervised"] },
          { title: "Hygiene measures for the caregivers", notes: ["No aprons", "Training given to nurses but not extended to housekeeping", "High risk of infection among caregivers", "Bad circulation for waste disposal", "No laundry services for housekeeping", "Caregivers go home in the same clothes, and may become victims or carriers of infection", "No mental preparation for caregivers"] },
          { title: "Special needs that are or aren't met during defecation", notes: ["A gap in communication", "The same bedpan, whatever the gender", "No dedicated space to keep sanitised bedpans after use, no separate wash areas", "No personal laundry for housekeeping", "Irregular response to regulations and safety standards across departments"] }
        ] },
        { type: "images", items: [ { src: "assets/img/projects/dignity/affinity-wall.webp", caption: "Physical affinity mapping" } ] },
        { type: "chips", title: "The themes", items: ["Psychological impact", "Limitations", "Secondary issues", "Social issues", "Total immobility: diapers", "Regulations and hospital management", "Limited mobility: bedpans", "Training and education", "Disposal", "Hygiene and health"] },
        { type: "images", items: [ { src: "assets/img/projects/dignity/affinity.webp", caption: "Connecting categories and clubbing insights" } ] },
        { type: "insights", title: "Six key insights", items: [
          "Poor disposal methods and ignored protocols create environmental and health hazards, and risky, insanitary conditions.",
          "Gaps in the knowledge and training of attendants, caregivers and cleaning staff compromise patient care. Missed signs of infection lead to further complications.",
          "Patients often feel shame, embarrassment and disgust in front of others. This deepens their discomfort, costs them their dignity, and makes them hesitate to ask for timely care.",
          "Expensive as they are, diapers are often the only option for some patients, especially the elderly. Many people don't know how to use them, which leads to sleepless nights, discomfort, dependency and infections that can be fatal.",
          "Standard bedpan sizes cause discomfort for different bodies and mobility levels. The strain slows recovery and can lead to secondary trauma, infection and caregiver burnout. One size does not fit all.",
          "The taboo around defecation stops open conversation about the well-being of patients and caregivers. People stay silent about their discomfort, and hygiene and sanitation are neglected."
        ] }
      ] },

    { key: "define", phase: 1, kicker: "Defining the goal", title: "Who we were designing for, and what for.", paras: [
      "We turned the six insights into an action matrix of desired experiences, barriers and actions, then ranked the actions on an action priority matrix of urgency and importance.",
      "An empathy map and a persona kept us honest. Shanti is a 33-year-old construction worker who supports her family, values privacy and self-reliance, cannot afford expensive products and cannot read a user manual."
    ], quote: "Everyday is hard, but my strength is what keeps my family fed and sheltered.",
      blocks: [
        // The action matrix, redrawn for the web (was action-matrix.webp). Open a row to see it.
        { type: "amatrix", title: "Action matrix", chosen: "A product that caters to immobile and unconscious patients to defecate with minimal contact, mitigates infection risks, promotes hygiene and aids safe disposal, while giving clear guidance on how it should be used or disposed of.", rows: [
          { insight: "Poor disposal methods and ignored protocols create environmental and health hazards, and risky, insanitary conditions.",
            want: ["Minimise the caregiver's contact with faecal matter", "Protocols followed strictly to keep the environment clean", "A discreet, respectful approach to disposal", "Intuitive, specific ways to dispose"],
            bar: ["No automated systems in place", "Lack of monitoring", "Workers from marginalised communities accept the conditions without complaint", "Little awareness of sustainable practices", "No discreet options available at scale"],
            act: ["A guidance and monitoring tool that spreads awareness of how to practise safe disposal", "A faecal management and disposal system that is discreet and minimises the need for guidance, at low cost"] },
          { insight: "Gaps in the knowledge and training of attendants, caregivers and cleaning staff compromise patient care. Missed signs of infection lead to further complications.",
            want: ["Infections caused by a lack of caregiving knowledge are prevented", "Less cognitive load, more intuitive patient care", "Smooth communication between stakeholders, and better patient care", "A support system that encourages talking about these issues"],
            bar: ["Little access to structured education or training", "Adapting to new ways is difficult", "Caregivers lack a signal when a patient needs attention", "Too much information causes confusion"],
            act: ["Well-defined indicators and intuitive tools that are easy to understand and help patient care run smoothly", "Interactive, engaging ways to learn and remember essential processes", "An ergonomic product that is easy to use and understand, reducing physical and cognitive load"] },
          { insight: "Patients often feel shame, embarrassment and disgust in front of others. This deepens their discomfort, costs them their dignity, and makes them hesitate to ask for timely care.",
            want: ["Patients feel safe and respected, with more privacy", "The least possible exposure of private parts", "Independent ways of defecating"],
            bar: ["No privacy in shared wards and facilities", "Fear of being a bother"],
            act: ["An automated, structured system for defecation that lets patients stay independent and keep their privacy", "Empathetic support systems and spaces that protect privacy and improve communication"] },
          { insight: "Expensive as they are, diapers are often the only option for some patients, especially the elderly. Many people don't know how to use them, which leads to sleepless nights, discomfort, dependency and infections that can be fatal.",
            want: ["An indication when the patient has soiled their diaper", "Comfortable solutions that don't chafe or cause rashes"],
            bar: ["Disgust and discomfort for caregivers who clean and change diapers every 5 to 6 hours", "No guidance on how to use diapers, or what precautions to take"],
            act: ["A human-centred product for bedridden patients with varied mobility and needs, reducing the risk of infection and secondary trauma, easing caregiver burnout, and keeping hygiene affordable", "A product for immobile patients that prevents infections from late changes and helps safe disposal, with clear guidance on how to use it"] },
          { insight: "Standard bedpan sizes cause discomfort for different bodies and mobility levels. The strain slows recovery and can lead to secondary trauma, infection and caregiver burnout. One size does not fit all.",
            want: ["As little stress as possible while defecating", "Help for caregivers who log-roll or handle patients with injuries"],
            bar: ["No custom options for different types of patient"],
            act: ["A product that caters to immobile and unconscious patients to defecate with minimal contact, mitigates infection risks, promotes hygiene and aids safe disposal, while giving clear guidance on how it should be used or disposed of."] },
          { insight: "The taboo around defecation stops open conversation about the well-being of patients and caregivers. People stay silent about their discomfort, and hygiene and sanitation are neglected.",
            want: ["A sense of mutual respect"],
            bar: ["No public awareness programmes", "Few signs around", "A deep-rooted cultural taboo"],
            act: ["Public awareness campaigns that challenge the taboo"] }
        ] },
        // The action priority matrix, redrawn for the web (was priority-matrix.webp)
        { type: "priority", title: "Action priority matrix", chosen: "A product that caters to immobile and unconscious patients to defecate with minimal contact, mitigates infection risks, promotes hygiene and aids safe disposal, while giving clear guidance on how it should be used or disposed of.", quads: [
          ["A human-centred product for bedridden patients with varied mobility and needs, reducing the risk of infection and secondary trauma, easing caregiver burnout, and keeping hygiene affordable", "An automated, structured system for defecation that lets patients stay independent and keep their privacy", "Well-defined indicators and intuitive tools that are easy to understand and help patient care run smoothly", "A product that caters to immobile and unconscious patients to defecate with minimal contact, mitigates infection risks, promotes hygiene and aids safe disposal, while giving clear guidance on how it should be used or disposed of."],
          ["Interactive, engaging ways to learn and remember essential processes", "Empathetic support systems and spaces that protect privacy and improve communication", "A faecal management and disposal system that is discreet and minimises the need for guidance, at low cost"],
          ["A guidance and monitoring tool that spreads awareness of how to practise safe disposal", "A product for immobile patients that prevents infections from late changes and helps safe disposal, with clear guidance on how to use it"],
          ["Empathetic support systems and spaces that protect privacy and improve communication", "Interactive, engaging ways to learn and remember essential processes"]
        ] },
        // Empathy mapping and the persona, redrawn for the web (were empathy.webp and persona.webp)
        { type: "empathy", title: "Empathy mapping: what does Shanti see, hear, do and think?", cols: [
          { k: "see", title: "See", groups: [
            { t: "Immediate environment", d: "A construction site and machines. Children, cement, dirt and iron rods. Makeshift homes, lizards and cracks. A dingy environment, alcohol bottles, steel bars and torn clothes." },
            { t: "Marketplace", d: "Fights, plastic and tarps. What she has to buy, local stalls and shops, low-cost aluminium utensils and bangles." },
            { t: "Watches and reads", d: "Serials, news, fliers and posters. Groups of women doing chores outside their homes, accidents, congested living space, pamphlets and children's storybooks." } ] },
          { k: "hear", title: "Hear", groups: [
            { t: "Others say", d: "An authoritative tone, gossip, day-to-day problems, screams. Children's stories, banter, complaints, “be safe”. Stories of domestic violence, affairs and money problems." },
            { t: "From friends", d: "Marriage problems, long queues for water, electricity issues, rations, back pain, newborn-baby stories, worry about children's future, how they used to live." },
            { t: "From bosses and colleagues", d: "Shouting, manipulative tactics, dismissal, regular inspection, what to cook, warnings, leaving work, encouragement." },
            { t: "From social media", d: "Political conflicts, labour-rights movements, fake content, entertainment, dream-world reels, fraudulent promises, government schemes and religious content." } ] },
          { k: "do", title: "Do", groups: [
            { t: "She does", d: "Heavy lifting, working in dirt and a risky environment, household chores and cooking, talking to relatives on calls, saving." },
            { t: "Attitudes in public", d: "Frustrated and rebellious, confident in her surroundings, intimidated, hiding from the world." },
            { t: "Towards others", d: "Caring towards her family, ignorant of authority, hesitant to say what she needs." } ] },
          { k: "think", title: "Think", groups: [
            { t: "The problem as it is", d: "Helpless and frustrated, mentally drained, afraid of speaking up, hopeless, undervalued, afraid of passing it on, job insecurity, fear and uncertainty about the future, loneliness, no support." },
            { t: "About safety", d: "Worried about herself and her children, afraid of speaking up, vulnerable, no accessibility, fear of harassment, protective of her children, no protective gear; safety is not a priority." },
            { t: "Worries", d: "Will she be paid on time? She can't afford to fall sick. Stuck in a loop, bound to work for survival, trapped, and hopeful for her children." } ] }
        ] },
        { type: "personas", items: [
          { name: "Shanti", role: "Construction worker", img: "assets/img/projects/dignity/persona-photo.webp", meta: "33 · Married · Education: 6th pass",
            bio: "Shanti, a construction worker, strives to support her family while valuing privacy, safety and affordable solutions amid daily challenges.",
            quote: "Everyday is hard, but my strength is what keeps my family fed and sheltered.",
            groups: [
              { title: "Goals", points: ["Better quality of life", "Cost-effective solutions", "Work-life balance", "Accessible government facilities", "Confidence going to work", "Quicker recovery", "Least dependence on others"] },
              { title: "Frustrations", points: ["Getting daily wages", "Safety at work", "Doing her best to support her family", "Time with family", "Depending on others", "Can't read user manuals", "Can't afford expensive products"] },
              { title: "Values", points: ["Honest", "Self-reliant", "Strong notions about privacy", "Hard-working"] },
              { title: "Experience", points: ["Extreme poverty", "Many frauds and scams", "Social disparity at work"] }
            ] }
        ] },
        { type: "hmw",
          chosen: "A product that caters to immobile and unconscious patients to defecate with minimal contact, mitigates infection risks, promotes hygiene and aids safe disposal while providing clear guidance on how it shall be used or disposed.",
          why: "Diapers are the only solution for immobile patients, posing risks of infection, bedsores and unsanitary disposal. Direct contact with fecal matter affects caregivers' health and emotional well-being, making care challenging for both patients and caregivers.",
          statement: [
            { t: "How might we design " }, { t: "a sanitary defecation aid", hl: 1 }, { t: " for innovating " },
            { t: "a product that caters to immobile unconscious patients to defecate with minimal contact, mitigates infection risks, promotes hygiene and aids safe disposal while providing clear guidance on how it shall be used or disposed", hl: 2 },
            { t: " for " }, { t: "Shanti", hl: 1 }, { t: " that mitigates her current issue of " },
            { t: "difficulty in proper defecation for immobile bedridden patients, risk of infections and poor disposal", hl: 1 },
            { t: ", and improves her experience in accomplishing safe, dignified and hygienic defecation?" }
          ],
          image: { src: "assets/img/projects/dignity/team-discussion.webp", caption: "This concluded the second half of the first diamond: define" } }
      ] },

    { key: "ideate", phase: 2, kicker: "Ideate", title: "Brain dumping, then SCAMPER.", paras: [
      "We began with brain dumping to generate a wide range of ideas freely, exploring possibilities without constraints before refining them into feasible solutions. Then we pushed them further with SCAMPER."
    ], quote: "",
      blocks: [
        { type: "images", items: [ { src: "assets/img/projects/dignity/brain-dump.webp", caption: "Brain dumping" } ] },
        { type: "scamper", items: [
          { l: "S", w: "Substitute", d: "Replace a component, material or process with an alternative.", t: "Explored different ways to transfer waste: vacuum suction, pressure pumps, gravity-based collection and self-balancing mechanisms to prevent spillage.", img: "assets/img/projects/dignity/scamper-s.webp" },
          { l: "C", w: "Combine", d: "Merge two ideas, functions or elements to create something new.", t: "Merged an underwear-like structure with a vacuum pump and a containment system that converts waste into liquid for easier transfer and minimal material.", img: "assets/img/projects/dignity/scamper-c.webp" },
          { l: "A", w: "Adapt", d: "Modify or adjust an existing idea to fit a new use or context.", t: "Considered a non-invasive urinal design instead of traditional invasive methods, making it more user-friendly.", img: "assets/img/projects/dignity/scamper-a.webp" },
          { l: "M", w: "Modify", d: "Alter aspects like size, shape or function for improvement.", t: "Redesigned the waste transfer: a smaller pipe, a detachable container near the rectal area, and an ergonomic structure for comfort.", img: "assets/img/projects/dignity/scamper-m.webp" },
          { l: "P", w: "Put to another use", d: "Find a new purpose for an existing product or idea.", t: "Examined its use in water-leakage management and other sanitary solutions, broadening its usability.", img: "assets/img/projects/dignity/scamper-p.webp" },
          { l: "E", w: "Eliminate", d: "Remove redundant steps or barriers that make caregiving harder.", t: "Removed the conventional diaper structure for strap-based support around the thighs: a better fit, less skin contact and more breathability.", img: "assets/img/projects/dignity/scamper-e.webp" },
          { l: "R", w: "Reverse", d: "Restructure workflows or interactions to improve accessibility and dignity.", t: "Instead of suction, explored a water-flow system where water carries waste downward while helping with self-cleaning.", img: "assets/img/projects/dignity/scamper-r.webp" }
        ] }
      ] }
  ],
  iterations: [
    { title: "Iteration 1: inflatable slide-in mat", text: "Inflates to gently lift the patient and guide waste into a container with minimal skin contact. An attachment positions the patient naturally, and suction moves waste to a sealed disposal bag.", pros: ["Minimal skin contact for better hygiene", "Considers turning an unconscious patient"], cons: ["The inflated height may cause discomfort", "Bulkier than desired"], img: "assets/img/projects/dignity/iter-1.webp" },
    { title: "Iteration 1.1: body-shaped mattress", text: "A human-body-shaped ergonomic mattress, easier to lie on, but with no room to collect waste without suction.", pros: ["Enhanced comfort and support"], cons: ["Inefficient waste collection without suction"], img: "assets/img/projects/dignity/iter-11.webp" },
    { title: "Iteration 2: diaper with gentle suction", text: "Directs faecal matter into a container, with a water inlet to clean the area afterwards. A hands-free, hygienic solution.", pros: ["Hands-free, hygienic waste removal", "Integrated cleaning"], cons: ["Complex to maintain and clean", "Bulk could affect comfort"], img: "assets/img/projects/dignity/iter-2.webp" },
    { title: "Iteration 3: anatomical support with a soft tube", text: "A soft-ended tube guides waste straight to a container, with an inflatable support for comfort. The risk of internal injury led us to discard it, but its no-contact advantage shaped later iterations.", pros: ["Minimal contact, fewer diaper changes", "Few materials, so cost-effective"], cons: ["Invasive, with a risk of internal injury", "Needed extensive research to validate"], img: "assets/img/projects/dignity/iter-3.webp", more: ["assets/img/projects/dignity/iter-3-proto.webp", "assets/img/projects/dignity/iter-3-digital.webp"] },
    { title: "Iteration 4: multi-layer smart diaper", text: "A hydrophobic layer seals around the opening, over an absorbent layer and a detachable container for easy, hygienic disposal.", pros: ["Leak-proof", "Secure fit with layered absorption"], cons: ["Hard to remove and dispose of", "Complicated to put on"], img: "assets/img/projects/dignity/iter-4.webp" },
    { title: "Iteration 5: stripped to the essentials", text: "Iteration 4 without its unnecessary wearable parts, keeping the core collection system.", pros: ["More cost-effective with less material"], cons: ["Hard to secure around the legs and while turning", "Builds up heat", "Hard to adapt for patients"], img: "assets/img/projects/dignity/iter-5.webp" }
  ],
  finale: { title: "Final concept", text: "The final design brings together the best parts of every iteration and removes their drawbacks. It remains confidential while it is considered for a patent filing, so this page celebrates the messy journey and the wild what-ifs that shaped it.", image: "assets/img/projects/dignity/final.webp" }
};
