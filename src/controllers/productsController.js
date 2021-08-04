/* obtengo metodos de base de datos:
    leer() => devuelve la lista de productos en la base de datos.
                
    
    guardar(productos) => debe recibir la lista actualizada.
                          la guarda en el archivo json reemplazando su contenido
    
    obtenerProximoId() => observa cual es el id del ultimo elemento de la lista
                          devuelve el siguiente numero (ultimoId+1)*/

const { leer, guardar, obtenerProximoId } = require("../data/products_db");

/* ejecuto el metodo leer y obtengo:
    productos => tiene la lista de productos de la base de datos
                    cada producto tiene : 
                        id, name, category, description, image y price */
let productos = leer();

module.exports = {

    bar: (req, res) => {
        return res.render('bar', {
            title: "Experiencia Bar",
            productos,
            productosBar: productos.filter(producto => producto.category === "bar"),
        })
    },

    cine: (req, res) => {
        return res.render('cine', {
            title: "Experiencia Cine",
            productos,
            productosCine: productos.filter(producto => producto.category === "cine"),
        })
    },

    detail: (req, res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);
        return res.render('productDetail', {
            title: "Detalle de Experiencia: " + producto.name,
            producto
        })
    },

    cart: (req, res) => {
        return res.render('productCart', {
            title: "Carrito",
        })
    },

    add: (req, res) => {
        return res.render('productLoad', {
            title: "Agregar producto",
        })
    },
    save: (req, res) => {
        let producto = {
            id: obtenerProximoId(), 
            name: req.body.nombre,
            description: req.body.descripcion,
            image: "pulp-fiction.png",
            price: Number(req.body.precio),
            category: req.body.categoria
        };
        productos.push(producto);
        guardar(productos);
        res.redirect("/");
    },
    load: (req, res) => {
        let producto = productos.find(producto => producto.id === +req.params.id);
        return res.render('productUpdate', {
            title: "Modificar: " + producto.name,
            producto
        })
    },
    update: (req, res) => {
        let index = 0;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === +req.params.id) {
                productos[i].name = req.body.nombre;
                productos[i].description = req.body.descripcion;
                productos[i].price = Number(req.body.precio);
                productos[i].category = req.body.categoria;
                index = i;
            }
        };
        guardar(productos);
        let producto = productos[index];
        return res.render('productDetail', {
            title: "Detalle de Experiencia: " + producto.name,
            producto
        });
    }
}