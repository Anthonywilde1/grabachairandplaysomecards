class Deck {
  constructor() {
    this.id = fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
      .then((response) => response.json())
      .then((data) => data.deck_id);

    this.playerHand = [];
    this.computerHand = [];
  }

  async draw() {
    const drawPlayerHandUrl = `https://deckofcardsapi.com/api/deck/${await this
      .id}/draw/?count=${7}`;
    const drawComputerHandUrl = `https://deckofcardsapi.com/api/deck/${await this
      .id}/draw/?count=${7}`;

    const playerCards = await fetch(drawPlayerHandUrl)
      .then((response) => response.json())
      .then((data) => data.cards);
    const computerCards = await fetch(drawComputerHandUrl)
      .then((response) => response.json())
      .then((data) => data.cards);
    this.playerHand = playerCards;
    this.computerHand = computerCards;
    return [this.playerHand, this.computerHand];
  }

  async remaining() {
    let remaining = fetch(
      `https://deckofcardsapi.com/api/deck/${await this.id}/`
    )
      .then((response) => response.json())
      .then((data) => data.remaining);

    return remaining;
  }

  async drawCards(n) {
    const drawOneUrl = `https://deckofcardsapi.com/api/deck/${await this
      .id}/draw/?count=${n}`;
    const card = fetch(drawOneUrl)
      .then((response) => response.json())
      .then((data) => data.cards);
    return card;
  }
}
