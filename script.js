(() => {
  'use strict';

  /* ---------- Countdown ---------- */
  // Change this date to your real launch date.
  const LAUNCH = new Date(Date.now() + (82 * 86400 + 5 * 3600 + 55 * 60) * 1000);
  let stored = null;
  try { stored = localStorage.getItem('sityondev-launch'); } catch (e) {}
  const target = stored ? new Date(stored) : LAUNCH;
  try { if (!stored) localStorage.setItem('sityondev-launch', target.toISOString()); } catch (e) {}

  const els = {};
  document.querySelectorAll('[data-unit]').forEach(el => els[el.dataset.unit] = el);
  const pad = n => String(n).padStart(2, '0');

  function tick() {
    let diff = Math.max(0, target - Date.now());
    const v = {
      days: Math.floor(diff / 864e5),
      hours: Math.floor(diff % 864e5 / 36e5),
      minutes: Math.floor(diff % 36e5 / 6e4),
      seconds: Math.floor(diff % 6e4 / 1e3)
    };
    for (const k in v) {
      const text = pad(v[k]);
      if (els[k].textContent !== text) {
        els[k].textContent = text;
        els[k].classList.remove('tick'); void els[k].offsetWidth; els[k].classList.add('tick');
      }
    }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Typed code window ---------- */
  const lines = [
    '<span class="k">const</span> sityondev = {',
    '  status: <span class="s">\'coming soon\'</span>,',
    '  craft: <span class="s">\'web development\'</span>,',
    '  stack: [<span class="s">\'Next.js\'</span>, <span class="s">\'React\'</span>, <span class="s">\'Tailwind\'</span>],',
    '  performance: <span class="n">100</span>,',
    '  responsive: <span class="k">true</span>,',
    '}',
    '',
    '<span class="c">// launching your next big idea</span>',
    '<span class="k">await</span> sityondev.<span class="f">launch</span>()'
  ];
  const code = document.getElementById('code');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const render = n => {
    code.innerHTML = lines.slice(0, n)
      .map((l, i) => `<span class="ln">${i + 1}</span>${l}`).join('\n');
  };
  if (reduce) render(lines.length);
  else {
    let i = 0;
    const step = () => { render(++i); if (i < lines.length) setTimeout(step, 260); };
    setTimeout(step, 700);
  }

  /* ---------- Cursor spotlight ---------- */
  const root = document.documentElement;
  addEventListener('pointermove', e => {
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });

  /* ---------- 3D tilt on editor ---------- */
  const editor = document.getElementById('editor');
  if (!reduce && matchMedia('(hover:hover)').matches) {
    editor.addEventListener('pointermove', e => {
      const r = editor.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      editor.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    });
    editor.addEventListener('pointerleave', () => editor.style.transform = '');
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
