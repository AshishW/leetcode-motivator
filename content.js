const QUOTES = [
    "Don't give up! High-quality work takes time. 🚀",
    "Keep going! You're almost there! 🚀",
    "Persistence is the path to mastery. ✨",
    "Even the best were once where you are. 🌟",
    "Believe in yourself, you've got this! 🔍",
    "One step at a time. You're doing great. ✅",
    "Every challenge is an opportunity to grow. ✨",
    "You are capable of amazing things. 📈",
    "Don't worry about the speed, worry about the journey. ⏱️",
    "Consistency beats intensity. Every day counts. 📅",
    "You are more than your LeetCode rank. ⭐",
    "You are smarter than this while loop. 🔄",
    "If it was easy, everyone would be a Senior Engineer. 👑",
    "The most efficient solution isn't always the first one. 💡",
    "Try sketching the logic on paper first. 📝",
    "Visualize the data structure in your mind. 🧊",
    "Stack, Queue, Heap... you've got the tools. 🧰",
    "Two pointers are often better than one. 📍",
    "Sliding windows open new possibilities. 🪟",
    "Recursion is just life repeating itself until a base case. 🌀",
    "Graph problems are just connections waiting to be made. 🕸️",
    "Don't let a Medium problem give you a Hard time. 🥊",
    "The compiler is your partner, not your critic. 🤝",
    "Every 'Run Code' is a step toward mastery. ⚡",
    "Your future self will thank you for not quitting today. 🌅",
    "Coding is 90% thinking and 10% typing. 💭",
    "Refactoring is where the magic happens. ✨",
    "The best way to learn is to struggle a little. 🧗",
    "You're building mental muscles with every line. 🏋️",
    "Stay calm and keep coding. 🧘",
    "Take a deep breath. A fresh perspective is just a break away. ☕",
    "Step away from the screen for a moment. Your brain will thank you. 🚶‍♂️",
    "Hydrate and stretch. Your code will still be here when you get back. 💧",
    "Sometimes the best debugging tool is a short walk. 🌳",
    "Rest is productive. Give your mind a chance to reset. 🛌",
    "The logic is sound; keep searching for the implementation. 🔭",
    "Optimization is a journey, not a destination. 🚀",
    "Believe in your logic. It's gotten you this far. 🎖️",
];

function setupRunButton() {
    const runButton = document.querySelector('[data-e2e-locator="console-run-button"]');

    // Check if button exists AND if we haven't already tagged it
    if (runButton && !runButton.dataset.listenerAttached) {
        console.log("Target acquired!");

        runButton.dataset.listenerAttached = "true"; // Mark it!

        let clickStamp = []
        runButton.addEventListener('click', () => {
            const now = Date.now();
            const fiveMinutesAgo = now - (5 * 60 * 1000);
            clickStamp.push(now);
            clickStamp = clickStamp.filter(time => time > fiveMinutesAgo);
            if (clickStamp.length >= 3) {
                console.log("clicked more than 3 times in 5 minutes")
                showMotivation();
            }
            const difference = clickStamp[clickStamp.length - 1] - clickStamp[0];
            console.log(`Run clicked ${difference / 1000 / 60} minutes after first click`);
        });
    }
}


function showMotivation() {
    if (document.getElementById('motivation-host-box')) {
        return;
    }
    const host = document.createElement('div');
    host.id = 'motivation-host-box';

    host.style.position = 'fixed';
    host.style.bottom = '20px';
    host.style.right = '20px';
    host.style.zIndex = '9999';

    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
        <style>
            .banner {
                background: #1a1a1a;
                color: #ffa116; /* LeetCode Orange */
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #ffa116;
                font-family: sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            }
            #close-btn {
                background: #ffa116;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
            }
        </style>
        <div class="banner">
            <p></p>
            <button id="close-btn">Dismiss</button>
        </div>
    `
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    shadow.querySelector('p').textContent = quote;

    document.body.appendChild(host);
    shadow.getElementById('close-btn').onclick = () => host.remove();
}

// 1. the observer
const observer = new MutationObserver(() => {
    setupRunButton();
});

// 2. Start observing
observer.observe(document.body, { childList: true, subtree: true });

// 3. RUNS ONCE IMMEDIATELY (imp for race conditions)
setupRunButton();