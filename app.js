(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let motionOff = reduced.matches;
  try { const pref = localStorage.getItem('sv-motion'); if (pref !== null) motionOff = pref === 'off' || reduced.matches; } catch {}
  const motionEvents = new EventTarget();
  function setMotion(value, persist = true) {
    motionOff = value;
    document.documentElement.classList.toggle('motion-off', value);
    $('#motion-toggle').setAttribute('aria-pressed', String(value));
    $('#motion-toggle').setAttribute('aria-label', value ? 'Resume ambient motion' : 'Pause ambient motion');
    $('#motion-toggle').title = value ? 'Resume ambient motion' : 'Pause ambient motion';
    if (persist) try { localStorage.setItem('sv-motion', value ? 'off' : 'on'); } catch {}
    motionEvents.dispatchEvent(new Event('change'));
  }
  $('#motion-toggle').addEventListener('click', () => setMotion(!motionOff));
  reduced.addEventListener('change', e => setMotion(e.matches, false));
  setMotion(motionOff, false);

  function filterProjects(filter) {
    $$('[data-filter]').forEach(button => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    $$('[data-project-card]').forEach(card => {
      card.hidden = filter !== 'all' && !card.dataset.categories.split(' ').includes(filter);
      if (!card.hidden) count++;
    });
    $('#result-count').textContent = `${String(count).padStart(2, '0')} PROJECTS`;
  }
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));

  // A hand-drawn orbital instrument: the selected discipline changes its geometry.
  const orbit = $('#orbit-canvas'), ctx = orbit.getContext('2d');
  let orbitWidth = 0, orbitHeight = 0, yaw = -.45, pitch = .38, spin = 0, mode = 0;
  let orbitVisible = false, orbitFrame = 0, orbitLast = 0, drag = null;
  const lenses = {
    software: ['01', 'SOFTWARE & AI', 'Making complex systems feel usable.', '#work', 'Explore software work'],
    design: ['02', 'PRODUCT & INTERACTION', 'Giving an idea a useful, tangible shape.', '#work', 'Explore design work'],
    film: ['03', 'FILM & STORY', 'Building worlds, one frame at a time.', '#film', 'Explore filmmaking'],
    play: ['04', 'EXPERIMENTS & PLAY', 'Following a question until it becomes something.', '#play', 'Explore side projects']
  };
  let currentLens = 'software';
  function chooseLens(key) {
    currentLens = key;
    const data = lenses[key]; mode = Object.keys(lenses).indexOf(key);
    $('#lens-number').textContent = data[0]; $('#lens-label').textContent = data[1];
    $('#lens-description').textContent = data[2]; $('#lens-link').href = data[3];
    $('#lens-link').setAttribute('aria-label', data[4]);
    $$('[data-lens]').forEach(b => { b.classList.toggle('active', b.dataset.lens === key); b.setAttribute('aria-pressed', String(b.dataset.lens === key)); });
    drawOrbit();
  }
  $$('[data-lens]').forEach((button, index, list) => {
    button.addEventListener('click', () => chooseLens(button.dataset.lens));
    button.addEventListener('keydown', e => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length;
      list[next].focus(); chooseLens(list[next].dataset.lens);
    });
  });
  $('#lens-link').addEventListener('click', () => { if (currentLens === 'software' || currentLens === 'design') filterProjects(currentLens); });
  function projectPoint(x, y, z) {
    const ry = yaw + spin, rx = pitch + mode * .2;
    const x1 = x * Math.cos(ry) + z * Math.sin(ry), z1 = -x * Math.sin(ry) + z * Math.cos(ry);
    const y1 = y * Math.cos(rx) - z1 * Math.sin(rx), z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
    const scale = Math.min(orbitWidth, orbitHeight) * .335, perspective = 3.6 / (3.6 - z2);
    return [orbitWidth / 2 + x1 * scale * perspective, orbitHeight / 2 + y1 * scale * perspective, z2];
  }
  function line3D(points, color, width = 1) {
    ctx.beginPath(); points.forEach((p, i) => { const v = projectPoint(...p); i ? ctx.lineTo(v[0], v[1]) : ctx.moveTo(v[0], v[1]); });
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  }
  function drawOrbit() {
    if (!orbitWidth) return;
    ctx.clearRect(0, 0, orbitWidth, orbitHeight);
    // Longitude and latitude arcs reveal volume without a sci-fi dashboard grid.
    const bands = mode === 2 ? 9 : 15;
    for (let j = 0; j < bands; j++) {
      const a = j / bands * Math.PI, points = [];
      for (let i = 0; i <= 100; i++) {
        const t = i / 100 * Math.PI * 2, squash = mode === 1 ? .72 : 1;
        points.push([Math.cos(t) * Math.cos(a), Math.sin(t) * squash, Math.cos(t) * Math.sin(a)]);
      }
      line3D(points, 'rgba(62,76,62,.19)', .65);
    }
    for (let j = -3; j <= 3; j++) {
      const y = j * .23, radius = Math.sqrt(1 - y * y), points = [];
      for (let i = 0; i <= 100; i++) { const t = i / 100 * Math.PI * 2; points.push([radius * Math.cos(t), y * (mode === 1 ? .72 : 1), radius * Math.sin(t)]); }
      line3D(points, 'rgba(62,76,62,.16)', .65);
    }
    for (let ring = 0; ring < 2; ring++) {
      const points = [], tilt = ring ? .7 + mode * .2 : -.45;
      for (let i = 0; i <= 140; i++) { const t = i / 140 * Math.PI * 2; points.push([Math.cos(t) * 1.3, Math.sin(t) * Math.sin(tilt) * 1.3, Math.sin(t) * Math.cos(tilt) * 1.3]); }
      line3D(points, ring ? 'rgba(86,96,78,.38)' : '#ca4c2f', ring ? .7 : 1.3);
    }
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2 + .35, p = projectPoint(Math.cos(a) * 1.3, Math.sin(a) * -.565, Math.sin(a) * 1.17);
      ctx.beginPath(); ctx.arc(p[0], p[1], mode === i ? 5 : 2.5, 0, Math.PI * 2); ctx.fillStyle = mode === i ? '#d84b2c' : '#717866'; ctx.fill();
      if (mode === i) { ctx.beginPath(); ctx.arc(p[0], p[1], 9, 0, Math.PI * 2); ctx.strokeStyle = '#d84b2c66'; ctx.lineWidth = .7; ctx.stroke(); }
    }
    const center = projectPoint(0, 0, 0); ctx.fillStyle = '#d84b2c'; ctx.fillRect(center[0] - 2, center[1] - 2, 4, 4);
  }
  function orbitTick(time) {
    orbitFrame = 0;
    if (motionOff || !orbitVisible || document.hidden) { orbitLast = 0; return; }
    if (!drag) spin += Math.min(time - (orbitLast || time), 40) * .00009;
    orbitLast = time; drawOrbit(); orbitFrame = requestAnimationFrame(orbitTick);
  }
  function resumeOrbit() { if (!orbitFrame && !motionOff && orbitVisible && !document.hidden) orbitFrame = requestAnimationFrame(orbitTick); }
  new ResizeObserver(() => {
    const rect = orbit.getBoundingClientRect(); orbitWidth = rect.width; orbitHeight = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 2); orbit.width = Math.round(orbitWidth * dpr); orbit.height = Math.round(orbitHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); drawOrbit();
  }).observe(orbit);
  new IntersectionObserver(([e]) => { orbitVisible = e.isIntersecting; resumeOrbit(); }).observe(orbit);
  motionEvents.addEventListener('change', resumeOrbit); document.addEventListener('visibilitychange', resumeOrbit);
  orbit.addEventListener('pointerdown', e => { drag = {x: e.clientX, y: e.clientY}; orbit.setPointerCapture(e.pointerId); });
  orbit.addEventListener('pointermove', e => { if (!drag) return; yaw += (e.clientX - drag.x) * .009; pitch += (e.clientY - drag.y) * .006; drag = {x: e.clientX, y: e.clientY}; drawOrbit(); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(event => orbit.addEventListener(event, () => { drag = null; }));

  // Native dialogs provide focus containment and Escape support.
  const openers = new WeakMap();
  function openDialog(dialog) { openers.set(dialog, document.activeElement); dialog.showModal(); document.body.style.overflow = 'hidden'; }
  function closeDialog(dialog) { dialog.close(); }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => { if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog(dialog); });
    dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.style.overflow = ''; openers.get(dialog)?.focus(); });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(document.getElementById(button.dataset.close))));
  const escapeHTML = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function openProject(key) {
    const project = window.PORTFOLIO_PROJECTS[key]; if (!project) return;
    $('#project-dialog-content').innerHTML = `<article class="project-detail"><p class="eyebrow">${project.category}</p><h2 id="project-dialog-title">${project.title}</h2><p class="detail-deck">${project.deck}</p><div class="detail-stats"><div><span>MY CONTRIBUTION</span>${project.role}</div><div><span>CONTEXT</span>${project.type}</div></div><div class="detail-flow" aria-label="Product flow">${project.flow.map(escapeHTML).join('<b aria-hidden="true">→</b>')}</div><div class="detail-body">${project.sections.map(([title, body]) => `<section><h3>${title}</h3><p>${body}</p></section>`).join('')}</div><p class="detail-stack">${project.stack}</p><p class="detail-status">${project.status}</p><div class="detail-links">${project.links.map(([label, url], i) => `<a class="${i ? 'text-link' : 'button dark-button'}" href="${url}" target="_blank" rel="noopener">${label} <span>↗</span></a>`).join('')}</div></article>`;
    openDialog($('#project-dialog')); $('#project-dialog').scrollTop = 0;
  }
  $$('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project)));
  $('#film-thumbnail').addEventListener('error', e => { if (!e.target.src.includes('hqdefault')) e.target.src = 'https://i.ytimg.com/vi/RJa5eLgjtCw/hqdefault.jpg'; });

  const destinations = [
    ...Object.entries(window.PORTFOLIO_PROJECTS).map(([key, p]) => ({name: p.title, type: 'PROJECT', terms: `${p.category} ${p.stack}`, project: key})),
    {name: 'Vignette — the film', type: 'FILM', href: '#film', terms: 'writing cinematography directing editing'},
    {name: 'Experiments & side quests', type: 'SECTION', href: '#play', terms: 'sand vtol aviation photography tinkering'},
    {name: 'How I build', type: 'SECTION', href: '#process-title', terms: 'process thinking strategy planning'},
    {name: 'Experience & background', type: 'SECTION', href: '#about', terms: 'accelq flixdin education vit'},
    {name: 'Get in touch', type: 'CONTACT', href: '#contact', terms: 'email hire contact'}
  ];
  let indexItems = [], indexCursor = 0;
  function selectIndex(cursor) { indexCursor = cursor; $$('.index-result').forEach((b, i) => b.classList.toggle('active', i === cursor)); }
  function navigateIndex(item) {
    closeDialog($('#index-dialog'));
    // Wait for native close focus restoration before opening another modal.
    requestAnimationFrame(() => { if (item.project) openProject(item.project); else { location.hash = item.href; const target = $(item.href); target?.setAttribute('tabindex', '-1'); target?.focus({preventScroll:true}); } });
  }
  function renderIndex() {
    const query = $('#index-search').value.trim().toLowerCase();
    indexItems = destinations.filter(item => `${item.name} ${item.type} ${item.terms}`.toLowerCase().includes(query));
    $('#index-results').replaceChildren(); indexCursor = 0;
    indexItems.forEach((item, i) => {
      const row = document.createElement('div'); row.setAttribute('role', 'listitem');
      const button = document.createElement('button'); button.className = 'index-result' + (i ? '' : ' active'); button.innerHTML = `<span>${item.name}</span><small>${item.type} ↗</small>`;
      button.addEventListener('click', () => navigateIndex(item)); row.append(button); $('#index-results').append(row);
    });
    if (!indexItems.length) { const p = document.createElement('p'); p.className = 'index-empty'; p.textContent = 'No matches. Try “film”, “AI”, or “contact”.'; $('#index-results').append(p); }
  }
  function openIndex() { if ($('dialog[open]')) return; $('#index-search').value = ''; renderIndex(); openDialog($('#index-dialog')); $('#index-search').focus(); }
  $('#open-index').addEventListener('click', openIndex);
  document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#index-dialog').open ? closeDialog($('#index-dialog')) : openIndex(); } });
  $('#index-search').addEventListener('input', renderIndex);
  $('#index-search').addEventListener('keydown', e => {
    if (!indexItems.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); selectIndex((indexCursor + (e.key === 'ArrowDown' ? 1 : -1) + indexItems.length) % indexItems.length); $$('.index-result')[indexCursor]?.scrollIntoView({block:'nearest'}); }
    if (e.key === 'Enter') { e.preventDefault(); navigateIndex(indexItems[indexCursor]); }
  });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $('#open-index kbd').textContent = 'Ctrl K';

  // Cellular sand: gravity, diagonal fall, and a deliberately small simulation budget.
  const sand = $('#sand-canvas'), sandCtx = sand.getContext('2d');
  const cols = 120, rows = 86, grains = new Uint8Array(cols * rows), colors = ['#e76e42', '#e6e3d4', '#92afb7'];
  let sandColor = 1, sandFrame = 0, sandVisible = false, pouring = null, sandLast = 0, unsettled = 0;
  sand.width = cols * 3; sand.height = rows * 3;
  function renderSand() { sandCtx.clearRect(0, 0, sand.width, sand.height); for (let c = 1; c <= 3; c++) { sandCtx.fillStyle = colors[c - 1]; for (let i = 0; i < grains.length; i++) if (grains[i] === c) sandCtx.fillRect((i % cols) * 3, Math.floor(i / cols) * 3, 3, 3); } }
  function seedSand() {
    grains.fill(0);
    for (let x = 0; x < cols; x++) { const h = Math.max(0, Math.floor(19 - Math.abs(x - 73) * .47)); for (let y = rows - h; y < rows; y++) grains[y * cols + x] = y > rows - h + 5 ? 1 : 2; }
    renderSand();
  }
  function addGrains(x, y, count = 12) {
    $('#sand-instruction').style.opacity = '0';
    for (let i = 0; i < count; i++) { const xx = Math.max(0, Math.min(cols - 1, Math.floor(x + (Math.random() - .5) * 9))), yy = Math.max(0, Math.min(rows - 1, Math.floor(y + (Math.random() - .5) * 7))); if (!grains[yy * cols + xx]) grains[yy * cols + xx] = sandColor; }
    unsettled = 140; startSand(); renderSand();
  }
  function sandTick(time) {
    sandFrame = 0; if (!sandVisible || document.hidden) return;
    if (time - sandLast >= 22) {
      sandLast = time; let changed = false;
      if (pouring) addGrains(pouring.x, pouring.y, 7);
      const leftFirst = Math.random() > .5;
      for (let y = rows - 2; y >= 0; y--) for (let k = 0; k < cols; k++) {
        const x = leftFirst ? k : cols - 1 - k, i = y * cols + x; if (!grains[i]) continue;
        const dir = Math.random() > .5 ? 1 : -1;
        const below = i + cols;
        const next = !grains[below] ? below : (x + dir >= 0 && x + dir < cols && !grains[below + dir]) ? below + dir : (x - dir >= 0 && x - dir < cols && !grains[below - dir]) ? below - dir : -1;
        if (next >= 0) { grains[next] = grains[i]; grains[i] = 0; changed = true; }
      }
      renderSand(); unsettled = changed || pouring ? 140 : unsettled - 1;
    }
    if ((unsettled > 0 || pouring) && !sandFrame) sandFrame = requestAnimationFrame(sandTick);
  }
  function startSand() { if (!sandFrame && sandVisible && !document.hidden && (unsettled > 0 || pouring)) sandFrame = requestAnimationFrame(sandTick); }
  function sandPoint(e) { const r = sand.getBoundingClientRect(); return {x:(e.clientX - r.left) / r.width * cols, y:(e.clientY - r.top) / r.height * rows}; }
  sand.addEventListener('pointerdown', e => { pouring = sandPoint(e); sand.setPointerCapture(e.pointerId); addGrains(pouring.x, pouring.y); });
  sand.addEventListener('pointermove', e => { if (pouring) pouring = sandPoint(e); });
  ['pointerup','pointercancel','lostpointercapture'].forEach(event => sand.addEventListener(event, () => { pouring = null; }));
  $$('[data-sand-color]').forEach(button => button.addEventListener('click', () => { sandColor = +button.dataset.sandColor + 1; $$('[data-sand-color]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); }); }));
  $('#drop-sand').addEventListener('click', () => addGrains(34 + Math.random() * 48, 8, 150));
  $('#clear-sand').addEventListener('click', () => { grains.fill(0); unsettled = 0; pouring = null; $('#sand-instruction').style.opacity = '1'; renderSand(); });
  new IntersectionObserver(([e]) => { sandVisible = e.isIntersecting; startSand(); }).observe(sand);
  document.addEventListener('visibilitychange', startSand); seedSand();

  let toastTimer;
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3500); }
  $('#copy-email').addEventListener('click', async () => { try { await navigator.clipboard.writeText('sannithvanamala@gmail.com'); toast('Email copied. Say hello anytime.'); } catch { toast('sannithvanamala@gmail.com — select the address to copy.'); } });
  const sections = $$('section[id]').filter(s => ['work','film','play','about'].includes(s.id));
  const visibleSections = new Map();
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => visibleSections.set(e.target.id, e.isIntersecting));
    const active = sections.find(s => visibleSections.get(s.id))?.id;
    $$('[data-nav]').forEach(a => { a.classList.toggle('active', a.dataset.nav === active); if (a.dataset.nav === active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
  }, {rootMargin:'-15% 0px -55% 0px'});
  sections.forEach(s => navObserver.observe(s));
})();
