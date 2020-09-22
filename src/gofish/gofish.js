// TODO: GET and store deck ID in localStorage

const newDeck = async () => {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await response.json();
  return data.deck_id;
};

let deck = new Deck();

const displayHands = async () => {
  let computerHandDiv = document.querySelector(".computerHand");
  let playerHandDiv = document.querySelector(".playerHand");
  computerHandDiv.innerHTML = "";
  playerHandDiv.innerHTML = "";

  let hands = await deck.draw();
  let playerHand = hands[0];
  let computerHand = hands[1];

  playerHand.forEach((card) => {
    let img = document.createElement("img");
    img.src = card.image;
    img.className = "card-image";
    playerHandDiv.appendChild(img);
  });

  computerHand.forEach((card) => {
    let img = document.createElement("img");
    img.src = card.image;
    img.className = "card-image";
    computerHandDiv.appendChild(img);
  });

  return [playerHand, computerHand];
};

const pickUp = async () => {
  [playerhand, computerHand] = displayHands;
  console.log(playerHand);
};

displayHands();
pickUp();

// TODO: Output decks onto the browser

// * Draw cards from pickup pile

// * create a new pile with the API

// * deal 7 cards to each player at the beginning of the game

// * When a player clicks on the pickup button it will give them a card.

// TODO: Add one card to either the computer or the players hand when the Go Fish is called.
const addToHand = (player) => {};

// TODO: check if cards match
const checkCards = (playerCard, computerCard) => {};

// TODO: Check what card in the players hand was clicked on
const listenForClick = () => {};

// TODO: Check if the player is supposed to have picked up a card
const hasPickedUp = () => {};
