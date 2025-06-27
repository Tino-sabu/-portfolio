// Mobile Portfolio JavaScript

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nav-link');
const form = document.getElementById('projectInquiryForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

// Mobile Menu Toggle
function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileNav.classList.add('active');
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Form handling
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.classList.add('loading');
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.classList.remove('loading');
    }
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('clientName').trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.get('clientEmail').trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(formData.get('clientEmail'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('projectName').trim()) {
        errors.push('Project name is required');
    }
    
    if (!formData.get('projectDescription').trim()) {
        errors.push('Project description is required');
    } else if (formData.get('projectDescription').trim().length < 20) {
        errors.push('Project description should be at least 20 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showMessage(errors.join('. '), 'error');
        return;
    }
    
    setLoadingState(true);
    
    try {
        // Simulate form submission (replace with actual email service)
        await simulateFormSubmission(formData);
        
        showMessage('Thank you! Your project inquiry has been sent successfully. I\'ll get back to you soon!', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.', 'error');
    } finally {
        setLoadingState(false);
    }
});

// Simulate form submission (replace with actual email service integration)
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulated error'));
            }
        }, 2000);
    });
}

// EmailJS Configuration
function initEmailJS() {
    // Replace with your EmailJS public key
    emailjs.init("fnc31xCnM8QWq64QS");
}

// Form validation
function validateFormData(data) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.clientName || !data.clientName.trim()) {
        errors.push('Name is required');
    }
    
    if (!data.clientEmail || !data.clientEmail.trim()) {
        errors.push('Email is required');
    } else if (!emailRegex.test(data.clientEmail.trim())) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.projectName || !data.projectName.trim()) {
        errors.push('Project name is required');
    }
    
    if (!data.projectDescription || !data.projectDescription.trim()) {
        errors.push('Project description is required');
    } else if (data.projectDescription.trim().length < 20) {
        errors.push('Project description should be at least 20 characters long');
    }
    
    return errors;
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Send email using EmailJS
async function sendEmailWithEmailJS(formData) {
    const templateParams = {
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        project_name: formData.projectName,
        project_description: formData.projectDescription,
        to_email: 'tinosabu2117@gmail.com',
        from_name: formData.clientName,
        reply_to: formData.clientEmail,
        date: new Date().toLocaleDateString()
    };
    
    return emailjs.send(
        'service_hq8sqbe',      // service ID
        'template_d35zrlr',     // template ID
        templateParams
    );
}

// Main form handler
function initContactForm() {
    const form = document.getElementById('projectInquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !submitBtn) {
        console.error('Form or submit button not found');
        return;
    }
    
    console.log('Form handler initialized'); // Debug log
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submitted'); // Debug log
        
        const formData = new FormData(form);
        const data = {
            clientName: formData.get('clientName'),
            clientEmail: formData.get('clientEmail'),
            projectName: formData.get('projectName'),
            projectDescription: formData.get('projectDescription')
        };
        
        console.log('Form data:', data); // Debug log
        
        // Validate form data
        const errors = validateFormData(data);
        if (errors.length > 0) {
            showFormMessage(errors.join('. '), 'error');
            return;
        }
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded');
            }
            
            // Send email using EmailJS
            await sendEmailWithEmailJS(data);
            
            showFormMessage('Thank you! Your project inquiry has been sent successfully. I\'ll get back to you soon!', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Email sending failed:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly at tinosabu2117@gmail.com', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing form...'); // Debug log
    
    // Check if EmailJS script is loaded
    if (typeof emailjs !== 'undefined') {
        initEmailJS();
    } else {
        console.warn('EmailJS library not found. Make sure to include EmailJS script in your HTML.');
    }
    
    initContactForm();
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }
});

// Skills animation on scroll
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('skill-animate');
    });
}

// Intersection observer for skills section
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillTags();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project card hover effects for mobile
function addMobileCardEffects() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .contact-card');
    
    cards.forEach(card => {
        // Add touch start effect
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        // Remove touch effect
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Initialize mobile effects
if ('ontouchstart' in window) {
    addMobileCardEffects();
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'mobileMenuBtn',
        'mobileNav',
        'projectInquiryForm',
        'submitBtn',
        'formMessage'
    ];
    
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Element with ID '${id}' not found`);
        }
    });
}

// Initialize error handling
handleMissingElements();

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to interactive elements
    const mobileMenuButton = document.getElementById('mobileMenuBtn');
    if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
    
    // Update ARIA states
    const updateAriaStates = () => {
        const isMenuOpen = mobileNav.classList.contains('active');
        if (mobileMenuButton) {
            mobileMenuButton.setAttribute('aria-expanded', isMenuOpen.toString());
        }
    };
    
    // Listen for menu state changes
    const menuObserver = new MutationObserver(updateAriaStates);
    if (mobileNav) {
        menuObserver.observe(mobileNav, { attributes: true, attributeFilter: ['class'] });
    }
}

// Initialize accessibility improvements
improveAccessibility();

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('Mobile portfolio JavaScript loaded successfully!');