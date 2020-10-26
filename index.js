//agrega algo al package.json como una dependencia más => --save, ejemplo: npm install mongodb@3.0.10 --save, lo que va luego del @ es la version que se requiere
//npm init
//npm install express --save        =>4.13.3 instalar un servidor
//npm install jade --save           =>1.11.0 motor de vistas
//https://getbootstrap.com/
//npm install body-parser --save    =>1.14.2 leer parametros que vienen en el cuerpo de la petición
//https://www.mongodb.com
//mongo --version                   =>3.0.0 Base de datos no SQL no relacional
//npm install mongoose --save       =>4.3.6 Modelado de objetos en node.Js, busca la parte de las consultas mediante un api, mapea una clase que es un modelo con una tabla
//mongod    =>ejecutar el servidor con mongo
//ªcd <carpetaMongodb>
//ªmongod --dbpath=data --bind_ip 127.0.0.1


//Solicitud de librerias:
var express = require ("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;

//Objetos:
var app = express();

//Configuración:
app.set("view engine","jade");//Motor de vistas tipo..


//MIDDLEWARES:
//..de archivos estaticos => Sirve archivos estaticos, en la ruta especifica; Ej ruta midominio.com/public/:
app.use("/public",express.static('public'));
app.use("/public",express.static('assets'));

//.. de parsing => leer los archivos de la petición, buscar los archivos o parametros dentro de los datos, de una petición JSON, etc. y extraerlos:
app.use(bodyParser.json());//para peticiones application/json
app.use(bodyParser.urlencoded({extended:true}));//para peticiones url, extended => define el algoritmo con que va a hacer parsing la librería

//Métodos HTTP: ARQUITECTURA REST(GET,POST,PUT,DELETE)
app.get("/",function(req,res){
    //Respuesta
    console.log("solicitud get / enviada");
    //res.send("Hola mundo");
    //res.render("index",{hola:"Hola Rodrigo"});//Renderiza el archivo jade, como segundo parametro podemos enviarle variables con un hash o JSON de opciones
    res.render("index");//Renderiza el archivo jade
})

app.get("/login",function(req,res){

    //Encontrar todos los usuarios, doc => muestra el resultado de la consulta si err => NO es null, si err trae algún dato es porque hubo algún error
    //Método API de mongoose: find
    User.find(function(err,doc){
        console.log("solicitud get /login enviada");
        console.log("\n\n *** doc=",doc);
        res.render("login");//Renderiza el archivo jade
    })
    console.log("solicitud get /login enviada ___");
    //Respuesta
    //res.render("login");//Renderiza el archivo jade
})


app.post("/users", function(req,res){
    console.log("solicitud post /users enviada");
    console.log("req.body=",req.body);//objeto con los parametros de la peticion
    console.log("contraseña=",req.body.password);//lo toma de views/login.jade => name="email"
    console.log("Email=",req.body.email);//lo toma de views/login.jade => name="password"
    //Usuario nuevo:
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    });//crea un nuevo usuario, lo valida con virtuals
    console.log("***u.p_c=",user.password_confirmation);
    //Guardamos el usuario,requiere de un callback:
    //Método de la API de mongoose: save
    user.save(function(err){//err => mongoose devuelve las validaciones que no pasan a nivel del schema, aquí se reciben los errores de mongoose
        //Callback => Respuesta
        if(err){
            //console.log("***err=",err,"\n\n");
            console.log("***String(err)=",String(err));
        }
        res.send("Guardamos tus datos");
    })
    //Respuesta
    //res.send("Recibimos tus datos");
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