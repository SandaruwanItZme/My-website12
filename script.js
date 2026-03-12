// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme
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

// Close menu when clicking a link
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

// ==================== MUSIC PLAYER ====================
const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeBtn = document.getElementById('volumeBtn');
const volumeControl = document.getElementById('volumeControl');
const volumeSlider = document.getElementById('volumeSlider');
const musicTitle = document.getElementById('musicTitle');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const musicToggle = document.getElementById('musicToggle');
const musicPlayer = document.getElementById('musicPlayer');

// Playlist - YOUR SONGS HERE (example.mp3)
const playlist = [
    { title: 'Track 1', src: 'TIKI TIKI (Slowed) - Unique Vibes.mp3' },
    { title: 'Track 2', src: 'xyz.mp3' }
];

let currentTrack = 0;
let isPlaying = false;

// Load first track
function loadTrack(index) {
    if (!audio || !playlist[index]) return;
    
    audio.src = playlist[index].src;
    musicTitle.textContent = playlist[index].title;
    audio.load();
}

loadTrack(0);

// Play/Pause
function togglePlay() {
    if (audio.paused) {
        audio.play()
            .then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(err => {
                console.log('Play failed:', err);
                alert('Music files not found! Please add abc.mp3 and xyz.mp3');
            });
    } else {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playPauseBtn.addEventListener('click', togglePlay);

// Next track
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play().catch(() => {});
    }
}

nextBtn.addEventListener('click', nextTrack);

// Previous track
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) {
        audio.play().catch(() => {});
    }
}

prevBtn.addEventListener('click', prevTrack);

// Update time
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const current = audio.currentTime;
        const duration = audio.duration;
        
        currentTimeEl.textContent = formatTime(current);
        durationEl.textContent = formatTime(duration);
        
        const progressPercent = (current / duration) * 100;
        progress.style.width = progressPercent + '%';
    }
});

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Click on progress bar
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

// Volume control
volumeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    volumeControl.classList.toggle('visible');
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    updateVolumeIcon(e.target.value);
});

function updateVolumeIcon(volume) {
    let icon = 'fa-volume-up';
    if (volume == 0) icon = 'fa-volume-mute';
    else if (volume < 0.5) icon = 'fa-volume-down';
    volumeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
}

// Close volume control when clicking outside
document.addEventListener('click', (e) => {
    if (!volumeControl.contains(e.target) && !volumeBtn.contains(e.target)) {
        volumeControl.classList.remove('visible');
    }
});

// Mobile toggle
if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        musicPlayer.classList.toggle('mobile-collapsed');
    });
}

// Auto next when track ends
audio.addEventListener('ended', () => {
    nextTrack();
});

// Load saved state
const savedTime = sessionStorage.getItem('musicTime');
const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
const savedVolume = sessionStorage.getItem('musicVolume');

if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
}
if (savedVolume) {
    audio.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
    updateVolumeIcon(savedVolume);
}
if (wasPlaying) {
    audio.play().catch(() => {});
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Save state before leaving
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicPlaying', !audio.paused);
    sessionStorage.setItem('musicTime', audio.currentTime);
    sessionStorage.setItem('musicVolume', audio.volume);
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
