// ===== GitHub Pages gate — hide backend-only features on serrafins.com =====
const isGitHubPages = ['serrafins.com', 'www.serrafins.com'].includes(
  window.location.hostname.toLowerCase()
);
if (isGitHubPages) {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-requires-backend]').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('[data-github-pages-only]').forEach(el => {
      el.style.display = '';
    });
  });
}

// ===== Theme Switcher =====
const themeSwitcher = document.querySelector('.theme-switcher');
const themeInputs = document.querySelectorAll('.theme-switcher__input');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('site-theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);

if (themeInputs.length > 0) {
  const savedThemeInput = themeSwitcher?.querySelector(`input[value="${savedTheme}"]`);
  if (savedThemeInput) {
    savedThemeInput.checked = true;
    themeSwitcher?.setAttribute('c-previous', savedThemeInput.getAttribute('c-option'));
  }

  themeInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      if (!e.target.checked) {
        return;
      }

      const newTheme = e.target.value;
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('site-theme', newTheme);

      themeSwitcher?.setAttribute('c-previous', e.target.getAttribute('c-option'));
    });
  });
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  const normalizePath = (path) => {
    const normalized = (path || '/').toLowerCase();
    if (normalized.length > 1 && normalized.endsWith('/')) {
      return normalized.slice(0, -1);
    }
    return normalized;
  };

  const currentPath = normalizePath(window.location.pathname);
  mainNav.querySelectorAll('a').forEach((link) => {
    const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
    if (linkPath === currentPath) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  navToggle.addEventListener('click', () => {
    const nextExpanded = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(nextExpanded));
    mainNav.classList.toggle('is-open', nextExpanded);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    }
  });
}

const canvas = document.getElementById("liquid-canvas");
const ctx = canvas?.getContext("2d");

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const drops = Array.from({ length: 18 }, () => ({
  x: Math.random(),
  y: Math.random(),
  r: Math.random() * 120 + 40,
  dx: (Math.random() - 0.5) * 0.0009,
  dy: (Math.random() - 0.5) * 0.0009,
}));

function draw() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const b of drops) {
    b.x += b.dx;
    b.y += b.dy;

    if (b.x < -0.2 || b.x > 1.2) b.dx *= -1;
    if (b.y < -0.2 || b.y > 1.2) b.dy *= -1;

    const x = b.x * canvas.width;
    const y = b.y * canvas.height;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
    grad.addColorStop(0, "rgba(149, 214, 255, 0.22)");
    grad.addColorStop(1, "rgba(149, 214, 255, 0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();

// Modal functions for projects
function openProjectsModal() {
  document.getElementById("projectsModal").style.display = "block";
}

function closeProjectsModal() {
  document.getElementById("projectsModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("projectsModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const tiltCards = document.querySelectorAll(".tilt-card");

for (const card of tiltCards) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-y * 8).toFixed(2);
    const ry = (x * 8).toFixed(2);
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
}

const revealTargets = document.querySelectorAll('.hero, .experience-section');

if (revealTargets.length > 0) {
  revealTargets.forEach((element) => element.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  }
}

const scrollRevealTargets = document.querySelectorAll('[data-scroll-reveal]');

if (scrollRevealTargets.length > 0) {
  if ('IntersectionObserver' in window) {
    const swipeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    scrollRevealTargets.forEach((element) => swipeObserver.observe(element));
  } else {
    scrollRevealTargets.forEach((element) => element.classList.add('is-visible'));
  }
}

const desktopVideoSection = document.querySelector('[data-desktop-video]');
const dashboardVideo = document.getElementById('dashboardVideo');
const dashboardVideoCanvas = document.getElementById('dashboardVideoCanvas');
const dashboardVideoContext = dashboardVideoCanvas?.getContext('2d', { willReadFrequently: true });

function setDashboardVideoVisibility() {
  if (!desktopVideoSection || !dashboardVideo || !dashboardVideoCanvas) {
    return;
  }

  desktopVideoSection.classList.add('is-active');
  dashboardVideo.play().catch(() => {});
}

if (desktopVideoSection && dashboardVideo && dashboardVideoCanvas && dashboardVideoContext) {
  let hasLoggedDashboardVideoError = false;

  function resizeDashboardVideoCanvas() {
    const videoWidth = dashboardVideo.videoWidth || 1280;
    const videoHeight = dashboardVideo.videoHeight || 720;

    dashboardVideoCanvas.width = videoWidth;
    dashboardVideoCanvas.height = videoHeight;
  }

  function processDashboardVideoFrame() {
    if (dashboardVideo.paused || dashboardVideo.ended) {
      requestAnimationFrame(processDashboardVideoFrame);
      return;
    }

    dashboardVideoContext.drawImage(dashboardVideo, 0, 0, dashboardVideoCanvas.width, dashboardVideoCanvas.height);

    try {
      const frameData = dashboardVideoContext.getImageData(0, 0, dashboardVideoCanvas.width, dashboardVideoCanvas.height);
      const pixels = frameData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i + 0];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        if (green > 140 && green > red + 30 && green > blue + 30) {
          pixels[i + 3] = 0;
        }
      }

      dashboardVideoContext.putImageData(frameData, 0, 0);
    } catch (error) {
      if (!hasLoggedDashboardVideoError) {
        console.error('Dashboard video canvas tainted or unavailable.', error);
        hasLoggedDashboardVideoError = true;
        dashboardVideo.pause();
      }
    }

    requestAnimationFrame(processDashboardVideoFrame);
  }

  dashboardVideo.addEventListener('loadedmetadata', () => {
    resizeDashboardVideoCanvas();
  });

  dashboardVideo.addEventListener('play', () => {
    resizeDashboardVideoCanvas();
    requestAnimationFrame(processDashboardVideoFrame);
  });

  resizeDashboardVideoCanvas();
  setDashboardVideoVisibility();
}
