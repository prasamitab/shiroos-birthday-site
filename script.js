document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text'); // Get the specific loading text element
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionStartButton = document.getElementById('ignition-start-button');
    const ignitionButton = document.getElementById('ignition-button');
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkImg = document.querySelector('#artwork-frame .artwork-img'); // Get the actual img tag
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
    const quizNextLevelBtn = document.querySelector('#level-quiz .next-level-btn');

    // Q&A Elements
    const qaCards = document.querySelectorAll('.qa-card');
    const qaNextBtns = document.querySelectorAll('.qa-next-btn');
    const qaFinalMessage = document.getElementById('qa-final-message');
    const qaNextLevelBtn = document.querySelector('#level-qa .next-level-btn');
    let currentQaCardIndex = 0;

    // Hug Button and Overlay
    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');

    // Hidden Heart Message Section
    const hiddenHeartMessageSection = document.getElementById('hidden-heart-message-section');
    const heartMessageNextBtn = document.getElementById('heart-message-next-btn'); // This button might be redundant now if final message autoplays
    const finalBirthdayTextDisplay = document.getElementById('final-birthday-text'); // Element to type the final message into

    // Audio for Birthday Message
    const birthdayMessageAudio = document.getElementById('birthday-message-audio');


    // --- NEW: Intro Message Content ---
    const introMessage = `Hey driver, buckle up — your co-driver (me) is right here beside you. This ride’s for you, and I’m guiding you through every curve, every speed bump, every smile. Let’s go.

    You’re the only one I have, and I love you more than words can express. I miss you so much, and I’m incredibly grateful to have you in my life. You’re everything to me — my solution, my magical world.

    I imagine myself living in the world you’ve created for me, where I feel safe and loved. I love being in your arms. Without you, this world feels boring and dull, as if it’s black and white. But with you, it’s full of colors, love, and joy. You’re the best part of my life.

    You are my sunshine, my only sunshine, and you make me so, so happy. I want to live in this magical world of ours forever, and never leave. You are my everything — my heart, my soul, my world.`;

    // --- Final Birthday Message Content ---
    const finalBirthdayMessageContent = `Happy Birthday, my dear Shiroo!

You're the most amazing person I know. Every moment with you is a treasure. May your day be filled with joy, laughter, and everything you wish for.

You’re someone who never stops moving forward, and I love that thing about you.

This artwork? Made with my hands.
This page? Built with memories.
But the heart behind it? Pooooraa teraaa janeman.

I’m your co-driver, passenger princess—whatever—here, always have been.

I am falling in love with every mile you drive.

You are my inspiration, you know. Not because you’re perfect but because you’re real, rare, kind, sweet, romantic, caring, annoying, and mine in ways words pe nahi bol paungi, hehehe.

Keep driving towards what makes you feel alive, and I'm always right here for you, baby.

And aurr kuchh nahiiiiii! I’ll always be in the passenger seat, with the map, giving wrong directions.

Happy Birthdayyyyyyyy Baby.

Forever your co-driver,
I’m Yours in the end.

I’m your co-driver — in this game, in this life, and in every lap ahead. And I’ll always be cheering for you at the finish line.`;


    // --- Love Quotes for Pop-In Alerts ---
    const loveQuotes = [
        "💗 Made with my hands, but full of memories with you.",
        "💛 Some people just get you — like roads get wheels. You’re that person.",
        "🔐 Your Birthday Garage Baby — Only You Have the Keys.",
        "💌 I hope you always keep driving towards what makes you feel alive.",
        "✍️ Not just ink on paper, but a memory you can keep forever.",
        "💭 To the boy who deserves all — Happy Birthday.",
        "💘 You’re someone who never stops moving forward — and I love you for that."
    ];
    let quoteInterval;

    function showLoveQuote() {
        const randomIndex = Math.floor(Math.random() * loveQuotes.length);
        const quote = loveQuotes[randomIndex];
        const popUp = document.createElement('div');
        popUp.classList.add('love-quote-popup');
        popUp.textContent = quote;
        document.body.appendChild(popUp);

        // Position randomly on the right side
        const randomY = Math.random() * (window.innerHeight * 0.7) + (window.innerHeight * 0.1); // 10% to 80% of screen height
        popUp.style.top = `${randomY}px`;

        void popUp.offsetWidth; // Trigger reflow to apply initial styles
        popUp.classList.add('show');

        setTimeout(() => {
            popUp.classList.remove('show');
            popUp.classList.add('hide');
            popUp.addEventListener('transitionend', () => popUp.remove());
        }, 5000); // Quote visible for 5 seconds
    }

    // --- Loading Screen and Initial Sequence ---
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        // Start background music when game container is visible
        if (backgroundMusic) {
            backgroundMusic.play().catch(e => console.error("Error playing background music:", e));
        }

        displayCoDriverCue(introMessage, true, () => {
            ignitionStartButton.classList.remove('hidden'); // Show "IGNITE THE ENGINE" button
        });
    }, 3000); // Keep loading screen for 3 seconds

    // --- Co-Driver Display & Fuel Logic ---
    let currentFuelStage = 0;
    const maxFuelLevels = 10; // Number of stages to fill the tank

    function updateFuel(level) {
        fuelFill.style.height = `${level}%`;
    }

    function displayCoDriverCue(message, typewriterEffect = false, callback = null) {
        coDriverCue.classList.remove('typewriter'); // Reset typewriter class
        coDriverCue.style.animation = 'none'; // Reset any previous animation
        coDriverDisplay.classList.remove('hidden'); // Ensure display is visible
        coDriverDisplay.style.opacity = '1'; // Ensure display is visible

        if (typewriterEffect) {
            coDriverCue.textContent = ''; // Clear existing text
            coDriverCue.classList.add('typewriter');
            let i = 0;
            const speed = 20; // Typing speed (ms)
            const type = () => {
                if (i < message.length) {
                    coDriverCue.textContent += message.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    coDriverCue.style.borderRight = 'none'; // Remove blinking cursor after typing
                    if (callback) {
                        setTimeout(callback, 1000); // Call callback after a brief pause
                    }
                }
            };
            type();
        } else {
            coDriverCue.textContent = message;
            coDriverCue.style.opacity = '1';
            if (callback) {
                setTimeout(callback, 1000);
            }
        }
    }

    // --- Ignition Button (for intro to level-0) ---
    if (ignitionStartButton) {
        ignitionStartButton.addEventListener('click', () => {
            coDriverDisplay.classList.add('hidden'); // Hide co-driver display
            document.getElementById('level-0').classList.remove('hidden'); // Show level-0
            displayCoDriverCue("Welcome, Driver! Your journey begins now. The road is calling.", false, () => {
                // No button to show here, just a cue
            });
        });
    }

    // --- START THE JOURNEY button (on level-0) ---
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            document.getElementById('level-0').classList.add('hidden'); // Hide level-0
            document.getElementById('level-1').classList.remove('hidden'); // Show level-1
            displayCoDriverCue("Level 1 initiated: The Artwork Wall. Discover your masterpiece.", false);
            quoteInterval = setInterval(showLoveQuote, 10000); // Start showing quotes every 10 seconds
        });
    }

    // --- Artwork Reveal Logic ---
    if (artworkFrame) {
        artworkFrame.addEventListener('click', () => {
            artworkFrame.classList.add('revealed');
            artworkOverlay.classList.add('visible');
            displayCoDriverCue("A glimpse into my heart. Hope you like it, baby.", false);
        });
    }

    // --- Close Overlay Buttons ---
    closeOverlayBtns.forEach(button => {
        button.addEventListener('click', () => {
            const overlay = button.closest('.overlay-message');
            if (overlay) {
                overlay.classList.remove('visible');
            }
        });
    });


    // --- Quiz Logic ---
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            // Correct answers based on previous interactions (assuming these were the intended ones)
            const correctAnswers = {
                q1: 'hugs', // Example, adjust if changed
                q2: 'black', // Example, adjust if changed
                q3: 'batman' // Example, adjust if changed
            };

            let score = 0;
            const q1 = document.querySelector('input[name="q1"]:checked')?.value;
            const q2 = document.querySelector('input[name="q2"]:checked')?.value;
            const q3 = document.querySelector('input[name="q3"]:checked')?.value;


            if (q1 === correctAnswers.q1) score++;
            if (q2 === correctAnswers.q2) score++;
            if (q3 === correctAnswers.q3) score++;

            if (score === 3) {
                quizFeedback.textContent = "Correct! You know me so well, Driver. Letter unlocked!";
                quizFeedback.classList.remove('incorrect');
                quizFeedback.classList.add('correct');
                quizNextLevelBtn.classList.remove('hidden');
                updateFuel(100); // Fill fuel tank on quiz success
                displayCoDriverCue("Fuel tank full! You're ready for the next stage.", false);
            } else {
                quizFeedback.textContent = `Incorrect. You got ${score} out of 3 right. Try again, Driver.`;
                quizFeedback.classList.remove('correct');
                quizFeedback.classList.add('incorrect');
                updateFuel(Math.max(0, currentFuelStage - 20)); // Decrease fuel on incorrect answer, ensure not below 0
            }
        });
    }

    // --- Memory Timeline Navigation ---
    if (navArrows) {
        navArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const scrollAmount = 300; // Adjust as needed
                if (arrow.classList.contains('left')) {
                    memoryTimeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    memoryTimeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        });
    }

    // --- Q&A Logic ---
    if (qaNextBtns) {
        qaNextBtns.forEach(button => {
            button.addEventListener('click', () => {
                const currentCard = button.closest('.qa-card');
                const answerInput = currentCard.querySelector('.qa-input');
                const answer = answerInput.value.trim();

                if (answer !== "") {
                    currentCard.classList.add('hidden'); // Hide current card

                    currentQaCardIndex++;

                    if (currentQaCardIndex < qaCards.length) {
                        qaCards[currentQaCardIndex].classList.remove('hidden'); // Show next card
                        displayCoDriverCue("Your insights are valuable, Driver. Keep going!", false);
                    } else {
                        qaFinalMessage.textContent = "Answers submitted! Your honesty powers this journey.";
                        qaFinalMessage.classList.remove('hidden'); // Show final message
                        qaNextLevelBtn.classList.remove('hidden');
                        displayCoDriverCue("All questions answered. Proceed to the next level!", false);
                    }
                    updateFuel(Math.min(100, currentFuelStage + 10)); // Give some fuel for answering, max 100
                } else {
                    displayCoDriverCue("Please provide an answer, Driver.", false);
                }
            });
        });
    }

    // --- Next Level Buttons (general functionality) ---
    if (nextLevelBtns) {
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
                    // Specific actions for each level transition
                    if (targetLevelId === 'level-music-video') {
                        startLyricTypingEffect();
                        displayCoDriverCue("Feel the rhythm, Driver. This one's for us.", false);
                    } else if (targetLevelId === 'level-healing-toolkit') {
                        displayCoDriverCue("Entering the Co-Driver's Toolkit. Self-care is key, Driver.", false);
                        clearInterval(quoteInterval); // Stop quotes when entering toolkit
                    } else if (targetLevelId === 'hidden-heart-message-section') {
                        // This section directly shows the heart message and then triggers final birthday message
                        displayCoDriverCue("You've reached the heart of the journey. Prepare for the final message.", false, () => {
                            setTimeout(triggerFinalBirthdayMessage, 2000); // Delay before showing final message
                        });
                        // The 'heartMessageNextBtn' is now potentially redundant if auto-triggering.
                        // I'll keep it hidden as the final message auto-plays.
                        if (heartMessageNextBtn) heartMessageNextBtn.classList.add('hidden');
                    }
                }
                updateFuel(Math.max(0, currentFuelStage - 5)); // Small fuel cost for changing levels
            });
        });
    }

    // --- Music Video Lyrics Typing Effect ---
    const lyrics = [
        "This is the world I imagine with you..." // This is the lyric for the video section
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
                // If this is the only lyric and we don't want to loop or move on immediately,
                // we can stop here or reset for a loop. For now, it stays.
            }
        }
    }

    function startLyricTypingEffect() {
        videoLyricStation.textContent = ''; // Clear any initial text
        lyricIndex = 0;
        charIndex = 0;
        clearTimeout(typingTimeout); // Clear any previous timeouts
        typeLyric();
    }

    // --- Healing Toolkit / Hug Logic ---
    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            displayCoDriverCue("Virtual hug initiated. Recharge complete.");
        });
    }

    // --- Final Birthday Message Logic ---
    let finalMessageCharIndex = 0;
    let finalMessageTypingTimeout;

    function typeFinalBirthdayMessage() {
        if (finalMessageCharIndex < finalBirthdayMessageContent.length) {
            finalBirthdayTextDisplay.textContent += finalBirthdayMessageContent.charAt(finalMessageCharIndex);
            finalMessageCharIndex++;
            finalMessageTypingTimeout = setTimeout(typeFinalBirthdayMessage, 30); // Typing speed for final message
        } else {
            // Typing complete, remove cursor
            finalBirthdayTextDisplay.style.borderRight = 'none';
            // Any final actions after message typed
            displayCoDriverCue("Happy Birthday once again! Drive safe and keep shining!", false);
        }
    }

    function triggerFinalBirthdayMessage() {
        // Ensure background music fades out
        const fadeAudioOut = (audioElement, duration = 1000, step = 50) => {
            const originalVolume = audioElement.volume;
            let currentVolume = originalVolume;
            const fadeInterval = setInterval(() => {
                if (currentVolume > 0) {
                    currentVolume -= originalVolume * (step / duration);
                    audioElement.volume = Math.max(0, currentVolume);
                } else {
                    audioElement.pause();
                    clearInterval(fadeInterval);
                }
            }, step);
        };

        const fadeAudioIn = (audioElement, originalVolume, duration = 1000, step = 50) => {
            audioElement.volume = 0;
            audioElement.play().catch(e => console.error("Error playing audio:", e));
            let currentVolume = 0;
            const fadeInterval = setInterval(() => {
                if (currentVolume < originalVolume) {
                    currentVolume += originalVolume * (step / duration);
                    audioElement.volume = Math.min(originalVolume, currentVolume);
                } else {
                    clearInterval(fadeInterval);
                }
            }, step);
        };


        if (backgroundMusic && !backgroundMusic.paused) {
            fadeAudioOut(backgroundMusic, 2000); // Fade out background music over 2 seconds
        }

        // Play the birthday message audio
        if (birthdayMessageAudio) {
            birthdayMessageAudio.volume = 1; // Ensure full volume for message
            birthdayMessageAudio.play().catch(e => console.error("Error playing birthday message audio:", e));
            
            // Listen for when the birthday message audio ends
            birthdayMessageAudio.onended = () => {
                if (backgroundMusic) {
                    fadeAudioIn(backgroundMusic, 0.5, 2000); // Fade background music back in to 50% volume
                }
                // Continue with typing the text message after audio ends
                finalBirthdayTextDisplay.classList.remove('hidden'); // Ensure it's visible
                finalBirthdayTextDisplay.textContent = ''; // Clear previous content
                finalMessageCharIndex = 0; // Reset for typing effect
                typeFinalBirthdayMessage();
            };
        } else {
            // If no audio, just start typing the message after a delay
            finalBirthdayTextDisplay.classList.remove('hidden'); // Ensure it's visible
            finalBirthdayTextDisplay.textContent = ''; // Clear previous content
            finalMessageCharIndex = 0; // Reset for typing effect
            typeFinalBirthdayMessage();
        }
    }
});
