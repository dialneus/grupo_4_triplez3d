module.exports = (sequelize, dataTypes) => {
  let alias = 'Usuarios';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true
    },
    nombreApellido: { 
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.STRING
    },
    telefono: {
      type: dataTypes.INTEGER
    },
    domicilio: {
      type: dataTypes.STRING
    },
    localidad: {
      type: dataTypes.STRING
    },
  }

  let config = {
    tablename: 'usuarios',
    timestamps: false
  }

  let Usuario = sequelize.define(alias, cols, config);
  return Usuario;
}