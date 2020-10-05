// Busca os Pokemons da API pelo ID
const getPokemonURL = (ID) => `https://pokeapi.co/api/v2/pokemon/${ID}`;

// Gera as Promises
const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonURL(index + 1)).then((response) => response.json())
    );

// Gera o HTML
const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { id, name, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);

    accumulator += `
        <li class="card ${elementTypes[0]}">
          <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
          <h2 class="card-title">${id}. ${name}</h2>
          <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
      `;
    return accumulator;
  }, '');

// Insere o HTML
const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();
Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);
