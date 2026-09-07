// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

function applyTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        html.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }
}

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved) applyTheme(saved);
else if (prefersDark) { applyTheme('dark');
    localStorage.setItem('theme', 'dark'); }

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// ============================================
// ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActive() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}
window.addEventListener('scroll', updateActive);

// ============================================
// TYPING EFFECT
// ============================================
const typedText = document.getElementById('typedText');
const phrases = [
    'Apprenant Data & IA 🤖',
    'Développeur Full Stack 💻',
    'Passionné par l\'innovation 🚀',
    'Créateur de solutions intelligentes 💡'
];
let phraseIndex = 0,
    charIndex = 0,
    isDeleting = false;

function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 800);
            return;
        }
        setTimeout(type, 40);
    } else {
        typedText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(type, 1800);
            return;
        }
        setTimeout(type, 80);
    }
}
type();

// ============================================
// SCROLL TOP
// ============================================
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// CONTACT FORM
// ============================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

    fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            btn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
            setTimeout(() => { btn.innerHTML = orig; }, 2000);
            this.reset();
        } else {
            throw new Error('Erreur');
        }
    })
    .catch(() => {
        btn.innerHTML = '<i class="fas fa-times"></i> Erreur !';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
    });
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// MODALE VIDÉO (démo projets)
// ============================================
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoModalClose = document.getElementById('videoModalClose');

function openVideoModal(src) {
    modalVideo.setAttribute('src', src);
    videoModal.classList.add('open');
    modalVideo.play();
}

function closeVideoModal() {
    videoModal.classList.remove('open');
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
}

document.querySelectorAll('.video-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openVideoModal(link.dataset.video);
    });
});

videoModalClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
});

console.log('🚀 Portfolio de Johan Kouassi chargé avec succès !');