
const newDeck = async () => {
    const new_deck_url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";
    const response = await fetch(new_deck_url)
    const data = await response.json()
    return data.deck_id
}


const draw = async () => {
    const draw_deck = `https://deckofcardsapi.com/api/deck/${await newDeck()}/draw/?count=4`
    const response = await fetch(draw_deck);
    const cards = await response.json()
    const playerhand = await [cards.cards[0], cards.cards[2]];
    const dealerhand = await [cards.cards[1], cards.cards[3]];
    const playerpile = `https://deckofcardsapi.com/api/deck/${await newDeck()}/pile/playerpile/add/?cards=${playerhand.map(card => card.code).join(",")}`
    const dealerpile = `https://deckofcardsapi.com/api/deck/${await newDeck()}/pile/playerpile/add/?cards=${dealerhand.map(card => card.code).join(",")}`
    const playerfetch = await fetch(playerpile)
}

// playerhand.map(card => card.code).join(",") => AS,2S

//console.log(draw())


// const playerHand = async () => {
//     const phand = `https://deckofcardsapi.com/api/deck/${newDeck()}/pile/playerhand/add/?cards=${await draw()}`;
//     const response = await fetch(phand);
//     const hand = await response.json();
    
// }
// console.log(playerHand);