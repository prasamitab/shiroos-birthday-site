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
    const qaCards = document.querySelectorAll('.qa-card'); // Corrected selector
    const qaNextBtns = document.querySelectorAll('.qa-next-btn');
    const qaFinalMessage = document.getElementById('qa-final-message');
    const qaNextLevelBtn = document.querySelector('#level-qa .next-level-btn');
    let currentQaCardIndex = 0;

    // NEW: Hug Button and Overlay
    const hugButton = document.getElementById('hug-button');
    const hugOverlay = document.getElementById('hug-overlay');
    const hugMessage = document.getElementById('hug-message'); // NEW: Get the hug message element

    // NEW: Audio for Final Message
    const birthdayAudio = document.getElementById('birthday-audio');

    // NEW: Milestone message elements
    const milestoneMessageDisplay = document.getElementById('milestone-message-display');
    const milestoneMessageCue = document.getElementById('milestone-message-cue');


    // --- NEW: Intro Message Content (Split into lines) ---
    const introMessageLines = [
        `Hey driver, buckle up — your co-driver (me) is right here beside you.`,
        `This ride’s for you, and I’m guiding you through every curve, every speed bump, every smile.`,
        `Let’s go.`,
        ``, // Empty line for a pause
        `You’re the only one I have, and I love you more than words can express.`,
        `I miss you so much, and I’m incredibly grateful to have you in my life.`,
        `You’re everything to me — my solution, my magical world.`,
        ``,
        `I imagine myself living in the world you’ve created for me, where I feel safe and loved.`,
        `I love being in your arms.`,
        `Without you, this world feels boring and dull, as if it’s black and white.`,
        `But with you, it’s full of colors, love, and joy.`,
        `You’re the best part of my life.`,
        ``,
        `You are my sunshine, my only sunshine, and you make me so, so happy.`,
        `I want to live in this magical world of ours forever, and never leave.`,
        `You are my everything — my heart, my soul, my world.`
    ];


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

    // Add styles for love quote pop-ups dynamically
    const loveQuoteStyle = document.createElement("style");
    loveQuoteStyle.type = "text/css";
    loveQuoteStyle.innerText = `
        .love-quote-popup {
            position: fixed;
            background: rgba(255, 105, 180, 0.8); /* Hot pink */
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-family: 'Roboto Mono', monospace;
            font-size: 1.1em;
            text-align: center;
            box-shadow: 0 0 15px rgba(255, 105, 180, 0.7), inset 0 0 8px rgba(255, 255, 255, 0.5);
            z-index: 200;
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            transition: all 0.5s ease-out;
            pointer-events: none; /* Allows clicks to pass through to elements below */
        }
        .love-quote-popup.show {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        .love-quote-popup.hide {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
        }
    `;
    document.head.appendChild(loveQuoteStyle);


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


    // --- NEW: Typewriter for multiline messages ---
    let currentLineIndex = 0;
    let currentCharacterIndex = 0;
    let typeLineTimeout;
    let isTyping = false; // Flag to prevent multiple typing instances

    function typeLineByLine(lines, onCompleteCallback = null) {
        if (isTyping) return; // Prevent new typing if already typing
        isTyping = true;
        coDriverCue.textContent = ''; // Clear existing content
        coDriverCue.classList.add('typewriter-line'); // Add a specific class for line-by-line typing
        coDriverCue.classList.remove('hidden');
        coDriverCue.style.animation = 'none'; // Clear previous animation
        coDriverCue.style.width = 'auto'; // Allow width to adjust per line
        coDriverCue.style.borderRight = '.15em solid #00FFC0'; // Ensure cursor is visible

        const speed = 30; // Typing speed in ms per character
        const pauseBetweenLines = 1000; // Pause in ms after each line

        function typeNextCharacter() {
            if (currentLineIndex < lines.length) {
                const currentLine = lines[currentLineIndex];
                if (currentCharacterIndex < currentLine.length) {
                    coDriverCue.textContent += currentLine.charAt(currentCharacterIndex);
                    currentCharacterIndex++;
                    typeLineTimeout = setTimeout(typeNextCharacter, speed);
                } else {
                    // Line complete, add a line break
                    coDriverCue.textContent += '\n'; // Add newline for the next line
                    coDriverCue.style.borderRight = 'none'; // Hide cursor temporarily
                    // Move to next line
                    currentLineIndex++;
                    currentCharacterIndex = 0;
                    typeLineTimeout = setTimeout(() => {
                        coDriverCue.style.borderRight = '.15em solid #00FFC0'; // Show cursor again
                        typeNextCharacter(); // Start typing the next line
                    }, pauseBetweenLines);
                }
            } else {
                // All lines typed
                coDriverCue.style.borderRight = 'none'; // Hide final cursor
                isTyping = false;
                if (onCompleteCallback) onCompleteCallback();
            }
        }

        // Reset and start
        currentLineIndex = 0;
        currentCharacterIndex = 0;
        typeNextCharacter();
    }

    // Original displayCoDriverCue for single messages or fading
    function displayCoDriverCue(message, typewriter = false, callback = null) {
        clearTimeout(typeLineTimeout); // Clear any ongoing line-by-line typing
        isTyping = false; // Reset typing flag

        coDriverCue.textContent = ''; // Clear existing content
        coDriverCue.classList.remove('typewriter', 'typewriter-line'); // Remove all typewriter classes
        coDriverCue.style.animation = 'none'; // Reset any previous animation
        coDriverCue.style.width = 'auto'; // Reset width
        coDriverCue.style.borderRight = 'none'; // Hide cursor by default
        coDriverDisplay.classList.remove('hidden'); // Ensure display is visible
        coDriverDisplay.style.opacity = '1'; // Ensure display is fully opaque
        coDriverDisplay.style.pointerEvents = 'auto'; // Ensure it can receive clicks initially

        void coDriverCue.offsetWidth; // Trigger reflow for animation reset

        if (typewriter) {
            // This path is now only for single-line typewriter effects if needed elsewhere,
            // but for introMessage, typeLineByLine is preferred.
            coDriverCue.classList.add('typewriter');
            const speed = 30; // Typing speed in ms per character
            const typingAnimationDuration = message.length * speed / 1000; // Duration in seconds

            coDriverCue.textContent = message;
            coDriverCue.style.whiteSpace = 'pre-wrap';

            coDriverCue.style.animation = `typing ${typingAnimationDuration}s steps(${message.length}, end) forwards, blink-caret .75s step-end infinite`;
            coDriverCue.style.width = '100%';
            coDriverCue.style.borderRight = '.15em solid #00FFC0'; // Show cursor for this effect

            setTimeout(() => {
                coDriverCue.style.borderRight = 'none'; // Hide cursor
                if (callback) callback(); // Call callback (e.g., to show ignition button)
            }, typingAnimationDuration * 1000 + 500);
        } else {
            // For standard, non-typewriter messages (e.g., from showLevel)
            coDriverCue.textContent = message;
            coDriverCue.style.opacity = '1';
            coDriverCue.style.animation = 'textAppear 1s forwards'; // Simple fade in
            coDriverCue.style.whiteSpace = 'pre-wrap';


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

    // --- Function for temporary milestone messages ---
    function displayMilestoneMessage(message) {
        milestoneMessageCue.textContent = message;
        milestoneMessageDisplay.classList.remove('hidden');
        milestoneMessageDisplay.classList.add('visible');

        // Set a timeout to fade out and hide after 3 seconds
        setTimeout(() => {
            milestoneMessageDisplay.classList.remove('visible');
            milestoneMessageDisplay.classList.add('fade-out');
            // After fade out transition completes, actually hide it
            setTimeout(() => {
                milestoneMessageDisplay.classList.add('hidden');
                milestoneMessageDisplay.classList.remove('fade-out'); // Clean up class
            }, 500); // This should match the transition duration in CSS (0.5s)
        }, 3000); // Display for 3 seconds
    }


    // --- Fuel Tank Animation ---
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
    // 8. Final Message (audio) shown (new fuel increment)
    // Total 8 "steps" to fill from 0% to 100% after the initial level-0
    const maxFuelLevels = 8; // Increased from 7 to 8
    let currentFuelStage = 0; // Start at 0, representing the "Ready for pilot input." stage (level-0)

    function updateFuelTank() {
        currentFuelStage++; // Increment stage each time this is called
        if (currentFuelStage > maxFuelLevels) {
            currentFuelStage = maxFuelLevels; // Cap at max
        }
        fuelLevel = (currentFuelStage / maxFuelLevels) * 100;
        fuelFill.style.height = `${fuelLevel}%`;
        // No longer using coDriverCue for fuel level updates, as they are now handled by milestone messages
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

        // Stop background music if final audio is about to play
        if (levelId === 'level-final-message' && backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        } else if (backgroundMusic && backgroundMusic.paused && backgroundMusic.currentTime === 0) {
            // Resume background music if it was paused for the final message and we navigate away
            // Only play if it's currently at the beginning (was stopped for final message)
            backgroundMusic.play().catch(e => console.log("Music autoplay blocked:", e));
        }

        // Specific cues for each level
        if (levelId === 'level-0') {
            // This is the initial message that stays until interaction
            // No milestone message here, handled by `displayCoDriverCue` in initial load and ignition button
        } else if (levelId === 'level-1') {
            displayMilestoneMessage("Checkpoint reached! Initiating Artwork Wall. Observe carefully.");
        } else if (levelId === 'level-quiz') {
            displayMilestoneMessage("You’ve always been behind the wheel, but you never noticed the map in my hands. Let’s unlock this next gear — together. Initiating Stage 1: Quiz. Answer wisely, Driver.");
            // Reset quiz state
            document.querySelectorAll('.quiz-question input[type="radio"]').forEach(radio => radio.checked = false);
            quizFeedback.textContent = '';
            quizFeedback.classList.remove('correct', 'incorrect');
            quizNextLevelBtn.classList.add('hidden');
            submitQuizBtn.classList.remove('hidden'); // Make sure submit is visible for quiz
        }
        else if (levelId === 'level-2') {
            displayMilestoneMessage("Careful… this next level's got heart speed bumps 😳💌 Entering Memory Lane. Navigate with care.");
            // Ensure timeline is scrolled to start on level entry
            if (memoryTimeline) memoryTimeline.scrollLeft = 0;
        } else if (levelId === 'level-qa') {
            displayMilestoneMessage("Initiating Stage 2: Heart Unlock Q&A. Be truthful.");
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
            displayMilestoneMessage("Activating Audio-Visual Module. Prepare for sonic input.");
            // Add particles for music video section
            createParticles(videoSectionParticles, 50);
            startLyricTypingEffect();
        } else if (levelId === 'level-healing-toolkit') {
            displayMilestoneMessage("Welcome to the Healing Toolkit. Take a moment to recharge.");
        }
        else if (levelId === 'hidden-heart-message-section') {
            displayMilestoneMessage("I’m your co-driver — in this game, in this life, and in every lap ahead. And I’ll always be cheering for you at the finish line. Final destination reached. Prepare for Heart Message protocol.");
            createParticles(document.querySelector('#hidden-heart-message-section .particle-background'), 100);
            // No fuel update here, fuel updates when actually *entering* the next level, which is now 'level-final-message'
        }
        else if (levelId === 'level-final-message') {
            displayMilestoneMessage("The ultimate checkpoint. Listen to my heart, Driver.");
            if (birthdayAudio) {
                birthdayAudio.play().catch(e => console.log("Birthday audio autoplay blocked:", e));
            }
            // This is the true final fuel update
            updateFuelTank();
        }
    }

    // --- Event Listeners ---
    // NEW: Handle the "START THE JOURNEY" button on Level 0
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            document.getElementById('level-0').classList.add('hidden'); // Hide level-0
            coDriverDisplay.classList.remove('hidden'); // Show co-driver display
            typeLineByLine(introMessageLines, () => { // Use new typeLineByLine function
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
                const parentOverlay = btn.closest('.overlay-message');
                if (parentOverlay) {
                    parentOverlay.classList.remove('visible');
                    // Special handling for hug overlay to hide its message
                    if (parentOverlay.id === 'hug-overlay') {
                        hugMessage.classList.remove('show'); // Hide the hug message
                    }
                }
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
                displayMilestoneMessage("Quiz complete. Fuel level boosted!");
            } else {
                quizFeedback.innerHTML = "❌ Incorrect answers. Try again, Driver!<br>" + feedbackMessages.join("<br>");
                quizFeedback.classList.add('incorrect');
                displayMilestoneMessage("Incorrect. Recalculating path.");
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
                    displayMilestoneMessage("Q&A complete. Proceeding to final unlock.");
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

    // --- Healing Toolkit / Hug Logic ---
    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            hugMessage.classList.add('show'); // Show the hug message with fade-in animation

            // Optionally, hide the message after a few seconds
            setTimeout(() => {
                hugMessage.classList.remove('show');
            }, 3000); // Message visible for 3 seconds
            // The overlay itself will stay visible until the close button is clicked.

            displayMilestoneMessage("Virtual hug initiated. Recharge complete."); // This still appears at the bottom
        });
    }
});
