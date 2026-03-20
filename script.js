// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking login button or theme toggle
        if (!link.classList.contains('login-icon') && link.tagName !== 'BUTTON') {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// ==================== TYPEWRITER ====================
const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const texts = [
        'Computer Hardware Technician',
        'Web Developer',
        'IT Support Specialist',
        'Gaming Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    type();
}

// ==================== PORTFOLIO FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.count);
            let count = 0;
            const increment = target / 50;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    setTimeout(updateCount, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ==================== SKILL BARS ====================
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.dataset.width;
            bar.style.width = width + '%';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==================== GAMING TAB ANIMATIONS ====================
const gamingSection = document.getElementById('gaming');
const gamingTab = document.getElementById('gamingTab');

if (gamingTab) {
    gamingTab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Smooth scroll to gaming section
        gamingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add animation to gaming cards when they come into view
        setTimeout(() => {
            const gamingStats = document.querySelectorAll('.gaming-stat-card');
            gamingStats.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'slideUp 0.5s ease forwards';
                }, index * 100);
            });
        }, 500);
    });
}

// Animate gaming cards when they enter viewport
const gamingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.gaming-stat-card, .gaming-setup, .featured-games, .live-stream');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
            gamingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (gamingSection) {
    gamingObserver.observe(gamingSection);
}

// Set initial opacity for gaming cards
document.querySelectorAll('.gaming-stat-card, .gaming-setup, .featured-games, .live-stream').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
});

// ==================== LOGIN MODAL ====================
const loginIcon = document.getElementById('loginIcon');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginFormModal = document.getElementById('loginForm');

if (loginIcon && loginModal) {
    loginIcon.addEventListener('click', () => {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle login form submission
    if (loginFormModal) {
        loginFormModal.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginFormModal.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Welcome! You've successfully logged in as ${email}\n\nDemo mode - no actual authentication required.`);
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
                loginFormModal.reset();
                
                // Add success animation to login icon
                loginIcon.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    loginIcon.style.animation = '';
                }, 500);
            }
        });
    }
}

// ==================== ACTIVE NAVIGATION ====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                } else if (link.getAttribute('href') !== '#' && !link.classList.contains('login-icon')) {
                    link.classList.remove('active');
                }
            });
        }
    });
});

// ==================== MUSIC PLAYER WITH AUTOPLAY ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music player initializing with autoplay...');
    
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeControl = document.getElementById('volumeControl');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicTitle = document.getElementById('musicTitle');
    const musicArtist = document.getElementById('musicArtist');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progressBar');
    const musicToggle = document.getElementById('musicToggle');
    const musicPlayer = document.getElementById('musicPlayer');
    
    if (!audio) {
        console.error('Audio element not found!');
        return;
    }
    
    // Playlist - your actual song
    const playlist = [
        { 
            title: 'TIKI TIKI (Slowed)', 
            artist: 'Unique Vibes',
            src: 'audio/TIKI TIKI (Slowed) - Unique Vibes.mp3' 
        }
    ];
    
    let currentTrack = 0;
    let isPlaying = false;
    let autoplayAttempted = false;
    
    // Load the track
    function loadTrack(index) {
        if (!playlist[index]) return;
        
        const track = playlist[index];
        console.log('Loading track:', track.title);
        
        audio.src = track.src;
        audio.load();
        
        if (musicTitle) musicTitle.textContent = track.title;
        if (musicArtist) musicArtist.textContent = track.artist;
    }
    
    // Load first track
    loadTrack(0);
    
    // Play/Pause function
    function togglePlay() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    isPlaying = true;
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(error => {
                    console.error('Playback failed:', error);
                });
        } else {
            audio.pause();
            isPlaying = false;
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // ==================== AUTOPLAY FUNCTIONALITY ====================
    function attemptAutoplay() {
        if (autoplayAttempted) return;
        autoplayAttempted = true;
        
        console.log('Attempting autoplay...');
        
        // Set initial volume
        audio.volume = 0.4;
        
        // Try to play
        audio.play()
            .then(() => {
                console.log('Autoplay successful!');
                isPlaying = true;
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(error => {
                console.log('Autoplay blocked, showing play button');
                
                // Create floating play button
                const playButton = document.createElement('div');
                playButton.innerHTML = `
                    <div class="floating-play-btn">
                        <i class="fas fa-play"></i>
                        <span>Play Music</span>
                    </div>
                `;
                playButton.style.cssText = `
                    position: fixed;
                    bottom: 100px;
                    right: 100px;
                    z-index: 10000;
                    cursor: pointer;
                    animation: floatBtn 2s ease-in-out infinite;
                `;
                
                const btnInner = playButton.querySelector('.floating-play-btn');
                btnInner.style.cssText = `
                    background: var(--gradient, linear-gradient(135deg, #6c5ce7, #00cec9));
                    color: white;
                    padding: 12px 24px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    font-size: 14px;
                    box-shadow: 0 10px 30px rgba(108, 92, 231, 0.5);
                    transition: transform 0.3s ease;
                `;
                
                btnInner.addEventListener('mouseenter', () => {
                    btnInner.style.transform = 'scale(1.05)';
                });
                
                btnInner.addEventListener('mouseleave', () => {
                    btnInner.style.transform = 'scale(1)';
                });
                
                playButton.onclick = function() {
                    togglePlay();
                    this.remove();
                    
                    // Add animation style
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes floatBtn {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                    `;
                    document.head.appendChild(style);
                };
                
                document.body.appendChild(playButton);
                
                // Remove after 10 seconds if not clicked
                setTimeout(() => {
                    if (playButton.parentNode) {
                        playButton.style.opacity = '0';
                        playButton.style.transition = 'opacity 0.5s';
                        setTimeout(() => {
                            if (playButton.parentNode) playButton.remove();
                        }, 500);
                    }
                }, 10000);
            });
    }
    
    // Try autoplay after short delay
    setTimeout(attemptAutoplay, 500);
    
    // Also try on first user interaction
    const userInteractionEvents = ['click', 'scroll', 'touchstart', 'keydown'];
    userInteractionEvents.forEach(eventType => {
        document.addEventListener(eventType, function autoplayOnInteraction() {
            if (!isPlaying && !autoplayAttempted) {
                attemptAutoplay();
            }
            userInteractionEvents.forEach(e => {
                document.removeEventListener(e, autoplayOnInteraction);
            });
        }, { once: true });
    });
    
    // Event Listeners
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            audio.currentTime = 0;
            if (!audio.paused) {
                audio.play();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            audio.currentTime = 0;
            if (!audio.paused) {
                audio.play();
            }
        });
    }
    
    // Volume control
    if (volumeBtn && volumeControl && volumeSlider) {
        volumeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            volumeControl.classList.toggle('visible');
        });
        
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
            
            let icon = 'fa-volume-up';
            if (e.target.value == 0) icon = 'fa-volume-mute';
            else if (e.target.value < 0.5) icon = 'fa-volume-down';
            volumeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        });
    }
    
    // Progress bar
    if (progressBar && progress) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }
    
    // Time updates
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const current = audio.currentTime;
            const duration = audio.duration;
            
            if (currentTimeEl) {
                currentTimeEl.textContent = formatTime(current);
            }
            if (durationEl) {
                durationEl.textContent = formatTime(duration);
            }
            if (progress) {
                const percent = (current / duration) * 100;
                progress.style.width = percent + '%';
            }
        }
    });
    
    // Metadata loaded
    audio.addEventListener('loadedmetadata', () => {
        if (durationEl) {
            durationEl.textContent = formatTime(audio.duration);
        }
    });
    
    // Error handling
    audio.addEventListener('error', () => {
        console.log('Audio file not found. Please add your music file.');
    });
    
    // Format time helper
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Close volume control when clicking outside
    document.addEventListener('click', (e) => {
        if (volumeControl && !volumeControl.contains(e.target) && !volumeBtn?.contains(e.target)) {
            volumeControl.classList.remove('visible');
        }
    });
    
    // Mobile toggle
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener('click', () => {
            musicPlayer.classList.toggle('mobile-collapsed');
        });
    }
    
    console.log('Music player with autoplay initialized');
});

// ==================== ADDITIONAL ANIMATIONS ====================
// Add hover effect to gaming cards
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Portfolio with Gaming Hub initialized!');
