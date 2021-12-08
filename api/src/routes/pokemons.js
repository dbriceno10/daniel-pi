const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const { getPokemonData } = require('../utils/getPokemonData');
const { getPokemonData2 } = require('../utils/getPokemonData2.js');
const { getNamesByTypes } = require('../utils/getNamesByTypes');
const { getID } = require('../utils/getID.js');
const { arrayPokemonFilterMocks } = require('../../../mocks/mocksData.js'); //--> Array con data harcodeada
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

      /*Descomenta el siquiente cloque para conectar la ruta principal del api */

      /*
      // ---> Traemos a los pokemon desde el API
      const dataAPI = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=40'
      ); //obtenemos pokemons del 1 al 40
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
      */

      /* Comenta el siguiente array  arrPokemons declarado con const para deconectar la data hardcodeada que simula la petición a la ruta principal del api */

      const arrPokemons = arrayPokemonFilterMocks; // ---> Data hardcodeada para mandar al front, ya tiene la info que nos interesa de los 40 pokemon en ese array

      arrPokemonsDb = arrPokemonsDb.map((e) => {
        return { ...e.dataValues, types: getNamesByTypes(e.dataValues) };
      });
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
      if (types) {
        //si recibo un tipos los voy a buscar en la base de datos de tipos para buscar sus ids
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
      } else {
        return res.status(404).send('Error, no se encontraron los tipos');
      }
    }
    res.status(404).send('El nombre es requerido para crear un pokemon');
  } catch (error) {
    return res.status(404).send('error de creación');
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    //Primero vamos a buscar en la base de datos, si llega a fallar, lo carturamos en el bloque catch y disparamos un nuevo código
    let pokemonDB = await Pokemon.findOne({ where: { id }, include: Type });
    pokemonDB = { ...pokemonDB.dataValues, types: getNamesByTypes(pokemonDB) };
    return res.send(pokemonDB);
  } catch (error) {
    try {
      //como ese id no estaba en la base de datos, ahora vamos a buscar en el api
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`
      );
      pokemonAPI = getPokemonData2(pokemonAPI);
      return res.send(pokemonAPI);
    } catch (error) {
      return res.status(404).send(error); //si el id no se encontró en ningún lado
    }
  }
});

module.exports = router;
