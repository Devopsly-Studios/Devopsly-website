// Initialize Lenis Scroll
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor (Glowing Light)
const cursor = document.querySelector('.cursor-light');
const hoverElements = document.querySelectorAll('.hover-glow, a, button, .look-card');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1, // Quick follow
        ease: "power2.out"
    });
});

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
        gsap.to(cursor, { scale: 1, duration: 0.3 });
    });
});

// Veil Loader Interaction
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // Hide Loader
    tl.to('.loader-text', { opacity: 0, duration: 0.5 })
        .to('.aura-glow', { scale: 0, opacity: 0, duration: 0.8, ease: "power2.in" }, "-=0.3")
        .to('.veil-loader', { opacity: 0, duration: 1, pointerEvents: 'none' })

        // Hero Entrance
        .from('.hero-title .line', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out"
        }, "-=0.5")
        .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.8");
});

// Horizontal Scroll for Lookbook
const lookSection = document.querySelector('.lookbook-section');
const lookGallery = document.querySelector('.look-gallery');

if (window.innerWidth > 1024) {
    let scrollWidth = lookGallery.scrollWidth - window.innerWidth + 200; // Extra padding

    gsap.to(lookGallery, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
            trigger: lookSection,
            start: "top top",
            end: () => "+=" + scrollWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
        }
    });
}

// Parallax Image Effect (Vertical)
gsap.utils.toArray('.parallax-item').forEach(item => {
    const img = item.querySelector('img');
    if (img) {
        gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
});

// Statement Text Reveal
gsap.from('.statement-text', {
    scrollTrigger: {
        trigger: '.prologue-section',
        start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

// Visual Break Parallax
gsap.to('.break-img', {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: '.visual-break',
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Hero Slider Logic
const slides = document.querySelectorAll('.hero-slider .slide');
const titleLines = document.querySelectorAll('.hero-title .line'); // The, Quiet, Force

let currentSlide = 0;

if (slides.length > 0) {
    setInterval(() => {
        // Remove active from current
        slides[currentSlide].classList.remove('active');

        // Next index
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active to next
        slides[currentSlide].classList.add('active');

        // Update Text
        const newTitle = slides[currentSlide].getAttribute('data-title').split(' ');
        if (newTitle.length >= 2 && titleLines.length >= 3) {
            // Animate Out
            gsap.to(titleLines, {
                opacity: 0, y: -20, duration: 0.5, onComplete: () => {
                    // Change Text
                    // titleLines[0].textContent = "The"; // Keep 'The'
                    titleLines[1].textContent = newTitle[0]; // e.g. Ethereal
                    titleLines[2].textContent = newTitle[1]; // e.g. Form

                    // Animate In
                    gsap.to(titleLines, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
                }
            });
        }

    }, 5000); // Change every 5 seconds
}
