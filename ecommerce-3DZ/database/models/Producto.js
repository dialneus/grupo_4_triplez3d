module.exports = (sequelize, dataTypes) => {
  let alias = 'Producto';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true
    },
    precio: dataTypes.FLOAT,
    descripcion: dataTypes.STRING,
    imagen: dataTypes.TEXT,
    pintado: dataTypes.INTEGER
  }

  let config = {
    tablename: 'productos',
    timestamps: false
  }

  let Producto = sequelize.define(alias, cols, config);
  return Producto;
}