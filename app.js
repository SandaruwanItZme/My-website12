// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const texts = ['Hardware Technician', 'Web Developer', 'IT Specialist', 'Tech Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500); // Pause before next word
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typewriter after page loads
    setTimeout(typeWriter, 1000);

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Intersection Observer for stats
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Animate Skill Bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Observe skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would normally send the data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            // You can add AJAX submission here:
            /*
            fetch('send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                alert('Error sending message. Please try again.');
            });
            */
        });
    }

    // Enhanced Music Player
    class MusicPlayer {
        constructor() {
            this.audio = document.getElementById('backgroundMusic');
            this.playPauseBtn = document.getElementById('playPauseBtn');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.playlistBtn = document.getElementById('playlistBtn');
            this.musicToggle = document.getElementById('musicToggle');
            this.musicPlayer = document.getElementById('musicPlayer');
            this.playlist = document.getElementById('playlist');
            this.progressBar = document.getElementById('progressBar');
            this.progress = document.getElementById('progress');
            this.currentTimeElement = document.getElementById('currentTime');
            this.durationElement = document.getElementById('duration');
            this.musicTitle = document.getElementById('musicTitle');
            
            this.playlistItems = document.querySelectorAll('.playlist-item');
            this.currentTrack = 0;
            this.isPlaying = false;
            
            this.initializePlayer();
        }
        
        initializePlayer() {
            // Event Listeners
            this.playPauseBtn.addEventListener('click', () => this.togglePlay());
            this.prevBtn.addEventListener('click', () => this.prevTrack());
            this.nextBtn.addEventListener('click', () => this.nextTrack());
            this.playlistBtn.addEventListener('click', () => this.togglePlaylist());
            this.musicToggle.addEventListener('click', () => this.togglePlayer());
            
            // Playlist item clicks
            this.playlistItems.forEach((item, index) => {
                item.addEventListener('click', () => this.selectTrack(index));
            });
            
            // Progress bar click
            this.progressBar.addEventListener('click', (e) => this.seek(e));
            
            // Audio events
            this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
            this.audio.addEventListener('timeupdate', () => this.updateProgress());
            this.audio.addEventListener('ended', () => this.nextTrack());
            
            // Load saved state
            this.loadState();
            
            // Auto-play with user interaction
            document.addEventListener('click', () => {
                if (!this.hasInteracted) {
                    this.attemptAutoPlay();
                    this.hasInteracted = true;
                }
            }, { once: true });
        }
        
        togglePlay() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }
        
        play() {
            this.audio.play();
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            localStorage.setItem('musicPlaying', 'true');
        }
        
        pause() {
            this.audio.pause();
            this.isPlaying = false;
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            localStorage.setItem('musicPlaying', 'false');
        }
        
        prevTrack() {
            this.currentTrack = (this.currentTrack - 1 + this.playlistItems.length) % this.playlistItems.length;
            this.loadTrack(this.currentTrack);
            this.play();
        }
        
        nextTrack() {
            this.currentTrack = (this.currentTrack + 1) % this.playlistItems.length;
            this.loadTrack(this.currentTrack);
            this.play();
        }
        
        selectTrack(index) {
            this.currentTrack = index;
            this.loadTrack(index);
            this.play();
            this.updatePlaylistSelection();
        }
        
        loadTrack(index) {
            const track = this.playlistItems[index];
            const src = track.getAttribute('data-src');
            const title = track.querySelector('.title').textContent;
            
            this.audio.src = src;
            this.musicTitle.textContent = title;
            
            // Update playlist selection
            this.updatePlaylistSelection();
            
            // Save current track
            localStorage.setItem('currentTrack', index);
        }
        
        updatePlaylistSelection() {
            this.playlistItems.forEach((item, index) => {
                if (index === this.currentTrack) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
        
        togglePlaylist() {
            this.playlist.classList.toggle('visible');
        }
        
        togglePlayer() {
            this.musicPlayer.classList.toggle('hidden');
            this.musicToggle.classList.toggle('active');
        }
        
        updateDuration() {
            const duration = this.audio.duration;
            this.durationElement.textContent = this.formatTime(duration);
        }
        
        updateProgress() {
            const currentTime = this.audio.currentTime;
            const duration = this.audio.duration;
            
            if (duration) {
                const progressPercent = (currentTime / duration) * 100;
                this.progress.style.width = `${progressPercent}%`;
                this.currentTimeElement.textContent = this.formatTime(currentTime);
                
                // Save current time
                localStorage.setItem('musicTime', currentTime);
            }
        }
        
        seek(e) {
            const rect = this.progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
        }
        
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        attemptAutoPlay() {
            const playPromise = this.audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.play();
                }).catch(() => {
                    // Auto-play was prevented
                    console.log('Auto-play prevented. User interaction required.');
                });
            }
        }
        
        loadState() {
            // Load playing state
            const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
            const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
            const savedTrack = parseInt(localStorage.getItem('currentTrack')) || 0;
            
            // Load track
            this.currentTrack = savedTrack;
            this.loadTrack(savedTrack);
            
            // Restore time if audio was loaded
            this.audio.addEventListener('loadeddata', () => {
                if (savedTime > 0) {
                    this.audio.currentTime = savedTime;
                }
                
                // Restore play state
                if (wasPlaying) {
                    this.play();
                }
            }, { once: true });
        }
    }

    // Initialize Music Player
    const musicPlayer = new MusicPlayer();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function highlightNavLink() {
        let scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call

    // Preloader (Optional)
    window.addEventListener('load', function() {
        // Remove preloader if exists
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });

    // Add to Playlist Button (for future use)
    window.addToPlaylist = function(src, title, duration) {
        const playlist = document.getElementById('playlist');
        const newItem = document.createElement('div');
        newItem.className = 'playlist-item';
        newItem.setAttribute('data-src', src);
        newItem.innerHTML = `
            <div class="title">${title}</div>
            <div class="duration">${duration}</div>
        `;
        
        newItem.addEventListener('click', function() {
            const index = Array.from(playlist.children).indexOf(this) - 1;
            musicPlayer.selectTrack(index);
        });
        
        playlist.appendChild(newItem);
    };

    // Add this to your app.js to handle music persistence across pages
    window.addEventListener('beforeunload', function() {
        const audio = document.getElementById('backgroundMusic');
        if (audio) {
            localStorage.setItem('musicPlaying', !audio.paused);
            localStorage.setItem('musicTime', audio.currentTime);
            localStorage.setItem('musicVolume', audio.volume);
        }
    });
});
