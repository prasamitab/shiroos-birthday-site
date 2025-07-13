document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionButton = document.getElementById('ignition-button');
    const artworkFrame = document.getElementById('artwork-frame');
    const artworkOverlay = document.getElementById('artwork-overlay');
    const closeOverlayBtns = document.querySelectorAll('.close-overlay-btn'); // Use querySelectorAll
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

    // --- NEW: Intro Message Content ---
    const introMessage = `Hey driver, buckle up — your co-driver (me) is right here beside you. This ride’s for you, and I’m guiding you through every curve, every speed bump, every smile. Let’s go.

    You’re the only one I have, and I love you more than words can express. I miss you so much, and I’m incredibly grateful to have you in my life. You’re everything to me — my solution, my magical world.

    I imagine myself living in the world you’ve created for me, where I feel safe and loved. I love being in your arms. Without you, this world feels boring and dull, as if it’s black and white. But with you, it’s full of colors, love, and joy. You’re the best part of my life.

    You are my sunshine, my only sunshine, and you make me so, so happy. I want to live in this magical world of ours forever, and never leave. You are my everything — my heart, my soul, my world.`;


    // --- Loading Sequence ---
    // Simulate loading time and play music
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        // Play background music
        if (backgroundMusic) {
            backgroundMusic.volume = 0.5; // Set a default volume
            backgroundMusic.play().catch(e => console.log("Music autoplay blocked:", e));
        }
        displayCoDriverCue(introMessage, true, () => {
            // Callback after typing effect completes
            setTimeout(() => {
                displayCoDriverCue("System initiated. Ready for pilot input."); // Shorter message after intro
            }, 1000);
        });
    }, 3000); // 3 seconds loading

    function displayCoDriverCue(message, typewriter = false, callback = null) {
        coDriverCue.textContent = ''; // Clear existing content
        coDriverCue.classList.remove('typewriter'); // Reset typewriter class
        coDriverCue.style.animation = 'none'; // Reset any previous animation
        void coDriverCue.offsetWidth; // Trigger reflow

        if (typewriter) {
            coDriverCue.classList.add('typewriter');
            let i = 0;
            const speed = 25; // Typing speed in ms
            const cursorBlinkInterval = 750; // Cursor blink speed in ms

            // Remove existing typing/blink animations if any
            coDriverCue.style.animation = 'none';
            void coDriverCue.offsetWidth; // Reflow

            // Apply typing animation
            const typingAnimationDuration = message.length * speed / 1000;
            coDriverCue.style.animation = `typing ${typingAnimationDuration}s steps(${message.length}, end) forwards, blink-caret .75s step-end infinite`;
            coDriverCue.style.width = '100%'; // Ensure width is sufficient for text

            // Use innerText for typing, and ensure whitespace is preserved
            coDriverCue.textContent = message; // Set text content immediately for animation
            coDriverCue.style.whiteSpace = 'pre-wrap';

            // Calculate when typing is done and execute callback
            setTimeout(() => {
                coDriverCue.style.borderRight = 'none'; // Hide cursor
                if (callback) callback();
            }, typingAnimationDuration * 1000 + 500); // A small delay after typing
        } else {
            coDriverCue.textContent = message;
            coDriverCue.style.opacity = '1';
            coDriverCue.style.animation = 'textAppear 1s forwards'; // Simple fade in
            setTimeout(() => {
                coDriverDisplay.style.opacity = '0';
                coDriverCue.style.opacity = '0';
                coDriverCue.style.animation = 'none'; // Stop fade-out animation
            }, 5000); // Co-driver message visible for 5 seconds
        }
        coDriverDisplay.style.opacity = '1';
    }


    // --- NEW: Fuel Tank Animation ---
    let fuelLevel = 0;
    const maxFuelLevels = 5; // Total levels/stages that increase fuel
    let currentFuelStage = 0;

    function updateFuelTank() {
        currentFuelStage++;
        if (currentFuelStage > maxFuelLevels) {
            currentFuelStage = maxFuelLevels; // Cap at max
        }
        fuelLevel = (currentFuelStage / maxFuelLevels) * 100;
        fuelFill.style.height = `${fuelLevel}%`;
        displayCoDriverCue(`Fuel level increased to ${Math.round(fuelLevel)}%!`);
    }

    // --- Level Transitions ---
    function showLevel(levelId) {
        document.querySelectorAll('.level-section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(levelId).classList.remove('hidden');
        updateFuelTank(); // Increase fuel with each level completion
        // Specific cues for each level
        if (levelId === 'level-0') {
            displayCoDriverCue("Welcome, Pilot. Press the ignition.");
        } else if (levelId === 'level-1') {
            displayCoDriverCue("Initiating Artwork Wall. Observe carefully.");
        } else if (levelId === 'level-quiz') {
            displayCoDriverCue("Initiating Stage 1: Quiz. Answer wisely, Driver.");
            // Reset quiz state
            document.querySelectorAll('.quiz-question input[type="radio"]').forEach(radio => radio.checked = false);
            quizFeedback.textContent = '';
            quizFeedback.classList.remove('correct', 'incorrect');
            quizNextLevelBtn.classList.add('hidden');
        }
        else if (levelId === 'level-2') {
            displayCoDriverCue("Entering Memory Lane. Navigate with care.");
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
            displayCoDriverCue("Final destination reached. Prepare for Heart Message protocol.");
            createParticles(document.querySelector('#hidden-heart-message-section .particle-background'), 100);
        }
    }

    // Initial Level
    showLevel('level-0'); // Will increase fuel by 1 for initial load

    // --- Event Listeners ---
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            showLevel('level-1');
            displayCoDriverCue("Engine ignited. Proceed to Level 1.");
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

    if (closeOverlayBtns) { // Use for all close buttons
        closeOverlayBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.overlay-message').classList.remove('visible'); // Find parent overlay
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
                if (!memoryItem) return; // Exit if no items
                const scrollAmount = memoryItem.offsetWidth + 30; // Item width + margin
                if (arrow.classList.contains('left')) {
                    memoryTimeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    memoryTimeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            });
        });
    }

    // --- NEW: Quiz Logic (Stage 1) ---
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', () => {
            const answers = {
                q1: document.querySelector('input[name="q1"]:checked')?.value,
                q2: document.querySelector('input[name="q2"]:checked')?.value,
                q3: document.querySelector('input[name="q3"]:checked')?.value
            };

            const correctAnswers = {
                q1: 'hugs',
                q2: 'black',
                q3: 'batman'
            };

            let allCorrect = true;
            for (const q in correctAnswers) {
                if (answers[q] !== correctAnswers[q]) {
                    allCorrect = false;
                    break;
                }
            }

            quizFeedback.classList.remove('correct', 'incorrect');
            if (allCorrect) {
                quizFeedback.textContent = "✅ Fuel Loaded. Next checkpoint unlocked 💛";
                quizFeedback.classList.add('correct');
                quizNextLevelBtn.classList.remove('hidden');
                submitQuizBtn.classList.add('hidden'); // Hide submit button
                displayCoDriverCue("Quiz complete. Fuel level boosted!");
            } else {
                quizFeedback.textContent = "❌ Incorrect answers. Try again, Driver!";
                quizFeedback.classList.add('incorrect');
                displayCoDriverCue("Incorrect. Recalculating path.");
            }
        });
    }


    // --- NEW: Q&A Logic (Stage 2) ---
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

    // --- NEW: Healing Toolkit / Hug Logic ---
    if (hugButton) {
        hugButton.addEventListener('click', () => {
            hugOverlay.classList.add('visible');
            displayCoDriverCue("Virtual hug initiated. Recharge complete.");
        });
    }
});
