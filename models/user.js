/*TIPOS DE DATOS EN UN SCHEMA:
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
*/

//[Colección] de {Usuarios}:

//Solicitud de librerias:
var mongoose = require('mongoose');

//Objetos:
var Schema = mongoose.Schema;//Atributo que mapea, retorna un objeto que es el schema, constructor para generar schemas

//Configuración:
mongoose.connect("mongodb://localhost/fotos");//Conexión: Espeficifa el servidor nos vamos a conectar / y luego el nombre de nuestra base de datos

//Validación de rangos, va de la mano con enum dentro del Schema, ver sex...
var posibles_valores = ["M","F"];

//Validación de expresiones regulares, va de la mano con match dentro del Schema, ver email...
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email válido"];

//INICIO DE LA CONEXIÓN CON LA BASE DE DATOS: - - - - PARALELO: [Colecciones] => tablas  COMO   {Documentos} => filas  resultado => [{bla}{bla}{bla}...]
//1ro-Schemas => Un esquema corresponde a una colección y definen la forma que van a tener nuestros documentos en la colección de mongo, crean objetos que mongoose entiende con un esquema, son como en la estructura de la tabla
//Todos los esquemas pertenecen a una colección en la base de datos en mongodb
var user_schema = new Schema({
    //estructura JSON que define el documento, pasamos los atributos como claves para cada valor del JSON y como valor pasamos el tipo de dato, ejemplo:
    //las validaciones en mongoose se hacen a nivel del schema, implica required:true a los campos que se van a validar, los errores son asincronos..
    name:String, //{type:String, required:"el nombre es obligatorio"},
    last_name:String,
    username: {type:String,required:true,maxlength:[50,"El Username es muy grande"]},//String,
    password: {type:String,minlength:[8,"El password es muy corto"]},//String,
    age: {type: Number,min:[5,"La edad no puede ser menor de 5"],max:[100,"La edad no puede ser mayor de 100"]} ,//Number,
    email: {type:String, required: "El correo es obligatorio",match:email_match},//String,
    date_of_birth: Date,
    sex: {type:String,enum:{values: posibles_valores, message:"Opción no valida"}}//{type:String,enum:posibles_valores}
});

//virtuals propiedades de un documento que no se guardan en la base de datos pero que si se mantienen en el objeto que extrae mongoose, no se comunican con mongoDB, 
//sirven para establecer atributos de ciertas cosas. ej password-confirmation: confirma que el password este bien escrito, funciona como un validador ([{documentos} = modelos?    colección]) docs? son instancias de una colección que extraemos de la base de datos de mongodb?
//Virtuals: - - validaciones si pasar por la base de datos, usa métodos para acceder y extraer del virtual:
// get-ers: forma como se accede a un atributo
// y set-ers: establece lógica para asignar un valor al atributo
user_schema.virtual("password_confirmation")//(nombreDelVirtual)
.get(function(){
    return this.pas_con;
})
.set(function(password){
    this.pas_con = password;
});

//Otro ejemplo de virtuals:
user_schema.virtual("full_name")//(nombreDelVirtual)
.get(function(){
    return this.name + this.last_name;
})
.set(function(full_name){
    var words = full_name.split(" ");
    this.name = words[0];
    this.last_name = words[1];
});


//2do-Modelos => Son instancias en mongoose que permiten llamar métodos y realizar acciones sobre la base de datos, establecen la conexión con la base de datos, <Objetos-métodos> se les pasa el esquema que quiero que tenga en la tabla a la que va a mapear:
//Model es el constructor que genera los modelos; parametros=>(nombreDelModelo***,esquema), cuando mongoose crea el modelo, el modelo mapea a una colección en la base de datos, equivale como a una tabla
//Pero el nombre que busca de esa colección y le asigna a esa colección en caso de que no exista es el plural de la primera palabra, o parametro ***s ejemplo:
var User = mongoose.model("User",user_schema);
//Colleccion Users => ***s


//Exportamos el modelo
module.exports.User = User;