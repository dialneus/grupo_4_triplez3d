module.exports = (sequelize, dataTypes) => {
    let alias = 'Carrito';
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncremental: true
      },
      fecha_compra : dataTypes.DATE,
      fecha_creacion : dataTypes.DATE,
      orderNumber : dataTypes.INTEGER,
      total : dataTypes.INTEGER,
      usuario_id : dataTypes.INTEGER
    }
  
    let config = {
      tablename: 'carrito',
      timestamps: false
    }
  
    const Carrito = sequelize.define(alias, cols, config);
  
    Carrito.associate = function(models){
      Carrito.belongsTo(models.Usuarios, { as:"usuarios", foreignKey:"usuario_id" });
      Carrito.hasMany(models.CarritoProducto, {as:"carrito_producto", foreignKey: "carrito_id"});
    }
  
    return Carrito;
  }