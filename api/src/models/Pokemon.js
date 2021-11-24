const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //para hacer que sea obligatorio
      },
      //de life a weigth, son opcionales y todos de tipo entero
      life: {
        type: DataTypes.INTEGER,
      },
      strength: {
        type: DataTypes.INTEGER,
      },
      defending: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weigth: {
        type: DataTypes.INTEGER,
      },
      //podría ir un atributo imagen que recibe una url, para la sprite...
      img: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    }
  );
};
