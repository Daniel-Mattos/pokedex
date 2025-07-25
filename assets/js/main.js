const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMoreButton")
const limit = 12
let offset = 0
const maxRecords = 151

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons
      .map(
        (pokemon) => `<li class="pokemon ${pokemon.type}">
        <a href="./assets/pokemon.html?id=${pokemon.number}">
          <div class="identity">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
          </div>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>
            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
          </a>
        </li>`
      )
      .join("")
    pokemonList.innerHTML += newHTML
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click", () => {
  offset += limit
  const qtdRecordNews = offset + limit
  if(qtdRecordNews>=maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)
    
    loadMoreButton.parentElement.removeChild(loadMoreButton)
    return
  }
  loadPokemonItens(offset, limit)
})