// music-player.js - Enhanced version
class MusicPlayer {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isPlaying = false;
        this.isExpanded = false;
        this.currentTime = 0;
        this.duration = 0;
        
        this.initialize();
    }
    
    initialize() {
        this.createPlayerElements();
        this.setupAudio();
        this.setupEventListeners();
        this.setupMediaQueries();
    }
    
    createPlayerElements() {
        // Create music player container
        const container = document.createElement('div');
        container.className = 'music-player-container';
        container.innerHTML = `
            <div class="playlist" id="playlist">
                <div class="playlist-item active" data-src="MONTAGEM ALQUIMIA.mp3">
                    <div class="title">MONTAGEM ALQUIMIA</div>
                    <div class="duration">2:45</div>
                </div>
                <div class="playlist-item" data-src="teserbgmusic.mp3">
                    <div class="title">Teser Background</div>
                    <div class="duration">3:20</div>
                </div>
            </div>
            
            <div class="music-player ${this.isMobile ? 'mobile' : ''}" id="musicPlayer">
                <div class="music-info">
                    <div class="music-title" id="musicTitle">MONTAGEM ALQUIMIA</div>
                    <div class="music-artist">Janaka Heshan</div>
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
        `;
        
        document.getElementById('music-player-container').appendChild(container);
        
        // Store references
        this.musicPlayer = document.getElementById('musicPlayer');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.playlistBtn = document.getElementById('playlistBtn');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.musicToggle = document.getElementById('musicToggle');
        this.playlist = document.getElementById('playlist');
        this.musicTitle = document.getElementById('musicTitle');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.progress = document.getElementById('progress');
        this.progressBar = document.getElementById('progressBar');
        
        // Create volume control
        this.createVolumeControl();
    }
    
    createVolumeControl() {
        const volumeControl = document.createElement('div');
        volumeControl.className = 'volume-control';
        volumeControl.innerHTML = `
            <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.5">
        `;
        this.musicPlayer.appendChild(volumeControl);
        this.volumeSlider = document.getElementById('volumeSlider');
    }
    
    setupAudio() {
        this.audio = document.getElementById('backgroundMusic');
        if (!this.audio) {
            this.audio = new Audio();
            this.audio.src = 'MONTAGEM ALQUIMIA.mp3';
            this.audio.volume = 0.5;
            document.body.appendChild(this.audio);
        }
        
        this.playlistItems = document.querySelectorAll('.playlist-item');
        
        // Update time displays
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.durationEl.textContent = this.formatTime(this.duration);
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
            this.currentTimeEl.textContent = this.formatTime(this.currentTime);
            const progressPercent = (this.currentTime / this.duration) * 100;
            this.progress.style.width = `${progressPercent}%`;
        });
        
        this.audio.addEventListener('ended', () => {
            this.playNext();
        });
    }
    
    setupEventListeners() {
        // Play/Pause
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        
        // Previous/Next
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());
        
        // Playlist toggle
        this.playlistBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlaylist();
        });
        
        // Volume control
        this.volumeBtn.addEventListener('click', () => {
            this.volumeSlider.classList.toggle('visible');
        });
        
        this.volumeSlider.addEventListener('input', (e) => {
            this.audio.volume = e.target.value;
            this.updateVolumeIcon(e.target.value);
        });
        
        // Music toggle (expand/collapse)
        this.musicToggle.addEventListener('click', () => this.togglePlayer());
        
        // Playlist item selection
        this.playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                const title = item.querySelector('.title').textContent;
                this.playTrack(src, title);
                
                // Update active state
                this.playlistItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Close playlist on mobile
                if (this.isMobile) {
                    this.playlist.classList.remove('visible');
                }
            });
        });
        
        // Progress bar click
        this.progressBar.addEventListener('click', (e) => {
            const rect = this.progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.duration;
        });
        
        // Close playlist when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.playlist.contains(e.target) && !this.playlistBtn.contains(e.target)) {
                this.playlist.classList.remove('visible');
            }
            
            if (this.volumeSlider && !this.volumeSlider.contains(e.target) && !this.volumeBtn.contains(e.target)) {
                this.volumeSlider.classList.remove('visible');
            }
        });
        
        // Touch events for mobile
        if (this.isMobile) {
            let touchStartX = 0;
            let touchStartY = 0;
            
            this.musicPlayer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });
            
            this.musicPlayer.addEventListener('touchmove', (e) => {
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                const deltaX = touchX - touchStartX;
                const deltaY = touchY - touchStartY;
                
                // Horizontal swipe for progress
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    e.preventDefault();
                    const progressPercent = (this.audio.currentTime / this.duration) + (deltaX / 500);
                    this.audio.currentTime = Math.max(0, Math.min(this.duration, progressPercent * this.duration));
                }
            });
        }
    }
    
    setupMediaQueries() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        const handleMediaChange = (e) => {
            this.isMobile = e.matches;
            if (this.isMobile) {
                this.musicPlayer.classList.add('mobile');
                this.musicPlayer.classList.remove('expanded');
                this.isExpanded = false;
            } else {
                this.musicPlayer.classList.remove('mobile');
            }
        };
        
        mediaQuery.addEventListener('change', handleMediaChange);
    }
    
    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            
            // Show player on mobile when playing
            if (this.isMobile && !this.isExpanded) {
                this.musicPlayer.classList.add('expanded');
                this.isExpanded = true;
            }
        } else {
            this.audio.pause();
            this.isPlaying = false;
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    playTrack(src, title) {
        this.audio.src = src;
        this.audio.play();
        this.isPlaying = true;
        this.musicTitle.textContent = title;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Update metadata
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            this.durationEl.textContent = this.formatTime(this.duration);
        }, { once: true });
    }
    
    playNext() {
        const activeItem = document.querySelector('.playlist-item.active');
        const nextItem = activeItem.nextElementSibling || this.playlistItems[0];
        
        if (nextItem) {
            const src = nextItem.getAttribute('data-src');
            const title = nextItem.querySelector('.title').textContent;
            this.playTrack(src, title);
            
            this.playlistItems.forEach(item => item.classList.remove('active'));
            nextItem.classList.add('active');
        }
    }
    
    playPrevious() {
        const activeItem = document.querySelector('.playlist-item.active');
        const prevItem = activeItem.previousElementSibling || this.playlistItems[this.playlistItems.length - 1];
        
        if (prevItem) {
            const src = prevItem.getAttribute('data-src');
            const title = prevItem.querySelector('.title').textContent;
            this.playTrack(src, title);
            
            this.playlistItems.forEach(item => item.classList.remove('active'));
            prevItem.classList.add('active');
        }
    }
    
    togglePlaylist() {
        this.playlist.classList.toggle('visible');
        
        // On mobile, collapse player when opening playlist
        if (this.isMobile && this.playlist.classList.contains('visible')) {
            this.musicPlayer.classList.remove('expanded');
            this.isExpanded = false;
        }
    }
    
    togglePlayer() {
        if (this.isMobile) {
            // On mobile, toggle expanded state
            this.isExpanded = !this.isExpanded;
            this.musicPlayer.classList.toggle('expanded', this.isExpanded);
        } else {
            // On desktop, toggle minimized state
            this.musicPlayer.classList.toggle('minimized');
        }
    }
    
    updateVolumeIcon(volume) {
        let icon = 'fa-volume-up';
        if (volume == 0) icon = 'fa-volume-mute';
        else if (volume < 0.5) icon = 'fa-volume-down';
        
        this.volumeBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization to ensure all elements are loaded
    setTimeout(() => {
        window.musicPlayer = new MusicPlayer();
        
        // Store user preference for music player
        const musicPreference = localStorage.getItem('musicPlayerEnabled');
        if (musicPreference === 'false') {
            document.querySelector('.music-player-container').style.display = 'none';
        }
        
        // Add option to disable music player
        const disableBtn = document.createElement('button');
        disableBtn.className = 'music-disable-btn';
        disableBtn.innerHTML = '<i class="fas fa-times"></i>';
        disableBtn.title = 'Disable music player';
        disableBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('.music-player-container').style.display = 'none';
            localStorage.setItem('musicPlayerEnabled', 'false');
        });
        
        document.querySelector('.music-player-container').appendChild(disableBtn);
    }, 1000);
});
