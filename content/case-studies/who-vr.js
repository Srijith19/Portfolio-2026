/* Case study: who-vr. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md. */
SITE.caseStudies["who-vr"] = {
  style: "slate",              // a film's front page, then every part of the making-of slated like a scene
  tone: "cinema",              // the film's own colours: blue-black and yellow
  film: {
    still: "assets/img/projects/who-vr/cover.webp", focus: "62% 50%",
    presents: "Immersive Media Experience Design Lab, IIT Jodhpur",
    meta: ["A 360° short film", "9:34", "2025", "Experimental · Coming-of-age · Drama"]
  },
  headline: "Is loneliness really the enemy?",
  subhead: "A 360° short film that started with the edits, not the story: can cinema's montage tricks work when the viewer chooses where to look?",
  tldr: [
    { label: "Problem", text: "Most VR films rely on minimal editing, often a single shot. We wanted to know whether montage, one of cinema's basic tools, survives in 360°." },
    { label: "Approach", text: "We listed effects first (match cuts, dolly zooms, time-lapse, reverse motion), kept the feasible ones and built a story around them. Then a script, a 360° wireframe for every scene, test shoots and a 12-day production." },
    { label: "Outcome", text: "A 360° film screened in headsets at Immersive Realities, IIT Jodhpur, with written reviews from viewers. Most of the rapid cuts worked." }
  ],
  highlights: [
    "We started with the edits, then wrote a story to fit them.",
    "Every scene was wireframed on a 360° map before the shoot.",
    "A locked door labelled “Amygdala” hides what he won't face.",
    "Time freezes for everyone except him.",
    "Over 30 people watched it in headsets at Immersive Realities."
  ],
  sections: [
    { key: "brief", kicker: "Brief", title: "Start with the edit, not the story.", paras: [
      "We set out to explore the 360° film medium by reversing the usual process. We started not with a story but with experiments suited to our skills and our time. Most VR narratives rely on minimal editing, often single shots. Inspired by Lev Kuleshov's theory of montage, that meaning comes from how images are combined rather than from any one image, we set out to experiment with editing in 360°.",
      "We brainstormed techniques like match cuts, dolly zooms, time-lapse and reverse motion, narrowed the list to what was feasible, and built the story around them. Editing became the creative core of the film.",
      "The brief: a 360° film with spatial audio, at least five minutes long, made in two weeks by a team of four with different levels of filmmaking experience."
    ], quote: "", image: { src: "assets/img/projects/who-vr/hero.webp", caption: "The long empty road: the film's first scene" } },

    { key: "story", kicker: "Finding the story", title: "A comedy, or a man alone?", paras: [
      "After several rounds of discussion we narrowed our ideas to two. A comedy: a meta-narrative about friends making a short film, with one side of the sphere showing their ideas. And a philosophical story about a solitary character, told through monologues and montages about loneliness.",
      "We chose the philosophical concept. It gave us more freedom to experiment with visual effects and edits, which drove the whole process.",
      "The protagonist's life is a series of missed connections, always a step out of sync. When a sarcastic interviewer challenges his solitude, he begins to question everything he thought he knew about belonging. In this darkly comedic journey of self-discovery, one man learns that standing apart might be the best way to fit in."
    ], quote: "Is loneliness really the enemy? Or could it be the key to truly finding yourself?",
      blocks: [
        { type: "credits", title: "The experience", items: [ { l: "Seating", v: "Revolving chair" }, { l: "Duration", v: "9:34" }, { l: "Genre", v: "Experimental, coming-of-age, drama" } ] }
      ] },

    { key: "structure", still: { src: "assets/img/projects/who-vr/brain.webp", caption: "Inside his head: the two voices" }, kicker: "Narrative structure", title: "Seven threads, a dark half and a bright half.", paras: [
      "We mapped each core theme and emotional beat, then organised the sequences to follow the protagonist from isolation to self-acceptance. The story breaks into seven threads: the interview, cycling, play, music, the group, swimming and doomscrolling.",
      "Every thread has a negative half and a positive half. The first half of the film shows all the negative halves, then a transition, then the positive halves, so the protagonist's view of loneliness turns from a burden into something he can embrace.",
      "The interview is the film's spine, linking every sequence. The swimming pool is the transition: it cuts from the negative to the interview where the core theme is discussed, then to the positive swim that starts the uplifting sequences. The interview is also a metaphor, the logical right brain interviewing the emotional left brain."
    ], quote: "",
      blocks: [
        { type: "images", items: [
          { src: "assets/img/projects/who-vr/timeline-board.webp", caption: "The first sketch of the timeline, on a whiteboard" },
          { src: "assets/img/projects/who-vr/threads.webp", caption: "Seven threads, and the order they cut together" }
        ] }
      ] },

    { key: "script", prop: "script", kicker: "Script and characters", title: "Two voices, one mind.", paras: [
      "With the scenes in order, we started the script. An incident triggers an introspection in the protagonist, shown as the protagonist interviewing himself.",
      "At first the interviewer tries to overpower him, until he comes to a realisation. So the film isn't monotonous, the interviewer is sarcastic, makes dark jokes and asks biting questions while he has the upper hand. Then the protagonist overpowers the interviewer. Their conversation is the only dialogue in the film.",
      "The negative scenes are intercut with the interview where the interviewer wins, his voice carrying on as a voiceover. The positive scenes are intercut with the moments where the protagonist wins."
    ], quote: "",
      blocks: [
        { type: "split", items: [
          { img: "assets/img/projects/who-vr/script.webp", title: "The script", text: "Scene by scene, with every interview exchange written to land on a cut." },
          { img: "assets/img/projects/who-vr/protagonist.webp", title: "The protagonist (the interviewee)", text: "Arjun begins introverted and quietly hopeful. He keeps finding himself left behind by friends, overlooked in groups and alone in his interests. He isn't bitter, but he is unsure: he internalises his loneliness and wonders whether it's a flaw or simply his fate. His arc runs from confrontation, denial and reflection to realisation, acceptance and a planned transformation." },
          { img: "assets/img/projects/who-vr/interviewer.webp", title: "The interviewer", text: "Sardonic, almost antagonistic: Arjun's inner critic and a stand-in for society's expectations. He uses biting sarcasm and pointed questions to challenge Arjun's view of the world, often mocking his isolation. His arc runs from provocation to genuine curiosity, respect and a revelation." }
        ] }
      ] },

    { key: "spatial", prop: "viewfinder", kicker: "Spatial design", title: "Every scene, wireframed in 360°.", paras: [
      "Before the shoot we wireframed the spatial design of every scene, placing the main characters and key elements around the viewer. Pre-visualising this way helped us avoid mistakes and plan each scene properly. It was essential for effects like the match cut.",
      "We split the sphere into zones: a content zone in front, peripheral zones from 70° to 105° on either side, and a curiosity zone behind the viewer."
    ], quote: "",
      blocks: [
        { type: "images", items: [ { src: "assets/img/projects/who-vr/zones.webp", caption: "Content, peripheral and curiosity zones around the viewer" } ] },
        { type: "images", items: [
          { src: "assets/img/projects/who-vr/setup-1.webp", caption: "The long empty road and the interview room" },
          { src: "assets/img/projects/who-vr/setup-2.webp", caption: "The hostel room and the badminton court" },
          { src: "assets/img/projects/who-vr/setup-3.webp", caption: "The outdoor garden and the swimming pool" }
        ] }
      ] },

    { key: "set", prop: "light", kicker: "Lighting and set design", title: "Blue for isolation, yellow for what he loves.", paras: [
      "Two indoor sets carry most of the film's meaning, so we lit them to say what the dialogue doesn't."
    ], quote: "",
      blocks: [
        { type: "split", items: [
          { img: "assets/img/projects/who-vr/room.webp", title: "Indoor setup 1: the protagonist's room", text: "A dramatic blue and yellow scheme. Blue light comes from outside, through a small window covered in blue gel, so most of the room is bathed in a cool, melancholic blue that evokes isolation. The desk is lit warm yellow, drawing the eye to his own space, where his swimming goggles and cycling gear sit: the sources of joy the later scenes explore." },
          { img: "assets/img/projects/who-vr/studio.webp", title: "Indoor setup 2: the interview studio", text: "A compact media interview room, built to feel confined, because the whole interview is an inner dialogue playing out in his mind. Two continuous softboxes give even, focused light. One door is labelled “Amygdala”, after the part of the brain that processes fear and anxiety, and it stays locked: the feelings he hasn't faced yet." }
        ] }
      ] },

    { key: "tests", kicker: "Test shots", title: "Testing for motion sickness before the shoot.", paras: [
      "Because the point was to try techniques VR films don't usually use, we tested them in advance, especially for viewer comfort and motion sickness. We ran quick test shoots at the real locations, with the camera angles and heights we intended to use, and cut them straight away to judge the composition and how each setup would feel in a headset."
    ], quote: "",
      blocks: [
        { type: "images", items: [
          { src: "assets/img/projects/who-vr/test-cycle.webp", caption: "Testing motion sickness for a moving scene rigged on a cycle" },
          { src: "assets/img/projects/who-vr/test-first.webp", caption: "A test of the first scene, setting up the 360° experience" },
          { src: "assets/img/projects/who-vr/test-badminton.webp", caption: "Camera position for the badminton scene" }
        ] },
        // Drag to look around one of the test frames; the dial shows which zone you're in
        { type: "pano", title: "Look around a test frame", src: "assets/img/projects/who-vr/test-first.webp", fov: 140, caption: "A 360° test of the first scene. Turn past 70° and you're in the peripheral zone; past 105°, the curiosity zone behind the viewer." }
      ] },

    { key: "shoot", prop: "cam360", kicker: "Shooting", title: "Measured to the actor's eye level, every time.", paras: [
      "On set we kept to the comfortable main zone, the peripheral zones and the curiosity zone. To make transitions between scenes seamless, we measured the camera's height against the actor's eye level with a tape at every setup, which kept the perspective consistent across the film."
    ], quote: "",
      blocks: [
        { type: "images", items: [ { src: "assets/img/projects/who-vr/zones-shot.webp", caption: "View zones over an equirectangular frame: curiosity, peripheral, main" } ] },
        { type: "hscroll", title: "On set", items: [
          { src: "assets/img/projects/who-vr/bts-rig.webp", caption: "A DIY camera rig for a stable motion shot" },
          { src: "assets/img/projects/who-vr/bts-measure.webp", caption: "Measuring between the camera and the actor" },
          { src: "assets/img/projects/who-vr/bts-gel.webp", caption: "Colouring the glass blue for the gel effect" },
          { src: "assets/img/projects/who-vr/bts-distance.webp", caption: "Measuring distance for positioning" },
          { src: "assets/img/projects/who-vr/bts-selfie.webp", caption: "A selfie with the props before leaving for the location" },
          { src: "assets/img/projects/who-vr/bts-actor.webp", caption: "Setting and checking the actor's position" },
          { src: "assets/img/projects/who-vr/bts-interview.webp", caption: "Measurements for the interview scene" },
          { src: "assets/img/projects/who-vr/bts-recorder.webp", caption: "Reading the voice recorder's manual at the last minute" }
        ] }
      ] },

    { key: "post", kicker: "Post-production", title: "Eight tricks borrowed from cinema.", paras: [
      "This is where the experiment lived. By blending editing and VFX in unconventional ways (freezing and reversing time, stitching realities, projecting digital content into physical space, and putting text into the environment) we tried to widen what's possible in virtual storytelling."
    ], quote: "",
      blocks: [
        { type: "split", items: [
          { img: "assets/img/projects/who-vr/post-screen.webp", title: "Easing into immersion: the expanding screen", text: "The film doesn't open on the full panorama. It opens on a narrow band circling the viewer, like peering through the slit of a film reel. Frame by frame the band widens until the whole 360° world is revealed." },
          { img: "assets/img/projects/who-vr/post-split.webp", title: "Dual realities: split-frame acting", text: "To show two versions of the character side by side, we shot two separate 180° scenes and stitched them together. The scene is in black and white, which gives it a psychological, dreamlike quality and underlines his inner conflict." },
          { img: "assets/img/projects/who-vr/post-insta.webp", title: "Social media as environment: the Instagram feed", text: "In a blue-lit scene he scrolls Instagram, and the feed is projected live onto the wall behind him. We designed motion graphics in After Effects and used planar tracking to pin the feed to the curved surface of the 360° room." },
          { img: "assets/img/projects/who-vr/post-freeze.webp", title: "Time distortion: freeze frame with solo movement", text: "To show his isolation, the world freezes while he alone keeps moving. That meant freezing the background in post and carefully cleaning up any stray motion from the other actors." },
          { img: "assets/img/projects/who-vr/post-pool.webp", title: "Playing with time: the reverse pool jump", text: "He jumps into the pool, then time rewinds and sends him back out. The classic reverse shot needed careful attention to light, motion and water so the reversal felt natural in VR." },
          { img: "assets/img/projects/who-vr/post-match.webp", title: "Seamless journeys: the match-cut travel sequence", text: "For the climax, his motion stays unbroken while the world changes around him, using precise match cuts that line up his movement from one shot to the next." },
          { img: "assets/img/projects/who-vr/post-music.webp", title: "Surreal musical manifestation", text: "He appears on both sides of the frame, 218° apart, miming an instrument. Then real instruments appear in his hands and vanish again: we paused the action, handed him the instruments off camera, and cut between the takes." },
          { img: "assets/img/projects/who-vr/post-credits.webp", title: "Integrated text: credits on the ground", text: "Instead of floating text in front of the viewer, the credits, intro cards and production names are laid into the ground plane of the scene, matched in perspective and light so they feel part of the world." }
        ] }
      ] },

    { key: "audio", prop: "wave", kicker: "Spatial audio", title: "Recorded, then placed in the sphere.", paras: [
      "We recorded all the dialogue and voiceovers and combined them with royalty-free sound effects and music. The audio was spatialised in Reaper 7, exported as a four-channel file, and joined to the 360° video in Premiere Pro."
    ], quote: "", image: { src: "assets/img/projects/who-vr/audio.webp", caption: "The spatial mix in Reaper" } },

    { key: "challenges", kicker: "Unexpected challenges", title: "What went wrong, and how we got round it.", paras: [], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "The interview scene", text: "The original audio had so much reverb it was unusable, and cleaning it up didn't work, so we rerecorded all the dialogue along with the voiceovers." },
          { title: "The guitar scene", text: "We first shot it at twilight, but the Insta360 struggles in low light and the footage was grainy. With little time left, we reorganised the schedule and reshot it." },
          { title: "The cycle montage", text: "The cycle stays constant while the background changes fast: a visual anchor that grounds viewers and reduces motion sickness. On uneven ground the selfie-stick camera changed height, and with time running out we kept the footage, so the cuts have varying heights." },
          { title: "The time freeze", text: "Two people walked behind the actor in the take, so they would have unfrozen and walked into the frozen frame. The other actors were better in that first take, so we cut the protagonist out of it, placed him on the second take, and froze that." }
        ] }
      ] },

    { key: "poster", prop: "poster", kicker: "Poster", title: "A Penrose staircase inside his head.", paras: [
      "We looked at posters that show a character's introspection, like The Lighthouse (2019), where the events happen inside the character's head.",
      "Ours shows the protagonist with his head open, and inside it an endless Penrose staircase: the loops of self-doubt he walks along the rim of his mind, never reaching a conclusion, until he decides to take a deep dive, into the water of the swimming pool. The poster teases the theme and the setting at once."
    ], quote: "",
      blocks: [
        { type: "images", items: [
          { src: "assets/img/projects/who-vr/poster-sketch.webp", caption: "The first sketch" },
          { src: "assets/img/projects/who-vr/poster.webp", caption: "The final poster" }
        ] }
      ] },

    { key: "showcase", show: [
        { type: "video", title: "Watch the film", file: "YouTube link to come", caption: "The film opens here in a player once its YouTube link is added (set yt to the video id)." }
      ],
      kicker: "Showcase and reviews", title: "Screened in headsets, reviewed in writing.", paras: [
      "We screened the film at Immersive Realities, a VR film show organised by the School of Design at IIT Jodhpur in March 2025. People watched it in headsets, told us how much they enjoyed it, and left written reviews."
    ], quote: "",
      blocks: [
        { type: "images", items: [ { src: "assets/img/projects/who-vr/showcase.webp", caption: "Viewers at Immersive Realities" } ] },
        { type: "voices", title: "What viewers wrote", items: [
          { text: "Amazing transitions, shots and immaculate usage of the 360 view to fit in various compositions. The storytelling and sounds made it an engaging and really captivating experience.", who: "Viewer, Immersive Realities" },
          { text: "Brilliant. Impressive narration and great editing. Simple, subtle and extravagant edits and transitions.", who: "Viewer, Immersive Realities" },
          { text: "What an experience! The story was engaging, the characters had depth and the whole experience was quite immersive. The last shot of the camera falling down was like hitting the nail on the coffin.", who: "Viewer, Immersive Realities" },
          { text: "Amazing! It felt like some art movie but still making sense. The storyline was realistic and yet engaging.", who: "Viewer, Immersive Realities" },
          { text: "Excellent production, every part of the film was both engaging and beautiful. Thank you for the experience and the reminder that loneliness is just a part of us.", who: "Viewer, Immersive Realities" }
        ] }
      ] },

    { key: "learnt", kicker: "What we learnt", title: "Cuts work in VR. Not all of them.", paras: [
      "Because the film was so experimental, we warned every viewer about rapid cuts and transitions before they watched. Here's what the feedback, and our own experience, taught us."
    ], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "Rapid cuts worked", text: "We assumed fast, frequent cuts might jar or discomfort people. No one reported that, which suggests cuts and transitions can become as normal in VR films as they are in 2D." },
          { title: "Quick transitions have limits", text: "Where the whole space matters, like the music scene, quick cuts gave only a glimpse. Some viewers didn't notice the space was split into two scenes at once, and by the time others did, the scene was over." },
          { title: "Movement keeps attention", text: "As in ordinary films, moving shots and cuts hold attention. Children, who couldn't follow the story, found the interview the most boring part and loved the scenes with faster cuts and a moving camera." },
          { title: "Match cuts and shot variety work", text: "Many transitions were match cuts, and they landed, showing that many techniques from 2D film carry over. Our guide, an experienced VR filmmaker, liked many shots and noted we had tried some he hadn't." },
          { title: "Everything is in shot", text: "In 2D, lights and crew hide behind the camera. In 360° everything is in frame, so hiding the crew and lights is a production problem of its own." },
          { title: "Is 360° the future?", text: "Exploring a full sphere takes effort and curiosity, especially behind the head. It makes us ask whether 180° films might work better: viewers needn't look back, and filmmakers get somewhere to hide the crew." }
        ] }
      ] }
  ],
  specsTitle: "Credits.",
  specs: [
    { group: "Credits", rows: [
      { label: "Starring", detail: "Daniel Pushparaj" },
      { label: "Direction", detail: "Edwin Meleth, Daniel Pushparaj, Nidhin Martin, Srijith D Raj" },
      { label: "Edit and VFX", detail: "Srijith D Raj" },
      { label: "Script and screenplay", detail: "Edwin Meleth, Daniel Pushparaj" },
      { label: "Spatial sound", detail: "Nidhin Martin" },
      { label: "Cinematography", detail: "Edwin Meleth" },
      { label: "Technical direction", detail: "Nidhin Martin" },
      { label: "Lighting", detail: "Daniel Pushparaj" }
    ] },
    { group: "With", rows: [
      { label: "Guided by", detail: "Dr Jayesh Pillai" },
      { label: "Special thanks", detail: "Dr Sumana Som, Ananda Bathena" },
      { label: "Made at", detail: "School of Design, IIT Jodhpur, with the Immersive Media Experience Design Lab" },
      { label: "Production", detail: "Porotta Boys Production" }
    ] }
  ]
};
