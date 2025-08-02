
// Language switching functionality
let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent === lang.toUpperCase()) {
            btn.classList.add('active');
        }
    });
    
    // Update all elements with language attributes
    document.querySelectorAll('[data-en][data-sv]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (lang === 'sv') {
            element.textContent = element.getAttribute('data-sv');
        }
    });
}

// FAQ toggle functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });
    
    // If this wasn't active, open it
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
    } else {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
}

// Close mobile menu when clicking outside
function closeMobileMenuOutside(event) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (navMenu.classList.contains('active') && 
        !navbar.contains(event.target)) {
        closeMobileMenu();
    }
}

// Smooth scrolling for navigation links
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

// Add scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Add click events to mobile menu links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', closeMobileMenuOutside);
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Enhanced navbar scroll effect
    let scrolled = false;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50 && !scrolled) {
            navbar.style.background = 'rgba(16, 24, 40, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            scrolled = true;
        } else if (currentScroll <= 50 && scrolled) {
            navbar.style.background = 'rgba(16, 24, 40, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            scrolled = false;
        }
    });
    
    // Initialize carousel duplication for seamless loop
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const originalContent = carouselTrack.innerHTML;
        carouselTrack.innerHTML = originalContent + originalContent + originalContent;
    }
    
    // Add loading animations
    const elements = document.querySelectorAll('.feature-card, .testimonial-card, section');
    elements.forEach(element => {
        element.classList.add('loading');
    });
    
    // Trigger loading animations
    setTimeout(() => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.remove('loading');
                element.classList.add('loaded');
            }, index * 100);
        });
    }, 300);
    
    // Add touch gesture support for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (document.querySelector('.nav-menu').classList.contains('active')) {
            const touchY = e.touches[0].clientY;
            const touchX = e.touches[0].clientX;
            const diffY = touchStartY - touchY;
            const diffX = touchStartX - touchX;
            
            // Close menu on swipe left
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                closeMobileMenu();
            }
        }
    }, { passive: true });
});

// Add CSS for mobile menu styles
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        padding: 2rem 0;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 1rem 0;
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
}
`;

// Add the mobile menu styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
