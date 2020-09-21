// TODO: GET and store deck ID in localStorage

const newDeck = async () => {
  const response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await response.json();
  return data.deck_id;
};

let deck = new Deck();

const showPlayerHand = async () => {
  await deck.newPile(7, "playerHand");
  let cardList = await deck.listPile("playerHand");
  cardList.playerHand.cards.forEach((card) => {
    let img = document.createElement("img");
    img.src = card.image;
    document.querySelector(".playerHand").appendChild(img);
  });
};

const showComputerHand = async () => {
  await deck.newPile(7, "computerHand");
  let cardList = await deck.listPile("computerHand")
  cardList.computerHand.cards.forEach((card) => {
    let img = document.createElement("img");
    img.src = card.image;
    document.querySelector(".playerHand").appendChild(img);
  });
};

showPlayerHand();
showComputerHand();

// * Draw cards from pickup pile

// * create a new pile with the API

// * deal 7 cards to each player at the beginning of the game


// TODO: if no pile exists, create a new pile (Player/Computers Hand) and add 1 card to that, else just add one card to the respective hand
const pickup = () => {};

// TODO: Add one card to either the computer or the players hand when the Go Fish is called.
const addToHand = (player) => {};

// TODO: check if cards match
const checkCards = (playerCard, computerCard) => {};

// TODO: Check what card in the players hand was clicked on
const listenForClick = () => {};

// TODO: Check if the player is supposed to have picked up a card
const hasPickedUp = () => {};
