//patron de funciónes tipo widdleware: Todos reciben o manejan 3 objetos como parametros, 1ro: req=>solicitud, 2do: res=>respuesta, y 3ro: next=>siguiente widdleware
module.exports = function(req,res,next){
    //validar que tenemos una sesión y tenemos un user_id:
    //Si no tenemos un user_id lo redireccionamos a la ruta que tiene el login:
    if (!req.session.user_id){
        res.redirect("/login");
    }
    //Si tenemos user_id, llamamos al siguiente middleware, no altera el flujo de la petición, redirige al siguiente:
    else{
        next();
    }
}
