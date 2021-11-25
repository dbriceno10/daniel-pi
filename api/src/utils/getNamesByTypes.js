function getNamesByTypes(pokemon) {
  pokemon = pokemon.types.map((e) => e.dataValues.name);
  return pokemon;
}

module.exports = { getNamesByTypes };
