// common.js - Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality (for index.html)
    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");
    const navigationItems = document.querySelectorAll(".navigation a");
    
    if (menuBtn && navigation) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
        });
        
        navigationItems.forEach((navigationItem) => {
            navigationItem.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                navigation.classList.remove("active");
            });
        });
    }
    
    // Navigation Effects
    window.addEventListener("scroll", function(){
        const header = document.querySelector("header");
        if (header) {
            header.classList.toggle("sticky", window.scrollY > 0);
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip if it's a link to a different page
            if (this.getAttribute('href').includes('.html')) return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({offset: 0});
    }
    
    // Form submission (for contact form)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Music persistence across pages
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic && window.musicPlayer) {
        // Check if music was playing before navigation
        const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
        const currentTime = parseFloat(sessionStorage.getItem('musicTime') || 0);
        
        if (wasPlaying && backgroundMusic.currentTime === 0) {
            backgroundMusic.currentTime = currentTime;
            backgroundMusic.play().then(() => {
                const playPauseBtn = document.getElementById('playPauseBtn');
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }
            }).catch(console.error);
        }
        
        // Save state before leaving page
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('musicPlaying', !backgroundMusic.paused);
            sessionStorage.setItem('musicTime', backgroundMusic.currentTime);
            sessionStorage.setItem('musicVolume', backgroundMusic.volume);
        });
    }
});
