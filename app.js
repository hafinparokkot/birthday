/* ════════════════════════════════════════════════════════
   SREE'S BIRTHDAY — Interactive JavaScript
   ════════════════════════════════════════════════════════ */

'use strict';

// ─── CONFIG ───────────────────────────────────────────────
const STAR_MESSAGES = [
  { icon: '💖', label: 'Your Smile', message: 'Your smile is literally the most beautiful thing I have ever seen. It lights up every room, every moment, every memory.' },
  { icon: '✨', label: 'Your Eyes', message: 'Your eyes hold the whole universe in them. Every time I look into them, I find something new to fall in love with.' },
  { icon: '🌸', label: 'Your Laugh', message: 'Your laugh is my favourite sound in the entire world. Nothing compares to hearing you laugh — truly nothing.' },
  { icon: '💫', label: 'Your Heart', message: 'You have the most beautiful, generous, warm heart. You love deeply, and everyone around you is lucky because of it.' },
  { icon: '🌹', label: 'Your Soul', message: 'Your soul is made of starlight and kindness. Being loved by you is the greatest gift life has given me.' },
  { icon: '🦋', label: 'Your Strength', message: 'The way you face everything — with grace, with quiet strength — you inspire me every single day.' },
  { icon: '🌙', label: 'Your Kindness', message: 'Your kindness is effortless and genuine. You make people feel seen, heard, and valued just by being you.' },
  { icon: '⭐', label: 'Your Dreams', message: 'I love watching you dream. The way your eyes light up when you talk about the things you love — pure magic.' },
  { icon: '💝', label: 'Your Love', message: 'Being loved by you is the most extraordinary feeling. You love without conditions, without limits, without hesitation.' },
  { icon: '🌟', label: 'Just You', message: 'All of it. Every single part of who you are. You are the most wonderful person I have ever known. Happy Birthday, Sree.' },
];

// ─── STAR POSITIONS (mobile-friendly %) ──────────────────
const STAR_POSITIONS = [
  { x: 50, y: 15, size: 'large' },
  { x: 20, y: 30, size: 'medium' },
  { x: 78, y: 28, size: 'medium' },
  { x: 35, y: 52, size: 'small' },
  { x: 65, y: 55, size: 'medium' },
  { x: 12, y: 65, size: 'small' },
  { x: 88, y: 60, size: 'small' },
  { x: 50, y: 75, size: 'medium' },
  { x: 25, y: 82, size: 'small' },
  { x: 75, y: 85, size: 'large' },
];

const HEART_EMOJIS = ['💕', '💖', '💗', '💓', '💞', '💝', '❤️', '🌹'];

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStarfield();
  initFloatingHearts();
  initRosePetals();
  initGalaxyStars();
  initGardenScroll();
  initTimelineScroll();
  initLetterBtn();
  initFinaleObserver();
  initMusic();
});

// ════════════════════════════════════════════════════════
// PRELOADER
// ════════════════════════════════════════════════════════
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const minDelay = 2000;
  const startTime = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDelay - elapsed);
    setTimeout(() => preloader.classList.add('hidden'), remaining);
  });

  // Fallback
  setTimeout(() => preloader.classList.add('hidden'), 4000);
}

// ════════════════════════════════════════════════════════
// STARFIELD CANVAS
// ════════════════════════════════════════════════════════
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  let animId;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    buildStars();
  }

  function buildStars() {
    const count = Math.floor((canvas.width * canvas.height) / 3000);
    stars = Array.from({ length: count }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.5 + 0.3,
      speed:Math.random() * 0.3 + 0.05,
      phase:Math.random() * Math.PI * 2,
      color:Math.random() > 0.6 ? '#ffd700' : '#ffb3cc',
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      const alpha = 0.4 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  animId = requestAnimationFrame(draw);
}

// ════════════════════════════════════════════════════════
// FLOATING HEARTS
// ════════════════════════════════════════════════════════
function initFloatingHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

    const x     = Math.random() * 100;
    const dur   = 6 + Math.random() * 8;
    const delay = Math.random() * 3;
    const size  = 0.8 + Math.random() * 1.2;

    heart.style.cssText = `
      left: ${x}%;
      font-size: ${size}rem;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), (dur + delay) * 1000 + 500);
  }

  // Initial burst
  for (let i = 0; i < 8; i++) {
    setTimeout(spawnHeart, i * 300);
  }

  // Ongoing
  setInterval(spawnHeart, 1200);
}

// ════════════════════════════════════════════════════════
// ROSE PETALS
// ════════════════════════════════════════════════════════
function initRosePetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  // Realistic rose petal SVG shapes (multiple organic forms)
  const PETAL_SHAPES = [
    // Teardrop petal
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
      <path d="M20 2 C28 8 38 20 36 36 C34 50 26 58 20 58 C14 58 6 50 4 36 C2 20 12 8 20 2 Z" fill="FILL" opacity="0.88"/>
    </svg>`,
    // Wide petal
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40">
      <path d="M30 2 C44 4 58 12 58 22 C58 32 46 38 30 38 C14 38 2 32 2 22 C2 12 16 4 30 2 Z" fill="FILL" opacity="0.85"/>
    </svg>`,
    // Curved pointed petal
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 56">
      <path d="M18 2 C26 6 36 16 34 30 C32 44 24 54 18 56 C12 54 4 44 2 30 C0 16 10 6 18 2 Z" fill="FILL" opacity="0.82"/>
    </svg>`,
    // Fan petal
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 45">
      <path d="M25 3 C38 3 50 14 48 28 C46 38 36 44 25 44 C14 44 4 38 2 28 C0 14 12 3 25 3 Z" fill="FILL" opacity="0.86"/>
    </svg>`,
    // Slim elongated petal
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 65">
      <path d="M14 2 C20 8 28 22 26 40 C24 55 18 63 14 65 C10 63 4 55 2 40 C0 22 8 8 14 2 Z" fill="FILL" opacity="0.84"/>
    </svg>`,
  ];

  // Rose color palette — deep reds, pinks, blush
  const PETAL_COLORS = [
    '#c0002a',  // deep crimson
    '#d4003a',  // rose red
    '#e8215a',  // bright rose
    '#f24b7a',  // warm pink
    '#ff6b9d',  // light rose
    '#e8607a',  // dusty rose
    '#b5003e',  // dark red
    '#ff8fab',  // blush pink
    '#c9003a',  // medium red
    '#d63060',  // magenta rose
  ];

  const TOTAL_PETALS = 22;

  function createPetal() {
    const wrapper = document.createElement('div');
    wrapper.className = 'rose-petal';

    const shapeIdx = Math.floor(Math.random() * PETAL_SHAPES.length);
    const color    = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    const size     = 18 + Math.random() * 26;   // 18–44px
    const startX   = Math.random() * 110 - 5;   // -5% to 105%
    const duration = 7 + Math.random() * 12;    // 7–19s
    const delay    = Math.random() * duration;   // stagger across one full cycle
    const drift    = (Math.random() - 0.5) * 180; // px horizontal drift
    const spin     = (Math.random() < 0.5 ? 1 : -1) * (180 + Math.random() * 360);
    const sway     = 20 + Math.random() * 50;   // px sideways sway
    const swayDur  = 2 + Math.random() * 3;
    const swayDel  = Math.random() * 2;

    wrapper.innerHTML = PETAL_SHAPES[shapeIdx].replace('FILL', color);

    const svgEl = wrapper.querySelector('svg');
    svgEl.style.width  = `${size}px`;
    svgEl.style.height = 'auto';

    // Inject sway animation inline so each petal has its own timing
    const swayName = `sway_${Math.random().toString(36).slice(2,7)}`;
    const styleEl  = document.createElement('style');
    styleEl.textContent = `
      @keyframes ${swayName} {
        0%,100% { margin-left: 0; }
        25%      { margin-left:  ${sway}px; }
        75%      { margin-left: -${sway * 0.6}px; }
      }
    `;
    document.head.appendChild(styleEl);

    wrapper.style.cssText = `
      left: ${startX}%;
      top:  -80px;
      --drift: ${drift}px;
      --spin:  ${spin}deg;
      animation-name: petal-fall, ${swayName};
      animation-duration: ${duration}s, ${swayDur}s;
      animation-delay: -${delay}s, ${swayDel}s;
      animation-timing-function: linear, ease-in-out;
      animation-iteration-count: infinite, infinite;
    `;

    container.appendChild(wrapper);

    // Clean up style tags periodically (keep memory tidy)
    setTimeout(() => styleEl.remove(), duration * 1000 * 3);
  }

  // Spawn all petals staggered
  for (let i = 0; i < TOTAL_PETALS; i++) {
    setTimeout(createPetal, i * 180);
  }

  // Occasionally add fresh petals to keep density
  setInterval(createPetal, 3500);
}

// ════════════════════════════════════════════════════════
// GALAXY STARS
// ════════════════════════════════════════════════════════
function initGalaxyStars() {
  const container = document.getElementById('galaxy-universe');
  const popup     = document.getElementById('star-popup');
  const popupText = document.getElementById('star-popup-text');
  const closeBtn  = document.getElementById('star-popup-close');

  if (!container || !popup) return;

  // Build twinkling backdrop stars
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? '#ffd700' : '#ffb3cc'};
      border-radius: 50%;
      opacity: ${Math.random() * 0.6 + 0.1};
      animation: star-pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite;
    `;
    container.appendChild(dot);
  }

  // Build interactive stars
  STAR_MESSAGES.forEach((msg, i) => {
    const pos = STAR_POSITIONS[i];
    const btn = document.createElement('button');
    btn.className = `galaxy-star ${pos.size}`;
    btn.setAttribute('aria-label', `Star: ${msg.label}`);
    btn.style.left = `${pos.x}%`;
    btn.style.top  = `${pos.y}%`;
    btn.style.animationDelay = `${i * 0.2}s`;

    btn.innerHTML = `
      <div class="star-glow">${msg.icon}</div>
      <span class="star-label">${msg.label}</span>
    `;

    btn.addEventListener('click', () => {
      popupText.textContent = msg.message;

      // Update popup icon
      const iconEl = popup.querySelector('.star-popup-icon');
      if (iconEl) iconEl.textContent = msg.icon;

      popup.classList.add('visible');
    });

    container.appendChild(btn);
  });

  // Close popup
  if (closeBtn) {
    closeBtn.addEventListener('click', () => popup.classList.remove('visible'));
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') popup.classList.remove('visible');
  });

  // Close on backdrop tap
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('visible');
  });
}

// ════════════════════════════════════════════════════════
// GARDEN SCROLL ANIMATION (Intersection Observer)
// ════════════════════════════════════════════════════════
function initGardenScroll() {
  const cards = document.querySelectorAll('.garden-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = (parseInt(entry.target.dataset.index) || 0) * 150;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
      }
    }),
    { threshold: 0.15 }
  );

  cards.forEach(card => observer.observe(card));
}

// ════════════════════════════════════════════════════════
// TIMELINE SCROLL ANIMATION
// ════════════════════════════════════════════════════════
function initTimelineScroll() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), idx * 200);
      }
    }),
    { threshold: 0.2 }
  );

  items.forEach(item => observer.observe(item));
}

// ════════════════════════════════════════════════════════
// LETTER BUTTON — multi-click shrink & open mechanic
// ════════════════════════════════════════════════════════
const LETTER_STEPS = [
  { size: 200, text: '💌  Open My Letter', hint: 'Tap me...',           progress: '' },
  { size: 160, text: 'Almost there...', hint: 'Keep tapping! 🌹',       progress: "Hmm, it's a little stuck..." },
  { size: 124, text: 'Keep going!',     hint: 'You\'re so close ✨',     progress: 'It\'s slowly opening... 💕' },
  { size: 90,  text: 'One more!',       hint: 'Just a tiny bit more 💖', progress: 'Nearly there, don\'t stop! 🌹' },
  { size: 60,  text: '✨',              hint: '',                         progress: 'Oh! It\'s opening... 💌' },
];

let letterClickCount = 0;
let letterOpened = false;

function initLetterBtn() {
  const btn      = document.getElementById('letter-open-btn');
  const stage    = document.getElementById('letter-btn-stage');
  if (!btn || !stage) return;

  // Set initial size
  applyLetterStep(0);
}

function applyLetterStep(step) {
  const btn      = document.getElementById('letter-open-btn');
  const textEl   = btn ? btn.querySelector('.letter-btn-text') : null;
  const hintEl   = btn ? btn.querySelector('.letter-btn-hint') : null;
  const progress = document.getElementById('letter-btn-progress');
  const glow     = document.getElementById('letter-btn-glow');

  if (!btn) return;
  const s = LETTER_STEPS[step];
  btn.style.setProperty('--btn-size', s.size + 'px');
  if (textEl) textEl.textContent = s.text;
  if (hintEl) hintEl.textContent = s.hint;
  if (progress) progress.textContent = s.progress;
  if (glow) {
    const glowSize = s.size * 2.2;
    glow.style.width  = glowSize + 'px';
    glow.style.height = glowSize + 'px';
  }
}

window.handleLetterClick = function () {
  if (letterOpened) return;

  const btn   = document.getElementById('letter-open-btn');
  const stage = document.getElementById('letter-btn-stage');
  const paper = document.getElementById('letter-paper');
  if (!btn || !stage || !paper) return;

  // Burst particles
  spawnBtnBurst(btn);

  letterClickCount++;

  if (letterClickCount < LETTER_STEPS.length) {
    // Shrink step with shake anim
    btn.classList.remove('shake', 'pop');
    void btn.offsetWidth; // reflow to restart animation
    btn.classList.add(letterClickCount < LETTER_STEPS.length - 1 ? 'shake' : 'pop');

    setTimeout(() => {
      applyLetterStep(letterClickCount);
      btn.classList.remove('shake', 'pop');
    }, 350);

  } else {
    // Final click — burst open!
    letterOpened = true;
    btn.classList.add('final-burst');

    // Mini confetti burst from the button
    spawnLetterConfetti();

    setTimeout(() => {
      stage.style.display = 'none';
      paper.classList.add('visible');
    }, 650);
  }
};

function spawnBtnBurst(btn) {
  const colors = ['#ffd700','#ff6b9d','#fff','#ffb3cc','#e8a838'];
  for (let i = 0; i < 10; i++) {
    const dot = document.createElement('span');
    const angle  = (Math.PI * 2 * i) / 10;
    const radius = 50 + Math.random() * 60;
    const bx = Math.cos(angle) * radius;
    const by = Math.sin(angle) * radius;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size  = 5 + Math.random() * 7;

    dot.className = 'btn-burst-dot';
    dot.style.cssText = `
      left: 50%; top: 50%;
      width: ${size}px; height: ${size}px;
      background: ${color};
      --bx: ${bx}px;
      --by: ${by}px;
    `;
    btn.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  }
}

function spawnLetterConfetti() {
  const heartsEl = document.getElementById('hearts-container');
  if (!heartsEl) return;
  const EMOJIS = ['💌','💕','✨','🌹','💖'];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const extra = document.createElement('div');
      extra.className = 'floating-heart';
      extra.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      extra.style.cssText = `
        left: ${30 + Math.random() * 40}%;
        font-size: ${1.5 + Math.random()}rem;
        animation-duration: ${4 + Math.random() * 3}s;
        animation-delay: 0s;
      `;
      heartsEl.appendChild(extra);
      setTimeout(() => extra.remove(), 7000);
    }, i * 80);
  }
}

// ════════════════════════════════════════════════════════
// FINALE OBSERVER — auto-launch confetti when visible
// ════════════════════════════════════════════════════════
function initFinaleObserver() {
  const finale = document.getElementById('finale');
  if (!finale) return;

  let launched = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !launched) {
        launched = true;
        setTimeout(launchConfetti, 800);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(finale);
}

// ════════════════════════════════════════════════════════
// CONFETTI
// ════════════════════════════════════════════════════════
window.launchConfetti = function () {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const COLORS = ['#ff6b9d','#ffd700','#e8a838','#c9b8e0','#fff9f0','#ff4da6','#ffec6e'];
  const SHAPES = ['circle','rect','triangle'];
  const COUNT  = 160;

  const pieces = Array.from({ length: COUNT }, () => ({
    x:     Math.random() * canvas.width,
    y:     -20 - Math.random() * canvas.height * 0.5,
    size:  4 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    vx:    (Math.random() - 0.5) * 4,
    vy:    2 + Math.random() * 5,
    angle: Math.random() * Math.PI * 2,
    spin:  (Math.random() - 0.5) * 0.2,
    alpha: 1,
  }));

  let frame;

  function drawPiece(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.lineTo(p.size / 2, p.size / 2);
      ctx.lineTo(-p.size / 2, p.size / 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = 0;

    pieces.forEach(p => {
      p.x     += p.vx;
      p.y     += p.vy;
      p.vy    += 0.08;
      p.angle += p.spin;

      if (p.y > canvas.height - 50) {
        p.alpha -= 0.025;
      }

      if (p.alpha > 0) {
        drawPiece(p);
        active++;
      }
    });

    if (active > 0) {
      frame = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  cancelAnimationFrame(frame);
  pieces.forEach(p => { p.alpha = 1; p.y = -20 - Math.random() * 200; });
  animate();
};

// ════════════════════════════════════════════════════════
// MUSIC PLAYER
// ════════════════════════════════════════════════════════
function initMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  audio.volume = 0.35;
}

window.toggleMusic = function () {
  const audio    = document.getElementById('bg-music');
  const bars     = document.getElementById('music-bars');
  const iconPlay = document.getElementById('icon-play');
  const iconPause= document.getElementById('icon-pause');

  if (!audio) return;

  if (audio.paused) {
    audio.play().then(() => {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
      bars.classList.remove('paused');
    }).catch(() => {});
  } else {
    audio.pause();
    iconPlay.classList.remove('hidden');
    iconPause.classList.add('hidden');
    bars.classList.add('paused');
  }
};

// ════════════════════════════════════════════════════════
// SCROLL TO SECTION
// ════════════════════════════════════════════════════════
window.scrollToSection = function (id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ════════════════════════════════════════════════════════
// TOUCH RIPPLE — hero photo tap effect
// ════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  const photoFrame = document.querySelector('.hero-photo-frame');
  if (!photoFrame) return;
  photoFrame.addEventListener('click', spawnPhotoRipple);
  photoFrame.addEventListener('touchend', spawnPhotoRipple, { passive: true });

  function spawnPhotoRipple() {
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('span');
      const angle  = (Math.PI * 2 * i) / 6;
      const radius = 60 + Math.random() * 40;
      dot.style.cssText = `
        position: absolute;
        left: 50%; top: 50%;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: ${Math.random() > 0.5 ? '#ffd700' : '#ff6b9d'};
        pointer-events: none;
        z-index: 10;
        transition: transform 0.8s ease, opacity 0.8s ease;
        opacity: 1;
        transform: translate(-50%, -50%);
      `;
      photoFrame.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transform = `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 800);
    }
  }
});

// ════════════════════════════════════════════════════════
// CAKE CUTTING SEQUENCE
// ════════════════════════════════════════════════════════
let cakeCutDone = false;

window.startCakeCut = function () {
  if (cakeCutDone) return;
  cakeCutDone = true;

  const btnWrap  = document.getElementById('cake-btn-wrap');
  const knife    = document.getElementById('cake-knife-wrap');
  const cutLine  = document.getElementById('cake-cut-line');
  const sparks   = document.getElementById('cake-sparks');
  const cakeLeft = document.getElementById('cake-left');
  const cakeRight= document.getElementById('cake-right');
  const reveal   = document.getElementById('cake-video-reveal');
  const subtext  = document.getElementById('cake-subtext');

  // Step 1 — hide button
  btnWrap.classList.add('hidden-out');

  // Update subtext
  if (subtext) subtext.textContent = 'Watch what happens... 🌟';

  // Step 2 — knife enters (0.3s delay)
  setTimeout(() => {
    knife.classList.add('knife-enter');
  }, 350);

  // Step 3 — show cut line + knife cuts (1s)
  setTimeout(() => {
    cutLine.classList.add('visible');
    knife.classList.remove('knife-enter');
    knife.classList.add('knife-cut');

    // Spawn sparks during the cut
    spawnCakeSparks(sparks);
  }, 900);

  // Step 4 — cake splits apart (2.1s)
  setTimeout(() => {
    cakeLeft.classList.add('split');
    cakeRight.classList.add('split');
    cutLine.style.opacity = '0';

    // Blow out flames
    document.querySelectorAll('.flame').forEach(f => {
      f.style.animation = 'none';
      f.style.opacity   = '0';
    });

    // Burst rose petals from cake center
    burstCakePetals();
  }, 2100);

  // Step 5 — video pops up from inside (2.9s)
  setTimeout(() => {
    reveal.classList.add('pop-up');

    // Check if video file is present; show placeholder if not
    checkVideoFile();

    // Auto scroll to the video
    setTimeout(() => {
      reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);

    // Try to autoplay
    const video = document.getElementById('birthday-video');
    if (video) {
      video.play().catch(() => {
        // autoplay blocked — user will tap play
      });
    }

    if (subtext) subtext.textContent = '🎬 A message just for you, Sree 💕';

    // Extra confetti burst
    setTimeout(launchConfetti, 500);
  }, 2900);
};

// ── Sparks during cutting ──
function spawnCakeSparks(container) {
  if (!container) return;
  const SPARK_COLORS = ['#ffd700','#ff6b9d','#fff','#ffec6e','#ff4da6'];
  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => {
      for (let i = 0; i < 14; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        const angle  = Math.random() * Math.PI * 2;
        const dist   = 20 + Math.random() * 60;
        spark.style.cssText = `
          --sx: ${Math.cos(angle) * dist}px;
          --sy: ${Math.sin(angle) * dist}px;
          background: ${SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]};
          width: ${3 + Math.random() * 5}px;
          height: ${3 + Math.random() * 5}px;
        `;
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 650);
      }
    }, wave * 220);
  }
}

// ── Petal burst from cake ──
function burstCakePetals() {
  const heartsContainer = document.getElementById('hearts-container');
  if (!heartsContainer) return;
  const BURST = ['🌹','🌸','💕','✨','🌺','💖','🌷'];
  for (let i = 0; i < 16; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'floating-heart';
      el.textContent = BURST[Math.floor(Math.random() * BURST.length)];
      el.style.cssText = `
        left: ${20 + Math.random() * 60}%;
        font-size: ${0.9 + Math.random() * 1.4}rem;
        animation-duration: ${4 + Math.random() * 5}s;
        animation-delay: 0s;
      `;
      heartsContainer.appendChild(el);
      setTimeout(() => el.remove(), 9000);
    }, i * 90);
  }
}

// ── Check if video file is available ──
function checkVideoFile() {
  const video       = document.getElementById('birthday-video');
  const placeholder = document.getElementById('video-placeholder');
  if (!video || !placeholder) return;

  // Already loaded (readyState HAVE_ENOUGH_DATA = 4)
  if (video.readyState >= 2) {
    placeholder.classList.add('has-video');
    return;
  }

  // If the video has a valid src and can load, hide placeholder
  video.addEventListener('loadeddata', () => {
    placeholder.classList.add('has-video');
  }, { once: true });

  video.addEventListener('error', () => {
    // Video not found — keep placeholder visible
    placeholder.classList.remove('has-video');
  }, { once: true });

  // Only call load() if not already loading
  if (video.readyState === 0) {
    video.load();
  }
}

