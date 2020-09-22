let playerHand = []
let score = 0
let dealerScore = 0
let dealerHand = []


const newDeck = async () => {
    const new_deck_url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";
    const response = await fetch(new_deck_url)
    const data = await response.json()
    return data.deck_id
}


const draw = async () => { 
    playerHand = []
    dealerHand = []
    let pictureReset = document.querySelectorAll("img");
    pictureReset.forEach(x => x.src = "")

    const draw_deck = `https://deckofcardsapi.com/api/deck/${await newDeck()}/draw/?count=4`
    const response = await fetch(draw_deck);
    const cards = await response.json()
    playerHand = [cards.cards[0], cards.cards[2]];
    dealerHand = await [cards.cards[1], cards.cards[3]];
    let images = playerHand.map(x => x.image)
    images.forEach(tag => {
        const div = document.getElementById('human')
        let img = document.createElement('img')
        img.src = tag
        div.appendChild(img)
    })
    let dimages = dealerHand.map(x => x.image)
    dimages.forEach(tag => {
        const div = document.getElementById('computer')
        let img = document.createElement('img')
        img.src = tag
        div.appendChild(img)
    })
    scoreCheck()
    dealerCheck()
}

document.getElementById("playblackjack").addEventListener('click',draw)

const hit = async () => {
    const draw_deck = `https://deckofcardsapi.com/api/deck/${await newDeck()}/draw/?count=1`
    const response = await fetch(draw_deck)
    const card = await response.json()
    playerHand.push(card.cards[0])
    let images = playerHand.map(x => x.image)
    let latest = images.slice(-1)
    const div = document.getElementById('human')
    let img = document.createElement('img')
    img.src = latest
    div.appendChild(img)
    scoreCheck()
}

document.getElementById("hit").addEventListener('click', hit)

const scoreCheck = async () => {
    score = 0

    let scores = playerHand.map(data => data.code)
    
    scores.forEach(x => {
        y = x.charAt(0)
        if (y === 'J' || y === 'Q' || y === 'K' || y === '0') {
            score += 10
        } else if (y === 'A'){
            score += 1
        } else {
            score += y/1
        }
    })
    if (score > 21) {
       alert("you have gone bust") //come back later
    }
}
const dealerCheck = async () => {
    dealerScore = 0
    let dScores = dealerHand.map(data => data.code)
    
    dScores.forEach(x => {
        y = x.charAt(0)
        if (y === 'J' || y === 'Q' || y === 'K' || y === '0') {
            dealerScore += 10
        } else if (y === 'A'){
            dealerScore += 1
        } else {
            dealerScore += y/1
        }
    })
}

const stand = async () => {
    scoreCheck()
    dealerCheck()
    if (dealerScore > 21){
        alert("dealer sucks and has lost")
        return
    } else if (dealerScore > scoreCheck){
        alert("house always wins baby")
        return
    } else if (dealerScore > 18 && scoreCheck > dealerScore){
        alert("you beat the dealer mad lad")
        return
    } else if (dealerScore < 18){
    const draw_deck = `https://deckofcardsapi.com/api/deck/${await newDeck()}/draw/?count=1`
    const response = await fetch(draw_deck)
    const card = await response.json()
    dealerHand.push(card.cards[0])
    let images = dealerHand.map(x => x.image)
    let latest = images.slice(-1)
    const div = document.getElementById('computer')
    let img = document.createElement('img')
    img.src = latest
    div.appendChild(img)
    }
    stand()
}
document.getElementById("stand").addEventListener('click',stand)
