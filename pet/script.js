document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            const icon = toggle.querySelector('i');

            if (navLinks.style.display === 'flex' && navLinks.classList.contains('mobile-active')) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('mobile-active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                navLinks.style.display = 'flex';
                navLinks.classList.add('mobile-active');

                // Apply mobile styles dynamically to avoid CSS complexity for this snippet
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';

                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // 2. Navbar Scroll Effect (Blur & Shadow)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Simple Card Hover Tilt Effect (Subtle)
    const cards = document.querySelectorAll('.product-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '5';
        });
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
            card.style.transform = ''; // reset
        });
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-active')) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('mobile-active');
                    toggle.querySelector('i').classList.remove('fa-times');
                    toggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
});
