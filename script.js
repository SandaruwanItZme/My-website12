// ==================== MUSIC PLAYER ====================
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.isPlaying = false;
        this.isExpanded = false;
        this.currentTrackIndex = 0;
        
        // YOUR SIMPLE SONG NAMES HERE
        this.playlist = [
            { title: 'Track 1', artist: 'Janaka Heshan', src: 'abc.mp3' },
            { title: 'Track 2', artist: 'Janaka Heshan', src: 'xyz.mp3' }
        ];
        
        this.init();
    }
    
    init() {
        if (!this.audio) {
            console.error('Audio element not found');
            return;
        }
        
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
            if (this.durationEl) {
                this.durationEl.textContent = this.formatTime(this.audio.duration);
            }
        });
        
        this.audio.addEventListener('timeupdate', () => {
            if (this.currentTimeEl) {
                this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
            }
            if (this.progress && this.audio.duration) {
                const progressPercent = (this.audio.currentTime / this.audio.duration) * 100;
                this.progress.style.width = `${progressPercent}%`;
            }
        });
        
        this.audio.addEventListener('ended', () => {
            this.playNext();
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            if (this.musicTitle) {
                this.musicTitle.textContent = 'File not found';
            }
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
            this.audio.play().catch(err => {
                console.log('Auto-play prevented:', err);
            });
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
                    
                    // Auto play when selecting from playlist
                    if (this.audio.paused) {
                        this.togglePlay();
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
            this.audio.play().catch(err => {
                console.log('Play failed:', err);
            });
        }
    }
    
    togglePlay() {
        if (!this.audio) return;
        
        if (this.audio.paused) {
            this.audio.play().catch(err => {
                console.log('Play failed:', err);
                alert('Music files not found! Please make sure abc.mp3 and xyz.mp3 are in the same folder.');
            });
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
        
        // Auto play
        if (this.audio.paused) {
            this.togglePlay();
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
        
        // Auto play
        if (this.audio.paused) {
            this.togglePlay();
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
        if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}
