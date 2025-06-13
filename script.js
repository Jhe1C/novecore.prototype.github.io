// FlowFuse - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initBackToTop();
    initMobileMenu();
    initDropdowns();
    initSmoothScrolling();
    initAccessibility();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
}

// Scroll effects
function initScrollEffects() {
    const hero = document.getElementById('hero');
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const parallaxOffset = scrollY * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallaxOffset}px)`;
        }
    }
    
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function onScroll() {
        requestTick();
        ticking = false;
    }
    
    window.addEventListener('scroll', onScroll);
}

// Animation observers
function initAnimations() {
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
    
    const animateElements = document.querySelectorAll('.pillar-card, .ai-benefit-card, .testimonial-card, .integration-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Dropdown functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !menu) return;
        
        let timeoutId;
        
        function showDropdown() {
            clearTimeout(timeoutId);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        }
        
        function hideDropdown() {
            timeoutId = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            }, 150);
        }
        
        dropdown.addEventListener('mouseenter', showDropdown);
        dropdown.addEventListener('mouseleave', hideDropdown);
        
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showDropdown();
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                hideDropdown();
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// Accessibility improvements
function initAccessibility() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute; top: -40px; left: 6px;
        background: var(--color-primary); color: white;
        padding: 8px; text-decoration: none;
        border-radius: 4px; z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => skipLink.style.top = '6px');
    skipLink.addEventListener('blur', () => skipLink.style.top = '-40px');
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
}

// URL parameter handling for coming soon pages
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Coming soon page data
const comingSoonData = {
    'project-managers': {
        title: 'Project Manager Solutions',
        description: 'Specialized tools and workflows designed specifically for project managers to streamline complex projects and team coordination.'
    },
    'pricing': {
        title: 'Pricing Plans',
        description: 'Detailed pricing information and plan comparisons will be available soon. Contact us for early access pricing.'
    },
    'demo': {
        title: 'Interactive Demo',
        description: 'Our interactive product demo is currently being prepared. Experience the full power of FlowFuse with guided walkthroughs.'
    },
    'integrations': {
        title: 'Integration Marketplace',
        description: 'Our comprehensive integration marketplace with 200+ tools is coming soon.'
    }
};

// Initialize coming soon page if we're on that page
if (window.location.pathname.includes('coming-soon.html')) {
    const feature = getUrlParameter('feature');
    const data = comingSoonData[feature] || {
        title: 'Coming Soon',
        description: 'This feature is currently in development and will be available soon.'
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('coming-soon-title').textContent = data.title;
        document.getElementById('coming-soon-description').textContent = data.description;
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});