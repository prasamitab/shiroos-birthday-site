/* Basic Reset & Body Styles */
body {
    margin: 0;
    overflow: hidden; /* Prevent scrolling */
    font-family: 'Roboto Mono', monospace;
    color: #00FFC0; /* Cyberpunk green */
    background-color: #0d0d0d;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    cursor: url('data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"20\\\" height=\\\"20\\\" viewBox=\\\"0 0 20 20\\\\\\\"><circle cx=\\\\\\\"10\\\\\\\" cy=\\\\\\\"10\\\\\\\" r=\\\\\\\"4\\\\\\\" fill=\\\\\\\"%2300FFC0\\\\\\\" stroke=\\\\\\\"%2300FFFF\\\\\\\" stroke-width=\\\\\\\"1.5\\\\\\\"/></svg>') 10 10, auto; /* Custom cyberpunk cursor */
    user-select: none; /* Prevent text selection */
}

/* Hidden Utility Class */
.hidden {
    display: none !important;
}

/* Loading Screen */
#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #1a0a2a, #0a0a0a, #1a0a2a);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    z-index: 1000;
}

.loading-spinner {
    border: 8px solid rgba(0, 255, 192, 0.2);
    border-top: 8px solid #00FFC0;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Game Container */
#game-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #0a0a0a;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.garage-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('images/cyberpunk-garage.jpg') no-repeat center center/cover;
    filter: brightness(0.6) blur(2px);
    z-index: 0;
}

.floor-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: radial-gradient(circle, #00FFFF, transparent 70%);
    opacity: 0.3;
    z-index: 1;
}

.car-silhouette {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%; /* Adjust as needed */
    max-width: 1000px; /* Limit size on large screens */
    height: 60%; /* Adjust as needed */
    max-height: 500px;
    background: url('images/cyberpunk-car.png') no-repeat center bottom/contain;
    z-index: 2;
    opacity: 0.8;
}

/* General Section Styling */
.level-section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 700px;
    background-color: rgba(13, 13, 13, 0.9);
    border: 2px solid #00FFC0;
    box-shadow: 0 0 15px #00FFC0, inset 0 0 10px #00FFFF;
    padding: 30px;
    text-align: center;
    z-index: 5;
    transition: opacity 0.5s ease-in-out;
}

.level-section h2, .level-section h3 {
    color: #00FFFF;
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0 0 8px #00FFC0;
    margin-bottom: 20px;
}

.level-section p {
    margin-bottom: 15px;
    line-height: 1.6;
}

/* Dashboard Items */
.dashboard-item {
    background-color: rgba(26, 26, 26, 0.8);
    border: 1px solid #00FFC0;
    box-shadow: 0 0 10px rgba(0, 255, 192, 0.5);
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
}

/* Glow Button Styling */
.glow-button {
    background-color: #0a0a0a;
    color: #00FFC0;
    border: 2px solid #00FFC0;
    padding: 12px 25px;
    font-family: 'Orbitron', sans-serif;
    font-size: 1.1em;
    cursor: pointer;
    box-shadow: 0 0 10px #00FFC0;
    transition: all 0.3s ease;
    text-transform: uppercase;
    margin-top: 20px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
}

.glow-button:hover {
    background-color: #00FFC0;
    color: #0a0a0a;
    box-shadow: 0 0 20px #00FFFF;
}

.glow-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
    transition: 0.5s;
}

.glow-button:hover::before {
    left: 100%;
}

/* Co-Driver Display */
.co-driver-display {
    position: absolute;
    top: 50px;
    right: 50px;
    width: 300px;
    background-color: rgba(26, 26, 26, 0.9);
    border: 2px solid #00FFC0;
    box-shadow: 0 0 12px #00FFC0;
    padding: 25px;
    border-radius: 10px;
    font-size: 1.1em;
    text-align: left;
    z-index: 10;
}

#co-driver-cue {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the text animates */
    animation: typewriter 2s steps(40, end);
}

/* Fuel Tank */
.fuel-tank-container {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 50px;
    height: 150px;
    border: 2px solid #00FFC0;
    border-radius: 10px;
    background-color: rgba(26, 26, 26, 0.9);
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    box-shadow: 0 0 12px #00FFC0;
    z-index: 10;
}

.fuel-tank-fill {
    width: 100%;
    background-color: #00FFC0;
    transition: height 0.5s ease-out, background-color 0.5s ease-out;
}

.fuel-tank-level {
    position: absolute;
    bottom: 5px;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    text-shadow: 0 0 5px #00FFFF;
}

/* Artwork Frame (Level 1) */
.artwork-frame {
    width: 300px;
    height: 400px;
    border: 3px solid #00FFFF;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    background-color: #000;
}

.artwork-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s ease-in-out;
}

.artwork-frame img.active-artwork {
    opacity: 1;
}

.artwork-caption {
    font-style: italic;
    color: #00FFFF;
    text-shadow: 0 0 5px #00FFC0;
    margin-top: 10px;
}

/* Quiz Styles (Level Quiz) */
.quiz-question {
    margin-top: 20px;
    text-align: left;
    padding: 15px;
    border: 1px dashed #00FFC0;
    border-radius: 5px;
    background-color: rgba(0, 255, 192, 0.05);
}

.quiz-question label {
    margin-left: 10px;
    cursor: pointer;
}

.quiz-question input[type="radio"] {
    accent-color: #00FFC0; /* Custom radio button color */
}

.quiz-feedback {
    margin-top: 15px;
    font-weight: bold;
    color: #FF4500; /* Red for incorrect, will change to green for correct */
}

/* Memory Timeline (Level 2) */
.memory-timeline-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
}

.memory-timeline {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.memory-item {
    flex: 0 0 auto;
    width: 250px; /* Standard width for memory items */
    margin: 0 10px;
    text-align: center;
    border: 2px solid #00FFFF;
    box-shadow: 0 0 15px #00FFFF;
    padding: 10px;
    background-color: rgba(26, 26, 26, 0.7);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
}

.memory-item img, .memory-item video {
    width: 100%;
    height: 250px; /* Standard height for images and videos */
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
}

.memory-item p {
    font-size: 0.9em;
    color: #00FFC0;
}

.memory-item.active-memory {
    transform: scale(1.05);
    border-color: #00FFC0;
    box-shadow: 0 0 20px #00FFC0;
}

/* Highlight and increase height for video memory item */
.memory-item.video-memory-item {
    border: 4px solid #FFD700; /* Gold border for highlight */
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.8); /* Gold glow */
}

.memory-item.video-memory-item video {
    height: 300px; /* Increased height for the video frame */
}
/* End of video memory item specific styling */


.nav-arrow {
    background-color: rgba(0, 255, 192, 0.1);
    border: 1px solid #00FFC0;
    color: #00FFC0;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 1.5em;
    border-radius: 50%;
    margin: 0 10px;
    transition: all 0.3s ease;
}

.nav-arrow:hover {
    background-color: #00FFC0;
    color: #0a0a0a;
    box-shadow: 0 0 15px #00FFFF;
}

/* Artwork/Memory Overlay (Full Size View) */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.overlay-content {
    background-color: rgba(13, 13, 13, 0.95);
    border: 3px solid #00FFFF;
    box-shadow: 0 0 25px #00FFFF;
    padding: 25px;
    text-align: center;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    position: relative; /* For close button positioning */
}

.overlay-content img, .overlay-content video {
    max-width: 100%;
    max-height: 80vh;
    height: auto;
    display: block;
    margin-bottom: 20px;
    border: 1px solid #00FFC0;
}

.close-overlay-btn {
    margin-top: 20px;
}

/* Video & Lyrics Station (Level QA) */
.video-container {
    position: relative;
    width: 90%;
    max-width: 700px;
    margin: 20px auto;
    border: 2px solid #00FFFF;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
    background-color: #000;
}

.video-container video {
    width: 100%;
    display: block;
}

.video-lyrics-station {
    background-color: rgba(26, 26, 26, 0.8);
    border-top: 1px solid #00FFC0;
    padding: 15px;
    font-size: 1.1em;
    min-height: 60px; /* Ensure space for lyrics */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.typewriter-lyric {
    overflow: hidden;
    white-space: nowrap;
    animation: none; /* Controlled by JS */
}

/* Final Message Section */
.final-message-display {
    background: linear-gradient(45deg, rgba(0, 255, 192, 0.1), rgba(0, 255, 255, 0.1));
    border: 3px solid #00FFFF;
    box-shadow: 0 0 30px #00FFFF;
    padding: 40px;
    margin: 20px auto;
    border-radius: 15px;
    text-align: left;
    max-height: 60vh; /* Limit height for scrollability */
    overflow-y: auto; /* Enable scrolling for long messages */
}

.final-message-display p {
    margin-bottom: 15px;
    line-height: 1.8;
    font-size: 1.1em;
    color: #E0FFFF; /* Lighter color for readability */
}

.final-message-display p.final-line {
    font-weight: bold;
    color: #00FFC0;
    text-shadow: 0 0 5px #00FFC0;
    margin-top: 30px;
    font-size: 1.2em;
}

#final-birthday-message-text {
    font-family: 'Orbitron', sans-serif;
    color: #FFD700; /* Gold */
    text-shadow: 0 0 15px #FFD700;
    font-size: 3em;
    margin-top: 30px;
    animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(1.05); opacity: 0.9; }
}

.particle-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1), transparent 70%);
}

.particle {
    position: absolute;
    background-color: #00FFFF;
    border-radius: 50%;
    opacity: 0.8;
    animation: float 10s infinite ease-in-out;
}

@keyframes float {
    0% { transform: translateY(0) translateX(0); opacity: 0.8; }
    50% { transform: translateY(-50px) translateX(20px); opacity: 0.5; }
    100% { transform: translateY(0) translateX(0); opacity: 0.8; }
}

/* Overlay message (for hug, etc.) */
.overlay-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101; /* Higher than artwork overlay */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.overlay-message.visible {
    opacity: 1;
    pointer-events: all;
}

.overlay-message .overlay-content {
    background-color: rgba(13, 13, 13, 0.98);
    border: 3px solid #00FFC0;
    box-shadow: 0 0 25px #00FFC0;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    position: relative;
    max-width: 500px;
}

.hug-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.hug-content p {
    font-size: 1.4em;
    color: #FFD700; /* Gold for hug message */
    margin-bottom: 25px;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
}

.hug-arms {
    width: 100px;
    height: 100px;
    background: url('data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" viewBox=\\\"0 0 100 100\\\"><path d=\\\"M50 5 C30 5 10 25 10 50 S30 95 50 95 90 75 90 50 70 5 50 5 Z M50 15 C35 15 20 30 20 50 S35 85 50 85 80 70 80 50 65 15 50 15 Z\\\" fill=\\\"%2300FFC0\\\" stroke=\\\"%2300FFFF\\\" stroke-width=\\\"2\\\"/></svg>') no-repeat center center/contain;
    animation: hug-pulse 1.5s infinite alternate;
    margin-bottom: 25px;
}

@keyframes hug-pulse {
    from { transform: scale(0.95); opacity: 0.8; }
    to { transform: scale(1.05); opacity: 1; }
}


/* Responsiveness */
@media (max-width: 768px) {
    .level-section {
        padding: 25px;
        font-size: 0.95em;
    }

    .artwork-frame {
        width: 250px;
        height: 350px;
    }

    .memory-item {
        width: 200px;
    }

    .memory-item img, .memory-item video {
        height: 200px;
    }
    .memory-item.video-memory-item video { /* Adjusted for smaller screens */
        height: 250px;
    }

    .video-container {
        width: 95%;
    }

    .fuel-tank-container {
        width: 40px;
        height: 120px;
        right: 10px;
        top: 10px;
    }

    .dashboard-item {
        width: 90%;
    }

    .co-driver-display {
        font-size: 0.9em;
        padding: 20px;
    }

    #final-birthday-message-text { /* Adjusted for smaller screens */
        font-size: 2.5em;
        margin-top: 30px;
    }
}

@media (max-width: 480px) {
    .co-driver-display {
        width: 90%;
        font-size: 0.8em;
        top: 20px;
    }
    .fuel-tank-container {
        left: 10px;
        top: 10px;
    }
    .level-section {
        width: 95%;
        padding: 15px;
    }
    .glow-button {
        padding: 10px 20px;
        font-size: 1em;
    }
    .final-message-display {
        padding: 20px;
    }
    .final-message-display p {
        font-size: 1em;
    }
    .hug-content p {
        font-size: 1.2em;
    }
    .hug-arms {
        width: 80px;
        height: 80px;
    }
    .memory-item {
        width: 180px; /* Further reduced for very small screens */
    }
    .memory-item img, .memory-item video {
        height: 180px;
    }
    .memory-item.video-memory-item video { /* Adjusted for very small screens */
        height: 220px;
    }
}
