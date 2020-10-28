//Solicitud de librerias:
var express = require("express");

var router = express.Router();//Objeto router

///////router.use("./public",express.static('public'));//?????AQUI NO FUNCIONA EL CSS DE LA CARPETA PUBLIC, NO SE COMO TRAERLO

// app.com/app/ => el / de router.get es relativo:
router.get("/",//path
    function(req,res){//pasamos el handler, administra cuando se entre a esa ruta
        //aquí hay que buscar el usuario cuando haya iniciado sesión
        res.render("app/home");
    }
)

//CRUD: Crear, Leer, Actualizar y eliminar en ingles
//ARQUITECTURA REST => lo importante son los recursos no las url`s, las acciones no estan definidas por las urls sino por el metodo http que las accesa
//ya hemos usado post(crea) y get(solicita y muestra), vamos a usar put(actualiza) y delete(borra)
//particularidad del router de express => separa los métodos y las acciones / - - - / del recurso que estamos tratando de modificar
//Recursos:

//2 metodos o direcciones que nos van a ayudar, A y B
//A-Cargar imagen
//router.get("/new",function(req,res){//crear, mostrar el formulario de imagenes
router.get("/imagenes/new",function(req,res){//crear, mostrar el formulario de imagenes
    res.render("app/imagenes/new");
    //res.render("new");
});

//B-Editar imagen
router.get("/imagenes/:id/edit",function(req,res){//trae el formulario de imagen ya existente para editarla

});

//C-Imagen individual
router.route("/imagenes/:id")//Anidamos o concatenamos una serie de acciones que se aplican al recurso, ej get
.get(function(req,res){//solicita y muestra

})
.put(function(req,res){//actualiza
    
})
.delete(function(req,res){//Borra
    
});

//D-Colección de imagenes
router.route("/imagenes")//Anidamos o concatenamos una serie de acciones que se aplican al recurso, ej get
.get(function(req,res){//solicita y muestra

})
.post(function(req,res){//Crea
    
});

//carpeta views/app/imagenes => todas las rutas relativas a las imagenes

module.exports = router;