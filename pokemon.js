const MAX_POKEMON = 151;
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const listWrapper = document.querySelector(".list-wrapper");
const notFouneMessage = document.querySelector(".not-found-message");


let allPokemons = [];

// Fetching all the pokemon data

fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${MAX_POKEMON}`)