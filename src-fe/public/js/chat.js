"use strict";

const _SOCKET = io();

let contador = 0;
                                                        

const _utils = {
    crearHTML: ((name, location, age, infectedType, state) => {
        return `<tr role="row" class="odd">
        <td class="sorting_1">${name}</td>
        <td>${location}</td>
        <td>${age}</td>
        <td>${infectedType}</td>
        <td>${state}</td>
    </tr>`;
    })
}

const chat = (() => {
    const _elementos = {
        mensajes: $("#listaMensajes"),
        escribiendo: $("#escribiendo"),
        inputMensaje: $("#mensaje")
    }       
    const _eventos = {  
        cargarMensajes: (() => {
            console.log("cargarMensajes");
            fetch("/chat").then(data => {                
                return data.json();
            }).then(json => {
                json.map(data => {
                    contador = contador + 1;
                    console.log("Nombre: " + data.name + " contador: " + contador);
                    agregarDatos(data.name, data.location, data.age, data.infected_type, data.state);
                });
                //_utils.scroolListaMensajes();
            });
        }) 
    }

    const button = document.getElementById('btn-prueba');
    button.addEventListener('click', function(e) {
        contador = 0;        
        removerDatos();
        _eventos.cargarMensajes();      
        });

    const inicializar = (() => {  
        _eventos.cargarMensajes();       
    });

    return {
        inicializar: inicializar
    }
})();

(() => {
    chat.inicializar();
})();

function removerDatos(){
    console.log("Removiendo");
    var Parent = document.getElementById("dataTable");
    while(Parent.rows.length > 0) {
        Parent.deleteRow(0);
    }
}

function agregarFila(tr){
    var Parent = document.getElementById("dataTable");
    Parent.append(tr)
}


function agregarDatos(name, location, age, infectedType, state){
    console.log("Agregando");
    var Parent = document.getElementById("dataTable");
    var count = $('#dataTable tr').length;
    if (contador == 1){
        var row = Parent.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = "<b> Name";
        cell2.innerHTML = "<b> Location";
        cell3.innerHTML = "<b> Age";
        cell4.innerHTML = "<b> Infected Type";
        cell5.innerHTML = "<b> State";
    }    
    var row = Parent.insertRow(contador);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    cell1.innerHTML = name;
    cell2.innerHTML = location;
    cell3.innerHTML = age;
    cell4.innerHTML = infectedType;
    cell5.innerHTML = state;
}