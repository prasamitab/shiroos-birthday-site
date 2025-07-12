document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const ignitionButton = document.getElementById('ignition-button');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');

    const artworkImg = document.querySelector('.artwork-img');
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeArtworkOverlayBtn = document.querySelector('#artwork-overlay .close-overlay-btn');

    const memoryTimeline = document.getElementById('memory-timeline');
    const prevArrow = document.querySelector('.memory-timeline-wrapper .nav-arrow.left');
    const nextArrow = document.querySelector('.memory-timeline-wrapper .nav-arrow.right');

    const videoLyricStation = document.getElementById('video-lyric-station');
    const videoLyricText = "This is the world I imagine with you...";


    // Hide loading screen after a short delay
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        showLevel('level-0', "Hello Shiroo! Ready for a special drive?");
    }, 2000); // 2 second loading screen

    function showCoDriverCue(message) {
        coDriverCue.textContent = message;
        coDriverDisplay.classList.add('active');
        setTimeout(() => {
            coDriverDisplay.classList.remove('active');
        }, 5000); // Cue disappears after 5 seconds
    }

    function showLevel(targetLevelId, cueMessage = "") {
        document.querySelectorAll('.level-section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        const targetLevel = document.getElementById(targetLevelId);
        if (targetLevel) {
            targetLevel.classList.remove('hidden');
            // Trigger reflow to ensure transition plays
            void targetLevel.offsetWidth;
            targetLevel.classList.add('active');
            if (cueMessage) {
                showCoDriverCue(cueMessage);
            }
            // Specific actions for levels
            if (targetLevelId === 'level-music-video') {
                typeVideoLyric(); // Start typing effect for video lyrics
            }
        }
    }

    // Level 0: Ignition
    ignitionButton.addEventListener('click', () => {
        showLevel('level-1', "Engine ignited! Let's check out the first pitstop.");
    });

    // Level 1: Artwork Wall
    artworkFrame.addEventListener('click', () => {
        artworkImg.classList.add('unblurred');
        showCoDriverCue("💬 Designed by your favorite artist & copilot.");
        artworkOverlay.classList.add('show'); // Show the new overlay
    });

    closeArtworkOverlayBtn.addEventListener('click', () => {
        artworkOverlay.classList.remove('show');
        artworkImg.classList.remove('unblurred'); // Re-blur if you want, or keep unblurred
    });

    // Level 2: Memory Lane Navigation
    if (memoryTimeline && prevArrow && nextArrow) {
        nextArrow.addEventListener('click', () => {
            memoryTimeline.scrollBy({ left: memoryTimeline.offsetWidth, behavior: 'smooth' });
        });
        prevArrow.addEventListener('click', () => {
            memoryTimeline.scrollBy({ left: -memoryTimeline.offsetWidth, behavior: 'smooth' });
        });
    }

    // Generic Next Level Buttons
    document.querySelectorAll('.next-level-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetLevelId = event.target.dataset.target;
            let cue = "";
            if (targetLevelId === 'level-2') {
                cue = "Time for a trip down memory lane. Swipe to see more!";
            } else if (targetLevelId === 'level-music-video') {
                cue = "Next up, a special performance just for you!";
            } else if (targetLevelId === 'hidden-heart-message-section') {
                cue = "You've reached the final destination. Prepare for a heartfelt message!";
            }
            showLevel(targetLevelId, cue);
        });
    });

    // Function for lyric typing effect
    function typeVideoLyric() {
        let charIndex = 0;
        videoLyricStation.textContent = ''; // Clear content before typing
        const typingInterval = setInterval(() => {
            if (charIndex < videoLyricText.length) {
                videoLyricStation.textContent += videoLyricText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 60); // Adjust speed
    }
});