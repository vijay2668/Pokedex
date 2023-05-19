const pokemonName = document.querySelector("#pokemon-name");
const pokemonNumber = document.querySelector("#pokemon-number");
const pokemonImage = document.querySelector("#pokemon-image");

const form = document.querySelector('form');
const input = document.querySelector('input');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let start = 1;

const fetchPokemon = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(`Could not fetch Pokémon ${pokemon}`);
  }
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    start = data.id
  } else {
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = 'https://orig00.deviantart.net/0c62/f/2016/346/e/d/pokecember_day__11__favorite_ghost____missingno__by_ambrosiadelish-darfn0r.gif';
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pokemon = input.value.toLowerCase();
  renderPokemon(pokemon);
});

prevBtn.addEventListener('click', () => {
  if (start > 1) {
    start -= 1;
    renderPokemon(start);
    input.value = "";
}
});

nextBtn.addEventListener('click', () => {
    start += 1;
    renderPokemon(start);
    input.value = "";
});

renderPokemon(start);