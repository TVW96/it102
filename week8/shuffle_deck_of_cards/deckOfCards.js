// Instantiate Card object
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
  this.isVisible = false;
  this.dealt = false; // Add dealt property to track if card is already dealt

  this.show = function () {
    this.isVisible = true;
  };

  this.hide = function () {
    this.isVisible = false;
  };
}

// Loop until the deck has 52 cards
const suits = ["♥", "♦", "♣", "♠"];
const ranks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
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

// Initialize an empty array to store the hand of cards
let hand = [];

// Initialize a counter variable to keep track of the number of cards in hand
let counter = 0;

// Function to deal cards
function dealCards() {
  hand = []; // Reset hand
  counter = 0; // Reset counter

  // Loop until the hand has 3 cards
  while (counter < 3) {
    let randomIndex = Math.floor(Math.random() * 52);
    let pickedCard = deck[randomIndex];

    // Check if the picked card is not already dealt (not in the hand)
    if (!pickedCard.dealt) {
      // Deal the card to the hand
      hand.push(pickedCard);
      // Mark the card as "dealt" to avoid duplicates
      pickedCard.dealt = true;
      // Increment the card counter
      counter++;
    }
  }

  // Output the hand of cards
  let output = "";
  for (let i = 0; i < hand.length; i++) {
    output += `Card ${i + 1}: ${hand[i].rank} of ${hand[i].suit}\n`;
  }
  alert(output);
}
