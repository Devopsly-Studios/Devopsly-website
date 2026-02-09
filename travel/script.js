// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

menuToggle?.addEventListener('click', () => {
    // Basic toggle class for visibility
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        navActions.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'white';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';

        navActions.style.display = 'flex';
        navActions.style.flexDirection = 'column';
        navActions.style.gap = '1rem';
        navActions.style.position = 'absolute';
        navActions.style.top = 'calc(100% + 200px)'; // Below links
        navActions.style.left = '0';
        navActions.style.width = '100%';
        navActions.style.padding = '0 2rem 2rem 2rem';
        navActions.style.background = 'white';
    }
});

// Scroll Navbar Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        // Keep light bg since text is dark
    }
});

// Booking Tabs
const tabs = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.booking-form'); // In a real app we'd have multiple forms

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add to clicked
        tab.classList.add('active');

        // Logic for swapping forms would go here
        // For this demo, we just animate the button state
        const type = tab.getAttribute('data-tab');
        console.log(`Switched to ${type} booking`);
    });
});

// Simple Entrance Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.service-card, .destination-card, .feature-text, .feature-img, .review-card');

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    el.style.transitionDelay = `${(index % 3) * 100}ms`; // Stagger
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
            // Close mobile menu if open
            if (window.innerWidth <= 900) {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            }
        }
    });
});
