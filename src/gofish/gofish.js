let deck = new Deck();

const generateNumber = () => {
  return Math.floor(Math.random() * 6);
};

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

const renderComputerCard = (renderLocation) => {
  // * Create Elememt
  let img = document.createElement("img");

  // * Set Properties
  img.src = "https://opengameart.org/sites/default/files/card%20back%20red.png";
  img.className = "card-image computer";

  // * Append element to DOM
  renderLocation.appendChild(img);
};

const renderSubmitButton = () => {
  // * Create Elememt
  let submitBtn = document.createElement("input");

  // * Set Properties
  submitBtn.type = "submit";
  submitBtn.value = "Submit";

  // * Append element to DOM
  document.querySelector(".playerForm").appendChild(submitBtn);
};

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
};

const cardCheck = (playerHand, checkedIds) => {
  // * Checks if the first character of the code (e.g. the "2" of "2H") of the cards checked, are equal
  if (checkedIds[0].charAt(0) === checkedIds[1].charAt(0)) {
    alert("Pair");
    // *
    playerHand = playerHand.filter(
      (card) => checkedIds[0] !== card.code && checkedIds[1] !== card.code
    );
    checkedIds.splice(0, 2);

    return playerHand;
  }
};

const goFish = async () => {
  let computerHandDiv = document.querySelector(".computerHand");
  let playerHandForm = document.querySelector(".playerForm");
  computerHandDiv.innerHTML = "";
  playerHandForm.innerHTML = "";

  // get an array containing each players hands [computers hand, players hand]
  let hands = await deck.draw();

  // how many cards are remaining in the deck
  let remaining = await deck.remaining();
  console.log(remaining);

  //
  let playerHand = hands[0];
  let computerHand = hands[1];

  renderCardsToScreen(playerHand, computerHand);

  // TODO: Form event listener
  let form = document.querySelector(".playerForm");
  let formCards = form.querySelectorAll("input");
  let checkedIds = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let ele of formCards) {
      if (ele.checked) {
        checkedIds.push(ele.id);
      }
    }
    let filteredCards = cardCheck(playerHand, checkedIds);
    renderCardsToScreen(filteredCards, computerHand);
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
