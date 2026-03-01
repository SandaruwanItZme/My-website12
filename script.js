// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out'
    });
});

// ==================== THEME MANAGER ====================
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.setupEventListeners();
    }
    
    applyTheme() {
        if (this.currentTheme === 'light') {
            document.body.classList.add('light-mode');
            if (this.themeToggle) {
                this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            document.body.classList.remove('light-mode');
            if (this.themeToggle) {
                this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
    
    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
                localStorage.setItem('theme', this.currentTheme);
                this.applyTheme();
            });
        }
    }
}

// ==================== NAVIGATION ====================
class Navigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');
        this.init();
    }
    
    init() {
        if (!this.mobileMenuBtn || !this.navLinks) return;
        
        this.setupEventListeners();
        this.setActiveLink();
    }
    
    setupEventListeners() {
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close menu when clicking a link
        const links = this.navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', () => this.setActiveLink());
    }
    
    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.innerHTML = this.navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        }
    }
    
    closeMobileMenu() {
        this.navLinks.classList.remove('active');
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// ==================== TYPEWRITER ====================
class TypeWriter {
    constructor() {
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
        this.init();
    }
    
    init() {
        if (!this.typewriterEl) return;
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

// ==================== PORTFOLIO FILTER ====================
class PortfolioFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }
    
    init() {
        if (!this.filterBtns.length) return;
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                this.portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
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
    }
}

// ==================== CONTACT FORM ====================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.form.reset();
        });
    }
}

// ==================== MUSIC PLAYER ====================
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.isPlaying = false;
        this.isExpanded = false;
        this.currentTrackIndex = 0;
        
        this.playlist = [
            { title: 'MONTAGEM ALQUIMIA', artist: 'Janaka Heshan', src: 'MONTAGEM ALQUIMIA.mp3' },
            { title: 'Teser Background', artist: 'Janaka Heshan', src: 'teserbgmusic.mp3' }
        ];
        
        this.init();
    }
    
    init() {
        if (!this.audio) return;
        
        this.createPlayer();
        this.setupAudio();
        this.setupEventListeners();
    }
    
    createPlayer() {
        const container = document.getElementById('music-player-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="music-player-container">
                <div class="playlist" id="playlist">
                    ${this.playlist.map((track, index) => `
                        <div class="playlist-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <div class="title">${track.title}</div>
                            <div class="artist" style="font-size:0.7rem; color:var(--text-secondary)">${track.artist}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="music-player ${window.innerWidth <= 768 ? 'mobile-collapsed' : ''}" id="musicPlayer">
                    <div class="music-info">
                        <div class="music-title" id="musicTitle">${this.playlist[0].title}</div>
                        <div class="music-artist" id="musicArtist">${this.playlist[0].artist}</div>
                        <div class="music-progress">
                            <div class="progress-bar" id="progressBar">
                                <div class="progress" id="progress"></div>
                            </div>
                            <div class="time">
                                <span id="currentTime">0:00</span>
                                <span id="duration">0:00</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="music-controls">
                        <button class="music-btn" id="prevBtn">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button class="music-btn" id="playPauseBtn">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="music-btn" id="nextBtn">
                            <i class="fas fa-step-forward"></i>
                        </button>
                        <button class="music-btn" id="playlistBtn">
                            <i class="fas fa-list"></i>
                        </button>
                        <button class="music-btn" id="volumeBtn">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                </div>
                
                <button class="music-toggle" id="musicToggle">
                    <i class="fas fa-music"></i>
                </button>
                
                <div class="volume-control" id="volumeControl">
                    <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.5">
                </div>
                
                <button class="music-disable-btn" id="musicDisableBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Store references
        this.musicPlayer = document.getElementById('musicPlayer');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.playlistBtn = document.getElementById('playlistBtn');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.musicToggle = document.getElementById('musicToggle');
        this.musicDisableBtn = document.getElementById('musicDisableBtn');
        this.playlistEl = document.getElementById('playlist');
        this.volumeControl = document.getElementById('volumeControl');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.musicTitle = document.getElementById('musicTitle');
        this.musicArtist = document.getElementById('musicArtist');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.progress = document.getElementById('progress');
        this.progressBar = document.getElementById('progressBar');
        this.playlistItems = document.querySelectorAll('.playlist-item');
    }
    
    setupAudio() {
        if (!this.audio) return;
        
        // Load first track
        this.loadTrack(0);
        
        // Update time displays
        this.audio.addEventListener('loadedmetadata', () => {
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
            if (this.progress) {
                this.progress.style.width = `${progressPercent}%`;
            }
        });
        
        this.audio.addEventListener('ended', () => {
            this.playNext();
        });
        
        // Load saved state
        const savedTime = sessionStorage.getItem('musicTime');
        const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
        const savedVolume = sessionStorage.getItem('musicVolume');
        
        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }
        
        if (savedVolume) {
            this.audio.volume = parseFloat(savedVolume);
            if (this.volumeSlider) {
                this.volumeSlider.value = savedVolume;
            }
        }
        
        if (wasPlaying) {
            this.audio.play().catch(() => {});
            this.isPlaying = true;
            if (this.playPauseBtn) {
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }
    }
    
    setupEventListeners() {
        if (!this.audio) return;
        
        // Play/Pause
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        }
        
        // Previous/Next
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.playPrevious());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.playNext());
        }
        
        // Playlist toggle
        if (this.playlistBtn && this.playlistEl) {
            this.playlistBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playlistEl.classList.toggle('visible');
            });
        }
        
        // Volume control
        if (this.volumeBtn && this.volumeControl) {
            this.volumeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.volumeControl.classList.toggle('visible');
            });
        }
        
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.audio.volume = e.target.value;
                this.updateVolumeIcon(e.target.value);
            });
        }
        
        // Music toggle (expand/collapse on mobile)
        if (this.musicToggle && this.musicPlayer) {
            this.musicToggle.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.musicPlayer.classList.toggle('mobile-collapsed');
                }
            });
        }
        
        // Disable music player
        if (this.musicDisableBtn) {
            this.musicDisableBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.music-player-container').style.display = 'none';
                localStorage.setItem('musicPlayerEnabled', 'false');
                this.audio.pause();
            });
        }
        
        // Playlist item selection
        if (this.playlistItems) {
            this.playlistItems.forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.getAttribute('data-index'));
                    this.loadTrack(index);
                    
                    // Update active state
                    this.playlistItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    // Close playlist
                    if (this.playlistEl) {
                        this.playlistEl.classList.remove('visible');
                    }
                });
            });
        }
        
        // Progress bar click
        if (this.progressBar) {
            this.progressBar.addEventListener('click', (e) => {
                const rect = this.progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                this.audio.currentTime = percent * this.audio.duration;
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (this.playlistEl && !this.playlistEl.contains(e.target) && !this.playlistBtn?.contains(e.target)) {
                this.playlistEl.classList.remove('visible');
            }
            
            if (this.volumeControl && !this.volumeControl.contains(e.target) && !this.volumeBtn?.contains(e.target)) {
                this.volumeControl.classList.remove('visible');
            }
        });
        
        // Save state before leaving
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('musicPlaying', !this.audio.paused);
            sessionStorage.setItem('musicTime', this.audio.currentTime);
            sessionStorage.setItem('musicVolume', this.audio.volume);
        });
    }
    
    loadTrack(index) {
        if (!this.audio || !this.playlist[index]) return;
        
        this.currentTrackIndex = index;
        const track = this.playlist[index];
        
        this.audio.src = track.src;
        this.audio.load();
        
        if (this.musicTitle) {
            this.musicTitle.textContent = track.title;
        }
        if (this.musicArtist) {
            this.musicArtist.textContent = track.artist;
        }
        
        // Auto-play if was playing
        if (this.isPlaying) {
            this.audio.play().catch(() => {});
        }
    }
    
    togglePlay() {
        if (!this.audio) return;
        
        if (this.audio.paused) {
            this.audio.play();
            this.isPlaying = true;
            if (this.playPauseBtn) {
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        } else {
            this.audio.pause();
            this.isPlaying = false;
            if (this.playPauseBtn) {
                this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }
    
    playNext() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack(nextIndex);
        
        // Update active state in playlist
        if (this.playlistItems) {
            this.playlistItems.forEach((item, i) => {
                item.classList.toggle('active', i === nextIndex);
            });
        }
    }
    
    playPrevious() {
        const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(prevIndex);
        
        // Update active state
        if (this.playlistItems) {
            this.playlistItems.forEach((item, i) => {
                item.classList.toggle('active', i === prevIndex);
            });
        }
    }
    
    updateVolumeIcon(volume) {
        if (!this.volumeBtn) return;
        
        let icon = 'fa-volume-up';
        if (volume == 0) icon = 'fa-volume-mute';
        else if (volume < 0.5) icon = 'fa-volume-down';
        
        this.volumeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new ThemeManager();
    new Navigation();
    new TypeWriter();
    new PortfolioFilter();
    new ContactForm();
    
    // Initialize counters
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        
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
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                bar.style.width = `${width}%`;
                observer.unobserve(bar);
            }
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
    
    // Initialize music player if enabled
    const musicEnabled = localStorage.getItem('musicPlayerEnabled') !== 'false';
    if (musicEnabled) {
        setTimeout(() => {
            new MusicPlayer();
        }, 500);
    }
});
