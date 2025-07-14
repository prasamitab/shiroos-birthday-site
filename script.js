document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionStartButton = document.getElementById('ignition-start-button');
    const ignitionButton = document.getElementById('ignition-button');
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeOverlayBtns = document.querySelectorAll('.close-overlay-btn');
    const memoryTimeline = document.getElementById('memory-timeline');
    const navArrows = document.querySelectorAll('.nav-arrow');
    const nextLevelBtns = document.querySelectorAll('.next-level-btn');
    const videoLyricStation = document.getElementById('video-lyric-station');
    const backgroundMusic = document.getElementById('background-music');
    const fuelFill = document.getElementById('fuel-fill');

    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizNextLevelBtn = document.getElementById('quiz-next-level-btn');

    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');
    const hugMessageText = document.getElementById('hug-message-text');

    const birthdayAudio = document.getElementById('birthday-audio');

    let currentFuel = 100;
    let currentLevel = 'level-0';

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        if (backgroundMusic) {
            backgroundMusic.play().catch(e => console.error("Error playing background music:", e));
        }
        displayCoDriverCue("Welcome, Co-Driver. Are you ready for an unforgettable journey?");
        ignitionButton.classList.remove('hidden');
    }, 3000);

    function displayCoDriverCue(message, duration = 4000) {
        coDriverCue.textContent = '';
        coDriverCue.style.animation = 'none';
        void coDriverCue.offsetWidth;
        coDriverCue.style.animation = 'typewriter 2s steps(40, end) forwards';
        coDriverCue.textContent = message;

        if (!message.includes("IGNITE THE ENGINE")) {
            setTimeout(() => {
                coDriverCue.textContent = '';
            }, duration);
        }
    }

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

            if (levelId === 'level-1-intro') {
                typewriterEffect("Our journey begins with the raw power of the engine. Here are some of the forces that drive you: resilience, curiosity, and an unyielding spirit.");
                hugButton.classList.remove('hidden');
            } else if (levelId === 'level-4-video') {
                startLyricTypingEffect();
                const celebrationVideo = document.getElementById('celebration-video');
                if (celebrationVideo) {
                    celebrationVideo.play();
                }
            } else if (levelId === 'level-final-message') {
                if (birthdayAudio) {
                    birthdayAudio.play().catch(e => console.error("Error playing birthday audio:", e));
                }
            }
        }
        updateFuel(-5);
    }

    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            displayCoDriverCue("Systems online. Initiating pre-flight checks.");
            ignitionButton.classList.add('hidden');
            ignitionStartButton.classList.remove('hidden');
        });
    }

    if (ignitionStartButton) {
        ignitionStartButton.addEventListener('click', () => {
            showLevel('level-1-intro');
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

    // Updated artwork array to use main-art.jpg for all entries
    const artworks = [
        { src: 'images/main-art.jpg', caption: '"The road ahead is always exciting."' },
        { src: 'images/main-art.jpg', caption: '"Navigating new paths."' },
        { src: 'images/main-art.jpg', caption: '"Speeding towards dreams."' }
    ];
    let currentArtworkIndex = 0;

    function showNextArtwork() {
        currentArtworkIndex = (currentArtworkIndex + 1) % artworks.length;
        artworkFrame.querySelector('img').src = artworks[currentArtworkIndex].src;
        document.getElementById('artwork-caption').textContent = artworks[currentArtworkIndex].caption;
    }

    setInterval(showNextArtwork, 5000);

    closeOverlayBtns.forEach(button => {
        button.addEventListener('click', () => {
            artworkOverlay.classList.add('hidden');
            hugOverlay.classList.add('hidden');
            const overlayVideo = document.getElementById('overlay-artwork-video');
            if (overlayVideo) {
                overlayVideo.pause();
            }
        });
    });

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

    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            hugMessageText.textContent = "Virtual hug generated and sent successfully! 💛";
            displayCoDriverCue("Virtual hug initiated. Recharge complete.");
        });
    }
});
