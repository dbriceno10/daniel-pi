/******** Función para devolver solo la data del pokemon desde el api necesaria para la ruta principal *********/

function getPokemonData(auxData) {
  return {
    id: auxData.data.id,
    name: auxData.data.name,
    // hp: auxData.data.stats[0].base_stat,
    // strength: auxData.data.stats[1].base_stat,
    // defense: auxData.data.stats[2].base_stat,
    // speed: auxData.data.stats[5].base_stat,
    // height: auxData.data.height,
    // weight: auxData.data.weight,
    img: auxData.data.sprites.front_default,
    types: auxData.data.types.map((e) => e.type.name),
  };
}

module.exports = { getPokemonData };
