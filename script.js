document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionButton = document.getElementById('ignition-button');
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeOverlayBtn = document.querySelector('.close-overlay-btn');
    const memoryTimeline = document.getElementById('memory-timeline');
    const navArrows = document.querySelectorAll('.nav-arrow');
    const nextLevelBtns = document.querySelectorAll('.next-level-btn');
    const videoSectionParticles = document.getElementById('video-section-particles');
    const videoLyricStation = document.getElementById('video-lyric-station');

    // --- Loading Sequence ---
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        displayCoDriverCue("System initiated. Ready for pilot input.");
    }, 3000); // 3 seconds loading

    function displayCoDriverCue(message) {
        coDriverCue.textContent = message;
        coDriverDisplay.style.opacity = '1';
        coDriverCue.style.opacity = '1';
        coDriverCue.style.animation = 'none'; // Reset animation
        void coDriverCue.offsetWidth; // Trigger reflow
        coDriverCue.style.animation = 'textAppear 1s forwards';
        setTimeout(() => {
            coDriverDisplay.style.opacity = '0';
            coDriverCue.style.opacity = '0';
        }, 5000); // Co-driver message visible for 5 seconds
    }

    // --- Level Transitions ---
    function showLevel(levelId) {
        document.querySelectorAll('.level-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(levelId).classList.remove('hidden');
        // Specific cues for each level
        if (levelId === 'level-0') {
            displayCoDriverCue("Welcome, Pilot. Press the ignition.");
        } else if (levelId === 'level-1') {
            displayCoDriverCue("Initiating Artwork Wall. Observe carefully.");
        } else if (levelId === 'level-2') {
            displayCoDriverCue("Entering Memory Lane. Navigate with care.");
            // Ensure timeline is scrolled to start on level entry
            memoryTimeline.scrollLeft = 0;
        } else if (levelId === 'level-music-video') {
            displayCoDriverCue("Activating Audio-Visual Module. Prepare for sonic input.");
            // Add particles for music video section
            createParticles(videoSectionParticles, 50);
            startLyricTypingEffect();
        } else if (levelId === 'hidden-heart-message-section') {
            displayCoDriverCue("Final destination reached. Prepare for Heart Message protocol.");
            createParticles(document.querySelector('#hidden-heart-message-section .particle-background'), 100);
        }
    }

    // Initial Level
    showLevel('level-0');

    // --- Event Listeners ---
    ignitionButton.addEventListener('click', () => {
        showLevel('level-1');
        displayCoDriverCue("Engine ignited. Proceed to Level 1.");
    });

    nextLevelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLevel = btn.dataset.target;
            showLevel(targetLevel);
        });
    });

    // --- Artwork Reveal Logic ---
    if (artworkFrame) {
        artworkFrame.addEventListener('click', () => {
            artworkFrame.classList.add('revealed');
            setTimeout(() => {
                artworkOverlay.classList.add('visible');
            }, 500); // Show overlay after artwork reveal animation
        });
    }

    if (closeOverlayBtn) {
        closeOverlayBtn.addEventListener('click', () => {
            artworkOverlay.classList.remove('visible');
            artworkFrame.classList.remove('revealed'); // Reset artwork state
        });
    }

    // --- Memory Timeline Navigation ---
    if (memoryTimeline) {
        navArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const scrollAmount = memoryTimeline.querySelector('.memory-item').offsetWidth + 30; // Item width + margin
                if (arrow.classList.contains('left')) {
                    memoryTimeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    memoryTimeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        });
    }

    // --- Particle Effects (for music video and heart message sections) ---
    function createParticles(container, count) {
        container.innerHTML = ''; // Clear existing particles
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 3 + 1; // 1px to 4px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`; // Random color
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random();
            particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out forwards`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(particle);
        }
    }

    // Add particle styles to the head (for dynamic particle creation)
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 5px currentColor;
        }
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);


    // --- Lyric Typing Effect (for music video section) ---
    const lyrics = [
        "This is the world I imagine with you...",
        "A place where every moment shines bright.",
        "Filled with laughter, joy, and endless light.",
        "Happy Birthday, my dear Shiroo!"
    ];
    let lyricIndex = 0;
    let charIndex = 0;
    let typingTimeout;

    function typeLyric() {
        if (lyricIndex < lyrics.length) {
            if (charIndex < lyrics[lyricIndex].length) {
                videoLyricStation.textContent += lyrics[lyricIndex].charAt(charIndex);
                charIndex++;
                typingTimeout = setTimeout(typeLyric, 50); // Typing speed
            } else {
                setTimeout(() => {
                    videoLyricStation.textContent = ''; // Clear for next lyric
                    charIndex = 0;
                    lyricIndex++;
                    typeLyric();
                }, 2000); // Pause before next lyric
            }
        } else {
            lyricIndex = 0; // Loop lyrics
            setTimeout(() => {
                videoLyricStation.textContent = '';
                charIndex = 0;
                typeLyric();
            }, 2000);
        }
    }

    function startLyricTypingEffect() {
        videoLyricStation.textContent = ''; // Clear any initial text
        lyricIndex = 0;
        charIndex = 0;
        clearTimeout(typingTimeout); // Clear any previous timeouts
        typeLyric();
    }
});
