const { Type } = require('../db');

async function getID(data) {
  let types = [];
  for (let i = 0; i < data.length; i++) {
    types.push(
      await Type.findOne({
        where: { name: data[i] },//en la tabla types busco los tipos de pokemon por id, y regreso solo sus ids en un array
        attributes: ['id'],//saco el atributo id
      })
    );
  }
  return types;
}

module.exports = { getID };
