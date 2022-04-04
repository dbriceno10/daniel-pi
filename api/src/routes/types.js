const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db'); //me raigo mis
const router = Router();

//************RUTAS types/************************ */
//  GET /types:
//Busca todos los tipos de pokemones los regresa

// router.get('/', async (req, res, next) => {
//   try {
//     const typesBD = await Type.findAll({
//       //Primero me fijo si los tipos están en la base de datos
//       // atributes: ['name', 'id'], //trae la data mediante el nombre(la propiedad del modelo type)
//     });
//     if (!typesBD.length) {
//       //si no están, los busco en el api
//       let typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
//       typesAPI = await typesAPI.data.results.map((type) => {
//         return { id: type.id, name: type.name };
//       });

//       await Type.bulkCreate(typesAPI); //los guardo todos, bulkCreate me permite guardar un array de elementos de un solo jalón
//       return res.send(typesAPI);
//     }
//     res.send(typesBD); // si estaba en la base de datos mando la respuesta
//   } catch (error) {
//     res.status(404).send('error');
//   }
// });

/****** Otra forma para traer los tipos, siempre busca en el api primero y luego revisa la base de datos, si el tipo está creado lo retorna, si no lo guarda y lo retorna. En desuso por ahora ******/

router.get('/', async (req, res, next) => {
  try {
    const typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
    const data = typesAPI.data.results;
    data.forEach((type) => {
      Type.findOrCreate({
        where: {
          name: type.name,
        },
      });
    });
    const typesDB = await Type.findAll();
    res.send(typesDB);
  } catch (error) {
    res.status(404).send('error');
  }
});

module.exports = router;
