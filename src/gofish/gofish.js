// TODO: GET and store deck ID in localStorage

const newDeck = async () => {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await response.json();
  return data.deck_id;
};

let deck = new Deck();

// TODO: Output decks onto the browser

const showPlayerHand = async () => {
  await deck.newPile(7, "playerHand");
  let cardList = await deck.listPile("playerHand");
  cardList.playerHand.cards.forEach((card) => {
    let img = document.createElement("img");
    img.setAttribute("class", "card-image")
    img.src = card.image;
    document.querySelector(".playerHand").appendChild(img);
    return cardList.playerHand.cards;
  });
};

const showComputerHand = async () => {
  await deck.newPile(7, "computerHand");
  let cardList = await deck.listPile("computerHand");
  cardList.computerHand.cards.forEach((card) => {
    let img = document.createElement("img");
    img.setAttribute("class", "card-image")
    img.src = card.image;
    document.querySelector(".computerHand").appendChild(img);
    return cardList.computerHand.cards;
  });
};

const reDrawHands = async () => {
  document.querySelector(".playerHand").innerHTML = ""
  document.querySelector(".computerHand").innerHTML = ""
  let computerCardList = await deck.listPile("computerHand");
  computerCardList.computerHand.cards.forEach((card) => {
    let img = document.createElement("img");
    img.src = card.image;
    document.querySelector(".computerHand").appendChild(img);
    return computerCardList.computerHand.cards;
  });

  let playerCardList = await deck.listPile("playerHand");
  playerCardList.playerHand.cards.forEach((card) => {
    let img = document.createElement("img");
    img.className = "card-image"
    img.src = card.image;
    document.querySelector(".playerHand").appendChild(img);
  });
  return playerCardList.playerHand.cards;
}

const pickupCard = async () => {
  await deck.pickupCard("playerHand");
  reDrawHands()
};

const pileSize = async () => {
  console.log(await deck.currentPileSize("playerHand"))
}




showPlayerHand();
showComputerHand();
document.querySelector("button").addEventListener("click", pickupCard);
pileSize()

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
