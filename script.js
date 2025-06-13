// Global state
let currentNav = 'dashboard';

// DOM Elements
const sidebar = document.querySelector('.sidebar');
const mainContentWrapper = document.querySelector('.main-content-wrapper');
const workspaceDropdown = document.getElementById('workspaceDropdown');
const userMenuDropdown = document.getElementById('userMenuDropdown');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setActiveNavItem();
});

// Event Listeners
function initializeEventListeners() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-profile-dropdown')) {
            workspaceDropdown.classList.remove('show');
        }
        if (!event.target.closest('.user-menu-dropdown')) {
            userMenuDropdown.classList.remove('show');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            workspaceDropdown.classList.remove('show');
            userMenuDropdown.classList.remove('show');
        }
    });

    // Search input focus handling
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // Add hover effects to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add click handlers for quick action buttons
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 300);
            
            // Handle action (placeholder)
            console.log('Quick action clicked:', this.textContent.trim());
        });
    });

    // Add animation to FuseAI button
    const fuseaiBtn = document.querySelector('.fuseai-btn');
    if (fuseaiBtn) {
        fuseaiBtn.addEventListener('click', function() {
            const aiIndicator = this.querySelector('.ai-indicator');
            if (aiIndicator) {
                aiIndicator.style.animation = 'none';
                setTimeout(() => {
                    aiIndicator.style.animation = 'pulse 2s infinite';
                }, 100);
            }
            
            // Placeholder for AI assistant functionality
            console.log('FuseAI Assistant activated');
        });
    }
}

// Toggle workspace dropdown
function toggleWorkspaceDropdown() {
    workspaceDropdown.classList.toggle('show');
    userMenuDropdown.classList.remove('show');
}

// Toggle user menu dropdown
function toggleUserMenu() {
    userMenuDropdown.classList.toggle('show');
    workspaceDropdown.classList.remove('show');
}

// Toggle sidebar (mobile)
function toggleSidebar() {
    sidebar.classList.toggle('show');
    sidebar.classList.toggle('collapsed');
    mainContentWrapper.classList.toggle('sidebar-collapsed');
}

// Set active navigation item
function setActiveNav(element) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    element.classList.add('active');
    
    // Update current nav state
    currentNav = element.getAttribute('data-nav');
    
    // Add visual feedback
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 100);
    
    // Update content based on navigation (placeholder)
    updateContentForNav(currentNav);
}

// Set initial active nav item
function setActiveNavItem() {
    const activeNav = document.querySelector(`[data-nav="${currentNav}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Update content based on navigation (placeholder function)
function updateContentForNav(navType) {
    console.log('Navigating to:', navType);
    
    // Placeholder: In a real application, this would update the main content
    // based on the selected navigation item
    
    // Example: Update breadcrumbs
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    if (breadcrumbCurrent) {
        const navLabels = {
            'dashboard': 'Dashboard',
            'projects': 'Projects',
            'tasks': 'Tasks',
            'calendar': 'Calendar',
            'reports': 'Reports',
            'integrations': 'Integrations',
            'settings': 'Settings'
        };
        breadcrumbCurrent.textContent = navLabels[navType] || 'Dashboard';
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
        sidebar.classList.remove('collapsed');
        mainContentWrapper.classList.remove('sidebar-collapsed');
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Notification handling
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications and ripple effects
const additionalStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    font-size: 0.875rem;
    max-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-error {
    border-left: 4px solid var(--destructive);
}

.notification-info {
    border-left: 4px solid #3b82f6;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-effect 0.3s ease-out;
    pointer-events: none;
}

@keyframes ripple-effect {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.loading {
    cursor: wait !important;
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Example usage of notifications (can be called from various actions)
// showNotification('Welcome to FlowFuse!', 'success');

// Performance optimization: Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    const debouncedSearch = debounce(function(query) {
        console.log('Searching for:', query);
        // Implement actual search functionality here
    }, 300);

    searchInput.addEventListener('input', function(e) {
        debouncedSearch(e.target.value);
    });
}