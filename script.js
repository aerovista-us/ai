// AeroVista - Unified JavaScript
// Modern, professional functionality for all pages

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    setupAnimations();
    setupFAQ();
    setupSmoothScrolling();
});

// Initialize Page
function initializePage() {
    console.log('AeroVista page loaded successfully');
    
    // Add loading animation
    document.body.classList.add('fade-in');
    
    // Initialize tooltips if any
    initializeTooltips();
    
    // Initialize counters if any
    initializeCounters();
}

// Setup Event Listeners
function setupEventListeners() {
    // Button click tracking
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Track button clicks for analytics
            trackButtonClick(buttonText, this.href || 'no-href');
        });
    });
    
    // Card hover effects
    document.querySelectorAll('.card, .product-card, .bundle-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

// Setup Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .product-card, .bundle-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Setup FAQ Functionality
function setupFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('i');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherIcon = item.querySelector('.faq-question i');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Tooltips
function initializeTooltips() {
    // Add tooltip functionality if needed
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Initialize Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .result-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        if (target > 0) {
            animateCounter(counter, target);
        }
    });
}

// Animate Counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on original content
        const originalText = element.textContent;
        if (originalText.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (originalText.includes('K')) {
            element.textContent = Math.floor(current) + 'K';
        } else if (originalText.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Track Button Click
function trackButtonClick(buttonText, href) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'Button',
            event_label: buttonText,
            value: href
        });
    }
    
    // Console logging for development
    console.log('Analytics: Button clicked', {
        text: buttonText,
        href: href,
        timestamp: new Date().toISOString()
    });
}

// Handle Form Submission
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Thank you for your submission! We\'ll get back to you soon.', 'success');
    
    // Reset form
    form.reset();
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Show Tooltip
function showTooltip(element) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.getAttribute('data-tooltip');
    
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Show tooltip
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

// Hide Tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    }, 100));
}

// Initialize scroll to top button
addScrollToTopButton();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .scroll-to-top:hover {
        background: #764ba2;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Purchase Product Function
function purchaseProduct(productName, price) {
    // Track the purchase attempt
    trackButtonClick(`Purchase ${productName}`, `purchase-${productName.toLowerCase().replace(/\s+/g, '-')}`);
    
    // Show purchase confirmation
    showNotification(`Redirecting to purchase ${productName} for $${price}...`, 'success');
    
    // In a real implementation, this would redirect to a payment processor
    // For now, we'll show a modal or redirect to a checkout page
    setTimeout(() => {
        // This would be replaced with actual payment processing
        showNotification(`Purchase successful! You will receive ${productName} via email within 5 minutes.`, 'success');
    }, 2000);
}

// Export functions for global use
window.AeroVista = {
    trackButtonClick,
    showNotification,
    scrollToTop,
    debounce,
    throttle,
    purchaseProduct
};

// UX Enhancements - Added by UX Enhancer
function enhanceUserExperience() {
    // Add loading states to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Buy Now') || this.textContent.includes('Get Started')) {
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.classList.add('loading');
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators for keyboard navigation
    const style = document.createElement('style');
    style.textContent = 
        .keyboard-navigation *:focus {
            outline: 2px solid #667eea !important;
            outline-offset: 2px !important;
        }
    ;
    document.head.appendChild(style);
    
    // Add accessibility improvements
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(btn => {
        if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', 'Action button');
        }
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = 'position: absolute; top: -40px; left: 6px; background: #000; color: #fff; padding: 8px; text-decoration: none; z-index: 1000;';
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize enhancements when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceUserExperience);
} else {
    enhanceUserExperience();
}

// Advanced UX Features
class UXManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupKeyboardNavigation();
        this.setupFormValidation();
        this.setupPerformanceMonitoring();
        this.setupAccessibilityEnhancements();
    }
    
    setupIntersectionObserver() {
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
        
        document.querySelectorAll('.card, .product-card, .bundle-card, .feature-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateForm(form);
            });
        });
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
                input.classList.add('success');
            }
        });
        
        if (isValid) {
            this.showNotification('Form submitted successfully!', 'success');
        } else {
            this.showNotification('Please fill in all required fields', 'error');
        }
    }
    
    setupPerformanceMonitoring() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log('Page loaded in ' + loadTime.toFixed(2) + 'ms');
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow, consider optimization');
            }
        });
        
        let interactionCount = 0;
        document.addEventListener('click', () => {
            interactionCount++;
            if (interactionCount > 10) {
                console.log('High user engagement detected');
            }
        });
    }
    
    setupAccessibilityEnhancements() {
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(btn => {
            if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', 'Action button');
            }
        });
        
        this.addSkipLinks();
        this.enhanceFocusManagement();
    }
    
    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = 'position: absolute; top: -40px; left: 6px; background: #000; color: #fff; padding: 8px; text-decoration: none; z-index: 1000; transition: top 0.3s ease;';
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    enhanceFocusManagement() {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        
        focusableElements.forEach(el => {
            el.addEventListener('focus', (e) => {
                e.target.style.outline = '2px solid #667eea';
                e.target.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', (e) => {
                e.target.style.outline = 'none';
            });
        });
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification notification-' + type;
        notification.textContent = message;
        
        notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: ' + (type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db') + '; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 1000; animation: slideInRight 0.3s ease; max-width: 300px;';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

class PurchaseManager {
    constructor() {
        this.cart = [];
        this.init();
    }
    
    init() {
        this.setupPurchaseButtons();
        this.setupCartManagement();
    }
    
    setupPurchaseButtons() {
        document.querySelectorAll('[onclick*="purchaseProduct"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
                const price = btn.getAttribute('onclick').match(/(\d+)\)/)[1];
                this.addToCart(productName, parseInt(price));
            });
        });
    }
    
    addToCart(productName, price) {
        this.cart.push({ name: productName, price: price });
        this.showNotification('Added ' + productName + ' to cart!', 'success');
        this.updateCartUI();
    }
    
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }
    }
    
    getTotal() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UXManager();
    new PurchaseManager();
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Buy Now') || this.textContent.includes('Get Started')) {
                const originalText = this.textContent;
                this.textContent = 'Processing...';
                this.disabled = true;
                this.classList.add('loading');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.remove('skeleton');
        });
        
        if (!img.complete) {
            img.classList.add('skeleton');
        }
    });
});

window.AeroVistaUX = {
    UXManager,
    PurchaseManager
};
