// 1 Get a fact about a number
async function getFact(val) {
    return await axios.get(`http://numbersapi.com/${val}?json`);
    // console.log(res.data);
}

// 2 Get data on multiple numbers with one request. 
async function getFacts() {
    let facts = await Promise.all([
        axios.get('http://numbersapi.com/7?json'),
        axios.get('http://numbersapi.com/32?json'),
        axios.get('http://numbersapi.com/4?json')
    ])
    facts.forEach(fact => console.log(fact.data.text));
}

// 3 Get four facts about a number, then show all four facts on the page
const $factsDiv = $("#facts")

async function getFourFacts(val) {
    let fourFacts = [];
    for (let i = 0; i < 4; i++) {
        let res = await axios.get(`http://numbersapi.com/${val}?json`);
        fourFacts.push(res);
    }
    $factsDiv.empty();
    fourFacts.forEach(fact => console.log(fact));
    fourFacts.forEach(fact => numberFactsOnPage(fact));

}

// Show new Div on Page
function numberFactsOnPage(res) {
    let newFact = numberFactsDiv(res.data);
    $factsDiv.append(newFact)
}

// Create a Div with the Fact
function numberFactsDiv(data) {
    const factText = document.createElement('p');
    factText.textContent = `${data.text}`;
    return factText
}