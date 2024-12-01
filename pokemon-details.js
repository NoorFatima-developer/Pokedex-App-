let currentPokemonId = null;

document.addEventListener("DOMContentLoaded", function() { 
    const MAX_POKEMONS = 151;
    const pokemonID = new URLSearchParams(window.location.search).get("id");
    const id = parseInt(pokemonID, 10);

    if (id < 1 || id > MAX_POKEMONS) {
        return (window.location.href = "./index.html")
    }

    currentPokemonId = id;
    loadPokemon(id);
});