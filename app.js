const gameContainer = document.querySelector(".game-container");

const emojis = ["😀","🐶","🍎","⭐","⚽","🎵","🚗","🔥"];
const cards = [...emojis, ...emojis]; // duplicate for pairs

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

// Create card elements
cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="front">${emoji}</div>
        <div class="back">?</div>
    `;
    gameContainer.appendChild(card);

    card.addEventListener("click", () => {
        card.classList.add("flip");
        checkCards(card);
    });
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Check two flipped cards
function checkCards(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;

        let firstEmoji = firstCard.querySelector(".front").textContent;
        let secondEmoji = secondCard.querySelector(".front").textContent;

        if (firstEmoji === secondEmoji) {
            // Match
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        } else {
            // Not match → flip back
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }, 700);
        }
    }
}
