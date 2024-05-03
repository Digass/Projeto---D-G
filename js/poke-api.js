const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = getElement('.digiteMeio-input'),
      searchButton = getElement('.digiteMeio-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');

let pokeName, 
    pokemon, 
    card; 


function getElement(element) {
  return document.querySelector(element);
}

function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

function createCard () {
  card = `
  <div class="${pokemon.types.length > 1 ? pokemon.types.map(item => item.type.name).reverse().slice(1).join(' ') + ' pokemon-picture' : pokemon.types[0].type.name +  'pokemon-picture'}">
  <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
</div>
<div class="pokemon-info">
  <h1 class="name">Name: ${pokemon.name}</h1>
  <h2 class="number">Nº ${pokemon.id}</h2>
  <h3 class="type ${pokemon.types.length > 1 ? pokemon.types.map(item => item.type.name).reverse().slice(0).join(' ') : pokemon.types[0].type.name }">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
  <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
  <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
</div>
    `
    ;
  return card;
}

function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  setTimeout(function () {

    if(pokemon.detail) {
      erroMessage.style.display = 'block';
      container.style.display = 'none';
    }else{
      erroMessage.style.display = 'none';
      container.style.display = 'flex';
      container.innerHTML = createCard();
      
    }
  }, 2000);
}

searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  startApp(pokeName);
  container.classList.add('fade');

  setTimeout(() => {
    container.classList.remove('fade');
  }, 3000);
});
