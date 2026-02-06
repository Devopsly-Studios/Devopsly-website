// Initialize Lenis Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Smooth follow for outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            duration: 0.3,
            x: x * 0.3,
            y: y * 0.3,
            ease: "power2.out"
        });

        // Scale cursor
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0, 242, 234, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: "power2.out"
        });

        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--primary)';
    });
});

// Hero 3D Tilt
const hero = document.querySelector('.hero');
const floatingCard = document.querySelector('.floating-card');

hero.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

    gsap.to(floatingCard, {
        duration: 0.5,
        rotationY: xAxis,
        rotationX: yAxis,
        ease: "power2.out"
    });
});

hero.addEventListener('mouseleave', () => {
    gsap.to(floatingCard, {
        duration: 1,
        rotationY: 0,
        rotationX: 0,
        ease: "elastic.out(1, 0.3)"
    });
});

// Preloader & Intro Timeline
const tl = gsap.timeline();

// Prevent scrolling during preloader
document.body.style.overflow = 'hidden';

// Preloader Sequence
tl.to('.loader-bar', {
    duration: 1.5,
    x: 0,
    ease: "power2.inOut"
})
    .to('.loader-text span', {
        duration: 0.8,
        y: 0,
        stagger: 0.1,
        ease: "power4.out"
    }, "-=0.5")
    .to('.preloader', {
        duration: 1,
        y: '-100%',
        ease: "power4.inOut",
        onComplete: () => {
            document.body.style.overflow = '';
        }
    })
    // Hero Reveal
    .from('.navbar', {
        duration: 1,
        y: '-100%',
        opacity: 0,
        ease: "power4.out"
    }, "-=0.5")
    .to('.reveal-text', {
        duration: 1,
        y: 0,
        stagger: 0.1,
        ease: "power4.out"
    }, "-=0.5")
    .to('.hero-visual', {
        duration: 1.5,
        opacity: 1,
        ease: "power2.out"
    }, "-=1");

// Infinite Marquee
gsap.to('.marquee-content', {
    xPercent: -50,
    repeat: -1,
    duration: 20,
    ease: "linear"
});

// Scroll Triggers for Products
gsap.utils.toArray('.product-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.1
    });
});

// Cart Interaction Logic
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartBadge = document.querySelector('.badge');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalEl = document.querySelector('.cart-total');
const cartCountEl = document.querySelector('.cart-count');
const addBtns = document.querySelectorAll('.add-with-text');

let cart = [];

// Open Cart
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
}

// Close Cart
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
}

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Add to Cart Logic
addBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = btn.closest('.product-card');
        const id = card.dataset.id;
        const title = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img;

        addToCart(id, title, price, img);
        openCart(); // Auto open cart on add

        // Button Feedback
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        btn.style.background = "#00f2ea";
        btn.style.color = "#000";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
            btn.style.color = "";
        }, 1500);
    });
});

function addToCart(id, title, price, img) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ id, title, price, img, qty: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    // Update Badge & Count
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    cartBadge.innerText = totalQty;
    cartCountEl.innerText = totalQty;

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <span>$${item.price} x ${item.qty}</span>
                </div>
            </div>
        `).join('');
    }

    // Update Total
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotalEl.innerText = '$' + total.toFixed(2);
}

// Bento Grid Reveal
gsap.from('.bento-item', {
    scrollTrigger: {
        trigger: '.bento-grid',
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
});

// Parallax Effect for Visual Story
gsap.to('.parallax-bg', {
    scrollTrigger: {
        trigger: '.visual-story',
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    yPercent: 30, // Moves the background slower than scroll
    ease: "none"
});

// Newsletter Interaction
const newsletterInput = document.querySelector('.nl-input');
const sendBtn = document.querySelector('.send-btn');

sendBtn.addEventListener('click', () => {
    if (newsletterInput.value.length > 0) {

        // Button Animation
        const icon = sendBtn.querySelector('i');

        gsap.to(sendBtn, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                icon.classList.remove('fa-arrow-right');
                icon.classList.add('fa-check');
                sendBtn.style.color = 'var(--primary)';

                gsap.set(sendBtn, { x: -100 });
                gsap.to(sendBtn, {
                    x: 0,
                    opacity: 1,
                    duration: 0.3
                });
            }
        });

        // Input Animation
        gsap.to(newsletterInput, {
            color: 'var(--primary)',
            duration: 0.3
        });
        newsletterInput.value = "Welcome to the future.";
    }
});

// Limited Drop Countdown
const countdown = () => {
    const countDate = new Date("Dec 31, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    if (document.getElementById('days')) {
        document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
        document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
        document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
    }
};

setInterval(countdown, 1000);
countdown();
