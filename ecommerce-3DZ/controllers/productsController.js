const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// let products = JSON.parse(fs.readFileSync(__dirname + '/../data/productsDataBase.json', 'utf-8'));

//Requiero la Base de Datos:

const productsController = {
    carrito: function(req, res, next) {
        res.render('products/carrito', { title: 'Carrito de Compras 3DZ' });
    },
    vistaProducto : function(req,res,next){
        db.Producto.findAll({
            include : [{association:"medidas"},{association:"materials"}]
        })
            .then(function(productos){
                res.render('products/products',{productos:productos});
            })
    },
    search : function(req,res,next){
        let x = req.body.search;
 
        db.Producto.findAll({
            where: { descripcion: {[db.Sequelize.Op.like]: '%' + x + '%'} },
            include : [{association:"medidas"},{association:"materials"}]
        }).then(function(productos){
            res.render('products/products', {productos})
        }).catch((err) => {console.log(err)});
    },
    id : function(req,res,next){
        db.Producto.findByPk(req.params.id)
        .then((producto) =>{
            if (producto){
                res.render('products/productDetail', {producto});
            } else {
                res.redirect('/products');
            }
        }).catch(err => {console.log(err)})

    },
    create : function(req,res,next){
        let promesaMedidas = db.Medida.findAll();
        let promesaMaterial = db.Material.findAll();

        Promise.all([promesaMedidas, promesaMaterial])
            .then(([medidas,materials]) =>{
                res.render('products/create', {medidas:medidas,materials:materials});
            })
    },
    /*store : function(req,res,next){
        let newProduct = req.body;
        if(products.length > 0){
            let ultimoID = products[products.length-1].id;
            newProduct.id = Number(ultimoID + 1);
        } else {
            newProduct.id = 1;
        }
        newProduct.price = Number(req.body.price);
        //objeto para tomar la imagen de multer: (si files no funciona es porque olvidaste el encType en el formulario de carga)
        newProduct.image = req.files[0].filename;
        products.push(newProduct);
        //sobre-escribo-el-archivo-con-el-nuevo-producto 
        fs.writeFileSync(__dirname + '/../data/productsDataBase.json',JSON.stringify(products));
        res.send('Producto cargado!');
    },*/
    store : function(req, res, next) {
        db.Producto.create({
            descripcion: req.body.name,
            precio: Number(req.body.price),
            // LA SIG. MANERA (COMENTADA) GUARDA EL ARCHIVO EN RESOURCES Y LUEGO LO LEE CON FS, ALMACENANDOLO EN LA DB COMO UN BLOB:
            // (EN PHPMYADMIN LA COLUMNA IMAGEN DEBE ESTAR SETIADO COMO BLOB TAMBIEN)
            // imagen : fs.readFileSync(__dirname + "/../resources/uploads/" + req.files[0].filename),
            imagen : path.normalize("/uploads/" + req.files[0].filename),
            pintado : req.body.pintado,
            material_id : req.body.Material,
            medida_id : req.body.dimension
        }).then(()=>{
            res.redirect('/products');
        }).catch((err) => { console.log(err) })
    },
    edit : function(req,res,next){
        let promesaProducto = db.Producto.findByPk(req.params.id,{
            include : [{association:"medidas"},{association:"materials"}]
        });
        let promesaMedidas = db.Medida.findAll();
        let promesaMaterial = db.Material.findAll();

        Promise.all([promesaMedidas, promesaMaterial, promesaProducto])
            .then(([medidas,materials,producto]) =>{
                res.render('products/edit', {medidas:medidas,materials:materials, producto:producto});
            }).catch((err) => {console.log(err)})

    },
    update : function(req,res,next){
        // products.forEach(product => { 
        //     if (product.id == req.params.id){
        //         OJO QUE EL POST ES CON BODY Y EL GET CON PARAMS
        //         product.name = req.body.name;
        //         product.dimension = req.body.dimension;
        //         product.price = req.body.price;
        //         product.Material = req.body.Material;
        //         if (typeof req.files[0] == 'undefined'){
        //             product.image = product.image;
        //         }else{
        //             product.image = req.files[0].filename;
        //         }
        //         product.pintado = req.body.pintado;
        //         }
        //     });
        //     fs.writeFileSync(__dirname + '/../data/productsDataBase.json',JSON.stringify(products));
        //     res.send('actualizado exitosamente!');
        db.Producto.update({
            descripcion: req.body.name,
            precio: Number(req.body.price),
            imagen : path.normalize("/uploads/" + req.files[0].filename),
            pintado : req.body.pintado,
            material_id : req.body.Material,
            medida_id : req.body.dimension
        },{
            where : {
                id : req.params.id
            }
        }).then(()=>{
            res.redirect('/products');
        }).catch((err) => { console.log(err) })
    },
    destroy : function(req,res,next){
       db.Producto.destroy({
           where : {
               id : req.params.id
           }
       })
       res.redirect('/products');
    }
};

module.exports = productsController;