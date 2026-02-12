document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Reveal Animation for Sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Apply reveal classes
    const sections = document.querySelectorAll('.section, .hero-content');
    sections.forEach(sec => {
        sec.classList.add('reveal');
        observer.observe(sec);
    });

    // Add styles for reveal
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // 3. Parallax Effect for showcase image
    const showcaseImg = document.querySelector('.showcase-img');
    const showcaseSection = document.querySelector('.product-showcase');

    if (showcaseImg && showcaseSection) {
        window.addEventListener('scroll', () => {
            const rect = showcaseSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.1;
                const offset = (window.innerHeight - rect.top) * speed;
                // Subtle rotation and translation
                showcaseImg.style.transform = `translateY(${offset * -0.5}px) rotate(${-10 + (offset * 0.02)}deg)`;
            }
        });
    }
});
