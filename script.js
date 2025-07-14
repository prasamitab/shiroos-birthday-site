document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const coDriverContinueBtn = document.getElementById('co-driver-continue-btn'); // New: button to continue from co-driver cue
    const ignitionButton = document.getElementById('ignition-button'); // Original START THE JOURNEY button (on level-0)
    const levelIntroGreeting = document.getElementById('level-intro-greeting'); // New: for "Welcome Shiroo" screen
    const proceedFromGreetingButton = document.getElementById('proceed-from-greeting'); // New: button on "Welcome Shiroo" screen

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

    // Q&A Elements
    const qaContainer = document.querySelector('.qa-container');
    const qaCards = document.querySelectorAll('.qa-card');
    const qaNextButtons = document.querySelectorAll('.qa-next-btn');
    const qaFinalMessage = document.getElementById('qa-final-message');
    const qaNextLevelBtn = document.getElementById('qa-next-level-btn');
    let currentQaCardIndex = 0;

    // Healing Toolkit
    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');

    // Final Message
    const finalBirthdayTextDisplay = document.getElementById('final-birthday-text');
    const birthdayMessageAudio = document.getElementById('birthday-message-audio');

    let quoteInterval; // To store the interval for love quotes

    const loveQuotes = [
        "You are the light in my code.",
        "My heart compiles for you.",
        "Forever debugging life together.",
        "Your smile is my favorite algorithm.",
        "You're the missing piece in my circuit.",
        "Love is the ultimate function.",
        "You make my registers overflow.",
        "My love for you is non-volatile.",
        "You're the variable I always needed."
    ];

    const introMessage = "Driver detected: Prepare for an immersive journey through circuits of affection. Your vehicle is primed. Destination: The depths of a heart built just for you. Engage. Every module is a memory, every challenge a testament to our bond. Analyze. Adapt. Accelerate. This is not just a game; it's our story. Co-driver interface online.";

    const finalBirthdayMessageContent = `My dearest Shiroo,

Through every line of code, every pixel, and every sound, this entire journey has been meticulously crafted for you. It's a digital testament to the countless memories, shared laughs, and the profound connection we share.

This isn't just about a day; it's about celebrating the extraordinary person you are. Your strength, your kindness, your unwavering spirit—they inspire me every single day. You bring light and warmth into every corner of my world, and for that, I am eternally grateful.

As you navigate through these levels, know that each one represents a piece of my heart, a shared experience, or a dream we're building together. This journey is a metaphor for our life—full of unexpected turns, exciting discoveries, and always, always leading us closer.

Thank you for being you. Thank you for being my co-driver in this beautiful, chaotic, and utterly wonderful adventure we call life. May your special day be filled with as much joy, love, and wonder as you bring into mine.

With all my love, always.

Your Co-Driver.`;


    // --- Core Functions ---

    function typeMessage(element, message, callback) {
        let i = 0;
        element.textContent = ''; // Clear existing text
        element.classList.add('typewriter'); // Add typing animation class

        function typing() {
            if (i < message.length) {
                element.textContent += message.charAt(i);
                i++;
                setTimeout(typing, 30); // Adjust typing speed as needed
            } else {
                element.classList.remove('typewriter'); // Remove cursor after typing
                if (callback) callback();
            }
        }
        typing();
    }

    function displayCoDriverCue(message, showContinueButton = false, callback) {
        coDriverDisplay.classList.remove('hidden');
        coDriverContinueBtn.classList.add('hidden'); // Hide by default
        typeMessage(coDriverCue, message, () => {
            if (showContinueButton) {
                coDriverContinueBtn.classList.remove('hidden');
            }
            if (callback) callback();
        });
    }

    function updateFuel(percentage) {
        fuelFill.style.height = `${percentage}%`;
    }

    function showLoveQuote() {
        const randomIndex = Math.floor(Math.random() * loveQuotes.length);
        const quote = loveQuotes[randomIndex];

        const popUp = document.createElement('div');
        popUp.classList.add('love-quote-popup');
        popUp.textContent = quote;

        // Position to the right and randomly vertically
        const randomY = Math.random() * (window.innerHeight * 0.7) + (window.innerHeight * 0.1); // 10% to 80% of screen height
        popUp.style.top = `${randomY}px`;

        document.body.appendChild(popUp);

        setTimeout(() => {
            popUp.classList.add('show'); // Trigger slide-in animation
        }, 10); // Small delay to allow CSS to apply before animation

        setTimeout(() => {
            popUp.classList.remove('show');
            popUp.classList.add('hide'); // Trigger slide-out animation
            popUp.addEventListener('transitionend', () => {
                popUp.remove(); // Remove from DOM after animation
            }, { once: true });
        }, 5000); // Quote visible for 5 seconds
    }


    // --- Game Flow Initialization ---
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        levelIntroGreeting.classList.remove('hidden'); // Show the new intro greeting
        updateFuel(0); // Ensure fuel tank is empty initially
    }, 3000); // 3-second loading screen


    // --- NEW: "Welcome Shiroo" Screen Logic ---
    if (proceedFromGreetingButton) {
        proceedFromGreetingButton.addEventListener('click', () => {
            levelIntroGreeting.classList.add('hidden');
            document.getElementById('level-0').classList.remove('hidden'); // Show original level-0
            // No co-driver cue here, as level-0 has its own text.
        });
    }


    // --- START THE JOURNEY button (on level-0) ---
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            document.getElementById('level-0').classList.add('hidden'); // Hide level-0
            coDriverDisplay.classList.remove('hidden');
            coDriverContinueBtn.classList.remove('hidden'); // Show continue button for intro message
            displayCoDriverCue(introMessage, true, () => {
                // Callback function when typing is complete
                // The continue button click handles the next step
            });
        });
    }

    // --- NEW: Continue button after introMessage ---
    if (coDriverContinueBtn) {
        coDriverContinueBtn.addEventListener('click', () => {
            coDriverDisplay.classList.add('hidden');
            coDriverContinueBtn.classList.add('hidden'); // Hide button again
            document.getElementById('level-1').classList.remove('hidden'); // Show level-1 (Artwork Wall)
            displayCoDriverCue("Level 1 initiated: The Artwork Wall. Discover your masterpiece.", false);
            quoteInterval = setInterval(showLoveQuote, 10000); // Start showing quotes every 10 seconds
        });
    }


    // --- Artwork Wall (Level 1) ---
    if (artworkFrame) {
        artworkFrame.addEventListener('click', () => {
            artworkFrame.classList.add('revealed');
            artworkOverlay.classList.add('visible');
            displayCoDriverCue("A glimpse into my heart. Hope you like it, baby.", false);
            updateFuel(20); // Fill fuel for level 1
        });
    }

    closeOverlayBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from propagating to the frame
            artworkOverlay.classList.remove('visible');
            // Remove 'revealed' class if you want the artwork to go back to its initial state
            // artworkFrame.classList.remove('revealed');
        });
    });


    // --- Quiz to Unlock the Letter ---
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            const q1Answer = document.querySelector('input[name="q1"]:checked')?.value;
            const q2Answer = document.querySelector('input[name="q2"]:checked')?.value;
            const q3Answer = document.querySelector('input[name="q3"]:checked')?.value;

            // Correct answers - adjust these as needed!
            const correctQ1 = "hugs";
            const correctQ2 = "black";
            const correctQ3 = "superman";

            let correctCount = 0;
            if (q1Answer === correctQ1) correctCount++;
            if (q2Answer === correctQ2) correctCount++;
            if (q3Answer === correctQ3) correctCount++;

            if (correctCount === 3) {
                quizFeedback.textContent = "Access Granted: All systems align. Proceed, Driver!";
                quizFeedback.classList.remove('incorrect');
                quizFeedback.classList.add('correct');
                quizNextLevelBtn.classList.remove('hidden');
                updateFuel(40); // Fill fuel for quiz
                displayCoDriverCue("System check complete. Your emotional intelligence is off the charts. Fueling up for the next stage.", false);
            } else {
                quizFeedback.textContent = `Access Denied: ${correctCount} of 3 correct. Recalibrate and retry, Driver.`;
                quizFeedback.classList.remove('correct');
                quizFeedback.classList.add('incorrect');
                quizNextLevelBtn.classList.add('hidden');
                displayCoDriverCue("Recalibrating... Emotional input mismatch. Try again, Driver.", false);
            }
        });
    }


    // --- Memory Lane (Level 2) ---
    if (memoryTimeline && navArrows.length > 0) {
        const scrollAmount = 350; // Width of memory item + margin

        navArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                if (arrow.classList.contains('left')) {
                    memoryTimeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else if (arrow.classList.contains('right')) {
                    memoryTimeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        });
    }


    // --- Q&A Level ---
    let answeredQaCards = 0; // Track how many Q&A cards have been answered

    if (qaNextButtons.length > 0) {
        qaNextButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const currentCard = qaCards[index];
                const input = currentCard.querySelector('.qa-input');
                const answer = input.value.trim();

                if (answer !== '') {
                    answeredQaCards++;
                    // Hide current card
                    currentCard.classList.add('hidden');

                    if (index < qaCards.length - 1) {
                        // Show next card
                        qaCards[index + 1].classList.remove('hidden');
                        displayCoDriverCue(`Query ${index + 2} initiated. Data input vital.`, false);
                    } else {
                        // All questions answered
                        qaFinalMessage.textContent = "Data integrity confirmed. Your responses are key. Proceeding to next level.";
                        qaFinalMessage.classList.remove('hidden');
                        qaNextLevelBtn.classList.remove('hidden');
                        displayCoDriverCue("Neural pathways aligned. Your journey continues.", false);
                        updateFuel(60); // Fuel for Q&A
                    }
                } else {
                    displayCoDriverCue("Input required. Please provide a response to proceed.", false);
                }
            });
        });
    }

    // Initial state for Q&A: Only the first card is visible
    if (qaCards.length > 0) {
        qaCards[0].classList.remove('hidden');
        displayCoDriverCue("Query 1 initiated. Your insights are valuable.", false);
    }


    // --- Music Video Level ---
    // Music video specific logic can go here if needed.
    // The `startLyricTypingEffect` is intended to be called when this level starts
    // but requires a music video to be playing or associated with lyrics.
    const lyrics = [
        "Every beat, a memory.",
        "Our rhythm, our song.",
        "You're the melody in my life.",
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
        if (videoLyricStation) { // Ensure element exists
            videoLyricStation.textContent = ''; // Clear any initial text
            lyricIndex = 0;
            charIndex = 0;
            clearTimeout(typingTimeout); // Clear any previous timeouts
            typeLyric();
        }
    }


    // --- Healing Toolkit / Hug Logic ---
    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            displayCoDriverCue("Virtual hug initiated. Recharge complete.", false);
            updateFuel(80); // Fuel for hug
        });
    }

    // Close Hug Overlay
    if (hugOverlay) {
        const closeHugBtn = hugOverlay.querySelector('.close-overlay-btn');
        if (closeHugBtn) {
            closeHugBtn.addEventListener('click', () => {
                hugOverlay.classList.remove('visible');
            });
        }
    }


    // --- Final Message Logic ---
    function typeFinalBirthdayMessage() {
        if (finalBirthdayTextDisplay) {
            typeMessage(finalBirthdayTextDisplay, finalBirthdayMessageContent, () => {
                // Play audio after message is fully typed
                if (birthdayMessageAudio) {
                    birthdayMessageAudio.play().catch(error => console.error("Audio playback failed:", error));
                }
                updateFuel(100); // Fuel for final message
            });
        }
    }


    // --- Level Progression ---
    nextLevelBtns.forEach(button => {
        button.addEventListener('click', () => {
            const targetLevelId = button.dataset.target;
            const currentLevel = button.closest('.level-section');

            if (currentLevel) {
                currentLevel.classList.add('hidden');
            }

            const targetLevel = document.getElementById(targetLevelId);
            if (targetLevel) {
                targetLevel.classList.remove('hidden');

                // Specific actions for entering levels
                if (targetLevelId === 'level-1') {
                    displayCoDriverCue("Level 1 initiated: The Artwork Wall. Discover your masterpiece.", false);
                    quoteInterval = setInterval(showLoveQuote, 10000);
                } else if (targetLevelId === 'level-quiz') {
                    displayCoDriverCue("System Check initiated. Prepare for emotional input.", false);
                    if (quoteInterval) clearInterval(quoteInterval); // Stop love quotes
                } else if (targetLevelId === 'level-2') {
                    displayCoDriverCue("Level 2 Initiated: Memory Lane. Relive our journey.", false);
                } else if (targetLevelId === 'level-qa') {
                    // Q&A initial cue is handled by the Q&A logic itself
                } else if (targetLevelId === 'level-music-video') {
                    displayCoDriverCue("Level: Our Soundtrack. Feel the rhythm of our bond.", false);
                    startLyricTypingEffect(); // Start typing lyrics
                } else if (targetLevelId === 'level-healing-toolkit') {
                    displayCoDriverCue("Level: Healing Toolkit. Recharge and recalibrate.", false);
                } else if (targetLevelId === 'hidden-heart-message-section') {
                    displayCoDriverCue("Final Destination: The Heart of the Journey. Prepare for the ultimate message.", false);
                    typeFinalBirthdayMessage();
                }
            }
        });
    });
});
