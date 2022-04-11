// 1. Make a request for a single card from a newly shuffled deck
let card = axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1`)
// card.then(res => {console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);});

// 2. Make a request for a single card, then request another card from the same deck.

function getCardData(res) {
    let value = res.data.cards[0].value;
    let suit = res.data.cards[0].suit;
    // console.log(`${value} of ${suit}`);
}

function getCard() {
    return axios.get(`http://deckofcardsapi.com/api/deck/new/draw/`)
}

let cards = []
getCard()
    .then(res => {
        cards.push(res);
        let deck_id = res.data.deck_id;
        return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/`)
    })
    .then(res => {
        cards.push(res)
        cards.forEach(card => getCardData(card))
    })
    .catch(err => console.log(err))

// 3. Build a page that lets you click a button to draw cards from a deck until depleted
const $cardDiv = $("#cards");
const $button = $("#card-button");
let deckId = null;
let count = 0;

$.getJSON('http://deckofcardsapi.com/api/deck/new/').then(data => {
   deckId =  data.deck_id;
})

$button.on('click', function(e) {
    e.preventDefault();
    if (count < 52) {
        $.getJSON(`http://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`).then(() => {
            return $.getJSON(`http://deckofcardsapi.com/api/deck/${deckId}/draw/`)
        }
        ).then(data => {
            let card = data.cards[0];
            let newImg = $('<img />', {
                id: card.code,
                width: 75,
                src: card.images.png,
                alt: `${card.value} of ${card.suit}`
            })
            newImg.appendTo($cardDiv);
            count ++;
        })
    }
    if (count >= 52) {
        $button.hide();
    }
})


