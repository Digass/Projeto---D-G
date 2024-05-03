document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".digiteMeio");
  const pokemonInput = document.querySelector(".digiteMeio-input");
  const pokemonSection = document.querySelector(".pokemon");
  const errorSpan = document.querySelector(".error");
  const pokemonList = [];

  async function fetchPokemonNames() {
      try {
          const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
          if (!response.ok) {
              throw new Error("Falha ao filtrar os nomes dos pokemon .");
          }
          const data = await response.json();
          data.results.forEach(pokemon => pokemonList.push(pokemon.name));
      } catch (error) {
          console.error(error);
          errorSpan.textContent = "...";
      }
  }

  function displayFilteredPokemonList(input) {
    const filteredList = pokemonList.filter(pokemon => pokemon.includes(input.toLowerCase()));
    pokemonSection.innerHTML = "";
    filteredList.forEach(pokemon => {
        const listItem = document.createElement("div");
        listItem.textContent = pokemon;
        pokemonSection.appendChild(listItem);
    });
}


  fetchPokemonNames();

  pokemonInput.addEventListener("input", event => {
      const inputValue = event.target.value.trim();
      if (inputValue === "") {
          pokemonSection.innerHTML = "";
          return;
      }
      displayFilteredPokemonList(inputValue);
  });

  form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const pokemonName = pokemonInput.value.toLowerCase().trim();

      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          const data = await response.json();
          displayPokemon(data);
      } catch (error) {
          console.error(error);
          errorSpan.textContent = "Ocorreu um erro na busca pelo pokemon. Por favor tente novamente.";
      }
  });

  // Adiciona um event listener para a seção dos pokémons sugeridos
pokemonSection.addEventListener("click", event => {
    // Verifica se o elemento clicado é um nome de pokémon
    if (event.target.tagName === "DIV") {
        // Obtém o texto do elemento clicado
        const pokemonName = event.target.textContent;
        // Insere o nome do pokémon no input
        pokemonInput.value = pokemonName;
        // Limpa a seção dos pokémons sugeridos
        pokemonSection.innerHTML = "";
    }
});

  function displayPokemon(pokemonData) {
      pokemonSection.innerHTML = "";
      pokemonSection.innerHTML = `
          <h2>${pokemonData.name}</h2>
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
          <p>Types: ${pokemonData.types.map(type => type.type.name).join(", ")}</p>
          <p>Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(", ")}</p>
  `;

      pokemonSection.appendChild(abilitiesElement);
  }
});
