const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const { getPokemonData } = require('../utils/getPokemonData');
const { getNamesByTypes } = require('../utils/getNamesByTypes');
const { getID } = require('../utils/getID.js');
const { arrayPokemonFilterMocks } = require('../../../mocks/mocksData.js');
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
      /*
      // ---> Traemos a los pokemon desde el API
      const dataAPI = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=40'
      ); //obtenemos pokemons del 1 al 40
      // const pk = [...dataAPI.data.results]; // array de resultados que contienen la info para acceder a cada pokemon
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
      arrPokemonsDb = arrPokemonsDb.map((e) => {
        return { ...e.dataValues, types: getNamesByTypes(e.dataValues) };
      });
      const arrPokemons = arrayPokemonFilterMocks.slice(); // ---> Data hardcodeada para mandar al front, ya tiene la info que nos interesa de los 40 pokemon en ese array
      return res.send([...arrPokemonsDb, ...arrPokemons]);
    } else {
      // if (name === '') return res.status(404).send('el nombre es requerido');
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
      // try {
      //Si no está en la base de datos traemos desde el api
      let pokemonAPI = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameLower}`
      );
      pokemonAPI = getPokemonData(pokemonAPI);
      return res.send(pokemonAPI);
    }
  } catch (error) {
    res.sendStatus(404);
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
      // if (!img) {
      //   img =
      //     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10007.png';
      // }
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
        const arrID = await getID(types);
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
          // types: getNamestypes(pokemons).reverse(),
        };
        return res.json(pokemons);
      } else {
        return res.status(404).send('Error, no se encontraron los tipos');
      }
    } //Nota debemos mejorar esta lógica, se puede dar el caso de que si no le paso un tipo, solo voy a guardar los datos del pokemon, pero no sus tipos, y no retornaría una repuesta, por lo que terminaría enviando solo un mensaje de error. Debería hacer que toda esta lógica dependa del nombre y tipo
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
      pokemonAPI = getPokemonData(pokemonAPI);
      return res.send(pokemonAPI);
    } catch (error) {
      return res.status(404).send('ID no encontrado'); //si el id no se encontró en ningún lado
    }
  }
});

module.exports = router;
