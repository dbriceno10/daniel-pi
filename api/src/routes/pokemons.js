const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const e = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// NOTA PARA RECORDAR: si usamos next() en una ruta lo que hará es ir al siguiente midddleware qye estén en este caso va a ir al control de errores (revisar en app.js)

const router = Router();

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    if (!name) {
      //----> Traemos los pokemon que están en la base de datos
      let arrPokemonsDb = [];
      arrPokemonsDb = await Pokemon.findAll({
        include: Type,
      });
      // ---> Traemos a los pokemon desde el API
      const data1 = await axios.get('https://pokeapi.co/api/v2/pokemon'); //obtenemos pokemons del 1 al 20
      const data2 = await axios.get(data1.data.next); //obtenemos pokemons del 21 al 40
      let pk = [
        // por cuestiones del internet solo nos limitaremos a traer 6 pokemon, los primeros 3 de cada petición
        data1.data.results[0],
        // data1.data.results[1],
        // data1.data.results[2],
        // data2.data.results[0],
        // data2.data.results[1],
        // data2.data.results[2],
      ];
      // let pk = [...data1.data.results, ...data2.data.results]; // array de resultados que contienen la info para acceder a cada pokemon
      let pokemons = pk.map((pokemon) => axios.get(pokemon.url)); //genero un array de promesas, para trater la info de cada pokemon
      const data = await Promise.all(pokemons); //paso mi array de promesas para resolverlo
      let arrPokemons = []; // array auxiliar para guardar la info filtrada de cada pokemon
      data.forEach((pokemon) => {
        arrPokemons.push({
          ...getPokemonData(pokemon), //obtenemos la data y la guardamos en el array de pokemons
        });
      });
      arrPokemonsDb = arrPokemonsDb.map((e) => {
        return { ...e.dataValues, types: getNamesByTypes(e.dataValues) };
      });
      return res.send([...arrPokemonsDb, ...arrPokemons]);
    } else {
      //si llegó un name por query
      //Primero verificamos si está en la base de datos
      let pokemonDB = await Pokemon.findOne({
        where: {
          name: name,
        },
        include: Type,
      });
      if (pokemonDB) {
        pokemonDB = {
          ...pokemonDB.dataValues,
          types: getNamesByTypes(pokemonDB),
        };
        return res.send(pokemonDB);
      }
      // try {
      //Si no está en la base de datos traemos desde el api
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      pokemonAPI = getPokemonData(pokemonAPI);
      return res.send(pokemonAPI);
      // } catch (error) {
      //   res.sendStatus(404)
      // }
    }
  } catch (error) {
    // console.error(error);
    res.send('Error');
    res.sendStatus(404);
  }
});

function getPokemonData(auxData) {
  return {
    id: auxData.data.id,
    name: auxData.data.name,
    hp: auxData.data.stats[0].base_stat,
    strength: auxData.data.stats[1].base_stat,
    defense: auxData.data.stats[2].base_stat,
    speed: auxData.data.stats[5].base_stat,
    height: auxData.data.height,
    weight: auxData.data.weight,
    img: auxData.data.sprites.front_default,
    types: auxData.data.types.map((e) => e.type.name),
  };
}

function getNamesByTypes(pokemon) {
  pokemon = pokemon.types.map((e) => e.dataValues.name);
  return pokemon;
}

/*
    let arrPokemons = [];
      for (let pokemon of pk) {
        let pkDetail = await axios.get(pokemon.url);
        pkDetail = pkDetail.data;
        delete pokemon.url;
        arrPokemons.push({
          ...getPokemonData(pokemon),
        });
      }
    */

module.exports = router;
