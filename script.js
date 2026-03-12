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
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// ==================== TYPEWRITER ====================
const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const texts = [
        'Computer Hardware Technician',
        'Web Developer',
        'IT Support Specialist'
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

// ==================== MUSIC PLAYER - FIXED VERSION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Music player initializing...');
    
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
    
    // Check if all elements exist
    if (!audio) {
        console.error('Audio element not found!');
        return;
    }
    
    console.log('Audio element found:', audio);
    console.log('Audio source:', audio.querySelector('source')?.src || audio.src);
    
    // Playlist - using your actual file
    const playlist = [
        { 
            title: 'TIKI TIKI (Slowed)', 
            artist: 'Unique Vibes',
            src: 'audio/TIKI TIKI (Slowed) - Unique Vibes.mp3' 
        }
    ];
    
    let currentTrack = 0;
    let isPlaying = false;
    
    // Load the track
    function loadTrack(index) {
        if (!playlist[index]) return;
        
        const track = playlist[index];
        console.log('Loading track:', track.title);
        
        // Set source directly
        audio.src = track.src;
        audio.load();
        
        if (musicTitle) musicTitle.textContent = track.title;
        if (musicArtist) musicArtist.textContent = track.artist;
    }
    
    // Load first track
    loadTrack(0);
    
    // Play/Pause function
    function togglePlay() {
        console.log('Toggle play clicked. Audio paused?', audio.paused);
        
        if (audio.paused) {
            audio.play()
                .then(() => {
                    console.log('Playback started successfully');
                    isPlaying = true;
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(error => {
                    console.error('Playback failed:', error);
                    alert('Cannot play audio. File might be missing or format not supported.\n\nMake sure the file exists at: audio/TIKI TIKI (Slowed) - Unique Vibes.mp3');
                });
        } else {
            audio.pause();
            isPlaying = false;
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    // Event Listeners
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            // Just restart current track if only one song
            audio.currentTime = 0;
            if (!audio.paused) {
                audio.play();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Restart current track if only one song
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
            
            // Update volume icon
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
        console.log('Audio metadata loaded, duration:', audio.duration);
        if (durationEl) {
            durationEl.textContent = formatTime(audio.duration);
        }
    });
    
    // Error handling
    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Error code:', audio.error ? audio.error.code : 'unknown');
        console.error('Error message:', audio.error ? audio.error.message : 'unknown');
        
        let errorMsg = 'Audio file error. ';
        if (audio.error) {
            switch(audio.error.code) {
                case 1: errorMsg += 'User aborted.'; break;
                case 2: errorMsg += 'Network error.'; break;
                case 3: errorMsg += 'Decoding error.'; break;
                case 4: errorMsg += 'File not found or unsupported format.'; break;
                default: errorMsg += 'Unknown error.';
            }
        }
        alert(errorMsg + '\n\nMake sure the file exists at: audio/TIKI TIKI (Slowed) - Unique Vibes.mp3');
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
    
    console.log('Music player initialized successfully');
});

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
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});
