var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
var arrayDatos = [];
var arrayTop = [];
var arrayAllGroup = [];

contador = 0;
contadorConsulta = 0;

app.use(express.static("public"))
app.use(bodyParser.json());

const infectadosRuta = require("./routes/allInfected");
const countInfectadosRuta = require("./routes/countInfected");
const groupInfectados = require("./routes/group");
const todosInfectados = require("./routes/groupAllInfected");

app.get('/', function (req, res) {
    res.status(200).send("Hola Mundo");
});

app.use("/allInfected", infectadosRuta);
app.use("/countInfected", countInfectadosRuta);
app.use("/groupInfectados", groupInfectados);
app.use("/groupAllInfected", todosInfectados);

io.on('connection', function (socket) {
    console.log("--- Server: Conexion servidor Sockets");
    console.log("--- Server: Obteniendo datos de mongodb");


    const interval = setInterval(function () {
        cantidadInfectados(socket);
        contadorInfectados(socket);
        topInfectados(socket);

        if(contador != contadorConsulta){
            groupAllInfected(socket);
        }

    }, 3000);


    socket.on('refrescar', function (socket) {
        console.log("--- Server: Refrescanndo");
        contador = 0;
    });

    socket.on('obtenerTop', function (socket) {
        topInfectados(socket);
    });

    socket.on('obtenerGrafica', function (socket) {
        groupAllInfected(socket);
    });


});




function consultaTodosInfectados(socket, cantidadInfectados) {
    console.log("--- Server: [consultaTodosInfectados] - Cantidad de documentos en la base de datos de mongodb " + cantidadInfectados);
    fetch("http://server-fe-l2tqarxxoq-uc.a.run.app/allInfected").then(data => {
        //console.log(data);    
        return data.json();
    }).then(json => {
        json.map(data => {
            var Datos = [];
            Datos.push(data.name, data.location, data.age, data.infected_type, data.state);
            arrayDatos.push(Datos);            
            //console.log("Nombre: " + data.name + " contador: " + contador);
        });
        socket.emit('mensaje1', { arrayDatos });
        //groupAllInfected(socket);
        contador = cantidadInfectados;
        arrayDatos = [];
    });
}

function cantidadInfectados(socket) {
    const fetchPromise = fetch("http://server-fe-l2tqarxxoq-uc.a.run.app/countInfected");
    fetchPromise.then(response => {
        return response.json();
    }).then(infectados => {
        //console.log(infectados.cantidad);
        console.log("--- Server: [cantidadInfectados] - Cantidad de documentos en la base de datos de mongodb " + infectados.cantidad);
        console.log("contador " + contador + " infectados.cantidad " + infectados.cantidad);
        contadorConsulta = infectados.cantidad;
        if (contador != infectados.cantidad) {
            consultaTodosInfectados(socket, infectados.cantidad);
            
        }
    });
}


function contadorInfectados(socket) {
    const fetchPromise = fetch("http://server-fe-l2tqarxxoq-uc.a.run.app/countInfected");
    fetchPromise.then(response => {
        return response.json();
    }).then(infectados => {
        socket.emit("contador", infectados.cantidad);
        console.log("--- Server: [contadorInfectados] - " + infectados.cantidad);
    });
}



function topInfectados(socket) {
    const fetchPromise = fetch("http://server-fe-l2tqarxxoq-uc.a.run.app/groupInfectados");
    fetchPromise.then(response => {
        return response.json();
    }).then(json => {
        json.map(datosInfectados => {
            var DatosInfectados = [];            
            DatosInfectados.push(datosInfectados._id, datosInfectados.status_count);
            arrayTop.push(DatosInfectados);
            //console.log("--- Server: [topInfectados] - " + datosInfectados._id + " " + datosInfectados.status_count);
            socket.emit("respuestaTop", {arrayTop});
        });
        arrayTop = [];
    });
}


function groupAllInfected(socket) {
    const fetchPromise = fetch("http://server-fe-l2tqarxxoq-uc.a.run.app/groupAllInfected");
    fetchPromise.then(response => {
        return response.json();
    }).then(json => {
        json.map(infectadosGroupAll => {
            var DatosGroupAll = [];            
            DatosGroupAll.push(infectadosGroupAll._id, infectadosGroupAll.status_count);
            arrayAllGroup.push(DatosGroupAll);            
        });
        socket.emit("responseGroupAllInfected", {arrayAllGroup});
        arrayAllGroup = [];
    });
}

server.listen(8080, function () {
    console.log("Servidor corriendo en http://server-fe-l2tqarxxoq-uc.a.run.app");
});