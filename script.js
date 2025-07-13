document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const gameContainer = document.getElementById('game-container');
    const coDriverDisplay = document.getElementById('co-driver-display');
    const coDriverCue = document.getElementById('co-driver-cue');
    const ignitionStartButton = document.getElementById('ignition-start-button'); // NEW
    const ignitionButton = document.getElementById('ignition-button'); // Original START THE JOURNEY button
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

        // Display the long intro message immediately in typewriter style
        displayCoDriverCue(introMessage, true, () => {
            // Callback after typing effect completes for the intro message
            ignitionStartButton.classList.remove('hidden'); // Show the "IGNITE THE ENGINE" button
        });

    }, 3000); // 3 seconds loading screen


    function displayCoDriverCue(message, typewriter
