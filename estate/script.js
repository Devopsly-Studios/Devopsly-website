document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // Smooth Scrolling for Anchors
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

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animation by clearing initial inline styles
                // This allows the element to transition to its natural CSS state (opacity: 1, transform: none)
                entry.target.style.opacity = '';
                entry.target.style.transform = '';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add delays for grid items
    document.querySelectorAll('.property-grid, .services-grid, .neighborhood-grid, .testimonial-grid').forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            // Stagger delay based on column position (approximate)
            const delay = (index % 3) * 150;
            child.style.transitionDelay = `${delay}ms`;
        });
    });

    document.querySelectorAll('.property-card, .about-content, .service-card, .neighborhood-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        // Capture delay and include in shorthand to prevent overwriting
        const delay = el.style.transitionDelay || '0s';

        // Initial entrance transition
        el.style.transition = `all 0.8s cubic-bezier(0.5, 0, 0, 1) ${delay}`;

        // Reset transition to faster defaults for hover effects after entrance
        const resetTransition = () => {
            el.style.transition = 'all 0.4s ease-out';
            el.style.transitionDelay = '0s';
            el.removeEventListener('transitionend', resetTransition);
        };
        el.addEventListener('transitionend', resetTransition);

        observer.observe(el);
    });

    // Auto-add animation class when visible

});
