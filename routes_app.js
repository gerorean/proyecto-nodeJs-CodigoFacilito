//Solicitud de librerias:
var express = require("express");

var router = express.Router();//Objeto router

// app.com/app/ => el / de router.get es relativo:
router.get("/",//path
    function(req,res){//pasamos el handler, administra cuando se entre a esa ruta
        //aquí hay que buscar el usuario cuando haya iniciado sesión
        res.render("app/home");
    }
 )

module.exports = router;