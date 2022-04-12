const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db'); //me raigo mis modelos de base de datos
const { getPokemonData } = require('../utils/getPokemonData');
const { getPokemonData2 } = require('../utils/getPokemonData2.js');
const { getNamesByTypes } = require('../utils/getNamesByTypes');
const { getID } = require('../utils/getID.js');
const { getApiInfo, getDbInfo } = require('./modules/modules.js');
const router = Router();

//************RUTAS pokemons/ ************************ */
//  GET /pokemons:
// Obtener un listado de 40 pokemons
// Debe devolver solo los datos necesarios para la ruta principal (id, name, types, image) si vienen del api, y toda la info del pokemon si vienen de la base de datos (id, name, hp, strength, defense, speed, height, weight, img, types,createInDb)

// [ ] GET /pokemons?name="...":
// Obtener la data de un pokemon ingresado su nombre exacto o su id como un query parameter

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    // GET /pokemons
    if (!name) {
      //obtenemos la data desde la base de datos como un array
      const arrPokemonsDb = await getDbInfo();
      //obtenemos la data desde el api como un array
      const arrPokemons = await getApiInfo();
      //las juntamos en un solo array y enviamos la respuesta
      return res.send([...arrPokemonsDb, ...arrPokemons]);
    } else {
      //si llegó un name por query GET /pokemons?name="..."
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

/*[ ] POST /pokemons:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
Crea un nuevo pokemon y lo guarda en la base de datos */

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
    // res.status(404).send('El nombre es requerido para crear un pokemon');
  } catch (error) {
    return res.status(404).send('error de creación');
  }
});

/**[ ] GET /pokemons/{id}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
Obtener los detalles de un pokemon en particular, debe traer toda la data asociada a la ruta de detalles (id, name, hp, strength, defense, speed, height, weight, img, types, y si el pokemon vienen de la base de datos: createInDb)
*/

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

/**[ ] DELETE /pokemons/{id}: 
Recibe por por params el id del pokemon para buscarlo y borrarlo de la base datos
**/

// router.delete('/:id', async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     if (id) {
//       const pokemon = await Pokemon.destroy({
//         where: { id: id },
//       });
//       return res.send({message: 'Pokemon eliminado', pokemon});
//     } else res.send('Pokemon no encontrado');
//   } catch (error) {
//     return res.status(404).send(error);
//   }
// });

/**[ ] UPDATE /pokemons/{id}: 
Recibe por por params el id del pokemon para buscarlo y actualizar sus datos con los datos recibidos por body
**/

// router.put(':id', async (req, res, next) => {
//   const { id } = req.params;
//   const { name, hp, strength, defense, speed, height, weight, img, types } =
//     req.body;
//   try {
//     const pokemon = await Pokemon.findOne({ where: { id: id } });
//     if(!pokemon) {
//       return res.status(404).send('Pokemon no encontrado');
//     }
//     await pokemon.update({
//       name: name? name.trim().toLowerCase() : pokemon.name,
//       hp: hp? hp : pokemon.hp,
//       strength: strength? strength : pokemon.strength,
//       defense: defense? defense : pokemon.defense,
//       speed: speed? speed : pokemon.speed,
//       height: height? height : pokemon.height,
//       weight: weight? weight : pokemon.weight,
//       img: img? img : pokemon.img,
//     });
//     // const arrID = await getID(types);
//     // await pokemon.setTypes(arrID);
//     // let pokemons = await Pokemon.findOne({
//     //   where: {
//     //     id: pokemon.id,
//     //   },
//     //   include: Type,
//     // });
//     // pokemons = {
//     //   ...pokemons.dataValues,
//     //   types: getNamesByTypes(pokemons),
//     // };
//     return res.send({mesage: 'Pokemon Actualizado', pokemon});
//   } catch (error) {
//     return res.status(404).send(error);
//   }
// });

module.exports = router;
