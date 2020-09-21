
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
    //const playerpile = `https://deckofcardsapi.com/api/deck/${await newDeck()}/pile/playerpile/add/?cards=${playerhand.map(card => card.code).join(",")}`
    //const dealerpile = `https://deckofcardsapi.com/api/deck/${await newDeck()}/pile/dealerpile/add/?cards=${dealerhand.map(card => card.code).join(",")}`
    console.log(playerhand)
    const images = playerhand.map(data => data.image)
    let card1 = document.getElementById("humancard1")
    let card2 = document.getElementById("humancard2")
    card1.src = images[0]
    card2.src = images[1]
    let dcard1 = document.getElementById("Computercard1")
    let dcard2 = document.getElementById("Computercard1")
    //dcard1.src = '../img/792166a01d9f4024b4eb51ae51b0b185.jpg'
    //dcard2.src = '../img/792166a01d9f4024b4eb51ae51b0b185.jpg'
    const scores = playerhand.map(data => data.code)
    let score = 0
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
    console.log(score)
}
document.getElementById("playblackjack").addEventListener('click',draw)

// const test = async () => {
//     console.log(await draw())
// }

// test()

// const playerhand = async() => {
//     const url = await draw();
//     // const response = await fetch(url); 
//     // console.log(response)
//     // const yourhand = await response.json();
//     // return yourhand

//     let yourhand = await fetch(url).then(response => response.json()).then(data => data)
//     console.log(yourhand)
// }
// // console.log(playerhand())
// playerhand()


// const getCardsOnSCreen = async () => {
//         const playerhand = await draw()
//         //console.log(playerhand)
//         const codes = playerhand.map(data => data.image)
//         let card1 = document.getElementById("humancard1")
//         let card2 = document.getElementById("humancard2")
//         card1.src = codes[0]
//         card2.src = codes[1]
//         let dcard1 = document.getElementById("Computercard1")
//         let dcard2 = document.getElementById("Computercard1")
//         dcard1.src = '../img/792166a01d9f4024b4eb51ae51b0b185.jpg'
//         dcard2.src = '../img/792166a01d9f4024b4eb51ae51b0b185.jpg' 
// }


// const scoreCounter = async () => {
//     let score = 0
//     const playerhand = await draw()
//     const cards = playerhand.map(data => data.code)
//     cards.forEach(s => {
//         let point = s.charAt(0) // A
//         if (point === 'A'){
//              score += 1 // score += 1
//         } else if (point === 'J' || point === 'Q' || point === 'K'){
//              score += 10
//         } else {
//              score += point/1
//         }
//     }) 
//     console.log(score)
// }
// scoreCounter()