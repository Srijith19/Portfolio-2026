/* Case study: reven-vr. Section blocks: text, images, chips, causes, voices,
   insights, hmw, scamper, stats, table, split, credits. See README.md. */
SITE.caseStudies["reven-vr"] = {
  style: "level",              // sections open like a game's chapter cards
  tone: "night",
  headline: "Peace was never meant for men like him.",
  subhead: "A hand-tracked VR action game: katana and axe combat, cinematic cutscenes, and an amusement park taken over by the mafia.",
  tldr: [
    { label: "Problem", text: "Most VR games focus on slow puzzles or casual interaction. Raw, adrenaline-fuelled action is still rare in VR." },
    { label: "Approach", text: "A story-led level in an eerie amusement park, melee weapons held with hand tracking, enemies that surround the player, and haptics tied to every hit." },
    { label: "Outcome", text: "Chapter 1: a playable level with a cinematic trailer and a gameplay glimpse." }
  ],
  highlights: [
    "Katana and axe, held with your own hands. No controllers.",
    "Enemies circle you and attack in waves.",
    "A “No weapons allowed” sign at the gate hints at what's inside.",
    "The final fight is on a rooftop above the city."
  ],
  sections: [
    { key: "overview-r", kicker: "Overview", title: "Make the player feel powerful.", paras: [
      "Reven VR is designed with one clear purpose: a raw, adrenaline-fuelled action experience in VR. Many titles focus on slow puzzles or casual interaction; this one puts the player in the middle of intense, cinematic combat, with hand-tracked melee weapons like a katana and an axe.",
      "It's set in a story-rich, eerie amusement park overrun by a mafia gang, with fast encounters, rides to interact with, and explosive moments of violence and revenge. It doesn't aim to be subtle. It aims to make the player feel powerful, reactive and fully immersed in a world where every move and every strike matters."
    ], quote: "" },

    { key: "narrative", kicker: "Narrative", title: "The night his girlfriend was taken.", paras: [
      "Raven lived a quiet life, hiding his past as a deadly assassin. The night his girlfriend was taken, the shadows of his old self woke up. In a dim alley, two bald men smirked before dragging her away. Across the city, Raven answered a call. He listened in silence, eyes closed. Then they snapped open, burning red.",
      "The mafia had no idea who they had crossed. He moved like a ghost through the city to the abandoned amusement park where they held her. The neon entrance flickered. The place was empty, but it reeked of danger. In the grand circus hall, the first wave fell before they could react. Deeper in, past the shattered remains of a carousel, he reached the final battleground: the Ferris wheel rooftop.",
      "The boss stood waiting, confident. Confidence meant nothing against Raven's precision. With one final strike the boss fell. As Raven walked away, one truth remained: peace was never meant for men like him."
    ], quote: "",
      blocks: [
        { type: "images", items: [ { src: "assets/img/projects/reven-vr/storyboard.webp", caption: "Storyboard of the story's key beats" } ] },
        { type: "images", items: [ { src: "assets/img/projects/reven-vr/previz.webp", caption: "Pre-visualisation of the cutscenes. These images illustrate moments in the story; they are not in-game graphics." } ] }
      ] },

    { key: "environment", kicker: "Environment design", title: "An amusement park in the mafia's grip.", paras: [
      "The entrance plaza, dimly lit by flickering tungsten lights, looks normal at first, with food stalls and ticket booths intact, but the “No weapons allowed” sign on the gate hints at the violence inside. Further in, the midway is lined with game booths and carnival music, and the eerie silence makes the joy feel artificial.",
      "The circus tent, once full of cheers, is now a combat arena: flickering spotlights throw shadows over empty seats as henchmen rise out of the dark. The roller-coaster tracks still run and become high-speed battlegrounds where enemies shoot from above. The final confrontation is on an unstable rooftop high above the glowing city."
    ], quote: "",
      blocks: [
        { type: "holo", title: "The park", items: [
          { src: "assets/img/projects/reven-vr/env-map.webp", caption: "The park's layout" },
          { src: "assets/img/projects/reven-vr/gate.webp", caption: "The entrance gate" },
          { src: "assets/img/projects/reven-vr/park.webp", caption: "The plaza, held by the mafia" },
          { src: "assets/img/projects/reven-vr/park-wide.webp", caption: "Circus tents, rides and stalls" }
        ] }
      ] },

    { key: "ui", kicker: "Game UI", title: "A menu that stays in the dark.", paras: [
      "The start menu and the controls screen stay dark and red, like the rest of the game, so the player is in the world from the first screen."
    ], quote: "", image: { src: "assets/img/projects/reven-vr/ui.webp", caption: "Start menu, and the controls: push back, move, summon the axe, jump, rotate the camera, summon the katana" } },

    { key: "dynamics", kicker: "Game dynamics", title: "Explore, then fight.", paras: [
      "The park is dark and full of broken rides, abandoned stalls and blood trails that tell the story through the environment. The player moves through combat encounters and cutscenes that reveal the plot, with lighting and fog giving it a horror-action feel.",
      "Enemies spot the player from a distance and charge. At close range they throw a flying punch before moving into combos. Their AI surrounds the player, which makes fights more intense. The player's health bar drops with each hit; enemies have health too, and die with a proper animation. Different weapons deal different damage, and haptics follow the intensity of each attack."
    ], quote: "", image: { src: "assets/img/projects/reven-vr/dynamics.webp", caption: "Enemies charge, surround and close in" } },

    { key: "mechanics", show: [
        { type: "video", title: "Gameplay", file: "gameplay.mp4", caption: "Gameplay footage to come: a short muted loop goes in assets/video/." }
      ],
      kicker: "Game mechanics", title: "Street-fight combat, in your hands.", paras: [
      "The player wields a katana and an axe with VR hand tracking instead of controllers. The A and X buttons summon or dismiss weapons, and weapons can switch between hands at any time.",
      "Combat is fast and cinematic, inspired by street fights. Enemies attack in waves with punches and uppercuts. Each weapon has its own power, heavier strikes do more damage, and the controllers vibrate whenever the player takes or deals damage."
    ], quote: "", image: { src: "assets/img/projects/reven-vr/mechanics.webp", caption: "Katana and axe in hand" } }
  ]
};
