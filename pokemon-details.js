let currentPokemon = null;

document.addEventListener("DOMContentLoaded", function() { 
    const MAX_POKEMON = 151;
    const pokemonID = new URLSearchParams(window.location.search).get("Id");
    const id = parseInt(pokemonID, 10);
})