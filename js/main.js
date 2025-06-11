// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Smooth scroll for navigation links
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

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            return;
        }

        if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Enhanced animation handling
    animateOnScroll();
});

// Enhanced animation handling
const animateOnScroll = () => {
    const sections = document.querySelectorAll('.skills-section, .experience-section, .contributions-section');
    const skillItems = document.querySelectorAll('.skill-item');
    const experienceItems = document.querySelectorAll('.experience-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const contributionTexts = document.querySelectorAll('.contribution-text');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe sections
    sections.forEach(section => observer.observe(section));

    // Observe skill items with staggered animation
    skillItems.forEach((item, index) => {
        item.dataset.index = index;
        observer.observe(item);
    });

    // Observe experience items
    experienceItems.forEach(item => observer.observe(item));

    // Observe gallery items
    galleryItems.forEach(item => observer.observe(item));

    // Observe contribution texts
    contributionTexts.forEach(item => observer.observe(item));
};

// Re-run animations on window resize to handle responsive layout changes
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        animateOnScroll();
    }, 250);
});

// Add smooth scroll behavior to the entire page
document.documentElement.style.scrollBehavior = 'smooth'; 