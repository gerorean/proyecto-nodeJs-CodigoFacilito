var User = require("../models/user").User;//importa el modelo del usuario ...Error: Cannot find module './models/user'

//patron de funciónes tipo widdleware: Todos reciben o manejan 3 objetos como parametros, 1ro: req=>solicitud, 2do: res=>respuesta, y 3ro: next=>siguiente widdleware
module.exports = function(req,res,next){
    //validar que tenemos una sesión y tenemos un user_id:
    //Si no tenemos un user_id lo redireccionamos a la ruta que tiene el login:
    if (!req.session.user_id){
        res.redirect("/login");
    }
    //Si tenemos user_id, llamamos al siguiente middleware, no altera el flujo de la petición, redirige al siguiente:
    else{
        User.findById(req.session.user_id,function(err,user){//Callback
            if(err){//Si hubo un error lo imprime
                console.log(err);
                res.redirect("/login");//Si no encontro el usuario => lo redirecciona
            }else{
                var author = "enlore";
                console.log("A***     ***     ***user=",user);
                res.locals = { user: user };//Toma la info del user_id y pasa la info del user al siguiente middleware
                console.log("B***     ***     ***res.locals=",res.locals);
                console.log("C***     ***     ***res.locals.user=",res.locals.user);
                console.log("D***     ***     ***res.locals.user.email=",res.locals.user.email);
                next();
            }
        });//Nos devuelve solo un usuario
        next();
    }
}
