const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const { getPokemonData } = require('../utils/getPokemonData');
const { getNamesByTypes } = require('../utils/getNamesByTypes');
const { getID } = require('../utils/getID.js');
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
      const dataAPI = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=40'
      ); //obtenemos pokemons del 1 al 40

      // const pk = [...dataAPI.data.results]; // array de resultados que contienen la info para acceder a cada pokemon
      const pk = [
        dataAPI.data.results[0],
        dataAPI.data.results[2],
        dataAPI.data.results[3],
      ];
      const data = await Promise.all(
        pk.map((pokemon) => axios.get(pokemon.url)) //genero un array de promesas
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
      console.log(arrPokemons);
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
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.post('/', async (req, res, next) => {
  const { name, hp, strength, defense, speed, height, weight, img, types } =
    req.body;
  if (name) {
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
    if (types) {
      const arrID = await getID(types);
      await pokemonCreated.setTypes(arrID);
      let pokemons = await Pokemon.findOne({
        where: {
          id: pokemonCreated.id,
        },
        include: Type,
      });
      pokemons = {
        ...pokemons.dataValues,
        types: getNamesByTypes(pokemons),
        // types: getNamestypes(pokemons).reverse(),
      };
      return res.json(pokemons);
    }
  }
  res.status(404).send('Name is required to create a new pokemon');
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    let pokemonDB = await Pokemon.findOne({ where: { id }, include: Type });
    console.log('Pokemon DB: ', pokemonDB);
    pokemonDB = { ...pokemonDB.dataValues, types: getNamesByTypes(pokemonDB) };
    return res.send(pokemonDB);
  } catch (error) {
    try {
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`
      );
      pokemonAPI = getPokemonData(pokemonAPI);
      return res.send(pokemonAPI);
    } catch (error) {
      return res.status(404).send('ID not found');
    }
  }
});

module.exports = router;
