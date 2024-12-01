const MAX_POKEMON = 151;
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const listWrapper = document.querySelector(".list-wrapper");
const notFouneMessage = document.querySelector(".not-found-message");


let allPokemons = [];

// Fetching all the pokemon data

fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) => {
    allPokemons = data.results;
    // console.log(data);  
    // console.log(data.results);
    // console.log(data.results[0]);
    // console.log(data.results[0].name);
    // console.log(data.results[0].url);
    console.log(allPokemons);         
})  

async function fetchPokemonDataBeforeRedirect(id){
    try{
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).
            then((res) => {
                res.json()
            }),
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).
            then((res) => {
                res.json()
            }),
        ]);
        return true;
    }catch(error) {
        console.error("Failed to fetch Pokemon data before redirect");
        return false;
    }
}