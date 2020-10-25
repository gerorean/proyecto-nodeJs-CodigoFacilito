//agrega algo al package.json como una dependencia más => --save
//npm init
//npm install express --save        =>4.13.3 instalar un servidor
//npm install jade --save           =>1.11.0 motor de vistas
//https://getbootstrap.com/
//npm install body-parser --save    =>1.14.2 leer parametros que vienen en el cuerpo de la petición

//Solicitud de librerias:
var express = require ("express");
var bodyParser = require("body-parser");

//Importamos objetos:
var app = express();


//Middleware:
//Ej ruta midominio.com/estatico/:
app.use("/public",express.static('public'));//Sirve archivos estaticos, en la ruta especifica
app.use("/public",express.static('assets'));//Sirve archivos estaticos, en la ruta especifica
//leer o hacer parsing, leer los archivos de la petición, buscar los archivos o parametros dentro de los datos, de una petición JSON, etc. y extraerlos:
app.use(bodyParser.json());//para peticiones application/json
app.use(bodyParser.urlencoded({extended:true}));//para peticiones url, extended => define el algoritmo con que va a hacer parsing la librería

//Configuración:
app.set("view engine","jade");//Motor de vistas

//Métodos HTTP: ARQUITECTURA REST(GET,POST,PUT,DELETE)
app.get("/",function(req,res){
    //Respuesta
    console.log("solicitud get / enviada");
    //res.send("Hola mundo");
    //res.render("index",{hola:"Hola Rodrigo"});//Renderiza el archivo jade, como segundo parametro podemos enviarle variables con un hash o JSON de opciones
    res.render("index");//Renderiza el archivo jade
})

app.get("/login",function(req,res){
    console.log("solicitud get /login enviada");
    //Respuesta
    res.render("login");//Renderiza el archivo jade
})


app.post("/users", function(req,res){
    console.log("solicitud post /users enviada");
    console.log("req.body=",req.body);//objeto con los parametros de la peticion
    console.log("contraseña=",req.body.password);//lo toma de views/login.jade => name="email"
    console.log("Email=",req.body.email);//lo toma de views/login.jade => name="password"
    //Respuesta
    res.send("Recibimos tus datos");
})
/*
app.get("/login/:nombre",function(req,res){
    //Respuesta
    console.log("solicitud algo/: enviada");
    console.log(req.params.nombre);//Muestra por consola el id enviado en la petición
    res.render("form",{nombre:req.params.nombre});//Renderiza el archivo jade
})

app.post("/",function(req,res){
    //Respuesta
    console.log("solicitud enviada");
    //res.send("Hola mundo");
    //res.render("index",{hola:"Hola Rodrigo"});//Renderiza el archivo jade, como segundo parametro podemos enviarle variables con un hash o JSON de opciones
    res.render("form");//Renderiza el archivo jade
})
*/
app.listen(3000);//Escucha por el puerto