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
});

app.get("/signup",function(req,res){

    //Encontrar todos los usuarios, doc => muestra el resultado de la consulta si err => NO es null, si err trae algún dato es porque hubo algún error
    //Método API de mongoose: find
    User.find(function(err,doc){
        console.log("solicitud get /signup enviada");
        console.log("\n\n *** doc=",doc);
        res.render("signup");//Renderiza el archivo jade
    })
    console.log("solicitud get /login enviada ___");
    //Respuesta
    //res.render("login");//Renderiza el archivo jade
});

app.get("/login",function(req,res){

    //Encontrar todos los usuarios, doc => muestra el resultado de la consulta si err => NO es null, si err trae algún dato es porque hubo algún error
    //Método API de mongoose: find
    //User.find(function(err,doc){
        console.log("solicitud get /login enviada");
        //console.log("\n\n *** doc=",doc);
        res.render("login");//Renderiza el archivo jade
    //})
    console.log("solicitud get /login enviada ___");
    //Respuesta
    //res.render("login");//Renderiza el archivo jade
});


app.post("/users", function(req,res){
    console.log("solicitud post /users enviada");
    console.log("req.body=",req.body);//objeto con los parametros de la peticion
    console.log("contraseña=",req.body.password);//lo toma de views/login.jade => name="email"
    console.log("Email=",req.body.email);//lo toma de views/login.jade => name="password"
    
    //Campos usuario nuevo:
    //El documento inicia como una instancia del objeto, en esta caso de clase tipo: User: recibe como parametro un objeto JSON con todos los atributos que va a tener el documento, pueden venir del schema o virtuales
    //Este objeto esta en la memoría dinamica, no esta persistente, no esta guardado..
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
        
        //SOLUCION ERROR: => String(err)= ValidationError: username: Path `username` is required.
        username: req.body.username

    });//crea un nuevo usuario, lo valida con virtuals
    console.log("***u.p_c=",user.password_confirmation);


    //Guardamos el usuario, requiere de un callback como parametro:
    //Método GUARDAR de la API de mongoose: save, SOBRE UN DOCUMENTO QUE YA EXISTE EN LA COLECCION DE MONGODB, ACTUALIZA LOS PARAMETROS QUE SE HAYAN MODIFICADO A LA INSTANCIA DEL OBJETO, LE ASIGNA UN IDENTIFICADOR _id
    //A-> pasos para guardar: 1ro, tener un modelo definido en la parte de los schemas 
    /*user.save(function(err, user, numero){//PARAMETROS: err => mongoose devuelve las validaciones que no pasan a nivel del schema, aquí se reciben los errores de mongoose; user => el documento que se creo, incluye el _id; numero => número de filas afectadas en mongodb, en este caso va a ser 1
        //Callback, se ejecuta despues de que mongoose intenta guardar el objeto en la base de datos => Respuesta
        if(err){
            //console.log("***err=",err,"\n\n");
            console.log("***String(err)=",String(err));
        }
        res.send("Guardamos tus datos");
    })*/
    //B-> OTRA FORMA DE ESCRIBIR EL METODO SAVE => promises en vez de Callbacks y funciones asincronas, en vez de recibir un CallBack retorna una promesa:
    user.save()//El query retorna una promesa y ejecuta el metodo then()
    .then(function(use){//then => como primer parametro recibe una función que hace cualquier cosa despues del guardado y..
        res.send("Guardamos tus datos de usuario excitosamente");
    },function(err){//como segundo parametro una función para manejar los errores..
        if(err){
            console.log("***String(err)=",String(err));
        }
        res.send("No pudimos guardar la imformación");
    });
    
    //Respuesta
    //res.send("Recibimos tus datos");
});


app.post("/sessions", function(req,res){
    /*
    console.log("solicitud post /sessions enviada");
    console.log("req.body=",req.body);//objeto con los parametros de la peticion
    console.log("contraseña=",req.body.password);//lo toma de views/login.jade => name="email"
    console.log("Email=",req.body.email);//lo toma de views/login.jade => name="password"
    */

    //FINDERS => como encontrar documentos en nuestra base de datos en mongodb.. pasos: 1ro, tener un modelo ej => User, luego find (Devuelve una colección, o un arreglo de documentos que cumplen la condición) 
    //A->
    /*User.find({
        email:req.body.email,
        password:req.body.password
    }//"username email",
    ,function(err,docs){
        console.log('***docs=',docs);
        res.send("Hola mundo");
    });//1er parametro: {query}, 2do parametro: "fields o camposQueQueremos", 3er parametro: Callback(error,documentosEncontrados)
    */
    
    //B-> .findOne igual que .find pero solo trae un documento
    User.findOne({
        email:req.body.email,
        password:req.body.password
    }//"username email",
    ,function(err,docs){
        console.log('***docs=',docs);
        res.send("Hola mundo");
    });//1er parametro: {query}, 2do parametro: "fields o camposQueQueremos", 3er parametro: Callback(error,documentosEncontrados)
    
    /*
    //C-> .findById igual que .findOne pero con el id
    User.findById("5f95d1078326200f973491c2"//"_id",callback()
    ,function(err,docs){
        console.log('***docs=',docs);
        res.send("Hola mundo");
    });//1er parametro: {query}, 2do parametro: "fields o camposQueQueremos", 3er parametro: Callback(error,documentosEncontrados)
    */
});


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

//GLOSARIO
//un objeto es una instancia de una clase. Esto es, un miembro de una clase que tiene atributos en lugar de variables. En un contexto del mundo real, podríamos pensar en "Casa" como una clase y en un chalet como una instancia
//query -> consulta con condición