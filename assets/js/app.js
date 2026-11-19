/* ==========================================================================
   srijithdraj.com: the engine. You shouldn't need to edit this file to change
   what the site says; all words, links and images live in content/.
   No build step and no dependencies apart from Lenis (smooth scrolling).

   Routes (the part after # in the address)
     #home  #work  #archive  #films  #writing  #about  #resume  #colophon
     #p-<project id>      a project page (case study, entry or glimpse)
     #for-<words>         the "ask" results page

   Map of this file
     derived data ........ numbering and ordering projects
     small components .... thumbnails, cards, chips
     shell ............... top bar and footer
     HOME ................ hero, orbit, ask box, areas, flavours, films strip
     WORK, ARCHIVE ....... the two project listings
     ASK ................. keyword matching for "Tell me what you need"
     PROJECT PAGES ....... case studies, entries, glimpses, content blocks
     FILMS ............... the DVD player and its controller
     WRITING, ABOUT, RÉSUMÉ, COLOPHON
     command palette ..... the search box
     motion .............. reveals, smooth scrolling, scroll-linked effects
     router .............. which page to draw for the current address
     Films entrance ...... the TV that switches on and shatters
     global events ....... clicks, typing, keys, address changes
   ========================================================================== */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("sdr:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("sdr:" + k, JSON.stringify(v)); } catch (e) {} }
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- derived data ---------- */
  const P = S.projects.slice();
  const byId = Object.fromEntries(P.map((p) => [p.id, p]));
  // Accession numbers: SDR/<yy>/<nn>, numbered in order within each year. Undated work gets "––".
  (function assignAccession() {
    const chrono = P.slice().sort((a, b) => (a.sortYear || 9999) - (b.sortYear || 9999));
    const seq = {};
    chrono.forEach((p) => {
      const y = p.sortYear ? String(p.sortYear).slice(2) : "––";
      seq[y] = (seq[y] || 0) + 1;
      p.acc = "SDR/" + y + "/" + String(seq[y]).padStart(2, "0");
    });
  })();
  // Hidden projects keep their accession number but stay out of every list.
  for (let i = P.length - 1; i >= 0; i--) if (P[i].hidden) P.splice(i, 1);
  const ordered = P.slice().sort((a, b) => (b.sortYear || 0) - (a.sortYear || 0));
  const href = (p) => "#p-" + p.id;
  const yearLabel = (p) => p.year || "Undated";
  const isCase = (p) => p.depth === "Case study";

  /* ---------- small components ---------- */
  function cover(p, opts = {}) {
    const src = opts.src === undefined ? p.cover : opts.src;
    const natural = src && opts.natural;
    const cls = "cover" + (opts.sm ? " sm" : "") + (src ? "" : " ph") + (natural ? " natural" : "");
    const style = opts.ratio && !natural ? ` style="aspect-ratio:${opts.ratio}"` : "";
    const pos = opts.focus !== false && p.focus && !natural ? ` style="object-position:${esc(p.focus)}"` : "";
    if (src) return `<div class="${cls}"${style}><img src="${esc(src)}" alt="${esc(opts.alt || p.title + ": " + p.summary)}" loading="lazy"${pos}></div>`;
    const label = opts.label || "Cover image to come";
    return `<div class="${cls}"${style} role="img" aria-label="${esc(p.title)}, ${esc(label.toLowerCase())}">
      <span class="ph-glyph" aria-hidden="true">${esc(p.title.charAt(0))}</span>
      <div class="ph-in"><div class="ph-top"><span>${esc(p.acc)}</span><span>${esc(label)}</span></div>
      <div class="ph-title">${esc(opts.title || p.title)}</div></div></div>`;
  }
  const chips = (p) => `<span class="chip">${esc(p.discipline)}</span>${(p.also || []).map((a) => `<span class="chip">${esc(a)}</span>`).join("")}`;
  const depthChip = (p) => `<span class="chip${isCase(p) ? " blue" : ""}">${esc(p.depth)}</span>`;
  /* Discipline icons, drawn on a 24px grid */
  const DI = {
    UX: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
    XR: '<path d="M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-3.2l-1.8-2.4a1.9 1.9 0 0 0-3 0L8.7 17H5.5A2.5 2.5 0 0 1 3 14.5z"/>',
    Game: '<path d="M7 8h10a4 4 0 0 1 4 4.4l-.5 3.6a2.4 2.4 0 0 1-4.1 1.3L14.8 16H9.2l-1.6 1.3a2.4 2.4 0 0 1-4.1-1.3L3 12.4A4 4 0 0 1 7 8z"/><path d="M8 11v3M6.5 12.5h3M15.5 12h.01M17.5 13.5h.01"/>',
    Film: '<rect x="3" y="7" width="13" height="10" rx="2"/><path d="M16 10.5l5-3v9l-5-3"/>',
    Visual: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 15.5l-5-5L5 20"/>',
    Physical: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01"/>',
    Research: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>'
  };
  const dicon = (k, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${DI[k] || ""}</svg>`;

  /* Bento thumbnail: a square made of six cells. The big cell is the cover;
     two small cells show `thumbs` images, or close-up crops of the cover. */
  function thumb(p) {
    const img = p.cover, th = p.thumbs || [], det = p.details || ["82% 28%", "22% 78%"];
    const detail = (i) => th[i] ? `<img src="${esc(th[i])}" alt="" loading="lazy">`
      : img ? `<span class="b-zoom" style="background-image:url('${esc(img)}');background-position:${esc(det[i])}"></span>` : "";
    return `<span class="bthumb${img ? "" : " ph"}" aria-hidden="true"><span class="bgrid">
      <span class="b b-main">${img ? `<img src="${esc(img)}" alt="" loading="lazy" style="object-position:${esc(p.focus || "50% 50%")}">` : `<span class="b-ph"><span>${esc(p.title)}</span><em>Cover to come</em></span>`}</span>
      <span class="b b-d1">${detail(0)}</span>
      <span class="b b-disc">${dicon(p.discipline, 22)}<span>${esc(p.discipline)}</span></span>
      <span class="b b-year"><b>${esc(p.sortYear || "—")}</b><span>${esc(p.acc)}</span></span>
      <span class="b b-d2">${detail(1)}</span>
      <span class="b b-go"><span>${esc(p.depth)}</span><i>↗</i></span>
    </span></span>`;
  }
  function card(p) {
    return `<a class="card" href="${href(p)}" data-reveal>${thumb(p)}
      <span class="row1"><span class="t">${esc(p.title)}</span><span class="mono muted">${esc(yearLabel(p))}</span></span>
      <span class="s">${esc(p.summary)}</span></a>`;
  }
  const icon = {
    search: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.25" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    theme: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor"/></svg>',
    menu: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 6h14M2 12h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    left: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  const NAV = [["work", "Work"], ["archive", "Archive"], ["writing", "Writing"], ["about", "About"]];

  /* ---------- shell ---------- */
  function shell(route) {
    const top = route.page === "p" ? "work" : route.page;
    return `<a class="skip" href="#main" data-skip>Skip to content</a>
    <header class="nav"><div class="wrap">
      <a class="wordmark" href="#home" aria-label="${esc(S.owner.name)}, home"><i aria-hidden="true"></i>${esc(S.owner.name)}</a>
      <nav class="nav-links" aria-label="Main">${NAV.map(([k, l]) => `<a href="#${k}"${top === k ? ' aria-current="page"' : ""}>${l}</a>`).join("")}<span class="nav-div" aria-hidden="true"></span><a class="nav-films" href="#films"${top === "films" ? ' aria-current="page"' : ""}><i class="rec" aria-hidden="true"></i><span>Films</span></a></nav>
      <div class="nav-tools">
        <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch light or dark">${icon.theme}</button>
        <button class="icon-btn menu-btn" type="button" data-menu aria-label="Open menu">${icon.menu}</button>
      </div></div></header>`;
  }
  // A pixel walker for the footer: two frames of a little me, in a blue shirt
  const WALK = [
    ["...####...", "..######..", "..#ssss#..", "..sesses..", "..ssssss..", "...ssss...", "..bbbbbb..", ".sbbbbbbs.", ".sbbbbbbs.", "..bbbbbb..", "..pp..pp..", "..pp..pp..", "..kk..kk.."],
    ["...####...", "..######..", "..#ssss#..", "..sesses..", "..ssssss..", "...ssss...", "..bbbbbb..", ".sbbbbbbs.", "..bbbbbbs.", "..bbbbbb..", "...pppp...", "..pp..pp..", ".kk....kk."]
  ];
  const WALK_C = { "#": "#15110E", s: "#9A6646", e: "#15110E", b: "#1F6FD6", p: "#2B3140", k: "#0B0B0D" };
  const walkerSvg = () => `<svg viewBox="0 0 10 13" shape-rendering="crispEdges" aria-hidden="true">${WALK.map((f, k) => `<g class="wk f${k}">${f.map((row, y) => [...row].map((c, x) => WALK_C[c] ? `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${WALK_C[c]}"/>` : "").join("")).join("")}</g>`).join("")}</svg>`;
  function footer() {
    const cs = P.filter(isCase);
    const col = (t, links) => `<div><h4>${t}</h4><ul>${links.map(([l, h, a]) => `<li><a href="${h}"${a || ""}>${esc(l)}</a></li>`).join("")}</ul></div>`;
    return `<footer class="footer ft">
      <div class="ft-stage" data-ft>
        <p class="sr">${esc(S.owner.name)}</p>
        <canvas class="ft-name" aria-hidden="true"></canvas>
        <div class="ft-ground" aria-hidden="true"><span class="ft-walker">${walkerSvg()}<i class="ft-bubble mono"></i></span><i class="ft-line"></i></div>
        <p class="ft-hint mono" aria-hidden="true">Move the pointer. Click to jump.</p>
      </div>
      <div class="wrap">
      <div class="dir">
        ${col("Work", [["Selected work", "#work"], ...cs.map((p) => [p.title, href(p)])])}
        ${col("Archive", [["Everything", "#archive"], ...S.facets.discipline.values.map((d) => [d, "#archive", ` data-facet="discipline" data-value="${d}"`])])}
        ${col("Chapters", S.facets.chapter.values.map((c) => [c, "#archive", ` data-facet="chapter" data-value="${c}"`]))}
        ${col("Films and writing", [["Films", "#films"], ["Writing", "#writing"]])}
        ${col("About", [["Journey", "#about"], ["Résumé", "#resume"], ["Contact", "#about-contact"], ["Colophon", "#colophon"]])}
      </div>
      <div class="base"><span>Copyright © ${S.owner.since}–${new Date().getFullYear()} ${esc(S.owner.name)}. All work shown is my own unless credited.</span>
      <span><span class="ft-clock mono" data-clock>Bengaluru</span> · <button type="button" data-theme-toggle class="more" style="color:var(--fg-2)">Switch theme</button>${hapticSupport ? ` · <button type="button" data-haptics class="more" style="color:var(--fg-2)" aria-pressed="${hapticsOn}">Haptics ${hapticsOn ? "on" : "off"}</button>` : ""} · Last updated ${esc(S.owner.updated)}</span></div>
    </div></footer>`;
  }

  /* ---------- HOME ---------- */
  function home() {
    const ux = (S.homeUx || S.uxFeatured).map((id) => byId[id]).filter((p) => p && !p.hidden);
    const flav = S.flavours.map((f) => Object.assign({}, f, { p: byId[f.id] })).filter((f) => f.p && !f.p.hidden);
    const shown = new Set([...ux.map((p) => p.id), ...flav.map((f) => f.id)]);
    const rest = ordered.filter((p) => !shown.has(p.id));
    const mq = S.marquee.map((m) => `<span>${esc(m)}</span><i aria-hidden="true"></i>`).join("");
    return `<main id="main">
    <section class="hero"><div class="wrap">
      <div class="hero-grid">
        <div class="hero-text">
          <h1>${esc(S.owner.headline)}</h1>
          <div class="actions"><a class="btn" href="#work">See selected work</a><a class="btn ghost" href="#archive">Browse the archive</a></div>
          <p class="hero-stat mono"><i aria-hidden="true"></i>${esc(S.owner.base)}<span aria-hidden="true">/</span>UX · XR · Games · Film</p>
        </div>
        ${orbit()}
      </div>
      ${heroSprites()}
      ${askHero()}
    </div></section>

    <div class="marquee" aria-hidden="true"><div class="mq-track">${mq}${mq}</div></div>

    <section class="section" aria-labelledby="hello-h"><div class="wrap hello" data-reveal>
      ${S.owner.portrait ? `<div class="hello-photo"><img src="${esc(S.owner.portrait)}" alt="Portrait of ${esc(S.owner.name)}"></div>` : ""}
      <div class="hello-text"><span class="dot-label">.hello</span><h2 id="hello-h" class="sr">About me</h2><p class="bio">${esc(S.owner.bio)}</p>
        <div class="facts">${S.owner.facts.map((f) => `<div><span class="dot-label">${esc(f.label)}</span><b>${esc(f.value)}</b><span class="muted">${esc(f.sub)}</span></div>`).join("")}</div>
        <a class="more" href="#about">More about me</a></div>
    </div></section>

    ${areasStage()}

    <section class="section" aria-labelledby="ux-h"><div class="wrap">
      <div class="section-head"><div><span class="dot-label">.ux design · case studies</span><h2 id="ux-h">Start with these.</h2></div><a class="more" href="#ux-design">UX Design</a></div>
      <div class="pt-grid">${ux.map((p) => areaTile(p)).join("")}</div>
    </div></section>

    ${flavoursAcc(flav)}

    <section class="section" aria-labelledby="also-h"><div class="wrap">
      <div class="section-head"><div><span class="dot-label">.from the archive</span><h2 id="also-h">Coursework, client work and experiments.</h2></div><a class="more" href="#archive">Browse the archive</a></div>
      <div class="type-index" id="type-index">${rest.slice(0, S.homeIndexMax || 8).map((p) => `<a class="ti" href="${href(p)}" data-id="${p.id}"><span class="ti-t">${esc(p.title)}</span></a>`).join('<span class="ti-sep" aria-hidden="true">/</span>')}<span class="ti-sep" aria-hidden="true">/</span><a class="ti ti-more" href="#archive">and more</a></div>
    </div><div class="hover-preview" id="hp" hidden></div></section>

    ${filmsStrip()}
    ${contactBlock()}
    </main>`;
  }
  /* Areas of work: a stage with three pills. Each area shows its video (or a still), its line and three projects. */
  function areasStage() {
    const A2 = S.areas;
    const projs = (a) => (a.projects || []).map((id) => byId[id]).filter((p) => p && !p.hidden);
    return `<section class="section areas" aria-labelledby="ar-h" style="padding-top:0">
      <div class="wrap"><div class="section-head"><div><span class="dot-label">.areas of work</span><h2 id="ar-h">Areas of work.</h2></div></div></div>
      <div class="stage-wrap"><div class="stage" id="stage">
        <div class="stage-media" aria-hidden="true">${A2.map((a, i) => `<div class="sm${i === 0 ? " on" : ""}">${a.video ? `<video src="${esc(a.video)}" poster="${esc(a.poster)}" muted loop playsinline preload="metadata"></video>` : `<img src="${esc(a.poster)}" alt="">`}</div>`).join("")}</div>
        <div class="stage-shade" aria-hidden="true"></div>
        ${A2.map((a, i) => `<div class="stage-panel" role="tabpanel" id="panel-${a.key}" aria-labelledby="tab-${a.key}"${i ? " hidden" : ""}>
          <h3>${esc(a.label)}</h3><p>${esc(a.line)}</p>
          <div class="stage-projects">${projs(a).slice(0, 3).map((p) => `<a class="sp" href="${href(p)}"><span class="sp-img">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy" style="object-position:${esc(p.focus || "50% 50%")}">` : ""}</span><span>${esc(p.title)}</span></a>`).join("")}</div>
          <a class="more stage-all" href="#${esc(a.slug)}">Explore ${esc(a.label)}</a>
        </div>`).join("")}
        <div class="seg" role="tablist" aria-label="Areas of work"><span class="seg-ind" aria-hidden="true"></span>${A2.map((a, i) => `<button type="button" role="tab" id="tab-${a.key}" aria-controls="panel-${a.key}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-area="${i}"><span class="l-long">${esc(a.label)}</span><span class="l-short">${esc(a.short || a.label)}</span><i class="tab-bar" aria-hidden="true"></i></button>`).join("")}</div>
      </div></div>
    </section>`;
  }
  /* The current role. Becomes a case-study row once that project is public. */
  function currentSlot() {
    const c = S.current; if (!c) return "";
    const p = c.project && byId[c.project];
    if (p && !p.hidden) return featureRow(p);
    return `<div class="current" data-reveal><span class="cur-dot" aria-hidden="true"></span>
      <div><span class="dot-label">.currently</span><h3>${esc(c.org)}</h3><p class="muted">${esc(c.role)}. ${esc(c.line)}</p></div>
      <span class="chip">Case study coming</span></div>`;
  }
  /* One project from every flavour: an accordion of panels. The open one shows its bento thumbnail. */
  function flavoursAcc(flav) {
    if (!flav.length) return "";
    return `<section class="band section flav" aria-labelledby="fl-h"><div class="wrap">
      <div class="section-head"><div><span class="dot-label">.beyond screens</span><h2 id="fl-h">One project from every flavour.</h2></div><a class="more" href="#work">All work</a></div>
      <div class="acc" id="acc">${flav.map((f, i) => `<a class="acc-i${i === 0 ? " on" : ""}" href="${href(f.p)}" data-i="${i}" aria-label="${esc(f.label)}: ${esc(f.p.title)}">
        <span class="acc-bg" aria-hidden="true">${f.p.cover ? `<img src="${esc(f.p.cover)}" alt="" loading="lazy" style="object-position:${esc(f.p.focus || "50% 50%")}">` : ""}</span>
        <span class="acc-tab" aria-hidden="true"><span class="mono">${pad2(i + 1)}</span><b>${esc(f.label)}</b></span>
        <span class="acc-body">${thumb(f.p)}<span class="acc-txt"><span class="mono">${esc(f.name)} · ${esc(yearLabel(f.p))}</span><b>${esc(f.p.title)}</b><span>${esc(f.p.summary)}</span><span class="more">See the project</span></span></span>
        <i class="acc-bar" aria-hidden="true"></i></a>`).join("")}</div>
    </div></section>`;
  }
  /* A small door to the Films page. */
  function filmsStrip() {
    const shots = S.films.places.filter((x) => x.thumb);
    return `<section class="films-tone films-strip" aria-labelledby="fs-h"><div class="wrap"><a class="fs-in" href="#films" data-insert>
      <span class="fs-frame" aria-hidden="true">${shots.map((x, i) => `<img src="${esc(x.thumb)}" alt="" class="${i === 0 ? "on" : ""}" loading="lazy">`).join("")}<i class="fs-bar t"></i><i class="fs-bar b"></i></span>
      <span class="fs-text"><span class="fs-pill"><i class="rec" aria-hidden="true"></i>Films</span><b id="fs-h">Enter the world of films.</b><span>My other side, where I go to places and document them.</span></span>
      <span class="fs-player" aria-hidden="true">
        <span class="fs-load"><span class="fs-disc">${shots[0] ? `<img src="${esc(shots[0].thumb)}" alt="">` : ""}<i></i></span></span>
        <span class="fs-slab"><i class="fs-slit"></i><span class="fs-vfd mono">READY</span><i class="fs-led"></i></span>
        <span class="btn fs-btn">Insert disc</span>
      </span></a></div></section>`;
  }
  /* The hero orbit: a figure with everything I work on circling around it. */
  function orbit() {
    const fig = `<svg class="figure" viewBox="0 0 200 320" aria-hidden="true">
      <ellipse cx="100" cy="306" rx="58" ry="8" class="f-shadow"/>
      <path d="M80 182 L76 288 M120 182 L124 288" class="f-limb" stroke-width="22"/>
      <path d="M62 298 H86 M114 298 H138" class="f-limb" stroke-width="10"/>
      <path d="M60 98 Q46 140 50 186" class="f-limb" stroke-width="17"/>
      <path class="f-arm f-limb" d="M140 98 Q166 118 176 86" stroke-width="17"/>
      <path d="M60 94 Q100 80 140 94 L148 182 Q100 192 52 182 Z" class="f-body"/>
      <rect x="92" y="70" width="16" height="16" class="f-body"/>
      <circle cx="100" cy="46" r="27" class="f-body"/>
      <rect x="73" y="35" width="54" height="22" rx="10" class="f-visor"/>
      <path d="M80 41 h18" class="f-glint"/>
    </svg>`;
    const nodes = S.orbit.map((o, i) => {
      const attrs = o.facet ? ` href="#archive" data-facet="${o.facet}" data-value="${esc(o.value)}"` : o.href ? ` href="${o.href}"` : "";
      const tag = attrs ? "a" : "span";
      return `<li><${tag} class="node r${o.ring}${o.icon ? "" : " tool"}"${attrs} data-ring="${o.ring}" data-i="${i}">${o.icon ? `<span class="nd-ic">${pxIcon(o.icon)}</span>` : ""}<span>${esc(o.label)}</span></${tag}></li>`;
    }).join("");
    const me = S.owner.orbitPhoto ? `<canvas class="me pix-me" data-pix="${esc(S.owner.orbitPhoto)}" role="img" aria-label="${esc(S.owner.name)}, drawn in pixels"></canvas>` : fig;
    return `<div class="orbit${S.owner.orbitPhoto ? " has-me" : ""}" id="orbit">
      <svg class="rings" viewBox="0 0 600 600" aria-hidden="true"><g transform="rotate(-14 300 330)">
        <ellipse cx="300" cy="330" rx="276" ry="88"/><ellipse cx="300" cy="330" rx="204" ry="65"/><ellipse cx="300" cy="330" rx="132" ry="42"/></g></svg>
      <div class="glow" aria-hidden="true"></div>
      ${me}
      <ul class="nodes" aria-label="What I work on">${nodes}</ul>
    </div>`;
  }

  function featureRow(p) {
    return `<a class="feature" href="${href(p)}">${thumb(p)}
      <div class="meta"><span class="mono muted">${esc(p.acc)} · ${esc(p.year)} · ${esc(p.context)}</span>
      <h3>${esc(p.title)}</h3><p class="sum">${esc(p.summary)}</p>
      ${p.outcome ? `<p class="out">${esc(p.outcome)}</p>` : ""}
      <div class="tags">${depthChip(p)}${chips(p)}${/^In (progress|development)$/.test(p.status || "") ? `<span class="chip blue">${esc(p.status)}</span>` : ""}</div>
      <span class="more">${isCase(p) ? "Read the case study" : "See the project"}${p.readMins ? ` · ${p.readMins} min` : ""}</span></div></a>`;
  }

  function contactBlock() {
    return `<section class="section band" id="about-contact" aria-labelledby="ct-h"><div class="wrap" style="display:grid;gap:28px">
      <div class="ct-head"><span class="dot-label">.say hello</span><h2 id="ct-h" class="statement-sm">${esc(S.owner.freelance)}</h2>${S.owner.freelanceSub ? `<p class="lead">${esc(S.owner.freelanceSub)}</p>` : ""}</div>
      ${keyboard()}
    </div></section>`;
  }
  // Contact links as mechanical keycaps on a cutting mat, each with a handwritten note
  function keyboard() {
    const keys = (S.contactKeys || []).map((k) => {
      const href = k.kind === "mail" ? `mailto:${S.owner.email}` : k.kind === "resume" ? (S.owner.resumePdf || "#resume") : ((S.owner.links.find((l) => l.label === k.label) || {}).href || "");
      return href ? Object.assign({}, k, { href }) : null;
    }).filter(Boolean);
    const arrow = `<svg class="ka" viewBox="0 0 40 48" aria-hidden="true"><path d="M21 46c-7-11 6-19-1-40"/><path d="M12 13l8-9 7 10"/></svg>`;
    return `<div class="mat" data-keys>
      <div class="mat-ruler" aria-hidden="true">${Array.from({ length: 16 }, (_, i) => `<span style="left:${i * 120 + 4}px">${i}</span>`).join("")}</div>
      <span class="mat-angle" aria-hidden="true">45°</span>
      <ul class="keys" role="list">${keys.map((k, i) => {
        const ext = /^https?:/.test(k.href), dl = k.kind === "resume" && S.owner.resumePdf;
        const note = `<p class="kn">${esc(k.note)}${k.kind === "mail" ? `<span class="kn-mail" id="email-addr">${esc(S.owner.email)}</span>` : ""}</p>`;
        return `<li class="kc ${i % 2 ? "up" : "down"}${k.kind === "resume" ? " wide" : ""}" style="--r:${i % 2 ? 2 : -2}deg">
          <div class="knote">${note}${arrow}</div>
          <a class="key t-${esc(k.tone || "light")}" href="${esc(k.href)}" data-key="${esc((k.letter || "").toLowerCase())}"${k.kind === "mail" ? ` data-mail="${esc(S.owner.email)}"` : ""}${ext ? ' target="_blank" rel="noopener"' : ""}${dl ? " download" : ""}><span class="cap">${k.letter ? `<span class="lg" aria-hidden="true">${esc(k.letter)}</span>` : ""}<span class="lb">${esc(k.label)}${k.kind === "resume" ? ' <b aria-hidden="true">↓</b>' : ""}</span></span></a>
        </li>`;
      }).join("")}</ul>
    </div>`;
  }

  /* ---------- AREA PAGES: UX Design, XR Design, Graphics and Games ---------- */
  const areaOf = (slug) => (S.areas || []).find((a) => a.slug === slug);
  const inArea = (a, p) => a.disciplines.includes(p.discipline) || (p.also || []).some((d) => a.disciplines.includes(d));
  // A project on a discipline page: the bento thumbnail made small, with its name and one line beside it
  function areaTile(p, wide) {
    return `<a class="atile${wide ? " wide" : ""}" href="${href(p)}" data-reveal>${thumb(p)}
      <span class="pt-meta"><span class="mono pt-k">${wide ? "Start here · " : ""}${esc(p.discipline)} · ${esc(yearLabel(p))}</span><b class="pt-n">${esc(p.title)}</b><span class="pt-s">${esc(p.summary)}</span>${wide && p.outcome ? `<span class="pt-o">${esc(p.outcome)}</span>` : ""}
      <span class="more">${isCase(p) ? "Read the case study" : "See the project"}</span></span></a>`;
  }
  // The current role as a tile beside the UX projects (becomes the project's own tile once it is public)
  function curTileHtml() {
    const cur = S.current; if (!cur) return "";
    const p = cur.project && byId[cur.project];
    if (p && !p.hidden) return areaTile(p);
    return `<div class="atile pt-cur" data-reveal><span class="pt-curmark" aria-hidden="true"><span class="cur-dot"></span></span><span class="pt-meta"><span class="mono pt-k">Currently</span><b class="pt-n">${esc(cur.org)}</b><span class="pt-s">${esc(cur.role)}. ${esc(cur.line)}</span><span class="chip">Case study coming</span></span></div>`;
  }
  /* UX: a design-tool board. The process as a flow; pick a step (or let the cursor walk it) to see where it happened in my projects. */
  function howBoard(a) {
    const H = a.how, pos = [[13, 15], [32, 56], [51, 13], [70, 56], [88, 15]];
    const node = (h, i) => `<button type="button" class="hb-n${i ? "" : " on"}" data-hb="${i}" style="--x:${pos[i % 5][0]}%;--y:${pos[i % 5][1]}%" aria-pressed="${!i}"><span class="mono">${pad2(i + 1)}</span><b>${esc(h.step)}</b><i class="hb-h tl"></i><i class="hb-h tr"></i><i class="hb-h bl"></i><i class="hb-h br"></i></button>`;
    const ev = (h, i) => `<div class="hb-ev${i ? "" : " on"}" data-hbe="${i}" role="tabpanel"><p class="hb-line">${esc(h.line)}</p><ul>${h.ev.map((e) => { const p = byId[e.p]; return p && !p.hidden ? `<li><a href="${href(p)}"><span class="hb-chip mono">${esc(p.title.replace(" redesign", "").replace(" for Apple Watch", ""))}</span><span>${esc(e.t)}</span></a></li>` : ""; }).join("")}</ul></div>`;
    return `<div class="hb" data-hb-board>
      <div class="hb-bar mono" aria-hidden="true"><span><i></i><i></i><i></i></span><span>how-i-work.fig</span><span class="hb-zoom">100%</span></div>
      <div class="hb-canvas">
        <span class="hb-frame mono" aria-hidden="true">Frame · How I work</span>
        <svg class="hb-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M17 35 C 21 46, 26 50, 30 56"/><path d="M35 56 C 41 46, 45 40, 49 33"/><path d="M54 33 C 59 42, 63 50, 67 56"/><path d="M73 56 C 78 46, 82 42, 86 35"/><path class="loop" d="M90 36 C 97 96, 34 99, 32 77"/></svg>
        <span class="hb-iter mono" aria-hidden="true">↺ iterate</span>
        ${H.map(node).join("")}
        <span class="hb-cur" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M2 1l11 6.5-5 1.2L5.6 14z"/></svg><em>${esc(S.owner.name.split(" ")[0])}</em></span>
      </div>
      <div class="hb-evs" aria-live="polite">${H.map(ev).join("")}</div>
    </div>`;
  }
  function howBoards() {
    const b = $("[data-hb-board]"); if (!b) return;
    const ns = $$("[data-hb]", b), es = $$("[data-hbe]", b), cur = $(".hb-cur", b), cv = $(".hb-canvas", b);
    let i = 0, auto = !reduced, t;
    const show = (k) => {
      i = (k + ns.length) % ns.length;
      ns.forEach((n, j) => { n.classList.toggle("on", j === i); n.setAttribute("aria-pressed", j === i); n.classList.toggle("done", j < i); });
      es.forEach((e, j) => e.classList.toggle("on", j === i));
      const n = ns[i], r = n.getBoundingClientRect(), c = cv.getBoundingClientRect();
      cur.style.transform = `translate(${(r.left - c.left + r.width * 0.72).toFixed(0)}px, ${(r.top - c.top + r.height * 0.7).toFixed(0)}px)`;
      if (auto) { clearTimeout(t); t = setTimeout(() => show(i + 1), 3400); }
    };
    ns.forEach((n, k) => { n.addEventListener("click", () => { auto = false; clearTimeout(t); show(k); haptic("tick"); }); n.addEventListener("pointerenter", () => { if (matchMedia("(hover: hover)").matches) { auto = false; clearTimeout(t); show(k); } }); });
    b.addEventListener("pointerleave", () => { if (!reduced && !auto) { auto = true; t = setTimeout(() => show(i + 1), 2400); } });
    const rs = () => show(i); addEventListener("resize", rs);
    cleanup.push(() => { clearTimeout(t); removeEventListener("resize", rs); });
    requestAnimationFrame(() => show(0));
  }
  /* XR: a room you stand in. A tracked floor, and the projects hanging around you; the pointer turns your head. */
  function xrRoom(a) {
    const ps = (a.projects || []).map((id) => byId[id]).filter((p) => p && !p.hidden).slice(0, 5), n = ps.length;
    return `<div class="xroom" data-xroom style="--n:${n}">
      <div class="xr-floor" aria-hidden="true"></div>
      <div class="xr-ring">${ps.map((p, i) => `<a class="xr-pan" href="${href(p)}" style="--i:${i};--a:${((i - (n - 1) / 2) * 30).toFixed(1)}deg">
        <span class="xr-pm">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy" style="object-position:${esc(p.focus || "50% 50%")}">` : ""}</span>
        <span class="xr-pl mono"><b>${esc(p.title)}</b><em>${esc(p.discipline)} · ${esc(yearLabel(p))}</em></span></a>`).join("")}</div>
      <span class="xr-ret" aria-hidden="true"></span>
      <p class="xr-tip mono" aria-hidden="true"><i></i>Look around: move the pointer</p>
    </div>`;
  }
  function xrRooms() {
    const r = $("[data-xroom]"); if (!r || reduced) return;
    const hero = r.closest(".area-hero") || r, ret = $(".xr-ret", r);
    let yaw = 0, pitch = 0, ty = 0, tp = 0, raf = 0, on = true, t0 = performance.now();
    const mv = (e) => { const b = hero.getBoundingClientRect(); ty = ((e.clientX - b.left) / b.width - 0.5) * 34; tp = ((e.clientY - b.top) / b.height - 0.5) * -10; const rb = r.getBoundingClientRect(); ret.style.transform = `translate(${e.clientX - rb.left}px, ${e.clientY - rb.top}px)`; r.classList.add("tracking"); };
    const lv = () => { ty = 0; tp = 0; r.classList.remove("tracking"); };
    hero.addEventListener("pointermove", mv); hero.addEventListener("pointerleave", lv);
    const loop = (now) => { raf = requestAnimationFrame(loop); if (!on) return; const idle = Math.sin((now - t0) / 3200) * 6; yaw += ((r.classList.contains("tracking") ? ty : idle) - yaw) * 0.06; pitch += (tp - pitch) * 0.06; r.style.setProperty("--yaw", yaw.toFixed(2) + "deg"); r.style.setProperty("--pitch", pitch.toFixed(2) + "deg"); };
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => { on = en.isIntersecting; }) : null; io && io.observe(r);
    raf = requestAnimationFrame(loop);
    cleanup.push(() => { cancelAnimationFrame(raf); io && io.disconnect(); hero.removeEventListener("pointermove", mv); hero.removeEventListener("pointerleave", lv); });
  }
  /* XR page entrance: the headset wakes. Lenses open, the guardian floor is drawn, tracking locks, and you're in. */
  function xrBoot() {
    if (reduced || $(".xrboot")) return;
    let seen = false; try { seen = sessionStorage.getItem("fx-xr") === "1"; sessionStorage.setItem("fx-xr", "1"); } catch (e) {}
    const k = seen ? 0.5 : 1, el = document.createElement("div"); el.className = "xrboot"; el.style.setProperty("--k", k); el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="xb-mask"></div><div class="xb-floor"></div><div class="xb-hud mono"><span class="xb-s s1">Tracking</span><span class="xb-s s2">Guardian set</span><span class="xb-s s3">Passthrough on</span></div><div class="xb-dot"></div>`;
    document.body.appendChild(el);
    const done = () => { if (!el.isConnected) return; el.classList.add("out"); setTimeout(() => el.remove(), 600); };
    el.addEventListener("click", done); const t = setTimeout(done, 1900 * k);
    cleanup.push(() => { clearTimeout(t); el.remove(); });
  }
  function areaPage(a) {
    const lead = (a.projects || []).map((id) => byId[id]).filter((p) => p && !p.hidden);
    const rest = a.more === false ? [] : (a.more || []).map((id) => byId[id]).filter((p) => p && !p.hidden);
    const still = a.pagePoster || a.poster;
    const media = a.video ? `<video src="${esc(a.video)}" poster="${esc(still)}" muted loop playsinline autoplay></video>` : still ? `<img src="${esc(still)}" alt="">` : "";
    const head = `<section class="area-hero"><div class="wrap area-hero-in">
        <div class="area-copy"><span class="dot-label">.${esc(a.label.toLowerCase())}</span><h1>${esc(a.label)}.</h1><p class="lead">${esc(a.line)}</p>
          ${a.process ? `<ol class="area-process">${a.process.map((x, i) => `<li><span class="mono">${pad2(i + 1)}</span>${esc(x)}</li>`).join("")}</ol>` : ""}</div>
        ${a.how ? howBoard(a) : a.key === "xr" ? xrRoom(a) : media ? `<div class="area-media" aria-hidden="true">${media}</div>` : ""}
      </div></section>`;
    const curTile = "";
    const cur = S.current, curOld = false
      ? `<div class="atile pt-cur" data-reveal><span class="pt-curmark" aria-hidden="true"><span class="cur-dot"></span></span><span class="pt-meta"><span class="mono pt-k">Currently</span><b class="pt-n">${esc(cur.org)}</b><span class="pt-s">${esc(cur.role)}. ${esc(cur.line)}</span><span class="chip">Case study coming</span></span></div>` : "";
    const wall = `<section class="wrap area-wall" aria-label="${esc(a.label)} work">${lead.map((p, i) => { const im = p.wall || p.cover || p.hero; return `<a class="aw-tile t${i}${im ? "" : " empty"}" href="${href(p)}" data-reveal>
        ${im ? `<img src="${esc(im)}" alt="" loading="lazy" style="object-position:${esc(p.focus || "50% 50%")}">` : `<span class="aw-ph mono">Images coming</span>`}
        <span class="aw-cap"><span class="mono">${esc(p.discipline)} · ${esc(yearLabel(p))}</span><b>${esc(p.title)}</b><span>${esc(p.summary)}</span></span></a>`; }).join("")}</section>`;
    const lists = `<section class="wrap area-list" aria-label="${esc(a.label)} projects"><div class="pt-grid">${lead.map((p, i) => areaTile(p, i === 0 && a.leadWide)).join("")}${curTile}</div></section>`;
    const more = rest.length ? `<section class="wrap area-else" data-reveal><span class="dot-label">.everything else</span><p>${rest.map((p) => `<a href="${href(p)}">${esc(p.title)}</a>`).join('<span aria-hidden="true">/</span>')}</p></section>` : "";
    const others = S.areas.filter((x) => x !== a);
    return `<main id="main" class="area-page area-${esc(a.key)}">
      ${head}
      ${a.key === "gg" ? wall : lists}
      ${more}
      <section class="wrap area-next" data-reveal>
        <div><span class="dot-label">.keep exploring</span><h2>Want the whole list?</h2><p class="muted">Every project, newest first, with filters and search.</p></div>
        <div class="area-next-links"><a class="btn" href="#archive">Browse the full archive</a>${others.map((x) => `<a class="btn ghost" href="#${esc(x.slug)}">${esc(x.label)}</a>`).join("")}<a class="btn ghost" href="#films"><i class="rec" aria-hidden="true"></i>Films</a></div>
      </section>
    </main>`;
  }

  /* ---------- WORK ---------- */
  function work() {
    const ux = S.uxFeatured.map((id) => byId[id]).filter((p) => p && !p.hidden);
    const used = new Set(ux.map((p) => p.id));
    const groups = [["XR", "Extended reality"], ["Game", "Games"], ["Film", "Film"], ["Visual", "Visual media"], ["Physical", "Physical play"]].map(([d, label]) => {
      const list = ordered.filter((p) => p.discipline === d && !used.has(p.id)); list.forEach((p) => used.add(p.id)); return [label, d, list];
    }).filter(([, , l]) => l.length);
    const moreUx = ordered.filter((p) => !used.has(p.id));
    return `<main id="main">
      <div class="wrap page-head"><span class="label">Work</span><h1>Work.</h1><p class="lead">UX case studies first, then one shelf for every other kind of work.</p></div>
      <div class="wrap"><div class="section-head" data-reveal><div><span class="dot-label">.ux design · case studies</span><h2>UX design.</h2></div></div>${ux.map(featureRow).join("")}</div>
      ${groups.map(([label, d, list]) => `<section class="wrap section" style="padding-bottom:0"><div class="section-head" data-reveal><div><span class="dot-label">.${esc(label.toLowerCase())}</span><h2>${esc(label)}.</h2></div><a class="more" href="#archive" data-facet="discipline" data-value="${d}">In the archive</a></div>
        <div class="grid">${list.map(card).join("")}</div></section>`).join("")}
      ${moreUx.length ? `<section class="wrap section" style="padding-bottom:0"><div class="section-head" data-reveal><div><span class="dot-label">.more ux</span><h2>More UX.</h2></div></div><div class="grid">${moreUx.map(card).join("")}</div></section>` : ""}
    </main>`;
  }

  /* ---------- ARCHIVE ---------- */
  const A = Object.assign({ facet: "discipline", value: "All", q: "", sort: "new", view: "list" }, store.get("archive", {}));
  if (A.view !== "grid") A.view = "list";
  function archive() {
    return `<main id="main">
      <div class="wrap page-head"><span class="label">The archive · since ${S.owner.since}</span><h1>Everything I've made.</h1><p class="lead">Case studies, coursework, client work, experiments and unfinished ideas. Sort it any of four ways.</p></div>
      <div class="toolbar"><div class="wrap">
        <div class="tb-row scroll"><span class="label" style="flex:none">Sort by</span><div class="facet-tabs" role="group" aria-label="Organise by">${Object.entries(S.facets).map(([k, f]) => `<button type="button" data-facet-tab="${k}" aria-pressed="${A.facet === k}">${f.label}</button>`).join("")}</div><span class="tb-div" aria-hidden="true"></span><div class="tb-values" id="values"></div></div>
        <div class="tb-row">
          <label class="sr" for="q">Search the archive</label><input class="search" id="q" type="search" placeholder="Search titles, tools, places" value="${esc(A.q)}">
          <label class="sr" for="sort">Order</label><select class="sort" id="sort"><option value="new">Newest first</option><option value="old">Oldest first</option><option value="az">A to Z</option></select>
          <div class="facet-tabs" role="group" aria-label="View">${[["list", "Index"], ["grid", "Grid"]].map(([k, l]) => `<button type="button" data-view="${k}" aria-pressed="${A.view === k}">${l}</button>`).join("")}</div>
          <span class="count" id="count" aria-live="polite"></span>
        </div>
      </div></div>
      <div class="wrap" style="padding-top:28px"><p class="facet-note" id="facet-note"></p><div id="results"></div></div>
      <div class="hover-preview" id="hp" hidden></div>
    </main>`;
  }
  function archiveFilter() {
    const q = A.q.trim().toLowerCase();
    let list = P.filter((p) => A.value === "All" || p[A.facet] === A.value || (A.facet === "discipline" && (p.also || []).includes(A.value)));
    if (q) list = list.filter((p) => [p.title, p.summary, p.tools, p.context, p.discipline, p.theme, p.year, p.note, p.acc].join(" ").toLowerCase().includes(q));
    const sy = (p) => p.sortYear || 0;
    if (A.sort === "new") list.sort((a, b) => sy(b) - sy(a));
    if (A.sort === "old") list.sort((a, b) => (a.sortYear || 9999) - (b.sortYear || 9999));
    if (A.sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }
  function archiveRender() {
    store.set("archive", A);
    const f = S.facets[A.facet];
    const countFor = (v) => P.filter((p) => p[A.facet] === v || (A.facet === "discipline" && (p.also || []).includes(v))).length;
    $("#values").innerHTML = ["All", ...f.values].map((v) => `<button type="button" class="pill" data-value="${esc(v)}" aria-pressed="${A.value === v}">${esc(v)}</button>`).join("");
    $("#facet-note").textContent = A.value !== "All" && f.notes && f.notes[A.value] ? f.notes[A.value] + "." : "";
    $("#sort").value = A.sort;
    $$("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === A.view)));
    $$("[data-facet-tab]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.facetTab === A.facet)));
    const list = archiveFilter();
    $("#count").textContent = "";
    const R = $("#results");
    if (!list.length) { R.innerHTML = `<p class="empty">Nothing matches “${esc(A.q)}”. Try a title, a tool like Unity, or a place like Jodhpur.</p>`; return; }
    if (A.view === "grid") { R.innerHTML = `<div class="grid">${list.map(card).join("")}</div>`; return; }
    // Index view, grouped by year when sorted by time
    const head = `<div class="list-row list-head" aria-hidden="true"><span class="lr-no">No.</span><span>Title</span><span class="c3">Context</span><span>Year</span><span class="c5">Discipline</span><span class="c6">Depth</span><span></span></div>`;
    const row = (p) => `<a class="list-row" href="${href(p)}" data-id="${p.id}"><span class="mono muted lr-no">${esc(p.acc)}</span><span class="t"><span class="lr-th" aria-hidden="true">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy" style="object-position:${esc(p.focus || "50% 50%")}">` : dicon(p.discipline, 16)}</span><span>${esc(p.title)}</span></span><span class="c3 muted">${esc(p.context)}</span><span class="mono lr-y">${esc(p.year || "—")}</span><span class="c5 muted lr-d">${dicon(p.discipline, 15)}${esc(p.discipline)}</span><span class="c6">${depthChip(p)}</span><span class="lr-go" aria-hidden="true">→</span></a>`;
    if (A.sort === "az") { R.innerHTML = head + list.map(row).join(""); }
    else {
      const groups = [];
      list.forEach((p) => { const g = p.sortYear ? String(p.sortYear) : "Undated"; let last = groups[groups.length - 1]; if (!last || last.g !== g) groups.push(last = { g, items: [] }); last.items.push(p); });
      R.innerHTML = `<div class="year-head"><span></span>${head}</div>` + groups.map((g) => `<section class="year-group"><h2${g.g.length > 4 ? ' class="long"' : ""}>${g.g}</h2><div>${g.items.map(row).join("")}</div></section>`).join("");
    }
    bindPreview(R);
  }
  function bindPreview(R, sel = ".list-row[data-id]") {
    const hp = $("#hp");
    if (!hp || !window.matchMedia("(pointer: fine)").matches) return;
    $$(sel, R).forEach((r) => {
      r.addEventListener("mouseenter", () => { hp.innerHTML = thumb(byId[r.dataset.id]); hp.hidden = false; });
      r.addEventListener("mouseleave", () => { hp.hidden = true; });
      r.addEventListener("mousemove", (e) => { const x = Math.min(e.clientX + 28, innerWidth - 270); hp.style.left = x + "px"; hp.style.top = Math.max(70, Math.min(e.clientY - 120, innerHeight - 270)) + "px"; });
    });
  }

  /* ---------- ASK: type what you need, get the projects that fit ---------- */
  const ASK_EXAMPLES = ["an XR designer for a training app", "UX research in healthcare", "someone to edit a 360° film", "game and world design", "branding for a food startup", "a designer for an e-commerce app"];
  const ASK_CHIPS = [["UX for healthcare", "ux healthcare"], ["VR and spatial", "vr spatial"], ["Games", "game design"], ["Film", "film video editing"], ["Branding", "branding visual"]];
  function askBox(value = "", compact = false) {
    return `<form class="ask${compact ? " compact" : ""}" role="search" data-ask>
      <label class="ask-l" for="ask-q"><span class="dot-label">.ask</span><span>${compact ? "Try something else" : `Tell me what you need from ${esc(S.owner.name.split(" ")[0])}`}</span></label>
      <div class="ask-box"><input id="ask-q" name="q" type="text" value="${esc(value)}" placeholder="e.g. ${esc(ASK_EXAMPLES[0])}" autocomplete="off" enterkeyhint="go"><button class="btn" type="submit">Show me</button></div>
      ${compact ? "" : `<div class="ask-chips">${ASK_CHIPS.map(([l, q]) => `<button type="button" class="pill" data-ask-chip="${esc(q)}">${esc(l)}</button>`).join("")}</div>`}
    </form>`;
  }
  // Words people type, mapped to the ways the archive is organised
  const INTENTS = [
    { label: "UX and product design", f: ["discipline", "UX"], page: "ux-design", w: ["ux", "ui", "user experience", "user interface", "app", "apps", "mobile", "web", "website", "product", "interaction", "figma", "prototype", "prototyping", "wireframe", "usability", "dashboard", "saas", "screens", "flows"] },
    { label: "XR and spatial design", f: ["discipline", "XR"], page: "xr-design", w: ["xr", "vr", "ar", "mr", "virtual reality", "augmented", "mixed reality", "spatial", "immersive", "headset", "quest", "vision pro", "metaverse", "3d", "360", "hand tracking"] },
    { label: "Games", f: ["discipline", "Game"], page: "graphics-and-games", w: ["game", "games", "gaming", "gameplay", "level design", "play", "unity", "board game", "combat"] },
    { label: "Film and video", f: ["discipline", "Film"], page: "films", w: ["film", "films", "video", "videos", "edit", "editing", "editor", "cinematography", "documentary", "travel", "youtube", "shoot", "camera", "premiere", "after effects", "vfx", "trailer", "filmmaker", "movie"] },
    { label: "Visual design", f: ["discipline", "Visual"], page: "graphics-and-games", w: ["graphic", "graphics", "branding", "brand", "logo", "poster", "packaging", "visual", "illustration", "social media", "marketing", "campaign", "identity", "concept art", "worldbuilding", "environment", "food", "kitchen"] },
    { label: "Physical and play", f: ["discipline", "Physical"], w: ["physical", "industrial", "hardware", "arduino", "ergonomics", "board", "space", "toy", "kids"] },
    { label: "Healthcare and access", f: ["theme", "Care and access"], w: ["health", "healthcare", "medical", "hospital", "patient", "patients", "care", "accessibility", "accessible", "inclusive", "colour blind", "color blind", "oncology", "doctor", "wellness", "fitness"] },
    { label: "Systems and commerce", f: ["theme", "Systems and commerce"], w: ["ecommerce", "e-commerce", "shopping", "retail", "commerce", "manufacturing", "textile", "supply chain", "inventory", "erp", "b2b", "enterprise", "operations", "fashion", "store", "startup"] },
    { label: "Research", page: "writing", w: ["research", "researcher", "paper", "publication", "academic", "thesis", "study", "interviews", "survey", "insights"] },
    { label: "Hiring", page: "resume", w: ["hire", "hiring", "freelance", "available", "contact", "email", "collaborate", "job", "full time", "full-time", "resume", "cv", "experience"] }
  ];
  const STOP = new Set("a an the for and or of to in on with who can i im me my we our you your need needs want wants looking look someone somebody designer designers design designing project projects work works show some like something do does has have good great at is are be from srijith his him any about that this it as by into".split(" "));
  const askSlug = (q) => q.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  let askQ = "";
  try { askQ = sessionStorage.getItem("ask-q") || ""; } catch (e) { /* private window */ }
  let askIndex = null;
  function askMatch(q) {
    const norm = " " + q.toLowerCase().replace(/[^a-z0-9+°\- ]+/g, " ").replace(/\s+/g, " ") + " ";
    const hit = INTENTS.filter((it) => it.w.some((w) => norm.includes(" " + w + " ") || norm.includes(" " + w + "s ")));
    const terms = norm.trim().split(" ").filter((t) => t.length > 1 && !STOP.has(t));
    if (!askIndex) askIndex = Object.fromEntries(P.map((p) => { const c = S.caseStudies[p.id] || {}; return [p.id, (" " + [p.title, p.summary, p.outcome, p.tools, p.context, p.note, p.role, p.discipline, (p.also || []).join(" "), p.theme, c.headline, c.subhead].join(" ").toLowerCase().replace(/[^a-z0-9+° ]+/g, " ") + " ")]; }));
    // The need mentioned first counts most: "an XR designer for a healthcare app" is about XR first.
    const pos = (it) => Math.min(...it.w.map((w) => { const i = norm.indexOf(" " + w); return i < 0 ? 1e9 : i; }));
    hit.sort((a, b) => pos(a) - pos(b));
    const scored = P.map((p) => {
      let sc = 0, n = 0;
      hit.forEach((it, i) => { if (!it.f) return; const wt = 3 * Math.pow(0.8, i); const [k, v] = it.f; if (p[k] === v) { sc += wt; n++; } else if (k === "discipline" && (p.also || []).includes(v)) { sc += wt / 2; n++; } });
      if (n > 1) sc += n - 1;
      terms.forEach((t) => { if (askIndex[p.id].includes(" " + t)) sc += 1; if (t.length > 3 && p.title.toLowerCase().includes(t)) sc += 1.5; });
      if (sc > 0) sc += isCase(p) ? 0.6 : p.depth === "Entry" ? 0.3 : 0;
      return { p, sc };
    }).filter((x) => x.sc > 0).sort((a, b) => b.sc - a.sc);
    return { hit, list: scored.map((x) => x.p) };
  }
  function forPage(slug) {
    const q = askQ && askSlug(askQ) === slug ? askQ : slug.replace(/-/g, " ");
    const { hit, list } = askMatch(q);
    const top = list.slice(0, 3), more = list.slice(3, 12);
    const fallback = !list.length ? S.uxFeatured.map((id) => byId[id]).filter(Boolean) : [];
    const pages = [...new Set(hit.map((h) => h.page).filter(Boolean))];
    const PG = { "ux-design": ["UX Design", "Every UX project, case studies first."], "xr-design": ["XR Design", "Products, games and films for headsets."], "graphics-and-games": ["Graphics and Games", "Worlds, games and visual work, image first."], films: ["Films", "Travel films and 360° work, played on a DVD player."], writing: ["Writing", "The ICoRD 2027 paper and research notes."], resume: ["Résumé", "Experience, education and skills on one page."] };
    return `<main id="main">
      <div class="wrap page-head for-head"><span class="dot-label">.matched for you</span>
        <h1>For “${esc(q)}”.</h1>
        <p class="lead">${list.length ? `${list.length} ${list.length === 1 ? "project fits" : "projects fit"}${hit.length ? `, matched on ${hit.map((h) => `<b>${esc(h.label.toLowerCase())}</b>`).join(", ")}` : ""}. The closest first.` : "Nothing in the archive matches those words exactly, so here's where I'd start."}</p>
        ${askBox(q, true)}
      </div>
      <section class="wrap">${(list.length ? top : fallback).map(featureRow).join("")}</section>
      ${more.length ? `<section class="section wrap" aria-labelledby="fm-h" style="padding-bottom:0"><div class="section-head"><h2 id="fm-h">Also relevant.</h2><a class="more" href="#archive">Full archive</a></div><div class="grid">${more.map(card).join("")}</div></section>` : ""}
      ${pages.length ? `<section class="section wrap" style="padding-bottom:0" aria-label="Pages that fit"><div class="for-pages">${pages.map((k) => `<a class="for-page" href="#${k}"><span class="label">${esc(PG[k][0])}</span><span>${esc(PG[k][1])}</span><span class="more">Open</span></a>`).join("")}</div></section>` : ""}
      <div style="margin-top:var(--section)">${contactBlock()}</div>
    </main>`;
  }
  function askHero() {
    return `<form class="ask ask-hero ask-mini" role="search" data-ask>
      <label for="ask-q" class="am-l mono"><i class="ah-dot" aria-hidden="true"></i>Looking for something specific?</label>
      <div class="ask-box"><input id="ask-q" name="q" type="text" placeholder="e.g. ${esc(ASK_EXAMPLES[0])}" autocomplete="off" enterkeyhint="go"><button class="btn" type="submit">Show me</button></div>
      <div class="ask-chips">${ASK_CHIPS.map(([l, q]) => `<button type="button" class="pill" data-ask-chip="${esc(q)}">${esc(l)}</button>`).join("")}</div>
    </form>`;
  }
  /* ---- Pixel art: little bitmaps drawn as SVG squares ---- */
  const PXI = {
    UX: [".#####.", ".#...#.", ".#...#.", ".#...#.", ".#...#.", ".#...#.", ".#####.", ".##.##.", ".#####."],
    XR: ["###########", "#.........#", "#.###.###.#", "#.###.###.#", "#....#....#", "#####.#####"],
    Game: [".#########.", "##.#####.##", "#...###.#.#", "##.#####.##", "####...####", ".##.....##."],
    Film: ["..##.##....", ".#..#..#...", "########.##", "#......####", "#......####", "#......#.##", "########..."],
    Visual: ["#########", "#.......#", "#.##....#", "#.##..#.#", "#....####", "#..######", "#########"],
    Research: [".####...", "#....#..", "#....#..", "#....#..", ".####...", "....##..", ".....##.", "......##"],
    Star: ["..#..", "..#..", "#####", "..#..", "..#.."],
    Cursor: ["#.....", "##....", "#.#...", "#..#..", "#...#.", "#..###", "#.#...", "##....", "#....."],
    Heart: [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."],
    Disc: ["..###..", ".#...#.", "#..#..#", "#.#.#.#", "#..#..#", ".#...#.", "..###.."]
  };
  const pxIcon = (k, cls = "") => { const m = PXI[k] || PXI.Star, w = m[0].length, h = m.length; let r = ""; m.forEach((row, y) => [...row].forEach((c, x) => { if (c === "#") r += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`; })); return `<svg class="px${cls ? " " + cls : ""}" viewBox="0 0 ${w} ${h}" width="${w * 2.4}" height="${h * 2.4}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${r}</svg>`; };
  // Small pixel sprites that drift around the hero and lean with the pointer
  function heroSprites() {
    const s = [["XR", 47, 9, 0], ["Game", 55, 74, 1], ["Star", 51, 44, 2], ["Film", 3, 84, 3], ["Cursor", 59, 22, 4], ["Heart", 40, 93, 5], ["Disc", 93, 62, 6], ["Star", 96, 10, 7]];
    return `<div class="hero-sprites" aria-hidden="true">${s.map(([k, x, y, i]) => `<span class="hs-s" style="--x:${x}%;--y:${y}%;--i:${i}">${pxIcon(k)}</span>`).join("")}</div>`;
  }
  /* ---- Pixel fields: an image or a line of text, drawn as squares that fly in and move away from the pointer ---- */
  const PIX_PAL = { light: ["#071B3A", "#0D3A80", "#1E5FC0", "#3F82E6", "#7FB1F5", "#BFD7F8"], dark: ["#10203A", "#17407A", "#2662B8", "#3E86EE", "#86B9FF", "#DCEBFF"], ink: ["#123a78", "#1F6FD6", "#3E86EE", "#6FAEFF", "#B6D6FF", "#F4F7FB"] };
  const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  function pixelField(cv, src, o = {}) {
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let parts = [], W = 0, H = 0, cell = 8, raf = 0, t0 = 0, mx = -9999, my = -9999, live = true, visible = true, burst = 0;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const pal = () => o.palette ? PIX_PAL[o.palette] : PIX_PAL[(document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark" ? "dark" : "light"];
    const build = () => {
      W = cv.clientWidth; H = cv.clientHeight; if (!W || !H) return false;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = Math.max(3, Math.round(o.cell ? o.cell(W, H) : W / (o.cols || 60)));
      const cols = Math.floor(W / cell), rows = Math.floor(H / cell), off = document.createElement("canvas"); off.width = cols; off.height = rows;
      const oc = off.getContext("2d", { willReadFrequently: true });
      if (src.text) { oc.fillStyle = "#fff"; oc.textBaseline = "middle"; let fs = rows * 0.92; oc.font = `700 ${fs}px ${src.font || "Inter Tight, Inter, sans-serif"}`; const tw = oc.measureText(src.text).width; if (tw > cols * 0.98) { fs *= (cols * 0.98) / tw; oc.font = `700 ${fs}px ${src.font || "Inter Tight, Inter, sans-serif"}`; } oc.fillText(src.text, Math.max(0, (cols - oc.measureText(src.text).width) / 2), rows / 2 + fs * 0.04); }
      else { const c = o.crop || [0, 0, src.naturalWidth, src.naturalHeight], ir = c[2] / c[3], h2 = rows, w2 = h2 * ir; oc.drawImage(src, c[0], c[1], c[2], c[3], (cols - w2) / 2, 0, w2, h2); }
      const d = oc.getImageData(0, 0, cols, rows).data, P = pal(), n = P.length;
      const old = parts; parts = [];
      // spread the picture's tones evenly across the palette (histogram equalisation), so the face reads
      const L = (i) => (0.3 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2]) / 255, cdf = new Float32Array(256);
      if (!src.text) { let tot = 0; for (let i = 0; i < d.length; i += 4) if (d[i + 3] >= 120) { cdf[Math.min(255, (L(i) * 255) | 0)]++; tot++; } let acc = 0; for (let k = 0; k < 256; k++) { acc += cdf[k]; cdf[k] = acc / Math.max(1, tot); } }
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4; if (d[i + 3] < 120) continue;
        const lum = src.text ? 0.55 + 0.45 * ((x * 7 + y * 3) % 11) / 10 : cdf[Math.min(255, (L(i) * 255) | 0)];
        const v = lum * (n - 1) + (BAYER[y % 4][x % 4] / 16 - 0.5) * 0.9;
        const c = Math.max(0, Math.min(n - 1, Math.round(v)));
        const hx = x * cell, hy = y * cell;
        parts.push({ hx, hy, x: reduced ? hx : hx + (Math.random() - 0.5) * W * 0.9, y: reduced ? hy : hy + H * (0.3 + Math.random() * 0.7), vx: 0, vy: 0, c, d: reduced ? 0 : ((rows - y) / rows) * 700 + Math.random() * 420 });
      }
      if (old.length && o.keep) parts.forEach((p, k) => { const q = old[k]; if (q) { p.x = q.x; p.y = q.y; p.d = 0; } });
      t0 = performance.now(); return true;
    };
    const draw = (now) => {
      raf = 0; if (!cv.isConnected) return;
      const t = now - t0, P = pal(), g = cell > 5 ? 1 : 0.5, R = o.radius || 70, R2 = R * R;
      ctx.clearRect(0, 0, W, H); let moving = false;
      const byC = P.map(() => []);
      for (const p of parts) {
        if (t < p.d) { moving = true; continue; }
        let ax = (p.hx - p.x) * 0.075, ay = (p.hy - p.y) * 0.075;
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < R2) { const dd = Math.sqrt(d2) || 1, f = (1 - dd / R) * (o.force || 9); ax += (dx / dd) * f; ay += (dy / dd) * f; }
        if (burst) { const bx = p.x - burst.x, by = p.y - burst.y, bd = Math.hypot(bx, by) || 1; if (bd < 240) { const f = (1 - bd / 240) * 26; ax += (bx / bd) * f; ay += (by / bd) * f - 6; } }
        p.vx = (p.vx + ax) * 0.78; p.vy = (p.vy + ay) * 0.78; p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.02 || Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y) > 0.3) moving = true;
        byC[p.c].push(p);
      }
      burst = 0;
      byC.forEach((arr, c) => { if (!arr.length) return; ctx.fillStyle = P[c]; for (const p of arr) ctx.fillRect(p.x, p.y, cell - g, cell - g); });
      if ((moving || mx > -999) && visible) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf && live) raf = requestAnimationFrame(draw); };
    const host = o.host || cv;
    const mv = (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; kick(); };
    const lv = () => { mx = my = -9999; kick(); };
    host.addEventListener("pointermove", mv); host.addEventListener("pointerleave", lv);
    const re = () => { if (build()) kick(); };
    const th = () => kick();
    let rt; const rs = () => { clearTimeout(rt); rt = setTimeout(() => { o.keep = true; re(); }, 160); };
    addEventListener("resize", rs); document.addEventListener("themechange", th);
    const mq = matchMedia("(prefers-color-scheme: dark)"); mq.addEventListener && mq.addEventListener("change", th);
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }) : null; io && io.observe(cv);
    cleanup.push(() => { live = false; cancelAnimationFrame(raf); removeEventListener("resize", rs); document.removeEventListener("themechange", th); mq.removeEventListener && mq.removeEventListener("change", th); io && io.disconnect(); host.removeEventListener("pointermove", mv); host.removeEventListener("pointerleave", lv); });
    re();
    return { burst: (x, y) => { burst = { x, y }; kick(); } };
  }
  // The footer: my name in pixels that scatter from the pointer, a little walker that follows it, and Bengaluru's time
  function footerFx() {
    const st = $("[data-ft]"); if (!st) return;
    const cv = $(".ft-name", st), wk = $(".ft-walker", st), bub = $(".ft-bubble", st), clock = $("[data-clock]");
    let pf = null;
    const start = () => { if (!pf && cv.clientWidth) pf = pixelField(cv, { text: S.owner.name.toUpperCase() }, { palette: "ink", cell: (W) => Math.max(5, Math.round(W / 150)), radius: 90, force: 12, host: st }); };
    if ("IntersectionObserver" in window) { const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { start(); io.disconnect(); } }, { rootMargin: "200px" }); io.observe(st); cleanup.push(() => io.disconnect()); } else start();
    const tick = () => { if (!clock.isConnected) return; try { clock.textContent = "Bengaluru " + new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date()) + " IST"; } catch (e) { clock.textContent = "Bengaluru, India"; } };
    tick(); const ct = setInterval(tick, 20000); cleanup.push(() => clearInterval(ct));
    if (reduced) return;
    let x = 40, tx = 40, raf = 0, idle = 0, last = performance.now(), on = false;
    const say = ["hi!", "hello", "↑ that's me", "nice cursor", "boop", "see the films?"];
    const loop = (now) => {
      raf = requestAnimationFrame(loop); const dt = Math.min(50, now - last); last = now; if (!on) return;
      const W = st.clientWidth - 40, d = tx - x;
      if (Math.abs(d) > 2) { x += Math.sign(d) * Math.min(Math.abs(d), dt * 0.16); wk.classList.add("walk"); wk.classList.toggle("left", d < 0); idle = 0; }
      else { wk.classList.remove("walk"); idle += dt; if (idle > 3200) { tx = 20 + Math.random() * (W - 20); idle = 0; } }
      wk.style.transform = `translateX(${Math.max(0, Math.min(W, x)).toFixed(1)}px)`;
    };
    const io2 = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => { on = en.isIntersecting; }) : null; io2 ? io2.observe(st) : (on = true);
    st.addEventListener("pointermove", (e) => { const r = st.getBoundingClientRect(); tx = e.clientX - r.left - 16; });
    st.addEventListener("click", (e) => {
      wk.classList.remove("jump"); void wk.offsetWidth; wk.classList.add("jump"); haptic("tap");
      const r = cv.getBoundingClientRect(); if (pf) pf.burst(e.clientX - r.left, e.clientY - r.top);
      bub.textContent = say[(Math.random() * say.length) | 0]; bub.classList.remove("on"); void bub.offsetWidth; bub.classList.add("on");
    });
    raf = requestAnimationFrame(loop);
    cleanup.push(() => { cancelAnimationFrame(raf); io2 && io2.disconnect(); });
  }
  function pixelMe() {
    const cv = $("canvas[data-pix]"); if (!cv) return;
    const im = new Image(); im.onload = () => pixelField(cv, im, { cols: 62, radius: 62, crop: [60, 0, 640, 570], host: $("#orbit") || cv }); im.src = cv.dataset.pix;
    const hero = $(".hero"); if (!hero || reduced || !matchMedia("(pointer: fine)").matches) return;
    const mv = (e) => { const r = hero.getBoundingClientRect(); hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3)); hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3)); };
    hero.addEventListener("pointermove", mv);
  }
  function askCycle() {
    const inp = $("#ask-q");
    if (!inp || reduced || inp.value) return;
    let i = 0;
    const t = setInterval(() => { if (document.activeElement === inp || inp.value) return; i = (i + 1) % ASK_EXAMPLES.length; inp.placeholder = "e.g. " + ASK_EXAMPLES[i]; }, 3200);
    cleanup.push(() => clearInterval(t));
  }

  /* ---------- PROJECT PAGES ---------- */
  function neighbours(p) {
    const i = ordered.indexOf(p);
    return [ordered[(i - 1 + ordered.length) % ordered.length], ordered[(i + 1) % ordered.length]];
  }
  function pager(p) {
    const [prev, next] = neighbours(p);
    return `<div class="wrap"><nav class="pager" aria-label="More projects"><a href="${href(prev)}"><span class="label">← Previous</span><b>${esc(prev.title)}</b></a><a href="${href(next)}"><span class="label">Next →</span><b>${esc(next.title)}</b></a></nav></div>`;
  }
  function glanceRows(p) {
    return [["Role", p.role], ["Timeline", p.year], ["Duration", p.duration], ["Context", p.context + (p.note ? " · " + p.note : "")], ["Guided by", p.guide], ["Team", p.team], ["Tools", p.tools], ["Status", p.status]]
      .filter(([, v]) => v).map(([l, v]) => `<div><span class="label">${l}</span><span class="v">${esc(v)}</span></div>`).join("");
  }
  function project(id) {
    const p = byId[id];
    if (!p || p.hidden) return notFound();
    if (isCase(p) && S.caseStudies[p.id]) return caseStudy(p, S.caseStudies[p.id]);
    if (p.depth === "Glimpse") return glimpse(p);
    return entry(p);
  }
  function figure(f, p) {
    if (!f) return "";
    const src = typeof f === "object" ? f.src : "";
    const cap = typeof f === "object" ? f.caption : f;
    return `<figure class="figure wide" data-reveal><div class="wrap">${cover(p, { src: src || "", label: "Figure to come", title: cap, alt: cap, natural: !!src })}<figcaption>${esc(cap)}</figcaption></div></figure>`;
  }
  /* Building blocks for long case studies */
  function block(b, p) {
    const img = (f) => `<img src="${esc(f.src)}" alt="${esc(f.caption || p.title)}" loading="lazy">`;
    const fig = (f, cls = "") => `<figure class="bfig${cls}" data-reveal>${f.zoom ? `<a class="zoom" href="${esc(f.zoom)}" target="_blank" rel="noopener">${img(f)}</a>` : img(f)}${f.caption || f.zoom ? `<figcaption>${esc(f.caption || "")}${f.zoom ? ` <a class="more" href="${esc(f.zoom)}" target="_blank" rel="noopener">Open full size</a>` : ""}</figcaption>` : ""}</figure>`;
    const head = b.title ? `<h3 class="blk-h">${esc(b.title)}</h3>` : "";
    if (b.type === "text") return `<div class="blk blk-text">${head}${b.paras.map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
    if (b.type === "images") return `<div class="blk wide"><div class="wrap"><div class="figs ${b.layout === "masonry" || b.layout === "phones" ? b.layout : "n" + Math.min(b.items.length, 4)}">${b.items.map((f) => fig(f)).join("")}</div></div></div>`;
    if (b.type === "chips") return `<div class="blk blk-text">${head}<div class="theme-chips">${b.items.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>`;
    if (b.type === "causes") return `<div class="blk wide"><div class="wrap">${head}<div class="causes">${b.items.map((x, i) => `<div data-reveal><span class="mono">${pad2(i + 1)}</span><h4>${esc(x.title)}</h4><p>${esc(x.text)}</p></div>`).join("")}</div></div></div>`;
    if (b.type === "voices") return `<div class="blk wide band voices-band"><div class="wrap">${head}<div class="voices">${b.items.map((v) => `<figure data-reveal><blockquote>${esc(v.text)}</blockquote><figcaption>${esc(v.who)}</figcaption></figure>`).join("")}</div></div></div>`;
    if (b.type === "insights") return `<div class="blk wide"><div class="wrap">${head}<ol class="insights">${b.items.map((x, i) => `<li data-reveal><span class="ins-n">${pad2(i + 1)}</span><p>${esc(x)}</p></li>`).join("")}</ol></div></div>`;
    if (b.type === "hmw") return `<div class="blk wide"><div class="wrap hmw">
      <div class="hmw-top"><div><span class="label">Chosen action</span><p>${esc(b.chosen)}</p></div><div><span class="label">Why</span><p>${esc(b.why)}</p></div></div>
      <p class="hmw-st">${b.statement.map((x) => x.hl ? `<mark class="h${x.hl}">${esc(x.t)}</mark>` : esc(x.t)).join("")}</p>
      ${b.image ? fig(b.image, " hmw-img") : ""}</div></div>`;
    if (b.type === "scamper") return `<div class="blk wide"><div class="wrap"><div class="scamper">${b.items.map((x) => `<article class="sc" data-reveal><div class="sc-head"><span class="sc-l">${esc(x.l)}</span><div><h4>${esc(x.w)}</h4><p class="muted">${esc(x.d)}</p></div></div>${x.img ? `<img src="${esc(x.img)}" alt="SCAMPER: ${esc(x.w)} sketches" loading="lazy">` : ""}<p>${esc(x.t)}</p></article>`).join("")}</div></div></div>`;
    // Product screens, one per row, full width: a label, a title and a line, then the screen.
    // states = several versions of one screen behind tabs; panels = a strip of detail panels under it.
    if (b.type === "screens") return `<div class="blk wide"><div class="wrap ws-list">${b.items.map((x, n) => {
      const shots = x.states || [{ label: "", img: x.img }];
      return `<article class="ws" data-reveal>
        <div class="ws-t"><div><span class="ws-l"><b>${String(n + 1).padStart(2, "0")}</b>${esc(x.label)}</span><h4>${esc(x.title)}</h4></div><p>${esc(x.text)}</p></div>
        <div class="ws-frame${x.plain ? " plain" : ""}"${x.states ? " data-states" : ""}>
          ${x.states ? `<div class="ws-tabs" role="tablist" aria-label="${esc(x.label)}: pick one">${shots.map((st, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-state="${i}">${esc(st.label)}</button>`).join("")}</div>` : ""}
          ${x.states || !x.img ? `<div class="ws-media">` : `<a class="ws-media zoom" href="${esc(x.img)}" target="_blank" rel="noopener" title="Open full size">`}${shots.map((st, i) => st.img ? `<img src="${esc(st.img)}" alt="${esc(x.title)}${st.label ? ` (${esc(st.label)} selected)` : ""}" loading="lazy" class="${i === 0 ? "on" : ""}"${i ? ' aria-hidden="true"' : ""}>` : `<span class="ws-ph${i === 0 ? " on" : ""}"><span class="mono">Screen to come</span>${esc(x.title)}</span>`).join("")}${x.states || !x.img ? "</div>" : "</a>"}
        </div>
        ${x.panels ? `<figure class="ws-panels"><img src="${esc(x.panels.src)}" alt="${esc(x.panels.caption)}" loading="lazy"><figcaption>${esc(x.panels.caption)}</figcaption></figure>` : ""}
      </article>`;
    }).join("")}</div></div>`;
    // Cards of bullet points: a SWOT, a competitor comparison
    if (b.type === "lists") return `<div class="blk wide"><div class="wrap">${head}<div class="ls-grid n${Math.min(b.items.length, 4)}">${b.items.map((x) => `<section class="ls-card${x.tone ? " " + esc(x.tone) : ""}" data-reveal><h4>${x.tag ? `<span class="ls-tag">${esc(x.tag)}</span>` : ""}${esc(x.title)}</h4><ul>${x.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></section>`).join("")}</div></div></div>`;
    // Survey answers as horizontal bars. approx = values read off a chart; multi = more than one answer allowed
    if (b.type === "survey") return `<div class="blk wide"><div class="wrap">${head}${b.note ? `<p class="sv-note">${esc(b.note)}</p>` : ""}<div class="sv-grid">${b.items.map((q) => { const max = Math.max(...q.rows.map((r) => r.v)); return `<figure class="sv-q" data-reveal><figcaption>${esc(q.q)}${q.multi ? ' <span class="sv-multi">more than one answer</span>' : ""}</figcaption><ul>${q.rows.map((r) => `<li class="${r.v === max ? "top" : ""}"><span class="sv-l">${esc(r.l)}</span><span class="sv-bar"><i style="--w:${r.v}%"></i></span><span class="sv-v">${q.approx ? "≈" : ""}${esc(String(r.v))}%</span></li>`).join("")}</ul></figure>`; }).join("")}</div></div></div>`;
    // Persona cards: who they are, in their words, and what they want and hate
    if (b.type === "personas") return `<div class="blk wide"><div class="wrap">${head}<div class="pe-grid${b.items.some((x) => x.img) ? " pe-photo" : ""}">${b.items.map((x) => `<article class="pe-card${x.img ? " has-img" : ""}" data-reveal>
        ${x.img ? `<figure class="pe-img"><img src="${esc(x.img)}" alt="${esc(x.name)}" loading="lazy"><figcaption><b>${esc(x.name)}</b><span>${esc(x.role || "")}</span></figcaption></figure>` : ""}
        <header>${x.img ? "" : `<span class="pe-av" aria-hidden="true">${esc(x.name.slice(0, 1))}</span>`}<div>${x.img ? "" : `<h4>${esc(x.name)}</h4>`}<p>${esc(x.meta)}</p>${x.bio ? `<p class="pe-bio">${esc(x.bio)}</p>` : ""}</div></header>
        <blockquote>${esc(x.quote)}</blockquote>
        <div class="pe-cols">${(x.groups || []).map((g) => `<div><span class="pe-h">${esc(g.title)}</span><ul>${g.points.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div>
        ${x.skills ? `<div class="pe-skills"><span class="pe-h">Skills</span>${x.skills.map((k) => `<span class="pill">${esc(k)}</span>`).join("")}</div>` : ""}
      </article>`).join("")}</div></div></div>`;
    // Big survey numbers with a line of meaning under each
    if (b.type === "stats") return `<div class="blk wide"><div class="wrap">${head}<div class="stats">${b.items.map((x) => `<div class="stat" data-reveal><span class="st-n">${esc(x.n)}</span><h4>${esc(x.l)}</h4>${x.t ? `<p>${esc(x.t)}</p>` : ""}</div>`).join("")}</div></div></div>`;
    // A plain table, scrolling sideways on narrow screens
    if (b.type === "table") {
      const MK = { "✓": ["ok", "Yes"], "✕": ["no", "No"], "~": ["part", "Partly"] };
      const cell = (c) => MK[c] ? `<span class="mk ${MK[c][0]}" role="img" aria-label="${MK[c][1]}">${c}</span>` : esc(c);
      const hc = (i) => (b.hl === i ? ' class="thl"' : "");
      const marks = b.rows.some((r) => r.some((c) => MK[c]));
      return `<div class="blk wide"><div class="wrap">${head}<div class="tbl-wrap" data-reveal><table class="tbl${marks ? " marks" : ""}"><thead><tr>${b.cols.map((c, i) => `<th scope="col"${hc(i)}>${esc(c)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td${hc(i)}>${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${b.note ? `<p class="tbl-note">${esc(b.note)}</p>` : ""}</div></div>`;
    }
    // Image beside text, alternating sides
    if (b.type === "split") return `<div class="blk wide"><div class="wrap pairs">${b.items.map((x) => `<article class="pair" data-reveal><figure>${x.img ? `<img src="${esc(x.img)}" alt="${esc(x.title)}" loading="lazy">` : ""}</figure><div class="pair-t"><h4>${esc(x.title)}</h4><p>${esc(x.text)}</p></div></article>`).join("")}</div></div>`;
    // Device walkthrough: the phone (or laptop, watch, tablet) stays put while each scroll brings the next screen
    if (b.type === "story") {
      const n = b.steps.length, dev = b.device || "phone";
      return `<div class="blk wide pin story-b" data-pin="story" style="--n:${n}"><div class="pin-in"><div class="wrap sb-stage">
        <div class="sb-text">${b.title ? `<span class="label sb-k">${esc(b.title)}</span>` : ""}
          <div class="sb-steps">${b.steps.map((x, i) => `<div class="sb-step${i ? "" : " on"}" data-i="${i}"><span class="mono">${pad2(i + 1)}${x.label ? ` · ${esc(x.label)}` : ""}</span><h4>${esc(x.title)}</h4>${x.text ? `<p>${esc(x.text)}</p>` : ""}</div>`).join("")}</div>
          <div class="sb-rail" role="group" aria-label="Steps">${b.steps.map((x, i) => `<button type="button" class="${i ? "" : "on"}" data-sb="${i}" aria-label="Step ${i + 1}: ${esc(x.title)}"><i></i></button>`).join("")}</div></div>
        <div class="sb-devwrap"><div class="dev dev-${dev}"><div class="dev-screen">${b.steps.map((x, i) => `<div class="sb-scr${i ? "" : " on"}" data-i="${i}">${pic(x.img, x.title, "screen")}</div>`).join("")}</div></div></div>
      </div></div></div>`;
    }
    // Cards scroll in and stack up; once they're all down, the title arrives
    if (b.type === "stack") {
      const n = b.items.length;
      return `<div class="blk wide pin stack-b" data-pin="stack" style="--n:${n}"><div class="pin-in"><div class="wrap stk-stage">
        <div class="stk-cards">${b.items.map((x, i) => `<article class="stk-card" style="--i:${i}">${x.img !== undefined ? `<div class="stk-media">${pic(x.img, x.title, x.kind || "visual")}</div>` : ""}<div class="stk-body"><span class="mono">${pad2(i + 1)}${x.tag ? ` · ${esc(x.tag)}` : ""}</span><h4>${esc(x.title)}</h4>${x.text ? `<p>${esc(x.text)}</p>` : ""}</div></article>`).join("")}</div>
        <div class="stk-title">${b.kicker ? `<span class="label">${esc(b.kicker)}</span>` : ""}<h3>${esc(b.title || "")}</h3>${b.text ? `<p>${esc(b.text)}</p>` : ""}</div>
      </div></div></div>`;
    }
    // A statement that lights up word by word as you read down; *starred* words take the accent
    if (b.type === "words") {
      let k = 0;
      const html = esc(b.text).split(/(\*[^*]+\*)/).map((part) => { const hl = /^\*[^*]+\*$/.test(part); return part.replace(/\*/g, "").split(/\s+/).filter(Boolean).map((w) => `<span class="w${hl ? " wa" : ""}" style="--k:${k++}">${w}</span>`).join(" "); }).join(" ");
      return `<div class="blk wide words-b" data-scrub="words"><div class="wrap">${b.kicker ? `<span class="label">${esc(b.kicker)}</span>` : ""}<p class="wd-text" style="--n:${k}">${html}</p>${b.by ? `<span class="wd-by mono">${esc(b.by)}</span>` : ""}</div></div>`;
    }
    if (b.type === "chart") { const list = b.charts || [b]; return `<div class="blk wide"><div class="wrap">${head}<div class="ch-set n${list.length}">${list.map(chart).join("")}</div></div></div>`; }
    // A row of pictures that slides sideways while you scroll down
    if (b.type === "hscroll") return `<div class="blk wide pin hs-b" data-pin="hscroll"><div class="pin-in"><div class="wrap hs-head">${head || "<span></span>"}<span class="hs-count mono">01</span></div>
      <div class="hs-track">${b.items.map((x, i) => `<figure class="hs-item" style="--ar:${esc(x.ar || "4 / 3")}"><div class="hs-media">${pic(x.src, x.caption || p.title, x.kind || "visual")}</div>${x.caption ? `<figcaption><span class="mono">${pad2(i + 1)}</span>${esc(x.caption)}</figcaption>` : ""}</figure>`).join("")}</div>
      <div class="wrap"><div class="hs-bar"><i></i></div></div></div></div>`;
    // Before and after, with a handle to drag between them
    if (b.type === "compare") {
      const side = (x, cls) => `<div class="${cls}"${x.filter ? ` style="filter:url(#cb-${esc(x.filter)})"` : ""}>${pic(x.src, x.label, x.kind || "visual")}</div>`;
      return `<div class="blk wide"><div class="wrap">${head}<figure class="cmp" data-cmp style="--x:50%;--ar:${esc(b.ar || "16 / 10")}">${side(b.after, "cmp-b")}${side(b.before, "cmp-a")}
        <span class="cmp-l l mono">${esc(b.before.label)}</span><span class="cmp-l r mono">${esc(b.after.label)}</span><span class="cmp-h" aria-hidden="true"><i></i></span>
        <input type="range" class="cmp-r" min="0" max="100" value="50" aria-label="Slide between ${esc(b.before.label)} and ${esc(b.after.label)}"></figure>${b.caption ? `<p class="blk-cap">${esc(b.caption)}</p>` : ""}</div></div>`;
    }
    // Panels hang on an arc around you, the way they would in a headset; scrolling turns your head
    if (b.type === "holo") {
      const n = b.items.length;
      return `<div class="blk wide pin holo-b" data-pin="holo" style="--n:${n}"><div class="pin-in"><div class="holo-stage">
        <div class="wrap holo-hud mono" aria-hidden="true"><span>${esc(b.title || "Spatial view")}</span><span class="hh-i">01</span><span class="hh-y">YAW +000°</span></div>
        <div class="holo-ring">${b.items.map((x, i) => `<figure class="holo-p${i ? "" : " on"}" style="--i:${i}"><div class="hp-media">${pic(x.src, x.label || x.caption, x.kind || "screen")}</div><figcaption><span class="mono">${pad2(i + 1)}</span><b>${esc(x.label || x.caption || "")}</b>${x.text ? `<span>${esc(x.text)}</span>` : ""}</figcaption></figure>`).join("")}</div>
        <i class="holo-floor" aria-hidden="true"></i></div></div></div>`;
    }
    // Moving image: a muted loop that plays while it's on screen, or a film that opens in the theatre
    if (b.type === "video") return `<div class="blk wide"><div class="wrap">${head}<figure class="vid" style="--ar:${esc(b.ar || "16 / 9")}">${b.src ? `<video src="${esc(b.src)}"${b.poster ? ` poster="${esc(b.poster)}"` : ""} muted loop playsinline preload="none" data-autoplay></video>`
      : b.yt ? `<a class="vid-yt" href="https://www.youtube.com/watch?v=${esc(b.yt)}" target="_blank" rel="noopener" data-yt="${esc(b.yt)}" data-title="${esc(b.title || p.title)}" data-thumb="${esc(b.poster || "")}">${pic(b.poster, b.title || p.title)}<span class="vid-play" aria-hidden="true">▶</span><span class="vid-l mono">Play</span></a>`
      : si("video", b.file || b.title || "Video to come")}${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure></div></div>`;
    // A process, drawn down the page as you read it
    if (b.type === "timeline") return `<div class="blk wide"><div class="wrap">${head}<ol class="ptl" data-scrub="tl" style="--n:${b.items.length}">${b.items.map((x, i) => `<li style="--i:${i}"><span class="ptl-w mono">${esc(x.when || pad2(i + 1))}</span><div><h4>${esc(x.title)}</h4>${x.text ? `<p>${esc(x.text)}</p>` : ""}</div></li>`).join("")}<i class="ptl-line" aria-hidden="true"></i></ol></div></div>`;
    // See a picture through different kinds of colour vision, through a lens you move or across the whole frame
    if (b.type === "cbsim") return `<div class="blk wide"><div class="wrap">${head}<figure class="cbs" data-cbs style="--ar:${esc(b.ar || "16 / 10")}">
        <div class="cbs-view"><div class="cbs-base">${pic(b.src, b.alt || "Scene", "visual")}</div><div class="cbs-lens" aria-hidden="true">${pic(b.src, "", "visual")}</div><span class="cbs-ring" aria-hidden="true"></span><span class="cbs-tag mono">Deuteranopia</span></div>
        <div class="cbs-ctl" role="radiogroup" aria-label="Kind of colour vision">${CB.map(([k, l]) => `<button type="button" role="radio" aria-checked="${k === "deut"}" data-cb="${k}">${l}</button>`).join("")}<button type="button" class="cbs-mode" data-cbmode aria-pressed="false">Whole frame</button></div>
        ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure></div></div>`;
    // A tin with its label wrapped all the way round; it turns on its own, or drag it
    if (b.type === "tin") { const N = 30; return `<div class="blk wide"><div class="wrap">${head}<figure class="tin-b"><div class="tin-scene" data-tin="${esc(b.src || "")}" role="img" aria-label="${esc(b.alt || "A tin with its label running all the way round. Drag to turn it.")}"><div class="tin" style="--N:${N}">${Array.from({ length: N }, (_, i) => `<i style="--i:${i}"></i>`).join("")}<b class="tin-lid"></b><b class="tin-base"></b></div><i class="tin-shadow"></i></div><figcaption>${esc(b.caption || "Drag to turn the tin.")}</figcaption></figure></div></div>`; }
    // ROI dial: drag where the next shot's region of interest sits; the cut is judged like the editor does
    // A process drawn as a numbered track: steps sit above and below the line, which draws as you scroll
    if (b.type === "process") return `<div class="blk wide"><div class="wrap">${head}<ol class="proc" data-scrub="tl" style="--n:${b.items.length}">${b.items.map((x, i) => `<li class="${i % 2 ? "down" : "up"}" style="--i:${i}"><div class="proc-t"><h4>${esc(x.title)}</h4>${(x.notes || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div><span class="proc-n mono" aria-hidden="true">${i + 1}</span></li>`).join("")}<i class="proc-line" aria-hidden="true"></i></ol>${b.caption ? `<p class="blk-cap">${esc(b.caption)}</p>` : ""}</div></div>`;
    // A working prototype on a watch: tap through it, press the side button, turn back with the crown
    if (b.type === "watch") return watchProto(b);
    // The double diamond, drawn: four phases, each with its methods, filling in as it arrives
    if (b.type === "ddiamond") return `<div class="blk wide"><div class="wrap">${head}<div class="ddm" data-chart>
        <svg class="ddm-svg" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true"><polygon class="t0" points="2,60 100,2 100,118"/><polygon class="t1" points="100,2 198,60 100,118"/><polygon class="t2" points="202,60 300,2 300,118"/><polygon class="t3" points="300,2 398,60 300,118"/></svg>
        ${b.phases.map((ph, i) => `<section class="ddm-p p${i}" style="--i:${i}"><h4>${esc(ph.name)}</h4><ul>${ph.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></section>`).join("")}
      </div>${b.caption ? `<p class="blk-cap">${esc(b.caption)}</p>` : ""}</div></div>`;
    // Notes on a wall, grouped: the first, unstructured clustering
    if (b.type === "clusters") return `<div class="blk wide"><div class="wrap">${head}<div class="clu">${b.groups.map((g, i) => `<section class="clu-g" data-reveal style="--i:${i}"><h4>${esc(g.title)}</h4><div class="clu-n">${g.notes.map((t, k) => `<p style="--r:${((k * 37 + i * 11) % 7) - 3}deg">${esc(t)}</p>`).join("")}</div></section>`).join("")}</div></div></div>`;
    // The action matrix: one row per insight; open a row to see what people want, what stands in the way, and what to do
    if (b.type === "amatrix") return `<div class="blk wide"><div class="wrap">${head}<div class="amx">
        <div class="amx-h mono" aria-hidden="true"><span>Key insight</span><span>Desired experience</span><span>Barriers</span><span>Actions</span></div>
        ${b.rows.map((r, i) => `<details class="amx-r"${i ? "" : " open"}><summary><span class="amx-n mono">${pad2(i + 1)}</span><span class="amx-i">${esc(r.insight)}</span><span class="amx-x" aria-hidden="true"></span></summary>
          <div class="amx-b"><div><span class="label">Desired experience</span><ul>${r.want.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div><div><span class="label">Barriers</span><ul class="amx-bar">${r.bar.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div><div class="amx-a"><span class="label">Actions</span>${r.act.map((t) => `<p${t === b.chosen ? ' class="ch"' : ""}>${esc(t)}</p>`).join("")}</div></div></details>`).join("")}
      </div></div></div>`;
    // Urgent against important, with the chosen action marked
    if (b.type === "priority") { const Q = [["Urgent", "Important"], ["Not urgent", "Important"], ["Urgent", "Not important"], ["Not urgent", "Not important"]];
      return `<div class="blk wide"><div class="wrap">${head}<div class="prio" data-chart><span class="prio-ax x mono" aria-hidden="true"><b>Urgent</b><b>Not urgent</b></span><span class="prio-ax y mono" aria-hidden="true"><b>Important</b><b>Not important</b></span>
        ${b.quads.map((q, i) => `<section class="prio-q q${i}" aria-label="${Q[i][0]} and ${Q[i][1].toLowerCase()}">${q.map((t) => `<p${t === b.chosen ? ' class="ch"' : ""}>${t === b.chosen ? '<span class="mono">Chosen action</span>' : ""}${esc(t)}</p>`).join("")}</section>`).join("")}</div></div></div>`; }
    // See, hear, do, think
    if (b.type === "empathy") { const IC = { see: '<circle cx="12" cy="12" r="3.2"/><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/>', hear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-3 3.6-3 6.5a2.5 2.5 0 0 1-5 0"/><path d="M10 9.5a2 2 0 0 1 4 0"/>', do: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 6.5-6 6.5-2.6 0-4.4-1.4-5.6-3.6L4.2 13.2a1.6 1.6 0 0 1 2.7-1.6L8 13"/>', think: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>' };
      return `<div class="blk wide"><div class="wrap">${head}<div class="emp">${b.cols.map((c, i) => `<section class="emp-c" data-reveal style="--i:${i}"><div class="emp-ic" aria-hidden="true"><i></i><i></i><svg viewBox="0 0 24 24">${IC[c.k] || ""}</svg></div><h4>${esc(c.title)}</h4>${c.groups.map((g) => `<div class="emp-g"><span class="label">${esc(g.t)}</span><p>${esc(g.d)}</p></div>`).join("")}</section>`).join("")}</div></div></div>`; }
    // The finalised requirements around a phone: hover one and its spot on the phone lights up
    if (b.type === "reqmap") return `<div class="blk wide"><div class="wrap">${head}<div class="rqm" data-rqm>
        ${b.items.map((x, i) => `<button type="button" class="rqm-c c${i}" data-rq="${i}"><span class="mono">R${esc(x.r || i + 1)}</span><b>${esc(x.title)}</b><span>${esc(x.text)}</span></button>`).join("")}
        <div class="rqm-ph" aria-hidden="true"><svg viewBox="0 0 160 280"><rect x="8" y="8" width="144" height="264" rx="22" class="ph-b"/><path class="aw" d="M2 70 L18 34 H142 L158 70 Z"/><path class="aws" d="M30 34 L22 70 M58 34 L54 70 M86 34 L86 70 M114 34 L118 70 M142 34 L150 70"/><rect x="40" y="16" width="80" height="6" rx="3" class="ph-l"/>
          <g class="hs h0"><rect x="26" y="84" width="108" height="22" rx="11" class="ph-s"/><path d="M38 95l3-6 3 6-6-3.5h6z M56 95l3-6 3 6-6-3.5h6z M74 95l3-6 3 6-6-3.5h6z M92 95l3-6 3 6-6-3.5h6z" class="ph-st"/></g>
          <g class="hs h1"><rect x="22" y="118" width="116" height="44" rx="6" class="ph-s"/><circle cx="42" cy="140" r="11" class="ph-d"/><path d="M62 130h62M62 140h62M62 150h50" class="ph-t"/></g>
          <g class="hs h2"><rect x="22" y="170" width="116" height="44" rx="6" class="ph-s"/><rect x="31" y="180" width="22" height="24" rx="3" class="ph-d"/><path d="M62 182h62M62 192h62M62 202h50" class="ph-t"/></g>
          <g class="hs h3"><path d="M30 228h6l6 18h22l6-14H40" class="ph-t" stroke-width="3"/><circle cx="46" cy="252" r="3" class="ph-d"/><circle cx="62" cy="252" r="3" class="ph-d"/><path d="M84 230h46M84 240h46M84 250h34" class="ph-t"/></g>
        </svg></div>
      </div></div></div>`;
    // An information architecture, drawn as a tree you can read on a phone
    if (b.type === "iatree") return `<div class="blk wide"><div class="wrap">${head}<div class="iat" data-chart><div class="iat-root"><span>${esc(b.root)}</span></div>
        <div class="iat-br">${b.branches.map((br, i) => `<section class="iat-b${br.hl ? " hl" : ""}" style="--i:${i}"><h4>${esc(br.name)}</h4><ul>${br.items.map((it) => typeof it === "string" ? `<li>${esc(it)}</li>` : `<li class="sub"><span>${esc(it.name)}</span><ul>${it.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></li>`).join("")}</ul></section>`).join("")}</div></div>${b.caption ? `<p class="blk-cap">${esc(b.caption)}</p>` : ""}</div></div>`;
    // A design system board: type scale, colour, buttons and icons
    if (b.type === "dsys") return `<div class="blk wide"><div class="wrap">${head}<div class="dsy" style="--ds-font:${esc(b.font || "inherit")}">
        <section class="dsy-t"><span class="label">Type · ${esc(b.typeface || "")}</span>${b.scale.map(([l, s]) => `<div><span style="font-size:${Math.min(56, Math.max(9, s))}px">${esc(l)}</span><i></i><em class="mono">${s} pt</em></div>`).join("")}</section>
        <section class="dsy-c"><span class="label">Colour</span><div class="dsy-sw">${b.colours.map((c) => `<button type="button" class="sw" style="--c:${esc(c)}" data-copy="${esc(c)}" aria-label="Copy ${esc(c)}"><i></i><span class="mono">${esc(c)}</span></button>`).join("")}</div></section>
        <section class="dsy-b"><span class="label">Buttons</span><div class="dsy-bt"><span class="b1">Apply now</span><span class="b2">Save</span><span class="b3"><i></i>Search internships</span><span class="b4"><i></i><i></i><i></i><i></i></span><span class="b5">Know more</span></div></section>
        <section class="dsy-i"><span class="label">Icons</span><div class="dsy-ic">${["M3 11l9-7 9 7v9h-6v-6H9v6H3z", "M10.5 3a7.5 7.5 0 1 0 4.6 13.4L20 21.3 21.3 20l-4.9-4.9A7.5 7.5 0 0 0 10.5 3z", "M6 3h12v18l-6-4-6 4z", "M18 8a3 3 0 1 0-2.8-4l-6.4 3.6a3 3 0 1 0 0 4.8l6.4 3.6A3 3 0 1 0 16 13.6l-6.4-3.6a3 3 0 0 0 0-.4L16 6a3 3 0 0 0 2 2z", "M5 5h14v15H5zM5 9h14M9 3v4M15 3v4M9 14h6", "M5 5l14 14M19 5L5 19", "M9.5 14.5l5-5M8 11l-2 2a3.5 3.5 0 0 0 5 5l2-2M16 13l2-2a3.5 3.5 0 0 0-5-5l-2 2", "M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9", "M4 7h16M4 12h11M4 17h16", "M9 5l7 7-7 7"].map((d) => `<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`).join("")}</div></section>
      </div></div></div>`;
    // A product's screens in one app window: scrolling changes the workspace, its title and its side notes
    if (b.type === "appframe") { const n = b.items.length;
      return `<div class="blk wide pin af-b" data-pin="appframe" style="--n:${n}"><div class="pin-in"><div class="wrap af-stage">
        <div class="af-side"><span class="label">${esc(b.title || "Workspaces")}</span><ol class="af-tabs">${b.items.map((x, i) => `<li><button type="button" data-af="${i}"${i ? "" : ' class="on"'}><span class="mono">${pad2(i + 1)}</span>${esc(x.label)}</button></li>`).join("")}</ol></div>
        <div class="af-win"><div class="af-bar mono" aria-hidden="true"><span><i></i><i></i><i></i></span><span class="af-path">${esc(b.app || p.title)} — <b>${esc(b.items[0].label)}</b></span><span class="af-sp"></span></div>
          <div class="af-scr">${b.items.map((x, i) => { const src = x.img || (x.states && x.states[0].img); return `<div class="af-s${i ? "" : " on"}">${pic(src, x.title, "screen")}</div>`; }).join("")}</div></div>
        <div class="af-txt">${b.items.map((x, i) => `<div class="af-t${i ? "" : " on"}"><span class="mono af-l">${pad2(i + 1)} · ${esc(x.label)}</span><h4>${esc(x.title)}</h4><p>${esc(x.text)}</p>${x.panels ? `<img class="af-pn" src="${esc(x.panels.src)}" alt="${esc(x.panels.caption)}" loading="lazy">` : ""}</div>`).join("")}</div>
      </div></div></div>`; }
    // Fredrick Runs, playable: jump the traffic, collect boosters, survive four backdrops
    if (b.type === "fgame") return `<div class="blk wide fg-b"><div class="wrap fg">
        <div class="fg-copy"><span class="label">Play it here</span><h3 class="wp-h">${esc(b.title || "Run, Johnny.")}</h3><p class="wp-p">${esc(b.text || "")}</p>
          <ul class="fg-keys mono"><li><kbd>Space</kbd> / <kbd>↑</kbd> / tap · jump</li><li>Jump twice in the air · double jump</li><li>★ from level 2 · booster</li></ul></div>
        <div class="fg-stage" data-fgame="${esc(b.dir)}" tabindex="0" role="application" aria-label="Fredrick Runs, a small runner game. Press space or tap to jump.">
          <canvas></canvas>
          <div class="fg-hud mono" aria-hidden="true"><span class="fg-lv">LEVEL 1</span><span class="fg-sc">0</span><span class="fg-mx">×1</span><span class="fg-hp">♥♥♥</span></div>
          <div class="fg-over"><img src="${esc(b.dir)}/title.webp" alt=""><button type="button" class="btn fg-go">Start the run</button><p class="mono fg-msg">Space, ↑ or tap to jump</p></div>
        </div></div></div>`;
    // Rasta La Vista, playable on the real board
    if (b.type === "rgame") return `<div class="blk wide rg-b"><div class="wrap">${head}
      <div class="rg" data-rgame="${esc(b.dir)}">
        <div class="rg-board"><img class="rg-map" src="${esc(b.dir)}/map.webp" alt="The Rasta La Vista board: hexagonal place tiles linked by roads, railways and rivers"><svg class="rg-svg" viewBox="220 57 1198 1038" aria-hidden="true"><g class="rg-hi"></g><g class="rg-pegs"></g><g class="rg-pawns"></g></svg>
          <div class="rg-card" hidden></div><div class="rg-over"></div></div>
        <aside class="rg-side"><div class="rg-rules"><span class="label">How it plays</span><ol>
            <li><b>Tickets unlock as you travel.</b> Bus with your first place, rail with two, ferry with three, plane with five.</li>
            <li><b>One ticket per tile</b>, along the printed roads, railways and rivers. Planes hop between airports.</li>
            <li><b>End on a free place to claim it.</b> Destinations score 3, Hubs 6, Metros 9.</li>
            <li><b>Pass a junction, draw an action card.</b> Hold up to three.</li>
            <li><b>Chai time:</b> stop at a junction to even out your tickets.</li>
            <li><b>Every round draws an event</b> that blocks, speeds up or rewards travel.</li></ol></div><span class="rg-round mono"></span><div class="rg-event"></div><ol class="rg-players"></ol>
          <div class="rg-you"><span class="label">Your tickets</span><div class="rg-modes"></div><span class="label">Your action cards</span><div class="rg-hand"></div><div class="rg-prompt" aria-live="polite"></div><div class="rg-extra"></div></div>
          <span class="label">Travel log</span><ol class="rg-log" aria-live="polite"></ol></aside>
      </div>${b.text ? `<p class="blk-cap">${esc(b.text)}</p>` : ""}</div></div>`;
    // An animal's sound in type: the o's drop in one by one and keep bouncing
    if (b.type === "moo") { const w = b.word || "Moooo";
      return `<div class="blk wide moo-b"><div class="wrap moo">
        <div class="moo-copy"><span class="label">Motion</span><h3 class="wp-h">${esc(b.title || "")}</h3><p class="wp-p">${esc(b.text || "")}</p>
          ${(b.stills || []).length ? `<div class="moo-stills">${b.stills.map((x) => `<figure><img src="${esc(x.src)}" alt="${esc(x.caption || "")}" loading="lazy"><figcaption class="mono">${esc(x.caption || "")}</figcaption></figure>`).join("")}</div>` : ""}</div>
        <button type="button" class="moo-stage" data-moo aria-label="Play the animation of the word ${esc(w)}"><span class="moo-w" aria-hidden="true"><b class="moo-m">${esc(w[0])}</b>${w.slice(1).split("").map((_, i) => `<b class="moo-o" style="--i:${i}"></b>`).join("")}</span><span class="moo-hint mono">Tap to moo</span></button>
      </div></div>`; }
    // A Geometrica clue card you can solve: drag shape frames together on a textured board
    if (b.type === "buildit") return `<div class="blk wide bi-b"><div class="wrap bi">
        <div class="bi-copy"><span class="label">Play a card</span><h3 class="wp-h">${esc(b.title || "")}</h3><p class="wp-p">${esc(b.text || "")}</p>
          <div class="bi-card"><span class="mono bi-q">Q.</span><p class="bi-clue"></p><p class="bi-ans mono" aria-live="polite"></p></div>
          <div class="bi-ctl"><button type="button" class="btn ghost bi-next">Next card</button><span class="mono bi-time">0.0 s</span></div></div>
        <div class="bi-board" data-buildit role="application" aria-label="A game board with shape frames to drag."><svg viewBox="0 0 600 400"><defs><pattern id="bi-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="2.2"/></pattern></defs><rect class="bi-bg" width="600" height="400" rx="18"/><rect class="bi-dot" width="600" height="400" rx="18" fill="url(#bi-dots)"/><g class="bi-pieces"></g></svg></div>
      </div></div>`;
    // A shelf of the range: pick a product and its label wraps the tin
    if (b.type === "shelf") { const N = 30;
      return `<div class="blk wide"><div class="wrap">${head}<div class="shelf-b">
        <div class="tin-scene" data-tin="${esc(b.items[0].src)}" role="img" aria-label="A tin wearing the selected label. Drag to turn it."><div class="tin" style="--N:${N};--ar:${esc(b.items[0].ar || "1.6")}">${Array.from({ length: N }, (_, i) => `<i style="--i:${i}"></i>`).join("")}<b class="tin-lid"${b.lid ? ` style="--lid:url('${esc(new URL(b.lid, document.baseURI).href)}')"` : ""}></b><b class="tin-base"></b></div><i class="tin-shadow"></i></div>
        <div class="shelf"><span class="label">${esc(b.pick || "Pick a label")}</span><div class="shelf-row">${b.items.map((x, i) => `<button type="button" class="sh-i${i ? "" : " on"}" data-label="${esc(x.src)}" aria-pressed="${!i}"><img src="${esc(x.src)}" alt="" loading="lazy"><span>${esc(x.name)}</span></button>`).join("")}</div>${b.caption ? `<p class="blk-cap">${esc(b.caption)}</p>` : ""}</div>
      </div></div></div>`; }
    // A note from the write-up, placed between pictures so the story and the visuals arrive together
    if (b.type === "note") { const e = ((S.entries || {})[p.id] || [])[b.entry]; if (!e) return "";
      return `<div class="blk wide note-b${b.side === "right" ? " r" : ""}"><div class="wrap note-in" data-reveal><span class="label note-k">${esc(e.title)}</span><p>${esc(e.text)}</p></div></div>`; }
    if (b.type === "roi") {
      const pt = (a, r) => [(r * Math.sin(a * Math.PI / 180)).toFixed(2), (-r * Math.cos(a * Math.PI / 180)).toFixed(2)];
      const wedge = (a0, a1, r, cls) => { const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r); return `<path class="${cls}" d="M0 0L${x0} ${y0}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}Z"/>`; };
      return `<div class="blk wide"><div class="wrap">${head}<div class="roi" data-roi data-reveal>
        <div class="roi-dial" role="slider" tabindex="0" aria-label="Where the next shot's region of interest sits, in degrees from the viewer's gaze" aria-valuemin="-180" aria-valuemax="180" aria-valuenow="64">
          <svg viewBox="-112 -112 224 224" aria-hidden="true">${wedge(90, 270, 96, "z-red")}${wedge(30, 90, 96, "z-amb")}${wedge(-90, -30, 96, "z-amb")}${wedge(-30, 30, 96, "z-ok")}
            <circle r="96" class="z-ring"/><circle r="62" class="z-in"/>
            <g class="roi-gaze"><path d="M0 0L0 -78"/><circle r="10"/><text y="4" text-anchor="middle">YOU</text></g>
            <g class="roi-pt"><path class="roi-arc" d=""/><g class="roi-m"><circle cy="-80" r="12"/><text y="-76" text-anchor="middle">ROI</text></g></g>
          </svg></div>
        <div class="roi-side"><span class="mono roi-k">Next shot's region of interest</span><b class="roi-n">64°</b><span class="roi-s">Needs a review</span>
          <p>${esc(b.text || "Drag the ROI around the viewer. Under 30° the cut is comfortable, 30–90° needs a review, and past 90° the viewer has to turn too far.")}</p>
          <span class="roi-btns"><button type="button" class="btn" data-roi="align">Auto align</button><button type="button" class="btn ghost" data-roi="cut">Try another cut</button></span></div>
      </div></div></div>`;
    }
    // A 360° frame you can look around, with the zones the film was blocked in
    if (b.type === "pano") return `<div class="blk wide"><div class="wrap">${head}<figure class="pano" data-reveal>
        <div class="pano-view" data-pano="${esc(b.fov || 140)}" tabindex="0" role="slider" aria-label="Look around the 360° frame" aria-valuemin="-180" aria-valuemax="180" aria-valuenow="0" style="background-image:url('${esc(b.src)}')">
          <span class="pano-hint mono">Drag to look around</span><span class="pano-zone mono">Content zone · 0°</span>
          <svg class="pano-dial" viewBox="-32 -32 64 64" aria-hidden="true"><circle r="28" class="pd-ring"/><path class="pd-z per" d="M0 0L26.3 -9.6A28 28 0 0 1 27 7.2Z"/><path class="pd-z per" d="M0 0L-26.3 -9.6A28 28 0 0 0 -27 7.2Z"/><path class="pd-z cur" d="M0 0L27 7.2A28 28 0 0 1 -27 7.2Z"/><path class="pd-view" d="M0 0L-20 -20A28 28 0 0 1 20 -20Z"/></svg>
        </div>${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure></div></div>`;
    // Label and value pairs
    if (b.type === "credits") return `<div class="blk blk-text">${head}<dl class="credits">${b.items.map((x) => `<div><dt>${esc(x.l)}</dt><dd>${esc(x.v)}</dd></div>`).join("")}</dl></div>`;
    return "";
  }
  // Prototype links, documents and videos for a project, as buttons
  function actions(p) {
    const vids = (p.videos || []).map((v) => `<a class="btn" href="${esc(v.href || ytHref(v))}" target="_blank" rel="noopener"${v.id ? ` data-yt="${esc(v.id)}" data-title="${esc(p.title + ": " + v.label)}"` : ""}><i class="rec" aria-hidden="true"></i>${esc(v.label)}${v.runtime ? ` · ${esc(v.runtime)}` : ""}</a>`);
    const links = (p.links || []).map((l, i) => `<a class="btn${i ? " ghost" : ""}" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} <span aria-hidden="true">↗</span></a>`);
    return vids.length || links.length ? `<p class="vid-links">${links.join("")}${vids.join("")}</p>` : "";
  }
  // A picture that isn't made yet: a designed stand-in that names the file to add. Drop the file in and it replaces itself.
  const si = (kind, label) => `<span class="stand-in si-${kind}" role="img" aria-label="${esc(label || "Image to come")}"><span class="si-ui" aria-hidden="true">${kind === "screen" ? "<i></i><i></i><i></i><i></i><i></i><i></i>" : kind === "video" ? "<i></i>" : ""}</span><span class="si-l mono">Stand-in${label ? " · " + esc(label) : ""}</span></span>`;
  const pic = (src, alt, kind = "visual") => src ? `<img src="${esc(src)}" alt="${esc(alt || "")}" loading="lazy" data-ph="${kind}">` : si(kind, alt);
  const niceMax = (m) => { if (m <= 0) return 1; const e = Math.pow(10, Math.floor(Math.log10(m))), f = m / e; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e; };
  // Charts drawn from the case study's own numbers, with the sample and source under them
  function chart(b) {
    const d = b.data, u = b.unit || "", max = b.max || niceMax(Math.max(...d.map((x) => x.v)));
    const foot = [b.n ? `n = ${b.n}` : "", b.source || "", b.note || ""].filter(Boolean).map(esc).join(" · ");
    let body = "";
    if (b.kind === "donut") {
      const tot = d.reduce((t, x) => t + x.v, 0), C = 2 * Math.PI * 42; let acc = 0;
      body = `<div class="ch-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" class="ch-track"/>${d.map((x, i) => { const len = (x.v / tot) * C, seg = `<circle cx="50" cy="50" r="42" class="ch-seg s${i % 5}" style="--len:${len.toFixed(2)};--off:${(-acc).toFixed(2)};--C:${C.toFixed(2)};--i:${i}"/>`; acc += len; return seg; }).join("")}</svg>
        <div class="ch-mid"><b>${esc(b.center || "")}</b><span>${esc(b.centerLabel || "")}</span></div></div>
        <ul class="ch-legend">${d.map((x, i) => `<li><i class="s${i % 5}"></i><span>${esc(x.l)}</span><b>${x.v}${esc(u)}</b></li>`).join("")}</ul>`;
    } else if (b.kind === "bar") {
      body = `<div class="ch-bars" style="--n:${d.length}"><div class="ch-grid" aria-hidden="true">${[0, 0.25, 0.5, 0.75, 1].map((t) => `<span style="--t:${t}"><em>${+(max * t).toFixed(1)}${esc(u)}</em></span>`).join("")}</div>
        ${d.map((x, i) => `<div class="ch-col${x.hl ? " ck" : ""}" style="--v:${(x.v / max).toFixed(4)};--i:${i}"><b>${x.v}${esc(u)}</b><i></i><span>${esc(x.l)}</span></div>`).join("")}</div>`;
    } else {
      body = `<div class="ch-hbars">${d.map((x, i) => `<div class="ch-row${x.hl ? " ck" : ""}" style="--v:${(x.v / max).toFixed(4)};--i:${i}"><span class="ch-l">${esc(x.l)}</span><span class="ch-t"><i></i></span><b>${x.v}${esc(u)}</b></div>`).join("")}</div>`;
    }
    return `<figure class="chart ch-${b.kind || "hbar"}" data-chart>${b.title ? `<figcaption class="ch-h"><b>${esc(b.title)}</b>${b.sub ? `<span>${esc(b.sub)}</span>` : ""}</figcaption>` : ""}<div class="ch-body">${body}</div>${foot ? `<p class="ch-foot mono">${foot}</p>` : ""}</figure>`;
  }
  // A section opens like a slide: its number, its kicker and its title, revealed by scrolling
  function chap(s, i, n, p) {
    let k = 0; const kind = kindOf(p);
    const words = esc(s.title).split(/\s+/).map((w) => `<span class="cw" style="--k:${k++}">${w}</span>`).join(" ");
    const im = kind === "visual" ? ((s.blocks || []).flatMap((b) => b.items || (b.src ? [b] : [])).find((x) => x && x.src) || {}).src : "";
    return `<header class="chap" id="sec-${s.key}" data-scrub="chap" style="--nw:${k}">${im ? `<div class="chap-bg" aria-hidden="true"><img src="${esc(im)}" alt="" loading="lazy"></div>` : ""}
      <div class="wrap chap-in"><span class="chap-n" aria-hidden="true">${pad2(i + 1)}</span><div class="chap-t"><p class="label kicker">${kind === "xr" ? "// " : ""}${esc(s.kicker)}</p><h2>${words}</h2></div></div></header>`;
  }
  // How a project's page behaves: ux (calm, screens tilt into place), xr (spatial: HUD, gaze, things to play with), visual (pictures first, full bleed)
  const kindOf = (p) => (p.discipline === "XR" || (p.also || []).includes("XR")) ? "xr" : ["Game", "Visual", "Physical"].includes(p.discipline) ? "visual" : "ux";
  // A live Figma prototype, loaded only when asked for (it's heavy), and only where embedding is allowed
  function protoBlock(p) {
    if (!p.figma) return "";
    const f = typeof p.figma === "string" ? { url: p.figma } : p.figma;
    return `<section class="section wrap proto" id="sec-prototype" aria-labelledby="pr-h"><div class="section-head" data-reveal><div><span class="label">Live prototype</span><h2 id="pr-h">${esc(f.title || "Try it yourself.")}</h2></div><a class="more" href="${esc(f.url)}" target="_blank" rel="noopener">Open in Figma ↗</a></div>
      <div class="proto-frame${f.ratio === "phone" ? " phone" : ""}" data-figma="${esc(f.url)}"><div class="proto-cover">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy">` : ""}
        <span class="proto-cta"><button type="button" class="btn" data-proto>Load the live prototype</button><span class="mono">Runs from Figma · takes a few seconds</span></span></div></div></section>`;
  }
  const titleOf = (p, style = "") => p.wordmark ? `<h1 class="wm-h"${style}><img src="${esc(p.wordmark)}" alt="${esc(p.title)}"></h1>` : `<h1${style}>${esc(p.title)}</h1>`;
  /* Every case study opens its sections in its own way. `style` on the case study picks one:
     rail (title stays beside the text), diamond (a double diamond shows the phase), steps (a stepper across the top),
     panel (each section opens on a card), timeline (an editor's ruler and clip), level (a game chapter card),
     slate (a clapperboard), holo (the XR slide). Left out, UX work gets rail and XR work gets holo. */
  const styleOf = (p, c) => c.style || (kindOf(p) === "ux" ? "rail" : "holo");
  const PHASES = ["Discover", "Define", "Ideate", "Design"];
  function phaseMark(c, ph, st) {
    const names = c.phases || PHASES, at = typeof ph === "number" ? ph : -1;
    const cls = (i) => at < 0 ? "all" : i < at ? "done" : i === at ? "now" : "";
    if (st === "diamond") {
      const tri = ["0,36 60,4 60,68", "60,4 120,36 60,68", "120,36 180,4 180,68", "180,4 240,36 180,68"];
      return `<div class="sx-track" role="img" aria-label="${at < 0 ? "The double diamond: " + names.join(", ") : "Phase: " + names[at]}"><svg class="dd" viewBox="-2 0 244 72" aria-hidden="true">${tri.map((t, i) => `<polygon points="${t}" class="${cls(i)}"/>`).join("")}</svg><ol class="dd-l mono" aria-hidden="true">${names.map((x, i) => `<li class="${cls(i)}">${esc(x)}</li>`).join("")}</ol></div>`;
    }
    return `<ol class="stp mono" aria-label="${at < 0 ? "Process" : "Phase: " + names[at]}">${names.map((x, i) => `<li class="${cls(i)}"${i === at ? ' aria-current="step"' : ""}><i aria-hidden="true"></i>${esc(x)}</li>`).join("")}</ol>`;
  }
  // The picture a section opens on (its figure, or its first image)
  const secImg = (s) => { const src = (s.image && s.image.src) || ((((s.blocks || []).find((b) => b.type === "images" && b.items && b.items[0] && b.items[0].src) || {}).items || [])[0] || {}).src; return src ? { src } : null; };
  // Film-making props beside a slate: a lamp, a 360° camera, a waveform, a viewfinder, a script page
  const PROPS = {
    light: '<svg viewBox="0 0 200 200" class="pr-light"><defs><linearGradient id="beam" x1="0" x2="1"><stop offset="0" stop-color="#F5CF57" stop-opacity=".75"/><stop offset="1" stop-color="#F5CF57" stop-opacity="0"/></linearGradient></defs><path class="beam" d="M86 70 L200 20 L200 150 L86 104 Z" fill="url(#beam)"/><rect x="34" y="62" width="56" height="50" rx="8" class="body"/><circle cx="90" cy="87" r="20" class="lens"/><path d="M50 112 L42 176 M74 112 L82 176 M62 112 V176 M34 176 H94" class="stand"/><path d="M40 62 V50 H84 V62" class="body"/></svg>',
    cam360: '<svg viewBox="0 0 200 200" class="pr-cam"><rect x="80" y="40" width="40" height="110" rx="14" class="body"/><circle cx="100" cy="72" r="14" class="lens"/><circle cx="100" cy="72" r="6" class="glint"/><rect x="96" y="104" width="8" height="4" rx="2" class="rec"/><path d="M100 150 V184 M80 184 H120" class="stand"/><ellipse cx="100" cy="72" rx="60" ry="18" class="orbit"/></svg>',
    wave: '<svg viewBox="0 0 200 120" class="pr-wave">' + Array.from({ length: 28 }, (_, i) => `<rect x="${6 + i * 6.8}" y="40" width="4" height="40" rx="2" style="--i:${i}"/>`).join("") + "</svg>",
    viewfinder: '<svg viewBox="0 0 200 140" class="pr-vf"><path d="M10 34 V10 H34 M166 10 H190 V34 M190 106 V130 H166 M34 130 H10 V106" class="vf"/><circle cx="100" cy="70" r="6" class="glint"/><path d="M90 70 H70 M110 70 H130 M100 60 V44 M100 80 V96" class="vf"/><text x="16" y="28" class="t">REC</text><circle cx="52" cy="23" r="4" class="rec"/></svg>',
    script: '<svg viewBox="0 0 200 200" class="pr-script"><rect x="46" y="20" width="108" height="150" rx="4" class="body"/><path d="M62 46 H130 M62 58 H120 M80 78 H120 M70 90 H138 M70 100 H128 M80 120 H120 M70 132 H134 M70 142 H120" class="t"/><path d="M128 150 l26 -40 l8 6 l-26 40 z" class="pen"/></svg>',
    poster: '<svg viewBox="0 0 200 200" class="pr-poster"><rect x="50" y="16" width="100" height="150" class="body"/><path d="M62 140 L82 120 L82 100 L102 100 L102 80 L122 80 L122 60 L138 60" class="t"/><path d="M100 166 V186 M80 186 H120" class="stand"/></svg>'
  };
  function secHead(s, i, n, p, c) {
    const st = styleOf(p, c);
    if (st === "holo" || st === "slide") return `${chap(s, i, n, p)}<section class="story-sec">${(s.paras || []).map((t) => `<p>${esc(t)}</p>`).join("")}${s.quote ? `<blockquote class="quote">${esc(s.quote)}</blockquote>` : ""}</section>`;
    let k = 0; const no = pad2(i + 1);
    const words = esc(s.title).split(/\s+/).map((w) => `<span class="tw"><span style="--k:${k++}">${w}</span></span>`).join(" ");
    const kt = `<p class="label kicker"><span class="sx-no mono">${no}</span>${esc(s.kicker)}</p><h2>${words}</h2>`;
    const body = `${(s.paras || []).map((t) => `<p>${esc(t)}</p>`).join("")}${s.quote ? `<blockquote class="quote">${esc(s.quote)}</blockquote>` : ""}`;
    let head = kt;
    if (st === "diamond" || st === "steps") head = `${phaseMark(c, s.phase, st)}<div class="sx-t">${kt}</div>`;
    else if (st === "panel") head = `<span class="sx-big" aria-hidden="true">${no}</span><div class="sx-t"><p class="label kicker">${esc(s.kicker)}</p><h2>${words}</h2></div>`;
    else if (st === "timeline") head = `<div class="tlr" aria-hidden="true" style="--i:${i};--n:${n}"><span class="tlr-tc mono">00:${no}:00</span><i class="tlr-clip mono">${esc(s.kicker)}</i><i class="tlr-head"></i></div><div class="sx-t"><p class="label kicker"><span class="sx-no mono">${no}</span>${esc(s.kicker)}</p><h2>${words}</h2></div>`;
    else if (st === "level") { const im = secImg(s);
      head = `<span class="lv-n" aria-hidden="true">${no}</span><p class="lv-k mono"><i aria-hidden="true"></i>Chapter ${no} · ${esc(s.kicker)}</p><h2>${words}</h2><i class="lv-slash" aria-hidden="true"></i>`;
      if (im) return `<section class="sx sx-level lv-split wide${i % 2 ? " odd" : ""}" id="sec-${s.key}" data-scrub="chap" data-no="${no}" data-k="${esc(s.kicker)}"><div class="lv-art" aria-hidden="true"><img src="${esc(im.src)}" alt="" loading="lazy"></div><div class="wrap sx-in"><header class="sx-h">${head}</header>${body ? `<div class="sx-b">${body}</div>` : ""}</div></section>`; }
    else if (st === "slate") head = `<div class="slate" aria-hidden="true"><i class="sl-clap"></i><div class="sl-row mono"><span><em>Scene</em><b>${no}</b></span><span><em>Reel</em><b>${esc(s.kicker)}</b></span><span><em>Prod.</em><b>${esc(p.title)}</b></span></div></div>${s.prop && PROPS[s.prop] ? `<div class="prop prop-${esc(s.prop)}" aria-hidden="true">${PROPS[s.prop]}</div>` : ""}<div class="sx-t"><p class="label kicker sr">${esc(s.kicker)}</p><h2>${words}</h2></div>`;
    else if (st === "search") head = `<div class="srch" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg><span class="srch-q" style="--n:${s.kicker.length}">${esc(s.kicker)}</span><i class="srch-c"></i><span class="srch-f mono">${esc((c.phases || [])[s.phase] || "")}</span></div><div class="sx-t"><p class="label kicker"><span class="sx-no mono">${no}</span>Result</p><h2>${words}</h2></div>`;
    return `<section class="sx sx-${st} wide${i % 2 ? " odd" : ""}${body ? "" : " no-body"}" id="sec-${s.key}" data-scrub="chap" data-no="${no}" data-k="${esc(s.kicker)}"><div class="wrap sx-in"><header class="sx-h">${head}</header>${body ? `<div class="sx-b">${body}</div>` : ""}</div></section>`;
  }
  // A film gets a film's front page: the frame, the title, the tagline, laurels, then synopsis and crew
  function filmHero(p, c) {
    const f = c.film || {}, bg = f.still || p.cover || p.hero;
    return `<section class="film-hero" id="sec-overview">
        <div class="fh-bg" aria-hidden="true">${bg ? `<img src="${esc(bg)}" alt="" style="object-position:${esc(f.focus || p.focus || "50% 50%")}">` : ""}</div>
        <i class="fh-bar t" aria-hidden="true"></i><i class="fh-bar b" aria-hidden="true"></i>
        <div class="wrap fh-in">
          ${f.presents ? `<p class="fh-pres mono">${esc(f.presents)}</p>` : ""}
          <h1 class="fh-title">${esc(p.title)}</h1>
          <p class="fh-tag">${esc(c.headline)}</p>
          ${f.meta ? `<p class="fh-meta mono">${f.meta.map((x) => `<span>${esc(x)}</span>`).join("")}</p>` : ""}
          ${actions(p)}
        </div>
        ${f.laurels ? `<ul class="fh-laurels wrap" role="list">${f.laurels.map((l) => `<li><svg viewBox="0 0 40 64" aria-hidden="true"><path d="M30 60C12 52 6 36 12 8M12 8c4 4 6 9 5 14M10 20c5 2 8 6 9 11M10 32c5 1 9 4 11 9M13 43c5 0 9 3 12 7"/></svg><span><b>${esc(l.t)}</b><em>${esc(l.s)}</em></span><svg class="r" viewBox="0 0 40 64" aria-hidden="true"><path d="M30 60C12 52 6 36 12 8M12 8c4 4 6 9 5 14M10 20c5 2 8 6 9 11M10 32c5 1 9 4 11 9M13 43c5 0 9 3 12 7"/></svg></li>`).join("")}</ul>` : ""}
      </section>
      <section class="wrap film-syn" aria-label="Synopsis and crew">
        <div class="fs-syn"><span class="label">Synopsis</span><p class="fs-lead">${esc(c.subhead)}</p>${c.tldr.map((t) => `<p><b>${esc(t.label)}.</b> ${esc(t.text)}</p>`).join("")}</div>
        <dl class="fs-crew">${[["Directed, shot and cut by", p.team], ["My part", p.role], ["Guided by", p.guide], ["Made at", p.context + (p.note ? " · " + p.note : "")], ["Shot in", p.duration], ["Tools", p.tools]].filter(([, v]) => v).map(([l, v]) => `<div><dt class="mono">${l}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      </section>`;
  }
  function caseStudy(p, c) {
    const st = styleOf(p, c), kind = c.kind || (st === "slate" ? "film" : kindOf(p)), nS = c.sections.length;
    const secs = [["overview", c.sections.some((s) => (s.nav || s.kicker) === "Overview") ? "Intro" : "Overview"], ...c.sections.map((s) => [s.key, s.nav || s.kicker]), ...(c.iterations ? [["iterations", "Iterations"]] : []), ...(c.finale ? [["final", "Outcome"]] : []), ...(c.steps ? [["walkthrough", "Walkthrough"]] : []), ...(c.specs ? [["specs", c.specsTitle ? "Credits" : "Specs"]] : [])];
    if (p.figma) secs.splice(1, 0, ["prototype", "Prototype"]);
    const mode = store.get("mode", "read");
    const opener = (o) => o ? (Array.isArray(o) ? o : [o]).map((b) => block(b, p)).join("") : "";
    return `<main id="main" data-mode="${mode}" data-kind="${kind}" data-style="${st}">
      <div class="local-nav"><div class="wrap">
        <span class="name">${esc(p.title)}</span>
        <nav class="secs" aria-label="Sections">${secs.map(([k, l]) => `<a href="#p-${p.id}" data-jump="${k}">${esc(l)}</a>`).join("")}</nav>
        <div class="mode" role="group" aria-label="Reading mode"><button type="button" data-mode="skim" aria-pressed="${mode === "skim"}">Skim</button><button type="button" data-mode="read" aria-pressed="${mode === "read"}">Read</button></div>
        <span class="progress" id="progress"></span>
      </div></div>

      ${st === "slate" ? filmHero(p, c) : `<section class="wrap cs-hero" id="sec-overview">
        <div class="eyebrow"><span class="mono" style="color:var(--blue-ink)">${esc(p.discipline)}</span><span class="mono muted">${esc(p.acc)}</span>${p.readMins ? `<span class="mono muted">${p.readMins} min read</span>` : ""}${/^In (progress|development)$/.test(p.status || "") ? `<span class="chip blue">${esc(p.status)}</span>` : ""}</div>
        ${titleOf(p)}
        <p class="lead">${esc(c.subhead)}</p>
        ${actions(p)}
        <div class="cs-hero-media">${cover(p, { src: p.hero || p.cover, label: "Hero image to come", natural: true })}</div>
      </section>

      <section class="wrap" aria-label="At a glance">
        <div class="glance">${glanceRows(p)}</div>
        <div class="tldr">${c.tldr.map((t) => `<div><span class="label">${esc(t.label)}</span><p>${esc(t.text)}</p></div>`).join("")}</div>
      </section>`}
      ${c.numbers ? `<section class="wrap" aria-label="In numbers"><div class="numbers">${c.numbers.map((n) => `<div data-reveal><span class="num" data-to="${esc(n.n)}">${esc(n.n)}</span><span class="muted">${esc(n.l)}</span></div>`).join("")}</div>
        ${p.confidential ? `<p class="notice" style="margin-top:24px">This is current client work. Screens appear only where they're cleared for public use; ask me for a walkthrough.</p>` : ""}</section>` : ""}
      ${protoBlock(p)}

      ${c.highlights && c.highlights.length ? `<section class="wrap hl-sec" aria-labelledby="hl-h">
        <h2 id="hl-h" class="label">Highlights</h2>
        <ol class="highlights">${c.highlights.map((h, i) => `<li class="hl-c" data-reveal style="--i:${i}"><span class="mono">${pad2(i + 1)}</span><p>${esc(h)}</p></li>`).join("")}</ol>
      </section>` : ""}
      ${c.opener ? `<div class="story opener">${opener(c.opener)}</div>` : ""}

      <div class="story">
        ${c.sections.map((s, si) => { const used = st === "level" && secImg(s); const blocks = (s.blocks || []).filter((b, k) => !(used && !s.image && k === (s.blocks || []).findIndex((x) => x.type === "images") && b.items.length === 1));
          return `${secHead(s, si, nS, p, c)}${(s.show || []).map((b) => block(b, p)).join("")}${used && s.image ? "" : figure(s.image || s.figure, p)}${blocks.map((b) => block(b, p)).join("")}${s.still ? `<figure class="still wide" data-reveal><img src="${esc(s.still.src)}" alt="${esc(s.still.caption || "")}" loading="lazy"><figcaption class="mono">${esc(s.still.caption || "")}</figcaption></figure>` : ""}`; }).join("")}
        ${!c.sections.length ? `<section class="story-sec"><p class="notice">The full write-up for ${esc(p.title)} is on its way.</p></section>` : ""}
        ${c.iterations ? secHead({ key: "iterations", kicker: "Iterations", title: c.iterationsTitle || "What each version taught us.", paras: [], phase: c.iterationsPhase }, nS, nS + 1, p, c) : ""}
      </div>

      ${c.iterations ? `<section class="section wrap iters-sec" aria-label="Iterations">
        <ol class="iters${c.iterations.some((it) => it.img) ? " with-img" : ""}">${c.iterations.map((it, i) => `<li class="iter" data-reveal>${it.img ? `<div class="iter-img"><img src="${esc(it.img)}" alt="${esc(it.title)}" loading="lazy">${(it.more || []).map((m) => `<img src="${esc(m)}" alt="" loading="lazy">`).join("")}</div>` : ""}<div class="iter-txt"><span class="mono" style="color:var(--blue-ink)">${String(i + 1).padStart(2, "0")}</span><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p>
          <div class="pc"><div><span class="label">Worked</span><ul>${it.pros.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div><div><span class="label">Didn't</span><ul>${it.cons.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></div></div></li>`).join("")}</ol>
      </section>` : ""}

      ${c.finale ? `<section class="section wrap finale" id="sec-final" aria-labelledby="fn-h"><span class="label">Outcome</span><h2 id="fn-h">${esc(c.finale.title)}.</h2><p class="lead">${esc(c.finale.text)}</p>${c.finale.image ? `<img src="${esc(c.finale.image)}" alt="Sketches of the final concept" loading="lazy">` : ""}</section>` : ""}

      ${c.steps ? `<section class="section" id="sec-walkthrough" aria-labelledby="wt-h"><div class="wrap"><div class="section-head"><div><span class="label">Walkthrough</span><h2 id="wt-h">${esc(c.stepsTitle || "One update, step by step.")}</h2></div></div></div>
        ${block({ type: "story", device: c.device || "phone", steps: c.steps.map((x) => ({ title: x.title, text: x.caption, img: x.img || "" })) }, p)}</section>` : ""}

      ${c.specs ? `<section class="section wrap" id="sec-specs" aria-labelledby="sp-h"><div class="section-head"><div><span class="label">${c.specsTitle ? "Credits" : "Specs"}</span><h2 id="sp-h">${esc(c.specsTitle || "What's in it.")}</h2></div></div>
        <div class="specs">${c.specs.map((g) => `<div class="spec-group"><h3>${esc(g.group)}</h3><div>${g.rows.map((r) => `<div class="spec-row"><span class="muted">${esc(r.label)}</span><span>${esc(r.detail)}</span></div>`).join("")}</div></div>`).join("")}</div>
      </section>` : ""}

      ${galleryBlock(p)}
      <section class="section wrap skim-hide" style="padding-bottom:0" aria-labelledby="more-h"><div class="section-head"><h2 id="more-h">Explore more.</h2><a class="more" href="#archive">Archive</a></div>
        <div class="grid">${ordered.filter((x) => x !== p && isCase(x)).slice(0, 3).map(card).join("")}</div></section>
      <div style="margin-top:64px">${pager(p)}</div>
    </main>`;
  }
  function galleryBlock(p) {
    if (!p.gallery || !p.gallery.length) return "";
    return `<section class="section wrap" aria-label="Gallery" style="padding-top:24px"><div class="gallery">${p.gallery.map((g) => `<figure data-reveal${g.full ? ' class="full"' : g.natural ? ' class="nat"' : ""}><img src="${esc(g.src)}" alt="${esc(g.caption || p.title)}" loading="lazy"><figcaption>${esc(g.caption || "")}</figcaption></figure>`).join("")}</div></section>`;
  }
  function entry(p) {
    const used = new Set(((S.showcase || {})[p.id] || []).filter((b) => b.type === "note").map((b) => b.entry));
    const secs = (S.entries[p.id] || []).filter((_, i) => !used.has(i)), kind = kindOf(p);
    return `<main id="main" data-kind="${kind}">
      <section class="wrap cs-hero"><div class="eyebrow"><span class="mono" style="color:var(--blue-ink)">${esc(p.discipline)}</span><span class="mono muted">${esc(p.acc)}</span>${depthChip(p)}</div>
        ${titleOf(p, ' style="max-width:16ch"')}<p class="lead">${esc(p.summary)}</p>
        ${actions(p)}
        <div class="cs-hero-media">${cover(p, { src: p.hero || p.cover, label: p.video ? "Video" : "Image to come", natural: true })}</div>
      </section>
      ${kind === "visual" ? `<div class="showcase">${((S.showcase || {})[p.id] || []).map((b) => block(b, p)).join("")}</div>` + galleryBlock(p) : ""}
      <div class="wrap entry-grid">
        <aside class="side">${glanceRows(p)}</aside>
        <div class="body">${secs.length ? secs.map((s) => `<section><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></section>`).join("") : used.size ? "" : `<p class="muted">Notes on this project are on their way.</p>`}</div>
      </div>
      ${kind === "visual" ? "" : `<div class="showcase">${((S.showcase || {})[p.id] || []).map((b) => block(b, p)).join("")}</div>`}
      ${protoBlock(p)}
      ${kind === "visual" ? "" : galleryBlock(p)}
      ${pager(p)}
    </main>`;
  }
  function glimpse(p) {
    return `<main id="main" data-kind="${kindOf(p)}">
      <div class="wrap" style="padding-top:clamp(32px,4vw,56px)">${cover(p, { src: p.hero || p.cover, ratio: "16 / 9", label: "Image to come", natural: true })}</div>
      <div class="wrap entry-grid" style="padding-bottom:40px">
        <div class="side"><span class="mono" style="color:var(--blue-ink)">${esc(p.acc)}</span><h1 style="font-size:var(--t-h2)">${esc(p.title)}</h1></div>
        <div class="body"><p>${esc(p.summary)}</p>${actions(p)}<div class="glance" style="padding:0">${glanceRows(p)}</div></div>
      </div>
      <div class="showcase">${((S.showcase || {})[p.id] || []).map((b) => block(b, p)).join("")}</div>
      ${galleryBlock(p)}
      ${pager(p)}
    </main>`;
  }

  /* ---------- FILMS: a different side, played like a DVD ---------- */
  const pad2 = (n) => String(n).padStart(2, "0");
  // A video's link: its YouTube id, else a search on my channel (q), else a YouTube search (search).
  const ytHref = (v) => v.id || v.film ? "https://www.youtube.com/watch?v=" + (v.id || v.film)
    : v.search ? "https://www.youtube.com/results?search_query=" + encodeURIComponent(v.search)
    : v.q ? S.films.channel + "/search?query=" + encodeURIComponent(v.q) : S.films.channel;
  function filmCard(f) {
    const proj = f.project && byId[f.project];
    const id = f.id || f.film || "";
    return `<div class="fcard" data-reveal><a class="fc-link" href="${ytHref(f)}" target="_blank" rel="noopener"${id ? ` data-yt="${esc(id)}" data-title="${esc(f.title)}" data-thumb="${esc(f.thumb || "")}"` : ""}>
      <span class="fc-thumb">${f.thumb ? `<img src="${esc(f.thumb)}" alt="" loading="lazy">` : ""}${f.runtime ? `<span class="fc-rt mono">${esc(f.runtime)}</span>` : ""}<span class="fc-play" aria-hidden="true">▶</span></span>
      <span class="fc-t">${esc(f.title)}</span></a>
      <span class="fc-sub mono">${esc([f.kind || f.where, f.year].filter(Boolean).join(" · "))}</span>
      ${proj ? `<a class="more fc-proj" href="${href(proj)}">The project</a>` : ""}</div>`;
  }
  /* Every collection of films is a disc. Each film on a disc is a chapter. */
  function discs() {
    const F = S.films;
    const norm = (x) => ({ name: x.name || x.title, sub: x.alt || x.kind || x.where || "", region: x.region || "", year: x.year || "", runtime: x.runtime || "",
      music: x.music || "", thumb: x.thumb || "", clip: x.clip || "", yt: x.film || x.id || "", href: (x.film || x.id || x.q || x.search) ? ytHref(x) : "", wip: !!(x.status && x.status !== "Documented") });
    return [
      { id: "rajasthan", title: F.series.title, kind: "Series " + F.series.number, section: "series", items: F.places.map(norm) },
      { id: "trailers", title: "Trailers & teasers", kind: "From the projects", section: "trailers", items: (F.trailers || []).map(norm) },
      { id: "coursework", title: "Coursework", kind: "Course summaries", section: "coursework", items: F.coursework.map(norm) },
      { id: "others", title: "Other films", kind: "Farewells, stop motion, an ad", section: "more-films", items: (F.extra || []).map(norm) }
    ].filter((d) => d.items.length).map((d, i) => Object.assign(d, { no: pad2(i + 1) }));
  }
  // Rajasthan's title card: dusk sky, a fort on its hill, dunes, and postcards from the places
  function rajIntro() {
    const crenel = (x0, x1, y) => { let d = `M${x0} 300V${y}`; for (let x = x0; x < x1; x += 24) d += `H${x + 12}V${y - 10}H${Math.min(x1, x + 24)}V${y}`; return d + "V300Z"; };
    const chh = (x, y, k) => `M${x - 22 * k} ${y}h${44 * k}v${-4 * k}h${-44 * k}Z M${x - 18 * k} ${y - 4 * k}v${-20 * k}h${4 * k}v${20 * k}Z M${x + 14 * k} ${y - 4 * k}v${-20 * k}h${4 * k}v${20 * k}Z M${x - 24 * k} ${y - 24 * k}h${48 * k}v${-4 * k}h${-48 * k}Z M${x - 19 * k} ${y - 28 * k}a${19 * k} ${21 * k} 0 0 1 ${38 * k} 0Z M${x - 1.5 * k} ${y - 49 * k}h${3 * k}v${-9 * k}h${-3 * k}Z`;
    let wall = crenel(360, 880, 132);
    [[328, 64, 150], [512, 58, 108], [716, 66, 100], [884, 60, 142]].forEach(([x, w, y]) => { wall += `M${x} 300V${y}a${w / 2} 16 0 0 1 ${w} 0V300Z`; });
    wall += "M566 300V74H694V300Z" + chh(604, 74, 1) + chh(656, 74, 1) + chh(360, 150, 0.8) + chh(914, 142, 0.8) + chh(541, 108, 0.7) + chh(749, 100, 0.7);
    let win = ""; [104, 140, 176, 212].forEach((y) => { for (let x = 578; x < 684; x += 26) win += `M${x} ${y}v14h12v-14q-6-10-12 0Z`; });
    const cards = S.films.places.filter((x) => x.thumb).slice(0, 4);
    const camel = (x, k) => `<g transform="translate(${x} ${44 - 44 * k}) scale(${k})"><path d="M5 43V27q-1-7 5-9 3-9 9-9 6 0 8 9 4 2 8-1 2-11 8-15l7-2q4 1 2 5l-5 2q-3 6-4 14-1 8-6 8v15h-3V30H15v13h-3V30q-4 2-4 13Z"/></g>`;
    const letters = "Rajasthan".split("").map((ch, i) => `<span class="rjl" aria-hidden="true"><i style="--i:${i}">${ch}</i></span>`).join("");
    return `<section class="raj-intro pin" data-pin="rajintro" aria-labelledby="ri-h"><div class="pin-in"><div class="ri-card">
      <div class="ri-sky" aria-hidden="true"><i class="ri-night"></i><i class="ri-stars"></i><i class="ri-sun"></i>
        <svg class="ri-birds" viewBox="0 0 160 50"><path d="M4 22q6-8 11 0 5-8 11 0M40 10q5-7 9 0 4-7 9 0M70 30q5-7 9 0 4-7 9 0M104 14q4-6 8 0 4-6 8 0M128 36q4-6 8 0 4-6 8 0"/></svg>
        <span class="ri-kite k1"><i></i></span><span class="ri-kite k2"><i></i></span><span class="ri-kite k3"><i></i></span></div>
      <div class="ri-t"><span class="mono">Series 01 · A travel documentary</span><h2 id="ri-h" aria-label="Rajasthan">${letters}</h2><p class="mono ri-places">${S.films.places.map((x) => `<span>${esc(x.name)}</span>`).join("")}</p></div>
      <svg class="ri-far" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 200V150Q90 110 180 128T380 96Q470 70 560 104T780 84Q900 58 1010 100T1200 92V200Z"/></svg>
      <svg class="ri-fort" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><path class="ri-hill" d="M0 300V214Q160 176 320 196T640 178T960 196T1200 206V300Z"/><path class="ri-wall" d="${wall}"/><path class="ri-win" d="${win}"/></svg>
      <svg class="ri-dune d1" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 200V96Q220 30 470 92T930 70T1200 88V200Z"/></svg>
      <div class="ri-caravan" aria-hidden="true"><svg viewBox="0 0 250 46">${camel(0, 0.8)}${camel(62, 1)}${camel(128, 0.9)}${camel(192, 0.74)}</svg></div>
      <svg class="ri-dune d2" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 200V132Q300 74 620 128T1200 112V200Z"/></svg>
      <svg class="ri-dune d3" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 200V168Q340 126 700 164T1200 150V200Z"/></svg>
      <div class="ri-posts" aria-hidden="true">${cards.map((x, i) => `<figure class="ri-post p${i}" style="--i:${i}"><img src="${esc(x.thumb)}" alt="" loading="lazy"><figcaption>${esc(x.name)}</figcaption></figure>`).join("")}</div>
      <i class="raj-border ri-b top" aria-hidden="true"></i><i class="raj-border ri-b bottom" aria-hidden="true"></i>
    </div></div></section>`;
  }
  function films() {
    const F = S.films, eps = F.places, D = discs();
    const yt = (id) => "https://www.youtube.com/watch?v=" + id;
    // Map: the outline of Rajasthan (DataMeet boundaries, simplified) and the places on it, by real coordinates
    const M = F.map, W = M.W, H = M.H;
    const X = (lon) => M.pad + (lon - M.lon0) * M.k * M.sx, Y = (lat) => M.pad + (M.lat1 - lat) * M.sx;
    const route = eps.map((x, i) => `${i ? "L" : "M"}${X(x.lon).toFixed(1)} ${Y(x.lat).toFixed(1)}`).join(" ");
    const grid = `<path class="raj" d="${M.path}"/><path class="route" d="${route}"/>
      <g class="compass" transform="translate(${W - 58} 70)"><circle r="26"/><path d="M0 -22 L5 0 L0 22 L-5 0Z"/><text y="-30" text-anchor="middle">N</text></g>
      <text class="raj-name" x="${X(69.45).toFixed(1)}" y="${Y(23.55).toFixed(1)}">RAJASTHAN</text>`;
    const LABEL = { tr: [12, -10, "start"], l: [-12, 6, "end"], bl: [-10, 24, "end"], br: [10, 24, "start"] }; // where a place's name sits: films.js → label
    const pts = eps.map((x, i) => `<g class="pt ${x.status === "Documented" ? "done" : "wip"}" data-i="${i}" style="--d:${i * 0.35}s" transform="translate(${X(x.lon).toFixed(1)} ${Y(x.lat).toFixed(1)})"><circle class="pulse" r="7"/><circle class="dotp" r="6"/>${((l) => `<text x="${l[0]}" y="${l[1]}" text-anchor="${l[2]}">${esc(x.name)}</text>`)(LABEL[x.label] || LABEL.tr)}<title>${esc(x.name)}, ${esc(x.status)}</title></g>`).join("");
    const docd = eps.filter((x) => x.status === "Documented").length;
    const btn = (act, label) => `<li><button type="button" class="nav-i" data-act="${act}">${label}</button></li>`;
    const d0 = D[0];
    return `<main id="main" class="films-page${fxIntro ? " fx-enter" : ""}">
      <section class="dvd" aria-label="Films, played on a DVD player"><div class="wrap">
        <div class="dvd-head"><span class="dot-label"><i class="rec" aria-hidden="true"></i> .films · reel 01</span></div>

        <div class="tv" id="tv" tabindex="0" aria-describedby="dvd-hint">
          <div class="tv-bg" id="tv-bg" aria-hidden="true"></div>
          <div class="scr" data-scr="menu">
            <div class="scr-top mono"><span id="m-disc">SDR FILMS · DISC ${d0.no}</span><span id="m-count">CHAPTERS</span></div>
            <div class="menu-body"><span class="mono dvd-kind" id="m-kind">${esc(d0.kind)}</span><h1 class="dvd-title" id="m-title">${esc(F.headline)}</h1>
              <ul class="dvd-menu">${btn("playall", "Play all")}${btn("scenes", "Scene selection")}${btn("about", "About this disc")}${btn("eject", "Eject")}</ul></div>
          </div>
          <div class="scr" data-scr="scenes" hidden>
            <div class="scr-top mono"><span>SCENE SELECTION</span><span id="s-disc"></span></div>
            <div class="scenes" id="scenes"></div>
          </div>
          <div class="scr" data-scr="play" hidden>
            <div class="play-media" id="play-media"></div>
            <div class="osd osd-tl mono"><i class="rec" aria-hidden="true"></i><span id="osd-mode">PREVIEW</span></div>
            <div class="osd osd-tr mono" id="osd-ch">CH 01</div>
            <div class="play-cap"><span class="mono" id="play-sub"></span><b id="play-name"></b></div>
            <div class="play-bar"><span class="mono" id="tc">00:00:00:00</span><span class="bar"><i id="bar"></i></span>
              <span class="ctl"><button type="button" class="nav-i" data-act="prev" aria-label="Previous chapter">⏮</button><button type="button" class="nav-i" data-act="pause" aria-label="Pause or play" id="pp">❚❚</button><button type="button" class="nav-i" data-act="next" aria-label="Next chapter">⏭</button><button type="button" class="nav-i mono" data-act="menu">MENU</button><a class="watch nav-i" id="watch" href="${esc(F.channel)}" target="_blank" rel="noopener">Watch the film ↗</a></span></div>
          </div>
          <div class="scr scr-load" data-scr="load" hidden><span class="mono" id="load-msg">LOADING</span></div>
          <div class="osd-flash mono" id="osd-flash" aria-hidden="true"></div>
          <div class="saver" id="saver" hidden aria-hidden="true"><span id="saver-logo">SDR</span></div>
        </div>

        <div class="deck-wrap"><div class="deck" id="deck">
          <span class="deck-brand"><b>SDR</b><span class="mono">DVD · VIDEO</span></span>
          <span class="slot"><span class="tray" id="tray"><span class="disc"><img id="disc-img" src="${esc(d0.items[0].thumb)}" alt=""></span></span></span>
          <span class="vfd mono"><i class="vfd-disc" aria-hidden="true"></i><span id="vfd" aria-live="polite">DISC ${d0.no}</span></span>
          <span class="deck-btns">
            <button type="button" data-act="eject" aria-label="Open or close the tray">⏏</button>
            <button type="button" data-act="prev" aria-label="Previous chapter">⏮</button>
            <button type="button" data-act="playpause" aria-label="Play or pause" class="pp">▶</button>
            <button type="button" data-act="next" aria-label="Next chapter">⏭</button>
            <button type="button" data-act="stop" aria-label="Stop and go to the menu">■</button>
          </span>
          <i class="led" id="led" aria-hidden="true"></i>
        </div></div>
        <p id="dvd-hint" class="mono muted dvd-hint">Drag a disc into the player, or tap one · arrow keys move · Enter selects · M for menu · E to eject</p>

        <div class="cases" role="list" aria-label="Disc collection">${D.map((d, i) => `<div role="listitem" style="--i:${i}"><button type="button" class="case${i === 0 ? " in" : ""}" data-disc="${i}" aria-label="Load disc ${d.no}: ${esc(d.title)}">
          <span class="case-disc" aria-hidden="true"><img src="${esc(d.items[0].thumb)}" alt=""></span>
          <span class="case-cover">${d.items[0].thumb ? `<img src="${esc(d.items[0].thumb)}" alt="">` : ""}<span class="case-top mono">SDR FILMS · DISC ${d.no}</span><span class="case-t"><span class="mono">${esc(d.kind)}</span><b>${esc(d.title)}</b></span></span>
          <span class="case-tag mono">In the player</span></button></div>`).join("")}</div>
      </div></section>

      <div class="scene-raj" data-scene="rajasthan">${rajIntro()}
      <section class="section wrap series-card" id="series" data-reveal>
        <span class="mono">Series ${esc(F.series.number)}</span><h2>${esc(F.series.title)}</h2><button type="button" class="more load-disc" data-load-disc="rajasthan">Play this disc</button>
        <p class="lead">${esc(F.intro)}</p>
      </section>

      <section class="wrap" id="route" aria-labelledby="rt-h">
        <h2 id="rt-h" class="sr">The route</h2>
        <div class="places-grid">
          <figure class="map" data-reveal><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Map of the places I have filmed in Rajasthan"><g class="grid">${grid}</g>${pts}</svg>
            <figcaption><span><i class="k done"></i>Documented</span><span><i class="k wip"></i>In progress</span><span class="map-src">Outline: DataMeet</span></figcaption></figure>
          <ol class="places">${eps.map((x, i) => `<li data-reveal>${x.film ? `<a class="place" data-i="${i}" href="${yt(x.film)}" target="_blank" rel="noopener" data-yt="${esc(x.film)}" data-title="${esc(x.name)}" data-thumb="${esc(x.thumb || "")}">` : `<div class="place" data-i="${i}">`}
            <span class="pf">${x.thumb ? `<img src="${esc(x.thumb)}" alt="" loading="lazy">` : `<span class="pf-ph">In the edit</span>`}</span>
            <span class="pt-t"><span class="mono muted">CH ${pad2(i + 1)} · ${esc(x.region)}${x.year ? " · " + esc(x.year) : ""}${x.runtime ? " · " + esc(x.runtime) : ""}</span><b>${esc(x.name)}</b>${x.alt ? `<span class="muted">${esc(x.alt)}</span>` : ""}</span>
            <span class="chip${x.status === "Documented" ? "" : " blue"}">${esc(x.status)}</span>${x.film ? `<span class="play" aria-hidden="true">▶</span>` : ""}
            ${x.film ? "</a>" : "</div>"}</li>`).join("")}</ol>
        </div>
      </section>

      <section class="section" id="stills" aria-labelledby="st-h"><div class="wrap"><div class="section-head" data-reveal><div><span class="dot-label">.stills</span><h2 id="st-h">Frames from the road.</h2></div></div></div>
        <div class="strip"><div class="strip-track">${[...eps.filter((x) => x.thumb), ...(F.extra || []).filter((x) => x.thumb), ...(F.trailers || []).filter((x) => x.thumb)].map((x, i) => `<figure class="frame"><img src="${esc(x.thumb)}" alt="${esc(x.name || x.title)}" loading="lazy"><figcaption class="mono">${pad2(i + 1)}A · ${esc((x.name || x.title).toUpperCase())}</figcaption></figure>`).join("")}</div></div>
      </section>

      <i class="raj-border bottom" aria-hidden="true"></i></div>

      ${(F.trailers || []).length ? `<section class="section wrap" id="trailers" aria-labelledby="tr-h"><div class="section-head" data-reveal><div><span class="dot-label">.trailers and teasers</span><h2 id="tr-h">From the projects.</h2></div><button type="button" class="more load-disc" data-load-disc="trailers">Play this disc</button></div>
        <div class="fgrid">${F.trailers.map(filmCard).join("")}</div></section>` : ""}

      ${F.coursework.length ? `<section class="section wrap" id="coursework" aria-labelledby="cw-h" style="padding-top:0"><div class="section-head" data-reveal><div><span class="dot-label">.coursework documentation</span><h2 id="cw-h">Course summaries on film.</h2></div><button type="button" class="more load-disc" data-load-disc="coursework">Play this disc</button></div>
        <p class="lead" style="margin:-16px 0 32px">Short films summing up courses at the School of Design, IIT Jodhpur.</p>
        <div class="fgrid">${F.coursework.map(filmCard).join("")}</div></section>` : ""}

      ${(F.extra || []).length ? `<section class="section wrap" id="more-films" aria-labelledby="mf-h" style="padding-top:0"><div class="section-head" data-reveal><div><span class="dot-label">.other films</span><h2 id="mf-h">Farewells, stop motion, an ad.</h2></div><button type="button" class="more load-disc" data-load-disc="others">Play this disc</button></div>
        <div class="fgrid">${F.extra.map(filmCard).join("")}</div></section>` : ""}

      <section class="section wrap next-stops" id="next" data-reveal><span class="dot-label">.next stops</span><h2>More places soon.</h2>
        <p class="lead">${F.planned.length ? "Planned: " + F.planned.map((x) => esc(x.name)).join(", ") + "." : "This page grows with every trip."}</p></section>
    </main>`;
  }

  /* ---------- WRITING ---------- */
  function writing() {
    return `<main id="main">
      <div class="wrap page-head"><span class="label">Writing</span><h1>Papers and notes.</h1><p class="lead">Research that grew out of the work.</p></div>
      <div class="wrap">${S.writing.map((w) => { const b = byId[w.basedOn]; return `<article class="paper"><span class="mono muted">${esc(w.venue)}</span>
        <div style="display:grid;gap:12px"><h2>${esc(w.title)}</h2><p class="muted">${esc(w.abstract || "Abstract to be added once the camera-ready version is final.")}</p>${b ? `<a class="more" href="${href(b)}">Based on ${esc(b.title)}</a>` : ""}</div>
        <div style="display:grid;gap:10px;justify-items:start"><span class="chip blue">${esc(w.status)}</span>${w.href ? `<a class="btn" href="${esc(w.href)}" target="_blank" rel="noopener">Read the paper</a>` : ""}</div></article>`; }).join("")}</div>
    </main>`;
  }

  /* ---------- ABOUT ---------- */
  function about() {
    return `<main id="main">
      <div class="wrap page-head about-top">
        <div><span class="label">About</span><h1>A designer building uncommon ideas.</h1>
        <p class="lead" style="max-width:44ch">I'm ${esc(S.owner.name)}, an interaction designer based in ${esc(S.owner.base)}. I trained in interaction design at PES University and in XR design at IIT Jodhpur. Today I design AI-supported tools for oncologists at i3 Digital Health.</p>
        <p style="margin-top:20px;max-width:52ch">${esc(S.owner.bio)}</p></div>
        <div class="portrait">${S.owner.portrait ? `<img src="${esc(S.owner.portrait)}" alt="Portrait of ${esc(S.owner.name)}">` : `<span class="label">Portrait to come</span>`}</div>
      </div>
      ${S.owner.workSetup ? `<figure class="wrap setup"><img src="${esc(S.owner.workSetup)}" alt="My desk: a laptop and a monitor running video-editing software, lit green" loading="lazy"><figcaption>Just my work setup.</figcaption></figure>` : ""}
      <section class="wrap section" style="padding-top:24px" aria-labelledby="j-h"><div class="section-head"><div><span class="label">Journey</span><h2 id="j-h">How I got here.</h2></div><a class="more" href="#resume">Résumé</a></div>
        <div class="timeline">${S.journey.map((j) => `<div class="tl"><span class="yr">${esc(j.years)}</span><span class="rail" aria-hidden="true"></span><div class="body"><h3>${esc(j.place)}</h3><p class="muted">${esc(j.line)}</p></div></div>`).join("")}</div>
      </section>
      ${contactBlock()}
    </main>`;
  }

  /* ---------- RÉSUMÉ ---------- */
  function resume() {
    const R = S.resume;
    const item = (x) => `<div class="cv-item"><h3>${esc(x.org)}${x.role ? ` <span class="muted" style="font-weight:400">· ${esc(x.role)}</span>` : ""}</h3><span class="r">${esc(x.years)}</span>${x.line ? `<p>${esc(x.line)}</p>` : ""}</div>`;
    return `<main id="main">
      <div class="wrap page-head"><span class="label">Résumé</span><h1>${esc(S.owner.name)}</h1><p class="lead">${esc(S.owner.role)}, ${esc(S.owner.base)}. UX, extended reality, games and film.</p>
        <div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap">${S.owner.resumePdf ? `<a class="btn" href="${esc(S.owner.resumePdf)}" target="_blank" rel="noopener">Open the PDF</a>` : ""}<button class="btn ghost" type="button" data-copy="${esc(S.owner.email)}">Copy email</button></div></div>
      <div class="wrap cv">
        <section class="cv-sec"><span class="label">Experience</span><div>${R.experience.map(item).join("")}</div></section>
        <section class="cv-sec"><span class="label">Education</span><div>${R.education.map(item).join("")}</div></section>
        <section class="cv-sec"><span class="label">Publications</span><div>${S.writing.map((w) => item({ org: w.title, role: w.venue, years: w.status })).join("")}</div></section>
        <section class="cv-sec"><span class="label">Selected projects</span><div>${P.filter(isCase).map((p) => `<div class="cv-item"><h3><a href="${href(p)}">${esc(p.title)}</a></h3><span class="r">${esc(p.year)}</span><p>${esc(p.summary)}</p></div>`).join("")}</div></section>
        <section class="cv-sec"><span class="label">Skills</span><div>${R.skills.map((s) => `<div class="cv-item"><h3>${esc(s.group)}</h3><p style="color:var(--fg)">${s.items.map(esc).join(" · ")}</p></div>`).join("")}</div></section>
      </div>
    </main>`;
  }

  /* ---------- COLOPHON ---------- */
  function colophon() {
    return `<main id="main"><div class="wrap page-head"><span class="label">Colophon</span><h1>About this archive.</h1></div>
      <div class="wrap" style="max-width:calc(var(--text) + 32px);margin-left:max(0px, calc((100vw - var(--max)) / 2));display:grid;gap:22px;font-size:19px">
        <p>This site is my design archive. It keeps the finished work, the coursework and the experiments, so it still makes sense to someone reading it years from now.</p>
        <p><b>How it's built.</b> Plain HTML, CSS and JavaScript, with every project held in one data file. There is no framework, no build step and no subscription: the files are mine, and the only cost is the domain.</p>
        <p><b>How it's organised.</b> Every project has an accession number, like SDR/26/01: the year it was made, then its order within that year. You can sort the archive by discipline, by chapter of my life, by theme, or by depth, from full case studies to single images.</p>
        <p><b>Type.</b> Inter Tight for headings, Inter for text and JetBrains Mono for numbers. The one colour is the blue from TexGenie, my B.Des thesis.</p>
        <p><b>Last updated</b> ${esc(S.owner.updated)}. Contact: <span style="user-select:all">${esc(S.owner.email)}</span></p>
      </div></main>`;
  }
  function notFound() {
    return `<main id="main"><div class="wrap page-head"><span class="label">Not found</span><h1>That page isn't in the archive.</h1><p class="lead">It may have moved. Search for it, or start from the archive.</p><p style="margin-top:28px"><a class="btn" href="#archive">Open the archive</a></p></div></main>`;
  }

  /* ---------- command palette ---------- */
  function palette() {
    const pages = [["Home", "#home"], ["Selected work", "#work"], ["Archive", "#archive"], ["Films", "#films"], ["Writing", "#writing"], ["About", "#about"], ["Résumé", "#resume"], ["Colophon", "#colophon"]];
    const actions = [["Copy email address", "copy"], ["Switch light or dark", "theme"], ["Open a random project", "random"]];
    const bg = document.createElement("div");
    bg.className = "palette-bg";
    bg.innerHTML = `<div class="palette" role="dialog" aria-modal="true" aria-label="Search"><label class="sr" for="pal-q">Search projects and pages</label><input id="pal-q" type="text" placeholder="Search projects, pages and actions" autocomplete="off"><ul id="pal-list" role="listbox" data-lenis-prevent></ul><div class="foot"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div></div>`;
    document.body.appendChild(bg);
    const input = $("#pal-q", bg), ul = $("#pal-list", bg);
    let sel = 0, items = [];
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      const m = (s) => !q || s.toLowerCase().includes(q);
      const pr = P.filter((p) => m([p.title, p.summary, p.discipline, p.context, p.tools, p.year].join(" ")));
      const pg = pages.filter(([l]) => m(l)), ac = actions.filter(([l]) => m(l));
      items = [];
      let html = "";
      const grp = (title, arr, fn) => { if (!arr.length) return; html += `<li class="grp label" role="presentation">${title}</li>`; arr.forEach((x) => { const [label, h, sub, act] = fn(x); const i = items.length; items.push({ h, act }); html += `<li role="option"><a href="${h || "#"}" data-i="${i}"${act ? ` data-act="${act}"` : ""}><span>${esc(label)}</span><span class="mono muted">${esc(sub || "")}</span></a></li>`; }); };
      grp("Projects", pr, (p) => [p.title, href(p), p.discipline + " · " + yearLabel(p)]);
      grp("Pages", pg, ([l, h]) => [l, h, ""]);
      grp("Actions", ac, ([l, a]) => [l, "", "", a]);
      ul.innerHTML = html || `<li class="grp muted">No matches.</li>`;
      sel = Math.min(sel, Math.max(items.length - 1, 0));
      mark();
    };
    const mark = () => $$("a[data-i]", ul).forEach((a) => { const on = +a.dataset.i === sel; a.classList.toggle("sel", on); a.setAttribute("aria-selected", on); if (on) a.scrollIntoView({ block: "nearest" }); });
    const close = () => { bg.remove(); document.removeEventListener("keydown", key, true); };
    const run = (i) => { const it = items[i]; if (!it) return; close(); if (it.act) doAction(it.act); else location.hash = it.h; };
    const key = (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % items.length; mark(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + items.length) % items.length; mark(); }
      else if (e.key === "Enter") { e.preventDefault(); run(sel); }
    };
    document.addEventListener("keydown", key, true);
    input.addEventListener("input", () => { sel = 0; draw(); });
    ul.addEventListener("click", (e) => { const a = e.target.closest("a[data-i]"); if (a) { e.preventDefault(); run(+a.dataset.i); } });
    bg.addEventListener("click", (e) => { if (e.target === bg) close(); });
    draw(); input.focus();
  }
  function doAction(a) {
    if (a === "copy") copy(S.owner.email);
    if (a === "theme") toggleTheme();
    if (a === "random") location.hash = href(P[Math.floor(Math.random() * P.length)]);
  }

  /* ---------- utilities ---------- */
  document.addEventListener("error", (e) => {
    const t = e.target; if (!t || !/^(IMG|VIDEO)$/.test(t.tagName) || t.closest(".rf-fr, .disc-ghost, .fs-frame, .tvfx")) return;
    const file = (t.getAttribute("src") || "").split("/").pop(), kind = t.tagName === "VIDEO" ? "video" : t.dataset.ph || (t.closest(".dev, .ws-media, .figs.phones, .hp-media") ? "screen" : "visual");
    const w = document.createElement("span"); w.innerHTML = si(kind, file); const n = w.firstChild; t.classList.forEach((c) => n.classList.add(c)); t.replaceWith(n);
  }, true);
  // Colour-vision filters (Machado, Oliveira and Fernandes, 2009, full severity), used by the simulator blocks
  document.body.insertAdjacentHTML("beforeend", `<svg class="sr" aria-hidden="true" focusable="false"><defs>${[["prot", "0.152286 1.052583 -0.204868 0 0 0.114503 0.786281 0.099216 0 0 -0.003882 -0.048116 1.051998 0 0"], ["deut", "0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047413 0 0 -0.011820 0.042940 0.968881 0 0"], ["trit", "1.255528 -0.076749 -0.178779 0 0 -0.078411 0.930809 0.147602 0 0 0.004733 0.691367 0.303900 0 0"], ["achr", "0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0"]].map(([k, m]) => `<filter id="cb-${k}" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="${m} 0 0 0 1 0"/></filter>`).join("")}</defs></svg>`);
  // YouTube and Figma can be embedded on the real site; previews elsewhere link out instead
  const EMBED_OK = (() => { try { const h = location.hostname; return location.protocol === "file:" || /(^|\.)srijithdraj\.com$|\.pages\.dev$|^localhost$|^127\.0\.0\.1$/.test(h) || (S.owner.embedHosts || []).some((x) => h === x || h.endsWith("." + x)); } catch (e) { return false; } })();
  function theatre(id, title, thumb) {
    const back = document.activeElement, yt = "https://www.youtube.com/watch?v=" + id;
    const el = document.createElement("div");
    el.className = "theatre"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", title || "Film"); el.setAttribute("data-lenis-prevent", "");
    el.innerHTML = `<div class="th-in"><div class="th-top"><span class="mono"><i class="rec" aria-hidden="true"></i>${esc(title || "Now playing")}</span><button type="button" class="th-x" aria-label="Close">✕</button></div>
      <div class="th-screen">${EMBED_OK ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${esc(title || "Film")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
        : `${thumb ? `<img src="${esc(thumb)}" alt="">` : ""}<p>Films play right here on the live site. In this preview, open it on YouTube.</p>`}</div>
      <div class="th-bot"><a class="btn${EMBED_OK ? " ghost" : ""}" href="${yt}" target="_blank" rel="noopener">Watch on YouTube ↗</a></div></div>`;
    document.body.appendChild(el); if (lenis) lenis.stop();
    requestAnimationFrame(() => el.classList.add("on"));
    const close = () => { el.classList.remove("on"); removeEventListener("keydown", key); if (lenis) lenis.start(); setTimeout(() => el.remove(), 260); if (back && back.focus) back.focus({ preventScroll: true }); };
    const key = (e) => { if (e.key === "Escape") close(); };
    addEventListener("keydown", key);
    el.addEventListener("click", (e) => { if (e.target === el || e.target.closest(".th-x")) close(); });
    $(".th-x", el).focus();
  }

  function showState(fr, i) {
    $$("[data-state]", fr).forEach((b, k) => b.setAttribute("aria-selected", String(k === i)));
    $$(".ws-media img", fr).forEach((im, k) => { im.classList.toggle("on", k === i); if (k === i) im.removeAttribute("aria-hidden"); else im.setAttribute("aria-hidden", "true"); });
  }
  // Screens with several states step through them on their own while in view, until someone picks one
  /* ---------- the motion kit: pinned stages and scroll-scrubbed blocks ---------- */
  const CB = [["none", "Typical"], ["prot", "Protanopia"], ["deut", "Deuteranopia"], ["trit", "Tritanopia"], ["achr", "Monochromacy"]];
  const PIN = {
    story(el) {
      const steps = $$(".sb-step", el), scr = $$(".sb-scr", el), dots = $$(".sb-rail button", el), n = steps.length; let cur = 0;
      dots.forEach((d, i) => d.addEventListener("click", () => { const top = el.getBoundingClientRect().top + scrollY, span = el.offsetHeight - innerHeight; goTo(top + span * (i + 0.5) / n); }));
      return (p) => {
        const i = Math.min(n - 1, Math.floor(p * n)); el.style.setProperty("--sp", (p * n - i).toFixed(3));
        if (i === cur) return; el.dataset.dir = i > cur ? "1" : "-1"; cur = i; haptic("tick");
        [steps, scr].forEach((L) => L.forEach((x, k) => { x.classList.toggle("on", k === i); x.classList.toggle("past", k < i); }));
        dots.forEach((d, k) => d.classList.toggle("on", k === i));
      };
    },
    appframe(el) {
      const tabs = $$("[data-af]", el), scr = $$(".af-s", el), txt = $$(".af-t", el), path = $(".af-path b", el), n = tabs.length; let cur = 0;
      tabs.forEach((t, i) => t.addEventListener("click", () => { const top = el.getBoundingClientRect().top + scrollY, span = el.offsetHeight - innerHeight; goTo(top + span * (i + 0.5) / n); }));
      return (p) => { const i = Math.min(n - 1, Math.floor(p * n)); if (i === cur) return; cur = i; haptic("tick");
        [tabs, scr, txt].forEach((L) => L.forEach((x, k) => x.classList.toggle("on", k === i))); if (path) path.textContent = tabs[i].textContent.replace(/^\d+/, ""); };
    },
    stack(el) {
      const cards = $$(".stk-card", el), n = cards.length, A = 0.78;
      return (p) => {
        const a = clamp01(p / A) * n, t = cards.map((_, i) => easeOut(clamp01(a - i)));
        cards.forEach((c, i) => {
          const d = t.slice(i + 1).reduce((s, v) => s + v, 0), sgn = i % 2 ? 1 : -1;
          c.style.transform = `translate3d(0, ${((1 - t[i]) * 108).toFixed(2)}vh, 0) translateY(${(-d * 18).toFixed(1)}px) scale(${(1 - Math.min(d, 4) * 0.045).toFixed(4)}) rotate(${((1 - t[i]) * sgn * 7 + sgn * 1.4 * Math.min(1, d)).toFixed(2)}deg)`;
          c.style.setProperty("--d", Math.min(d, 3).toFixed(3));
        });
        el.style.setProperty("--b", easeOut(clamp01((p - A) / (1 - A))).toFixed(4));
      };
    },
    hscroll(el) {
      const tr = $(".hs-track", el), cnt = $(".hs-count", el), items = $$(".hs-item", el), bar = $(".hs-bar i", el); let dist = 0, last = -1;
      const size = () => { dist = Math.max(0, tr.scrollWidth - document.documentElement.clientWidth); el.style.height = `calc(100svh + ${Math.round(dist)}px)`; };
      size(); addEventListener("resize", size); $$("img", tr).forEach((im) => im.addEventListener("load", size, { once: true }));
      cleanup.push(() => removeEventListener("resize", size));
      return (p) => {
        tr.style.transform = `translate3d(${(-p * dist).toFixed(1)}px, 0, 0)`; bar.style.transform = `scaleX(${p.toFixed(4)})`;
        const i = Math.min(items.length - 1, Math.round(p * (items.length - 1))); if (i !== last) { last = i; cnt.textContent = pad2(i + 1); }
      };
    },
    holo(el) {
      const ps = $$(".holo-p", el), n = ps.length, hi = $(".hh-i", el), hy = $(".hh-y", el), A = 34; let cur = 0;
      return (p) => {
        const W = el.clientWidth, R = Math.min(1150, W * 0.95), f = p * (n - 1);
        ps.forEach((x, i) => {
          const a = (i - f) * A, r = (a * Math.PI) / 180, o = clamp01(1 - Math.abs(a) / (A * 2.2));
          x.style.transform = `translate3d(${(Math.sin(r) * R * 0.6).toFixed(1)}px, 0, ${((Math.cos(r) - 1) * R * 0.6).toFixed(1)}px) rotateY(${(-a * 0.9).toFixed(2)}deg)`;
          x.style.opacity = o.toFixed(3); x.style.zIndex = String(100 - Math.round(Math.abs(a))); x.classList.toggle("on", Math.abs(a) < A / 2);
        });
        const y = Math.round(f * A); hy.textContent = `YAW ${y >= 0 ? "+" : "-"}${String(Math.abs(y)).padStart(3, "0")}°`;
        const i = Math.round(f); if (i !== cur) { cur = i; hi.textContent = pad2(i + 1); el.classList.remove("blip"); void el.offsetWidth; el.classList.add("blip"); haptic("tick"); }
      };
    },
    // The Rajasthan title card: full screen first, then it draws back as you keep scrolling
    // Rajasthan arrives full screen (night turns to dusk, the fort and dunes rise, the name is set letter by letter),
    // then shortens into a banner exactly as fast as the series below it comes up
    rajintro(el) {
      const inn = $(".pin-in", el), next = el.nextElementSibling;
      return (p) => {
        const full = inn.clientHeight, min = full * 0.42, top = inn.getBoundingClientRect().top;
        const h = next ? Math.max(min, Math.min(full, next.getBoundingClientRect().top - top)) : full, q = 1 - (h - min) / Math.max(1, full - min);
        el.style.setProperty("--h", h.toFixed(1) + "px"); el.style.setProperty("--q", q.toFixed(4));
        el.style.setProperty("--e", easeOut(clamp01(p / 0.52)).toFixed(4));
      };
    }
  };
  const GLYPHS = "▚▞▙▟░▒01<>/\\#+*";
  function decode(el, dur = 720) {
    if (reduced || el.dataset.dec) return; el.dataset.dec = "1";
    const parts = el.querySelectorAll(".cw").length ? $$(".cw", el) : [el], fin = parts.map((x) => x.textContent), t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      parts.forEach((x, j) => { const f = fin[j]; let out = ""; for (let c = 0; c < f.length; c++) out += (c / f.length < k * 1.25 - j * 0.04 || f[c] === " ") ? f[c] : GLYPHS[(Math.random() * GLYPHS.length) | 0]; x.textContent = out; });
      if (k < 1) requestAnimationFrame(step); else parts.forEach((x, j) => (x.textContent = fin[j]));
    };
    requestAnimationFrame(step);
  }
  const SCRUB = {
    chap: (el, r, vh) => clamp01((vh - r.top) / (vh * 0.72)),
    words: (el, r, vh) => clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.38)),
    tl: (el, r, vh) => clamp01((vh * 0.72 - r.top) / Math.max(1, r.height))
  };
  function pins() {
    const list = [
      ...$$("[data-pin]").map((el) => ({ el, up: PIN[el.dataset.pin] && !reduced ? PIN[el.dataset.pin](el) : null, pin: true, last: -1 })),
      ...$$("[data-scrub]").map((el) => ({ el, f: SCRUB[el.dataset.scrub], last: -1 }))
    ].filter((x) => x.up || x.f);
    if (reduced) $$('[data-scrub="chap"]').forEach((el) => el.classList.add("in"));
    if (!list.length || reduced) return;
    let raf = 0;
    const run = () => {
      raf = 0; const vh = innerHeight;
      list.forEach((x) => {
        const r = x.el.getBoundingClientRect(); if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
        const p = x.pin ? clamp01(-r.top / Math.max(1, r.height - vh)) : x.f(x.el, r, vh);
        if (Math.abs(p - x.last) < 0.0004) return; x.last = p;
        x.el.style.setProperty("--p", p.toFixed(4)); if (x.up) x.up(p);
        if (x.el.dataset.scrub === "chap" && p > 0.16 && !x.el.classList.contains("in")) x.el.classList.add("in");
      });
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(run); };
    run(); onScroll(req); addEventListener("resize", req);
    cleanup.push(() => { removeEventListener("resize", req); cancelAnimationFrame(raf); });
  }
  function charts() {
    const els = $$("[data-chart]"); if (!els.length) return;
    if (reduced || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -18% 0px" });
    els.forEach((e) => io.observe(e)); cleanup.push(() => io.disconnect());
  }
  function compares() {
    $$("[data-cmp]").forEach((f) => {
      const r = $(".cmp-r", f), set = (v) => { f.style.setProperty("--x", v + "%"); r.value = v; };
      r.addEventListener("input", () => { f.classList.add("used"); set(+r.value); });
      if (reduced || !("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver((ents) => { if (!ents[0].isIntersecting) return; io.disconnect(); const t0 = performance.now();
        const step = (now) => { if (f.classList.contains("used")) return; const k = Math.min(1, (now - t0) / 1800); set(Math.round(50 + Math.sin(k * Math.PI * 2) * 24 * (1 - k))); if (k < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step); }, { rootMargin: "0px 0px -25% 0px" });
      io.observe(f); cleanup.push(() => io.disconnect());
    });
  }
  function cbsims() {
    $$("[data-cbs]").forEach((f) => {
      const v = $(".cbs-view", f), tag = $(".cbs-tag", f), btns = $$("[data-cb]", f), mode = $("[data-cbmode]", f); let raf = 0, idle = !reduced, t = 0;
      const pick = (k) => { f.style.setProperty("--cbf", k === "none" ? "none" : `url(#cb-${k})`); btns.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.cb === k))); tag.textContent = CB.find((x) => x[0] === k)[1]; };
      btns.forEach((b) => b.addEventListener("click", () => { pick(b.dataset.cb); haptic("select"); }));
      mode.addEventListener("click", () => { const on = f.classList.toggle("full"); mode.setAttribute("aria-pressed", String(on)); haptic("tap"); });
      const at = (x, y) => { v.style.setProperty("--lx", x.toFixed(1) + "%"); v.style.setProperty("--ly", y.toFixed(1) + "%"); };
      v.addEventListener("pointermove", (e) => { idle = false; const r = v.getBoundingClientRect(); at(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100); });
      const loop = () => { if (!idle || !v.isConnected) return; t += 0.008; at(50 + Math.sin(t * 1.3) * 30, 50 + Math.sin(t * 2.1) * 22); raf = requestAnimationFrame(loop); };
      pick("deut"); at(50, 50); raf = requestAnimationFrame(loop); cleanup.push(() => cancelAnimationFrame(raf));
    });
  }
  /* ---- The watch prototype (GPay for the wrist): a small state machine over hand-built screens ---- */
  function watchProto(b) {
    const C = ["#4F8EF7", "#35A56A", "#F2B93B", "#E5605A", "#8E6BE8", "#2BB3C0", "#F08A4B", "#5B6B8C", "#C95FA6"];
    const people = b.people || ["Kaira", "Arun", "Meera", "Dev", "Nila", "Sam", "Tara", "Ravi", "Isha"];
    const banks = b.banks || ["HDFC Bank", "ICICI Bank", "State Bank of India"];
    const ic = {
      gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8"/></svg>',
      nfc: '<svg viewBox="0 0 24 24"><path d="M3 9a13 13 0 0 1 18 0M6 12.5a8.5 8.5 0 0 1 12 0M9 16a4.2 4.2 0 0 1 6 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></svg>',
      bank: '<svg viewBox="0 0 24 24"><path d="M3 9l9-5 9 5M5 10v8M9.7 10v8M14.3 10v8M19 10v8M3 20h18"/></svg>',
      book: '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="13" height="18" rx="2"/><circle cx="12.5" cy="10" r="2.2"/><path d="M9 16c1-2 6-2 7 0M4 7h2M4 12h2M4 17h2"/></svg>',
      back: '<svg viewBox="0 0 24 24"><path d="M14.5 6l-6 6 6 6"/></svg>',
      card: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10.5h18"/></svg>',
      check: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" class="wk-ring"/><path d="M20 33l9 9 16-19" class="wk-tick"/></svg>',
      wrist: '<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7V3.5h6V7M9 17v3.5h6V17"/></svg>'
    };
    const av = (n, i) => `<button type="button" class="w-av" data-wpay="${esc(n)}" style="--c:${C[i % C.length]}" aria-label="Pay ${esc(n)}">${esc(n[0])}</button>`;
    const top = (t) => `<header class="w-top"><button type="button" class="w-back" data-wgo="home" aria-label="Back to home">${ic.back}</button><b>${esc(t)}</b></header>`;
    const slide = (id, title, sub, icon, to) => `<section class="w-s w-dim" data-s="${id}"><div class="w-sheet"><span class="w-ico">${icon}</span><div><b>${esc(title)}</b><em>${esc(sub)}</em></div>
        <button type="button" class="w-slide" data-wslide="${to}" aria-label="${esc(sub)}"><i></i></button></div><button type="button" class="w-cancel" data-wgo="home">Cancel</button></section>`;
    const tasks = [["lock", "Unlock the watch", "Press the side button"], ["nfc", "Pay at a scanner", "NFC, then your UPI PIN"], ["contacts", "Pay a contact", "Pick a person, slide to pay"], ["bank", "Switch bank account", "Slide to select, then choose"], ["settings", "Open settings", "The gear, top left"]];
    return `<div class="blk wide wp-b"><div class="wrap wp">
      <div class="wp-copy"><span class="label">Prototype</span><h3 class="wp-h">${esc(b.title || "Try it on the wrist.")}</h3><p class="wp-p">${esc(b.text || "This one works. Tap the screen, press the side button to unlock, and turn back home with the crown.")}</p>
        <ol class="wp-tasks">${tasks.map(([k, t, s2], i) => `<li><button type="button" data-wtask="${k}"><span class="mono">${pad2(i + 1)}</span><b>${t}</b><em>${s2}</em><i aria-hidden="true"></i></button></li>`).join("")}</ol>
      </div>
      <div class="wp-stage"><div class="wp-watch" data-watch data-state="lock">
        <span class="wp-band t" aria-hidden="true"></span><span class="wp-band b" aria-hidden="true"></span>
        <button type="button" class="wp-crown" data-wgo="home" aria-label="Crown: go home"></button>
        <button type="button" class="wp-side" data-wside aria-label="Side button: unlock or lock"></button>
        <div class="wp-case"><div class="wp-screen" role="group" aria-label="Watch screen" aria-live="polite">
          <section class="w-s w-lock on" data-s="lock"><span class="w-logo"><i></i><i></i><i></i><i></i></span><b class="w-brand">G Pay</b><button type="button" class="w-unlock" data-wside>Press side button to unlock <span aria-hidden="true">→</span></button></section>
          <section class="w-s w-home" data-s="home"><header class="w-hh"><button type="button" class="w-rb" data-wgo="settings" aria-label="Settings">${ic.gear}</button><b>G Pay</b><button type="button" class="w-rb w-pay" data-wgo="nfc" aria-label="Pay through NFC">${ic.nfc}<em>Pay</em></button></header>
            <div class="w-grid">${people.slice(0, 9).map(av).join("")}</div>
            <div class="w-side2"><button type="button" class="w-rb" data-wgo="contacts" aria-label="Pay to contacts">${ic.book}</button><button type="button" class="w-rb" data-wgo="bank" aria-label="Switch bank accounts">${ic.bank}</button></div>
            <button type="button" class="w-hist" data-wgo="history">Transaction history</button></section>
          ${slide("nfc", "Pay through NFC", "Slide to pay", ic.nfc, "scan")}
          <section class="w-s w-scan" data-s="scan"><p>Take the device near the scanner</p><span class="w-waves"><i></i><i></i><i></i>${ic.wrist}</span><b>Scanning</b></section>
          <section class="w-s w-pin" data-s="pin"><div class="w-dots"><i></i><i></i><i></i><i></i></div><div class="w-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((k) => `<button type="button" data-wkey="${k}">${k}</button>`).join("")}</div><em class="w-upi">UPI PIN · any four digits</em></section>
          <section class="w-s w-done" data-s="done">${ic.check}<b>Payment successful!</b><em class="w-to"></em></section>
          <section class="w-s w-list" data-s="contacts">${top("Contacts")}<ul>${people.slice(0, 6).map((n, i) => `<li><button type="button" data-wpay="${esc(n)}"><span class="w-av s" style="--c:${C[i % C.length]}">${esc(n[0])}</span><span>${esc(n)}</span></button></li>`).join("")}</ul></section>
          ${slide("payc", "Pay to contacts", "Slide to pay", ic.book, "pin")}
          ${slide("bank", "Switch bank accounts", "Slide to select", ic.bank, "banks")}
          <section class="w-s w-list" data-s="banks">${top("Accounts")}<ul>${banks.map((n, i) => `<li><button type="button" data-wbank="${esc(n)}"${i ? "" : ' class="sel"'}><span class="w-av s sq" style="--c:${C[(i * 3) % C.length]}">${ic.bank}</span><span>${esc(n)}</span></button></li>`).join("")}<li><button type="button" data-wgo="cards"><span class="w-av s sq" style="--c:#5B6B8C">${ic.card}</span><span>Cards</span></button></li></ul></section>
          <section class="w-s w-list" data-s="cards">${top("Cards")}<div class="w-card"><i></i><b>···· ···· ···· 2345</b><em>Debit card</em></div></section>
          <section class="w-s w-list" data-s="settings">${top("Settings")}<ul class="plain">${["Personal info", "Notification and emails", "Privacy and security", "Raise BBPS dispute", "Help & feedback"].map((x) => `<li><span>${x}</span></li>`).join("")}<li><button type="button" data-wlock>Log out</button></li></ul></section>
          <section class="w-s w-list" data-s="history">${top("History")}<ul class="plain w-hl"><li class="w-empty"><span>No payments yet. Pay someone and it shows up here.</span></li></ul></section>
          <div class="w-toast" aria-hidden="true"></div>
        </div></div>
      </div><p class="wp-hint mono">Side button unlocks · Crown goes home</p></div>
    </div></div>`;
  }
  function watches() {
    $$("[data-watch]").forEach((w) => {
      const root = w.closest(".wp"), scr = $(".wp-screen", w), toastEl = $(".w-toast", w);
      let state = "lock", to = "", pin = 0, bank = "", timers = [], done = new Set();
      const later = (ms, f) => { const t = setTimeout(f, ms); timers.push(t); return t; };
      const clear = () => { timers.forEach(clearTimeout); timers = []; };
      const toast = (m) => { toastEl.textContent = m; toastEl.classList.add("on"); later(1500, () => toastEl.classList.remove("on")); };
      const mark = (k) => { done.add(k); $$("[data-wtask]", root).forEach((b) => b.classList.toggle("done", done.has(b.dataset.wtask))); };
      const go = (s) => {
        clear(); state = s; w.dataset.state = s;
        $$(".w-s", scr).forEach((x) => x.classList.toggle("on", x.dataset.s === s));
        if (s === "pin") { pin = 0; $$(".w-dots i", scr).forEach((d) => d.classList.remove("on")); }
        if (s === "scan") later(reduced ? 600 : 2100, () => { haptic("tick"); go("pin"); });
        if (s === "done") {
          $(".w-to", scr).textContent = to ? "to " + to : "at the scanner"; haptic("success");
          const hl = $(".w-hl", scr), e = $(".w-empty", hl); if (e) e.remove();
          hl.insertAdjacentHTML("afterbegin", `<li><span>${esc(to || "NFC scanner")}</span><em>Paid${bank ? " · " + esc(bank) : ""}</em></li>`);
          mark(to ? "contacts" : "nfc"); later(2400, () => go("home"));
        }
        if (s === "settings") mark("settings");
        if (s === "home") { to = ""; mark("lock"); }
      };
      const unlockThen = (s) => { if (state === "lock") { go("home"); later(reduced ? 0 : 420, () => go(s)); } else go(s); };
      const click = (e) => {
        const t = e.target.closest("button"); if (!t || !root.contains(t)) return;
        if (t.dataset.wtask) { const k = t.dataset.wtask; haptic("tick"); if (k === "lock") { go("lock"); w.classList.remove("nudge"); void w.offsetWidth; w.classList.add("nudge"); } else unlockThen(k); return; }
        if (!w.contains(t)) return; haptic("tick");
        if (t.hasAttribute("data-wside")) return go(state === "lock" ? "home" : "lock");
        if (t.hasAttribute("data-wlock")) return go("lock");
        if (state === "lock") return;
        if (t.dataset.wgo) return go(t.dataset.wgo);
        if (t.dataset.wpay) { to = t.dataset.wpay; return go("payc"); }
        if (t.dataset.wslide) { t.classList.add("go"); const nx = t.dataset.wslide; return later(reduced ? 0 : 380, () => { t.classList.remove("go"); go(nx); }); }
        if (t.dataset.wbank) { bank = t.dataset.wbank; $$("[data-wbank]", scr).forEach((x) => x.classList.toggle("sel", x === t)); mark("bank"); toast("Paying from " + bank); return later(900, () => go("home")); }
        if (t.dataset.wkey !== undefined && state === "pin") { const d = $$(".w-dots i", scr); if (pin < 4) d[pin++].classList.add("on"); if (pin === 4) later(380, () => go("done")); }
      };
      root.addEventListener("click", click);
      cleanup.push(() => { clear(); root.removeEventListener("click", click); });
    });
  }
  /* ---- Fredrick Runs, playable in the page ---- */
  // ---------- Rasta La Vista, playable: the real board, tickets, events and action cards ----------
  const RLV = (() => {
    const ROWS = [["Delhi", "Bhopal", "Khajuraho", "Ooty"], ["Jaisalmer", "RoadJn-N", "Hyderabad", "RailJn-NE", "Kolkata"], ["Rishikesh", "Munnar", "Guwahati", "Lucknow", "Nagpur", "Kochi"], ["Shimla", "RailJn-W", "Puri", "FerryJn", "Hampi", "RoadJn-E", "Goa"], ["Ahmedabad", "Chennai", "Amritsar", "Jaipur", "Pune", "Agra"], ["Tirupati", "RoadJn-S", "Pahalgam", "RailJn-SE", "Mumbai"], ["Visakhapatnam", "Bangalore", "Konark", "Varanasi"]];
    const METRO = "Delhi Mumbai Chennai Kolkata Bangalore", HUB = "Nagpur Guwahati Visakhapatnam Hyderabad Pune Ahmedabad Jaipur Kochi Lucknow Bhopal";
    const Y = "Delhi Ooty Hyderabad Munnar Nagpur Shimla Goa Chennai Pune Pahalgam Visakhapatnam Varanasi", G = "Bhopal Jaisalmer Guwahati Kochi Hampi Amritsar Agra Tirupati Bangalore";
    const AIR = "Delhi Hyderabad Guwahati Kolkata Kochi Chennai Jaipur Pune Mumbai Bangalore";
    const FACT = {
      Guwahati: "Its ancient name, Pragjyotishpura, means City of Eastern Light.", Visakhapatnam: "INS Kursura, a retired submarine on RK Beach, became South Asia's first submarine museum.",
      Hyderabad: "Once a centre of the diamond trade, it is also the City of Pearls.", Pune: "Badminton was invented here by British officers in the 19th century.",
      Ahmedabad: "Every year its International Kite Festival fills the sky with colour.", Jaipur: "The Pink City: painted pink in 1876 to welcome the Prince of Wales.",
      Nagpur: "The Zero Mile Stone marks the geographical centre of India. Famous for oranges.", Kochi: "Cochin International was the first airport in the world to run fully on solar power.",
      Tirupati: "At Kalyanakatta, pilgrims offer their hair as a vow.", Konark: "The Sun Temple is a colossal stone chariot on 24 carved wheels.",
      Jaisalmer: "A living fort: people still live and work inside its ancient walls.", Hampi: "The Vittala Temple's pillars ring with musical notes when tapped.",
      Agra: "The Taj Mahal's calligraphy grows larger higher up, so it reads evenly from the ground.", Amritsar: "The Golden Temple's langar serves free meals to anyone, every day.",
      Kolkata: "Home to the oldest operating electric tram network in Asia.", Chennai: "Marina Beach is one of the longest urban beaches on the planet.",
      Bangalore: "The Garden City, for Lalbagh, Cubbon Park and its many green spaces.", Mumbai: "The dabbawalas deliver home-cooked lunches across the city, famously without mix-ups.",
      Delhi: "Khari Baoli in Old Delhi is Asia's largest wholesale spice market.", Ooty: "Snooker's early rules were refined at the Ootacamund Club.",
      Pahalgam: "Legend places the story of Ganesha's elephant head at its Mamaleshwar Temple.", Munnar: "India's first tea museum; its hills bloom with Neelakurinji once every 12 years.",
      Goa: "It keeps a Portuguese-era civil code that applies to everyone who lives there.", Shimla: "From 1864, British India's summer capital; the whole government moved here each year.",
      Varanasi: "One of the oldest continuously inhabited cities in the world.", Puri: "The flag atop the Jagannath Temple is changed every day by hereditary servitors.",
      Khajuraho: "Its temples were built from interlocking stones, with no mortar.", Rishikesh: "The Yoga Capital of the World, where The Beatles came to learn meditation."
    };
    const N = {};
    ROWS.forEach((row, r) => row.forEach((name, i) => {
      const jn = /Jn/.test(name);
      N[name] = { name, x: 820 + (i - (row.length - 1) / 2) * 153.5, y: 575 + (r - 3) * 138.5 + 18,
        type: jn ? (name.startsWith("Road") ? "road-jn" : name.startsWith("Rail") ? "rail-jn" : "ferry-jn") : METRO.includes(name) ? "metro" : HUB.includes(name) ? "hub" : "dest",
        color: jn ? null : Y.split(" ").includes(name) ? "Y" : G.split(" ").includes(name) ? "G" : "R", air: AIR.split(" ").includes(name), adj: { road: [], rail: [], ferry: [] } };
    }));
    const link = (mode, s) => s.split(", ").forEach((e) => { const [a, b] = e.split("–"); N[a].adj[mode].push(b); N[b].adj[mode].push(a); });
    link("road", "Bhopal–Khajuraho, Khajuraho–Ooty, Bhopal–RoadJn-N, Jaisalmer–RoadJn-N, RoadJn-N–Hyderabad, RoadJn-N–Munnar, RoadJn-N–Guwahati, Delhi–RoadJn-N, Rishikesh–Munnar, Hyderabad–Lucknow, Guwahati–Puri, Lucknow–Hampi, Kolkata–Nagpur, Nagpur–RoadJn-E, Kochi–RoadJn-E, Hampi–RoadJn-E, RoadJn-E–Goa, RoadJn-E–Pune, RoadJn-E–Agra, Shimla–Ahmedabad, Puri–Chennai, Ahmedabad–Tirupati, Chennai–RoadJn-S, Amritsar–RoadJn-S, Tirupati–RoadJn-S, RoadJn-S–Pahalgam, RoadJn-S–Bangalore, RoadJn-S–Visakhapatnam, Amritsar–Jaipur, Jaipur–Pune, Agra–Mumbai, Mumbai–Varanasi, Pahalgam–Konark, Delhi–Bhopal, Bangalore–Konark, Konark–Varanasi, Visakhapatnam–Bangalore");
    link("ferry", "Delhi–Bhopal, Khajuraho–Hyderabad, Hyderabad–Guwahati, Ooty–Kolkata, Jaisalmer–Munnar, Munnar–Puri, Rishikesh–Shimla, Lucknow–Nagpur, Nagpur–Kochi, Guwahati–FerryJn, Lucknow–FerryJn, Puri–FerryJn, FerryJn–Hampi, FerryJn–Jaipur, FerryJn–Amritsar, Hampi–Pune, Goa–Agra, Ahmedabad–Chennai, Chennai–Amritsar, Pune–Mumbai, Jaipur–Pahalgam, Tirupati–Visakhapatnam, Pahalgam–Bangalore, Konark–Varanasi");
    link("rail", "Delhi–Jaisalmer, Jaisalmer–Rishikesh, Rishikesh–RailJn-W, Bhopal–Hyderabad, Hyderabad–RailJn-NE, Khajuraho–RailJn-NE, Ooty–RailJn-NE, Kolkata–RailJn-NE, Lucknow–RailJn-NE, Nagpur–RailJn-NE, Kolkata–Kochi, Kochi–Goa, Munnar–Guwahati, Guwahati–Lucknow, Munnar–RailJn-W, Nagpur–Hampi, Hampi–Jaipur, Jaipur–RailJn-SE, Shimla–RailJn-W, RailJn-W–Ahmedabad, RailJn-W–Chennai, RailJn-W–Puri, Ahmedabad–Tirupati, Chennai–Tirupati, Visakhapatnam–Bangalore, Bangalore–Konark, Konark–RailJn-SE, Amritsar–Pahalgam, Pahalgam–RailJn-SE, Pune–RailJn-SE, Pune–Agra, Mumbai–RailJn-SE, Varanasi–RailJn-SE");
    const PLACES = Object.keys(N).filter((k) => !/Jn/.test(k));
    const VP = { metro: 9, hub: 6, dest: 3 }, TAX = { metro: 3, hub: 2, dest: 1 }, UNLOCK = { road: 1, rail: 2, ferry: 3, plane: 5 };
    const MODES = [{ k: "road", label: "Bus", img: "t-bus" }, { k: "rail", label: "Rail", img: "t-rail" }, { k: "ferry", label: "Ferry", img: "t-ferry" }, { k: "plane", label: "Plane", img: "t-plane" }];
    const TNAME = { road: "bus", rail: "rail", ferry: "ferry", plane: "plane" };
    const EVENTS = [
      { kind: "neg", name: "Landslides in the Mountains", text: "Roads through Shimla, Ooty and Pahalgam are blocked.", r: 2, fx: { block: { mode: "road", nodes: ["Shimla", "Ooty", "Pahalgam"] } } },
      { kind: "neg", name: "Railway Track Maintenance", text: "Rail travel through Yellow places is halted.", r: 1, fx: { block: { mode: "rail", colors: ["Y"] } } },
      { kind: "neg", name: "Protests on the Golden Quadrilateral", text: "Roads through Delhi, Mumbai, Chennai and Kolkata are blocked.", r: 2, fx: { block: { mode: "road", nodes: ["Delhi", "Mumbai", "Chennai", "Kolkata"] } } },
      { kind: "neg", name: "Heatwave in the North", text: "Travel through Green places costs one extra ticket.", r: 2, fx: { enterAdd: { colors: ["G"] } } },
      { kind: "neg", name: "Union Dispute", text: "Travel through any Regional Hub costs one extra ticket.", r: 1, fx: { enterAdd: { types: ["hub"] } } },
      { kind: "neg", name: "Cyclone on the East Coast", text: "Travel through Chennai, Visakhapatnam and Puri is blocked.", r: 1, fx: { block: { mode: "any", nodes: ["Chennai", "Visakhapatnam", "Puri"] } } },
      { kind: "neg", name: "Widespread Signal Failure", text: "Rail moves go a single space only.", r: 2, fx: { maxSteps: { rail: 1 } } },
      { kind: "neg", name: "Unexpected Fuel Price Hike", text: "Every bus move costs one extra ticket.", r: 1, fx: { moveAdd: { road: 1 } } },
      { kind: "neg", name: "Poor Visibility on the Coasts", text: "Thick sea fog: all Air and Ferry travel is halted.", r: 1, fx: { halt: ["plane", "ferry"] } },
      { kind: "neu", name: "Ticket Swap", text: "Everyone puts one ticket in a pile; it's shuffled and each takes one back.", r: 1, fx: { swap: true } },
      { kind: "neu", name: "Infrastructure Priority", text: "Road and Rail moves get one free space.", r: 2, fx: { freeStep: ["road", "rail"] } },
      { kind: "neu", name: "Major Detour", text: "Rail is blocked, but Road moves cost one ticket fewer.", r: 2, fx: { halt: ["rail"], moveAdd: { road: -1 } } },
      { kind: "neu", name: "Rush Hour", text: "Road moves go two spaces at most.", r: 1, fx: { maxSteps: { road: 2 } } },
      { kind: "neu", name: "Extreme Weather Alert", text: "Ferry junctions are blocked.", r: 1, fx: { block: { mode: "any", types: ["ferry-jn"] } } },
      { kind: "neu", name: "Priority Boarding", text: "Player order is reversed for this round.", r: 1, fx: { reverse: true } },
      { kind: "pos", name: "Peak Tourist Season in Rajasthan", text: "End in Jaipur or Jaisalmer: +1 Ferry, +2 Rail.", r: 2, fx: { endBonus: { nodes: ["Jaipur", "Jaisalmer"], give: { ferry: 1, rail: 2 } } } },
      { kind: "pos", name: "Economic Boom", text: "Every player gets +1 Ferry and +1 Rail at the start of their turn.", r: 2, fx: { turnBonus: { ferry: 1, rail: 1 } } },
      { kind: "pos", name: "Beach Carnival Season", text: "End in Goa or Kochi: +2 Ferry, +1 Rail.", r: 2, fx: { endBonus: { nodes: ["Goa", "Kochi"], give: { ferry: 2, rail: 1 } } } },
      { kind: "pos", name: "Bollywood Film Awards in Mumbai", text: "Travel through any Metropolitan City is free.", r: 1, fx: { enterFree: { types: ["metro"] } } },
      { kind: "pos", name: "Himalayan Summer Festival", text: "End in Shimla, Ooty or Pahalgam: +1 Road, +2 Rail.", r: 2, fx: { endBonus: { nodes: ["Shimla", "Ooty", "Pahalgam"], give: { road: 1, rail: 2 } } } },
      { kind: "pos", name: "Open Rails Day", text: "All Rail travel is free.", r: 1, fx: { free: ["rail"] } },
      { kind: "pos", name: "Off-Season Travel", text: "Movement through Red places is free.", r: 1, fx: { enterFree: { colors: ["R"] } } },
      { kind: "pos", name: "South India Tech Summit", text: "End in Bangalore, Chennai or Hyderabad: +2 Road, +1 Rail.", r: 2, fx: { endBonus: { nodes: ["Bangalore", "Chennai", "Hyderabad"], give: { road: 2, rail: 1 } } } },
      { kind: "pos", name: "Favourable Monsoon", text: "Ferry moves cost one ticket fewer.", r: 1, fx: { moveAdd: { ferry: -1 } } },
      { kind: "pos", name: "Heritage Site Grants", text: "Visit Agra, Hampi, Konark, Khajuraho or Jaisalmer: +1 Ferry, +2 Road.", r: 2, fx: { endBonus: { nodes: ["Agra", "Hampi", "Konark", "Khajuraho", "Jaisalmer"], give: { ferry: 1, road: 2 } } } },
      { kind: "pos", name: "Festival of Kites", text: "End on a Yellow place: +2 Road, +1 Rail.", r: 1, fx: { endBonus: { colors: ["Y"], give: { road: 2, rail: 1 } } } },
      { kind: "pos", name: "New Express Highway", text: "Road travel through Green places is free.", r: 1, fx: { enterFree: { colors: ["G"], mode: "road" } } }
    ];
    const ACT = {
      pickRoad: { name: "Pickpocket · Bus", text: "Steal a Bus ticket from an opponent.", target: true },
      pickRail: { name: "Pickpocket · Train", text: "Steal a Train ticket from an opponent.", target: true },
      pickFerry: { name: "Pickpocket · Ferry", text: "Steal a Ferry ticket from an opponent.", target: true },
      black: { name: "Black Tickets", text: "Return one of your tickets and take two." },
      chip: { name: "Chip In!", text: "An opponent gives you one ticket of their choice.", target: true },
      hitch: { name: "Hitchhiker's Luck", text: "Move to any place next to you, for free." },
      nmn: { name: "NO MEANS NO!", text: "Kept in hand: cancels an action played on you." },
      quar: { name: "Quarantine", text: "Stop an opponent from moving next round.", target: true },
      rival: { name: "Rivalry", text: "Take one Special Destination card from an opponent.", target: true },
      dd: { name: "Double Decker", text: "Use two modes of transport this turn." }
    };
    const DECK = { pickRoad: 3, pickRail: 3, pickFerry: 3, black: 4, chip: 4, hitch: 5, nmn: 4, quar: 3, rival: 3, dd: 4 };
    return { N, PLACES, VP, TAX, UNLOCK, MODES, TNAME, EVENTS, ACT, DECK, FACT };
  })();

  function rgames() {
    $$("[data-rgame]").forEach((root) => {
      const dir = root.dataset.rgame, { N, PLACES, VP, TAX, UNLOCK, MODES, TNAME, EVENTS, ACT, DECK, FACT } = RLV;
      const svg = $(".rg-svg", root), hiG = $(".rg-hi", root), pegG = $(".rg-pegs", root), pawnG = $(".rg-pawns", root);
      const side = $(".rg-side", root), over = $(".rg-over", root), card = $(".rg-card", root), logEl = $(".rg-log", root);
      const COLORS = ["#E8553A", "#F2C230", "#3BB5E8", "#4CAF6A"], NAMES = ["You", "Asha", "Ravi", "Meera"];
      const ROUNDS = 12;
      const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
      const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? Math.min(ms, 60) : ms));
      let G = null, busy = false, pick = null;

      const owned = (p) => PLACES.filter((k) => G.owner[k] === p.i);
      const unlocked = (p, m) => owned(p).length >= UNLOCK[m];
      const fxAll = () => G.active.map((e) => e.fx);
      const isBlocked = (m, n) => fxAll().some((f) => f.block && (f.block.mode === "any" || f.block.mode === m) && ((f.block.nodes || []).includes(n) || (f.block.colors || []).includes(N[n].color) || (f.block.types || []).includes(N[n].type)));
      const halted = (m) => fxAll().some((f) => (f.halt || []).includes(m));
      const enterCost = (m, n) => {
        let c = 1; const nd = N[n];
        for (const f of fxAll()) {
          if (f.free && f.free.includes(m)) return 0;
          if (f.enterFree && (!f.enterFree.mode || f.enterFree.mode === m) && ((f.enterFree.types || []).includes(nd.type) || (f.enterFree.colors || []).includes(nd.color))) return 0;
          if (f.enterAdd && ((f.enterAdd.types || []).includes(nd.type) || (f.enterAdd.colors || []).includes(nd.color))) c += 1;
        }
        return c;
      };
      const moveAdj = (m, steps) => { let a = 0; for (const f of fxAll()) { if (f.moveAdd && f.moveAdd[m]) a += f.moveAdd[m]; if (f.freeStep && f.freeStep.includes(m) && steps >= 2) a -= 1; } return a; };
      const maxSteps = (m) => Math.min(99, ...fxAll().map((f) => (f.maxSteps && f.maxSteps[m]) || 99));
      // Every node reachable with one mode: cheapest path within the player's tickets
      function reach(p, m) {
        const out = {}; if (!unlocked(p, m) || halted(m) || p.t[m] <= 0) return out;
        if (m === "plane") { if (!N[p.pos].air) return out; Object.values(N).forEach((n) => { if (n.air && n.name !== p.pos && !isBlocked(m, n.name)) out[n.name] = { cost: 1, path: [p.pos, n.name] }; }); return out; }
        const ms = maxSteps(m), best = { [p.pos]: { c: 0, s: 0, path: [p.pos] } }, q = [p.pos];
        while (q.length) {
          q.sort((a, b) => best[a].c - best[b].c); const u = q.shift(), bu = best[u];
          if (bu.s >= ms) continue;
          for (const v of N[u].adj[m]) {
            if (isBlocked(m, v)) continue;
            const c = bu.c + enterCost(m, v);
            if (!best[v] || c < best[v].c || (c === best[v].c && bu.s + 1 < best[v].s)) { best[v] = { c, s: bu.s + 1, path: bu.path.concat(v) }; q.push(v); }
          }
        }
        for (const [k, b] of Object.entries(best)) { if (k === p.pos) continue; const cost = Math.max(0, b.c + moveAdj(m, b.s)); if (cost <= p.t[m]) out[k] = { cost, path: b.path }; }
        return out;
      }
      const score = (p) => { const o = owned(p); return o.reduce((s, k) => s + VP[N[k].type], 0) + p.t.road + p.t.rail + p.t.ferry + p.t.plane * 3; };
      const log = (msg, who) => { const li = document.createElement("li"); li.innerHTML = (who ? `<i style="background:${who.col}"></i>` : "") + esc(msg); logEl.prepend(li); while (logEl.children.length > 7) logEl.lastChild.remove(); };

      // ---------- drawing ----------
      function drawPegs() {
        pegG.innerHTML = PLACES.filter((k) => G.owner[k] != null).map((k) => { const n = N[k], c = G.players[G.owner[k]].col; return `<g transform="translate(${n.x + 34} ${n.y - 40})"><circle r="15" fill="${c}" stroke="#111" stroke-width="4"/><circle r="5" fill="#111" opacity=".35"/></g>`; }).join("");
      }
      function drawPawns() {
        const at = {}; G.players.forEach((p) => { (at[p.pos] = at[p.pos] || []).push(p); });
        if (pawnG.children.length !== G.players.length) pawnG.innerHTML = G.players.map((p) => `<g class="rg-pawn" data-p="${p.i}"><g class="rg-bob"><ellipse rx="22" ry="8" cy="26" fill="#000" opacity=".35"/><path d="M-16 22 C-16 0 -10 -8 0 -8 C10 -8 16 0 16 22 Z" fill="${p.col}" stroke="#111" stroke-width="4"/><circle cy="-20" r="14" fill="${p.col}" stroke="#111" stroke-width="4"/></g></g>`).join("");
        G.players.forEach((p) => { const n = N[p.pos], list = at[p.pos], k = list.indexOf(p), off = (k - (list.length - 1) / 2) * 30, el = pawnG.children[p.i];
          el.style.transform = `translate(${n.x + off}px,${n.y + 12}px)`; el.classList.toggle("cur", p.i === G.turn && !G.done); });
      }
      function drawHi(opts) {
        hiG.innerHTML = Object.entries(opts || {}).map(([k, o]) => { const n = N[k], claim = !/Jn/.test(k) && G.owner[k] == null;
          return `<g class="rg-opt${claim ? " claim" : ""}" data-n="${esc(k)}" transform="translate(${n.x} ${n.y})"><circle r="46" class="rg-ring"/><circle r="62" fill="transparent"/><g transform="translate(40 34)"><circle r="20" class="rg-cost"/><text y="7" text-anchor="middle">${o.cost}</text></g></g>`; }).join("");
      }
      const tk = (p) => MODES.map((m) => `<span class="rg-tk rg-${m.k}${unlocked(p, m.k) ? "" : " lock"}" title="${m.label}">${p.t[m.k]}</span>`).join("");
      function drawSide() {
        const me = G.players[0], ev = G.active.length ? G.active : [];
        $(".rg-round", root).textContent = G.done ? "Final scores" : `Round ${G.round} of ${ROUNDS}`;
        $(".rg-event", root).innerHTML = ev.map((e) => `<div class="rg-ev ${e.kind}"><b>${esc(e.name)}</b><p>${esc(e.text)}</p><span class="mono">${e.left} round${e.left > 1 ? "s" : ""} left</span></div>`).join("") || `<div class="rg-ev none"><p>No event in play.</p></div>`;
        $(".rg-players", root).innerHTML = G.players.map((p) => `<li class="${p.i === G.turn && !G.done ? "on" : ""}${p.skip ? " q" : ""}"><span class="rg-pn"><i style="background:${p.col}"></i>${esc(p.name)}${p.skip ? " · quarantined" : ""}</span><span class="rg-pv mono">${score(p)} VP</span><span class="rg-pt">${tk(p)}</span><span class="rg-ph mono">${owned(p).length} places · ${p.hand.length} card${p.hand.length === 1 ? "" : "s"}</span></li>`).join("");
        const mine = G.turn === 0 && !busy && !G.done && G.phase === "move";
        $(".rg-modes", root).innerHTML = MODES.map((m) => { const ok = mine && Object.keys(reach(me, m.k)).length > 0 && !(G.ddUsed && G.ddUsed === m.k);
          const why = !unlocked(me, m.k) ? `Own ${UNLOCK[m.k]} place${UNLOCK[m.k] > 1 ? "s" : ""}` : halted(m.k) ? "Halted" : me.t[m.k] <= 0 ? "No tickets" : m.k === "plane" && !N[me.pos].air ? "No airport here" : "";
          return `<button type="button" class="rg-mode${G.mode === m.k ? " on" : ""}" data-mode="${m.k}"${ok ? "" : " disabled"}><img src="${dir}/${m.img}.webp" alt=""><span><b>${m.label}</b><small class="mono">${why || me.t[m.k] + " ticket" + (me.t[m.k] === 1 ? "" : "s")}</small></span></button>`; }).join("");
        $(".rg-hand", root).innerHTML = me.hand.length ? me.hand.map((c, i) => `<button type="button" class="rg-act" data-act="${i}"${mine && !G.acted && c !== "nmn" ? "" : " disabled"}><b>${esc(ACT[c].name)}</b><small>${esc(ACT[c].text)}</small></button>`).join("") : `<p class="rg-empty">No action cards yet. Pass through a junction to draw one.</p>`;
        const onJn = /Jn/.test(me.pos);
        $(".rg-extra", root).innerHTML = mine ? `${onJn && !G.ddUsed ? `<button type="button" class="btn ghost rg-chai">Chai time</button>` : ""}<button type="button" class="btn ghost rg-pass">${G.ddUsed ? "End turn" : "Pass"}</button>` : "";
      }
      const say = (html) => { $(".rg-prompt", root).innerHTML = html || ""; };
      async function postcard(k, p) {
        const n = N[k]; card.innerHTML = `<div class="rg-pc rg-${n.type}"><img src="${dir}/postcard-front.webp" alt=""><div><span class="mono">${n.type === "metro" ? "Metropolitan" : n.type === "hub" ? "Regional Hub" : "Special Destination"} · +${VP[n.type]} VP</span><h4>${esc(k)}</h4><p>${esc(FACT[k] || "")}</p><small><i style="background:${p.col}"></i>${esc(p.name)} ${p.i ? "claims" : "claim"} it</small></div></div>`;
        card.hidden = false; card.classList.remove("in"); void card.offsetWidth; card.classList.add("in");
        await wait(p.i ? 1500 : 2100); card.hidden = true;
      }

      // ---------- rules ----------
      const drawAction = (p) => { if (p.hand.length >= 3) return null; if (!G.adeck.length) G.adeck = shuffle(Object.entries(DECK).flatMap(([k, v]) => Array(v).fill(k))); const c = G.adeck.pop(); p.hand.push(c); return c; };
      const give = (p, g) => Object.entries(g).forEach(([m, v]) => { p.t[m] = Math.max(0, p.t[m] + v); });
      const gstr = (g) => Object.entries(g).map(([m, v]) => `+${v} ${TNAME[m]}`).join(", ");
      async function walk(p, path) {
        for (let i = 1; i < path.length; i++) { p.pos = path[i]; drawPawns(); await wait(230); }
      }
      async function doMove(p, m, dest, opt) {
        busy = true; drawHi(null); drawSide();
        p.t[m] -= opt.cost; await walk(p, opt.path);
        log(`${p.name} took the ${TNAME[m]} to ${dest}${opt.cost ? ` (${opt.cost} ticket${opt.cost > 1 ? "s" : ""})` : " for free"}.`, p);
        for (const k of opt.path.slice(1)) if (/Jn/.test(k)) { const c = drawAction(p); if (c) log(`${p.name} passed a junction and drew ${p.i ? "an action card" : ACT[c].name}.`, p); }
        await arrive(p, dest);
        busy = false;
      }
      async function arrive(p, k) {
        if (!/Jn/.test(k) && G.owner[k] == null) { G.owner[k] = p.i; drawPegs(); log(`${p.name} claimed ${k}.`, p); haptic(p.i ? "tick" : "success"); await postcard(k, p); }
        for (const f of fxAll()) if (f.endBonus && ((f.endBonus.nodes || []).includes(k) || (f.endBonus.colors || []).includes(N[k].color))) { give(p, f.endBonus.give); log(`${p.name} got ${gstr(f.endBonus.give)} in ${k}.`, p); }
        drawSide();
      }
      // An action played on someone: NO MEANS NO cancels it
      const blocked = (t, by) => { const i = t.hand.indexOf("nmn"); if (i < 0) return false; t.hand.splice(i, 1); log(`${t.name} played NO MEANS NO! on ${by.name}.`, t); return true; };
      async function play(p, ci, target, choice) {
        const c = p.hand.splice(ci, 1)[0]; G.acted = true; log(`${p.name} played ${ACT[c].name}${target ? ` on ${target.name}` : ""}.`, p);
        if (target && blocked(target, p)) { drawSide(); return; }
        if (c.startsWith("pick")) { const m = { pickRoad: "road", pickRail: "rail", pickFerry: "ferry" }[c]; if (target.t[m] > 0) { target.t[m]--; p.t[m]++; } else log(`${target.name} had no ${TNAME[m]} tickets.`, target); }
        if (c === "chip") { const m = ["road", "rail", "ferry"].sort((a, b) => target.t[b] - target.t[a])[0]; if (target.t[m] > 0) { target.t[m]--; p.t[m]++; log(`${target.name} chipped in a ${TNAME[m]} ticket.`, target); } }
        if (c === "black") { const m = choice || ["road", "rail", "ferry"].sort((a, b) => p.t[a] - p.t[b])[0], r = ["road", "rail", "ferry"].filter((x) => x !== m).sort((a, b) => p.t[b] - p.t[a])[0]; if (p.t[r] > 0) p.t[r]--; p.t[m] += 2; log(`${p.name} swapped a ${TNAME[r]} ticket for two ${TNAME[m]}.`, p); }
        if (c === "quar") target.skip = true;
        if (c === "rival") { const ds = PLACES.filter((k) => G.owner[k] === target.i && N[k].type === "dest"); if (ds.length) { const k = ds[Math.floor(Math.random() * ds.length)]; G.owner[k] = p.i; drawPegs(); log(`${p.name} took ${k} from ${target.name}.`, p); } }
        if (c === "dd") G.dd = true;
        if (c === "hitch") { G.hitch = true; }
        drawSide();
      }
      const neighbours = (k) => [...new Set([...N[k].adj.road, ...N[k].adj.rail, ...N[k].adj.ferry])].filter((v) => !fxAll().some((f) => f.block && f.block.mode === "any" && ((f.block.nodes || []).includes(v) || (f.block.types || []).includes(N[v].type))));

      // ---------- turns ----------
      async function startRound() {
        G.active.forEach((e) => e.left--); G.active = G.active.filter((e) => e.left > 0);
        if (!G.edeck.length) G.edeck = shuffle(EVENTS.slice());
        const e = Object.assign({}, G.edeck.pop()); e.left = e.r; G.active.push(e);
        log(`Event: ${e.name}.`); drawSide();
        if (e.fx.swap) { const pile = G.players.map((p) => { const m = ["road", "rail", "ferry"].filter((x) => p.t[x] > 0).sort((a, b) => p.t[b] - p.t[a])[0]; if (m) p.t[m]--; return m; }).filter(Boolean); shuffle(pile); G.players.forEach((p, i) => { if (pile[i]) p.t[pile[i]]++; }); log("Everyone swapped a ticket."); }
        G.order = G.players.map((p) => p.i); if (e.fx.reverse || G.active.some((x) => x.fx.reverse)) G.order.reverse();
        G.oi = 0; await nextTurn();
      }
      async function nextTurn() {
        if (G.done) return;
        if (PLACES.every((k) => G.owner[k] != null)) return finish("Every place on the map has been claimed.");
        if (G.oi >= G.order.length) { G.round++; if (G.round > ROUNDS) return finish("The last round is over."); return startRound(); }
        const p = G.players[G.order[G.oi++]]; G.turn = p.i; G.mode = null; G.acted = false; G.dd = false; G.ddUsed = null; G.hitch = false; G.phase = "move"; pick = null;
        for (const f of fxAll()) if (f.turnBonus) give(p, f.turnBonus);
        drawPawns(); drawSide();
        if (p.skip) { p.skip = false; log(`${p.name} is quarantined and sits this one out.`, p); await wait(700); return nextTurn(); }
        if (p.i === 0) { say(`<b>Your turn.</b> Pick a ticket to travel${p.hand.length ? ", or play an action card first" : ""}.`); return; }
        say(`<b>${esc(p.name)}</b> is thinking…`); await wait(650); await aiTurn(p); await wait(300); return nextTurn();
      }
      async function endHuman() { G.phase = "wait"; G.mode = null; drawHi(null); say(""); drawSide(); await wait(250); await nextTurn(); }

      // ---------- the computer travellers ----------
      const valueAt = (p, k) => { let v = !/Jn/.test(k) && G.owner[k] == null ? VP[N[k].type] : 0; for (const f of fxAll()) if (f.endBonus && ((f.endBonus.nodes || []).includes(k) || (f.endBonus.colors || []).includes(N[k].color))) v += 2; return v; };
      const distToFree = (k) => { const seen = { [k]: 0 }, q = [k]; while (q.length) { const u = q.shift(); if (u !== k && !/Jn/.test(u) && G.owner[u] == null) return seen[u]; for (const v of neighbours(u)) if (seen[v] == null) { seen[v] = seen[u] + 1; q.push(v); } } return 9; };
      function bestMove(p, skip) {
        let best = null;
        for (const m of MODES.map((x) => x.k)) { if (m === skip) continue; const r = reach(p, m);
          for (const [k, o] of Object.entries(r)) { const jn = o.path.slice(1).filter((x) => /Jn/.test(x)).length; const v = valueAt(p, k);
            const s = v > 0 ? v * 1.4 - o.cost * (m === "plane" ? 2.4 : 1) + jn * 0.6 : -distToFree(k) * 1.2 - o.cost * 0.9 + jn * 0.6 - 2;
            if (!best || s > best.s) best = { m, k, o, s }; } }
        return best;
      }
      async function aiTurn(p) {
        const others = G.players.filter((x) => x !== p), leader = others.slice().sort((a, b) => score(b) - score(a))[0];
        const has = (c) => p.hand.indexOf(c);
        if (has("hitch") >= 0) { const nb = neighbours(p.pos).filter((k) => !/Jn/.test(k) && G.owner[k] == null).sort((a, b) => VP[N[b].type] - VP[N[a].type])[0]; if (nb) { await play(p, has("hitch")); await wait(400); busy = true; await walk(p, [p.pos, nb]); log(`${p.name} hitched a ride to ${nb}.`, p); await arrive(p, nb); busy = false; return; } }
        if (!G.acted) {
          const pk = p.hand.findIndex((c) => c.startsWith("pick")); const rv = has("rival"), qu = has("quar"), ch = has("chip"), bl = has("black");
          if (rv >= 0 && PLACES.some((k) => G.owner[k] === leader.i && N[k].type === "dest") && Math.random() < 0.7) { await play(p, rv, leader); await wait(500); }
          else if (qu >= 0 && Math.random() < 0.5) { await play(p, qu, leader); await wait(500); }
          else if (pk >= 0) { await play(p, pk, others.slice().sort((a, b) => (b.t.road + b.t.rail + b.t.ferry) - (a.t.road + a.t.rail + a.t.ferry))[0]); await wait(500); }
          else if (ch >= 0 && Math.random() < 0.6) { await play(p, ch, leader); await wait(500); }
          else if (bl >= 0 && ["road", "rail", "ferry"].some((m) => p.t[m] === 0)) { await play(p, bl); await wait(500); }
          else if (has("dd") >= 0 && Math.random() < 0.5) { await play(p, has("dd")); await wait(400); }
        }
        let mv = bestMove(p);
        if (/Jn/.test(p.pos) && (!mv || mv.s < -3) && (p.t.road + p.t.rail + p.t.ferry) > 0) { chai(p, true); log(`${p.name} stopped for chai and swapped tickets.`, p); drawSide(); return; }
        if (!mv) { log(`${p.name} stayed put.`, p); return; }
        await doMove(p, mv.m, mv.k, mv.o);
        if (G.dd) { G.dd = false; const m2 = bestMove(p, mv.m); if (m2 && m2.s > 0) { await wait(400); await doMove(p, m2.m, m2.k, m2.o); } }
      }
      // Chai time: even out bus, rail and ferry tickets
      function chai(p, auto) { const ks = ["road", "rail", "ferry"], tot = ks.reduce((s, m) => s + p.t[m], 0), base = Math.floor(tot / 3); let rem = tot - base * 3; ks.forEach((m) => { p.t[m] = base + (rem-- > 0 ? 1 : 0); }); }

      // ---------- setup and the end ----------
      function setup(n) {
        G = { players: [], owner: {}, active: [], edeck: shuffle(EVENTS.slice()), adeck: shuffle(Object.entries(DECK).flatMap(([k, v]) => Array(v).fill(k))), round: 1, turn: 0, order: [], oi: 0, done: false };
        const homes = shuffle(PLACES.slice());
        for (let i = 0; i < n; i++) {
          const p = { i, name: NAMES[i], col: COLORS[i], t: { road: 6, rail: 6, ferry: 6, plane: 2 }, hand: [], skip: false }, h = homes.pop(), tax = TAX[N[h].type];
          p.pos = h; G.owner[h] = i; p.t.road -= tax; p.t.rail -= tax; p.t.ferry -= tax; G.players.push(p);
          log(`${p.name} ${i ? "starts" : "start"} in ${h} and ${i ? "pays" : "pay"} the lifestyle tax.`, p);
        }
        pawnG.innerHTML = ""; drawPegs(); drawPawns(); over.hidden = true; root.classList.add("live");
      }
      function finish(why) {
        G.done = true; G.phase = "over"; drawHi(null);
        const rows = G.players.map((p) => { const o = owned(p); return { p, vp: score(p), places: o.reduce((s, k) => s + VP[N[k].type], 0), tickets: p.t.road + p.t.rail + p.t.ferry + p.t.plane * 3, metros: o.filter((k) => N[k].type === "metro").length, raw: p.t.road + p.t.rail + p.t.ferry + p.t.plane }; })
          .sort((a, b) => b.vp - a.vp || b.metros - a.metros || b.raw - a.raw);
        const win = rows[0].p;
        over.innerHTML = `<div class="rg-end"><span class="label">${esc(why)}</span><h3>${win.i ? esc(win.name) + " wins the journey." : "You win the journey."}</h3>
          <table><thead><tr><th></th><th>Places</th><th>Tickets</th><th>VP</th></tr></thead><tbody>${rows.map((r) => `<tr><td><i style="background:${r.p.col}"></i>${esc(r.p.name)}</td><td>${r.places}</td><td>${r.tickets}</td><td><b>${r.vp}</b></td></tr>`).join("")}</tbody></table>
          <p class="mono">Places score 3, 6 or 9. Each leftover bus, rail or ferry ticket scores 1, each plane ticket 3. Ties go to most Metros, then most tickets.</p>
          <button type="button" class="btn rg-again">Play again</button></div>`;
        over.hidden = false; drawSide(); say("");
      }
      function intro() {
        over.innerHTML = `<div class="rg-intro"><img src="${dir}/title-board.webp" alt="Rasta La Vista title board"><div><span class="label">Travel India, claim places</span><h3>Plan your route.</h3>
          <p>Draw a hometown, pay its lifestyle tax, then spend bus, rail, ferry and plane tickets to travel the printed routes and claim places before anyone else. Events change the rules every round; junctions hand you action cards.</p>
          <div class="rg-count"><span class="mono">Travellers</span>${[2, 3, 4].map((n) => `<button type="button" class="rg-n${n === 3 ? " on" : ""}" data-n="${n}">${n}</button>`).join("")}</div>
          <button type="button" class="btn rg-start">Start the journey</button></div></div>`;
        over.hidden = false;
      }

      // ---------- input ----------
      root.addEventListener("click", async (e) => {
        const t = e.target;
        if (t.closest(".rg-n")) { $$(".rg-n", root).forEach((b) => b.classList.toggle("on", b === t.closest(".rg-n"))); return; }
        if (t.closest(".rg-start")) { const n = +($(".rg-n.on", root) || {}).dataset?.n || 3; logEl.innerHTML = ""; setup(n); drawSide(); await startRound(); return; }
        if (t.closest(".rg-again")) { intro(); root.classList.remove("live"); return; }
        if (t.closest(".rg-card")) { card.hidden = true; return; }
        if (!G || G.done || G.turn !== 0 || busy) return;
        const me = G.players[0];
        const mb = t.closest(".rg-mode"); if (mb && !mb.disabled) { const m = mb.dataset.mode; G.mode = m; G.hitch = false; pick = reach(me, m); drawHi(pick); drawSide(); say(`Tap a highlighted place. The number is what it costs in ${TNAME[m]} tickets.`); haptic("tick"); return; }
        const ab = t.closest(".rg-act"); if (ab && !ab.disabled) {
          const ci = +ab.dataset.act, c = me.hand[ci];
          if (ACT[c].target) { say(`<b>${esc(ACT[c].name)}</b> on whom? ${G.players.slice(1).map((o) => `<button type="button" class="rg-tgt" data-t="${o.i}" data-c="${ci}"><i style="background:${o.col}"></i>${esc(o.name)}</button>`).join("")}`); return; }
          if (c === "black") { say(`<b>Black Tickets:</b> take two of ${["road", "rail", "ferry"].map((m) => `<button type="button" class="rg-tgt" data-b="${m}" data-c="${ci}">${TNAME[m]}</button>`).join("")}`); return; }
          await play(me, ci);
          if (c === "hitch") { const nb = neighbours(me.pos); pick = Object.fromEntries(nb.map((k) => [k, { cost: 0, path: [me.pos, k] }])); G.mode = "hitch"; drawHi(pick); say("Hitchhiker's Luck: tap any place next to you."); }
          if (c === "dd") say("Double Decker: make two moves this turn, each with a different ticket.");
          return;
        }
        const tg = t.closest(".rg-tgt"); if (tg) { const ci = +tg.dataset.c; if (tg.dataset.b) await play(me, ci, null, tg.dataset.b); else await play(me, ci, G.players[+tg.dataset.t]); say("Now pick a ticket to travel."); drawSide(); return; }
        if (t.closest(".rg-chai")) { chai(me); log("You stopped for chai and evened out your tickets.", me); await endHuman(); return; }
        if (t.closest(".rg-pass")) { log(G.ddUsed ? "You ended your turn." : "You passed.", me); await endHuman(); return; }
        const opt = t.closest(".rg-opt"); if (opt && pick) {
          const k = opt.dataset.n, o = pick[k]; if (!o) return;
          if (G.mode === "hitch") { busy = true; drawHi(null); await walk(me, o.path); log(`You hitched a ride to ${k}.`, me); await arrive(me, k); busy = false; return endHuman(); }
          const m = G.mode; await doMove(me, m, k, o); pick = null;
          if (G.dd && !G.ddUsed) { G.ddUsed = m; G.mode = null; drawSide(); say("Double Decker: make a second move with a different ticket, or end your turn."); return; }
          return endHuman();
        }
      });
      intro();
    });
  }

  // Moo: plays once when it scrolls in, again on every tap
  function moos() {
    $$("[data-moo]").forEach((st) => {
      const play = () => { st.classList.remove("go"); void st.offsetWidth; st.classList.add("go"); };
      st.addEventListener("click", () => { play(); haptic("tick"); });
      if (reduced) { st.classList.add("go", "still"); return; }
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { play(); io.disconnect(); } }), { threshold: 0.5 });
      io.observe(st);
    });
  }
  // Geometrica: each card is a set of frames and where they sit relative to the first one
  function buildits() {
    const s = 120, h = s * Math.sqrt(3) / 2, P = (a) => a.map((q) => q.join(",")).join(" ");
    const up = [[0, h], [s, h], [s / 2, 0]], down = [[0, 0], [s, 0], [s / 2, h]];
    const CARDS = [
      { q: "Build the shape that is made of two triangles placed next to each other.", a: "A. Rhombus", pieces: [{ pts: up, at: [0, 0] }, { pts: down, at: [s / 2, 0] }] },
      { q: "Make a square from two right-angled triangles.", a: "A. Square", pieces: [{ pts: [[0, 0], [s, 0], [0, s]], at: [0, 0] }, { pts: [[s, 0], [s, s], [0, s]], at: [0, 0] }] },
      { q: "Place three triangles side by side, alternating up and down. What do you get?", a: "A. Trapezium", pieces: [{ pts: up, at: [0, 0] }, { pts: down, at: [s / 2, 0] }, { pts: up, at: [s, 0] }] }
    ];
    const COL = ["#F08A24", "#2BA6A0", "#E8B526"];
    $$("[data-buildit]").forEach((bd) => {
      const root = bd.closest(".bi"), svg = $("svg", bd), g = $(".bi-pieces", bd), clue = $(".bi-clue", root), ans = $(".bi-ans", root), tm = $(".bi-time", root);
      let ci = 0, pos = [], drag = null, t0 = 0, done = false, tick = 0;
      const pt = (e) => { const m = svg.getScreenCTM().inverse(); return { x: e.clientX * m.a + e.clientY * m.c + m.e, y: e.clientX * m.b + e.clientY * m.d + m.f }; };
      const draw = () => { const c = CARDS[ci]; g.innerHTML = c.pieces.map((p, i) => `<polygon class="bi-p" data-i="${i}" points="${P(p.pts)}" transform="translate(${pos[i].x.toFixed(1)} ${pos[i].y.toFixed(1)})" style="--c:${COL[i % 3]}"/>`).join(""); };
      const load = () => {
        const c = CARDS[ci]; done = false; t0 = 0; tm.textContent = "0.0 s"; clue.textContent = c.q; ans.textContent = ""; root.classList.remove("solved");
        const slots = [[50, 240], [250, 60], [420, 230], [360, 40]];
        pos = c.pieces.map((_, i) => ({ x: slots[(i + ci) % 4][0], y: slots[(i + ci) % 4][1] })); draw();
      };
      const check = () => {
        const c = CARDS[ci], o = pos[0];
        const ok = c.pieces.every((p, i) => Math.hypot(pos[i].x - o.x - p.at[0], pos[i].y - o.y - p.at[1]) < 16);
        if (!ok) return;
        c.pieces.forEach((p, i) => { pos[i] = { x: o.x + p.at[0], y: o.y + p.at[1] }; }); draw();
        done = true; root.classList.add("solved"); ans.textContent = `${c.a} · built in ${((performance.now() - t0) / 1000).toFixed(1)} s`; haptic("success");
      };
      const timer = () => { tick = 0; if (!bd.isConnected || done || !t0) return; tm.textContent = ((performance.now() - t0) / 1000).toFixed(1) + " s"; tick = requestAnimationFrame(timer); };
      bd.addEventListener("pointerdown", (e) => {
        const el = e.target.closest(".bi-p"); if (!el || done) return;
        const i = +el.dataset.i, p = pt(e); drag = { i, dx: p.x - pos[i].x, dy: p.y - pos[i].y }; bd.setPointerCapture(e.pointerId); e.preventDefault();
        g.appendChild(el); if (!t0) { t0 = performance.now(); if (!tick) tick = requestAnimationFrame(timer); }
      });
      bd.addEventListener("pointermove", (e) => {
        if (!drag) return; const p = pt(e), el = $(`.bi-p[data-i="${drag.i}"]`, g);
        pos[drag.i] = { x: Math.max(-40, Math.min(560, p.x - drag.dx)), y: Math.max(-40, Math.min(380, p.y - drag.dy)) };
        el.setAttribute("transform", `translate(${pos[drag.i].x.toFixed(1)} ${pos[drag.i].y.toFixed(1)})`);
      });
      const up2 = () => { if (!drag) return; drag = null; check(); };
      bd.addEventListener("pointerup", up2); bd.addEventListener("pointercancel", up2);
      $(".bi-next", root).addEventListener("click", () => { ci = (ci + 1) % CARDS.length; load(); });
      load();
    });
  }
  function fgames() {
    $$("[data-fgame]").forEach((st) => {
      const dir = st.dataset.fgame, cv = $("canvas", st), ctx = cv.getContext("2d"), over = $(".fg-over", st), msg = $(".fg-msg", st), go = $(".fg-go", st);
      const hud = { lv: $(".fg-lv", st), sc: $(".fg-sc", st), mx: $(".fg-mx", st), hp: $(".fg-hp", st) };
      const L = (s) => { const im = new Image(); im.src = dir + "/" + s; return im; };
      const BG = [L("bg-city.webp"), L("bg-beach.webp"), L("bg-seashore.webp"), L("bg-forest.webp")], NAMES = ["City side", "Beach side", "Seashore", "Forest"];
      const SPR = { run: L("sprite-run.png"), boost: L("sprite-boost.png"), car: L("car.png") };
      let W = 0, H = 0, G = 0, k = 1, raf = 0, last = 0, state = "idle", vis = true;
      let pl, obs, stars, sp, dist, score, mult, lives, level, hurt, boost, nextObs, cleared, flash, bgx;
      const size = () => { const r = st.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); ctx.imageSmoothingEnabled = false; k = H / 400; G = H * 0.84; };
      const reset = () => { pl = { x: W * 0.16, y: G, vy: 0, jumps: 0 }; obs = []; stars = []; sp = 300; dist = 0; score = 0; mult = 1; lives = 3; level = 0; hurt = 0; boost = 0; nextObs = 1.1; cleared = 0; flash = 0; bgx = 0; };
      const jump = () => { if (state !== "run") return; if (pl.jumps < 2) { pl.vy = -(pl.jumps ? 640 : 760) * k; pl.jumps++; haptic("tick"); } };
      const start = () => { size(); reset(); state = "run"; over.hidden = true; st.focus({ preventScroll: true }); last = performance.now(); if (!raf) raf = requestAnimationFrame(loop); };
      const end = () => { state = "over"; over.hidden = false; go.textContent = "Run again"; msg.textContent = `Score ${Math.round(score)} · reached ${NAMES[level]}`; haptic("heavy"); };
      const drawBg = () => {
        const im = BG[level]; if (!im.complete || !im.naturalWidth) { ctx.fillStyle = "#1d2433"; ctx.fillRect(0, 0, W, H); return; }
        const s = W / im.naturalWidth * 1.0, h = im.naturalHeight * s, y = H - h * 0.98, w = im.naturalWidth * s;
        let x = -(bgx % (w * 2));
        for (; x < W; x += w) { const flip = Math.floor((x + bgx) / w + 0.01) % 2 === 1; if (flip) { ctx.save(); ctx.translate(x + w, y); ctx.scale(-1, 1); ctx.drawImage(im, 0, 0, w, h); ctx.restore(); } else ctx.drawImage(im, x, y, w, h); }
      };
      const cone = (x, y, s) => { ctx.fillStyle = "#F26B1D"; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 13 * s, y - 38 * s); ctx.lineTo(x + 26 * s, y); ctx.fill(); ctx.fillStyle = "#fff"; ctx.fillRect(x + 7 * s, y - 20 * s, 12 * s, 5 * s); ctx.fillStyle = "#222"; ctx.fillRect(x - 3 * s, y - 4 * s, 32 * s, 5 * s); };
      const star = (x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2); ctx.fillStyle = "#FFD84D"; ctx.beginPath(); for (let i = 0; i < 10; i++) { const r = (i % 2 ? 6 : 14) * s, a = i * Math.PI / 5 - Math.PI / 2; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.fill(); ctx.restore(); };
      const loop = (now) => {
        raf = 0; if (!st.isConnected) return; const dt = Math.min(0.04, (now - last) / 1000); last = now;
        if (state === "run" && vis) {
          sp = (300 + level * 70 + dist * 0.004) * k; dist += sp * dt; bgx += sp * dt * 0.5;
          score += dt * 10 * mult; boost = Math.max(0, boost - dt); hurt = Math.max(0, hurt - dt); flash = Math.max(0, flash - dt);
          pl.vy += 2100 * k * dt; pl.y += pl.vy * dt; if (pl.y >= G) { pl.y = G; pl.vy = 0; pl.jumps = 0; }
          nextObs -= dt; if (nextObs <= 0) { const car = Math.random() < 0.55; obs.push({ x: W + 20, car, w: car ? 160 * k : 30 * k, h: car ? 39 * k : 44 * k }); nextObs = 0.9 + Math.random() * 1.1 - Math.min(0.4, level * 0.1); if (level >= 1 && Math.random() < 0.35) stars.push({ x: W + 160 * k, y: G - (90 + Math.random() * 70) * k }); }
          const pw = 40 * k, ph = 82 * k, px = pl.x - pw / 2, py = pl.y - ph;
          obs.forEach((o) => { o.x -= sp * dt; const hx = o.x + o.w * 0.12, hw = o.w * 0.76, hy = G - o.h * 0.9;
            if (!o.hit && px < hx + hw && px + pw > hx && py + ph > hy) { o.hit = true; if (boost) { score += 25 * mult; } else if (!hurt) { lives--; hurt = 1.2; mult = 1; flash = 0.3; haptic("heavy"); if (lives <= 0) end(); } }
            if (!o.hit && !o.passed && o.x + o.w < px) { o.passed = true; cleared++; mult = Math.min(9, mult + 1); haptic("tick"); if (cleared % 12 === 0 && level < 3) { level++; flash = 0.6; } } });
          obs = obs.filter((o) => o.x + o.w > -40);
          stars.forEach((s) => { s.x -= sp * dt; if (!s.got && Math.abs(s.x - pl.x) < 34 * k && Math.abs(s.y - (pl.y - ph / 2)) < 50 * k) { s.got = true; boost = 4; haptic("success"); } });
          stars = stars.filter((s) => s.x > -40 && !s.got);
          hud.lv.textContent = `LEVEL ${level + 1} · ${NAMES[level].toUpperCase()}`; hud.sc.textContent = Math.round(score); hud.mx.textContent = "×" + mult; hud.hp.textContent = "♥".repeat(Math.max(0, lives)) + "♡".repeat(3 - Math.max(0, lives));
        }
        // draw
        drawBg();
        obs.forEach((o) => { if (o.car && SPR.car.complete) ctx.drawImage(SPR.car, o.x, G - o.h, o.w, o.h); else cone(o.x, G, k); });
        stars.forEach((s) => star(s.x, s.y, k, now / 1000));
        if (pl) { const im = boost ? SPR.boost : SPR.run, ih = 92 * k, iw = ih * (im.naturalWidth || 53) / (im.naturalHeight || 95), bob = pl.y >= G ? Math.abs(Math.sin(now / 90)) * 3 * k : 0;
          if (!(hurt && Math.floor(now / 90) % 2)) { if (boost) { ctx.fillStyle = "rgba(255,216,77,.35)"; ctx.beginPath(); ctx.arc(pl.x, pl.y - ih / 2, ih * 0.7, 0, 7); ctx.fill(); } if (im.complete) ctx.drawImage(im, pl.x - iw / 2, pl.y - ih - bob, iw, ih); } }
        if (flash) { ctx.fillStyle = `rgba(255,255,255,${flash})`; ctx.fillRect(0, 0, W, H); }
        if (state === "run" && level > 0 && cleared % 12 < 2) { ctx.fillStyle = "rgba(0,0,0,.55)"; ctx.fillRect(0, H * 0.1, W, 46 * k); ctx.fillStyle = "#FFD84D"; ctx.font = `${26 * k}px "Bebas Neue", Impact, sans-serif`; ctx.textAlign = "center"; ctx.fillText(`LEVEL ${level + 1} · ${NAMES[level].toUpperCase()}`, W / 2, H * 0.1 + 32 * k); }
        if (state === "run" || state === "idle") raf = requestAnimationFrame(loop);
      };
      const key = (e) => { if (state !== "run") { if ((e.code === "Space" || e.code === "Enter") && document.activeElement === st) { e.preventDefault(); start(); } return; } if (["Space", "ArrowUp", "KeyW"].includes(e.code)) { e.preventDefault(); jump(); } if (e.code === "Escape") end(); };
      st.addEventListener("keydown", key);
      st.addEventListener("pointerdown", (e) => { if (state === "run" && !e.target.closest("button")) { e.preventDefault(); jump(); } });
      go.addEventListener("click", start);
      const io = "IntersectionObserver" in window ? new IntersectionObserver(([en]) => { vis = en.isIntersecting; if (!vis && state === "run") { state = "over"; over.hidden = false; go.textContent = "Resume a new run"; msg.textContent = `Paused · score ${Math.round(score)}`; } }) : null; io && io.observe(st);
      const rs = () => { size(); if (pl) { pl.x = W * 0.16; pl.y = Math.min(pl.y, G); } }; addEventListener("resize", rs);
      size(); reset(); state = "idle"; raf = requestAnimationFrame(loop);
      cleanup.push(() => { cancelAnimationFrame(raf); io && io.disconnect(); removeEventListener("resize", rs); });
    });
  }
  // Requirements map: hovering a requirement lights its spot on the phone
  function reqmaps() {
    $$("[data-rqm]").forEach((m) => { const on = (i) => m.dataset.on = i; $$("[data-rq]", m).forEach((b) => { b.addEventListener("pointerenter", () => on(b.dataset.rq)); b.addEventListener("focus", () => on(b.dataset.rq)); b.addEventListener("click", () => on(b.dataset.rq)); }); m.addEventListener("pointerleave", () => m.removeAttribute("data-on")); });
    $$(".dsy [data-copy]").forEach((b) => b.addEventListener("click", () => { try { navigator.clipboard.writeText(b.dataset.copy).then(() => toast(b.dataset.copy + " copied"), () => toast(b.dataset.copy)); } catch (e) { toast(b.dataset.copy); } }));
  }
  function tins() {
    $$("[data-tin]").forEach((sc) => {
      const tin = $(".tin", sc), src = sc.dataset.tin; let ry = 0, raf = 0, drag = null, vis = true;
      const load = (s) => { if (!s) { sc.classList.add("no-img"); return; } const im = new Image(); im.onload = () => { sc.classList.remove("no-img"); tin.classList.remove("swap"); void tin.offsetWidth; tin.classList.add("swap"); tin.style.setProperty("--img", `url("${new URL(s, document.baseURI).href}")`); }; im.onerror = () => sc.classList.add("no-img"); im.src = s; };
      load(src);
      const shelf = sc.parentElement && $(".shelf", sc.parentElement);
      if (shelf) $$("[data-label]", shelf).forEach((bt) => bt.addEventListener("click", () => { $$("[data-label]", shelf).forEach((x) => { x.classList.toggle("on", x === bt); x.setAttribute("aria-pressed", x === bt); }); load(bt.dataset.label); ry += 40; haptic("tick"); }));
      const draw = () => tin.style.setProperty("--ry", ry.toFixed(2) + "deg");
      const loop = () => { if (!sc.isConnected) return; if (!drag && vis && !reduced) { ry += 0.18; draw(); } raf = requestAnimationFrame(loop); };
      sc.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, r: ry }; sc.setPointerCapture(e.pointerId); sc.classList.add("grab"); });
      sc.addEventListener("pointermove", (e) => { if (drag) { ry = drag.r + (e.clientX - drag.x) * 0.5; draw(); } });
      sc.addEventListener("pointerup", () => { drag = null; sc.classList.remove("grab"); });
      if ("IntersectionObserver" in window) { const io = new IntersectionObserver((en) => { vis = en[0].isIntersecting; }); io.observe(sc); cleanup.push(() => io.disconnect()); }
      draw(); raf = requestAnimationFrame(loop); cleanup.push(() => cancelAnimationFrame(raf));
    });
  }
  function videos() {
    const vs = $$("video[data-autoplay]"); if (!vs.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { const v = en.target; if (en.isIntersecting && !reduced) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause(); }), { threshold: 0.25 });
    vs.forEach((v) => io.observe(v)); cleanup.push(() => io.disconnect());
  }
  // XR pages: a field of points drifting toward you behind the title, a HUD line, and the title decodes on arrival
  function xrHero(p) {
    const hero = $("#app > main[data-kind='xr'] .cs-hero"); if (!hero) return;
    hero.classList.add("xr-in");
    // a readout that rides along at the edge of the screen: which sector you're in and how deep
    const rail = document.createElement("div"); rail.className = "xr-rail mono"; rail.setAttribute("aria-hidden", "true"); document.body.appendChild(rail);
    const chaps = $$(".chap, .sx"), upd = () => { const d = document.documentElement, k = Math.round((scrollY / Math.max(1, d.scrollHeight - innerHeight)) * 100); let c = null; chaps.forEach((x) => { if (x.getBoundingClientRect().top < innerHeight * 0.5) c = x; });
      rail.innerHTML = `<i></i><span>${c ? `SEC ${c.dataset.no || ($(".chap-n", c) || {}).textContent || ""} // ${esc((c.dataset.k || $(".kicker", c).textContent.replace("// ", "")).toUpperCase())}` : "SEC 00 // OVERVIEW"}</span><span>DEPTH ${String(k).padStart(3, "0")}%</span>`; };
    upd(); onScroll(upd); cleanup.push(() => rail.remove());
    const hud = document.createElement("div"); hud.className = "xr-hud mono"; hud.setAttribute("aria-hidden", "true");
    hud.innerHTML = `<span><i class="rec"></i>LIVE</span><span>${esc(p.acc || "")}</span><span>${esc(p.year || "")}</span><span>${esc((p.tools || "").toUpperCase())}</span><span class="xr-fps">90 HZ</span>`;
    const eb = $(".eyebrow", hero); if (eb) eb.after(hud);
    if (reduced) return;
    const cv = document.createElement("canvas"); cv.className = "xr-field"; cv.setAttribute("aria-hidden", "true"); hero.prepend(cv);
    const ctx = cv.getContext("2d"), col = getComputedStyle(document.documentElement).getPropertyValue("--blue-ink").trim() || "#8b7bff";
    let W = 0, H = 0, raf = 0, on = true; const dpr = Math.min(2, devicePixelRatio || 1);
    const pts = Array.from({ length: 90 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));
    const size = () => { W = hero.clientWidth; H = Math.min(hero.clientHeight, 900); cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const frame = () => {
      if (!cv.isConnected) return; raf = requestAnimationFrame(frame); if (!on) return;
      ctx.clearRect(0, 0, W, H); ctx.fillStyle = col; ctx.strokeStyle = col;
      pts.forEach((q) => {
        const pz = q.z; q.z -= 0.0026; if (q.z <= 0.02) { q.x = Math.random() * 2 - 1; q.y = Math.random() * 2 - 1; q.z = 1; return; }
        const sx = W / 2 + (q.x / q.z) * W * 0.22, sy = H * 0.42 + (q.y / q.z) * H * 0.25, ox = W / 2 + (q.x / pz) * W * 0.22, oy = H * 0.42 + (q.y / pz) * H * 0.25;
        const a = Math.min(1, (1 - q.z) * 1.4) * 0.55; ctx.globalAlpha = a; ctx.lineWidth = Math.max(0.6, (1 - q.z) * 2);
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(sx, sy); ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };
    size(); addEventListener("resize", size); raf = requestAnimationFrame(frame);
    if ("IntersectionObserver" in window) { const io = new IntersectionObserver((en) => { on = en[0].isIntersecting && !document.hidden; }); io.observe(hero); cleanup.push(() => io.disconnect()); }
    cleanup.push(() => { cancelAnimationFrame(raf); removeEventListener("resize", size); });
  }
  // Visual pages: the hero picture drifts slower than the page
  function visualHero() {
    const m = $("#app > main[data-kind='visual'] .cs-hero-media"); if (!m || reduced) return;
    const run = () => { const r = m.getBoundingClientRect(); if (r.bottom < 0) return; m.style.setProperty("--py", (Math.max(0, -r.top) * 0.18).toFixed(1) + "px"); };
    run(); onScroll(run);
  }
  // Screens lean back and settle flat as they reach you; XR tilts in depth, visual work just grows into place
  function tilts() {
    const main = $("#app > main[data-kind]");
    if (!main || reduced) return;
    const els = $$(".cs-hero-media, .ws-frame, .figs:not(.phones):not(.masonry) .bfig, .gallery figure, .pair figure, .pano, .roi", main);
    if (!els.length) return;
    const run = () => { const vh = innerHeight; els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return; el.style.setProperty("--tl", (1 - easeOut(clamp01((vh - r.top) / (vh * 0.8)))).toFixed(3)); }); };
    run(); onScroll(run); addEventListener("resize", run); cleanup.push(() => removeEventListener("resize", run));
  }
  // XR pages: over pictures, the pointer becomes a gaze reticle that fills if you hold still
  function gaze() {
    const main = $("#app > main[data-kind='xr']");
    if (!main || reduced || !matchMedia("(pointer: fine)").matches) return;
    const r = document.createElement("i"); r.className = "reticle"; r.setAttribute("aria-hidden", "true"); document.body.appendChild(r);
    const SEL = ".cs-hero-media img, .bfig img, .ws-media img, .pair figure img, .gallery img, .iter-img img";
    let t = 0;
    const move = (e) => {
      const on = e.target.closest && e.target.closest(SEL) && main.contains(e.target);
      r.classList.toggle("on", !!on); if (!on) return;
      r.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      r.classList.remove("dwell"); clearTimeout(t); t = setTimeout(() => { r.classList.add("dwell"); haptic("tick"); }, 650);
    };
    main.addEventListener("pointermove", move); main.addEventListener("pointerleave", () => r.classList.remove("on"));
    cleanup.push(() => { clearTimeout(t); r.remove(); });
  }
  function roiDials() {
    $$("[data-roi]").forEach((box) => {
      if (box.tagName === "BUTTON") return;
      const dial = $(".roi-dial", box), m = $(".roi-pt", box), arc = $(".roi-arc", box), n = $(".roi-n", box), st = $(".roi-s", box);
      let a = 64, zone = "", anim = 0;
      const ZN = (d) => d <= 30 ? ["ok", "Safe to cut"] : d <= 90 ? ["amb", "Needs a review"] : ["red", "Vestibular violation"];
      const set = (v) => {
        a = ((v + 540) % 360) - 180; const d = Math.abs(Math.round(a)), [z, label] = ZN(d);
        m.setAttribute("transform", `rotate(${a.toFixed(2)})`); n.textContent = d + "°"; st.textContent = label; box.dataset.zone = z;
        const R = 52, x = (R * Math.sin(a * Math.PI / 180)).toFixed(1), y = (-R * Math.cos(a * Math.PI / 180)).toFixed(1);
        arc.setAttribute("d", `M0 ${-R}A${R} ${R} 0 0 ${a >= 0 ? 1 : 0} ${x} ${y}`); arc.setAttribute("transform", `rotate(${-a})`);
        dial.setAttribute("aria-valuenow", Math.round(a)); dial.setAttribute("aria-valuetext", `${d} degrees, ${label}`);
        if (zone && z !== zone) haptic(z === "red" ? "heavy" : "tick"); zone = z;
      };
      const tween = (to) => { cancelAnimationFrame(anim); const from = a, t0 = performance.now(), D = reduced ? 1 : 650;
        const step = (now) => { const k = Math.min(1, (now - t0) / D); set(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) anim = requestAnimationFrame(step); else if (to === 0) haptic("success"); };
        anim = requestAnimationFrame(step); };
      const fromPointer = (e) => { const r = dial.getBoundingClientRect(); set(Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI); };
      dial.addEventListener("pointerdown", (e) => { cancelAnimationFrame(anim); dial.setPointerCapture(e.pointerId); fromPointer(e); dial.classList.add("grab"); });
      dial.addEventListener("pointermove", (e) => { if (dial.hasPointerCapture(e.pointerId)) fromPointer(e); });
      dial.addEventListener("pointerup", () => dial.classList.remove("grab"));
      dial.addEventListener("keydown", (e) => { const k = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key]; if (k) { e.preventDefault(); set(a + k); } });
      $$("[data-roi]", box).forEach((b) => b.addEventListener("click", () => b.dataset.roi === "align" ? tween(0) : tween((Math.random() < 0.5 ? -1 : 1) * (25 + Math.random() * 140))));
      set(a); cleanup.push(() => cancelAnimationFrame(anim));
    });
  }
  function panos() {
    $$("[data-pano]").forEach((v) => {
      const fov = +v.dataset.pano || 140, zone = $(".pano-zone", v), view = $(".pd-view", v);
      let yaw = 0, raf = 0, drift = !reduced, x0 = 0, y0 = 0, last = "";
      v.style.backgroundSize = `${(36000 / fov).toFixed(1)}% auto`;
      const ZN = (d) => d <= 70 ? "Content zone" : d <= 105 ? "Peripheral zone" : "Curiosity zone";
      const draw = () => {
        const W = v.clientWidth, bw = W * 360 / fov; yaw = ((yaw + 540) % 360) - 180;
        v.style.backgroundPosition = `${(W / 2 - bw / 2 - (yaw / 360) * bw).toFixed(1)}px 50%`;
        const d = Math.abs(Math.round(yaw)), z = ZN(d); zone.textContent = `${z} · ${d}°`; view.setAttribute("transform", `rotate(${yaw})`);
        v.setAttribute("aria-valuenow", Math.round(yaw)); v.setAttribute("aria-valuetext", `${d} degrees, ${z}`);
        if (last && z !== last) haptic("tick"); last = z;
      };
      const tick = () => { if (drift && v.isConnected) { yaw += 0.06; draw(); raf = requestAnimationFrame(tick); } };
      v.addEventListener("pointerdown", (e) => { drift = false; v.classList.add("grab", "used"); v.setPointerCapture(e.pointerId); x0 = e.clientX; y0 = yaw; });
      v.addEventListener("pointermove", (e) => { if (!v.hasPointerCapture(e.pointerId)) return; yaw = y0 - (e.clientX - x0) * fov / v.clientWidth; draw(); });
      v.addEventListener("pointerup", () => v.classList.remove("grab"));
      v.addEventListener("keydown", (e) => { const k = { ArrowRight: 10, ArrowLeft: -10 }[e.key]; if (k) { e.preventDefault(); drift = false; v.classList.add("used"); yaw += k; draw(); } });
      addEventListener("resize", draw); cleanup.push(() => { cancelAnimationFrame(raf); removeEventListener("resize", draw); });
      draw(); raf = requestAnimationFrame(tick);
    });
  }
  // Pictures open large: arrows, Esc and swipe
  const LB = ".gallery img, .hs-media img, .stk-media img, .figs .bfig > img, .pair figure img, .iter-img img, main[data-kind='visual'] .cs-hero-media img";
  function lightbox(list, i) {
    const back = document.activeElement;
    const el = document.createElement("div");
    el.className = "lbox"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "Image viewer"); el.setAttribute("data-lenis-prevent", "");
    el.innerHTML = `<figure><img alt=""><figcaption></figcaption></figure><span class="lb-n mono"></span>
      <button type="button" class="lb-x" aria-label="Close">✕</button>${list.length > 1 ? `<button type="button" class="lb-p" aria-label="Previous image">${icon.left}</button><button type="button" class="lb-nx" aria-label="Next image">${icon.right}</button>` : ""}`;
    document.body.appendChild(el); if (lenis) lenis.stop();
    const im = $("img", el), cap = $("figcaption", el), cnt = $(".lb-n", el);
    const show = (k) => { i = (k + list.length) % list.length; const s = list[i]; im.src = s.currentSrc || s.src; im.alt = s.alt; const fc = s.closest("figure") && $("figcaption", s.closest("figure")); cap.textContent = fc ? fc.textContent.replace("Open full size", "").trim() : ""; cnt.textContent = `${pad2(i + 1)} / ${pad2(list.length)}`; };
    const close = () => { el.classList.remove("on"); removeEventListener("keydown", key); if (lenis) lenis.start(); setTimeout(() => el.remove(), 220); if (back && back.focus) back.focus({ preventScroll: true }); };
    const key = (e) => { if (e.key === "Escape") close(); else if (e.key === "ArrowRight") { show(i + 1); haptic("tick"); } else if (e.key === "ArrowLeft") { show(i - 1); haptic("tick"); } };
    addEventListener("keydown", key);
    el.addEventListener("click", (e) => { if (e.target.closest(".lb-x") || e.target === el || e.target.tagName === "FIGURE") close(); else if (e.target.closest(".lb-p")) show(i - 1); else if (e.target.closest(".lb-nx")) show(i + 1); });
    let sx = null; el.addEventListener("pointerdown", (e) => { sx = e.clientX; }); el.addEventListener("pointerup", (e) => { if (sx !== null && Math.abs(e.clientX - sx) > 50 && e.pointerType !== "mouse") show(i + (e.clientX < sx ? 1 : -1)); sx = null; });
    show(i); requestAnimationFrame(() => el.classList.add("on")); $(".lb-x", el).focus();
  }
  function screenStates() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const frames = $$("[data-states]"); if (!frames.length) return;
    const seen = new Set();
    const io = new IntersectionObserver((ents) => ents.forEach((en) => en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)), { threshold: 0.5 });
    frames.forEach((f) => io.observe(f));
    const t = setInterval(() => seen.forEach((f) => { if (f.dataset.touched) return; const n = $$("[data-state]", f).length, cur = $$("[data-state]", f).findIndex((b) => b.getAttribute("aria-selected") === "true"); showState(f, (cur + 1) % n); }), 3200);
    cleanup.push(() => { clearInterval(t); io.disconnect(); });
  }

  /* Haptics: a small buzz under the finger. Android phones vibrate; on iPhone (iOS 18+) a hidden
     switch gives the system tick. Desktops have no motor, so buttons also press in visibly (site.css). */
  const HAPTIC = { tick: 4, tap: 8, select: 12, press: 18, heavy: 30, success: [12, 60, 18], open: [10, 70, 10], shatter: [45, 35, 25, 30, 90] };
  const hapticSupport = (() => { try { if (typeof navigator.vibrate === "function") return "vibrate"; return /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ? "ios" : ""; } catch (e) { return ""; } })();
  let hapticsOn = store.get("haptics", true), iosTick = null;
  function haptic(kind) {
    if (!hapticsOn || !hapticSupport) return;
    try {
      if (hapticSupport === "vibrate") { navigator.vibrate(HAPTIC[kind] || HAPTIC.tap); return; }
      if (!iosTick) { iosTick = document.createElement("label"); iosTick.setAttribute("aria-hidden", "true"); iosTick.className = "haptic-switch"; iosTick.innerHTML = '<input type="checkbox" switch tabindex="-1">'; document.body.appendChild(iosTick); }
      iosTick.click();
    } catch (e) { /* not available here */ }
  }

  function toast(msg) { const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }
  function copy(text) {
    const fallback = () => { const el = $("#email-addr"); if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Selected. Press Ctrl+C to copy."); } else toast(text); };
    try { navigator.clipboard.writeText(text).then(() => { toast("Email copied"); haptic("success"); }, fallback); } catch (e) { fallback(); }
  }
  function toggleTheme() {
    const root = document.documentElement;
    const cur = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    root.dataset.theme = next; store.set("theme", next); document.dispatchEvent(new Event("themechange"));
  }
  (function initTheme() { const t = store.get("theme", null); if (t) document.documentElement.dataset.theme = t; })();

  /* ---------- motion ---------- */
  function startOrbit() {
    const el = $("#orbit"); if (!el) return;
    const nodes = $$(".node", el);
    const ring = [{ rx: .46, ry: .147, sp: .00011 }, { rx: .34, ry: .108, sp: -.00016 }, { rx: .22, ry: .07, sp: .00024 }];
    const per = {}; nodes.forEach((n) => { const r = +n.dataset.ring; per[r] = (per[r] || 0) + 1; });
    const idx = {}; nodes.forEach((n) => { const r = +n.dataset.ring; idx[r] = (idx[r] || 0); n._phase = (idx[r]++ / per[r]) * Math.PI * 2 + r * 0.7; });
    const tilt = -14 * Math.PI / 180, cx = .5, cy = .55;
    let paused = false, raf, t0 = performance.now(), offset = 0, visible = true;
    const place = (now) => {
      const W = el.clientWidth, H = el.clientHeight, k = W < 480 ? 0.78 : 1;
      nodes.forEach((n) => {
        const R = ring[+n.dataset.ring], a = n._phase + offset * R.sp;
        const x = R.rx * k * Math.cos(a), y = R.ry * k * Math.sin(a);
        const X = x * Math.cos(tilt) - y * Math.sin(tilt), Y = x * Math.sin(tilt) + y * Math.cos(tilt);
        const depth = Math.sin(a);
        n.style.transform = `translate(${((cx + X) * W).toFixed(1)}px, ${((cy + Y) * H).toFixed(1)}px) translate(-50%, -50%) scale(${(0.86 + 0.14 * depth).toFixed(3)})`;
        n.style.zIndex = depth > 0 ? 4 : 1;
        n.style.opacity = (0.62 + 0.38 * (depth + 1) / 2).toFixed(2);
      });
    };
    const tick = (now) => { if (!paused && visible) offset += now - t0; t0 = now; place(now); raf = requestAnimationFrame(tick); };
    if (reduced) { place(0); addEventListener("resize", () => place(0)); return; }
    el.addEventListener("mouseover", (e) => { if (e.target.closest(".node")) paused = true; });
    el.addEventListener("mouseout", (e) => { if (e.target.closest(".node")) paused = false; });
    el.addEventListener("focusin", () => paused = true); el.addEventListener("focusout", () => paused = false);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(el);
    raf = requestAnimationFrame(tick);
    cleanup.push(() => { cancelAnimationFrame(raf); io.disconnect(); });
  }
  // Crossfade a set of images, updating a caption
  function cycle(sel, capSel, names) {
    const imgs = $$(sel), cap = $(capSel); if (imgs.length < 2 || reduced) return;
    let i = 0;
    const id = setInterval(() => { imgs[i].classList.remove("on"); i = (i + 1) % imgs.length; imgs[i].classList.add("on"); if (cap) cap.textContent = names[i] || ""; }, 3800);
    cleanup.push(() => clearInterval(id));
  }
  // Elements below the first screen rise in as they arrive. Anything visible on load stays put.
  function reveal() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const els = $$("[data-reveal]").filter((el) => el.getBoundingClientRect().top > innerHeight * 0.92);
    els.forEach((el) => el.classList.add("pre"));
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.remove("pre"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    cleanup.push(() => io.disconnect());
  }
  function countUp() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const els = $$(".num[data-to]").filter((el) => el.getBoundingClientRect().top > innerHeight * 0.92 && /^\d+$/.test(el.dataset.to));
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return; io.unobserve(en.target);
      const el = en.target, to = +el.dataset.to, t0 = performance.now();
      const step = (now) => { const k = Math.min(1, (now - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }));
    els.forEach((el) => io.observe(el));
    cleanup.push(() => io.disconnect());
  }

  /* ---------- smooth scrolling and scroll-linked motion ---------- */
  let lenis = null;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  function initSmooth() {
    if (reduced || !window.Lenis || lenis) return;
    try {
      lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const loop = (t) => { lenis.raf(t); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    } catch (e) { lenis = null; }
  }
  function goTo(target, immediate) {
    if (lenis) lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -90, immediate: !!immediate });
    else if (typeof target === "number") window.scrollTo(0, target);
    else target.scrollIntoView({ behavior: immediate || reduced ? "auto" : "smooth" });
  }
  const onScroll = (fn) => { if (lenis) { lenis.on("scroll", fn); cleanup.push(() => lenis.off("scroll", fn)); } else { addEventListener("scroll", fn, { passive: true }); cleanup.push(() => removeEventListener("scroll", fn)); } };

  /* Headings rise word by word out of a mask as they arrive. */
  function splitHeads() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const heads = $$(".section-head h2, .page-head h1");
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -10% 0px" });
    heads.forEach((h) => {
      if (h.dataset.split) return; h.dataset.split = "1";
      const words = h.textContent.trim().split(/\s+/);
      h.setAttribute("aria-label", h.textContent.trim());
      h.innerHTML = words.map((w, i) => `<span class="wd" aria-hidden="true"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ");
      h.classList.add("split");
      if (h.getBoundingClientRect().top < innerHeight * 0.9) h.classList.add("in"); else io.observe(h);
    });
    cleanup.push(() => io.disconnect());
  }

  /* The marquee drifts on its own and speeds up, leans and reverses with the scroll. */
  function marquee() {
    const mq = $(".marquee"), track = $(".mq-track"); if (!mq || !track || reduced) return;
    mq.classList.add("js");
    let x = 0, dir = 1, raf, lastY = scrollY, vel = 0;
    const step = () => {
      const y = lenis ? lenis.scroll : scrollY; const v = lenis ? lenis.velocity : (y - lastY); lastY = y;
      vel += (v - vel) * 0.12; if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
      const half = track.scrollWidth / 2;
      x -= dir * (0.5 + Math.min(Math.abs(vel), 60) * 0.35);
      if (x <= -half) x += half; if (x > 0) x -= half;
      const skew = Math.max(-10, Math.min(10, -vel * 0.35));
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    cleanup.push(() => cancelAnimationFrame(raf));
  }

  /* Scroll-scrubbed effects: the hero lifts away, bento thumbnails assemble, the areas stage opens up,
     archive titles come into focus, and the films strip's letterbox opens. */
  function scrubs() {
    if (reduced) return;
    const items = [];
    const vh = () => innerHeight;
    const hero = $(".hero");
    if (hero) {
      const h1 = $(".hero h1"), act = $(".hero .actions"), orb = $("#orbit");
      items.push(() => { const r = hero.getBoundingClientRect(); const p = clamp01(-r.top / Math.max(1, r.height));
        h1.style.transform = `translate3d(0,${(-p * 90).toFixed(1)}px,0)`; h1.style.opacity = (1 - p * 0.95).toFixed(3);
        act.style.transform = `translate3d(0,${(-p * 50).toFixed(1)}px,0)`; act.style.opacity = (1 - p * 1.2).toFixed(3);
        if (orb) orb.style.transform = `translate3d(0,${(p * 70).toFixed(1)}px,0) scale(${(1 - p * 0.14).toFixed(3)}) rotate(${(-p * 8).toFixed(2)}deg)`; });
    }
    // Bento thumbnails fly together from scattered cells as their row arrives
    const OFF = [[0, 0, 0], [90, -60, 10], [140, 30, -12], [-90, 80, 8], [10, 120, -6], [120, 110, 14]];
    $$(".feature").forEach((f, k) => {
      const cells = $$(".b", f), meta = $(".meta", f), side = k % 2 ? -1 : 1, main = $(".b-main img", f);
      items.push(() => { const r = f.getBoundingClientRect(); const p = clamp01((vh() - r.top) / (vh() * 0.7)); const e = easeOut(p);
        cells.forEach((c, i) => { const o = OFF[i] || [0, 0, 0];
          c.style.transform = i === 0 ? `scale(${(0.86 + 0.14 * e).toFixed(3)})` : `translate3d(${(o[0] * side * (1 - e)).toFixed(1)}px,${(o[1] * (1 - e)).toFixed(1)}px,0) rotate(${(o[2] * side * (1 - e)).toFixed(2)}deg) scale(${(0.7 + 0.3 * e).toFixed(3)})`;
          c.style.opacity = Math.min(1, 0.15 + e * 1.15).toFixed(3); });
        if (main) main.style.transform = `scale(1.12) translate3d(0,${((0.5 - clamp01((vh() - r.top) / (vh() + r.height))) * 40).toFixed(1)}px,0)`;
        meta.style.transform = `translate3d(${(side * 60 * (1 - e)).toFixed(1)}px,0,0)`; meta.style.opacity = (0.1 + 0.9 * e).toFixed(3); });
    });
    // The areas stage grows from a card into a near full-width screen
    const stage = $("#stage");
    if (stage) items.push(() => { const r = stage.getBoundingClientRect(); const e = easeOut(clamp01((vh() - r.top) / (vh() * 0.85)));
      stage.style.transform = `scale(${(0.86 + 0.14 * e).toFixed(4)})`; stage.style.borderRadius = `${(44 - 26 * e).toFixed(1)}px`; });
    // Archive titles sharpen as they reach the middle of the screen
    const tis = $$(".ti");
    if (tis.length) items.push(() => { const mid = vh() * 0.5; tis.forEach((t) => { const r = t.getBoundingClientRect(); const d = Math.min(1, Math.abs(r.top + r.height / 2 - mid) / (vh() * 0.45)); t.style.setProperty("--focus", (1 - d * 0.75).toFixed(3)); }); });
    // Accordion and current slot rise with a slight tilt
    const acc = $("#acc");
    if (acc) items.push(() => { const r = acc.getBoundingClientRect(); const e = easeOut(clamp01((vh() - r.top) / (vh() * 0.8)));
      acc.style.transform = `perspective(1400px) rotateX(${(14 * (1 - e)).toFixed(2)}deg) translate3d(0,${(60 * (1 - e)).toFixed(1)}px,0)`; acc.style.opacity = (0.2 + 0.8 * e).toFixed(3); });
    // Films strip: letterbox bars open as it comes into view
    const fs = $(".fs-frame");
    if (fs) items.push(() => { const r = fs.getBoundingClientRect(); const e = easeOut(clamp01((vh() - r.top) / (vh() * 0.6)));
      fs.style.setProperty("--bars", `${(50 - 40 * e).toFixed(2)}%`); });
    if (!items.length) return;
    let ticking = false;
    const run = () => { ticking = false; items.forEach((fn) => fn()); };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    run(); onScroll(req); addEventListener("resize", req); cleanup.push(() => removeEventListener("resize", req));
  }

  /* Areas of work: a segmented control with a sliding indicator. Advances on its own until touched. */
  function stageTabs() {
    const stage = $("#stage"); if (!stage) return;
    const tabs = $$("[data-area]", stage), panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls"))), media = $$(".sm", stage), ind = $(".seg-ind", stage);
    let cur = 0, auto = !reduced, timer;
    const DUR = 5000; let held = false;
    const slide = () => { const t = tabs[cur]; ind.style.width = t.offsetWidth + "px"; ind.style.transform = `translateX(${t.offsetLeft}px)`; };
    const show = (i, focus) => {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => { const on = k === cur; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; t.classList.remove("run"); });
      panels.forEach((pn, k) => { pn.hidden = k !== cur; });
      media.forEach((m, k) => { m.classList.toggle("on", k === cur); const v = $("video", m); if (v) { if (k === cur) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } else v.pause(); } });
      slide(); if (focus) tabs[cur].focus();
      if (auto && !held) { void tabs[cur].offsetWidth; tabs[cur].classList.add("run"); clearTimeout(timer); timer = setTimeout(() => show(cur + 1), DUR); }
    };
    const stop = () => { auto = false; clearTimeout(timer); tabs.forEach((t) => t.classList.remove("run")); };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => { stop(); show(i); });
      t.addEventListener("keydown", (e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); stop(); show(cur + (e.key === "ArrowRight" ? 1 : -1), true); } });
    });
    stage.addEventListener("pointerenter", () => { held = true; clearTimeout(timer); tabs.forEach((t) => t.classList.remove("run")); });
    stage.addEventListener("pointerleave", () => { held = false; if (auto) show(cur); });
    addEventListener("resize", slide); cleanup.push(() => { clearTimeout(timer); removeEventListener("resize", slide); });
    show(0);
  }

  /* Flavours accordion: hover or tap a panel to open it; it also moves on by itself until touched. */
  function accordion() {
    const acc = $("#acc"); if (!acc) return;
    const its = $$(".acc-i", acc); let cur = 0, auto = !reduced, timer, hov;
    const open = (i) => { cur = (i + its.length) % its.length; its.forEach((el, k) => { el.classList.toggle("on", k === cur); el.classList.remove("run"); });
      if (auto) { void its[cur].offsetWidth; its[cur].classList.add("run"); clearTimeout(timer); timer = setTimeout(() => open(cur + 1), 6000); } };
    const stop = () => { auto = false; clearTimeout(timer); its.forEach((el) => el.classList.remove("run")); };
    its.forEach((el, i) => {
      el.addEventListener("pointerenter", (e) => { if (e.pointerType !== "mouse") return; clearTimeout(hov); hov = setTimeout(() => { stop(); open(i); }, 110); });
      el.addEventListener("pointerleave", () => clearTimeout(hov));
      el.addEventListener("focus", () => { stop(); open(i); });
      el.addEventListener("click", (e) => { if (!el.classList.contains("on")) { e.preventDefault(); stop(); open(i); } });
    });
    open(0);
    cleanup.push(() => { clearTimeout(timer); clearTimeout(hov); });
  }

  /* Films: a DVD player. Menu, scene selection, a preview player and special features,
     driven by mouse, touch, the on-screen remote or the keyboard. */
  function dvd() {
    const tv = $("#tv"); if (!tv) return;
    const D = discs();
    const scr = Object.fromEntries($$(".scr", tv).map((e) => [e.dataset.scr, e]));
    const flash = $("#osd-flash"), saver = $("#saver"), logo = $("#saver-logo"), vfd = $("#vfd"), deck = $("#deck"), tray = $("#tray"), led = $("#led");
    const media = $("#play-media"), tcEl = $("#tc"), bar = $("#bar"), pp = $("#pp"), deckPP = $(".deck .pp");
    const T = (ms) => reduced ? 0 : ms;
    let di = 0, screen = "menu", sel = 0, ch = 0, all = false, paused = false, frames = 0, last = 0, raf = 0, idle, flashT, bgTimer, busy = false, open = false, lastSec = -1;
    const disc = () => D[di], eps = () => disc().items;
    const CH_FRAMES = 25 * 14; // each chapter preview runs 14 seconds at 25 fps
    const items = () => $$(".nav-i", scr[screen]);
    const mark = () => { const it = items(); sel = Math.max(0, Math.min(sel, it.length - 1)); it.forEach((b, i) => b.classList.toggle("sel", i === sel)); };
    const osd = (txt) => { flash.textContent = txt; flash.classList.add("on"); clearTimeout(flashT); flashT = setTimeout(() => flash.classList.remove("on"), 1400); };
    const setVfd = (t) => { vfd.textContent = t; };
    const tc = (f) => { const ff = f % 25, s = Math.floor(f / 25); return `00:${pad2(Math.floor(s / 60))}:${pad2(s % 60)}:${pad2(ff)}`; };
    const show = (name, label) => {
      Object.entries(scr).forEach(([k, e]) => { e.hidden = k !== name; });
      tv.classList.toggle("playing", name === "play");
      deck.classList.toggle("playing", name === "play" && !paused);
      if (name !== "play") stopPlay();
      screen = name; sel = name === "scenes" ? ch : name === "play" ? 1 : 0; mark(); if (label) osd(label);
    };
    // Put the current disc's contents on screen
    const renderDisc = () => {
      const d = disc();
      $("#m-disc").textContent = `SDR FILMS · DISC ${d.no}`; $("#m-count").textContent = "CHAPTERS";
      $("#m-kind").textContent = d.kind; $("#m-title").textContent = di === 0 ? S.films.headline : d.title;
      $("#s-disc").textContent = `DISC ${d.no} · ${d.title.toUpperCase()}`;
      $("#scenes").innerHTML = d.items.map((x, i) => `<button type="button" class="scene nav-i" data-act="ch" data-ch="${i}"><span class="sc-img">${x.thumb ? `<img src="${esc(x.thumb)}" alt="">` : `<span class="sc-ph mono">In the edit</span>`}</span><span class="mono">CH ${pad2(i + 1)}${x.runtime ? " · " + esc(x.runtime) : ""}</span><b>${esc(x.name)}</b>${x.sub && x.sub !== x.region ? `<span class="sc-sub">${esc(x.sub)}</span>` : ""}</button>`).join("")
        + `<button type="button" class="scene sc-back nav-i" data-act="menu"><span class="mono">↩</span><b>Main menu</b></button>`;
      const bgEl = $("#tv-bg"); bgEl.innerHTML = d.items.filter((x) => x.thumb).slice(0, 6).map((x, i) => `<img src="${esc(x.thumb)}" alt="" class="${i === 0 ? "on" : ""}">`).join("");
      $("#disc-img").src = d.items[0].thumb || "";
      $$(".case").forEach((c, i) => c.classList.toggle("in", i === di));
      clearInterval(bgTimer); const bgs = $$("img", bgEl); let bi = 0;
      if (bgs.length > 1 && !reduced) bgTimer = setInterval(() => { bgs[bi].classList.remove("on"); bi = (bi + 1) % bgs.length; bgs[bi].classList.add("on"); }, 4500);
      ch = 0;
    };
    // Tray and disc handling
    const openTray = () => { open = true; tray.classList.add("open"); deck.classList.remove("playing"); show("load"); $("#load-msg").textContent = "OPEN"; setVfd("OPEN"); };
    const closeTray = (then) => {
      open = false; tray.classList.remove("open"); setVfd("CLOSE"); $("#load-msg").textContent = "LOADING"; led.classList.add("blink");
      setTimeout(() => { setVfd("LOADING"); }, T(500));
      setTimeout(() => { led.classList.remove("blink"); haptic("success"); renderDisc(); show("menu", `DISC ${disc().no}`); setVfd(`DISC ${disc().no} · ${pad2(eps().length)} CH`); busy = false; if (then) then(); }, T(1300));
    };
    const load = (i, then) => {
      if (busy) return; wake();
      if (i === di && !open) { show("menu", "MENU"); if (then) then(); return; }
      busy = true; if (!open) openTray();
      setTimeout(() => { di = i; $("#disc-img").src = disc().items[0].thumb || ""; $$(".case").forEach((c, k) => c.classList.toggle("in", k === di)); }, T(550));
      setTimeout(() => closeTray(then), T(1100));
    };
    const eject = () => { if (busy) return; wake(); if (open) { busy = true; closeTray(); } else { openTray(); osd("⏏ OPEN"); } };
    // Playback (a moving preview of the still; the film itself opens on YouTube)
    const loadCh = (i) => {
      const E = eps(); ch = (i + E.length) % E.length; const x = E[ch];
      media.innerHTML = x.clip ? `<video src="${esc(x.clip)}" muted autoplay loop playsinline></video>` : x.thumb ? `<img src="${esc(x.thumb)}" alt="${esc(x.name)}">` : `<span class="sc-ph mono">In the edit</span>`;
      $("#play-name").textContent = x.name;
      $("#play-sub").textContent = [`CH ${pad2(ch + 1)}`, x.sub || x.region, x.year, x.runtime].filter(Boolean).join(" · ");
      $("#osd-ch").textContent = `CH ${pad2(ch + 1)}`; $("#osd-mode").textContent = all ? "PLAY ALL" : "PREVIEW";
      const w = $("#watch"); if (x.yt) { w.dataset.yt = x.yt; w.dataset.title = x.name; w.dataset.thumb = x.thumb || ""; } else { delete w.dataset.yt; } if (x.href) { w.href = x.href; w.textContent = x.yt ? "▶ Watch the film" : "Watch on YouTube ↗"; w.classList.remove("off"); } else { w.href = S.films.channel; w.textContent = "In the edit"; w.classList.add("off"); }
      frames = 0; lastSec = -1; paused = false; pp.textContent = "❚❚"; deckPP.textContent = "❚❚"; media.classList.remove("paused"); deck.classList.add("playing");
    };
    const play = (i, playAll) => { if (open || busy) return; all = !!playAll; show("play", playAll ? "▶ PLAY ALL" : `▶ CH ${pad2(i + 1)}`); loadCh(i); last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    function stopPlay() { cancelAnimationFrame(raf); deckPP.textContent = "▶"; deck.classList.remove("playing"); }
    const tick = (now) => {
      if (!paused) frames += (now - last) / 40;
      last = now;
      const f = Math.floor(frames); tcEl.textContent = tc(f); bar.style.width = Math.min(100, f / CH_FRAMES * 100) + "%";
      const sec = Math.floor(f / 25); if (sec !== lastSec) { lastSec = sec; setVfd(`CH ${pad2(ch + 1)}  ${tc(f).slice(3, 8)}`); }
      if (f >= CH_FRAMES) { if (all && ch < eps().length - 1) { loadCh(ch + 1); osd(`▶ CH ${pad2(ch + 1)}`); } else if (all) { show("menu", "MENU"); setVfd(`DISC ${disc().no} · END`); return; } else { frames = 0; } }
      raf = requestAnimationFrame(tick);
    };
    const togglePause = () => { paused = !paused; pp.textContent = paused ? "▶" : "❚❚"; deckPP.textContent = paused ? "▶" : "❚❚"; deck.classList.toggle("playing", !paused); media.classList.toggle("paused", paused); const v = $("video", media); if (v) paused ? v.pause() : v.play().catch(() => {}); osd(paused ? "❚❚ PAUSE" : "▶ PLAY"); };
    const scrollTo = (id) => { const el = document.getElementById(id); if (el) goTo(el); };
    const act = (b) => {
      const a = b.dataset.act; wake();
      haptic(a === "eject" ? "open" : a === "ch" || a === "playall" || a === "playpause" ? "press" : "select");
      if (!a) { b.click(); return; }
      if (a === "eject") return eject();
      if (open && a !== "eject") { if (a === "playpause" || a === "stop") { busy = true; closeTray(); } return; }
      if (a === "playall") play(0, true);
      else if (a === "scenes") show("scenes", "SCENE SELECTION");
      else if (a === "menu" || a === "stop") { show("menu", "MENU"); setVfd(`DISC ${disc().no} · ${pad2(eps().length)} CH`); }
      else if (a === "about") scrollTo(disc().section);
      else if (a === "ch") play(+b.dataset.ch, false);
      else if (a === "playpause") { if (screen === "play") togglePause(); else if (screen === "scenes" && items()[sel] && items()[sel].dataset.ch) play(+items()[sel].dataset.ch, false); else play(ch, screen === "menu"); }
      else if (a === "prev" || a === "next") { const k = a === "prev" ? -1 : 1; if (screen === "play") { loadCh(ch + k); osd(`${k < 0 ? "⏮" : "⏭"} CH ${pad2(ch + 1)}`); } else { key(k < 0 ? "ArrowLeft" : "ArrowRight"); } }
      else if (a === "pause") togglePause();
    };
    const cols = () => { const it = items(); if (screen !== "scenes" || !it.length) return 1; const t = it[0].offsetTop; return Math.max(1, it.filter((e) => e.offsetTop === t).length); };
    function key(k) {
      wake();
      if (k === "e" || k === "E") { eject(); return true; }
      if (k === "m" || k === "M" || k === "Escape") { if (!open) show("menu", "MENU"); return true; }
      const it = items(); if (!it.length) return false;
      if (k === "ArrowDown") sel = screen === "scenes" ? Math.min(it.length - 1, sel + cols()) : (sel + 1) % it.length;
      else if (k === "ArrowUp") sel = screen === "scenes" ? Math.max(0, sel - cols()) : (sel - 1 + it.length) % it.length;
      else if (k === "ArrowRight") sel = (sel + 1) % it.length;
      else if (k === "ArrowLeft") sel = (sel - 1 + it.length) % it.length;
      else if (k === "Enter" || k === " ") { if (it[sel]) act(it[sel]); return true; }
      else return false;
      mark(); return true;
    }
    // Mouse, touch and keyboard
    tv.addEventListener("click", (e) => { const b = e.target.closest(".nav-i"); if (!b) return; if (b.tagName === "A") return; e.preventDefault(); sel = items().indexOf(b); mark(); act(b); });
    tv.addEventListener("mouseover", (e) => { const b = e.target.closest(".nav-i"); if (b) { const i = items().indexOf(b); if (i >= 0) { sel = i; mark(); } } });
    deck.addEventListener("click", (e) => { const b = e.target.closest("[data-act]"); if (b) act(b); });
    // A disc can be dragged from its case into the player (mouse and pen); a tap or click loads it too
    let dragged = false;
    $$(".case img").forEach((im) => { im.draggable = false; });
    $$(".case").forEach((c) => {
      c.addEventListener("click", (e) => { if (dragged) { dragged = false; e.preventDefault(); return; } haptic("press"); load(+c.dataset.disc); });
      c.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || e.pointerType === "touch" || reduced) return;
        const i = +c.dataset.disc, src = $(".case-disc img", c), x0 = e.clientX, y0 = e.clientY;
        let ghost = null, over = false;
        const target = () => { const r = $(".slot", deck).getBoundingClientRect(), t = tv.getBoundingClientRect(); return { r, hit: (x, y) => (x > r.left - 60 && x < r.right + 60 && y > r.top - 70 && y < r.bottom + 70) || (x > t.left && x < t.right && y > t.top && y < t.bottom) }; };
        const move = (ev) => {
          const dx = ev.clientX - x0, dy = ev.clientY - y0;
          if (!ghost && Math.hypot(dx, dy) > 8) {
            ghost = document.createElement("span"); ghost.className = "disc-ghost"; ghost.innerHTML = src ? `<img src="${src.getAttribute("src")}" alt="">` : "";
            document.body.appendChild(ghost); c.classList.add("lifted"); deck.classList.add("drop-ready"); haptic("tick");
          }
          if (!ghost) return;
          ghost.style.transform = `translate(${ev.clientX - 60}px, ${ev.clientY - 60}px) rotate(${dx * 0.4}deg)`;
          const o = target().hit(ev.clientX, ev.clientY); if (o !== over) { over = o; deck.classList.toggle("drop-over", over); if (over) haptic("select"); }
        };
        const up = () => {
          removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
          if (!ghost) return;
          dragged = true; deck.classList.remove("drop-ready", "drop-over"); c.classList.remove("lifted");
          const g = ghost, r = over ? target().r : c.getBoundingClientRect();
          g.classList.add("settle"); g.style.transform = `translate(${r.left + r.width / 2 - 60}px, ${r.top + r.height / 2 - 60}px) scale(${over ? 0.55 : 0.8})`;
          setTimeout(() => g.remove(), 380);
          if (over) { haptic("press"); load(i); }
        };
        addEventListener("pointermove", move); addEventListener("pointerup", up); addEventListener("pointercancel", up);
      });
    });
    $$("[data-load-disc]").forEach((b) => b.addEventListener("click", () => { const i = D.findIndex((d) => d.id === b.dataset.loadDisc); if (i < 0) return; goTo($(".dvd")); setTimeout(() => load(i), T(700)); }));
    let over = false;
    [tv, deck].forEach((el) => { el.addEventListener("pointerenter", () => over = true); el.addEventListener("pointerleave", () => over = false); });
    const onKey = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || $(".palette-bg")) return;
      const inside = tv.contains(document.activeElement) || deck.contains(document.activeElement) || over;
      if (!inside) return;
      if (key(e.key)) e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    // Screensaver: the bouncing logo, after a while on the menu with nothing happening
    let sx = 40, sy = 40, vx = 1.6, vy = 1.2, sraf = 0, hits = 0;
    const bounce = () => {
      const W = tv.clientWidth - logo.offsetWidth, H = tv.clientHeight - logo.offsetHeight;
      sx += vx; sy += vy;
      if (sx <= 0 || sx >= W) { vx *= -1; sx = Math.max(0, Math.min(W, sx)); hits++; }
      if (sy <= 0 || sy >= H) { vy *= -1; sy = Math.max(0, Math.min(H, sy)); hits++; }
      logo.style.transform = `translate(${sx}px, ${sy}px)`; logo.classList.toggle("red", hits % 2 === 1);
      sraf = requestAnimationFrame(bounce);
    };
    const sleep = () => { if (reduced || screen !== "menu") return; saver.hidden = false; sraf = requestAnimationFrame(bounce); };
    function wake() { if (!saver.hidden) { saver.hidden = true; cancelAnimationFrame(sraf); } clearTimeout(idle); idle = setTimeout(sleep, 30000); }
    ["pointermove", "pointerdown", "wheel", "touchstart"].forEach((ev) => tv.addEventListener(ev, wake, { passive: true }));
    renderDisc(); wake(); mark(); setVfd(`DISC ${disc().no} · ${pad2(eps().length)} CH`);
    cleanup.push(() => { document.removeEventListener("keydown", onKey); cancelAnimationFrame(raf); cancelAnimationFrame(sraf); clearTimeout(idle); clearTimeout(flashT); clearInterval(bgTimer); });
  }

  /* Films: hovering a place on the map highlights it in the list, and the other way round. */
  function scenes() {
    const root = document.documentElement, els = $$("[data-scene]");
    if (!els.length) return;
    let cur = "";
    const run = () => {
      const vh = innerHeight; let on = "";
      els.forEach((e) => { const r = e.getBoundingClientRect(); if (r.top <= 2 && r.bottom > vh * 0.45) on = e.dataset.scene; });
      if (on === cur) return; cur = on; if (on) root.dataset.scene = on; else delete root.dataset.scene;
    };
    run(); onScroll(run); cleanup.push(() => { delete root.dataset.scene; });
  }
  function mapSync() {
    const pts = $$(".map .pt"), rows = $$(".place[data-i]");
    const hi = (i, on) => { pts.forEach((p) => p.classList.toggle("hi", on && p.dataset.i === i)); rows.forEach((r) => r.classList.toggle("hi", on && r.dataset.i === i)); };
    [...pts, ...rows].forEach((el) => { el.addEventListener("mouseenter", () => hi(el.dataset.i, true)); el.addEventListener("mouseleave", () => hi(el.dataset.i, false)); });
  }

  /* ---------- router ---------- */
  function parse() {
    const h = decodeURIComponent(location.hash.replace(/^#/, "")) || "home";
    if (h.startsWith("p-")) return { page: "p", id: h.slice(2) };
    if (h === "about-contact") return { page: "about", anchor: "about-contact" };
    if (h.startsWith("for-")) return { page: "for", q: h.slice(4) };
    return { page: h };
  }
  const PAGES = { home, work, archive, films, writing, about, resume, colophon };
  let cleanup = [];
  function render() {
    cleanup.forEach((f) => f()); cleanup = [];
    const r = parse();
    const ar = areaOf(r.page);
    const body = r.page === "p" ? project(r.id) : r.page === "for" ? forPage(r.q) : ar ? areaPage(ar) : (PAGES[r.page] || notFound)();
    if (r.page === "films") document.documentElement.dataset.page = "films"; else document.documentElement.removeAttribute("data-page");
    const tp = r.page === "p" && byId[r.id] ? byId[r.id] : null;
    const tone = tp && !tp.hidden ? (tp.tone || (S.caseStudies[tp.id] || {}).tone) : ar ? ar.tone : "";
    if (tone) document.documentElement.dataset.tone = tone; else document.documentElement.removeAttribute("data-tone");
    $("#app").innerHTML = shell(r) + body + footer();
    const p = r.page === "p" ? byId[r.id] : null;
    document.title = p ? `${p.title} · ${S.owner.name}` : ar ? `${ar.label} · ${S.owner.name}` : r.page === "for" ? `For you · ${S.owner.name}` : r.page === "home" ? `${S.owner.name} · Design archive` : `${(NAV.find(([k]) => k === r.page) || [0, r.page.charAt(0).toUpperCase() + r.page.slice(1)])[1]} · ${S.owner.name}`;
    if (r.anchor) { const el = document.getElementById(r.anchor); if (el) setTimeout(() => goTo(el, true), 30); } else goTo(0, true);
    after(r);
  }
  function after(r) {
    if (r.page === "archive") archiveRender();
    if (r.page === "home") { pixelMe(); askCycle(); startOrbit(); stageTabs(); accordion(); marquee(); bindPreview($("#type-index"), ".ti[data-id]"); cycle(".fs-frame img", null, []); }
    if (r.page === "work") { /* nothing extra */ }
    if (r.page === "films") { dvd(); mapSync(); scenes(); }
    footerFx(); howBoards(); xrRooms(); if (r.page === "xr-design") xrBoot(); reveal(); countUp(); splitHeads(); scrubs(); screenStates(); tilts(); gaze(); roiDials(); panos();
    pins(); charts(); compares(); cbsims(); tins(); watches(); fgames(); rgames(); moos(); buildits(); reqmaps(); videos(); visualHero();
    if (r.page === "p") { const pr = S.projects.find((x) => x.id === r.id); if (pr) xrHero(pr); }
    if (r.page === "p") $$(LB, $("#main")).forEach((im) => { if (!im.closest("a")) { im.classList.add("lb-able"); im.setAttribute("tabindex", "0"); im.setAttribute("role", "button"); } });
    // XR area page: the frame leans toward the pointer
    const lean = $(".area-xr .area-media");
    if (lean && !reduced && matchMedia("(pointer: fine)").matches) {
      const hero = $(".area-xr .area-hero"), mv = (e) => { const r = lean.getBoundingClientRect(); lean.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(2) + "deg"); lean.style.setProperty("--rx", ((0.5 - (e.clientY - r.top) / r.height) * 10).toFixed(2) + "deg"); };
      hero.addEventListener("pointermove", mv); hero.addEventListener("pointerleave", () => { lean.style.removeProperty("--ry"); lean.style.removeProperty("--rx"); });
    }
    // word-by-word highlight tied to scroll
    const hl = $("[data-highlight]");
    if (hl) {
      const words = $$(".w", hl);
      const on = () => { const b = hl.getBoundingClientRect(); const t = Math.min(1, Math.max(0, (innerHeight * 0.85 - b.top) / (b.height + innerHeight * 0.35))); const n = reduced ? words.length : Math.round(t * words.length); words.forEach((w, i) => w.classList.toggle("on", i < n)); };
      on(); onScroll(on);
    }
    // case-study scroll spy, progress and steps
    const prog = $("#progress");
    if (prog) {
      const secs = $$("[id^='sec-']");
      const links = $$(".secs a");
      const steps = $$("[data-step]"), screens = $$("[data-screen]");
      const on = () => {
        const doc = document.documentElement; prog.style.width = Math.min(100, (scrollY / (doc.scrollHeight - innerHeight)) * 100) + "%";
        let cur = secs[0] && secs[0].id;
        secs.forEach((s) => { if (s.getBoundingClientRect().top < 200) cur = s.id; });
        links.forEach((a) => a.classList.toggle("on", "sec-" + a.dataset.jump === cur));
        let st = 0; steps.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.55) st = i; });
        steps.forEach((s, i) => s.classList.toggle("on", i === st)); screens.forEach((s, i) => s.classList.toggle("on", i === st));
      };
      on(); onScroll(on);
    }
  }

  /* ---------- Films: the TV switches on to static, tunes into a camera and a running reel,
     counts down 3-2-1, then the screen cracks and falls away into the page. One piece, one screen. ---------- */
  let fxIntro = false, fxEnd = null;
  function filmIntro() {
    if (fxEnd) fxEnd();
    fxIntro = true;
    const root = document.documentElement;
    let seen = false; try { seen = sessionStorage.getItem("reel") === "1"; sessionStorage.setItem("reel", "1"); } catch (e) { /* private window */ }
    const SP = seen ? 0.5 : 1;
    const F = S.films, thumbs = [...F.places, ...(F.trailers || []), ...(F.extra || [])].map((x) => x.thumb).filter(Boolean);
    const frames = Array.from({ length: 12 }, (_, i) => thumbs[i % Math.max(1, thumbs.length)]);
    const reel = (cls) => `<svg class="rl ${cls}" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="57" class="rl-rim"/><circle cx="60" cy="60" r="${cls === "l" ? 50 : 34}" class="rl-tape"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${(60 + 30 * Math.cos(a * Math.PI / 180)).toFixed(1)}" cy="${(60 + 30 * Math.sin(a * Math.PI / 180)).toFixed(1)}" r="10" class="rl-hole"/>`).join("")}<circle cx="60" cy="60" r="8" class="rl-hub"/></svg>`;
    // the screen breaks into wedges around a point just above the middle
    const C = [50, 47], A = [0, 38, 81, 118, 162, 205, 247, 290, 328, 360], R = 160;
    const pt = (a, r) => [C[0] + Math.cos(a * Math.PI / 180) * r, C[1] + Math.sin(a * Math.PI / 180) * r];
    const shards = A.slice(0, -1).map((a, k) => { const b = A[k + 1], m = (a + b) / 2, j1 = pt(a + 6, 22 + (k % 3) * 9), j2 = pt(m - 4, 48 + (k % 2) * 14), p1 = pt(a, R), p2 = pt(b, R);
      return { poly: [C, j1, p1, p2, pt(b - 5, 30 + (k % 2) * 12)].map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(","), m, j: [j1, j2] }; });
    const cracks = A.slice(0, -1).map((a, k) => { const q = [C, pt(a + 6, 22 + (k % 3) * 9), pt(a + 2, 60), pt(a, 120)]; return `<polyline points="${q.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}"/>`; }).join("");
    const fx = document.createElement("div");
    fx.className = "tvfx"; fx.style.setProperty("--sp", SP);
    fx.setAttribute("role", "dialog"); fx.setAttribute("aria-label", "Loading the films");
    fx.innerHTML = `<div class="tv-screen">
        <canvas class="tv-noise" width="160" height="90" aria-hidden="true"></canvas>
        <div class="tv-film" aria-hidden="true">
          <div class="rf-deck">${reel("l")}${reel("r")}<i class="rf-tape-line"></i></div>
          <div class="rf-strip"><div class="rf-track">${[...frames, ...frames].map((src) => `<span class="rf-fr">${src ? `<img src="${esc(src)}" alt="">` : ""}</span>`).join("")}</div><i class="rf-gate"></i></div>
        </div>
        <div class="tv-title"><span class="mono">Now showing</span><b id="tv-w">Welcome to the films.</b><span class="rf-sub">Travel films, trailers and coursework, on one reel.</span>
          <div class="rf-load mono"><span id="rf-msg">Tuning in</span><span id="rf-pct">0%</span><span class="rf-bar"><i id="rf-bar"></i></span></div></div>
        <div class="rf-leader" aria-hidden="true"><i class="rf-sweep"></i><span id="rf-n">3</span></div>
        <div class="tv-vf mono" aria-hidden="true"><i class="vf c1"></i><i class="vf c2"></i><i class="vf c3"></i><i class="vf c4"></i>
          <span class="vf-tl"><i class="rec"></i>REC</span><span class="vf-tr">SDR FILMS · REEL 01</span><span class="vf-bl" id="rf-tc">00:00:00:00</span><span class="vf-br">ISO 800 · 24 FPS · ▮▮▮▯</span></div>
        <svg class="tv-crack" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${cracks}</svg>
        <i class="tv-scan" aria-hidden="true"></i><i class="tv-roll" aria-hidden="true"></i><i class="tv-glitch" aria-hidden="true"></i>
      </div>
      <div class="tv-shards" aria-hidden="true">${shards.map((x) => `<i style="clip-path:polygon(${x.poly});--dx:${(Math.cos(x.m * Math.PI / 180) * 46).toFixed(1)}vw;--dy:${(Math.sin(x.m * Math.PI / 180) * 40 + 18).toFixed(1)}vh;--rot:${((x.m % 2 ? 1 : -1) * (14 + (x.m % 17))).toFixed(0)}deg"></i>`).join("")}</div>
      <div class="rf-flash" aria-hidden="true"></div>
      <button type="button" class="rf-skip mono">Skip intro</button>`;
    document.body.appendChild(fx);
    root.dataset.fx = "hold";
    const timers = []; let raf = 0, nraf = 0;
    const later = (ms, f) => timers.push(setTimeout(f, ms * SP));
    let rendered = false; const show = () => { if (!rendered) { rendered = true; render(); } };
    let done = false;
    const finish = (quick) => {
      if (done) return; done = true;
      timers.forEach(clearTimeout); cancelAnimationFrame(raf); cancelAnimationFrame(nraf); show();
      delete root.dataset.fx; fxIntro = false; fxEnd = null; removeEventListener("keydown", key);
      if (quick) { fx.classList.add("out"); setTimeout(() => fx.remove(), 260); return; }
      fx.classList.add("break"); haptic("shatter");
      setTimeout(() => fx.remove(), 1000);
    };
    const key = (e) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); finish(true); } };
    addEventListener("keydown", key);
    fxEnd = () => finish(true);
    $(".rf-skip", fx).addEventListener("click", () => finish(true));
    $(".rf-skip", fx).focus({ preventScroll: true });
    // static: a small canvas of noise, scaled up
    const cv = $(".tv-noise", fx), cx = cv.getContext("2d"), img = cx.createImageData(160, 90);
    const noise = () => { const d = img.data; for (let i = 0; i < d.length; i += 4) { const v = (Math.random() * 255) | 0; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; } cx.putImageData(img, 0, 0); nraf = requestAnimationFrame(noise); };
    nraf = requestAnimationFrame(noise);
    const glitch = () => { fx.classList.remove("glitch"); void fx.offsetWidth; fx.classList.add("glitch"); };
    // 1. the set switches on into static
    requestAnimationFrame(() => fx.classList.add("on")); haptic("tap");
    later(520, () => { fx.classList.add("vf-on"); glitch(); });
    later(900, glitch);
    // 2. it tunes into the camera: reels turn, film runs through the gate, the title decodes
    const tc = $("#rf-tc", fx), bar = $("#rf-bar", fx), pct = $("#rf-pct", fx), msg = $("#rf-msg", fx);
    const MSG = ["Tuning in", "Threading the reel", "Rolling", "Speed"];
    let t0 = performance.now();
    const tick = (now) => {
      const fr = Math.max(0, Math.floor((now - t0) / 40)); tc.textContent = `00:00:${pad2(Math.floor(fr / 25) % 60)}:${pad2(fr % 25)}`;
      const k = Math.max(0, Math.min(1, (now - t0 - 1150 * SP) / (1700 * SP))), e = 1 - Math.pow(1 - k, 2.2);
      bar.style.width = (e * 100).toFixed(1) + "%"; pct.textContent = Math.round(e * 100) + "%"; msg.textContent = MSG[Math.min(3, Math.floor(e * 3.2))];
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    later(1150, () => { glitch(); fx.classList.add("tuned"); haptic("tick"); decode($("#tv-w", fx), 800 * SP); });
    later(400, show);
    // 3. a hard cut to the leader: 3, 2, 1
    const n = $("#rf-n", fx);
    later(2950, () => { glitch(); fx.classList.add("count"); n.textContent = "3"; haptic("tick"); });
    later(3330, () => { n.textContent = "2"; fx.classList.add("flick"); haptic("tick"); setTimeout(() => fx.classList.remove("flick"), 90); });
    later(3710, () => { n.textContent = "1"; fx.classList.add("flick"); haptic("tick"); setTimeout(() => fx.classList.remove("flick"), 90); });
    // 4. impact: the glass cracks, flares, and falls away to show the page
    later(4060, () => { fx.classList.add("crack"); haptic("heavy"); });
    later(4300, () => finish(false));
  }

  /* ---------- global events ---------- */
  document.addEventListener("click", (e) => {
    const pic = e.target.closest && e.target.closest("img.lb-able");
    if (pic) { const list = $$("img.lb-able", $("#main")); haptic("tap"); lightbox(list, list.indexOf(pic)); return; }
    const t = e.target.closest("button, a");
    if (!t) return;
    if (t.matches("[data-proto]")) {
      const fr = t.closest("[data-figma]"), url = fr.dataset.figma;
      fr.innerHTML = EMBED_OK ? `<iframe src="https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}" title="Live prototype" allowfullscreen loading="lazy"></iframe>`
        : `<div class="proto-cover"><span class="proto-cta"><span>The live prototype loads on the live site. Here, open it in Figma.</span><a class="btn" href="${esc(url)}" target="_blank" rel="noopener">Open in Figma ↗</a></span></div>`;
      haptic("open"); return;
    }
    // Every tap gets a feel that matches what it does (the DVD and the keycaps set their own)
    if (!t.closest(".deck, .tv, .cases") && !t.matches("[data-mail], [data-haptics]")) haptic(t.matches(".nav-films") ? "heavy" : t.matches(".key, .btn, [type=submit], [data-load-disc]") ? "press" : t.matches(".pill, .seg button, [role=tab], [data-facet-tab], [data-view], .mode button, [data-ask-chip], [data-theme-toggle], .acc-i") ? "select" : "tap");
    if (t.matches("[data-mail]")) { copy(t.dataset.mail); return; }
    const mod = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (t.matches("[data-yt]") && !mod) { e.preventDefault(); theatre(t.dataset.yt, t.dataset.title, t.dataset.thumb); return; }
    if (t.matches("[data-insert]") && !mod && !reduced) {
      e.preventDefault();
      const st = t.closest(".films-strip"); if (st.classList.contains("inserting")) return;
      st.classList.add("inserting"); haptic("press");
      setTimeout(() => { const v = $(".fs-vfd", st); if (v) v.textContent = "LOADING"; haptic("tick"); }, 560);
      setTimeout(() => { location.hash = "#films"; }, 1250);
      return;
    }
    if (t.matches("[data-haptics]")) { hapticsOn = !hapticsOn; store.set("haptics", hapticsOn); t.textContent = `Haptics ${hapticsOn ? "on" : "off"}`; t.setAttribute("aria-pressed", String(hapticsOn)); haptic("success"); return; }
    if (t.matches("[data-skip]")) { e.preventDefault(); const m = $("#main"); if (m) { m.setAttribute("tabindex", "-1"); m.focus(); } return; }
    if (t.matches("[data-palette]")) return palette();
    if (t.matches("[data-theme-toggle]")) return toggleTheme();
    if (t.matches("[data-copy]")) return copy(t.dataset.copy);
    if (t.matches("[data-menu]")) {
      const m = document.createElement("div"); m.className = "mobile-menu"; m.setAttribute("data-lenis-prevent", ""); m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); m.setAttribute("aria-label", "Menu");
      m.innerHTML = `<div class="top"><span class="wordmark">${esc(S.owner.name)}</span><button class="icon-btn" type="button" aria-label="Close menu" data-close>${icon.close}</button></div><nav>${[["home", "Home"], ...NAV, ["films", "Films"], ["resume", "Résumé"]].map(([k, l]) => `<a href="#${k}">${l}</a>`).join("")}</nav>`;
      m.addEventListener("click", (ev) => { if (ev.target.closest("a, [data-close]")) m.remove(); });
      document.body.appendChild(m); $("[data-close]", m).focus(); return;
    }
    if (t.matches("[data-facet]")) { A.facet = t.dataset.facet; A.value = t.dataset.value; A.q = ""; store.set("archive", A); if (location.hash === "#archive") { e.preventDefault(); render(); } return; }
    if (t.matches("[data-facet-tab]")) { A.facet = t.dataset.facetTab; A.value = "All"; return archiveRender(); }
    if (t.matches(".pill[data-value]")) { A.value = t.dataset.value; return archiveRender(); }
    if (t.matches("[data-view]")) { A.view = t.dataset.view; return archiveRender(); }
    if (t.matches("[data-ask-chip]")) { const f = t.closest("[data-ask]"); f.q.value = t.dataset.askChip; f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true })); return; }
    if (t.matches("[data-state]")) { const fr = t.closest("[data-states]"); fr.dataset.touched = "1"; showState(fr, +t.dataset.state); return; }
    if (t.matches("[data-jump]")) { e.preventDefault(); const el = document.getElementById("sec-" + t.dataset.jump); if (el) goTo(el); return; }
    if (t.matches(".mode button")) { const m = t.dataset.mode; store.set("mode", m); $("#main").dataset.mode = m; $$(".mode button").forEach((b) => b.setAttribute("aria-pressed", String(b === t))); return; }
    if (t.matches("[data-scroll]")) { const el = document.getElementById(t.dataset.scroll); if (el) el.scrollBy({ left: +t.dataset.dir * el.clientWidth * 0.8, behavior: reduced ? "auto" : "smooth" }); return; }
  });
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-ask]");
    if (!f) return;
    e.preventDefault();
    const q = (f.q.value || "").trim();
    if (!q) { f.q.focus(); return; }
    askQ = q; try { sessionStorage.setItem("ask-q", q); } catch (err) { /* ignore */ }
    const h = "#for-" + askSlug(q);
    if (location.hash === h) render(); else location.hash = h;
  });
  document.addEventListener("input", (e) => { if (e.target.id === "q") { A.q = e.target.value; archiveRender(); } });
  document.addEventListener("change", (e) => { if (e.target.id === "sort") { A.sort = e.target.value; archiveRender(); } });
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented) return; // a dial, a 360° frame or a tab row already used the key
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); if (!$(".palette-bg")) palette(); return; }
    if (typing || $(".palette-bg") || $(".lbox") || $(".theatre")) return;
    if ((e.key === "Enter" || e.key === " ") && document.activeElement && document.activeElement.matches("img.lb-able")) { e.preventDefault(); document.activeElement.click(); return; }
    if (e.key === "/") { e.preventDefault(); palette(); }
    if (!e.metaKey && !e.ctrlKey && !e.altKey && /^[a-z]$/i.test(e.key)) {
      const k = $(`.key[data-key="${e.key.toLowerCase()}"]`);
      if (k) { const r = k.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) { e.preventDefault(); k.classList.add("pressed"); setTimeout(() => k.classList.remove("pressed"), 160); setTimeout(() => k.click(), 90); return; } }
    }
    const r = parse();
    if (r.page === "p" && byId[r.id] && (e.key === "ArrowLeft" || e.key === "ArrowRight")) { const [prev, next] = neighbours(byId[r.id]); location.hash = href(e.key === "ArrowLeft" ? prev : next); }
  });
  let lastPage = parse().page;
  addEventListener("hashchange", () => {
    if (fxEnd) fxEnd();
    const m = $("#app > main"), next = parse().page, prev = lastPage;
    lastPage = next;
    if (reduced || !m) return render();
    if (next === "films" && prev !== "films") return filmIntro();
    if (prev === "films" && next !== "films") { m.classList.add("crt-off"); setTimeout(render, 380); return; }
    m.classList.add("leaving"); setTimeout(render, 240);
  });
  initSmooth();
  if (lastPage === "films" && !reduced) filmIntro(); else render();
})();
