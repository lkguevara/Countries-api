const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3), // código de 3 letras
      primaryKey: true,
      allowNull: false, // No se permite que el campo este vacío
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
    },
    // Datos no obligatorios
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.FLOAT,
    }
  },
  {
    timestamps:false
  }
  ); // no permite crear campos createdAt y updatedAt
};
