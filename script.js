/**
 * Portfolio Website JavaScript
 * Features: Mobile menu, smooth scroll, form validation, animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions when DOM is fully loaded
    initMobileMenu();
    initSmoothScroll();
    initProjectFilters();
    initFormValidation();
    initScrollAnimation();
    initActiveNavHighlight();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Project Filtering System
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // Reset animation to enable re-animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        // Apply staggered animation
                        const delay = Array.from(projectCards).indexOf(card) * 0.1;
                        card.style.animation = `fadeIn 0.6s ease-out ${delay}s forwards`;
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Contact Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.textContent = '');
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Validate form fields
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                document.getElementById('nameError').textContent = 'Please enter your name';
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
                isValid = false;
            }
            
            // Email validation
            if (!emailInput.value.trim()) {
                document.getElementById('emailError').textContent = 'Please enter your email';
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Subject validation
            if (subjectInput && !subjectInput.value.trim()) {
                document.getElementById('subjectError').textContent = 'Please enter a subject';
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                document.getElementById('messageError').textContent = 'Please enter your message';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                const formSuccess = document.getElementById('formSuccess');
                
                // Display loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission with a timeout
                setTimeout(() => {
                    contactForm.reset();
                    formSuccess.style.display = 'block';
                    formSuccess.textContent = 'Your message has been sent successfully!';
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }
}

/**
 * Email validation helper function
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Scroll Animation using Intersection Observer
 */
function initScrollAnimation() {
    // Elements to animate on scroll
    const elements = document.querySelectorAll('.about-content, .projects-grid, .contact-content, .section-title');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Once the animation has run, no need to observe anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1, // 10% of the item is visible
            rootMargin: '0px 0px -50px 0px' // Adjust based on when you want the animation to trigger
        });
        
        elements.forEach(element => {
            element.classList.add('will-animate');
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        elements.forEach(element => {
            element.classList.add('animate');
        });
    }
    
    // Animate skill bars when about section is visible
    const skillLevels = document.querySelectorAll('.skill-level');
    const aboutSection = document.querySelector('.about');
    
    if (aboutSection && skillLevels.length) {
        const skillObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                skillLevels.forEach((skill, index) => {
                    const delay = index * 0.2;
                    skill.style.transitionDelay = `${delay}s`;
                    skill.style.transform = 'scaleX(1)';
                });
                skillObserver.unobserve(aboutSection);
            }
        }, {
            threshold: 0.2
        });
        
        skillObserver.observe(aboutSection);
    }
}

/**
 * Active Navigation Link Highlighting based on scroll position
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset;
            const headerOffset = 100; // Adjust based on your header height
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerOffset;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    }
}

/**
 * Add CSS class to style on scroll
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

/**
 * Add no-scroll class for CSS to prevent body scrolling when mobile menu is open
 */
document.body.classList.add('js-enabled');
