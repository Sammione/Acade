import './style.css'

// --- Global Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRevealAnimations();
    initTiltEffect();
    initNavbar();

    // Page-specific initializations
    if (document.getElementById('quiz-container')) initQuiz();
    if (document.getElementById('testimonial-slider')) initTestimonials();
    if (document.getElementById('run-code')) initPlayground();
    if (document.querySelector('.dropdown-trigger')) initDropdowns();
});

// --- Theme Management ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    let isDark = true;
    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '🌓' : '☀️';
    });
}

// --- Navbar Effects ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--glass)';
            navbar.style.backdropFilter = 'blur(16px)';
            navbar.style.height = '75px';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.height = '85px';
            navbar.style.boxShadow = 'none';
        }
    });
}

// --- Reveal Animations ---
function initRevealAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// --- 3D Tilt Effect ---
function initTiltEffect() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
}

// --- Quiz Logic ---
function initQuiz() {
    const quizStep1 = document.querySelector('[data-step="1"]');
    const quizStep2 = document.querySelector('[data-step="2"]');
    const quizResult = document.getElementById('quiz-result');
    const recommendedCourse = document.getElementById('recommended-course');
    const recommendedDesc = document.getElementById('recommended-desc');

    let userChoices = {};

    document.querySelectorAll('.quiz-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            const step = opt.closest('.quiz-step');
            const nextStep = step.dataset.step === '1' ? '2' : 'result';

            userChoices[step.dataset.step] = opt.dataset.val;
            step.classList.remove('active');

            if (nextStep === '2') {
                quizStep2.classList.add('active');
            } else {
                quizResult.style.display = 'block';
                if (userChoices['2'] === 'ds') {
                    recommendedCourse.textContent = 'Data Science Path';
                    recommendedDesc.textContent = 'Master high-performance analytics and visualization.';
                } else {
                    recommendedCourse.textContent = 'AI Engineering';
                    recommendedDesc.textContent = 'Build the next generation of LLMs and Diffusion models.';
                }
            }
        });
    });

    document.getElementById('reset-quiz')?.addEventListener('click', () => {
        quizResult.style.display = 'none';
        quizStep2.classList.remove('active');
        quizStep1.classList.add('active');
        userChoices = {};
    });
}

// --- Playground Logic ---
function initPlayground() {
    const runBtn = document.getElementById('run-code');
    const consoleOutput = document.getElementById('console-output');

    runBtn?.addEventListener('click', () => {
        runBtn.textContent = '⌛ Processing...';
        consoleOutput.textContent = '> Initializing environment...';

        setTimeout(() => {
            consoleOutput.innerHTML = `
                > Load intelligence v2.1... [OK]<br>
                > Training NeuraCore... 100%<br>
                > [INFO] Prediction Confidence: 99.8%<br>
                > Status: Success
            `;
            runBtn.textContent = '▶ Run Script';
        }, 1200);
    });
}

// --- Testimonials Slider ---
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length === 0) return;

    let activeIndex = 0;
    setInterval(() => {
        testimonials[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % testimonials.length;
        testimonials[activeIndex].classList.add('active');
    }, 5000);
}

// --- Course Dropdowns ---
function initDropdowns() {
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const isActive = content.classList.contains('active');

            // Close others (optional, comment out if you want multiple open)
            document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.dropdown-trigger').forEach(t => t.textContent = 'See Full Curriculum ↓');

            if (!isActive) {
                content.classList.add('active');
                trigger.textContent = 'Hide Details ↑';
            }
        });
    });
}

console.log('✨ Acadence Core System Initialized Across All Modules');
