module.exports = (sequelize, dataTypes) => {
  let alias = 'Producto';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncremental: true
    },
    precio : dataTypes.FLOAT,
    descripcion : dataTypes.STRING,
    // modificado de BLOB =>
    imagen : dataTypes.STRING,
    pintado : dataTypes.STRING,
    material_id : dataTypes.INTEGER,
    medida_id : dataTypes.INTEGER
  }

  let config = {
    tablename: 'productos',
    timestamps: false
  }

  let Producto = sequelize.define(alias, cols, config);

  Producto.associate = function(models){
    Producto.belongsTo(models.Medida, { as:"medidas", foreignKey:"medida_id" });
    Producto.belongsTo(models.Material, { as:"materials", foreignKey:"material_id" });
  }

  return Producto;
}