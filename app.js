// app.js - Modernized with React-like components
class PortfolioApp {
    constructor() {
        this.components = {
            ThemeManager: new ThemeManager(),
            Navigation: new Navigation(),
            TypeWriter: new TypeWriter(),
            Animator: new Animator(),
            ContactForm: new ContactForm(),
            PortfolioFilter: new PortfolioFilter()
        };
        
        this.init();
    }
    
    init() {
        // Initialize all components
        Object.values(this.components).forEach(component => {
            if (component.init) component.init();
        });
        
        // Add intersection observer for animations
        this.setupIntersectionObserver();
        
        // Add smooth scrolling
        this.setupSmoothScrolling();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Close mobile menu if open
                    if (this.components.Navigation) {
                        this.components.Navigation.closeMobileMenu();
                    }
                }
            });
        });
    }
}

// Component Classes
class ThemeManager {
    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.applyTheme();
        this.setupEventListeners();
    }
    
    applyTheme() {
        if (this.currentTheme === 'light') {
            document.body.classList.add('light-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('light-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', this.currentTheme);
            this.applyTheme();
        });
    }
}

class Navigation {
    init() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.mobileMenuBtn.innerHTML = this.navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    }
    
    closeMobileMenu() {
        this.navLinks.classList.remove('active');
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

class TypeWriter {
    init() {
        this.typewriterEl = document.getElementById('typewriter');
        this.texts = [
            'Computer Hardware Technician',
            'Web Developer',
            'IT Support Specialist',
            'Problem Solver'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.typewriterEl.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.typewriterEl.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            setTimeout(() => this.isDeleting = true, 1500);
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        const speed = this.isDeleting ? 50 : 100;
        setTimeout(() => this.type(), speed);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out'
    });
    
    // Initialize the portfolio app
    window.portfolioApp = new PortfolioApp();
    
    // Initialize counters
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
    
    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
});
