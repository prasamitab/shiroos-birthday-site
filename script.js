document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    // Removed ignitionStartButton as it's no longer needed

    const fuelFill = document.getElementById('fuel-fill');
    const loveQuoteElement = document.getElementById('love-quote');
    const backgroundMusic = document.getElementById('background-music');
    const birthdayAudio = document.getElementById('birthday-audio');

    // Level elements (level-0 and ignitionButton removed)
    const level1 = document.getElementById('level-1');
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeArtworkOverlayBtn = artworkOverlay.querySelector('.close-overlay-btn');
    const levelQuiz = document.getElementById('level-quiz');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const level2 = document.getElementById('level-2');
    const memoryTimeline = document.getElementById('memory-timeline');
    const memoryNavLeft = document.querySelector('#level-2 .nav-arrow.left');
    const memoryNavRight = document.querySelector('#level-2 .nav-arrow.right');
    const levelQA = document.getElementById('level-qa');
    const qaCards = document.querySelectorAll('.qa-card');
    const qaInputs = document.querySelectorAll('.qa-input');
    const qaNextBtns = document.querySelectorAll('.qa-next-btn');
    const qaFinalMessage = document.getElementById('qa-final-message');
    const levelMusicVideo = document.getElementById('level-music-video');
    const musicVideoPlayer = document.getElementById('music-video');
    const videoLyricStation = document.getElementById('video-lyric-station');
    const levelHealingToolkit = document.getElementById('level-healing-toolkit');
    const fuelNeedle = document.getElementById('fuel-needle');
    const tempNeedle = document.getElementById('temp-needle');
    const fuelReading = document.getElementById('fuel-reading');
    const tempReading = document.getElementById('temp-reading');
    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');
    const closeHugOverlayBtn = hugOverlay.querySelector('.close-overlay-btn');
    const hiddenHeartMessageSection = document.getElementById('hidden-heart-message-section');
    const finalMessageText = document.getElementById('final-message-text');
    const finalBirthdayMessage = document.getElementById('final-birthday-message');
    const levelAudioMessage = document.getElementById('level-audio-message');

    let currentLevel = 0;
    const loveQuotes = [
        "\"The best things in life are better with you.\"",
        "\"Every mile is special with you in the passenger seat.\"",
        "\"You're the fuel to my engine, Shiroo.\"",
        "\"My favorite journey is the one with you.\"",
        "\"Worry less, live more. I'm here for you.\"",
        "\"You're stronger than you think, Co-Driver.\"",
        "\"In your arms is where I feel safe and loved.\"",
        "\"You're my inspiration, my everything.\"",
        "\"Not because you're perfect but because you're real, rare kind, sweet.\""
    ];
    let loveQuoteInterval;
    let fuelLevel = 100; // Starting fuel level

    // Adjust this final message if you want it shorter or different
    const finalMessage = "Happy Birthday, Shiroo!\n\nYou're the most amazing person I know. Every moment with you is a treasure. May your day be filled with joy, laughter, and everything you wish for.\n\nLove always,\nYour Co-Pilot";


    // --- Initial Setup - Now directly starts game after loading screen ---
    setTimeout(() => {
        loadingScreen.style.opacity = 0;
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.remove();
            gameContainer.classList.add('visible');
            // Attempt to play background music immediately
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log("Background music started automatically.");
                }).catch(error => {
                    // Autoplay was prevented. User will need to interact.
                    console.warn("Background music autoplay prevented:", error);
                    // Optionally, you can add a message on screen:
                    // coDriverCue.textContent = "Click anywhere to start the music!";
                    // coDriverDisplay.classList.remove('hidden');
                });
            }

            // Immediately show the first level (e.g., Level 1: Artwork Wall)
            showLevel('level-1'); // Or 'level-quiz' if you want quiz first
            startLoveQuotes();
        }, { once: true });
    }, 2000); // Simulate loading time

    function displayCoDriverMessage(message) { // Removed showButton parameter as it's not needed for initial display
        coDriverCue.textContent = message;
        coDriverDisplay.classList.remove('hidden'); // Co-driver display always visible for messages
    }

    function startLoveQuotes() {
        let currentQuoteIndex = 0;
        loveQuoteInterval = setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % loveQuotes.length;
            loveQuoteElement.textContent = loveQuotes[currentQuoteIndex];
        }, 8000); // Change quote every 8 seconds
    }

    // --- Fuel Management (Example) ---
    function updateFuelDisplay() {
        fuelFill.style.height = `${fuelLevel}%`;
        fuelReading.textContent = `${fuelLevel}%`;
        // You can add logic here to trigger events when fuel is low
    }

    // --- Navigation & Level Management ---
    function showLevel(levelId) {
        document.querySelectorAll('.level-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(levelId).classList.remove('hidden');
        updateFuelDisplay(); // Update fuel on level change, if needed

        // Specific actions for levels
        if (levelId === 'level-1') {
            displayCoDriverMessage('Go on, find the hidden masterpiece.');
        } else if (levelId === 'level-quiz') {
            displayCoDriverMessage('Time to test your knowledge, Driver!');
            // Reset quiz for retake
            quizFeedback.classList.add('hidden');
            document.querySelector('#level-quiz .next-level-btn').classList.add('hidden');
            quizQuestions.forEach(q => q.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false));
        } else if (levelId === 'level-2') {
            displayCoDriverMessage('Look back at how far we\'ve come...');
            // Ensure videos are loaded/reset
            memoryTimeline.querySelectorAll('video').forEach(video => video.load());
        } else if (levelId === 'level-qa') {
            displayCoDriverMessage('Answer from the heart, Co-Driver.');
            qaCards.forEach((card, index) => {
                if (index === 0) card.classList.remove('hidden');
                else card.classList.add('hidden');
            });
            qaInputs.forEach(input => input.value = ''); // Clear previous answers
            qaFinalMessage.classList.add('hidden');
        } else if (levelId === 'level-music-video') {
            displayCoDriverMessage('Your anthem for our journey ahead!');
            // Attempt to play music video, handling autoplay policy
            const playPromise = musicVideoPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Autoplay started!
                    console.log('Music video autoplay started.');
                }).catch(error => {
                    // Autoplay was prevented. Show a play button or message.
                    console.warn('Music video autoplay prevented:', error);
                    videoLyricStation.textContent = "Click the video to play!"; // Instruct user to click
                });
            }
        } else if (levelId === 'level-healing-toolkit') {
            displayCoDriverMessage('A quick pitstop for healing, Driver.');
            updateDashboardGauges();
        } else if (levelId === 'hidden-heart-message-section') {
            displayCoDriverMessage('The final secret awaits your touch.');
            typeWriterEffect(finalMessageText, finalMessage, () => {
                finalBirthdayMessage.style.opacity = 1; // Make birthday message visible after typing
            });
            // startParticleBackground(); // Call this function to start particles if implemented
        } else if (levelId === 'level-audio-message') {
            displayCoDriverMessage('A special message from me, just for you!');
            const playPromise = birthdayAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log('Birthday audio autoplay started.');
                }).catch(error => {
                    console.warn('Birthday audio autoplay prevented:', error);
                    // You could add a visible play button for the audio here if needed
                });
            }
        }
    }

    // --- Typewriter Effect ---
    function typeWriterEffect(element, text, callback) {
        let i = 0;
        element.textContent = ''; // Clear existing text
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                // Add a small delay for new lines or pauses
                let delay = 50;
                if (text.charAt(i - 1) === '\n') delay = 500;
                setTimeout(type, delay);
            } else if (callback) {
                callback();
            }
        }
        type();
    }


    // --- Event Listeners ---

    // Level 1: Artwork Spotlight
    artworkFrame.addEventListener('click', () => {
        artworkFrame.classList.add('revealed');
        artworkOverlay.classList.add('visible');
        displayCoDriverMessage('Isn\'t it wonderful, Driver?');
    });

    closeArtworkOverlayBtn.addEventListener('click', () => {
        artworkOverlay.classList.remove('visible');
        artworkFrame.classList.remove('revealed');
        displayCoDriverMessage('Onwards to the next checkpoint!');
    });

    // Level Quiz
    submitQuizBtn.addEventListener('click', () => {
        const answers = {
            q1: document.querySelector('input[name="q1"]:checked')?.value,
            q2: document.querySelector('input[name="q2"]:checked')?.value,
            q3: document.querySelector('input[name="q3"]:checked')?.value
        };

        // Correct answers (adjust these as per your desired answers)
        const correctAnswers = {
            q1: 'hugs', // Example: 'hugs' or 'kisses'
            q2: 'black', // Example: 'black' or 'white'
            q3: 'ironman' // Example: 'batman', 'superman', or 'ironman'
        };

        let allCorrect = true;
        for (const question in correctAnswers) {
            if (answers[question] !== correctAnswers[question]) {
                allCorrect = false;
                break;
            }
        }

        if (allCorrect) {
            quizFeedback.textContent = "Correct answers! Letter unlocked! 🤩";
            quizFeedback.classList.remove('incorrect');
            quizFeedback.classList.add('correct');
            document.querySelector('#level-quiz .next-level-btn').classList.remove('hidden');
            displayCoDriverMessage('Excellent driving, Driver! Your intuition is spot on.');
        } else {
            quizFeedback.textContent = "Incorrect answers. Try again, Driver! 😔";
            quizFeedback.classList.remove('correct');
            quizFeedback.classList.add('incorrect');
        }
    });

    // Memory Lane Navigation
    memoryNavLeft.addEventListener('click', () => {
        memoryTimeline.scrollBy({
            left: -memoryTimeline.clientWidth,
            behavior: 'smooth'
        });
    });

    memoryNavRight.addEventListener('click', () => {
        memoryTimeline.scrollBy({
            left: memoryTimeline.clientWidth,
            behavior: 'smooth'
        });
    });

    // Q&A Navigation
    qaNextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const currentCard = qaCards[index];
            const currentInput = currentCard.querySelector('.qa-input');
            const answer = currentInput.value.trim();

            if (answer.length > 0) {
                if (index < qaCards.length - 1) {
                    currentCard.classList.add('hidden');
                    qaCards[index + 1].classList.remove('hidden');
                    displayCoDriverMessage('Keep going! Your answers are precious.');
                } else {
                    // Last question answered
                    qaCards.forEach(card => card.classList.add('hidden')); // Hide all Q&A cards
                    qaFinalMessage.textContent = "Answers submitted! Your heart shines bright, Driver!";
                    qaFinalMessage.classList.remove('hidden');
                    qaFinalMessage.classList.add('correct');
                    document.querySelector('#level-qa .next-level-btn').classList.remove('hidden');
                    displayCoDriverMessage('You\'ve unlocked the next destination, Driver!');
                }
            } else {
                alert('Please type your answer before proceeding!');
            }
        });
    });

    // Healing Toolkit
    function updateDashboardGauges() {
        // Example dynamic updates (can be linked to game progress or random)
        const fuelAngle = 90 - (fuelLevel * 1.8); // 180 degrees from 0 to 100%
        fuelNeedle.style.transform = `translateX(-50%) rotate(${fuelAngle}deg)`;
        fuelReading.textContent = fuelLevel > 20 ? 'FULL' : 'LOW';

        // Simulate engine temp
        const tempValue = Math.random() * 100; // 0-100
        const tempAngle = -45 + (tempValue * 0.9); // -45 to +45 range roughly
        tempNeedle.style.transform = `translateX(-50%) rotate(${tempAngle}deg)`;
        tempReading.textContent = tempValue < 70 ? 'OPTIMAL' : 'HIGH';
    }

    hugButton.addEventListener('click', () => {
        hugOverlay.classList.add('visible');
        displayCoDriverMessage('Hug delivered! Feeling better, Driver?');
    });

    closeHugOverlayBtn.addEventListener('click', () => {
        hugOverlay.classList.remove('visible');
        displayCoDriverMessage('Ready to continue your journey?');
    });


    // General Next Level Buttons
    document.querySelectorAll('.next-level-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetLevel = event.target.dataset.target;
            showLevel(targetLevel);
        });
    });

    // Ensure music starts when user interacts (if autoplay failed initially)
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                console.log("Background music resumed on user interaction.");
            }).catch(error => {
                console.warn("Background music play failed on user interaction:", error);
            });
        }
    }, { once: true }); // Only try to play once on the first body click

    // Initial state: show loading screen and hide game container
    loadingScreen.classList.remove('hidden');
    gameContainer.classList.add('hidden');
});
