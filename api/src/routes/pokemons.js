const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const { getPokemonData } = require('../utils/getPokemonData');
const { getPokemonData2 } = require('../utils/getPokemonData2.js');
const { getNamesByTypes } = require('../utils/getNamesByTypes');
const { getID } = require('../utils/getID.js');
const { getApiInfo, getDbInfo } = require('./modules/modules.js');
const router = Router();

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    if (!name) {
      const arrPokemonsDb = await getDbInfo();
      const arrPokemons = await getApiInfo();
      return res.send([...arrPokemonsDb, ...arrPokemons]);
    } else {
      //si llegó un name por query
      const nameLower = name.trim().toLowerCase();
      //Primero verificamos si está en la base de datos
      let pokemonDB = await Pokemon.findOne({
        where: {
          name: nameLower,
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
      //Si no está en la base de datos traemos desde el api
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameLower}`
      );
      pokemonAPI = getPokemonData(pokemonAPI);
      return res.send(pokemonAPI);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/', async (req, res, next) => {
  let {
    name,
    hp,
    strength,
    defense,
    speed,
    height,
    weight,
    img,
    types,
    createInDb,
  } = req.body; //recibo toda la info por body
  try {
    if (name) {
      if (!hp) hp = 1;
      if (!strength) strength = 1;
      if (!defense) defense = 1;
      if (!speed) speed = 1;
      if (!height) height = 1;
      if (!weight) weight = 1;
      if (!types.length) types = ['unknown'];
      //solo si recibo un nombre voy a guardar el pokemon en la base de datos
      const nameLower = name.trim().toLowerCase();
      const pokemonCreated = await Pokemon.create({
        name: nameLower,
        hp,
        strength,
        defense,
        speed,
        height,
        weight,
        img,
        createInDb,
      });
      const arrID = await getID(types); //Recibo un array de tipos y recibo un array de ids sacados de la tabla de tipos
      await pokemonCreated.setTypes(arrID);
      let pokemons = await Pokemon.findOne({
        where: {
          id: pokemonCreated.id,
        }, //busco el id
        include: Type,
      });
      pokemons = {
        ...pokemons.dataValues,
        types: getNamesByTypes(pokemons), //obtengo el array de tipos
      };
      return res.json(pokemons);
    }
    res.status(404).send('El nombre es requerido para crear un pokemon');
  } catch (error) {
    return res.status(404).send('error de creación');
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Pokemon.findOne({ where: { id }, include: Type })
    .then(
      (pokemonDB) =>
        (pokemonDB = {
          ...pokemonDB.dataValues,
          types: getNamesByTypes(pokemonDB),
        })
    )
    .then((pokemonDB) => res.send(pokemonDB))
    .catch((error) =>
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`)
        .then((pokemonAPI) => (pokemonAPI = getPokemonData2(pokemonAPI)))
        .then((pokemonAPI) => res.send(pokemonAPI))
        .catch((error) => res.status(404).send(error))
    );
});

module.exports = router;
