function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
  this.isVisible = false;
  this.dealt = false;
  this.show = function () {
    this.isVisible = true;
  };
  this.hide = function () {
    this.isVisible = false;
  };
}
const suits = ["♥", "♦", "♣", "♠"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
function generateDeck() {
  let deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(new Card(suit, rank));
    }
  }
  return deck;
}
function shuffleDeck(deck) {
  const result = deck.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
const deck = generateDeck();
let hand = [];
let dealerHand = [];
const shuffledDeck = shuffleDeck(deck);
function dealCards() {
  hand = []; // Reset hand
  dealerHand = [];
  for (i = 0; i < 2 && shuffledDeck.length > 0; i++) {
    let randomIndex = Math.floor(Math.random() * shuffledDeck.length);
    let pickedCard = shuffledDeck.splice(randomIndex, 1)[0]; // remove from deck
    pickedCard.dealt = true;
    dealerHand.push(pickedCard); // add to dealers hand
  }
  for (i = 0; i < 2 && shuffledDeck.length > 0; i++) {
    let randomIndex = Math.floor(Math.random() * shuffledDeck.length);
    let pickedCard = shuffledDeck.splice(randomIndex, 1)[0]; // remove from deck
    pickedCard.dealt = true;
    hand.push(pickedCard); // add to hand
  }
  showCards();
  dealerHand[1].isVisible = true;
  document.getElementById("deal").disabled = true; // prevent further interaction
}

function createHand() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = ""; // clear previous display
  if (!hand || hand.length === 0) {
    const msg = document.createElement("div");
    msg.textContent = "No cards to display";
    cardsContainer.appendChild(msg);
  }
  const dealerCardsContainer = document.getElementById("dealer-cards");
  dealerCardsContainer.innerHTML = ""; // clear previous display
  if (!dealerHand || dealerHand.length === 0) {
    const msg = document.createElement("div");
    msg.textContent = "Deal Cards";
    dealerCardsContainer.appendChild(msg);
  }
}
function showCards() {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = ""; // clear previous display
  hand.forEach((c) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = `${c.rank} ${c.suit}`;
    cardsContainer.appendChild(cardEl);
  });
  const dealerCardsContainer = document.getElementById("dealer-cards");
  dealerCardsContainer.innerHTML = ""; // clear previous display
  dealerHand.forEach((c) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.textContent = `${c.rank} ${c.suit}`;
    if (c.isVisible == true) {
      dealerCardsContainer.appendChild(cardEl);
    }
  });
}
function countCards(hand) {
  let count = 0;
  for (let i = 0; i < hand.length; i++) {
    const rank = hand[i].rank;
    if (rank === "J" || rank === "Q" || rank === "K") {
      count += 10;
    } else if (rank === "A") {
      count += 11;
    } else {
      count += parseInt(rank, 10);
    }
  }
  return count;
}
function hitMe() {
  console.log(JSON.stringify(hand));
  if (!hand) hand = [];
  let score = countCards(hand);
  if (shuffledDeck.length === 0) {
    alert("No more cards to draw");
    return score;
  }
  let randomIndex = Math.floor(Math.random() * shuffledDeck.length);
  let pickedCard = shuffledDeck.splice(randomIndex, 1)[0];
  hand.push(pickedCard);
  pickedCard.dealt = true;
  score = countCards(hand);
  if (score > 21) {
    alert("You lose! Score: " + score);
    dealerHand[0].isVisible = true;
    document.getElementById("hit").disabled = true; // prevent further interaction
    document.getElementById("fold").disabled = true; // prevent further interaction
  }
  showCards();
  return score;
}
function fold() {
  const maxAttempts = 3;
  let attempts = 0;
  let confirmed = false;

  while (attempts < maxAttempts) {
    const answer = prompt("Are you sure? Type Y to fold or N to cancel.", "");
    if (answer === null) return; // user cancelled

    const trimmed = answer.trim().toLowerCase();
    if (trimmed.startsWith("y")) {
      confirmed = true;
      break;
    }
    if (trimmed.startsWith("n")) return; // user chose not to fold

    attempts++;
    const triesLeft = maxAttempts - attempts;
    if (triesLeft > 0) {
      alert(
        `Invalid response. Please type Y to fold or N to cancel. (${triesLeft} attempt${
          triesLeft === 1 ? "" : "s"
        } left)`
      );
    } else {
      alert("Too many invalid responses. Fold cancelled.");
      return;
    }
  }

  if (!confirmed) return;

  // Show dealer's hidden card(s)
  if (dealerHand && dealerHand.length > 0) {
    dealerHand[0].isVisible = true;
  }
  showCards();

  // Count Cards and decide outcome
  const dealerCount = countCards(dealerHand || []);
  const playerCount = countCards(hand || []);
  if (playerCount > dealerCount) {
    alert("You Win!");
  } else if (playerCount === dealerCount) {
    alert("Tie Game.");
  } else {
    alert("You Lose.");
  }

  document.getElementById("fold").disabled = true; // prevent further interaction
  document.getElementById("hit").disabled = true; // prevent further interaction
}
