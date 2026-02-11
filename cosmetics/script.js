// Hero Slider Logic
const slides = document.querySelectorAll('.hero-slider .slide');
const titleLines = document.querySelectorAll('.hero-content h1 .line');

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

        // Ensure we have enough words and lines
        if (newTitle.length >= 1 && titleLines.length > 0) {
            // Animate Out
            gsap.to(titleLines, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    // Update content safely
                    if (titleLines[0]) titleLines[0].textContent = newTitle[0] || "";
                    if (titleLines[1]) titleLines[1].textContent = newTitle[1] || "";

                    // Animate In
                    gsap.to(titleLines, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
                }
            });
        }

    }, 4000); // Change every 4 seconds
}

// Staggered Fade In for Categories
gsap.from(".cat-card", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".categories-section",
        start: "top 80%"
    }
});

// Editorial Image Reveal
gsap.from(".editorial-img img", {
    scale: 1.2,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".editorial-section",
        start: "top 70%",
        end: "bottom center",
        scrub: 1
    }
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.style.background = "rgba(255, 255, 255, 0.98)";
        nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    } else {
        nav.style.background = "rgba(249, 248, 246, 0.9)";
        nav.style.boxShadow = "none";
    }
});

// Ritual Steps Animation
gsap.from(".step-card", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".rituals-section",
        start: "top 75%"
    }
});

// Testimonials Animation
gsap.from(".testimonial-card", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top 80%"
    }
});


// Ingredients Animation
gsap.from(".ing-card", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".ingredients-section",
        start: "top 75%"
    }
});


