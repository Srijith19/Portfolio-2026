/* Case study: atelier-xr. Section blocks: text, images, screens, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md.
   DRAFT: written from the brief while the screens are being made. Swap in the real
   research, decisions and screens as they're ready. A screen with img: "" shows a
   "Screen to come" slot; give it a path when the image is in assets/img/projects/atelier-xr/. */
SITE.caseStudies["atelier-xr"] = {
  headline: "Imagine, visualise, transform.",
  subhead: "A mixed-reality home-textile studio for personalised visualisation and design exploration: try curtains and linens in your own room before you buy.",
  tldr: [
    { label: "Problem", text: "Home textiles are chosen from swatches and photos, but colour, drape and scale only make sense in the room they're for." },
    { label: "Approach", text: "A mixed-reality studio that places curtains and linens in your own space, at true scale and in your own light, so you can explore designs where they'll live." },
    { label: "Status", text: "In progress. Screens and a prototype are being made now; this page fills in as they're ready." }
  ],
  highlights: [],
  sections: [
    { key: "problem", show: [
        { type: "words", text: "The decision that matters is how a fabric looks *in the room it's for*. That part is left to imagination." }
      ],
      kicker: "The problem", nav: "Problem", title: "Chosen flat. Lived with in the room.", paras: [
      "Curtains, bedspreads and cushions are picked from a small swatch, a catalogue photo or a product page. The decision that matters, how a fabric looks across a whole window, in the evening light of one particular room, next to everything else in it, is left to imagination.",
      "That gap is where the doubt comes from: will this colour hold up, is the pattern too loud at full size, does it go with the sofa? Atelier XR closes it by bringing the fabric into the room instead of asking people to picture it."
    ], quote: "" },

    { key: "concept", kicker: "The concept", nav: "Concept", title: "Three moves: imagine, visualise, transform.", paras: [
      "The studio is built around the three verbs in its name. Each one is a mode you move through, and you can step back to any of them at any time."
    ], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "Imagine", text: "Explore designs: browse fabrics, change colourways and patterns, and make a version that's yours." },
          { title: "Visualise", text: "See it in place: the textile is hung, draped or spread in your own room, at true scale, in mixed reality." },
          { title: "Transform", text: "Decide with confidence: compare options side by side, keep the look you like and take it forward." }
        ] }
      ] },

    { key: "flow", kicker: "The experience", nav: "Experience", title: "From a bare window to a finished room.", paras: [
      "The flow below is the backbone of the prototype. Screens are being designed now and appear here as they're finished."
    ], quote: "",
      blocks: [
        { type: "holo", title: "The flow, in the headset", items: [
          { label: "Scan: map the room", text: "The headset's passthrough view finds the surfaces that matter: windows, beds, sofas and walls.", src: "assets/img/projects/atelier-xr/flow-1.webp" },
          { label: "Imagine: pick a fabric", text: "Browse a library of textiles and adjust colourway, pattern scale and finish.", src: "assets/img/projects/atelier-xr/flow-2.webp" },
          { label: "Visualise: hang it where it goes", text: "Curtains on the window or a spread on the bed, at true size, and watch the fabric fall.", src: "assets/img/projects/atelier-xr/flow-3.webp" },
          { label: "Compare: two options, one room", text: "Switch between looks in place, and check them in daylight and at night.", src: "assets/img/projects/atelier-xr/flow-4.webp" },
          { label: "Transform: keep the look", text: "Save the room as you styled it, share it, and take the choice forward.", src: "assets/img/projects/atelier-xr/flow-5.webp" }
        ] }
      ] },

    { key: "principles", kicker: "Interaction design", nav: "Principles", title: "The room stays in charge.", paras: [
      "Mixed reality only helps if it keeps you anchored in the real space. These principles shape every screen."
    ], quote: "",
      blocks: [
        { type: "causes", items: [
          { title: "True scale", text: "A curtain is shown at the size it will be, on the window it's for, never as a floating thumbnail." },
          { title: "Your own light", text: "The fabric is judged in the room's own lighting, because that's where colour decisions go wrong." },
          { title: "Hands first", text: "Grab, stretch and swap fabrics directly; panels hold only what hands can't do." },
          { title: "Nothing hides the room", text: "Interfaces stay small and to the side, so the space you're designing is always the main view." }
        ] }
      ] },

    { key: "next", kicker: "Where it is", nav: "Status", title: "Being built now.", paras: [
      "Atelier XR is in progress. Next come the screens for each step, a working mixed-reality prototype, and tests with people choosing textiles for their own rooms."
    ], quote: "" }
  ]
};
