// music-player.js
class MusicPlayer {
    constructor() {
        this.musicPlayer = document.querySelector('.music-player');
        this.musicToggle = document.getElementById('musicToggle');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.musicInfo = document.querySelector('.music-info');
        this.playlist = [];
        this.currentTrackIndex = 0;
        
        this.initializePlayer();
    }
    
    initializePlayer() {
        if (!this.backgroundMusic) return;
        
        // Initialize playlist with default track
        this.playlist = [
            {
                src: 'MONTAGEM ALQUIMIA - SLOWED_spotdown.org.mp3',
                title: 'MONTAGEM ALQUIMIA'
            }
            // Add more tracks here in the future
            // Example:
            // {
            //     src: 'music2.mp3',
            //     title: 'Background Music 2'
            // }
        ];
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load first track
        this.loadTrack(this.currentTrackIndex);
        
        // Attempt auto-play
        this.attemptAutoPlay();
    }
    
    setupEventListeners() {
        // Toggle music player expand/collapse
        if (this.musicToggle) {
            this.musicToggle.addEventListener('click', () => {
                this.musicPlayer.classList.toggle('collapsed');
            });
        }
        
        // Play/Pause functionality
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => {
                this.togglePlayPause();
            });
        }
        
        // Volume control
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', () => {
                this.backgroundMusic.volume = this.volumeSlider.value;
            });
        }
        
        // Track ended - play next
        if (this.backgroundMusic) {
            this.backgroundMusic.addEventListener('ended', () => {
                this.playNext();
            });
        }
        
        // Global click to initialize audio (for autoplay policies)
        document.addEventListener('click', () => {
            if (this.backgroundMusic.paused) {
                this.attemptAutoPlay();
            }
        }, { once: true });
    }
    
    loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;
        
        this.currentTrackIndex = index;
        const track = this.playlist[index];
        
        this.backgroundMusic.src = track.src;
        if (this.musicInfo) {
            this.musicInfo.textContent = track.title;
        }
        
        // Preload the next track for smoother transitions
        if (index + 1 < this.playlist.length) {
            const nextTrack = new Audio();
            nextTrack.src = this.playlist[index + 1].src;
            nextTrack.preload = 'auto';
        }
    }
    
    togglePlayPause() {
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.play();
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            this.backgroundMusic.pause();
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    playNext() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack(nextIndex);
        this.backgroundMusic.play();
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    playPrevious() {
        const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(prevIndex);
        this.backgroundMusic.play();
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    attemptAutoPlay() {
        if (!this.backgroundMusic) return;
        
        const playPromise = this.backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                this.showPlayPrompt();
            });
        }
    }
    
    showPlayPrompt() {
        if (this.musicInfo) {
            this.musicInfo.textContent = 'Click to play music';
            this.musicInfo.style.cursor = 'pointer';
            
            const playHandler = () => {
                this.backgroundMusic.play();
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.musicInfo.textContent = this.playlist[this.currentTrackIndex].title;
                this.musicInfo.style.cursor = 'default';
                this.musicInfo.removeEventListener('click', playHandler);
            };
            
            this.musicInfo.addEventListener('click', playHandler);
        }
    }
    
    addTrack(src, title) {
        this.playlist.push({ src, title });
        console.log(`Track added: ${title}`);
    }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});
