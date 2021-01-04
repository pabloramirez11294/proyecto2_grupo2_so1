var socket = io.connect("http://localhost:8080", { 'forceNew': true });
var datosTabla = [];
$( document ).ready(function() {    
    $('#table_id').DataTable( {
        data: datosTabla
    } );
});

function refrescar(){
    console.log("[CLIENTE] ----------------------- refrescando");
    socket.emit('refrescar');
}

socket.on('mensajeFerras', function (data) {
    console.log("[CLIENTE] - data ----------------------------------");
    console.log(data.arrayDatos);    
    var datatable = $('#table_id').DataTable();
    datatable.clear();
    datatable.rows.add(data.arrayDatos);
    datatable.draw();
});

socket.on('mensajeFerras2', function (data) {
    console.log(data);

    console.log(data);
});