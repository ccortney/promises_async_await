// 1 Get a single card from a newly shuffled deck
async function part1() {
    let res1 = await axios.get('http://deckofcardsapi.com/api/deck/new/');
    let deckId = res1.data.deck_id;
    await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    let res2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    let card = res2.data.cards[0];
    console.log(`${card.value} of ${card.suit}`);

}

// 2 Get two cards from the same shuffled deck
async function part2() {
    let cards = [];
    let firstCard = await axios.get(`http://deckofcardsapi.com/api/deck/new/draw/`)
    let deckId = firstCard.data.deck_id;
    cards.push(firstCard.data.cards[0]);
    let secondCard = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    cards.push(secondCard.data.cards[0])
    cards.forEach(card => console.log(`${card.value} of ${card.suit}`))

}

// 3 Build a page that lets you click a button to draw cards from a deck until depleted
const $cardDiv = $("#cards");
const $button = $("#card-button");
let deckId = null;
let count = 0;

async function getDeck() {
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle`)
    deckId = res.data.deck_id;
}
getDeck();

$button.on('click', async function(e) {
    e.preventDefault();
    if (count >=52) {
        $button.prop('disabled', true);
        $button.hide();
    }
    let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    let card = res.data.cards[0]
    let newImg = $('<img />', {
        id: card.code,
        width: 75,
        src: card.images.png,
        alt: `${card.value} of ${card.suit}`
        })
    newImg.appendTo($cardDiv);
    count++;

})
