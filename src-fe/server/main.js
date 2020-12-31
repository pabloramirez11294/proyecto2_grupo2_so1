var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
var arrayDatos = [];

contador = 0;

app.use(express.static("public"))
app.use(bodyParser.json());

const infectadosRuta = require("./routes/allInfected");
const countInfectadosRuta = require("./routes/countInfected");


app.get('/', function (req, res) {
    res.status(200).send("Hola Mundo");
});

app.use("/allInfected", infectadosRuta);
app.use("/countInfected", countInfectadosRuta);


io.on('connection', function (socket) {
    console.log("--- Server: Conexion servidor Sockets");
    console.log("--- Server: Obteniendo datos de mongodb");
        
    
    const interval = setInterval(function() {
        cantidadInfectados(socket); 
       
      }, 1000);


    /*for (i = 0; i < 10; i++) {
        socket.emit('mensajeFerras', {
            text: "MENSAJE 1"
        });
    }*/

    socket.on('refrescar', function (socket){
        console.log("--- Server: Refrescanndo");        
        contador = 0;
    });

});




function consultaTodosInfectados(socket, cantidadInfectados) {
    console.log("--- Server: [consultaTodosInfectados] - Cantidad de documentos en la base de datos de mongodb " + cantidadInfectados);
    fetch("http://localhost:8080/allInfected").then(data => {
        //console.log(data);    
        return data.json();
    }).then(json => {
        json.map(data => {       
            var Datos = [];
            Datos.push(data.name, data.location, data.age, data.infected_type, data.state);
            arrayDatos.push(Datos);

            socket.emit('mensajeFerras', { arrayDatos });
            //console.log("Nombre: " + data.name + " contador: " + contador);
        });
    contador = cantidadInfectados;
    arrayDatos = [];
    });
}

function cantidadInfectados(socket) {
    const fetchPromise = fetch ("http://localhost:8080/countInfected");
    fetchPromise.then (response => { 
        return response.json (); 
      }). then (infectados => { 
        //console.log(infectados.cantidad);
        console.log("--- Server: [cantidadInfectados] - Cantidad de documentos en la base de datos de mongodb " + infectados.cantidad); 
        console.log("contador " + contador + " infectados.cantidad " + infectados.cantidad); 
        if(contador != infectados.cantidad){
            consultaTodosInfectados(socket, infectados.cantidad);
        }        
      });
}


server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
});