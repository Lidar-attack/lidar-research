// Professional Academic Website JavaScript

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-item');
    const navHeight = document.querySelector('.navigation').offsetHeight;
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + navHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll event listener for navigation highlighting
window.addEventListener('scroll', updateActiveNavigation);

// Video lazy loading with intersection observer
function initializeVideoLazyLoading() {
    const videos = document.querySelectorAll('video[data-src]');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const source = video.querySelector('source');
                    
                    if (video.dataset.src && !video.src) {
                        video.src = video.dataset.src;
                        if (source) {
                            source.src = video.dataset.src;
                        }
                        video.load();
                        delete video.dataset.src;
                    }
                    
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        videos.forEach(video => {
            if (video.dataset.src) {
                video.src = video.dataset.src;
                const source = video.querySelector('source');
                if (source) {
                    source.src = video.dataset.src;
                }
                video.load();
                delete video.dataset.src;
            }
        });
    }
}

// Initialize video lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeVideoLazyLoading);

// Fade-in animation for sections
function initializeSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to content blocks
    const animatedElements = document.querySelectorAll(`
        .abstract-box,
        .key-contributions,
        .attack-overview,
        .phase-item,
        .scenario-detailed,
        .video-analysis-item,
        .feature-item,
        .collision-demonstration,
        .response-item-detailed,
        .result-item,
        .implication-item
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(el);
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSectionAnimations);

// Video error handling
function handleVideoErrors() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        video.addEventListener('error', function() {
            console.warn('Video failed to load:', this.src);
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: ${this.style.height || '200px'};
                background: #f8f9fa;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 0.9rem;
                border-radius: 6px;
                border: 1px solid #e9ecef;
            `;
            placeholder.textContent = 'Video content unavailable';
            
            // Replace video with placeholder
            this.parentNode.replaceChild(placeholder, this);
        });
        
        // Preload metadata for better user experience
        video.preload = 'metadata';
    });
}

// Initialize video error handling
document.addEventListener('DOMContentLoaded', handleVideoErrors);

// Scroll-to-top functionality
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgba(34, 110, 147, 1);
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll button based on page position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollButton);
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window && 'PerformanceObserver' in window) {
        // Monitor loading performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
                }
            }, 0);
        });
        
        // Monitor largest contentful paint
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lcpEntry = entries[entries.length - 1];
                console.log('LCP:', Math.round(lcpEntry.startTime), 'ms');
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // Silently handle browsers that don't support LCP
        }
    }
}

// Initialize performance monitoring
monitorPerformance();

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Allow navigation with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const sections = Array.from(document.querySelectorAll('.section'));
            const navHeight = document.querySelector('.navigation').offsetHeight;
            const currentScroll = window.pageYOffset + navHeight + 100;
            
            let currentIndex = -1;
            sections.forEach((section, index) => {
                if (currentScroll >= section.offsetTop && currentScroll < section.offsetTop + section.offsetHeight) {
                    currentIndex = index;
                }
            });
            
            let targetIndex;
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                targetIndex = currentIndex + 1;
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            }
            
            if (targetIndex !== undefined) {
                e.preventDefault();
                const targetPosition = sections[targetIndex].offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initializeKeyboardNavigation);

// Mobile menu toggle for smaller screens
function initializeMobileMenu() {
    const navigation = document.querySelector('.navigation');
    const navList = document.querySelector('.nav-list');
    
    if (window.innerWidth <= 768) {
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '☰';
        toggleButton.className = 'mobile-menu-toggle';
        toggleButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            padding: 15px 20px;
            cursor: pointer;
        `;
        
        // Add mobile styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                }
                .nav-list.mobile-hidden {
                    display: none;
                }
                .nav-list {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: rgba(34, 110, 147, 1);
                    flex-direction: column;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
            }
        `;
        document.head.appendChild(mobileStyles);
        
        toggleButton.addEventListener('click', () => {
            navList.classList.toggle('mobile-hidden');
        });
        
        navigation.querySelector('.container').insertBefore(toggleButton, navList);
    }
}

// Initialize mobile menu
window.addEventListener('resize', initializeMobileMenu);
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// Print styles
function addPrintStyles() {
    const printStyles = document.createElement('style');
    printStyles.media = 'print';
    printStyles.textContent = `
        @media print {
            .navigation,
            .scroll-to-top,
            .mobile-menu-toggle {
                display: none !important;
            }
            
            .section {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .main-header {
                background: white !important;
                color: black !important;
            }
            
            .paper-title {
                color: black !important;
            }
            
            video {
                display: none;
            }
            
            .video-analysis-item::after {
                content: "[Video content available in digital version]";
                display: block;
                text-align: center;
                color: #666;
                font-style: italic;
                padding: 20px;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

// Add print styles
addPrintStyles();