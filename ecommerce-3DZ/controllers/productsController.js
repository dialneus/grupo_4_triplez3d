const fs = require('fs');
let products = JSON.parse(fs.readFileSync(__dirname + '/../data/productsDataBase.json', 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//Requiero la Base de Datos:
//const db = require('../database/models');

const productsController = {
    carrito: function(req, res, next) {
        res.render('products/carrito', { title: 'Carrito de Compras 3DZ' });
    },
    vistaProducto : function(req,res,next){
        res.render('products/products',{products, toThousand});
    },
    id : function(req,res,next){
        let product = products.find(element => element.id == req.params.id);
        if (product){
            res.render('products/productDetail',{products, toThousand,product});
        }else {
            res.send('No existe el producto!');
        }
    },
    create : function(req,res,next){
        res.render('products/create');
    },
    store : function(req,res,next){
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
    },
    /*store : function(req, res, next) {
        console.log(req.body);
        db.Producto.create({
            descripcion: req.body.name,
            precio: req.body.price,
        });
        res.redirect('/products');
    },*/
    edit : function(req,res,next){
        let productFind;
        products.forEach(product => { 
            //BUSCO EL PRODUCTO POR ID
            if (product.id == req.params.id){
                productFind = product;
            }
        });
        // SI LO ENCUENTRO DEVUELVE LA VISTA
        if (productFind){
            res.render('products/edit',{product:productFind});
        } else {
            res.send('no existe tal producto!');
        }
    },
    update : function(req,res,next){
        products.forEach(product => { 
            if (product.id == req.params.id){
                //OJO QUE EL POST ES CON BODY Y EL GET CON PARAMS
                product.name = req.body.name;
                product.dimension = req.body.dimension;
                product.price = req.body.price;
                product.Material = req.body.Material;
                if (typeof req.files[0] == 'undefined'){
                    product.image = product.image;
                }else{
                    product.image = req.files[0].filename;
                }
                product.pintado = req.body.pintado;
                }
            });
            fs.writeFileSync(__dirname + '/../data/productsDataBase.json',JSON.stringify(products));
            res.send('actualizado exitosamente!');
    },
    destroy : function(req,res,next){
        // RECORDAR QUE FILTER DEVUELVE UN NUEVO ARRAY y requiere de un booleano (true pasa false no pasa) entonces:
        let newProducts = products.filter(product =>{
            return req.params.id != product.id;
        });
        console.log(newProducts);
        fs.writeFileSync(__dirname + '/../data/productsDataBase.json',JSON.stringify(newProducts));
        res.send('Eliminado exitosamente!');
    }
};

module.exports = productsController;