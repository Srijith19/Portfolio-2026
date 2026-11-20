/* Case study: internshala. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits, screens, lists, survey,
   personas. See README.md. */
SITE.caseStudies["internshala"] = {
  style: "search",             // each section opens as a search in the app, and its title is the result
  phases: ["Context", "Research", "Define", "Ideate", "Design", "Compare"],
  headline: "The right internship, and one you can trust.",
  subhead: "A 2021 redesign of the Internshala app, from the student's side of the screen: how students look for internships, what they want from one, and where the app lets them down.",
  tldr: [
    { label: "Problem", text: "Internshala is where most Indian students look for internships. But finding a role that fits your skills is hard, the filters are buggy, unpaid listings crowd the feed, and fraudulent companies slip through." },
    { label: "Approach", text: "A literature study, a SWOT and a competitor analysis against LinkedIn and Glassdoor, a student survey, two personas, a benchmark of three platforms, and a matrix to rank what to fix first." },
    { label: "Outcome", text: "Four ranked needs, a new information architecture, wireframes, a design system and a high-fidelity prototype with nine ways to browse internships, an internship calendar and fraud reporting." }
  ],
  numbers: [
    { n: "66.7%", l: "of students applied online" },
    { n: "52.6%", l: "want a paid internship" },
    { n: "3", l: "platforms benchmarked" },
    { n: "4", l: "needs ranked" }
  ],
  highlights: [
    "Two in three students found their internship online.",
    "More than half wanted pay, not just a certificate.",
    "Internshala scored 65% on satisfaction; LinkedIn scored 80%.",
    "More paid internships ranked first, fraud protection second.",
    "Nine ways to browse internships, from skills to star companies."
  ],
  sections: [
    { key: "context", phase: 0, nav: "Context", kicker: "Context", title: "India's biggest internship platform, seen from the student's side.", paras: [
      "Internshala is an internship and online training platform. Students across India search and apply for internships and jobs that match their coursework and interests, take online courses to build industry skills, and companies of every size post their openings.",
      "With over 1.4 crore students and 1.5 lakh companies, it's a household name for internships in India. A user base that large means every student has something good and something frustrating to say about it. Studied properly, those complaints point to problems worth solving."
    ], quote: "",
      blocks: [
        { type: "chips", title: "The process", items: ["01 Research", "02 Define", "03 Ideate", "04 Prototype", "05 Test"] },
        { type: "chips", title: "What I did", items: ["Literature study", "Market research", "SWOT analysis", "User research", "Paper wireframes", "Low-fidelity wireframes", "Design system", "High-fidelity wireframes", "Prototype"] }
      ] },

    { key: "literature", phase: 1, nav: "Literature", kicker: "Research · Literature study", title: "Why internships matter, to everyone involved.", paras: [
      "Internships give students practical experience, teamwork, a stronger résumé, professional relationships and, often, their first income. Colleges use internship programmes to improve enrolment and shape the curriculum. Companies get trained, job-ready graduates and save on supervision and training.",
      "Internships are a student's first look at how real work and real teams run. But the move from student to professional is rarely simple, and students meet many challenges on the way. A platform that sits at that moment carries a lot of responsibility."
    ], quote: "" },

    { key: "market", phase: 1, nav: "Market", kicker: "Research · Market", title: "Strong reach, weak trust.", paras: [
      "A SWOT analysis of Internshala, then a look at the two platforms students compare it with. The pattern was clear: Internshala wins on reach and choice of employers, and loses on trust and on how hard it is to find the right role."
    ], quote: "",
      blocks: [
        { type: "lists", title: "SWOT analysis", items: [
          { tag: "S", title: "Strengths", points: ["Search and apply for internships and fresher jobs across fields", "Startups, corporates, SMEs, NGOs and big brands all hire on it", "Online trainings help students upskill and become industry-ready", "A well-known name for internships"] },
          { tag: "W", tone: "weak", title: "Weaknesses", points: ["Many unpaid internships", "A weak fraud protection policy", "Few categories and preferences to choose from", "Fraudulent companies, loosely monitored", "A buggy internship filter"] },
          { tag: "O", title: "Opportunities", points: ["The internship culture in India is on a huge rise", "The sector is growing fast", "With more exposure, Internshala could lead the whole internship market"] },
          { tag: "T", tone: "threat", title: "Threats", points: ["LinkedIn and Glassdoor, built for jobs, are moving into internships", "New entrants and established names keep raising the competition"] }
        ] },
        { type: "lists", title: "Competitor analysis", items: [
          { title: "LinkedIn", points: ["The most reputed platform, used mostly for job search", "In-depth specifications for every job and internship", "Information on both the company and the recruiter", "Message or email the recruiter directly", "Detailed, legitimate company information, so less chance of fraud"] },
          { title: "Glassdoor", points: ["Employees and former employees review companies anonymously", "Partners with reputed companies in India and abroad", "Internships and part-time jobs at some of the world's biggest companies", "Detailed, legitimate company information, so less chance of fraud", "In-depth information on every offer"] }
        ] }
      ] },

    { key: "survey", phase: 1, nav: "Survey", kicker: "Research · Survey", title: "What students told us.", paras: [
      "A questionnaire for students on how they found their internships, how long those lasted, and what they want from the next one. Every respondent was between 18 and 24."
    ], quote: "",
      blocks: [
        { type: "chart", title: "What students told us", charts: [
          { kind: "donut", title: "Where did you apply for your internship?", unit: "%", center: "2 in 3", centerLabel: "applied online", source: "Student survey, 2021", data: [ { l: "Online", v: 66.7 }, { l: "Through known contacts", v: 16.7 }, { l: "Through college", v: 16.6 } ] },
          { kind: "hbar", title: "What do you want from an internship?", unit: "%", max: 100, source: "Student survey, 2021", data: [ { l: "Paid internship + certificate", v: 52.6, hl: 1 }, { l: "Certificate + future job opportunities", v: 42.1 }, { l: "Certificate + extra perks", v: 5.3 } ] },
          { kind: "hbar", title: "What kind of internship will you apply for?", unit: "%", max: 100, source: "Student survey, 2021", note: "More than one answer allowed", data: [ { l: "Part time", v: 62.5, hl: 1 }, { l: "Work from home", v: 54.2 }, { l: "Work from office", v: 16.7 }, { l: "Full time", v: 8.3 } ] },
          { kind: "bar", title: "What type of internship do you prefer?", unit: "%", max: 60, source: "Student survey, 2021", data: [ { l: "Design", v: 56.8, hl: 1 }, { l: "Technology", v: 18.9 }, { l: "Management", v: 13.5 }, { l: "NGO", v: 8.1 }, { l: "Other", v: 2.7 } ] },
          { kind: "hbar", title: "How long was your internship?", unit: "%", max: 100, source: "Student survey, 2021", note: "Approximate shares", data: [ { l: "1–3 months", v: 65, hl: 1 }, { l: "3–5 months", v: 27 }, { l: "6–8 months", v: 5 }, { l: "More than a year", v: 3 } ] }
        ] },
        { type: "insights", title: "What it means", items: [
          "Students search online. Two in three applied online, so the app is the front door, not college.",
          "Pay matters. More than half want a paid internship; only 5.3% would settle for a certificate and perks.",
          "Flexibility wins. Part-time and work-from-home lead; only 8.3% want full time while studying.",
          "Most internships are short, about two-thirds of them one to three months, so students apply often and need to find the next one fast."
        ] }
      ] },

    { key: "personas", phase: 1, nav: "Personas", kicker: "Research · Users", title: "Two students, two very different goals.", paras: [
      "From the survey, two personas: a designer who wants industry experience and a stipend, and an engineer who wants to move into management. Both are students who'll use the app often, for different reasons."
    ], quote: "",
      blocks: [
        { type: "personas", items: [
          { name: "Rahul", meta: "20 · Student, IIT Madras (2020–24) · Mumbai", quote: "I'm a design enthusiast and I've been working a lot on my design skills. Now I want a part-time or in-office job as a designer, to get experience working to industry standards, and some stipend.",
            groups: [ { title: "Likes and goals", points: ["Working as a design professional", "Creative work", "Technology products", "Travelling, rock music"] }, { title: "Frustrations", points: ["Complicated apps", "Cluttered design", "A messy workspace", "Forgetting important information"] } ],
            skills: ["Photoshop", "Illustrator", "InDesign", "Figma"] },
          { name: "Rohan", meta: "20 · Student, IIT Madras (2020–24) · Delhi", quote: "I love solving complex algorithms and I'm good at Java and C++. I want a career in business management, so I want experience in the management industry and in-depth exposure to it.",
            groups: [ { title: "Likes and goals", points: ["Coding and app development", "Investing and finance", "Social media", "Calm music"] }, { title: "Frustrations", points: ["Confusing UX", "Trusting unknown sources too easily", "Long working hours", "Plans that never get executed"] } ],
            skills: ["Python", "Java / C++", "Algorithms", "Video editing"] }
        ] }
      ] },

    { key: "benchmark", phase: 1, nav: "Benchmark", kicker: "Research · Benchmark", title: "Internshala against LinkedIn and Glassdoor.", paras: [
      "The three platforms compared on five measures, including the Single Ease Question: how easy a task felt, rated out of 7. Internshala matched LinkedIn on ease, but took longer and trailed it on satisfaction and retention."
    ], quote: "",
      blocks: [
        { type: "table", hl: 1, cols: ["Metric", "Internshala", "LinkedIn", "Glassdoor"], rows: [
          ["Time taken", "9 min", "7 min", "10 min"],
          ["Feature usage", "Efficient features", "Efficient features", "Redirects to the host website"],
          ["Satisfaction", "65%", "80%", "70%"],
          ["Retention", "70%", "75%", "60%"],
          ["Single Ease Question", "5.5", "5.5", "4"]
        ] }
      ] },

    { key: "define", phase: 2, nav: "Matrix", kicker: "Define · Matrix method", title: "Paid internships first, then fraud protection.", paras: [
      "Research left four needs. Comparing them against each other in a matrix gave each a score, and the scores set the order of the redesign."
    ], quote: "",
      blocks: [
        { type: "table", cols: ["Rank", "Need", "Score"], rows: [
          ["1", "More paid internships", "3.5"],
          ["2", "Fraud protection", "2.5"],
          ["3", "More ways to choose an internship", "2"],
          ["4", "A better résumé section", "1.5"]
        ] },
        { type: "causes", title: "Three problems to solve", items: [
          { title: "Finding the right role is complicated", text: "Too few categories and a buggy filter make it hard to find a role that suits your skills or qualification." },
          { title: "Finding one in your field is tough", text: "Paid, part-time and remote internships in a specific field are buried among everything else." },
          { title: "Finding a company you can trust is difficult", text: "Fraudulent companies are loosely monitored, and there's no clear way to report them." }
        ] }
      ] },

    { key: "structure", phase: 3, nav: "Structure", kicker: "Ideate · Information architecture", title: "Six branches, and one of them is for fraud.", paras: [
      "The new structure has six branches. Internships come first, browsable nine ways: automated recommendations, skill, qualification, location, apprenticeship, global roles, star companies, time, and part- or full-time. Training, a leaderboard, the profile and an internship calendar sit beside it, and fraud protection gets a branch of its own: report a client, report a company, and a complaints section."
    ], quote: "",
      blocks: [
        // The information architecture, redrawn for the web (was ia.webp)
        { type: "iatree", root: "Home", caption: "Information architecture of the redesigned app", branches: [
          { name: "Internships", items: [ { name: "Home", items: ["Automated", "Skill based", "Qualification based", "Location based", "Apprentice", "Global internships", "Star company", "Time based", "Part time / full time"] } ] },
          { name: "Training", items: [ { name: "Courses", items: ["New courses", "Search", "Recommended"] }, "Recommended", { name: "Workshops", items: ["Offline", "Online"] } ] },
          { name: "Leaderboard", items: ["Graphs and rankings", "Skill test score", "Experience factor", "Previous HR review"] },
          { name: "Profile", items: ["Download résumé", "Edit résumé", "Joined courses", "Previous internships", "Company ratings and reviews", "Job wishlist", "Achieved certificates"] },
          { name: "Job calendar", items: ["Upcoming", "Ongoing", "Previous"] },
          { name: "Fraud protection", hl: true, items: ["Report client", "Report company", "Complaint section"] }
        ] }
      ] },

    { key: "wireframes", phase: 3, nav: "Wireframes", kicker: "Ideate · Wireframes", title: "From paper to grey boxes.", paras: [
      "Ideas were sketched on paper first, then worked into low-fidelity wireframes for every key screen: home, internships, skill-based browsing, the calendar, the help centre, sign-up and the menu."
    ], quote: "",
      blocks: [
        { type: "collage", bg: "cream", items: [
          { src: "assets/img/projects/internshala/sketches.webp", caption: "Paper sketches", wide: true },
          { src: "assets/img/projects/internshala/wireframes.webp", caption: "Low-fidelity wireframes", wide: true }
        ] }
      ] },

    { key: "system", phase: 4, nav: "Design system", kicker: "Design system", title: "One typeface, a cyan accent, rounded everything.", paras: [
      "Type is set in Meticula on a scale from 56 to 6 points. The palette pairs cyan and blues with greys, white and black. Buttons and cards are rounded, the tab bar floats, and one icon set runs through every screen."
    ], quote: "",
      blocks: [
        // The design system, redrawn for the web (was design-system.webp). Click a swatch to copy it.
        { type: "dsys", typeface: "Meticula", scale: [["Heading 1", 56], ["Heading 2", 43], ["Heading 3", 28], ["Heading 4", 22], ["Heading 5", 19], ["Heading 6", 16], ["Heading 7", 12], ["Heading 8", 6]],
          colours: ["#4CC9EE", "#F2F2F2", "#FFFFFF", "#6A93C9", "#D6D0CF", "#00B4D8", "#000000", "#2E8BFF"] }
      ] },

    { key: "prototype", phase: 4, nav: "Prototype", kicker: "Prototype", title: "The redesign.", paras: [
      "Home greets you with your next interview from the calendar, the progress of your current internship, and roles picked for you. Internships open nine ways: by category, skill, qualification, location, pay, remote, part-time, star companies or what's new. Every listing shows pay, place and length as tags, so paid, part-time and remote roles are visible at a glance.",
      "I've brought the screens up to today's standards, with the same structure and the same cyan: bigger type, one action per screen, a small floating tab bar, and fraud protection you can see, with a verified badge on every company and a report button on every listing."
    ], quote: "",
      blocks: [
        { type: "story", layout: "center", device: "phone", title: "The redesign, screen by screen", steps: [
          { label: "Home", title: "Start from what you're looking for.", points: ["Next interview, with a reminder", "Progress of your internship"], text: "Home opens on the student's own plans: the next interview, how far the current internship has got, and roles picked for them. Promotions are gone.", img: "assets/img/projects/internshala/n-home.webp" },
          { label: "Internships", title: "Nine ways to browse.", points: ["Skill, qualification, pay, remote…", "Pay and place as tags"], text: "One long list became nine ways in, because students search differently: by what they know, what they're studying, or whether it pays. Paid ranked first in our matrix, so pay is always the first tag.", img: "assets/img/projects/internshala/n-browse.webp" },
          { label: "Details", title: "Everything about one internship.", points: ["Verified company badge", "Report in one tap"], text: "Fraud protection ranked second. Every company shows whether it's verified, and every listing has a report button next to Apply.", img: "assets/img/projects/internshala/n-detail.webp" },
          { label: "Calendar", title: "Keep track of dates.", points: ["Interviews and deadlines", "Reminders on each"], text: "The internship calendar keeps interviews, deadlines and end dates in one place, with a reminder on each.", img: "assets/img/projects/internshala/n-cal.webp" },
          { label: "Companies", title: "Companies worth your time.", points: ["Rated by past interns", "Open roles at a glance"], text: "Star companies have a page of their own: verified, rated by past interns, and showing how many roles are open now.", img: "assets/img/projects/internshala/n-comp.webp" },
          { label: "Training", title: "Learn what the roles ask for.", points: ["Courses tied to listings"], text: "Training is matched to the skills internships ask for, so a course is a step towards a role, not a detour.", img: "assets/img/projects/internshala/n-train.webp" },
          { label: "Profile", title: "Your profile, in one place.", points: ["Résumé, achievements, wishlist, certificates"], text: "The profile holds the résumé, achievements, a job wishlist and certificates, with a professional and a personal side.", img: "assets/img/projects/internshala/n-profile.webp" }
        ] }
      ] },

    { key: "outcome", phase: 5, nav: "Outcome", kicker: "Outcome", title: "Less noise, more choice.", paras: [
      "The original app opened on promotions and one search box. The redesign opens on what the student came for, turns one long list into nine ways to browse, puts pay first, and makes trust visible on every listing."
    ], quote: "",
      blocks: [
        { type: "split", items: [ { title: "Before and after", text: "Left, the 2021 home screen. Right, the redesign: the student's own plans first, then roles that fit them.", img: "assets/img/projects/internshala/before-after.webp" } ] }
      ] }
  ],
  conclusion: {
    why: "Internshala is where most Indian students look for internships, but finding one that fits your skills was hard, unpaid listings crowded the feed, and students didn't know which companies to trust.",
    how: "Research first, then a structure built around what students said they needed: pay they can see, roles they can find by skill or qualification, companies they can trust, and the dates that matter in one calendar.",
    ended: "As a high-fidelity prototype with nine ways to browse internships, an internship calendar and fraud reporting, benchmarked against LinkedIn and Glassdoor."
  }
};
