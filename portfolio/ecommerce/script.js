const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const hero = document.querySelector('.hero');
const floatingCard = document.querySelector('.floating-card');
const heroImg = document.querySelector('.hero-img');
const addToCartBtns = document.querySelectorAll('.add-btn');
const cartBadge = document.querySelector('.badge');

let cartCount = 0;

// Custom Cursor Logic
window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with lag (using native animate for performance)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Interactive Elements Hover Effect for Cursor
document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0, 242, 234, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--primary)';
    });
});

// 3D Parallax Tilt Effect for Hero
hero.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    // Animate the card container
    floatingCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset tilt on leave
hero.addEventListener('mouseleave', () => {
    floatingCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
    floatingCard.style.transition = 'all 0.5s ease';
});

hero.addEventListener('mouseenter', () => {
    floatingCard.style.transition = 'none';
});

// Cart Logic
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Animation for button
        const icon = btn.querySelector('i');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-check');
        btn.style.background = '#00f2ea';
        btn.style.color = '#000';

        // Update count
        cartCount++;
        cartBadge.innerText = cartCount;

        // Reset button after 1.5s
        setTimeout(() => {
            icon.classList.add('fa-plus');
            icon.classList.remove('fa-check');
            btn.style.background = '';
            btn.style.color = '';
        }, 1500);

        // Simple shake animation for cart icon in nav
        const cartIcon = document.querySelector('.cart-trigger i');
        cartIcon.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 500);
    });
});

// Scroll Reveal Observer
const observerOptions = {
    threshold: 0.1
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

// Initial set up for reveal elements
document.querySelectorAll('.product-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`; // Staggered delay
    observer.observe(el);
});
