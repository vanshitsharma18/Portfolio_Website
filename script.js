// Clean Portfolio JavaScript
class Portfolio {
    constructor() {
        this.currentSection = 'home';
        this.initializePortfolio();
    }

    initializePortfolio() {
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupContactForm();
        this.setupMobileMenu();
        this.animateOnLoad();
        this.addGlitchEffect();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.scrollToSection(targetSection);
                this.setActiveNav(link);
                
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });

        // Set initial active nav
        this.updateActiveNavOnScroll();
        window.addEventListener('scroll', () => {
            this.updateActiveNavOnScroll();
        });
    }

    setActiveNav(activeLink) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupSmoothScrolling() {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                if (targetId) {
                    document.getElementById(targetId)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Animate skill items and project cards on scroll
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-item, .project-card, .cert-badge').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            itemObserver.observe(el);
        });
    }

    setupContactForm() {
        const form = document.querySelector('.contact-form');
        const modal = document.getElementById('success-modal');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success modal
                    this.showModal(modal);
                    
                }, 1500);
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        }
    }

    showModal(modal) {
        if (modal) {
            modal.classList.add('show');
            
            // Auto-close after 3 seconds
            setTimeout(() => {
                this.hideModal(modal);
            }, 3000);
        }
    }

    hideModal(modal) {
        if (modal) {
            modal.classList.remove('show');
        }
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    closeMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    animateOnLoad() {
        // Animate hero elements
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButtons = document.querySelector('.hero-cta');
            
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
            
            if (heroButtons) {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }
        }, 300);

        // Animate floating icons
        this.animateFloatingIcons();
    }

    animateFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icons i');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }

    addGlitchEffect() {
        const numbers = document.querySelectorAll('.achievement-number');
        numbers.forEach(number => {
            number.addEventListener('mouseenter', () => {
                number.style.textShadow = '2px 0 var(--accent-color), -2px 0 #00ff00, 0 2px #0066ff';
                setTimeout(() => {
                    number.style.textShadow = '';
                }, 200);
            });
        });

        // Add hover effect to tech icons
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.boxShadow = '0 0 20px var(--accent-color)';
            });
            icon.addEventListener('mouseleave', () => {
                icon.style.boxShadow = '';
            });
        });
    }
}

// Utility functions
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
    }
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Optimize scroll events
    let ticking = false;
    function updateOnScroll() {
        // Add scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Enhanced animations
function setupEnhancedAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }

    // Stagger animation for skill items
    const skillCategories = document.querySelectorAll('.skill-category');
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });

    skillCategories.forEach(category => {
        categoryObserver.observe(category);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main portfolio functionality
    new Portfolio();
    
    // Setup additional optimizations
    setupPerformanceOptimizations();
    setupEnhancedAnimations();
    
    // Add CSS class for animations
    document.body.classList.add('loaded');
    
    console.log('🚀 Portfolio loaded successfully!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause expensive animations when tab is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Export for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Portfolio;
}

