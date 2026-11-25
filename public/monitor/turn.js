const scene = document.querySelector('.monitor-scene');
const stage = document.querySelector('.monitor-stage');
const monitor = document.querySelector('.monitor-poster');
const hint = document.querySelector('#hint');
const overlay = document.querySelector('#screen-mouse-layer');
const cursorEl = overlay?.querySelector('.monitor-cursor');
const rippleEl = overlay?.querySelector('.monitor-click-ripple');
const sheenEl = overlay?.querySelector('.monitor-screen-sheen');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = value => Math.min(1, Math.max(0, value));
let target = 0, position = 0, frameRequest = 0, slide = 0;
const frames = new Map();
function load(key) {
  if (!frames.has(key)) {
    const image = new Image();
    image.onload = requestPaint;
    image.src = new URL('turn/', monitor.src.split('/turn/')[0] + '/').href + key + '.webp';
    frames.set(key, image);
  }
  return frames.get(key);
}
function requestPaint() {
  if (!frameRequest) frameRequest = requestAnimationFrame(paint);
}
function measure(event) {
  if (event?.type === "resize" || event?.type === "monitorinvalidate") lastPose = "";
  const travel = scene.offsetHeight - document.querySelector('.monitor-sticky').offsetHeight;
  const lead = window.innerHeight * 0.72;
  const progress = clamp((lead - scene.getBoundingClientRect().top) / Math.max(1, travel + lead));
  target = (reduced.matches || scene.dataset.reduced === "true") ? 1 : progress;
  requestPaint();
}

// Ultra-realistic autonomous macOS cursor choreography on the 3D monitor screen
const NEXT_BTN = { x: 10.8, y: 55.5 };
const BROWSE_SPOTS = [
  { x: 64, y: 44 },
  { x: 52, y: 40 },
  { x: 68, y: 48 },
];
let demoActive = false;
let demoRaf = 0;
let demoTimer = 0;
let curX = 72;
let curY = 68;

function placeCursor(xPct, yPct) {
  curX = xPct;
  curY = yPct;
  if (!cursorEl || !overlay) return;
  const w = overlay.clientWidth || 1;
  const h = overlay.clientHeight || 1;
  cursorEl.style.transform = `translate3d(${(xPct / 100 * w).toFixed(1)}px, ${(yPct / 100 * h).toFixed(1)}px, 0)`;
}

function triggerClickEffects(xPct, yPct) {
  if (rippleEl) {
    rippleEl.style.left = xPct + '%';
    rippleEl.style.top = yPct + '%';
    rippleEl.classList.remove('is-pulsing');
    void rippleEl.offsetWidth;
    rippleEl.classList.add('is-pulsing');
  }
  if (sheenEl) {
    sheenEl.classList.remove('is-sweeping');
    void sheenEl.offsetWidth;
    sheenEl.classList.add('is-sweeping');
  }
}

function advanceSlide(xPct, yPct) {
  triggerClickEffects(xPct, yPct);
  slide = (slide + 1) % 3;
  requestPaint();
}

function glideCursor(toX, toY, duration, arcBias, onDone) {
  cancelAnimationFrame(demoRaf);
  const fromX = curX;
  const fromY = curY;
  const ctrlX = (fromX + toX) * 0.5 + arcBias;
  const ctrlY = (fromY + toY) * 0.5 - Math.abs(arcBias) * 0.45;
  const start = performance.now();

  function step(now) {
    if (!demoActive) return;
    const raw = clamp((now - start) / duration);
    // Natural human cubic ease-in-out
    const t = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
    const inv = 1 - t;
    const x = inv * inv * fromX + 2 * inv * t * ctrlX + t * t * toX;
    const y = inv * inv * fromY + 2 * inv * t * ctrlY + t * t * toY;
    placeCursor(x, y);

    if (cursorEl) {
      const distToBtn = Math.hypot(x - NEXT_BTN.x, y - NEXT_BTN.y);
      cursorEl.dataset.shape = distToBtn < 6.5 ? 'hand' : 'arrow';
    }

    if (raw < 1) {
      demoRaf = requestAnimationFrame(step);
    } else if (onDone) {
      onDone();
    }
  }
  demoRaf = requestAnimationFrame(step);
}

function runNextCycle() {
  if (!demoActive) return;
  // Glide gracefully to the Moriveda hero '>' carousel arrow
  glideCursor(NEXT_BTN.x, NEXT_BTN.y, 1150, -6, () => {
    if (!demoActive) return;
    if (cursorEl) cursorEl.dataset.shape = 'hand';
    demoTimer = setTimeout(() => {
      if (!demoActive) return;
      if (cursorEl) cursorEl.dataset.clicking = 'true';
      advanceSlide(NEXT_BTN.x, NEXT_BTN.y);
      demoTimer = setTimeout(() => {
        if (!demoActive) return;
        if (cursorEl) cursorEl.dataset.clicking = 'false';
        const spot = BROWSE_SPOTS[slide % BROWSE_SPOTS.length];
        demoTimer = setTimeout(() => {
          if (!demoActive) return;
          glideCursor(spot.x, spot.y, 1250, 7, () => {
            if (!demoActive) return;
            demoTimer = setTimeout(runNextCycle, 2300);
          });
        }, 220);
      }, 170);
    }, 240);
  });
}

function setScreenDemo(active) {
  if (!overlay) return;
  if (active === demoActive) return;
  demoActive = active;
  overlay.classList.toggle('is-live', active);
  cancelAnimationFrame(demoRaf);
  clearTimeout(demoTimer);
  if (cursorEl) {
    cursorEl.dataset.clicking = 'false';
    cursorEl.dataset.shape = 'arrow';
  }
  if (active && !(reduced.matches || scene.dataset.reduced === "true")) {
    placeCursor(72, 68);
    demoTimer = setTimeout(runNextCycle, 650);
  }
}

if (overlay) {
  const onManualSwitch = (e) => {
    if (!demoActive) return;
    const rect = overlay.getBoundingClientRect();
    const xPct = e.clientX ? clamp((e.clientX - rect.left) / Math.max(1, rect.width)) * 100 : NEXT_BTN.x;
    const yPct = e.clientY ? clamp((e.clientY - rect.top) / Math.max(1, rect.height)) * 100 : NEXT_BTN.y;
    cancelAnimationFrame(demoRaf);
    clearTimeout(demoTimer);
    placeCursor(xPct, yPct);
    if (cursorEl) {
      cursorEl.dataset.shape = 'hand';
      cursorEl.dataset.clicking = 'true';
    }
    advanceSlide(xPct, yPct);
    demoTimer = setTimeout(() => {
      if (cursorEl) cursorEl.dataset.clicking = 'false';
      if (demoActive && !(reduced.matches || scene.dataset.reduced === "true")) {
        demoTimer = setTimeout(runNextCycle, 2600);
      }
    }, 170);
  };
  overlay.addEventListener('click', onManualSwitch);
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onManualSwitch(e);
    }
  });
}

let drawMonitor;
let ready = false;
window.buildMonitor().then(draw => {
  draw(0, 0, 1); // Warm the rear view before revealing the stage.
  drawMonitor = draw;
  ready = true;
  requestPaint();
}).catch(() => {
  const heading = document.querySelector('.monitor-heading');
  const footer = document.querySelector('.monitor-caption');
  function frameFallback() {
    const bounds = stage.getBoundingClientRect();
    const top = heading.getBoundingClientRect().bottom - bounds.top + 10;
    const height = Math.max(1, footer.getBoundingClientRect().top - bounds.top - top - 10);
    monitor.style.top = '0';
    monitor.style.height = '100%';
    stage.style.setProperty('--screen-y', (top + height * .43) + 'px');
  }
  frameFallback();
  const observer = new ResizeObserver(frameFallback);
  [stage, heading, footer].forEach(element => observer.observe(element));
  ready = true;
  requestPaint();
});
let lastTime = 0;
let lastPose = '';
function paint(now) {
  frameRequest = 0;
  if (!ready) return;
  const elapsed = Math.min(40, lastTime ? now - lastTime : 16);
  lastTime = now;
  position += (target - position) * (1 - Math.exp(-elapsed / 135));
  if ((reduced.matches || scene.dataset.reduced === "true") || Math.abs(target - position) < .0004) position = target;
  const smooth = x => x * x * (3 - 2 * x);
  const entrance = smooth(clamp(position / .115));
  const proximity = 1 - smooth(clamp((position - .025) / .39));
  stage.style.opacity = entrance;
  scene.style.setProperty('--copy-opacity', smooth(clamp((position - .32) / .16)));
  const message = entrance < 1 ? 'Scroll to reveal ↓' : 'Scroll to turn ↓';
  if (hint.textContent !== message) hint.textContent = message;
  const angle = smooth(clamp((position - .42) / .48));
  const index = Math.round(angle * 100);
  if (drawMonitor) {
    const pose = angle + '/' + proximity + '/' + slide;
    if (pose !== lastPose) {
      drawMonitor(angle, slide, proximity);
      lastPose = pose;
    }
    monitor.style.opacity = '0';
    hint.hidden = index === 100;
    setScreenDemo(index === 100);
    if (target !== position) requestPaint();
    return;
  }
  monitor.style.transform = "scale(" + (.60 + .49 * proximity + .33 * angle) + ")";
  const image = load(index === 100 && slide ? 'slide-' + slide : index);
  if (image.complete && image.naturalWidth) {
    if (monitor.src !== image.src) monitor.src = image.src;
    const isFront = index === 100;
    hint.hidden = isFront;
    setScreenDemo(isFront);
    monitor.alt = isFront ? 'Moriveda storefront on the monitor' : index < 50 ? 'Silver monitor viewed from the rear' : 'Monitor turning toward the viewer';
  }
  const direction = target >= position ? 1 : -1;
  for (let step = 1; step <= 4; step++) load(Math.min(100, Math.max(0, index + direction * step)));
  if (target !== position) requestPaint();
}
addEventListener('scroll', measure, {passive:true});
addEventListener('resize', () => { measure(); if (demoActive) placeCursor(curX, curY); });
addEventListener('monitorinvalidate', measure);
reduced.addEventListener('change', measure);
measure();
