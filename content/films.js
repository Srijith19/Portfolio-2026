/* ==========================================================================
   content/films.js — the Films page: the Rajasthan series, trailers,
   coursework and other films. A video's link: id (YouTube id) or q (search
   on the channel). Thumbnails live in assets/img/films/.
   ========================================================================== */
SITE.films = {
  // The outline of Rajasthan behind the route map: DataMeet state boundaries, simplified. Leave as is.
  map: { W: 600, H: 550, pad: 28, lon0: 69.4844, lat1: 30.1964, k: 0.894154, sx: 69.243,
    path: "M301.3 43.1L340.3 45.5L339.4 48.0L342.4 50.9L337.0 56.3L337.4 59.4L345.6 58.8L343.2 71.9L346.2 74.4L344.0 79.2L340.9 79.8L345.0 88.2L347.9 88.0L348.4 85.1L355.0 86.3L360.2 83.0L365.5 85.7L367.1 91.5L372.5 91.1L374.9 94.9L381.2 92.4L383.9 94.8L389.8 90.7L389.6 94.7L394.6 92.9L394.9 98.0L392.4 101.2L397.0 109.9L401.7 110.3L399.0 116.2L404.4 137.8L408.3 138.6L409.0 142.5L418.2 148.7L417.7 152.1L427.1 154.8L437.7 169.6L433.6 168.4L427.9 173.9L430.9 176.9L434.1 175.3L430.0 178.2L429.6 184.8L427.2 185.0L430.5 186.7L429.6 189.8L437.3 189.5L442.6 193.7L445.7 191.4L441.5 180.5L445.1 178.2L442.9 176.3L448.3 175.7L452.8 178.4L453.9 175.3L450.3 173.4L453.9 171.5L449.8 167.8L455.3 170.9L461.1 169.7L462.8 173.0L459.7 174.0L462.7 175.9L460.0 177.0L465.3 177.7L465.2 182.5L472.8 179.1L472.3 173.7L481.0 169.6L481.9 165.5L487.7 166.3L491.5 170.5L486.7 199.1L487.8 204.1L492.0 204.2L493.4 198.3L498.8 198.6L495.1 195.8L496.2 192.9L501.7 195.9L505.9 192.8L508.2 195.3L512.2 194.3L515.1 204.2L513.1 207.4L515.5 208.6L514.6 213.0L520.4 217.7L520.6 222.1L529.4 227.1L531.9 226.0L530.5 228.9L535.5 235.9L524.7 243.1L532.7 248.7L535.5 246.2L537.4 249.7L540.6 248.2L520.0 258.9L521.5 267.3L524.3 265.9L524.6 260.2L531.2 261.3L540.5 254.0L548.9 257.4L549.6 255.0L556.2 255.9L557.1 259.4L558.4 255.6L562.0 256.3L562.9 252.9L572.0 254.6L567.6 257.4L569.0 260.2L565.7 261.7L566.9 264.0L561.9 263.8L561.0 271.7L555.3 270.3L549.2 273.1L544.1 280.5L526.1 290.2L520.2 290.8L520.8 293.5L514.5 294.2L506.3 302.5L501.4 302.5L486.8 312.5L477.9 325.2L468.4 327.6L464.5 332.9L464.6 337.3L461.6 338.4L466.7 357.5L479.4 366.5L487.0 365.8L490.0 369.1L498.3 364.6L506.4 366.6L511.2 358.8L516.1 359.6L514.5 365.6L516.7 366.0L515.3 369.4L519.6 374.8L517.9 375.1L518.4 380.3L512.4 382.4L509.9 379.9L504.2 380.3L500.7 383.4L493.3 382.6L484.6 387.4L490.5 397.0L481.3 400.6L484.2 405.4L490.6 404.4L495.3 408.2L497.6 417.9L491.5 425.5L488.3 423.6L488.2 419.7L482.1 420.4L484.4 424.9L483.7 433.9L490.1 443.1L487.4 448.3L481.3 449.0L478.4 445.4L475.1 445.5L473.4 444.0L474.6 437.6L468.0 440.1L467.5 444.9L464.5 446.0L460.7 441.3L457.3 443.0L451.9 439.8L444.9 442.3L443.1 434.4L439.1 443.7L439.9 450.7L429.1 455.6L430.1 462.0L417.7 467.4L414.9 464.1L412.8 465.8L414.7 467.1L412.0 473.9L409.9 471.0L405.6 471.1L397.9 461.6L401.4 453.9L405.7 457.9L411.0 455.0L413.0 459.5L421.3 452.1L421.4 449.6L415.7 447.7L417.5 442.0L420.8 440.3L414.6 429.3L418.6 424.4L422.1 428.3L425.9 425.8L426.5 417.8L420.9 414.9L421.6 406.8L416.7 404.4L407.6 409.7L405.7 407.3L397.6 409.3L383.0 407.3L381.1 404.1L385.2 399.3L382.5 394.3L388.6 401.0L395.5 397.5L395.9 395.5L385.8 395.7L387.8 393.4L386.7 389.7L389.1 395.0L391.0 385.1L379.5 384.9L377.0 395.7L372.3 397.8L366.2 396.5L359.2 390.3L360.2 402.4L370.9 403.8L369.6 408.2L362.9 411.9L357.1 402.2L355.6 409.7L358.2 410.8L351.7 421.9L360.8 424.9L354.2 437.7L363.0 439.2L362.2 442.5L369.1 455.2L363.7 466.0L365.8 482.9L345.5 494.5L339.6 503.7L341.8 506.9L350.9 507.6L350.5 511.0L353.7 511.8L348.9 512.5L339.2 520.3L331.7 518.7L327.4 522.1L322.7 513.4L318.7 515.9L315.3 514.1L315.7 507.8L310.2 505.9L305.6 500.3L300.8 503.1L297.0 495.5L292.8 494.7L290.4 497.8L289.0 494.8L284.6 495.1L286.4 483.3L281.2 481.0L277.2 483.7L276.9 477.7L267.9 471.8L267.8 466.7L271.7 461.9L268.6 448.2L260.6 456.4L257.7 453.5L259.3 450.3L250.5 444.3L254.4 435.8L259.8 431.8L256.0 432.8L250.7 429.8L251.3 422.8L245.4 424.5L243.1 430.5L244.9 431.9L240.7 434.5L237.2 431.7L228.8 432.0L226.6 425.3L217.2 421.9L214.9 428.6L212.2 428.8L210.8 422.0L198.9 416.7L205.3 414.1L193.6 414.4L186.6 408.0L179.9 413.5L175.7 410.1L174.6 415.0L170.9 410.4L162.3 412.9L159.5 410.3L151.6 410.1L145.0 413.7L143.0 411.5L139.7 414.6L128.6 410.4L117.9 391.9L114.8 377.3L101.1 360.3L100.7 338.9L84.1 341.2L77.0 338.7L66.1 323.0L65.3 312.5L70.7 301.8L70.7 280.4L63.9 277.0L47.8 277.2L29.9 267.2L28.1 263.2L29.9 248.4L34.5 236.7L61.5 210.5L68.3 193.4L82.9 179.3L90.7 177.6L96.6 179.4L101.8 185.4L106.0 197.9L114.6 200.3L138.7 190.5L162.6 188.7L177.5 182.6L179.7 170.9L196.5 153.1L202.5 133.5L207.8 126.9L242.4 108.7L262.9 72.1L270.4 45.7L295.0 36.9L306.1 28.0L301.3 43.1Z" },
  channel: "https://www.youtube.com/@srijithdraj",
  headline: "Exploring and capturing my point of view.",   // from the old Videos page
  series: { number: "01", title: "Rajasthan" },
  // Short muted clips for the DVD menu background and the reel (assets/video/*.mp4). Photos are used until clips arrive.
  reel: [],
  // Course summary videos from coursework at the School of Design, IIT Jodhpur. They live on another channel,
  // so they link to a YouTube search (`search`) until an `id` is added.
  coursework: [
    { title: "Design Thinking Module", where: "School of Design, IIT Jodhpur", runtime: "2:35", search: "Design Thinking Module at School of Design, IIT Jodhpur", thumb: "assets/img/films/course/design-thinking.webp" },
    { title: "Typography for Digital Media", where: "School of Design, IIT Jodhpur", runtime: "2:27", search: "Typography for Digital Media School of Design IIT Jodhpur", thumb: "assets/img/films/course/typography.webp" },
    { title: "Elements and Principles of Design", where: "School of Design, IIT Jodhpur", runtime: "1:57", search: "Elements and Principles of Design at School of Design, IIT Jodhpur", thumb: "assets/img/films/course/elements-principles.webp" },
    { title: "History of Art, Media and Design", where: "Batch of 2026 · School of Design, IIT Jodhpur", runtime: "1:55", search: "History of Art, Media & Design Batch of 2026 School of Design IIT Jodhpur", thumb: "assets/img/films/course/history-art.webp" }
  ],
  // Places I'm planning to film next: { name, region }
  planned: [],
  intro: "I travel, and I document the places I go. It started with Rajasthan.",
  // The opening of the Films page: what's here, over photos from the road. Photos live in assets/img/films/road/.
  road: {
    title: "Films from the road.",
    text: "I carry a camera wherever I go. This is where the films end up: a series on the towns of Rajasthan, trailers for the games and VR worlds I've built, films for courses, and a few made for friends.",
    what: [ ["The road", "A series on Rajasthan, town by town"], ["Trailers", "For my games and VR worlds"], ["Coursework", "Films for courses at IIT Jodhpur"], ["Other films", "Ads, farewells and stop motion"] ],
    cols: [
      [ ["hawa-mahal", "Jaipur"], ["pushkar-wheel", "Pushkar"], ["dunes", "Jaisalmer"], ["udaipur-palace", "Udaipur"], ["camel-art", "Bikaner"], ["haveli", "Jaisalmer"] ],
      [ ["road-bike", "On the road"], ["jal-mahal", "Jaipur"], ["mehrangarh", "Jodhpur"], ["pushkar-fair", "Pushkar"], ["ripples", "Thar"], ["musicians", "Amer"] ],
      [ ["jodhpur-rooftop", "Jodhpur"], ["pushkar-camels", "Pushkar"], ["amer", "Amer"], ["dunes-bw", "Jaisalmer"], ["pushkar-ropeway", "Pushkar"], ["bulls", "Bikaner"], ["silhouettes", "Pushkar"] ]
    ]
  },
  // The Rajasthan series, in the order the films were made. status: "Documented", "In progress" or "Planned".
  // `film` is the YouTube video id. `clip` (optional) is a short muted .mp4 for the DVD player.
  places: [
    { name: "Jodhpur", label: "bl", alt: "Blue City Walk", region: "Rajasthan", lat: 26.2389, lon: 73.0243, status: "Documented", year: "2024", runtime: "2:13", music: "Kiliye Kiliye × Guts Come Closer", film: "kumQdkRYM2M", thumb: "assets/img/films/jodhpur.webp" },
    { name: "Jaisalmer", region: "Rajasthan", lat: 26.9157, lon: 70.9083, status: "Documented", year: "2024", runtime: "4:04", music: "Maahi Ve · A. R. Rahman", film: "TuWl2qaHh0I", thumb: "assets/img/films/jaisalmer.webp" },
    { name: "Udaipur", label: "l", region: "Rajasthan", lat: 24.5854, lon: 73.7125, status: "Documented", year: "2024", runtime: "4:16", music: "Sapta Sagaradaache Ello, title track", film: "PFlQ_61DNt8", thumb: "assets/img/films/udaipur.webp" },
    { name: "Pushkar", label: "br", region: "Rajasthan", lat: 26.4897, lon: 74.5511, status: "Documented", year: "2025", runtime: "5:52", music: "The Child In Us · Enigma", film: "Y5cTmSEFSZQ", thumb: "assets/img/films/pushkar.webp" },
    { name: "Jaipur", region: "Rajasthan", lat: 26.9124, lon: 75.7873, status: "In progress", year: "", film: "", thumb: "assets/img/films/jaipur.webp" }
  ],
  // Videos without a known id link to a search on the channel (`q`). Add `id` when you have the link.
  trailers: [
    { title: "Reven VR", kind: "Trailer · VR game concept", year: "2025", runtime: "0:57", project: "reven-vr", q: "RevenVR Trailer", thumb: "assets/img/films/reven-trailer.webp" },
    { title: "WHO VR", kind: "Teaser · VR 360° short film", year: "2025", runtime: "0:40", project: "who-vr", q: "WhoVR Teaser", thumb: "assets/img/films/whovr-teaser.webp" },
    { title: "Akai Tsuki no Miyako", kind: "Cinematic trailer · Environment design", year: "", runtime: "0:46", project: "akai-tsuki", q: "AkaiTsukinoMiyako Cinematic Trailer", thumb: "assets/img/films/akai-trailer.webp" },
    { title: "Akai Tsuki no Miyako", kind: "Environment walkthrough", year: "", runtime: "3:42", project: "akai-tsuki", q: "Akai Tsuki no Miyako Walkthrough", thumb: "assets/img/films/akai-walkthrough.webp" }
  ],
  extra: [
    { title: "Batch of '26 Farewell Film", kind: "School of Design, IIT Jodhpur", year: "2026", runtime: "2:06", music: "Like a Prayer", q: "Batch of '26 Farewell Film", thumb: "assets/img/films/farewell-26.webp" },
    { title: "Memories", kind: "Stop motion · School of Design, IIT Jodhpur", year: "2024", runtime: "1:02", q: "Memories Stop Motion", thumb: "assets/img/films/memories.webp" },
    { title: "Kaalaiyan Goli Soda", kind: "Advertisement", year: "2023", runtime: "1:55", id: "qJSn8M9nNeE", thumb: "assets/img/films/goli-soda.webp" }
  ],
};
