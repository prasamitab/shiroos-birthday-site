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

    // NEW: Final Message Text for Typewriter Effect
    const finalMessageTextContent = `
        To the man who drives forward no matter what and reached here

        Happy Birthday, my Shiroo.

        Nineetteeennnnn hogayeeeee bbbyy,

        Ab we aren’t meeting in person toh that doesn’t stop me from riding along with you , mai humesha tere sath rahungi 😘😘kaise na kaise.

        Through every twist, turn, traffic jam, and night drive annd drinks, I’ve watched you move forward never losing momentum and i love that thing about youuuuuuuu.

        Ye artwork? Made with my hands.

        Ye page? Built with memories.

        But the heart behind it? Pooooraa teraaa janeman.

        I’m your co driver , passenger princess whatever here, always have been.

        I am falling in love with every mile you drive.

        You my inspirationn ukk.

        Not because you’re perfect but because you’re real, rare, kind, sweet , romantic, caring, annoying and mine in ways words pe nahi bol paungi hehehe.

        Keep driving towards what makes you feel alive and Im always right here for you baby.

        And aurr kuchh nahiiiiii

        I’ll always be in the passenger seat , with the map, giving wrong directions .

        Happy Birthdayyyyyyyy Baby.

        Forever your co-driver,

        Im Yoursssss in the end

        I’m your co-driver — in this game, in this life, and in every lap ahead. And I’ll always be cheering for you at the finish line.
    `.trim(); // .trim() removes leading/trailing whitespace

    const finalMessageDisplayArea = document.getElementById('final-message-text');


    // --- Intro Message Content ---
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

        // Initially show level-0
        showLevel('level-0', false); // No fuel update yet, this is the very first visible state
        // Start love quote pop-ups
        quoteInterval = setInterval(showLoveQuote, 10000); // Every 10 seconds

    }, 3000); // 3 seconds loading screen


    // --- displayCoDriverCue function to handle both typewriter and fade-in ---
    function displayCoDriverCue(message, useTypewriter = false, callback = null) {
        coDriverCue.textContent = ''; // Clear existing content
        coDriverCue.classList.remove('typewriter'); // Reset typewriter class
        coDriverCue.style.animation = 'none'; // Reset any previous animation
        coDriverDisplay.classList.remove('hidden'); // Ensure display is visible
        coDriverDisplay.style.opacity = '1'; // Ensure display is fully opaque
        coDriverCue.style.borderRight = 'none'; // Ensure cursor is off by default for fade-in

        void coDriverCue.offsetWidth; // Trigger reflow for animation reset

        if (useTypewriter) {
            coDriverCue.classList.add('typewriter');
            const speed = 70; // Typing speed in ms per character
            const typingAnimationDuration = message.length * speed / 1000; // Duration in seconds

            coDriverCue.textContent = message;
            coDriverCue.style.whiteSpace = 'pre-wrap'; // Preserve line breaks

            coDriverCue.style.animation = `typing ${typingAnimationDuration}s steps(${message.length}, end) forwards, blink-caret .75s step-end infinite`;
            coDriverCue.style.width = '100%';

            setTimeout(() => {
                coDriverCue.style.borderRight = 'none'; // Hide cursor
                if (callback) callback();
            }, typingAnimationDuration * 1000 + 500); // A small delay after typing for cursor to disappear
        } else {
            // Fade-in animation
            coDriverCue.textContent = message;
            coDriverCue.style.opacity = '0'; // Start invisible for fade-in
            coDriverCue.style.animation = 'fadeIn 1s forwards'; // Simple fade in
            coDriverCue.style.whiteSpace = 'normal'; // Reset white-space for normal text

            // Add fadeIn animation style if it doesn't exist
            if (!document.getElementById('fadeInStyle')) {
                const fadeStyle = document.createElement('style');
                fadeStyle.id = 'fadeInStyle';
                fadeStyle.innerHTML = `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(fadeStyle);
            }

            // After a delay, fade out the co-driver display
            const fadeOutDelay = 8000; // Increased duration for fade-in messages (8 seconds)
            setTimeout(() => {
                coDriverDisplay.style.opacity = '0'; // Fade out the display
                // Completely hide after fade out
                setTimeout(() => {
                    coDriverDisplay.classList.add('hidden');
                    if (callback) callback(); // Execute callback after fade out
                }, 1000); // Wait for fadeOut animation (1 second)
            }, fadeOutDelay);
        }
    }


    // --- Function to type out the final message ---
    let finalMessageCharIndex = 0;
    let finalMessageTypingTimeout;

    function typeFinalMessage() {
        if (finalMessageCharIndex < finalMessageTextContent.length) {
            finalMessageDisplayArea.textContent += finalMessageTextContent.charAt(finalMessageCharIndex);
            finalMessageCharIndex++;
            finalMessageTypingTimeout = setTimeout(typeFinalMessage, 50); // Typing speed for final message
        } else {
            // Typing complete, hide cursor
            finalMessageDisplayArea.style.borderRight = 'none';
        }
    }


    // --- Fuel Tank Animation ---
    let fuelLevel = 0;
    // Stages that contribute to fuel:
    // 0. (Implicit: Start of game at level-0)
    // 1. After START THE JOURNEY -> Intro Message complete -> IGNITE THE ENGINE click -> Level 1 (First fuel update here)
    // 2. Level Quiz shown
    // 3. Level 2 (Memory Lane) shown
    // 4. Level QA shown
    // 5. Level Music Video shown
    // 6. Level Healing Toolkit shown
    // 7. Hidden Heart Message Section shown (final fuel increment)
    // Total 7 "steps" to fill from 0% to 100% after the initial level-0
    const maxFuelLevels = 7;
    let currentFuelStage = 0; // Start at 0, representing the "Ready for pilot input." stage (level-0)

    function updateFuelTank() {
        currentFuelStage++; // Increment stage each time this is called
        if (currentFuelStage > maxFuelLevels) {
            currentFuelStage = maxFuelLevels; // Cap at max
        }
        fuelLevel = (currentFuelStage / maxFuelLevels) * 100;
        fuelFill.style.height = `${fuelLevel}%`;
        displayCoDriverCue(`Fuel level increased to ${Math.round(fuelLevel)}%!`, false); // Use fade-in for fuel update cues
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
            displayCoDriverCue("System initiated. Ready for pilot input.", false); // Fade-in
        } else if (levelId === 'level-1') {
            displayCoDriverCue("Checkpoint reached! Told ya you’d make it 😉 Initiating Artwork Wall. Observe carefully.", false); // Fade-in
        } else if (levelId === 'level-quiz') {
            displayCoDriverCue("You’ve always been behind the wheel, but you never noticed the map in my hands. Let’s unlock this next gear — together. Initiating Stage 1: Quiz. Answer wisely, Driver.", false); // Fade-in
            // Reset quiz state
            document.querySelectorAll('.quiz-question input[type="radio"]').forEach(radio => radio.checked = false);
            quizFeedback.textContent = '';
            quizFeedback.classList.remove('correct', 'incorrect');
            quizNextLevelBtn.classList.add('hidden');
            submitQuizBtn.classList.remove('hidden'); // Make sure submit is visible for quiz
        }
        else if (levelId === 'level-2') {
            displayCoDriverCue("Careful… this next level's got heart speed bumps 😳💌 Entering Memory Lane. Navigate with care.", false); // Fade-in
            // Ensure timeline is scrolled to start on level entry
            if (memoryTimeline) memoryTimeline.scrollLeft = 0;
        } else if (levelId === 'level-qa') {
            displayCoDriverCue("Initiating Stage 2: Heart Unlock Q&A. Be truthful.", false); // Fade-in
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
            displayCoDriverCue("Activating Audio-Visual Module. Prepare for sonic input.", false); // Fade-in
            // Add particles for music video section
            createParticles(videoSectionParticles, 50);
            startLyricTypingEffect();
        } else if (levelId === 'level-healing-toolkit') {
            displayCoDriverCue("Welcome to the Healing Toolkit. Take a moment to recharge.", false); // Fade-in
        }
        else if (levelId === 'hidden-heart-message-section') {
            displayCoDriverCue("I’m your co-driver — in this game, in this life, and in every lap ahead. And I’ll always be cheering for you at the finish line. Final destination reached. Prepare for Heart Message protocol.", false, () => {
                // After this cue fades out, start typing the final message
                finalMessageCharIndex = 0; // Reset for re-typing if needed
                finalMessageDisplayArea.textContent = ''; // Clear previous text
                typeFinalMessage(); // Start typewriter effect for final message
            });
            createParticles(document.querySelector('#hidden-heart-message-section .particle-background'), 100);
            updateFuelTank(); // Final fuel update
        }
    }

    // --- Event Listeners ---
    // Handle the "START THE JOURNEY" button on Level 0
    if (ignitionButton) {
        ignitionButton.addEventListener('click', () => {
            document.getElementById('level-0').classList.add('hidden'); // Hide level-0
            coDriverDisplay.classList.remove('hidden'); // Show co-driver display
            displayCoDriverCue(introMessage, true, () => { // Use typewriter for introMessage
                // Callback after introMessage typing finishes
                ignitionStartButton.classList.remove('hidden'); // Show "IGNITE THE ENGINE" button
                coDriverCue.style.animation = 'none'; // Stop typewriter animation on cue
                coDriverCue.style.borderRight = 'none'; // Hide cursor
            });
        });
    }

    // Handle the "IGNITE THE ENGINE" button on co-driver-display
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
                q2: 'black', // Correct answer for 'black or white'
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
                displayCoDriverCue("Quiz complete. Fuel level boosted!", false); // Fade-in
            } else {
                quizFeedback.textContent = "❌ Incorrect answers. Try again, Driver!";
                quizFeedback.classList.add('incorrect');
                displayCoDriverCue("Incorrect. Recalculating path.", false); // Fade-in
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
                    displayCoDriverCue("Q&A complete. Proceeding to final unlock.", false); // Fade-in
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
        /* NEW: Fade-in animation for co-driver cue */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        /* Ensure the co-driver cue text handles wrapping */
        .co-driver-display p {
            white-space: pre-wrap; /* Allows text to wrap naturally while preserving manual line breaks */
        }
        /* Style for typewriter cursor on the final message */
        #final-message-text {
            display: inline-block; /* Essential for typewriter effect to show cursor properly */
            overflow: hidden; /* Ensures text is hidden until typed */
            /* Removed fixed width to allow natural wrapping */
            border-right: .15em solid orange; /* The caret */
            white-space: pre-wrap; /* Allows text to wrap naturally while preserving manual line breaks */
            margin: 0;
            animation: blink-caret .75s step-end infinite;
            font-family: 'Roboto Mono', monospace; /* Match your existing font */
        }
        /* Fix for typewriter effect being cutoff due to animation applying width */
        .co-driver-display p.typewriter {
            white-space: pre-wrap; /* Ensures line breaks are respected */
            overflow: hidden; /* Hides text that hasn't been typed yet */
            width: 100%; /* Important: Set to 100% to allow content to dictate width, not the animation steps */
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
            displayCoDriverCue("Virtual hug initiated. Recharge complete.", false); // Fade-in
        });
    }
});
