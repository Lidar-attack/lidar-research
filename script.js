// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Video lazy loading and performance optimization
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                    delete video.dataset.src;
                }
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '50px'
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to various elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(`
        .attack-type,
        .highlight-box,
        .scenario-card,
        .sim-feature,
        .finding-item,
        .video-item,
        .response-item,
        .impact-category
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed for smaller screens)
const createMobileMenu = () => {
    const nav = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('mobile-menu-toggle');
            toggleButton.innerHTML = '☰';
            toggleButton.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
            `;
            
            toggleButton.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-active');
            });
            
            nav.querySelector('.nav-container').appendChild(toggleButton);
            
            // Add mobile styles to nav menu
            navMenu.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #1e3c72;
                flex-direction: column;
                padding: 1rem 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            `;
        }
    }
};

// Video error handling
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        video.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f8f9fa;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6c757d;
                font-size: 0.9rem;
                border-radius: 8px;
            `;
            placeholder.textContent = 'Video unavailable - Demo content';
            
            video.parentNode.replaceChild(placeholder, video);
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(30, 60, 114, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// Performance monitoring
const logPerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
};

// Initialize performance monitoring
logPerformance();

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add CSS for mobile menu toggle
const addMobileStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: #1e3c72;
                flex-direction: column;
                padding: 1rem 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-menu.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-toggle {
                display: block !important;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none !important;
            }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
};

// Initialize mobile styles
addMobileStyles();

// Window resize handler
window.addEventListener('resize', () => {
    createMobileMenu();
});

// Initialize mobile menu on load
document.addEventListener('DOMContentLoaded', createMobileMenu);