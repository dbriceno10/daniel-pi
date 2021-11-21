const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'type',
    {
      //el id queda como numérico autoincremental
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
