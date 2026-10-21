/* ==========================================================================
   Subhan Zahid portfolio: behaviour. Content lives in config.js (edit that).
   ========================================================================== */
(() => {
  'use strict';
  const S = window.SITE;
  if (!S) { console.error('config.js failed to load'); return; }

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const fine   = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const isImg = p => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(p || '');

  /* ---------- Bind config → links & text ---------- */
  const hrefs = {
    wa:   `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(S.waMessage)}`,
    mail: `mailto:${S.email}`,
    tel:  `tel:+${S.whatsapp}`,
    ...S.links
  };
  $$('[data-href]').forEach(a => { const h = hrefs[a.dataset.href]; if (h) a.href = h; });
  $$('[data-text]').forEach(el => { if (S[el.dataset.text]) el.textContent = S[el.dataset.text]; });
  $('#availability').textContent = S.availability || '';

  /* ---------- Media helper: video or image with placeholder fallback ---------- */
  const lazyIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const v = e.target; lazyIO.unobserve(v);
      if (v.dataset.src) { v.src = v.dataset.src; v.load?.(); }
    });
  }, { rootMargin: '300px' });

  // Ambient videos (hero, services, about) play only while visible
  const ambientIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
        if (!reduce) v.play().catch(() => {});
      } else v.pause();
    });
  }, { threshold: .2 });

  function buildMedia(path, { poster = '', alt = '', label = 'Add your media here', ambient = false, lazy = true } = {}) {
    const box = document.createElement('div');
    box.className = 'mbox';
    box.innerHTML = `<span class="ph"><b>✳</b><span>${esc(label)}</span>${path ? `<code>${esc(path)}</code>` : ''}</span>`;
    if (!path) return box;

    if (isImg(path)) {
      const img = new Image();
      img.alt = alt; img.loading = 'lazy'; img.decoding = 'async';
      img.onload = () => box.classList.add('ready');
      img.src = path;
      box.prepend(img);
    } else {
      const v = document.createElement('video');
      v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
      v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
      v.preload = lazy ? 'none' : 'metadata';
      v.setAttribute('aria-label', alt);
      if (poster) v.poster = poster;
      v.dataset.src = path;
      v.addEventListener('loadeddata', () => box.classList.add('ready'));
      v.addEventListener('error', () => box.classList.remove('ready'));
      box.prepend(v);
      ambient ? ambientIO.observe(v) : lazyIO.observe(v);
    }
    return box;
  }

  /* ---------- Hero ---------- */
  const heroVis = $('#heroVisual');
  const phone = document.createElement('div'); phone.className = 'phone';
  phone.append(buildMedia(S.hero?.video, { poster: S.hero?.poster, alt: 'Featured ad reel', label: 'Hero reel', ambient: true }));
  heroVis.append(phone);

  const stats = $('#stats');
  S.stats.forEach(s => {
    const d = document.createElement('div'); d.className = 'stat';
    d.innerHTML = `<dt><span data-to="${s.value}">0</span>${esc(s.suffix || '')}</dt><dd>${esc(s.label)}</dd>`;
    stats.append(d);
  });
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, to = +el.dataset.to;
      if (reduce) { el.textContent = to; return; }
      const t0 = performance.now(), dur = 1400;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .6 });
  $$('[data-to]', stats).forEach(el => countIO.observe(el));

  /* ---------- Marquee ---------- */
  const words = ['META ADS', 'AI VIDEO', 'UGC ADS', 'PERFORMANCE CREATIVES', 'REELS ADS'];
  const strip = words.map(w => `<span>${w} ✳</span>`).join('');
  $('#marquee').innerHTML = strip.repeat(4); // two identical halves → seamless -50% loop

  /* ---------- Work grid ---------- */
  const grid = $('#grid');
  const cats = ['All', ...new Set(S.work.map(w => w.category))];
  const filters = $('#filters');
  cats.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = 'filter'; b.type = 'button'; b.textContent = c;
    b.setAttribute('aria-pressed', i === 0);
    b.onclick = () => {
      $$('.filter', filters).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('.card', grid).forEach(card => {
        const show = c === 'All' || card.dataset.cat === c;
        card.classList.toggle('hide', !show);
        if (!show) stopCard(card);
      });
    };
    filters.append(b);
  });

  const playSvg = '<svg aria-hidden="true"><use href="#i-play"/></svg>';
  const expSvg  = '<svg aria-hidden="true"><use href="#i-expand"/></svg>';

  function startCard(card) {
    const v = $('video', card); if (!v) return;
    if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); }
    v.play().then(() => card.classList.add('playing')).catch(() => {});
  }
  function stopCard(card) {
    const v = $('video', card); if (!v) return;
    v.pause(); card.classList.remove('playing');
  }

  S.work.forEach((item, i) => {
    const card = document.createElement('article');
    const ratio = item.ratio || '9/16';
    card.className = 'card reveal' + (ratio === '16/9' ? ' wide' : '');
    card.style.setProperty('--ratio', ratio);
    card.style.setProperty('--d', `${(i % 3) * .08}s`);
    card.dataset.cat = item.category;
    card.innerHTML = `
      <button class="media" type="button" aria-label="Play ${esc(item.title)}"></button>
      <button class="expand" type="button" aria-label="Open ${esc(item.title)} with sound">${expSvg}</button>
      <div class="info"><h3>${esc(item.title)}</h3><p class="result">↗ ${esc(item.result)}</p></div>`;
    const btn = $('.media', card);
    const mb = buildMedia(item.video, { poster: item.poster, alt: item.title, label: `Work ${String(i + 1).padStart(2, '0')}: add your video` });
    $('.ph b', mb).textContent = String(i + 1).padStart(2, '0');
    mb.insertAdjacentHTML('beforeend', `<span class="play">${playSvg}</span><span class="tag">${esc(item.category)}</span>`);
    btn.append(mb);

    if (fine) {
      // Desktop: hover to preview, click to open with sound
      card.addEventListener('mouseenter', () => startCard(card));
      card.addEventListener('mouseleave', () => stopCard(card));
      btn.addEventListener('click', () => openModal(item));
    } else {
      // Touch: tap to play/pause inline (one at a time)
      btn.addEventListener('click', () => {
        if (card.classList.contains('playing')) return stopCard(card);
        $$('.card.playing', grid).forEach(stopCard);
        startCard(card);
      });
    }
    $('.expand', card).addEventListener('click', () => openModal(item));
    grid.append(card);
  });

  /* ---------- Modal player ---------- */
  const modal = $('#modal'), modalBox = $('#modalBox');
  let lastFocus = null;
  function openModal(item) {
    lastFocus = document.activeElement;
    const r = (item.ratio || '9/16').split('/').map(Number);
    modalBox.style.setProperty('--mrr', `${r[0]}/${r[1]}`);
    modalBox.style.setProperty('--mr', r[0] / r[1]);
    modalBox.innerHTML = '';
    if (item.video && !isImg(item.video)) {
      const v = document.createElement('video');
      v.src = item.video; v.controls = true; v.autoplay = true; v.playsInline = true; v.loop = true;
      if (item.poster) v.poster = item.poster;
      v.addEventListener('error', () => { modalBox.innerHTML = `<div class="mbox" style="position:absolute;inset:0"><span class="ph"><b>✳</b><span>Video not found</span><code>${esc(item.video)}</code></span></div>`; });
      modalBox.append(v);
    } else {
      modalBox.append(buildMedia(item.video, { alt: item.title, label: 'Add your video here' }));
    }
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lock');
    $('#modalClose').focus();
  }
  function closeModal() {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lock');
    modalBox.innerHTML = '';
    lastFocus?.focus?.();
  }
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  /* ---------- About ---------- */
  const aboutBox = $('#aboutMedia');
  const aPath = S.about?.video || S.about?.image;
  aboutBox.append(buildMedia(aPath, { alt: 'Portrait of Subhan Zahid', label: 'Add your photo', ambient: !!S.about?.video && !isImg(S.about.video) }));
  $('#skills').innerHTML = S.skills.map(s => `<li>${esc(s)}</li>`).join('');

  /* ---------- Services ---------- */
  const svcGrid = $('#servicesGrid');
  S.services.forEach((s, i) => {
    const el = document.createElement('article');
    el.className = 'svc reveal'; el.tabIndex = 0;
    el.style.setProperty('--d', `${(i % 2) * .1}s`);
    el.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`;
    const m = s.video || s.image;
    if (m) el.prepend(buildMedia(m, { alt: '', ambient: !!s.video && !isImg(s.video) }));
    svcGrid.append(el);
  });

  /* ---------- Process ---------- */
  $('#steps').innerHTML = S.process.map((p, i) =>
    `<li class="step reveal" style="--d:${i * .08}s"><span class="n">${i + 1}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('');

  /* ---------- Reveal on scroll ---------- */
  const revIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(el => revIO.observe(el));

  /* ---------- Navbar: scrolled state + active link ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 12);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  const links = $$('.nav-links a');
  const secIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'about', 'services', 'contact'].forEach(id => { const s = document.getElementById(id); s && secIO.observe(s); });

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('resize', () => { if (innerWidth >= 880) setMenu(false); });

  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modal.classList.contains('open')) closeModal();
    else if (menu.classList.contains('open')) setMenu(false);
  });

  /* ---------- Cursor glow (desktop only) ---------- */
  if (fine && !reduce) {
    const glow = $('#glow');
    let x = 0, y = 0, raf = 0;
    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY; glow.classList.add('on');
      if (!raf) raf = requestAnimationFrame(() => { glow.style.transform = `translate3d(${x}px,${y}px,0)`; raf = 0; });
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  /* ---------- Contact form ---------- */
  const form = $('#form'), status = $('#formStatus');
  const say = (msg, cls = '') => { status.textContent = msg; status.className = 'form-status ' + cls; };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = new FormData(form);
    const name = (f.get('name') || '').toString().trim();
    const email = (f.get('email') || '').toString().trim();
    const message = (f.get('message') || '').toString().trim();
    $$('input,textarea', form).forEach(i => i.classList.remove('invalid'));

    const bad = [];
    if (name.length < 2) bad.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) bad.push('email');
    if (message.length < 10) bad.push('message');
    if (bad.length) {
      bad.forEach(n => form.elements[n].classList.add('invalid'));
      form.elements[bad[0]].focus();
      return say(bad.includes('email') && bad.length === 1 ? 'Please enter a valid email address.' : 'Please fill in your name, a valid email and a message (10+ characters).', 'err');
    }

    if (S.form?.web3formsKey) {
      say('Sending…');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: S.form.web3formsKey, name, email, message, subject: `New enquiry from ${name}` })
        });
        const data = await res.json();
        if (!data.success) throw new Error();
        form.reset(); say('Thanks! Your message was sent. I’ll reply soon.', 'ok');
      } catch { say('Could not send. Please email or WhatsApp me directly.', 'err'); }
    } else {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      location.href = `mailto:${S.email}?subject=${encodeURIComponent('Portfolio enquiry from ' + name)}&body=${encodeURIComponent(body)}`;
      say('Opening your email app…', 'ok');
    }
  });
})();
