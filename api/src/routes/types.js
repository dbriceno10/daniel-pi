const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db'); //me raigo mis
// NOTA PARA RECORDAR: si usamos next() en una ruta lo que hará es ir al siguiente midddleware qye estén en este caso va a ir al control de errores (revisar en app.js)
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const typesBD = await Type.findAll({
      //Primero me fijo si los tipos están en la base de datos
      atributes: ['name'], //trae la data mediante el nombre(la propiedad del modelo type)
    });
    if (!typesBD.length) {
      //si no están, los busco en el api
      let typesAPI = await axios.get('https://pokeapi.co/api/v2/type');
      typesAPI = await typesAPI.data.results.map((type) => {
        return { name: type.name };
      });
      await Type.bulkCreate(typesAPI); //los guardo todos, bulkCreate me permite guardar un array de elementos de un solo jalón
      return res.send(typesAPI);
    }
    res.send(typesBD); // si estaba en la base de datos mando la respuesta
  } catch (error) {
    res.status(404).send('error');
  }
});

module.exports = router;
