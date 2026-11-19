# srijithdraj.com

Srijith D Raj's portfolio as plain files. There's no framework, build step or server, so it costs nothing beyond the domain.

## How it fits together

```
srijithdraj-site/
├── index.html                  the page shell: loads the files below, in order
├── content/                    EVERYTHING THE SITE SAYS (edit these)
│   ├── site.js                 you: name, links, bio, facts, résumé, home-page picks
│   ├── projects.js             the list of projects, one object each
│   ├── entries.js              short text for "Entry" projects
│   ├── films.js                the Films page: series, trailers, coursework
│   ├── showcase.js             the presentation on each short (Entry and Glimpse) project page
│   └── case-studies/
│       ├── texgenie.js         one file per long case study
│       └── …
├── assets/
│   ├── img/
│   │   ├── projects/<id>/      one folder of images per project
│   │   ├── films/              film thumbnails
│   │   ├── people/             your portrait and the orbit cut-out
│   │   └── favicon.svg
│   ├── video/                  short muted loops for the home page (create when needed)
│   ├── files/                  résumé PDF (create when needed)
│   ├── css/site.css            the design system: colours, type, spacing, motion
│   └── js/
│       ├── app.js              the engine: pages, routing, the DVD player, the ask box
│       └── vendor/lenis.min.js smooth scrolling (MIT licence alongside)
└── README.md
```

You change what the site says in `content/` and the pictures in `assets/img/`. You should rarely need to open `app.js` or `site.css`.

## Everyday edits

| To change | Edit |
| --- | --- |
| Your bio, links, email, "currently at" | `content/site.js` → `owner` |
| The three UX projects on the home page | `content/site.js` → `uxFeatured` |
| The home tabs (UX, XR, Graphics and Games), their videos and their own pages | `content/site.js` → `areas` |
| A live Figma prototype on a project | `content/projects.js` → `figma` on that project |
| The words circling the orbit | `content/site.js` → `orbit` |
| Résumé page | `content/site.js` → `resume` |
| A project's title, year, summary, cover | `content/projects.js` |
| A case study's text and images | `content/case-studies/<id>.js` |
| A film or its YouTube link | `content/films.js` |
| The keycaps in "say hello" and their handwritten notes | `content/site.js` → `contactKeys` (links come from `owner.links`) |

Fields left as `""` are hidden on the site, so you can fill things in as you go.

## Adding a project

1. Copy an object in `content/projects.js` and give it a new `id`. Use lowercase with hyphens, for example `atelier-xr`.
2. Make a folder `assets/img/projects/<id>/` and put `cover.webp` in it, plus any other images.
3. Set `depth`:
   - `"Glimpse"` shows one image and a line.
   - `"Entry"` adds paragraphs from `content/entries.js` under the same id.
   - `"Case study"` reads its long page from `content/case-studies/<id>.js`. Copy an existing file, change the id on its third line, and add a `<script>` line for it in `index.html`.

Project numbers (SDR/26/01) are given automatically from the year.

## Images

- Export as `.webp` or `.jpg`: about 2400 px wide for heroes and covers, 1600 px for figures. Keep each under 500 KB if you can.
- `cover` is the card image, `hero` is the big one at the top of the page, and `gallery` holds the rest: `{ src, caption }`.
- Covers are cropped into squares. Use `focus` (for example `"20% 50%"`) to choose which part stays.
- Any image you haven't added yet shows a designed placeholder.

## Case study blocks

A case study is `sections`, each with a `kicker`, `title`, `paras` and optional `image`, `blocks` and `nav` (a shorter label for the section bar). These are the block types:

| Type | Shows |
| --- | --- |
| `text` | A sub-heading and paragraphs |
| `images` | 1–4 images in a row; add `layout: "masonry"` for a photo wall, `layout: "phones"` for app screens four across, or `zoom` on an image for an "Open full size" link |
| `split` | Image beside text, alternating sides |
| `causes` | Numbered cards: `{ title, text }` |
| `insights` | Big numbered findings |
| `stats` | Big numbers with a line under each |
| `table` | A table. `✓`, `✕` and `~` become coloured marks; `hl` highlights a column |
| `voices` | Quotes on a dark band: `{ text, who }` |
| `chips` | A row of tags |
| `hmw` | A "How might we" statement with highlighted parts |
| `scamper` | The seven SCAMPER cards |
| `credits` | Label and value pairs |
| `lists` | Cards of bullet points, two or three across (a SWOT, competitors): `{ title, tag?, points }` |
| `survey` | Survey answers as bars: `{ q, rows: [{ l, v }], multi?, approx? }` |
| `personas` | Persona cards: `{ name, meta, quote, groups: [{ title, points }], skills }` |
| `screens` | Full-width product screens, one per row: `{ label, title, text, img }`. Add `panels: { src, caption }` for a strip of detail panels, or `states: [{ label, img }]` for tabs that swap the screen. Leave `img: ""` for a "Screen to come" slot |
| `story` | A device that stays put while each scroll brings the next screen: `{ device: "phone" \| "laptop" \| "tablet" \| "watch", title, steps: [{ label, title, text, img }] }` |
| `stack` | Cards that scroll in and pile up, then the title arrives: `{ kicker, title, text, items: [{ title, text, tag, img }] }` |
| `words` | A statement that lights up word by word as you read; `*starred words*` take the accent: `{ kicker, text, by }` |
| `chart` | Bar, column or donut charts drawn from your own numbers, with the sample and source under them: `{ kind: "hbar" \| "bar" \| "donut", title, sub, unit, max, n, source, note, data: [{ l, v, hl }] }`. Put several in `charts: [...]` to show them two across |
| `timeline` | A process drawn down the page as you read: `{ title, items: [{ when, title, text }] }` |
| `hscroll` | A row of pictures that slides sideways while you scroll down: `{ title, items: [{ src, caption, ar }] }`. `ar` is the picture's width / height, for example `"16 / 9"` |
| `compare` | Before and after with a handle to drag: `{ title, ar, before: { src, label }, after: { src, label } }` |
| `holo` | XR: panels hung on an arc around you; scrolling turns your head: `{ title, items: [{ src, label, text }] }` |
| `video` | A muted loop that plays while it's on screen (`src`), or a film that opens in the theatre (`yt`: the YouTube id) |
| `cbsim` | A picture seen through different kinds of colour vision, with a lens to move: `{ title, src, ar, caption }` |
| `tin` | Packaging: a tin with its label artwork wrapped all the way round, turning on its own: `{ title, src, caption }` |
| `roi` | Immerse Editor Pro's ROI check as a dial visitors can drag: `{ title, text }` |
| `pano` | A 360° frame (2:1 equirectangular image) visitors drag to look around, with the viewing zones: `{ title, src, fov, caption }` |

A case study can also have `iterations`, a `finale`, `specs` and a `tone`: `"night"` (black and red) or `"deep"` (black and violet).

### Where the presentation pieces live

- **Case studies:** add `show: [ ...blocks ]` to any section in `content/case-studies/<id>.js`. They appear straight after that section's paragraphs. Every section also opens as a numbered slide automatically.
- **Entry and Glimpse pages:** `content/showcase.js`, one list of blocks per project id.

### Stand-ins: drop in a file and it appears

Any picture or video path that doesn't exist yet shows a designed stand-in with the file name printed on it, for example `STAND-IN · SCREEN-2.WEBP`. Put a file with exactly that name in the project's folder (or `assets/video/` for videos) and it replaces the stand-in, with no code to change. Titles that say "to come" are placeholders to write.

### How a project page moves

Each project page picks a behaviour from its discipline, so a UX case study, an XR project and a game don't all feel the same:

- **UX** (everything else): screens lean back slightly and settle flat as you scroll to them.
- **XR** (discipline `XR`, or `also` includes `XR`): screens turn in from the side in depth, a faint floor grid sits behind the title, HUD corners frame the hero, and over pictures the pointer becomes a gaze reticle that fills when you hold still.
- **Visual** (`Game`, `Visual`, `Physical`): the hero runs edge to edge, pictures come before the text on short pages, and galleries get bigger.

On every project, pictures in galleries and figure rows open full screen (arrows, Esc, swipe).

### Live Figma prototypes

Add `figma` to a project in `content/projects.js` with the prototype's share link:

```js
figma: "https://www.figma.com/proto/…"
// or, for a phone prototype shown tall:
figma: { url: "https://www.figma.com/proto/…", ratio: "phone", title: "Try the booking flow." }
```

The page gets a "Live prototype" section that loads only when a visitor presses the button. Figma (and YouTube) can't be embedded inside the Claude preview, so there it links out; on srijithdraj.com and `*.pages.dev` it plays on the page.

## Videos

- **Home tabs:** put muted `.mp4` loops (8–15 seconds, under 10 MB) in `assets/video/`. Then set `video: "assets/video/area-ux.mp4"` on the item in `areas`.
- **Films and trailers:** they stay on YouTube. Set `film` (Rajasthan series) or `id` (everything else) to the video id: the part after `v=` or `youtu.be/`. With an id, the film plays in a theatre on the site, with a "Watch on YouTube" button beside it. Without one, the link goes to YouTube.
- **Project videos:** in `videos` on a project, give `id` the same way to play it on the site.
- No single file may be larger than 25 MB on Cloudflare Pages, so long videos always go on YouTube.

## The Films page

- Arriving at Films plays one continuous intro on a TV: it switches on to static, tunes into a camera with the reels turning and film running, counts down 3-2-1, then the screen cracks and falls away to show the page. It's shorter on later visits in the same session; Skip or Esc ends it. The home strip's "Insert disc" button drops the disc into a small player first.
- The Rajasthan series opens with its own title card (dusk, a fort on its hill, dunes, postcards from the places). It holds full screen, then draws back as you keep scrolling, and the page only turns sand-coloured once the card fills the screen.
- Discs can be dragged into the player with a mouse or pen, or tapped.
- The route map draws Rajasthan's outline (DataMeet boundaries) and places each film by its `lat` and `lon`. If a name sits on the route, set `label` on the place to `"l"`, `"bl"` or `"br"` (left, below-left, below-right).
- While the Rajasthan part is in the middle of the screen, the page turns sand, terracotta and indigo. Later series can get their own scene: wrap their sections in an element with `data-scene="<name>"` and give `:root[data-scene="<name>"]` its colours in `site.css`.

## Area pages

UX Design, XR Design and Graphics and Games each have a page (`#ux-design`, `#xr-design`, `#graphics-and-games`) built from `areas` in `content/site.js`: `projects` are the three shown first, `disciplines` decide what else belongs, `process` is the row of steps under the title, `poster` is the still on the home stage and `pagePoster` (optional) the still on the area page.

## Haptics

Taps give a short vibration on Android phones, and newer iPhones (iOS 18 and later) get the system tick. Visitors can switch it off in the footer. The patterns are in `HAPTIC` near the top of the utilities section in `assets/js/app.js`. Browsers don't allow vibration inside embedded previews, so test haptics on the live site from your phone.

## Hidden projects

`hidden: true` keeps a project's number but leaves it out of every list and page. Oncopilot is hidden this way. To publish it, set `hidden: false` and put `project: "oncopilot"` in `current` in `content/site.js`.

## Seeing it on your computer

Run `npx serve .` in this folder and open the address it prints, or use the Live Server extension in VS Code. Opening `index.html` by double-clicking also works.

## Putting it online

The site is static files, so there's no backend, database or monthly bill. The "ask" box runs in the visitor's browser.

**Recommended: GitHub plus Cloudflare Pages.** Your files live in a private GitHub repository, and every change you push goes live within a minute or two.

1. Create a free GitHub account and a **private** repository named `srijithdraj-site`. Upload this folder to it with GitHub Desktop or the website's "Upload files".
2. Create a free Cloudflare account. Go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`

   The site goes live at `srijithdraj-site.pages.dev`.
3. Connect the domain. In Cloudflare, choose **Add a site → srijithdraj.com → Free plan**. Cloudflare copies your existing DNS records and gives you two nameservers.
4. At the company you bought the domain from, replace the nameservers with Cloudflare's two. This usually takes a few hours, and at most a day or two.
5. In the Pages project, go to **Custom domains → Set up a domain** and add `srijithdraj.com`, then `www.srijithdraj.com`. Cloudflare creates the records and the HTTPS certificate.
6. Delete the old Framer records (A or CNAME records pointing at Framer) in Cloudflare's DNS. Keep any MX records if you have email on the domain.
7. Once the new site loads on your domain, cancel the Framer plan.

**To update the site afterwards:** edit a file on github.com (pencil icon → Commit), or change it on your computer and push with GitHub Desktop. Cloudflare redeploys automatically.

**Simpler alternative:** in Cloudflare Pages choose **Upload assets** and drag in this folder (up to 1,000 files). You redo the drag for every update, and Cloudflare doesn't let you switch that project to GitHub later.

On the free plan, requests to static files are free and unlimited, with up to 20,000 files per site and 25 MB per file. This site uses about 200 files.

## Version 19: how each case study opens its sections

Every case study can pick its own way of opening sections with `style:` at the top of its file in `content/case-studies/`:

| style | Used by | What it does |
|---|---|---|
| `rail` | TexGenie | The section title stays beside the text while you read |
| `diamond` | Dignity | A double diamond shows which phase the section is in (`phase: 0–3` or `"all"` on each section) |
| `steps` | Internshala | The process runs across the top and fills as you go (`phases: [...]` on the case study, `phase:` on each section) |
| `panel` | ShoeTime | Each section opens on its own card, like a research report |
| `timeline` | Immerse Editor Pro | An editor's ruler: each section is a clip and a playhead moves through it |
| `level` | Reven VR | Game chapter cards, cut in with a blade |
| `slate` | WHO VR | A film's front page (`film: { still, presents, meta, laurels }`), then each part slated like a scene |
| `holo` | Atelier XR (default for XR) | The XR slide: the title is pulled into focus |

Other new pieces:
- `opener:` on a case study puts a block (for example `words`) before the first section.
- Block `process`: a numbered track that draws as you scroll (ShoeTime's project process).
- Block `watch`: the working GPay watch prototype. To use a Figma prototype instead, add `figma: "https://www.figma.com/proto/…"` to the project in `content/projects.js`.
- Discipline pages (`areas` in `content/site.js`): `projects` are shown as tiles, `more` are named in one line underneath, `more: false` hides that line.

## Version 21: new building blocks

Diagrams are drawn by the site rather than shown as pictures, so they stay sharp and can be edited as text:
- `ddiamond` (a double diamond with methods per phase), `clusters` (sticky notes in groups), `amatrix` (an action matrix, one row per insight), `priority` (urgent/important quadrants with a chosen action), `empathy` (see, hear, do, think), `personas` with `img` and `bio` (a persona card with a photo).
- `reqmap` (requirements around a phone), `iatree` (an information architecture), `dsys` (type scale, colours, buttons, icons).
- `appframe` (one app window; scrolling changes the screen, title and notes): used for Immerse Editor Pro's desktop workspaces.
- `fgame` (Fredrick Runs, playable, using the images in assets/img/projects/fredrick-runs/), `shelf` (pick a label and it wraps the tin; `lid` puts art on the lid), `note` (places one of a project's notes between its pictures: `{ type: "note", entry: 0 }`).
- Case study styles added: `search` (Internshala). Reven's `level` chapters now split left and right with the section's first picture. WHO VR sections take `prop` (light, cam360, wave, viewfinder, script, poster) and `still` (a full-width frame after the section).
- Home: `homeUx` in content/site.js picks the UX projects on the home page. The UX page's header board comes from `how` on the UX area.
