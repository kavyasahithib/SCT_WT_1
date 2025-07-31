document.addEventListener('DOMContentLoaded', () => {

    // --- Get DOM Elements ---
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const backToTopButton = document.querySelector('#back-to-top');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // --- Helper function to close the mobile menu ---
    const closeMobileMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    };

    // --- Hamburger Menu Toggle ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // --- Close Menu When a Link is Clicked ---
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // --- Intersection Observer for Scroll Animations & Active Link Highlighting ---
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Handle active link highlighting
            if (entry.isIntersecting && entry.target.classList.contains('content-section')) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active-link', link.getAttribute('href') === `#${sectionId}`);
                });
            }

            // Handle content animations
            if (entry.isIntersecting && entry.target.classList.contains('section-content')) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections for link highlighting and all content wrappers for animation
    sections.forEach(section => observer.observe(section));
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


    // --- Combined Scroll Listener for Header & Back-to-Top Button ---
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Header style change
        header.classList.toggle('scrolled', scrollPosition > 50);

        // Back to Top button visibility
        backToTopButton.classList.toggle('visible', scrollPosition > 300);
    });
});