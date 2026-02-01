// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Theme Toggle (dark/light) =====
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');

    // Create email content
    const emailSubject = `New Inquiry: ${service} - from ${name}`;
    const emailBody = `
Hello DevOpsly Studios,

You have received a new inquiry from your website:

Name: ${name}
Email: ${email}
Service Required: ${service}

Message:
${message}

---
This message was sent from the DevOpsly Studios website contact form.
    `.trim();

    // Encode for mailto link
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:tohid@devopslystudios.com?subject=${encodedSubject}&body=${encodedBody}`;

    // Open email client
    window.location.href = mailtoUrl;

    // Reset form
    this.reset();

    // Show success message
    showNotification('Opening your email client...');
});

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-text">${message}</span>
        </div>
    `;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3366FF 0%, #00D4FF 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(51, 102, 255, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature, .contact-card, .about-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add animation class styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// ===== Terminal Animation =====
const terminalCommands = [
    {
        cmd: 'npm run build',
        output: [
            { text: '> devopsly-studio@1.0.0 build', class: 'white' },
            { text: '> Building production bundle...', class: 'info' },
            { text: '✓ Compiled successfully in 2.3s', class: 'success' },
            { text: '✓ Bundle size: 145kb (gzipped)', class: 'success' }
        ]
    },
    {
        cmd: 'docker-compose up -d',
        output: [
            { text: 'Creating network "devopsly_net"', class: 'info' },
            { text: 'Creating devopsly_web_1    ... done', class: 'success' },
            { text: 'Creating devopsly_db_1     ... done', class: 'success' },
            { text: 'Creating devopsly_nginx_1  ... done', class: 'success' }
        ]
    },
    {
        cmd: 'git push origin main',
        output: [
            { text: 'Enumerating objects: 15, done.', class: 'white' },
            { text: 'Counting objects: 100% (15/15)', class: 'info' },
            { text: 'Writing objects: 100% (8/8), 2.1 KB', class: 'info' },
            { text: 'To github.com:devopsly/studio', class: 'success' },
            { text: '   main -> main ✓', class: 'success' }
        ]
    },
    {
        cmd: 'kubectl get pods',
        output: [
            { text: 'NAME                    READY   STATUS', class: 'highlight' },
            { text: 'web-deploy-7d4f9       1/1     Running', class: 'success' },
            { text: 'api-deploy-3b2c8       1/1     Running', class: 'success' },
            { text: 'db-stateful-0          1/1     Running', class: 'success' }
        ]
    },
    {
        cmd: 'npm run deploy',
        output: [
            { text: '> Deploying to production...', class: 'info' },
            { text: '> Uploading assets to CDN...', class: 'info' },
            { text: '✓ Deployed to devopsly.studio', class: 'success' },
            { text: '✓ SSL certificate valid', class: 'success' }
        ]
    }
];

let currentCmdIndex = 0;
const typedCommand = document.getElementById('typed-command');
const terminalOutput = document.getElementById('terminal-output');
const cursor = document.querySelector('.cursor');

function typeCommand(command, callback) {
    let i = 0;
    typedCommand.textContent = '';
    terminalOutput.innerHTML = '';

    function type() {
        if (i < command.length) {
            typedCommand.textContent += command[i];
            i++;
            setTimeout(type, 50 + Math.random() * 50);
        } else {
            setTimeout(callback, 500);
        }
    }
    type();
}

function showOutput(outputs, callback) {
    let i = 0;

    function showLine() {
        if (i < outputs.length) {
            const line = document.createElement('div');
            line.className = 'output-line ' + outputs[i].class;
            line.textContent = outputs[i].text;
            line.style.animationDelay = (i * 0.1) + 's';
            terminalOutput.appendChild(line);
            i++;
            setTimeout(showLine, 200);
        } else {
            setTimeout(callback, 2000);
        }
    }
    showLine();
}

function runTerminal() {
    const current = terminalCommands[currentCmdIndex];

    typeCommand(current.cmd, () => {
        showOutput(current.output, () => {
            currentCmdIndex = (currentCmdIndex + 1) % terminalCommands.length;
            runTerminal();
        });
    });
}

// Start terminal animation after page load
setTimeout(runTerminal, 1500);

// ===== Counter Animation for Stats =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format the number
        let displayValue = Math.floor(current);
        if (element.textContent.includes('+')) {
            displayValue += '+';
        } else if (element.textContent.includes('%')) {
            displayValue += '%';
        }

        element.textContent = displayValue;
    }, stepTime);
}

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const number = parseInt(text);
            animateCounter(entry.target, number);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== Add hover effect to service cards =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Blogs section: fetch tech / IT news (Dev.to API – free, no key) =====
(function loadBlogs() {
    function escapeHtml(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    var grid = document.getElementById('blogs-grid');
    var loading = document.getElementById('blogs-loading');
    var errorEl = document.getElementById('blogs-error');
    if (!grid || !loading) return;

    // Clear hash from URL to prevent auto-scroll on reload
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }

    // Reliable fallback images (Unsplash)
    var FALLBACK_IMAGES = [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=640&q=80', // Coding
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=640&q=80', // Code screen
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80', // Chip
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=640&q=80', // Coding 2
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=640&q=80', // Server
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=640&q=80'  // Workspace
    ];

    function getRandomImage() {
        return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
    }

    // Strategy: Try Local 'Backend' JSON -> If fail, Try External API (Dev.to) -> If fail, Use Fallback
    function fetchLocalBackend() {
        // This acts as our reliable "Backend"
        return fetch('./api/blogs.json')
            .then(function (res) {
                if (!res.ok) throw new Error('Local backend failed');
                return res.json();
            })
            .then(function (articles) {
                console.log('Fetched from Local Backend');
                return articles; // Already in correct format
            });
    }

    function fetchDevTo() {
        var API_URL = 'https://dev.to/api/articles?per_page=10&tag=webdev';
        return fetch(API_URL, { method: 'GET', mode: 'cors' })
            .then(function (res) {
                if (!res.ok) throw new Error('Dev.to failed');
                return res.json();
            })
            .then(function (articles) {
                if (!articles || !articles.length) throw new Error('No Dev.to articles');
                return articles.map(function (a) {
                    return {
                        title: a.title,
                        url: a.url,
                        description: a.description || '',
                        cover_image: a.cover_image || getRandomImage(),
                        published_at: a.published_at,
                        author: (a.user && a.user.name) ? a.user.name : 'Dev.to',
                        tags: a.tag_list ? a.tag_list.slice(0, 3) : []
                    };
                });
            });
    }

    function renderBlogs(articles) {
        // Shuffle and pick 6
        var shuffled = articles.sort(function () { return 0.5 - Math.random(); });
        var selected = shuffled.slice(0, 6);

        selected.forEach(function (article) {
            var card = document.createElement('article');
            card.className = 'blog-card';
            card.setAttribute('itemscope', '');
            card.setAttribute('itemtype', 'https://schema.org/Article');

            var img = article.cover_image;
            var title = escapeHtml(article.title);
            var url = article.url ? escapeHtml(article.url) : '#';
            var desc = escapeHtml(article.description);
            // Format nice date
            var dateObj = new Date(article.published_at);
            var date = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
            var author = escapeHtml(article.author);
            var tags = article.tags;

            // Handle image error by swapping with a random reliable image
            var onErrorStr = "this.onerror=null;this.src='" + getRandomImage() + "';";

            card.innerHTML =
                '<img class="blog-card__image" src="' + img + '" alt="" loading="lazy" decoding="async" onerror="' + onErrorStr + '">' +
                '<div class="blog-card__body">' +
                '<h3 class="blog-card__title"><a href="' + url + '" target="_blank" rel="noopener noreferrer">' + title + '</a></h3>' +
                '<div class="blog-card__meta">' + author + (date ? ' · ' + date : '') + '</div>' +
                (desc ? '<p class="blog-card__excerpt">' + desc + '</p>' : '') +
                (tags.length ? '<div class="blog-card__tags">' + tags.map(function (t) { return '<span class="blog-card__tag">' + t + '</span>'; }).join('') + '</div>' : '') +
                '</div>';
            grid.appendChild(card);
        });
        loading.remove();
    }

    // Execute Chain
    fetchLocalBackend()
        .then(function (articles) {
            renderBlogs(articles);
        })
        .catch(function (err) {
            console.warn('Local Backend failed, trying External API...', err);
            return fetchDevTo()
                .then(function (articles) {
                    renderBlogs(articles);
                });
        })
        .catch(function (err) {
            console.warn('All APIs failed, using Local Fallback...', err);
            // Local Fallback
            var fallbackArticles = [
                {
                    title: 'The Future of Web Development: What to Expect in 2025',
                    url: '#',
                    description: 'Explore the upcoming trends in web development, from AI-driven coding to WebAssembly and beyond.',
                    cover_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=640&q=80',
                    published_at: new Date().toISOString(),
                    author: 'DevOpsly Team',
                    tags: ['webdev', 'future', 'tech']
                },
                {
                    title: 'Mastering CSS Grid and Flexbox',
                    url: '#',
                    description: 'A comprehensive guide to building responsive layouts using modern CSS techniques.',
                    cover_image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=640&q=80',
                    published_at: new Date().toISOString(),
                    author: 'Frontend Daily',
                    tags: ['css', 'responsive', 'design']
                },
                {
                    title: 'DevOps Best Practices for Startups',
                    url: '#',
                    description: 'Learn how to implement CI/CD pipelines and manage infrastructure efficiently.',
                    cover_image: 'https://images.unsplash.com/photo-1667372393119-c81c0c60cf32?auto=format&fit=crop&w=640&q=80',
                    published_at: new Date().toISOString(),
                    author: 'Cloud Native',
                    tags: ['devops', 'startup', 'cloud']
                },
                {
                    title: 'Why JavaScript is Still King',
                    url: '#',
                    description: 'Despite new languages appearing, JavaScript remains the dominant force in web development.',
                    cover_image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=640&q=80',
                    published_at: new Date().toISOString(),
                    author: 'JS World',
                    tags: ['javascript', 'web', 'coding']
                },
                {
                    title: 'Introduction to Docker and Kubernetes',
                    url: '#',
                    description: 'Containerization explained simply. Start your journey into microservices today.',
                    cover_image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=640&q=80',
                    published_at: new Date().toISOString(),
                    author: 'Docker Fan',
                    tags: ['docker', 'kubernetes', 'devops']
                },
                {
                    title: 'Building Scalable APIs with Node.js',
                    url: '#',
                    description: 'Tips and tricks for creating high-performance backend services using Node.js.',
                    cover_image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=640&q=80',
                    published_at: new Date().toISOString(),
                    author: 'Node Master',
                    tags: ['nodejs', 'backend', 'api']
                }
            ];
            renderBlogs(fallbackArticles);
        });
})();

console.log('DevOpsly Studios website loaded successfully! 🚀');
