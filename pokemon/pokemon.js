// 1 Make a single request to the Pokemon API, get names & urls for every pokemon
async function getAllPokemon() {
    let res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1126');
    return res.data.results;
}

// 2 Pick 3 pokemon at random and make requests to the URLs.
async function getThreePokemon() {
    let allPokemon = await getAllPokemon();
    let pokemon = [];
    for (let i=0; i < 3; i++) {
        let id = Math.floor(Math.random() * 1126)
        let url = allPokemon[id].url
        let res = await axios.get(url)
        pokemon.push(res);
    }
    pokemon.forEach(p => console.log(p))
}

// 3 After getting pokemon data, make a request for species data
async function getThreePokemon2() {
    let allPokemon = await getAllPokemon();
    let pokemonData = [];
    for (let i=0; i < 3; i++) {
        let id = Math.floor(Math.random() * 1126)
        let url = allPokemon[id].url
        let res = await axios.get(url)
        let pokemon = {name: res.data.name, species_url: res.data.species.url}
        pokemonData.push(pokemon);
    }
    for (let pokemon of pokemonData) {
        let res = await axios.get(pokemon.species_url)
        pokemon["species"] = res.data.name;
        let texts = res.data.flavor_text_entries;
        for (let text of texts) {
            if (text.language.name === "en") {
                pokemon["species_description"] = text.flavor_text
            }
        } 
    }
    pokemonData.forEach(p => console.log(p))
}

getThreePokemon2()

