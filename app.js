// Global function for smooth scrolling
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('.header').offsetHeight || 70;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Helper function for buttons
function scrollToSection(sectionId) {
    smoothScrollTo(sectionId);
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation menu functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetId = href.replace('#', '');
            smoothScrollTo(targetId);
            
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Footer links functionality
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetId = href.replace('#', '');
            smoothScrollTo(targetId);
        });
    });
    
    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }
        
        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Call once on load
    }
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once on load
    
    // Stats counter animation
    let statsAnimated = false;
    const statsSection = document.querySelector('#home .hero-stats');
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-item h3');
        
        statNumbers.forEach(stat => {
            const finalText = stat.textContent;
            const number = parseInt(finalText.replace(/\D/g, ''));
            const suffix = finalText.replace(/\d/g, '');
            
            if (number > 0) {
                let current = 0;
                const increment = Math.ceil(number / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    stat.textContent = current + suffix;
                }, 30);
            }
        });
    }
    
    // Fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Apply fade-in to various elements
    const fadeElements = document.querySelectorAll('.service-card, .highlight-card, .leader-card, .about-content, .showcase-section');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });
    
    // Section headers fade-in
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        fadeObserver.observe(header);
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .highlight-card, .leader-card, .location-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
    
    // Location cards - click to open maps
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const locationName = this.querySelector('h4').textContent;
            const address = this.querySelector('p').textContent;
            const query = encodeURIComponent(`${locationName}, ${address}`);
            window.open(`https://www.google.com/maps/search/${query}`, '_blank');
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});