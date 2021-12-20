const { getPokemonData } = require('../../utils/getPokemonData.js');
const { Pokemon, Type } = require('../../db.js');
const { getNamesByTypes } = require('../../utils/getNamesByTypes.js');
const axios = require('axios');
// const { arrayPokemonFilterMocks } = require('../../../../mocks/mocksData.js');
async function getApiInfo() {

  /*Descomenta el siquiente bloque para conectar la ruta principal del api */

  

  // ---> Traemos a los pokemon desde el API
  const dataAPI = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); //obtenemos pokemons del 1 al 40
  const pk = [...dataAPI.data.results]; // array de resultados que contienen la info para acceder a cada pokemon
  const data = await Promise.all(
    pk.map((pokemon) => axios.get(pokemon.url)) //genero un array de promesas
  ); //paso mi array de promesas para resolverlo
  let arrPokemons = []; // array auxiliar para guardar la info filtrada de cada pokemon
  data.forEach((pokemon) => {
    arrPokemons.push({
      ...getPokemonData(pokemon), //obtenemos la data y la guardamos en el array de pokemons
    });
  });

  

  /* Comenta el siguiente array  arrPokemons declarado con const para deconectar la data hardcodeada que simula la petición a la ruta principal del api */

  // const arrPokemons = arrayPokemonFilterMocks; // ---> Data hardcodeada para mandar al front, ya tiene la info que nos interesa de los 40 pokemon en ese array

  return arrPokemons;
}
async function getDbInfo() {
  let arrPokemonsDb = [];
  arrPokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
      atributes: ['name'], //trae la data mediante el nombre(la propiedad del modelo type)
      thorugh: {
        atributes: [], //para comprobación, siempre va
      },
    },
  });
  arrPokemonsDb = arrPokemonsDb.map((e) => {
    return { ...e.dataValues, types: getNamesByTypes(e.dataValues) };
  });
  return arrPokemonsDb.reverse();
}

module.exports = { getApiInfo, getDbInfo };
