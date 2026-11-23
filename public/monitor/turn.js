const scene = document.querySelector('.monitor-scene');
const stage = document.querySelector('.monitor-stage');
const monitor = document.querySelector('.monitor-poster');
const controls = document.querySelector('#slides');
const hint = document.querySelector('#hint');
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
  const progress = clamp(-scene.getBoundingClientRect().top / Math.max(1, travel));
  target = (reduced.matches || scene.dataset.reduced === "true") ? 1 : progress;
  requestPaint();
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
    controls.hidden = index !== 100;
    hint.hidden = index === 100;
    if (target !== position) requestPaint();
    return;
  }
  monitor.style.transform = "scale(" + (.60 + .49 * proximity + .33 * angle) + ")";
  const image = load(index === 100 && slide ? 'slide-' + slide : index);
  if (image.complete && image.naturalWidth) {
    if (monitor.src !== image.src) monitor.src = image.src;
    const ready = index === 100;
    controls.hidden = !ready;
    hint.hidden = ready;
    monitor.alt = ready ? 'Moriveda storefront on the monitor' : index < 50 ? 'Silver monitor viewed from the rear' : 'Monitor turning toward the viewer';
  }
  const direction = target >= position ? 1 : -1;
  for (let step = 1; step <= 4; step++) load(Math.min(100, Math.max(0, index + direction * step)));
  if (target !== position) requestPaint();
}
controls.querySelectorAll('button').forEach((button, index) => {
  button.onclick = () => {
    slide = (slide + (index ? 1 : 2)) % 3;
    controls.querySelector('output').textContent = (slide + 1) + ' / 3';
    requestPaint();
  };
});
addEventListener('scroll', measure, {passive:true});
addEventListener('resize', measure);
addEventListener('monitorinvalidate', measure);
reduced.addEventListener('change', measure);
measure();
