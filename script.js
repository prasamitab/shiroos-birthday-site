document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionStartButton = document.getElementById('ignition-start-button'); // NEW button for intro to level-1 transition
    const ignitionButton = document.getElementById('ignition-button'); // Original START THE JOURNEY button (now on level-0)
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeOverlayBtns = document.querySelectorAll('.close-overlay-btn');
    const memoryTimeline = document.getElementById('memory-timeline');
    const navArrows = document.querySelectorAll('.nav-arrow');
    const nextLevelBtns = document.querySelectorAll('.next-level-btn');
    const videoSectionParticles = document.getElementById('video-section-particles');
    const videoLyricStation = document.getElementById('video-lyric-station');
    const backgroundMusic = document.getElementById('background-music');
    const fuelFill = document.getElementById('fuel-fill');

    // NEW: Quiz Elements
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizNextLevelBtn = document.querySelector('#level-quiz .next-level-btn');

    // NEW: Q&A Elements
    const qaCards = document.querySelectorAll('.qa-card');
    const qaNextBtns = document.querySelectorAll('.qa-next-btn');
    const qaFinalMessage = document.getElementById('qa-final-message');
    const qaNextLevelBtn = document.querySelector('#level-qa .next-level-btn');
    let currentQaCardIndex = 0;

    // NEW: Hug Button and Overlay
    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');

    // NEW: Final Message Button
    const finalMessageButton = document.getElementById('final-message-button');

    // NEW: Birthday Message Audio
    const birthdayMessageAudio = document.getElementById('birthday-message-audio');
    const audioToggleButton = document.getElementById('audio-toggle-button');


    // --- NEW: Intro Message Content ---
    const introMessage = `Hey driver, buckle up — your co-driver (me) is right here beside you. This ride’s for you, and I’m guiding you through every curve, every speed bump, every smile. Let’s go.

    You’re the only one I have, and I love you more than words can express. I miss you so much, and I’m incredibly grateful to have you in my life. You’re everything to me — my solution, my magical world.

    I imagine myself living in the world you’ve created for me, where I feel safe and loved. I love being in your arms. Without you, this world feels boring and dull, as if it’s black and white. But with you, it’s full of colors, love, and joy. You’re the best part of my life.

    You are my sunshine, my only sunshine, and you make me so, so happy. I want to live in this magical world of ours forever, and never leave. You are my everything — my heart, my soul, my world.`;


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
        // Create a temporary pop-up element
        const popUp = document.createElement('div');
        popUp.classList.add('love-quote-popup');
        popUp.textContent = quote;
        document.body.appendChild(popUp);

        // Position and animate
        const startX = Math.random() * (window.innerWidth - 300) + 50; // Random x position
        const startY = Math.random() * (window.innerHeight - 200) + 50; // Random y position
        popUp.style.left = `${startX}px`;
        popUp.style.top = `${startY}px`;

        // Force reflow for animation
        void popUp.offsetWidth;
        popUp.classList.add('show');

        setTimeout(() => {
            popUp.classList.remove('show');
            popUp.classList.add('hide'); // For fade-out animation
            popUp.addEventListener('transitionend', () => popUp.remove());
        }, 5000); // Quote visible for 5 seconds
    }

    // Add styles for love quote pop-ups dynamically (moved to style.css for better organization)


    // --- Loading Sequence ---
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        // Play background music
        if (backgroundMusic) {
            backgroundMusic.volume = 0.5; // Set a default volume
            backgroundMusic.play().catch(e => console.log("Music autoplay blocked:", e));
        }

        // Initially show level-0 instead of the long intro message
        showLevel('level-0', false); // No fuel update yet, this is the very first visible state
        // Start love quote pop-ups immediately (or you can delay until after intro message)
        quoteInterval = setInterval(showLoveQuote, 10000); // Every 10 seconds

    }, 3000); // 3 seconds loading screen


    function displayCoDriverCue(message, typewriter = false, callback = null) {
        coDriverCue.textContent = ''; // Clear existing content
        coDriverCue.classList.remove('typewriter'); // Reset typewriter class
        coDriverCue.style.animation = 'none'; // Reset any previous animation
        coDriverDisplay.classList.remove('hidden'); // Ensure display is visible
        coDriverDisplay.style.opacity = '1'; // Ensure display is fully opaque
        coDriverDisplay.style.pointerEvents = 'auto'; // Ensure it can receive clicks initially (for intro button)

        void coDriverCue.offsetWidth; // Trigger reflow for animation reset

        if (typewriter) {
            coDriverCue.classList.add('typewriter');
            const speed = 70; // Typing speed in ms per character
            const typingAnimationDuration = message.length * speed / 1000; // Duration in seconds

            coDriverCue.textContent = message;
            coDriverCue.style.whiteSpace = 'pre-wrap';

            coDriverCue.style.animation = `typing ${typingAnimationDuration}s steps(${message.length}, end) forwards, blink-caret .75s step-end infinite`;
            coDriverCue.style.width = '100%';

            setTimeout(() => {
                coDriverCue.style.borderRight = 'none'; // Hide cursor
                if (callback) callback(); // Call callback (e.g., to show ignition button)
                // coDriverDisplay remains visible until ignitionStartButton is clicked
            }, typingAnimationDuration * 1000 + 500);
        } else {
            // For standard, non-typewriter messages (e.g., from showLevel)
            coDriverCue.textContent = message;
            coDriverCue.style.opacity = '1';
            coDriverCue.style.animation = 'textAppear 1s forwards'; // Simple fade in

            // After a delay, fade out and then hide completely
            setTimeout(() => {
                coDriverDisplay.style.opacity = '0'; // Start fade out
                coDriverDisplay.style.pointerEvents = 'none'; // Immediately disable clicks

                // Wait for the opacity transition to complete before setting display: none
                coDriverDisplay.addEventListener('transitionend', function handler() {
                    coDriverDisplay.classList.add('hidden'); // Apply display: none
                    coDriverDisplay.removeEventListener('transitionend', handler); // Clean up listener
                    // Reset opacity and pointerEvents for future uses
                    coDriverDisplay.style.opacity = '1';
                    coDriverDisplay.style.pointerEvents = 'auto';
                    if (callback) callback(); // Call callback if any, after display is fully hidden
                }, { once: true }); // Ensure this listener runs only once
            }, 5000); // Co-driver message visible for 5 seconds before starting fade
        }
    }


    // --- NEW: Fuel Tank Animation ---
    let fuelLevel = 0;
    // Stages that contribute to fuel:
    // 0. (Implicit: Start of game at level-0)
    // 1. After START THE JOURNEY -> Intro Message complete -> IGNITE THE ENGINE click -> Level 1
    // 2. Level Quiz shown
    // 3. Level 2 (Memory Lane) shown
    // 4. Level QA shown
    // 5. Level Music Video shown
    // 6. Level Healing Toolkit shown
    // 7. Hidden Heart Message Section shown
    // 8. Final Birthday Message (new level)
    const maxFuelLevels = 8; // Increased by 1 for the new final level
    let currentFuelStage = 0; // Start at 0, representing the "Ready for pilot input." stage (level-0)

    function updateFuelTank() {
        currentFuelStage++; // Increment stage each time this is called
        if (currentFuelStage > maxFuelLevels) {
            currentFuelStage = maxFuelLevels; // Cap at max
        }
        fuelLevel = (currentFuelStage / maxFuelLevels) * 100;
        fuelFill.style.height = `${fuelLevel}%`;
        displayCoDriverCue(`Fuel level increased to ${Math.round(fuelLevel)}%!`);
    }

    // --- Level Transitions ---
    function showLevel(levelId, updateFuel = true) {
        document.querySelectorAll('.level-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(levelId).classList.remove('hidden');
        if (updateFuel) {
            updateFuelTank(); // Increase fuel with each level change
        }

        // Specific cues for each level
        if (levelId === 'level-0') {
            displayCoDriverCue("System initiated. Ready for pilot input.");
        } else if (levelId === 'level-1') {
            displayCoDriverCue("Checkpoint reached! Told ya you’d make it 😉 Initiating Artwork Wall. Observe carefully.");
        } else if (levelId === 'level-quiz') {
            displayCoDriverCue("You’ve always been behind the wheel, but you never noticed the map in my hands. Let’s unlock this next gear — together. Initiating Stage 1: Quiz. Answer wisely, Driver.");
            // Reset quiz state
            document.querySelectorAll('.quiz-question input[type="radio"]').forEach(radio => radio.checked = false);
            quizFeedback.textContent = '';
            quizFeedback.classList.remove('correct', 'incorrect');
            quizNextLevelBtn.classList.add('hidden');
            submitQuizBtn.classList.remove('hidden'); // Make sure submit is visible for quiz
        }
        else if (levelId === 'level-2') {
            displayCoDriverCue("Careful… this next level's got heart speed bumps 😳💌 Entering Memory Lane. Navigate with care.");
            // Ensure timeline is scrolled to start on level entry
            if (memoryTimeline) memoryTimeline.scrollLeft = 0;
        } else if (levelId === 'level-qa') {
            displayCoDriverCue("Initiating Stage 2: Heart Unlock Q&A. Be truthful.");
            currentQaCardIndex = 0;
            qaCards.forEach((card, index) => {
                card.classList.add('hidden');
                card.querySelector('.qa-input').value = ''; // Clear input
            });
            qaFinalMessage.classList.add('hidden');
            qaFinalMessage.textContent = '';
            qaNextLevelBtn.classList.add('hidden');
            qaCards[0].classList.remove('hidden'); // Show first QA card
        }
        else if (levelId === 'level-music-video') {
            displayCoDriverCue("Activating Audio-Visual Module. Prepare for sonic input.");
            // Add particles for music video section
            createParticles(videoSectionParticles, 50);
            startLyricTypingEffect();
        } else if (levelId === 'level-healing-toolkit') {
            displayCoDriverCue("Welcome to the Healing Toolkit. Take a moment to recharge.");
        }
        else if (levelId === 'hidden-heart-message-section') {
            displayCoDriverCue("I’m your co-driver — in this game, in this life, and in every lap ahead. And I’ll always be cheering for you at the finish line. Final destination reached. Prepare for Heart Message protocol.");
            // No fuel update here as it's updated when entering this section by the button click
            createParticles(document.querySelector('#hidden-heart-message-section .particle-background'), 100);
        } else if (levelId === 'level-final-birthday-message') {
            displayCoDriverCue("The ultimate destination. Happy Birthday, my dear Shiroo! Listen to the final message.");
            updateFuelTank(); // Final fuel update for reaching the birthday message
            createParticles(document.querySelector('#level-final-birthday-message .particle-background'), 100);
            // Pause background music and ensure birthday audio is paused initially if it was playing
            backgroundMusic.pause();
            birthdayMessageAudio.pause();
            birthdayMessageAudio.currentTime = 0; // Rewind audio
            audioToggleButton.innerHTML = '<i class="fas fa-play"></i> Play Message'; // Reset button text
        }
    }

    // --- Event Listeners ---
    // NEW: Handle the "START THE JOURNEY" button on Level 0
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            document.getElementById('level-0').classList.add('hidden'); // Hide level-0
            coDriverDisplay.classList.remove('hidden'); // Show co-driver display
            displayCoDriverCue(introMessage, true, () => {
                // Callback after introMessage typing finishes
                ignitionStartButton.classList.remove('hidden'); // Show "IGNITE THE ENGINE" button
                // The coDriverDisplay needs to remain visible until ignitionStartButton is clicked
            });
        });
    }

    // NEW: Handle the "IGNITE THE ENGINE" button on co-driver-display
    if (ignitionStartButton) {
        ignitionStartButton.addEventListener('click', () => {
            coDriverDisplay.classList.add('hidden'); // Hide co-driver display
            ignitionStartButton.classList.add('hidden'); // Hide the button itself
            showLevel('level-1', true); // Transition to Level 1, update fuel
        });
    }


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

    if (closeOverlayBtns) {
        closeOverlayBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.overlay-message').classList.remove('visible');
                if (artworkFrame && btn.closest('#artwork-overlay')) {
                    artworkFrame.classList.remove('revealed'); // Reset artwork state
                }
            });
        });
    }

    // --- Memory Timeline Navigation ---
    if (memoryTimeline) {
        navArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const memoryItem = memoryTimeline.querySelector('.memory-item');
                if (!memoryItem) return;
                const scrollAmount = memoryItem.offsetWidth + 30; // Item width + margin
                if (arrow.classList.contains('left')) {
                    memoryTimeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    memoryTimeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        });
    }

    // --- Quiz Logic (Stage 1) ---
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            const answers = {
                q1: document.querySelector('input[name="q1"]:checked')?.value,
                q2: document.querySelector('input[name="q2"]:checked')?.value,
                q3: document.querySelector('input[name="q3"]:checked')?.value
            };

            const correctAnswers = {
                q1: 'hugs',
                q2: 'black', // Updated: Assuming 'black' is the intended answer for "Black or White?"
                q3: 'batman' // Corrected as per your request
            };

            let allCorrect = true;
            let feedbackMessages = [];

            if (answers.q1 !== correctAnswers.q1) {
                allCorrect = false;
                feedbackMessages.push("Q1: Not quite right. Think about what truly warms the heart. 😉");
            }
            if (answers.q2 !== correctAnswers.q2) {
                allCorrect = false;
                feedbackMessages.push("Q2: Not exactly. Remember what I said about the world with you? 🤔");
            }
            if (answers.q3 !== correctAnswers.q3) {
                allCorrect = false;
                feedbackMessages.push("Q3: Close, but I know your secret ambition! Try again. 😉");
            }

            quizFeedback.classList.remove('correct', 'incorrect');
            if (allCorrect) {
                quizFeedback.textContent = "✅ Fuel Loaded. Next checkpoint unlocked 💛";
                quizFeedback.classList.add('correct');
                quizNextLevelBtn.classList.remove('hidden');
                submitQuizBtn.classList.add('hidden'); // Hide submit button
                displayCoDriverCue("Quiz complete. Fuel level boosted!");
            } else {
                quizFeedback.innerHTML = "❌ Incorrect answers. Try again, Driver!<br>" + feedbackMessages.join("<br>");
                quizFeedback.classList.add('incorrect');
                displayCoDriverCue("Incorrect. Recalculating path.");
            }
        });
    }


    // --- Q&A Logic (Stage 2) ---
    if (qaNextBtns.length > 0) {
        qaNextBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Optionally store answer: const answer = btn.previousElementSibling.value;
                qaCards[index].classList.add('hidden');
                currentQaCardIndex++;
                if (currentQaCardIndex < qaCards.length) {
                    qaCards[currentQaCardIndex].classList.remove('hidden');
                } else {
                    // All QA cards done
                    qaFinalMessage.textContent = "Good answers, Driver. You may now unlock the final gearshift — my heart 💌";
                    qaFinalMessage.classList.remove('hidden');
                    qaNextLevelBtn.classList.remove('hidden');
                    displayCoDriverCue("Q&A complete. Proceeding to final unlock.");
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

    // Add particle styles to the head (for dynamic particle creation) (moved to style.css for better organization)


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

    // --- Healing Toolkit / Hug Logic ---
    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            displayCoDriverCue("Virtual hug initiated. Recharge complete.");
        });
    }

    // NEW: Final Message Button Logic
    if (finalMessageButton) {
        finalMessageButton.addEventListener('click', () => {
            const targetLevel = finalMessageButton.dataset.target;
            showLevel(targetLevel, true); // Update fuel for the very final level
        });
    }

    // NEW: Audio Toggle Button Logic
    if (audioToggleButton) {
        audioToggleButton.addEventListener('click', () => {
            if (birthdayMessageAudio.paused) {
                birthdayMessageAudio.play()
                    .then(() => {
                        audioToggleButton.innerHTML = '<i class="fas fa-pause"></i> Pause Message';
                        backgroundMusic.pause(); // Pause background music when birthday message plays
                    })
                    .catch(e => console.log("Audio playback blocked:", e));
            } else {
                birthdayMessageAudio.pause();
                audioToggleButton.innerHTML = '<i class="fas fa-play"></i> Play Message';
                backgroundMusic.play().catch(e => console.log("Background music autoplay blocked:", e)); // Resume background music
            }
        });

        // Reset button and background music when birthday message ends
        birthdayMessageAudio.addEventListener('ended', () => {
            audioToggleButton.innerHTML = '<i class="fas fa-play"></i> Play Message';
            backgroundMusic.play().catch(e => console.log("Background music autoplay blocked:", e));
        });
    }
});
