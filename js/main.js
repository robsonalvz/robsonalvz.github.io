/* ============================================
   ROBSON ALVES — Terminal AI Portfolio
   Vanilla JS. Zero dependencies.
   Installing dependencies... just kidding.
   ============================================ */

(function () {
    'use strict';

    // --- Typing Effect ---
    const typingTarget = document.getElementById('typingTarget');
    const phrases = [
        'AI-First Engineer. Building commerce platforms at GoDaddy.',
        'Founder of TalkLikeADev. Multi-agent AI, voice streaming, MCP servers.',
        'From ML chatbots to multi-agent orchestration at scale.',
        'Java, Python, TypeScript. Shipping AI products, not just features.',
        'Building with LLMs, RAG, and MCP servers. Powered by curiosity.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;

    function typeEffect() {
        if (!typingTarget) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 25;
        } else {
            typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50 + Math.random() * 40;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing after terminal animation
    setTimeout(typeEffect, 1200);

    // --- Navigation scroll effect ---
    const nav = document.getElementById('nav');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('.mobile-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // --- Smooth scroll for nav links ---
    document.querySelectorAll('.scroll-to').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Reveal on scroll (Intersection Observer) ---
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show all
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Stagger reveal for skill tags ---
    var skillCategories = document.querySelectorAll('.skill-category');

    if ('IntersectionObserver' in window) {
        var skillObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach(function (tag, index) {
                        tag.style.opacity = '0';
                        tag.style.transform = 'translateY(10px) scale(0.9)';
                        tag.style.transition = 'opacity 0.3s ease ' + (index * 0.06) + 's, transform 0.3s ease ' + (index * 0.06) + 's';
                        requestAnimationFrame(function () {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0) scale(1)';
                        });
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        skillCategories.forEach(function (cat) {
            skillObserver.observe(cat);
        });
    }

    // --- Konami Code Easter Egg ---
    var konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    var konamiIndex = 0;

    document.addEventListener('keydown', function (e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        var easterEgg = document.createElement('div');
        easterEgg.style.cssText =
            'position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;' +
            'background:rgba(0,0,0,0.9);z-index:99999;font-family:var(--font-mono);color:#00ffaa;font-size:1.2rem;' +
            'text-align:center;padding:2rem;cursor:pointer;backdrop-filter:blur(10px);animation:fadeIn 0.3s ease;';
        easterEgg.innerHTML =
            '<div>' +
            '<div style="font-size:3rem;margin-bottom:1rem;">&#x1F389;</div>' +
            '<p style="margin-bottom:0.5rem;">Achievement Unlocked!</p>' +
            '<p style="color:#a1a1aa;font-size:0.9rem;">You found the secret. You\'re clearly a person of culture.</p>' +
            '<p style="color:#52525b;font-size:0.75rem;margin-top:1rem;">Fun fact: This entire portfolio has zero npm dependencies.<br>Yes, really. <code>node_modules/</code> can rest today.</p>' +
            '<p style="color:#52525b;font-size:0.7rem;margin-top:1.5rem;">[click to close]</p>' +
            '</div>';
        easterEgg.addEventListener('click', function () {
            easterEgg.remove();
        });
        document.body.appendChild(easterEgg);
    }

    // --- Console Easter Egg ---
    console.log(
        '%c> robson.portfolio.init() %c\n\n' +
        'Hey there, curious dev! \u{1F44B}\n' +
        'Since you\'re inspecting the console,\n' +
        'you probably know your way around.\n\n' +
        'Let\'s connect: robs.alvz@gmail.com\n' +
        'Or try the Konami Code on the page ;)\n',
        'color: #00ffaa; font-size: 14px; font-weight: bold;',
        'color: #a1a1aa; font-size: 12px;'
    );

})();
