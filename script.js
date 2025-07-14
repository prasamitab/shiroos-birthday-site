document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionStartButton = document.getElementById('ignition-start-button'); // This was in your original HTML
    const ignitionButton = document.getElementById('ignition-button'); // Original START THE JOURNEY button (on level-0)
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeOverlayBtns = document.querySelectorAll('.close-overlay-btn');
    const memoryTimeline = document.getElementById('memory-timeline');
    const navArrows = document.querySelectorAll('.nav-arrow');
    const nextLevelBtns = document.querySelectorAll('.next-level-btn');
    const videoLyricStation = document.getElementById('video-lyric-station');
    const backgroundMusic = document.getElementById('background-music');
    const fuelFill = document.getElementById('fuel-fill');

    // Quiz Elements
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizNextLevelBtn = document.getElementById('quiz-next-level-btn');

    // Hug Button and Overlay
    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');
    const hugMessageText = document.getElementById('hug-message-text'); // Get reference to the message text span

    // Audio elements for final message
    const birthdayAudio = document.getElementById('birthday-audio');

    let currentFuel = 100; // Starting fuel percentage
    let currentLevel = 'level-0'; // Keep track of the current active level

    // --- Loading Screen ---
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        if (backgroundMusic) {
            backgroundMusic.play().catch(e => console.error("Error playing background music:", e));
        }
        displayCoDriverCue("Welcome, Co-Driver. Are you ready for an unforgettable journey?");
        ignitionButton.classList.remove('hidden'); // Show START THE JOURNEY button
    }, 3000);

    // --- Co-Driver Display ---
    function displayCoDriverCue(message, duration = 4000) {
        coDriverCue.textContent = '';
        coDriverCue.style.animation = 'none';
        void coDriverCue.offsetWidth;
        coDriverCue.style.animation = 'typewriter 2s steps(40, end) forwards';
        coDriverCue.textContent = message;

        // Automatically hide the cue after a duration, unless it's a button prompt
        if (!message.includes("IGNITE THE ENGINE")) { // Keep this logic if you want IGNITE THE ENGINE to persist
            setTimeout(() => {
                coDriverCue.textContent = '';
            }, duration);
        }
    }

    // --- Navigation & Level Management (Original Logic Preserved) ---
    function showLevel(levelId) {
        const currentLevelElement = document.getElementById(currentLevel);
        if (currentLevelElement) {
            currentLevelElement.classList.add('hidden');
            currentLevelElement.classList.remove('active');
        }

        const nextLevelElement = document.getElementById(levelId);
        if (nextLevelElement) {
            nextLevelElement.classList.remove('hidden');
            nextLevelElement.classList.add('active');
            currentLevel = levelId;

            // Specific actions for certain levels, as per your original structure
            if (levelId === 'level-1-intro') { // This was in your original script
                typewriterEffect("Our journey begins with the raw power of the engine. Here are some of the forces that drive you: resilience, curiosity, and an unyielding spirit.");
                hugButton.classList.remove('hidden'); // Show hug button on this level
            } else if (levelId === 'level-4-video') { // This was in your original script
                startLyricTypingEffect();
                const celebrationVideo = document.getElementById('celebration-video');
                if (celebrationVideo) {
                    celebrationVideo.play();
                }
            } else if (levelId === 'level-final-message') { // This was in your original script
                if (birthdayAudio) {
                    birthdayAudio.play().catch(e => console.error("Error playing birthday audio:", e));
                }
            }
        }
        updateFuel(-5); // Consume fuel for each level transition
    }

    // "START THE JOURNEY" button on Level 0
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            displayCoDriverCue("Systems online. Initiating pre-flight checks.");
            ignitionButton.classList.add('hidden');
            ignitionStartButton.classList.remove('hidden'); // This button was in your original HTML, so keep its logic
        });
    }

    // "IGNITE THE ENGINE" button (Original to level-1-intro)
    if (ignitionStartButton) {
        ignitionStartButton.addEventListener('click', () => {
            showLevel('level-1-intro'); // Go to the level-1-intro as per your original
            displayCoDriverCue("Engine ignited. Get ready to accelerate!");
            ignitionStartButton.classList.add('hidden');
        });
    }

    nextLevelBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetLevel = event.target.dataset.target;
            showLevel(targetLevel);
        });
    });

    // --- Fuel System ---
    function updateFuel(amount) {
        currentFuel = Math.max(0, Math.min(100, currentFuel + amount));
        fuelFill.style.height = `${currentFuel}%`;
        fuelFill.style.backgroundColor = `hsl(${currentFuel * 1.2}, 100%, 50%)`;
        document.getElementById('fuel-level').textContent = `${currentFuel}%`;

        if (currentFuel <= 20) {
            displayCoDriverCue("Warning: Fuel critically low! Consider a pit stop.");
        }
        if (currentFuel === 0) {
            displayCoDriverCue("Emergency stop! Fuel depleted. Journey halted.");
        }
    }

    // --- Artwork Display (Level 1 Visual) ---
    const artworks = [
        { src: 'images/artwork1.jpg', caption: '"The road ahead is always exciting."' },
        { src: 'images/artwork2.jpg', caption: '"Navigating new paths."' },
        { src: 'images/artwork3.jpg', caption: '"Speeding towards dreams."' }
    ];
    let currentArtworkIndex = 0;

    function showNextArtwork() {
        currentArtworkIndex = (currentArtworkIndex + 1) % artworks.length;
        artworkFrame.querySelector('img').src = artworks[currentArtworkIndex].src;
        document.getElementById('artwork-caption').textContent = artworks[currentArtworkIndex].caption;
    }

    setInterval(showNextArtwork, 5000);

    // --- Overlay Close Buttons (for artwork & hug overlays) ---
    closeOverlayBtns.forEach(button => {
        button.addEventListener('click', () => {
            artworkOverlay.classList.add('hidden');
            hugOverlay.classList.add('hidden'); // Close hug overlay too
            const overlayVideo = document.getElementById('overlay-artwork-video');
            if (overlayVideo) {
                overlayVideo.pause();
            }
        });
    });

    // --- Memory Timeline (Level 3 Timeline) ---
    let currentMemoryIndex = 0;
    const memoryItems = document.querySelectorAll('.memory-item');

    function showMemory(index) {
        memoryItems.forEach((item, i) => {
            item.classList.remove('active-memory');
            item.style.transform = `translateX(${-index * 100}%)`;
        });
        if (memoryItems[index]) {
            memoryItems[index].classList.add('active-memory');
        }
    }

    navArrows.forEach(arrow => {
        arrow.addEventListener('click', (event) => {
            if (event.target.classList.contains('left-arrow')) {
                currentMemoryIndex = Math.max(0, currentMemoryIndex - 1);
            } else {
                currentMemoryIndex = Math.min(memoryItems.length - 1, currentMemoryIndex + 1);
            }
            showMemory(currentMemoryIndex);
            updateFuel(-2);
        });
    });

    memoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.src;
            const type = item.dataset.type;
            const overlayImg = document.getElementById('overlay-artwork-img');
            const overlayVideo = document.getElementById('overlay-artwork-video');

            if (type === 'image') {
                overlayImg.src = src;
                overlayImg.classList.remove('hidden');
                overlayVideo.classList.add('hidden');
            } else if (type === 'video') {
                overlayVideo.src = src;
                overlayVideo.classList.remove('hidden');
                overlayVideo.play();
                overlayImg.classList.add('hidden');
            }
            artworkOverlay.classList.remove('hidden');
        });
    });

    showMemory(currentMemoryIndex);

    // --- Quiz Logic (Level 2 Quiz) ---
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            const selectedFuel = document.querySelector('input[name="fuel"]:checked');
            if (selectedFuel) {
                if (selectedFuel.value === 'all-above') {
                    quizFeedback.textContent = "Correct! All these truly fuel your amazing journey. Fuel tank recharged!";
                    quizFeedback.style.color = '#00FFC0';
                    updateFuel(20);
                    quizNextLevelBtn.classList.remove('hidden');
                } else {
                    quizFeedback.textContent = "Not quite! While important, there's something more comprehensive. Try again!";
                    quizFeedback.style.color = '#FF4500';
                    updateFuel(-10);
                    quizNextLevelBtn.classList.add('hidden');
                }
            } else {
                quizFeedback.textContent = "Please select an answer!";
                quizFeedback.style.color = '#FFD700';
                quizNextLevelBtn.classList.add('hidden');
            }
            quizFeedback.classList.remove('hidden');
        });
    }

    // --- Typewriter Effect for Level 1 Intro (Original function preserved) ---
    function typewriterEffect(text, elementId = 'level-1-intro-text') {
        const element = document.getElementById(elementId);
        if (!element) return;

        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        type();
    }

    // --- Video Lyrics Station (Level 4 Video) ---
    const lyrics = [
        "Every moment with you is a cherished memory,",
        "You light up my world, endlessly.",
        "Through every turn, my co-driver true,",
        "My heart beats only for you.",
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
                typingTimeout = setTimeout(typeLyric, 50);
            } else {
                setTimeout(() => {
                    videoLyricStation.textContent = '';
                    charIndex = 0;
                    lyricIndex++;
                    typeLyric();
                }, 2000);
            }
        } else {
            lyricIndex = 0;
            setTimeout(() => {
                videoLyricStation.textContent = '';
                charIndex = 0;
                typeLyric();
            }, 2000);
        }
    }

    function startLyricTypingEffect() {
        videoLyricStation.textContent = '';
        lyricIndex = 0;
        charIndex = 0;
        clearTimeout(typingTimeout);
        typeLyric();
    }

    // --- Healing Toolkit / Hug Logic ---
    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            // FIX: Set the message text content here
            hugMessageText.textContent = "Virtual hug generated and sent successfully! 💛";
            displayCoDriverCue("Virtual hug initiated. Recharge complete.");
        });
    }
});
