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

    // Expanded Reliable Fallback Images (Unsplash) to prevent repetition
    var FALLBACK_IMAGES = [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=640&q=80', // Coding
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=640&q=80', // Code screen
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=80', // Chip
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=640&q=80', // Coding 2
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=640&q=80', // Server
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=640&q=80', // Workspace
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=80', // Servers
        'https://images.unsplash.com/photo-1597852074816-d933ccfd2d90?auto=format&fit=crop&w=640&q=80', // Network
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=640&q=80', // Matrix code
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=640&q=80', // Cyber lock
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=640&q=80', // Globe
        'https://images.unsplash.com/photo-1531297461136-82af022f5b79?auto=format&fit=crop&w=640&q=80', // Setup
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=80', // Dashboard
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=80', // Analytics
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=640&q=80', // Tech team
        'https://images.unsplash.com/photo-1535378437327-10f279ad46dd?auto=format&fit=crop&w=640&q=80', // Future
        'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=640&q=80', // AI
        'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=640&q=80', // AI Face
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=640&q=80'  // Code
    ];

    function getRandomImage() {
        return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
    }

    // Strategy: LIVE Aggregator (Dev.to)
    // Fetches from multiple tags to ensure a huge variety of fresh content
    function fetchLiveBlogs() {
        var tags = ['devops', 'cloud', 'aws', 'webdev'];
        var requests = tags.map(function (tag) {
            return fetch('https://dev.to/api/articles?per_page=10&state=fresh&tag=' + tag, { method: 'GET', mode: 'cors', cache: 'no-store' })
                .then(function (res) { return res.ok ? res.json() : []; })
                .catch(function () { return []; });
        });

        return Promise.all(requests)
            .then(function (results) {
                // Flatten results array: [[a,b], [c,d]] -> [a,b,c,d]
                var allArticles = [].concat.apply([], results);

                if (!allArticles.length) throw new Error('No articles found');

                // Deduplicate by ID
                var seenIds = new Set();
                var uniqueArticles = allArticles.filter(function (a) {
                    if (seenIds.has(a.id)) return false;
                    seenIds.add(a.id);
                    return true;
                });

                console.log('Aggregated ' + uniqueArticles.length + ' live articles.');

                return uniqueArticles.map(function (a) {
                    // Use cover image if available, else random fallback
                    var hasValidCover = a.cover_image && a.cover_image.indexOf('placeholder') === -1;

                    return {
                        title: a.title,
                        url: a.url,
                        description: a.description || '',
                        cover_image: hasValidCover ? a.cover_image : getRandomImage(),
                        published_at: a.published_at,
                        author: (a.user && a.user.name) ? a.user.name : 'Guest Author',
                        tags: a.tag_list ? a.tag_list.slice(0, 3) : []
                    };
                });
            });
    }

    // Fallback if Live Fetch completely dies (rare)
    function fetchLocalBackup() {
        return fetch('./api/blogs.json')
            .then(function (res) { return res.json(); });
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
    fetchLiveBlogs()
        .then(function (articles) {
            renderBlogs(articles);
        })
        .catch(function (err) {
            console.warn('Live API failed, switching to Local Backup...', err);
            return fetchLocalBackup()
                .then(function (articles) {
                    renderBlogs(articles);
                });
        });
})();

console.log('DevOpsly Studios website loaded successfully! 🚀');
