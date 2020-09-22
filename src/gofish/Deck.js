class Deck {
  constructor() {
    this.id = fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
      .then((response) => response.json())
      .then((data) => data.deck_id);

  }



  async draw(n) {
    let url = `https://deckofcardsapi.com/api/deck/${await this.id}/draw/?count=${n}`;
    let cardCodes = await fetch(url)
      .then((response) => response.json())
      .then((data) => data.cards.map((card) => card.code));
    
      
    return cardCodes;
  }

  async newPile(n, name) {
    let codes = await this.draw(n);
    let url = `https://deckofcardsapi.com/api/deck/${await this.id}/pile/${name}/add/?cards=${codes.join(",")}`;
    let pile = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);

    return pile;
  }

  async listPile(name) {
    let url = `https://deckofcardsapi.com/api/deck/${await this.id}/pile/${name}/list/`;
    let pileList = await fetch(url)
      .then((response) => response.json())
      .then((data) => data);

    return pileList.piles;
  }

  async pickupCard(name) {
    let drawnCardCode = await this.draw(1);
    console.log(drawnCardCode)
    let url = `https://deckofcardsapi.com/api/deck/${await this.id}/pile/${name}/add/?cards=${drawnCardCode.join("")}`
    let pile = fetch(url).then(response =>  response.json()).then(data => data)
    return pile;
  }

  async currentPileSize(name) {
    let url = `https://deckofcardsapi.com/api/deck/${await this.id}/pile/${name}/list/`
    let pile = fetch(url).then(response =>  response.json()).then(data => data)
    console.log(pile)
  }
}
