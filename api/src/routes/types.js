const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db'); //me raigo mis
// NOTA PARA RECORDAR: si usamos next() en una ruta lo que hará es ir al siguiente midddleware qye estén en este caso va a ir al control de errores (revisar en app.js)
const router = Router();

router.get('/', async (req, res, next) => {
  const typesBD = await Type.findAll({
    atributes: ['name'], //trae la data mediante el nombre(la propiedad del modelo type)
  });
  if (!typesBD.length) {
    let typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
    typesAPI = await typesAPI.data.results.map((type) => {
      return { name: type.name };
    });
    Type.bulkCreate(typesAPI);
    res.send(typesAPI);
  }
});

// router.get('/', async (req, res, next) => {
//   let typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
//   typesAPI = typesAPI.data.results.map((type) => type.name);
//   console.log(typesAPI);
// });

module.exports = router;
