// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.width = '100%';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '1000';
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-num');
    let hasAnimated = false;

    // Helper to get raw number
    const getTarget = (str) => {
        return parseFloat(str.replace(/[^0-9.]/g, ''));
    };

    const getSuffix = (str) => {
        return str.replace(/[0-9.]/g, '');
    };

    const animateStats = () => {
        stats.forEach(stat => {
            const originalText = stat.innerText;
            const target = getTarget(originalText);
            const suffix = getSuffix(originalText);

            const duration = 2000; // ms
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            const increment = target / totalFrames;

            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.innerText = target + suffix;
                    clearInterval(counter);
                } else {
                    stat.innerText = Math.ceil(current) + suffix;
                }
            }, frameDuration);
        });
    };

    // Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Trigger stats if we see the hero stats section
                if (entry.target.classList.contains('hero-stats') && !hasAnimated) {
                    animateStats();
                    hasAnimated = true;
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.hero-content, .hero-image, .course-card, .feature-content, .feature-image, .testimonial-card, .company-card, .category-card, .hero-stats');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        // Stagger
        el.style.transitionDelay = `${(index % 3) * 100}ms`;
        observer.observe(el);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
