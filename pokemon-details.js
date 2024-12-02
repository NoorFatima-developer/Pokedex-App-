let currentPokemonId = null;

// Load HTML document:
document.addEventListener("DOMContentLoaded", () => {
  const MAX_POKEMONS = 151;
  // query selector is : ? key = value;
  const pokemonID = new URLSearchParams(window.location.search).get("id");
  const id = parseInt(pokemonID, 10);

  if (id < 1 || id > MAX_POKEMONS) {
    return (window.location.href = "./index.html");
  }

  currentPokemonId = id;
  loadPokemon(id);
});


// loadPokemon function:
async function loadPokemon(id) {

  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);

    const abilitiesWrapper = document.querySelector(".pokemon-detail-wrap .pokemon-detail.move");
    abilitiesWrapper.innerHTML = "";

    if (currentPokemonId === id) {

      displayPokemonDetails(pokemon);

      const flavorText = getEnglishFlavorText(pokemonSpecies);
      document.querySelector(".body3-fonts.pokemon-description").textContent = flavorText;

      const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) => document.querySelector(sel));
      leftArrow.removeEventListener("click", navigatePokemon);
      rightArrow.removeEventListener("click", navigatePokemon);

      if (id !== 1) {
        leftArrow.addEventListener("click", () => {
          navigatePokemon(id - 1);
        });
      }

      if (id !== 151) {
        rightArrow.addEventListener("click", () => {
          navigatePokemon(id + 1);
        });
      }

      window.history.pushState({}, "", `./detail.html?id=${id}`);
    }

    return true;
  } catch (error) {
    console.error("An error occured while fetching Pokemon data:", error);
    return false;
  }
}

// NavigatePokemon:(Create a new Pokemon)
async function navigatePokemon(id) {
  currentPokemonId = id;
  await loadPokemon(id);
}

// typeColors
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  dark: "#EE99AC",
};

function rgbaFromHex(hexColor) {
  return [
    parseInt(hexColor.slice(1, 3), 16),
    parseInt(hexColor.slice(3, 5), 16),
    parseInt(hexColor.slice(5, 7), 16),
  ].join(", ");
}

function setElementStyles(elements, cssProperty, value) {
  elements.forEach((element) => {
    element.style[cssProperty] = value;
  });
}

// setTypeBackgroundColor:
function setTypeBackgroundColor(pokemon) {
  const mainType = pokemon.types[0].type.name;
  const color = typeColors[mainType];

  if (!color) {
    console.warn(`Color not defined for type: ${mainType}`);
    return;
  }
  
  // use setElementStyle here:
  const detailMainElement = document.querySelector(".detail-main");
  setElementStyles([detailMainElement], "backgroundColor", color);
  setElementStyles([detailMainElement], "borderColor", color);
  setElementStyles(document.querySelectorAll(".power-wrapper > p"),"backgroundColor",color);
  setElementStyles(document.querySelectorAll(".stats-wrap p.stats"),"color",color);
  setElementStyles(document.querySelectorAll(".stats-wrap .progress-bar"),"color",color);

  // use rgbaColor here:
  const rgbaColor = rgbaFromHex(color);
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .stats-wrap .progress-bar::-webkit-progress-bar {background-color: rgba(${rgbaColor}, 0.5);}
    .stats-wrap .progress-bar::-webkit-progress-value { background-color: ${color};}
  `;
  
  document.head.appendChild(styleTag);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// CreateAndAppendElement:

function createAndAppendElement(parent, tag, options = {}) {
  const element = document.createElement(tag);
  Object.keys(options).forEach((key) => {
    element[key] = options[key];
  });

  parent.appendChild(element);
  return element;
}

// DisplayPokemonDetails:
function displayPokemonDetails(pokemon) {
  const { name, id, types, weight, height, abilities, stats } = pokemon;
  // use capitalizeFirstLetter here:
  const capitalizePokemonName = capitalizeFirstLetter(name);
  const title = document.querySelector("title");
  title.textContent = capitalizePokemonName;
  const detailMainElement = document.querySelector(".detail-main");
  detailMainElement.classList.add(name.toLowerCase());
  const namewrap = document.querySelector("name-wrap .name");
  namewrap.textContent = capitalizePokemonName;
  const pokemon_id_wrap = document.querySelector(".pokemon-id-wrap .body2-fonts");
  pokemon_id_wrap.textContent = `#${String(id).padStart(3, "0")}`
  const imageElement = document.querySelector(".detail-img-wrapper img");
  imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  const typeWrapper = document.querySelector(".power-wrapper");
  typeWrapper.innerHTML = "";
  
  types.forEach(({ type }) => {
    createAndAppendElement(typeWrapper, "p", {
      className: `body3-fonts type ${type.name}`,
      textContent: type.name,
    })
  })
}


// map array ke har element ko process karta hai aur nayi values ka ek naya array return karta hai.
// Why map here? map yahan use kiya gaya kyunki selectors ko DOM elements mein efficiently convert karna tha aur unko ek nayi array mein store karna tha.

// When to use map? Jab aapko ek array ke har element pe operation karke ek nayi array banani ho.