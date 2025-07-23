document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const pokemonId = urlParams.get("id")
  const detailPageContent = document.getElementById("detailPageContent")

  if (!pokemonId) {
    detailPageContent.innerHTML = `
            <div class="content-top">
                <h1>Nenhum Pokémon especificado.</h1>
                <p>Por favor, retorne à <a href="../index.html">lista principal</a>.</p>
            </div>
        `
    document.title = "Erro - Pokedex"
    return
  }

  try {
    const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    const response = await fetch(pokemonApiUrl)
    const pokemonData = await response.json()
    const pokemon = convertPokeApiDetailToPokemon(pokemonData)

    document.title = `${pokemon.name} - Detail`

    const detailHTML = `
            <div class="content-top ${pokemon.type}">
                <nav>
                    <a href="../index.html" class="back-button"><</a>
                    <img src="./src/heart-regular-full.svg" alt="imagem de coração para favoritar" id="favoriteIcon" />
                </nav>
                <div class="identity">
                    <h1 class="name">${pokemon.name}</h1>
                    <span class="number">#${String(pokemon.number).padStart(
                      3,
                      "0"
                    )}</span>
                </div>
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
                <img
                    class="imagem"
                    src="${pokemon.photo}"
                    alt="${pokemon.name}"/>
                <div class="content-bottom">
                    <div class="option">
                        <div class="selecionado">
                            <span>About</span>
                            <hr />
                        </div>
                        <div>
                            <span>Base stats</span>
                            <hr style="visibility: hidden;"/>
                        </div>
                        <div>
                            <span>Evolution</span>
                            <hr style="visibility: hidden;"/>
                        </div>
                        <div>
                            <span>Moves</span>
                            <hr style="visibility: hidden;"/>
                        </div>
                    </div>
                    <div class="info">
                        <div class="info-pokemon">
                            <span>Altura: </span>
                            <span>Peso: </span>
                            <span>Habilidades: </span>
                        </div>
                        <div class="result">
                            <span>${pokemon.height / 10} m</span>
                            <span>${pokemon.weight / 10} kg</span>
                            <span>${pokemon.abilities.join(", ")}</span>
                        </div>
                              <!-- Health (HP): ${
                                pokemonData.stats.find(
                                  (s) => s.stat.name === "hp"
                                )?.base_stat || "N/A"
                              }<br>
                            Attack: ${
                              pokemonData.stats.find(
                                (s) => s.stat.name === "attack"
                              )?.base_stat || "N/A"
                            }<br>
                            Defense: ${
                              pokemonData.stats.find(
                                (s) => s.stat.name === "defense"
                              )?.base_stat || "N/A"
                            } -->
                    </div>
                </div>
            </div>
        `
    detailPageContent.innerHTML = detailHTML
  } catch (error) {
    detailPageContent.innerHTML = `
            <div class="content-top">
                <h1>Erro ao carregar detalhes do Pokémon.</h1>
                <p>Não foi possível encontrar este Pokémon ou houve um problema com a API.</p>
                <p>Por favor, tente novamente ou retorne à <a href="../index.html">lista principal</a>.</p>
            </div>
        `
    console.error("Erro ao buscar detalhes do Pokémon:", error)
  }
})
