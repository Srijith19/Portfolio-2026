/* Case study: immerse-editor-pro. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md. */
SITE.caseStudies["immerse-editor-pro"] = {
  style: "timeline",           // sections open on an editor's ruler: each one is a clip, and a playhead moves through it
  tone: "deep",
  headline: "The future of storytelling will not be watched. It will be inhabited.",
  subhead: "Designing a spatial-first multimedia editing framework for XR content production: one system across desktop and VR, so immersive films are edited where they're watched.",
  tldr: [
    { label: "Problem", text: "We create three-dimensional experiences with two-dimensional tools. Every decision is made on a flat, distorted frame, the pipeline is spread across five or six apps, and creators lose 30–50% of production time managing it." },
    { label: "Approach", text: "Triangulated research: a literature review, interviews with 16 people across 7 immersive filmmaking teams, an evaluation of 7 tools, and lessons from producing the 360° film WHO VR. Then six design principles, a full system design across desktop and VR, and a validation study." },
    { label: "Outcome", text: "The Spatial-First Editing Framework and Immerse Editor Pro: 16 screens across two platforms. Three practitioners confirmed the direction, and the work became an ICoRD 2027 paper." }
  ],
  numbers: [
    { n: "16", l: "interview participants" },
    { n: "7", l: "filmmaking teams" },
    { n: "6", l: "design principles" },
    { n: "16", l: "screens, desktop and VR" }
  ],
  highlights: [
    "3D experiences, made with 2D tools.",
    "30–50% of production time goes to managing the pipeline.",
    "Every cut scored green, amber or red before it renders.",
    "Drag a sound onto the sphere. Hear it move.",
    "Edit inside the experience, not beside it."
  ],
  sections: [
    { key: "paradox", kicker: "The central paradox", title: "We are creating three-dimensional experiences with two-dimensional tools.", paras: [
      "Immersive media is everywhere now: 360° cameras are cheap, headsets are in homes, and festivals like Venice Immersive and Sundance's New Frontier have made VR cinema a serious medium. But the tools for making it were built for flat frames.",
      "Editors cut equirectangular footage on a flat timeline, guess at how it will feel, export, put on a headset, find a problem, and start again. That gap is costing creators half their production time."
    ], quote: "And that gap is costing creators half their production time.",
      blocks: [
        { type: "stats", title: "Why this matters now", items: [
          { n: "$1.6T", l: "XR market projected by 2032", t: "Fortune Business Insights, 2024." },
          { n: "45%", l: "of XR market value is software", t: "Not hardware." },
          { n: "$60B+", l: "lost by Meta's Reality Labs", t: "Hardware is not the prize. Software is." }
        ] },
        { type: "causes", title: "Every industry that captures space needs tools that understand space", items: [
          { title: "Film and immersive cinema", text: "Dedicated VR festival circuits now exist, and works like A. R. Rahman's Le Musk show immersive cinema needs professional post-production tools." },
          { title: "Architecture", text: "Clients walk through spatial designs before construction. Editing precision decides their confidence." },
          { title: "Journalism", text: "VR documentaries put the audience inside the story, and presence changes what they feel and remember." },
          { title: "Education and healthcare", text: "Virtual field trips, surgical training and virtual labs all need accurate, accessible immersive production." },
          { title: "Events and entertainment", text: "Weddings, concerts and cultural heritage are captured in 360°, and each needs a full professional editing pipeline." }
        ] }
      ] },

    { key: "secondary", kicker: "Secondary research", title: "Immersive media needs immersive editing tools.", paras: [
      "A literature review on VR editing, attention, narrative, continuity, comfort, interactivity and AI revealed a clear gap, and it shaped every decision in the framework."
    ], quote: "",
      blocks: [
        { type: "insights", title: "Seven findings", items: [
          "VR editing needs spatial workflows. 2D timelines break immersion; WYSIWYG spatial editing improves creative accuracy and confidence.",
          "Attention works differently in VR. Viewers look anywhere, and combined audio, visual and motion cues guide them better than framing alone.",
          "Narrative must be designed for 360°. Story beats spread around the sphere, scene openings need time for orientation, and immersion peaks when plot points align spatially.",
          "New continuity rules are needed. The 30° and 180° rules still apply, but distance to the region of interest is a new VR-specific factor, and rotation alignment makes cuts smoother.",
          "Comfort is non-negotiable. Motion and scrubbing in VR can cause discomfort; adaptive vignetting, minimal UI and ergonomic interaction reduce strain.",
          "Interactivity changes the experience. It boosts engagement, but poor placement raises cognitive load and breaks presence.",
          "AI will reshape immersive authoring: gaze prediction, spatial cue suggestions and detecting weak narrative segments."
        ] }
      ] },

    { key: "primary", kicker: "Primary research", title: "Three sources, the same four failures.", paras: [
      "I verified the problem by triangulating three independent sources. Semi-structured interviews of 45–60 minutes with 7 immersive filmmaking teams at IIT Jodhpur: 16 people across direction, editing and sound design. A structured evaluation of Premiere Pro, DaVinci Resolve, Final Cut Pro, After Effects, Insta360 Studio, Reaper and Unity against standard criteria. And what I learnt editing the 360° film WHO VR.",
      "Mapping the current workflow showed the real cost: footage sorting in Insta360 Studio, editing in Premiere or Resolve, effects in Photoshop and After Effects, grading, then spatial audio in Reaper. Find an error at the end, and you start again."
    ], quote: "",
      blocks: [
        { type: "pipeline", title: "The current immersive media workflow", idle: "Footage moves left to right, one tool at a time.",
          caption: "30–50% of total production time is spent managing this pipeline.", sub: "Not creating. Managing.",
          stages: [
            { name: "Footage sorting", tools: ["Insta360 Studio"], tasks: ["Resolution, bitrate, format"] },
            { name: "Editing", tools: ["Premiere", "Resolve"], tasks: ["Cut, crop, sequence", "Position and transform", "Speed, stability, reverse"] },
            { name: "Visual effects", tools: ["Photoshop", "After Effects"], tasks: ["Hide equipment, overlays", "Titles and text", "Masks and transitions"] },
            { name: "Colour grading", tools: ["Premiere", "Resolve"], tasks: ["Colour correction"] },
            { name: "Spatial audio", tools: ["Reaper", "Resolve"], tasks: ["Sound mixing, spatial audio"] }
          ] },
        { type: "table", title: "What every professional tool gets wrong about immersive media", hl: -1, cols: ["", "Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "After Effects", "Insta360 Studio", "Reaper"], rows: [
          ["360° native editing", "~", "~", "~", "✕", "✓", "✕"],
          ["Spherical preview mode", "~", "~", "~", "✕", "✓", "✕"],
          ["Spatial continuity tools", "✕", "✕", "✕", "✕", "✕", "✕"],
          ["Native spatial audio", "✕", "~", "✕", "✕", "✕", "✓"],
          ["Visual audio placement", "✕", "✕", "✕", "✕", "✕", "✕"],
          ["In-headset editing", "✕", "✕", "✕", "✕", "✕", "✕"],
          ["Unified pipeline", "~", "~", "~", "✕", "~", "✕"],
          ["Spatial-first design", "✕", "✕", "✕", "✕", "✕", "✕"]
        ], note: "✓ supported · ~ partly · ✕ not at all. No tool combines spatial continuity, scene-linked audio and immersive editing in one professional pipeline. That category did not exist." },
        { type: "causes", title: "Four systemic failures, confirmed across every source", items: [
          { title: "The switching tax", text: "30–50% of production time goes to format conversion, re-imports and switching tools. No creative value. Pure overhead." },
          { title: "The 2D preview problem", text: "Every decision is made on a flat, distorted equirectangular monitor. Scale, pacing and continuity errors stay invisible until the headset review." },
          { title: "Spatial audio disconnection", text: "Audio is designed in a separate DAW with abstract coordinates (azimuth, elevation, distance) and no visual link to the scene. Voice drift is endemic." },
          { title: "No continuity intelligence", text: "No tool detects cuts that will disorient the viewer. Vestibular violations, spatial shifts over 90°, are found after rendering, not while editing." }
        ] }
      ] },

    { key: "framework", kicker: "The response", title: "The Spatial-First Editing Framework. Edit where you consume.", paras: [
      "Six principles, each tracing directly to a validated failure. Every feature in the system exists because a specific problem demanded it."
    ], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "P1 · Spatial calibration first", text: "Calibrate before you cut." },
          { title: "P2 · Gaze-aware continuity", text: "Every cut evaluated spatially." },
          { title: "P3 · Embodied preview", text: "Preview is editing, not an afterthought." },
          { title: "P4 · Object-based audio", text: "Sound is a visual, spatial object." },
          { title: "P5 · Unified pipeline", text: "One environment. Zero switching." },
          { title: "P6 · Universal accessibility", text: "Depth without gatekeeping." }
        ] },
        { type: "flowmap", title: "One complete flow, from launch to final output", caption: "Rebuilt from the user flow. Pick any step to see what it holds.", cols: [
          { title: "Start", nodes: [
            { t: "Launch", kind: "start", d: "The app opens on the home dashboard." },
            { t: "Home dashboard", d: "Recent projects, a new project, open a file, or pick up from the cloud." },
            { t: "Open existing project", d: "Reopens a project file exactly as it was left, on desktop or in the headset." } ] },
          { title: "Set up", nodes: [
            { t: "New project setup", d: "Four short panels before anything is cut, so the project knows it's spatial from the start." },
            { t: "Video settings", d: "Resolution from 4K to 11K, 24 to 120 fps, equirectangular 360°, VR180 or cubemap, mono or stereo (top-bottom, side-by-side), colour space, bit depth and HDR." },
            { t: "Audio settings", d: "Stereo, 5.1 or 7.1, ambisonics (first or higher order) or Atmos; sample rate and bit depth; binaural, HRTF or object renderer." },
            { t: "Timeline settings", d: "Resolution, aspect ratio, frame rate, track structure, snapping and how time is shown." },
            { t: "Spatial calibration", d: "North lock and the global forward direction, horizon levelling, a stabilisation check and a proxy playback test. Calibrate before you cut." } ] },
          { title: "Bring in footage", nodes: [
            { t: "Import media", d: "Local files, storage, a camera or the cloud. Projection, frame rate, codec and gyro data are read automatically." },
            { t: "Stitching for 360° cameras", d: "AI and optical-flow stitching, chromatic and lens calibration, horizon lock, stabilisation and colour matched across lenses. Output equirectangular 2:1 or cubemap." },
            { t: "Accessories", d: "Lens guards, an invisible selfie stick, dive cases above and below water." },
            { t: "Media processing", d: "Colour optimisation, clarity, motion ND and colour restoration, before the clip reaches the timeline." },
            { t: "Audio clean-up", d: "Voice focus, noise reduction and close-mic modes." } ] },
          { title: "The editor", nodes: [
            { t: "Main editor hub", kind: "vr", d: "One project file. Every workspace opens from here, on desktop or in the headset." },
            { t: "Enter VR mode", kind: "vr", d: "A hand-off bridge over local Wi-Fi. Only the changes sync, in real time: edit in the headset and the desktop updates, and back again." },
            { t: "Top bar, always visible", d: "Save state and auto-save, cloud sync, who else is in the project, viewer quality and the VR mode button." },
            { t: "Collaboration", d: "Roles for owner, editor, colourist, audio designer and reviewer, with comments on the timeline." } ] },
          { title: "Workspaces", nodes: [
            { t: "Media", kind: "page", d: "Bins, filters and a metadata inspector; a source monitor with a flat or sphere preview." },
            { t: "Edit", kind: "page", d: "A 360° sphere view with the region-of-interest overlay. The timeline marks every cut as safe, caution or unsafe by how far the viewer must turn, and flags vestibular risks." },
            { t: "Graphics and effects", kind: "page", d: "Standard effects alongside 360°-aware ones: sphere blur, seam blend, pole correction, region grades; titles locked to the world or to the head; masks, tracking, chroma key." },
            { t: "Colour", kind: "page", d: "Waveform, parade, vectorscope and histogram; wheels for lift, gamma and gain; a LUT library, a node editor and HDR grading." },
            { t: "Audio", kind: "page", d: "A mixer and effects chain, plus a top-down spatial map: drag a sound into the scene and pin it to the thing that makes it." },
            { t: "VR headset mode", kind: "vr", d: "The scene as a sphere around you, the timeline as an arc at waist height, the audio console and colour desk within reach, and the asset library behind you." } ] },
          { title: "Out", nodes: [
            { t: "Export", kind: "page", d: "Presets for YouTube VR, VR180, Meta Quest, Apple Vision Pro and Vimeo 360; container, codec and bitrate; 360° metadata injected." },
            { t: "Audio output", d: "Stereo, ambisonics, binaural for headphones or Dolby Atmos, with the final rotation locked to north." },
            { t: "Render queue", d: "Progress, time left and file size for every job." },
            { t: "Final output", kind: "start", d: "Spatially correct immersive content, with platform metadata embedded, ready to publish." } ] }
        ] }
      ] },

    { key: "desktop", kicker: "The desktop environment", title: "Six workspaces. One project file. Zero tool switching.", paras: [
      "Media, Edit, Colour, Audio, Graphics and Effects, and Export, each with its own workspace, all on one project. Precision work that suits a keyboard, mouse and trackpad stays here. Here they are in the order an editor meets them."
    ], quote: "",
      blocks: [
        // One app window: scrolling moves through the workspaces, with the title and notes changing beside it
        { type: "appframe", title: "Six workspaces", app: "Immerse Editor Pro", items: [
          { label: "Start", title: "Pick up where you left off.", text: "The home dashboard opens on recent projects, with Import Media and New Project one click away. A side rail shows the GPU, storage, cloud sync and licence, and which headset, 360° camera and microphone are connected.",
            img: "assets/img/projects/immerse-editor-pro/home.webp" },
          { label: "Media", title: "Every clip, with the metadata 360° needs.", text: "Bins for 360° footage, audio, effects and AI assets, a pool of clips to search, a source monitor, and a metadata inspector showing projection, resolution, frame rate, codec, proxy, colour space, bit depth and audio channels before a clip reaches the timeline.",
            img: "assets/img/projects/immerse-editor-pro/media.webp" },
          { label: "Edit", title: "Edit the experience.", text: "Source and playback monitors sit side by side, in flat, 360° sphere or split view, over a timeline coloured by track: video, graphics and spatial audio. A modular inspector puts stabilisation, orientation, speed, crop and metadata in dedicated panels, so immersive footage is handled directly.",
            img: "assets/img/projects/immerse-editor-pro/edit.webp", panels: { src: "assets/img/projects/immerse-editor-pro/edit-panels.webp", caption: "The inspector's six tabs: transform, 360° orientation, speed, crop and reframe to flat, stabilisation, and clip info" } },
          { label: "Spatial continuity", title: "Every cut, evaluated spatially. In real time.", text: "The ROI alignment system compares where the viewer is looking as one clip ends with where the next clip's region of interest begins. 0–30° is safe to cut, 30–90° needs a review, and over 90° is a vestibular violation to fix before rendering. Auto Align fixes a cut in one click; Jump Cut Analysis scans the whole timeline for a risk report.",
            img: "assets/img/projects/immerse-editor-pro/roi.webp" },
          { label: "Colour", title: "Grade the sphere, not the frame.", text: "Every correction is aware of spherical geometry, accounting for pole distortion and stitching seams instead of the flat equirectangular frame: lift, gamma, gain and offset wheels, per-channel curves, VR-optimised LUTs, HSL secondaries and a non-destructive node pipeline.",
            img: "assets/img/projects/immerse-editor-pro/colour.webp", panels: { src: "assets/img/projects/immerse-editor-pro/colour-panels.webp", caption: "Wheels, curves, LUTs and nodes" } },
          { label: "Audio", title: "Listener-centric spatial audio.", text: "Drag. Place. Hear it immediately. Every sound is a point on a top-down map around the listener, not an azimuth typed into a box. Pick one and the spatial inspector shows its ambisonic order, 3D position, falloff, and world-locked, head-locked, Doppler and auto-correct behaviours. No estimation. No voice drift.",
            states: [ { label: "Ambisonics", img: "assets/img/projects/immerse-editor-pro/audio.webp" }, { label: "Wind SFX", img: "assets/img/projects/immerse-editor-pro/audio-wind.webp" }, { label: "Narration", img: "assets/img/projects/immerse-editor-pro/audio-narration.webp" } ] },
          { label: "Graphics and effects", title: "Titles that live inside the scene.", text: "Text and graphics are authored directly in 360° space, positioned by yaw, pitch and distance rather than x and y, with video and audio effects, transitions like dip to black, film burn and spatial warp, and title animations.",
            img: "assets/img/projects/immerse-editor-pro/graphics.webp", panels: { src: "assets/img/projects/immerse-editor-pro/graphics-panels.webp", caption: "Title, effects, transitions and graphics" } },
          { label: "Export", title: "One click. Ready to publish.", text: "Platform presets fill in codec, resolution, bitrate and spatial metadata for Meta Quest 3, Apple Vision Pro, YouTube VR 360°, Meta Horizon, Instagram 360°, TikTok and cinema DCP. 360° metadata is embedded on the way out, and a render queue tracks every export.",
            img: "assets/img/projects/immerse-editor-pro/export.webp" }
        ] },
        // Try it: the same thresholds the ROI alignment system uses
        { type: "roi", title: "Try the ROI check", text: "Drag the next shot's region of interest around the viewer, the way a cut lands in a headset. Under 30° the cut is safe, 30–90° needs a review, and over 90° is a vestibular violation. Auto Align turns the next clip so the two line up." }
      ] },

    { key: "vr", kicker: "The VR editing environment", title: "Edit inside the experience.", paras: [
      "In the headset, the 360° footage becomes the studio. Decisions about framing, continuity and audio are made inside the experience, not beside it. There are no controllers: it's hand-tracked from the moment you enter, and it syncs with the desktop in real time."
    ], quote: "",
      blocks: [
        { type: "holo", title: "Inside the headset", items: [ { src: "assets/img/projects/immerse-editor-pro/vr-grade.webp", caption: "Grade where it lives: the timeline, the media and the console float in front of you, inside the footage" },
          { src: "assets/img/projects/immerse-editor-pro/vr-audio.webp", caption: "Hear it move: grab a sound and drag it into the scene. Crowd noise sits up the street, the river off to the right, and the music stays head-locked" } ] },
        { type: "screens", items: [
          { label: "The VR console", title: "Precision. In virtual space.", text: "A virtual control surface modelled on the hardware editors already use: colour analysis on the display, EQ and faders for music, dialogue, effects, atmos and the mix, a jog wheel and transport, lift, gamma and gain trackballs, and function keys. It brings tactile precision into a space with nothing to touch.",
            img: "assets/img/projects/immerse-editor-pro/console.webp", plain: true }
        ] },
        { type: "causes", title: "Every task performed with the right input", items: [
          { title: "Keyboard and mouse (desktop)", text: "Frame-accurate trimming, numeric parameters, effect settings, timeline editing, precise grading and export settings." },
          { title: "Trackpad gestures (desktop)", text: "Timeline zoom, panning the 360° viewer, clip scrubbing, context menus and pinch zoom on the sphere preview." },
          { title: "Hand tracking (VR)", text: "Placing audio nodes, 3D reframing, scrubbing, the console and colour wheels. Pinch to select, grab to drag, two hands to zoom, wrist up for the menu." },
          { title: "Eye tracking (Apple Vision Pro)", text: "Gaze pre-selects interface elements, pinch confirms, and foveated rendering and attention analytics come along with it." }
        ] }
      ] },

    { key: "validation", kicker: "Concept validation", title: "Three practitioners. One direction confirmed.", paras: [
      "Three practitioners with different levels of editing experience went through guided walkthroughs of both the desktop and the VR environments."
    ], quote: "",
      blocks: [
        { type: "voices", items: [
          { text: "The problem this is solving is real. Every time I've tried to edit 360° content, I've had exactly the frustrations described.", who: "Beginner, low editing experience · overall 7/10" },
          { text: "The fact that I never had to leave the application — that was the biggest thing. I kept waiting for the moment I'd need to open Reaper. It never came.", who: "Intermediate, mid editing experience · overall 8/10" },
          { text: "This is what I've wanted for years. The tactile console layout — especially the colour grading zone — maps directly to hardware I already use.", who: "Advanced, professional · overall 9/10" },
          { text: "It doesn't try to replace how professionals work. It extends it into spatial context. That's the right call.", who: "Advanced, professional" }
        ] },
        { type: "causes", items: [
          { title: "What was confirmed", text: "The problem space. The unified pipeline. The spatial audio interaction model. The hybrid desktop and VR architecture." },
          { title: "What needs refinement", text: "VR onboarding, clearer affordances for the console gestures, and the visual organisation of the desktop UI." },
          { title: "Key insight", text: "Desktop precision and VR spatial interaction are complementary, not competing. Neither replaces the other. A spatial-first hybrid system is both necessary and desirable." }
        ] }
      ] },

    { key: "contribution", kicker: "Contribution", title: "An unoccupied product category.", paras: [], quote: "",
      blocks: [
        { type: "table", hl: 7, cols: ["", "Premiere", "DaVinci", "FCP", "After Effects", "Insta360", "Reaper", "Immerse Pro"], rows: [
          ["Native 360° sphere preview", "✕", "✕", "✕", "✕", "✕", "✕", "✓"],
          ["ROI alignment system", "✕", "✕", "✕", "✕", "✕", "✕", "✓"],
          ["Visual 3D audio placement", "✕", "✕", "✕", "✕", "✕", "✕", "✓"],
          ["Object-based audio tracking", "✕", "✕", "✕", "✕", "✕", "✕", "✓"],
          ["In-headset editing mode", "✕", "✕", "✕", "✕", "✕", "✕", "✓"],
          ["Physical tactile VR console", "✕", "✕", "✕", "✕", "✕", "✕", "✓"],
          ["Unified pipeline", "✕", "~", "✕", "✕", "✕", "✕", "✓"],
          ["Spatial-first from the ground up", "✕", "✕", "✕", "✕", "✕", "✕", "✓"]
        ] },
        { type: "causes", title: "Three contributions", items: [
          { title: "01 · A design framework", text: "The Spatial-First Editing Framework: six empirically grounded principles from triangulated research, each tracing to a validated failure. 6 principles, 6 workflow stages." },
          { title: "02 · A system design", text: "Immerse Editor Pro, designed across desktop and VR, with every principle turned into a feature: Media, Edit, Colour, Audio, Graphics and Effects, Export, and a full headset workspace. 16 screens, two platforms." },
          { title: "03 · A new paradigm", text: "Listener-centric spatial audio: a production tool built around a reference frame that moves. It applies beyond 360° video to all immersive media with a moving listener." }
        ] }
      ] },

    { key: "next", kicker: "Where this goes next", title: "The road ahead is spatial.", paras: [
      "Five research directions extend the framework beyond its current scope."
    ], quote: "", image: { src: "assets/img/projects/immerse-editor-pro/road-ahead.webp", caption: "Concepts for spatial editing, smart glasses and collaborative production" },
      blocks: [
        { type: "causes", items: [
          { title: "Advanced spatial editing", text: "Volumetric video, NeRFs, Gaussian splats and depth-aware transitions: editing moves from a spherical surface to true 3D geometry." },
          { title: "AI-assisted spatial authoring", text: "Gaze prediction, automatic ROI alignment and spatial audio keyframes, built into the editing workflow." },
          { title: "Smart-glass adaptation", text: "180° video on AR glasses: lightweight, everyday immersive production." },
          { title: "Real-time collaboration", text: "Director, sound designer and colourist editing in the same scene at once, in one virtual studio." },
          { title: "Neuroadaptive production", text: "Biometric feedback, personalised HRTFs and discomfort detection informing the edit." }
        ] }
      ] }
  ],
  finale: { title: "To build that future, creation itself must become immersive, intuitive and spatial-first", text: "M.Des thesis, XR Design, IIT Jodhpur, April 2026, supervised by Dr Pranjal Protim Borah. The research became the paper “From 2D Timelines to Immersive Spaces”, conditionally accepted at ICoRD 2027." }
};
