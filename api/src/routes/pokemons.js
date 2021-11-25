const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const { getPokemonData } = require('../utils/getPokemonData');
const { getNamesByTypes } = require('../utils/getNamesByTypes');
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
      // arrPokemonsDb = await Pokemon.findAll({
      //   include: Type,
      // });
      arrPokemonsDb = await Pokemon.findAll({
        include: {
          model: Type,
          atributes: ['name'], //trae la data mediante el nombre(la propiedad del modelo type)
          thorugh: {
            atributes: [], //para comprobación, siempre va
          },
        },
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
      // let pokemons = [];
      // let pk = [...data1.data.results, ...data2.data.results]; // array de resultados que contienen la info para acceder a cada pokemon
      // let pokemons = await pk.map((pokemon) => axios.get(pokemon.url)); //genero un array de promesas, para trater la info de cada pokemon
      const data = await Promise.all(
        pk.map((pokemon) => axios.get(pokemon.url))
      ); //paso mi array de promesas para resolverlo
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
    // res.send('Error');
    res.sendStatus(404);
  }
});

router.post('/', async (req, res, next) => {
  const { name, hp, strength, defense, speed, height, weight, img, types } =
    req.body;
  const pokemonCreated = await Pokemon.create({
    name,
    hp,
    strength,
    defense,
    speed,
    height,
    weight,
    img,
  });
});

async function getID(data) {
  let array = [];
  for (let i = 0; i < data.length; i++) {
    arr.push(
      await Type.findOne({
        where: { name: data[i] },
        attributes: ['id'],
      })
    );
  }
  return array;
}

module.exports = router;
