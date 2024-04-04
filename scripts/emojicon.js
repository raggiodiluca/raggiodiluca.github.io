document.addEventListener("DOMContentLoaded", function() {
    // Array of emojis
    const emojis = ["🟣", "💜","🪻","🫐", "👾", "🍆", "🍇", "♊","☔️","🌂","🟪","💟","💜","👿","😈","☂️"];

    // Get the last chosen emoji index from localStorage
    let lastIndex = localStorage.getItem('lastEmojiIndex');
    if (lastIndex === null) {
        lastIndex = -1; // If no index is stored, set it to -1
    } else {
        lastIndex = parseInt(lastIndex);
    }

    // Generate a random index different from the last one
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * emojis.length);
    } while (randomIndex === lastIndex);

    // Store the new index in localStorage
    localStorage.setItem('lastEmojiIndex', randomIndex);

    // Get the favicon link element
    const favicon = document.getElementById('favicon');

    // Update the href attribute with the selected emoji
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.95em%22 font-size=%2285%22>${emojis[randomIndex]}</text></svg>`;
});