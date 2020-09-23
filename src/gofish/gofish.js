let deck = new Deck();

// TODO: Generate Number
const generateNumber = () => {
  return Math.floor(Math.random() * 6);
};

// TODO: Render Player Card
const renderPlayerCard = (card, renderLocation) => {
  // * Create Elements
  let cardDiv = document.createElement("div");
  let img = document.createElement("img");
  let checkbox = document.createElement("input");

  // * Set Properties
  cardDiv.className = "player-card";
  img.className = "card-image";
  img.src = card.image;
  img.id = card.code;
  checkbox.id = card.code;
  checkbox.type = "checkbox";

  // * Append elements to DOM
  cardDiv.appendChild(img);
  renderLocation.appendChild(cardDiv);
  renderLocation.appendChild(checkbox);
};

// TODO: Render Computer Card
const renderComputerCard = (renderLocation) => {
  // * Create Elememt
  let img = document.createElement("img");

  // * Set Properties
  img.src = "https://opengameart.org/sites/default/files/card%20back%20red.png";
  img.className = "card-image computer";

  // * Append element to DOM
  renderLocation.appendChild(img);
};

// TODO: Render Submit Button
const renderSubmitButton = () => {
  // * Create Elememt
  let submitBtn = document.createElement("input");

  // * Set Properties
  submitBtn.type = "submit";
  submitBtn.value = "Submit";

  // * Append element to DOM
  document.querySelector(".playerForm").appendChild(submitBtn);
};

// TODO: Render Cards to Screen
const renderCardsToScreen = (playerHand, computerHand) => {
  // * Render Locations
  let computerHandDiv = document.querySelector(".computerHand");
  let playerHandForm = document.querySelector(".playerForm");

  // * Clears screen before rendering components
  computerHandDiv.innerHTML = "";
  playerHandForm.innerHTML = "";

  // * Rendering Cards
  playerHand.forEach((card) => renderPlayerCard(card, playerHandForm));
  computerHand.forEach((card) => renderComputerCard(computerHandDiv));
  renderSubmitButton();
};

// TODO: Card Pair Check
const cardPairCheck = (playerHand, checkedIds) => {
  // * Checks if the first character of the code (e.g. the "2" of "2H") of the cards checked, are equal
  if (checkedIds[0].charAt(0) === checkedIds[1].charAt(0)) {
    alert("Pair");
    playerHand.forEach((card) => {
      if (checkedIds[0] === card.code || checkedIds[1] === card.code) {
        const index = playerHand.indexOf(card);
        playerHand.splice(index, 1);
      }
    });
  }
};

// TODO: singleCardCheck
const singleCardCheck = () => {};

// TODO: Go FIsh
const goFish = async () => {
  let computerHandDiv = document.querySelector(".computerHand");
  let playerHandForm = document.querySelector(".playerForm");
  computerHandDiv.innerHTML = "";
  playerHandForm.innerHTML = "";

  // get an array containing each players hands [computers hand, players hand]
  let hands = await deck.draw();

  // how many cards are remaining in the deck
  let remaining = await deck.remaining();

  //
  let playerHand = hands[0];
  let computerHand = hands[1];

  renderCardsToScreen(playerHand, computerHand);

  // TODO: Form event listener
  const form = document.querySelector(".playerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formCards = Array.from(form.querySelectorAll("input"));
    console.log(typeof formCards);
    const checkedIds = formCards.filter((x) => x.checked).map((x) => x.id);
    cardPairCheck(playerHand, checkedIds);
    renderCardsToScreen(playerHand, computerHand);
  });

  // TODO: Pickup
  document.getElementById("pickup").addEventListener("click", async (event) => {
    // *  check if playerhand.length is 7
    let drawnCard = await deck.drawCards(1);
    playerHand.push(drawnCard[0]);
    renderCardsToScreen(playerHand, computerHand);
  });
};

goFish();
