document.addEventListener("DOMContentLoaded", function() {
    // Array of emojis
    const emojis = ["🟣", "💜", "🪻", "👾", "🍆", "🍇", "♊","☔️","🌂"];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * emojis.length);

    // Get the favicon link element
    const favicon = document.getElementById('favicon');

    // Update the href attribute with the selected emoji
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.95em%22 font-size=%2285%22>${emojis[randomIndex]}</text></svg>`;
});