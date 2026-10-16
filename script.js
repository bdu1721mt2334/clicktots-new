/* =====================================================================
   CLICKTOTS - script.js   (plain JavaScript, no libraries)
   1. EDIT YOUR CONTENT   2. helpers   3. build sections   4. effects
   ===================================================================== */

/* ---------- 1. EDIT YOUR CONTENT HERE ---------- */
const SERVICES = [ // [title, text, colour, icon]
  ["Digital Marketing", "Get noticed. Get results.", "#1f5bff", "📣"],
  ["Web Development", "Websites that work for your business.", "#7b4dff", "</>"],
  ["Creative Design", "Designs that make an impact.", "#ff4f6d", "🎨"],
  ["App Development", "Turn ideas into powerful apps.", "#16b981", "📱"],
];
const REVIEWS = [ // [client, text, colour]
  ["Sindhi School", "Clicktot's 15 years of expertise make them a reliable digital marketing partner. They gave us the edge we needed.", "#ff4f6d"],
  ["PeakPoint", "Their mobile app team took our vision and turned it into reality quickly and efficiently. We were most impressed.", "#7b4dff"],
  ["Fresh2day", "Worked with them for website development and design. Very impressed with their work. Highly recommend it.", "#16b981"],
  ["Induce Evolution", "They understood my unique needs and made the digital marketing process easy and cost-effective.", "#ff9d00"],
];
const BLOGS = [ // [tag, date, title, text, colour]
  ["Digital Marketing", "Jan 15, 2025", "What is Inbound and Outbound Marketing", "A modern strategy for the digital age. Learn the key differences.", "#1f5bff"],
  ["Marketing Tips", "Oct 28, 2024", "15 Diwali Marketing Ideas To Drive Sales in 2025", "Light up your brand with winning festive marketing ideas.", "#ff4f6d"],
  ["Content Marketing", "Sep 10, 2024", "7 Content Marketing Skills You Need to Master", "Attract, engage and convert your audience in 2025.", "#16b981"],
];
const MILES = [ // [icon, number, label, colour, graphic]
  ["🏆", 15, "Years of Journey", "#ff9d00", "years"],
  ["🌍", 25, "Countries", "#1f5bff", "pins"],
  ["👥", 600, "Satisfied Clients", "#16b981", "faces"],
  ["📄", 750, "Projects Completed", "#ff4f6d", "bars"],
];
const FOOT_SERVICES = ["Digital Marketing","Website Development","Website Design","Mobile App Development","E-Commerce Web Development","Search Engine Optimization","Pay Per Click","Social Media Marketing","Content Marketing","Video Marketing","Influencer Marketing","Affiliate Marketing","OTT Marketing","Email Marketing","Brand Management","Digital Analytics Tracking"];

/* ---------- 2. helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PLANE = (size, fill = "#1f5bff", wing = "#5b8cff") =>
  `<svg viewBox="0 0 64 64" width="${size}" height="${size}"><path d="M4 30 60 6 44 58 32 40 22 50 20 36z" fill="${fill}"/><path d="M20 36 60 6 32 40z" fill="${wing}"/></svg>`;

function countTo(el, to, ms = 1400) {            // number counting up
  const tok = (el._tok = {}), t0 = performance.now();
  (function step(t) {
    if (el._tok !== tok) return;
    const p = Math.min((t - t0) / ms, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
function restart(el) { const c = el.cloneNode(true); el.replaceWith(c); return c; } // replay CSS animation

/* ---------- 3. build sections from the data above ---------- */
$("#services").innerHTML = SERVICES.map(([t, d, c, i]) =>
  `<article class="svc reveal" style="--c:${c}"><div class="svc-icon">${i}</div><h3>${t}</h3><p>${d}</p><span class="go">→</span><div class="spot"></div></article>`).join("");

$("#reviews").innerHTML = REVIEWS.map(([n, t, c]) =>
  `<div class="review reveal" style="--c:${c}"><div class="q">“</div><h4>${n}</h4><p>${t}</p><div class="stars">${[0,1,2,3,4].map(s => `<span style="--d:${s * 70}ms">★</span>`).join("")}</div></div>`).join("");

const MINI = {
  years: () => `<div class="tl">${[0,1,2,3,4].map(i => `<i style="--i:${i}"></i>`).join("")}</div>`,
  pins: () => `<div class="pins">${[["8%","55%"],["28%","15%"],["50%","60%"],["70%","20%"],["88%","55%"]].map(([x,y],i) => `<i style="--x:${x};--y:${y};--i:${i}"></i>`).join("")}</div>`,
  faces: () => `<div class="faces">${["A","S","R","M","+"].map((t,i) => `<i style="--i:${i};--bg:${["#ff4f6d","#7b4dff","#1f5bff","#ff9d00","#16b981"][i]}">${t}</i>`).join("")}</div>`,
  bars: () => `<div class="bars">${[35,55,45,75,100].map((h,i) => `<i style="--h:${h}%;--i:${i}"></i>`).join("")}</div>`,
};
$("#miles").innerHTML = MILES.map(([ic, n, l, c, k]) =>
  `<div class="mile reveal" style="--c:${c}"><div class="mile-blob"></div><div class="mile-icon">${ic}</div><b><span data-count="${n}">0</span>+</b><small>${l}</small><div class="mini">${MINI[k]()}</div><div class="mile-line"></div></div>`).join("");

$("#footServices").innerHTML = FOOT_SERVICES.map(s => `<li><a href="#services">${s}</a></li>`).join("");

/* ---------- 4. effects ---------- */

/* navbar: shadow on scroll, mobile menu, plane flies out on hover */
addEventListener("scroll", () => $("#navWrap").classList.toggle("scrolled", scrollY > 20));
$("#burger").onclick = () => $("#menu").classList.toggle("open");
$$("#menu a").forEach(a => a.addEventListener("click", () => $("#menu").classList.remove("open")));

/* big plane flight when a button is clicked */
function fly(e) {
  const r = e.currentTarget.getBoundingClientRect();
  const p = document.createElement("div");
  p.className = "plane";
  p.style.left = r.left + r.width / 2 + "px";
  p.style.top = r.top + r.height / 2 + "px";
  p.innerHTML = PLANE(56) + '<span class="trail"></span>';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1700);
}
const talk = $("#talkBtn");
talk.addEventListener("click", fly);
talk.addEventListener("mouseenter", () => {            // small plane flies OUT of the button
  $(".outplane", talk)?.remove();
  const s = document.createElement("span");
  s.className = "outplane";
  s.innerHTML = PLANE(34);
  talk.appendChild(s);
});
$("#exploreBtn").addEventListener("click", e => { fly(e); setTimeout(() => $("#services").scrollIntoView({ behavior: "smooth" }), 1300); });
$("#callBtn").addEventListener("click", fly);

/* hero: parallax + replayable graphics */
const stage = $("#stage");
function parallax(e) {
  const p = e.touches ? e.touches[0] : e, r = stage.getBoundingClientRect();
  const x = (p.clientX - r.left) / r.width - 0.5, y = (p.clientY - r.top) / r.height - 0.5;
  $$("[data-m]", stage).forEach(el => {
    const m = +el.dataset.m;
    el.style.transform = `translate(${x * m}px,${y * m}px)` + (el.dataset.r ? ` rotate(${el.dataset.r}deg)` : "");
  });
}
function parallaxReset() { $$("[data-m]", stage).forEach(el => el.style.transform = el.dataset.r ? `rotate(${el.dataset.r}deg)` : ""); }
stage.addEventListener("mousemove", parallax);
stage.addEventListener("touchmove", parallax, { passive: true });
stage.addEventListener("mouseleave", parallaxReset);

function playTraffic() {
  countTo($("#tNum"), 256);
  const line = $(".draw", $("#trafficCard")); line.classList.remove("draw"); void line.getBoundingClientRect(); line.classList.add("draw");
}
const playAim = () => { const t = restart($(".target", $("#aimCard"))); };
const playSocial = () => countTo($("#sNum"), 180);
$("#trafficCard").addEventListener("mouseenter", playTraffic);
$("#trafficCard").addEventListener("touchstart", playTraffic, { passive: true });
$("#aimCard").addEventListener("mouseenter", playAim);
$("#aimCard").addEventListener("click", playAim);
$("#socialCard").addEventListener("mouseenter", playSocial);
$("#socialCard").addEventListener("touchstart", playSocial, { passive: true });
playTraffic(); playSocial();

/* services: light follows the mouse inside each card */
$$(".svc").forEach(c => c.addEventListener("mousemove", e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", e.clientX - r.left + "px");
  c.style.setProperty("--my", e.clientY - r.top + "px");
}));

/* client success slider (auto + arrows + dots) */
(function () {
  const sec = $("#work"), slides = $$(".slide", sec), n = slides.length, dots = $(".dots", sec);
  let i = 0, paused = false, timer;
  slides.forEach((_, k) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Slide " + (k + 1)); b.onclick = () => go(k); dots.appendChild(b); });
  function bar() { $(".bar", sec)?.remove(); if (!paused) { const b = document.createElement("div"); b.className = "bar"; sec.appendChild(b); } }
  function plan() { clearTimeout(timer); if (!paused) timer = setTimeout(() => go(i + 1), 4200); }
  function show() {
    slides.forEach((s, k) => s.className = "slide" + (k === i ? " show" : k === (i - 1 + n) % n ? " prev" : ""));
    $$("button", dots).forEach((b, k) => b.classList.toggle("on", k === i));
    bar();
  }
  function go(k) { i = (k + n) % n; show(); plan(); }
  $(".arr.l", sec).onclick = () => go(i - 1);
  $(".arr.r", sec).onclick = () => go(i + 1);
  sec.onmouseenter = () => { paused = true; bar(); plan(); };
  sec.onmouseleave = () => { paused = false; bar(); plan(); };
  show(); plan();
})();

/* reviews: 3D tilt on mouse / touch */
$$(".review").forEach(c => {
  const tilt = e => {
    const p = e.touches ? e.touches[0] : e, r = c.getBoundingClientRect();
    const x = (p.clientX - r.left) / r.width - 0.5, y = (p.clientY - r.top) / r.height - 0.5;
    c.style.setProperty("--rx", -y * 16 + "deg"); c.style.setProperty("--ry", x * 16 + "deg");
    c.style.setProperty("--gx", (x + 0.5) * 100 + "%"); c.style.setProperty("--gy", (y + 0.5) * 100 + "%");
  };
  const reset = () => { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); };
  c.addEventListener("mousemove", tilt); c.addEventListener("touchstart", tilt, { passive: true });
  c.addEventListener("touchmove", tilt, { passive: true });
  c.addEventListener("mouseleave", reset); c.addEventListener("touchend", reset);
});

/* blogs: cards on an arc */
(function () {
  const arc = $("#arc"), n = BLOGS.length;
  let a = 0, paused = false, timer;
  const cards = BLOGS.map(([tag, date, t, d, c], k) => {
    const el = document.createElement("article");
    el.className = "blog";
    el.style.setProperty("--c", c);
    el.innerHTML = `<div class="cover"><span>${tag}</span></div><small>📅 ${date} · 5 min read</small><h4>${t}</h4><p>${d}</p><a href="#blogs">Read More →</a>`;
    el.onclick = () => go(k);
    arc.appendChild(el);
    return el;
  });
  function layout() {
    cards.forEach((el, k) => {
      let o = k - a; if (o > n / 2) o -= n; if (o < -n / 2) o += n;
      el.style.setProperty("--o", o);
      el.style.zIndex = 10 - Math.abs(o);
      el.classList.toggle("center", o === 0);
    });
  }
  function plan() { clearTimeout(timer); if (!paused) timer = setTimeout(() => go(a + 1), 4500); }
  function go(k) { a = (k + n) % n; layout(); plan(); }
  $(".arr.l", arc).onclick = () => go(a - 1);
  $(".arr.r", arc).onclick = () => go(a + 1);
  arc.onmouseenter = () => { paused = true; plan(); };
  arc.onmouseleave = () => { paused = false; plan(); };
  layout(); plan();
})();

/* scroll reveal + milestone counters */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting || e.target.classList.contains("in")) return;
  const el = e.target;
  el.classList.add("in");
  setTimeout(() => (el.style.transitionDelay = "0s"), 1500);
  $$("[data-count]", el).forEach(s => countTo(s, +s.dataset.count));
}), { threshold: 0.15 });
$$(".reveal").forEach((el, i) => {
  if (el.closest(".grid4, .services")) el.style.transitionDelay = (i % 4) * 90 + "ms";
  io.observe(el);
});

$("#toTop").onclick = () => scrollTo({ top: 0, behavior: "smooth" });

/* custom cursor: plane + ring + logo-colour tile trail (mouse devices only) */
(function () {
  if (!matchMedia("(pointer: fine)").matches) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const plane = $("#curPlane"), ring = $("#curRing"), ringDot = $(".cur-ring", ring);
  document.body.classList.add("has-cursor");
  const COLORS = ["#ff4f6d", "#16b981", "#1b3f8f", "#ff9d00"]; // logo tile colours
  let x = -100, y = -100, rx = -100, ry = -100, ang = -135, tAng = -135, lastT = 0;
  function tile(px, py, vars = {}) {
    if (calm) return;
    const t = document.createElement("i");
    t.className = "tile";
    t.style.left = px + "px"; t.style.top = py + "px";
    t.style.background = COLORS[Math.floor(Math.random() * 4)];
    for (const k in vars) t.style.setProperty(k, vars[k]);
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 800);
  }
  addEventListener("mousemove", e => {
    const dx = e.clientX - x, dy = e.clientY - y, d = Math.hypot(dx, dy);
    if (d > 4) tAng = Math.atan2(dy, dx) * 180 / Math.PI;
    x = e.clientX; y = e.clientY;
    const now = performance.now();
    if (d > 3 && now - lastT > 45) { lastT = now; tile(x, y); }
    ringDot.classList.toggle("hot", !!e.target.closest("a,button,.svc,.review,.blog,.fcard,.mile,.book,.arr"));
    plane.style.opacity = ring.style.opacity = 1;
  });
  addEventListener("click", e => {
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2;
      tile(e.clientX, e.clientY, { "--dx": Math.cos(a) * 56 + "px", "--dy": Math.sin(a) * 56 + "px" });
    }
  });
  document.addEventListener("mouseleave", () => plane.style.opacity = ring.style.opacity = 0);
  (function loop() {
    rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
    ang += (((tAng - ang + 540) % 360) - 180) * 0.2;
    plane.style.transform = `translate(${x}px,${y}px) rotate(${ang}deg)`;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
  })();
})();
