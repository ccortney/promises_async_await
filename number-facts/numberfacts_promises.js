let factDiv = document.querySelector('#facts');

// #1 Make a rquest to get a fact about your favorite number. 
function numberFactRequest(val) {
    return new Promise(function (resolve, reject) {
        let res = axios.get(`http://numbersapi.com/${val}?json`)
        resolve(res)
        
    })
} 

// #2 Get data on multiple numbers in a single request
// numberFactRequest(7)
//     .then((res) => {
//         numberFactsOnPage(res.data)
//         return numberFactRequest(32)})
//     .then((res) => numberFactsOnPage(res.data))
//     .catch(err => console.log(err))

// Show new Div on Page
function numberFactsOnPage(res) {
    let newFact = numberFactsDiv(res.data);
    factDiv.append(newFact)
}

// Create a Div with the Fact
function numberFactsDiv(data) {
    const newDiv = document.createElement('div');
    const fact = document.createElement('p');
    fact.textContent = `${data.text}`;
    newDiv.append(fact);
    return newDiv
}

// #3 Use API to get 4 facts on your favorite number.
// Once you have them all, put them on the page. 
let fourFacts = [];
for (let i = 0; i < 4; i ++) {
    let res = numberFactRequest(7)
    fourFacts.push(res);
}

Promise.all(fourFacts)
    .then(fourFacts => fourFacts.forEach(fact => numberFactsOnPage(fact)))