//var socket = io.connect("http://server-fe-l2tqarxxoq-uc.a.run.app", { 'force new connection': true });
var socket = io('http://server-fe-l2tqarxxoq-uc.a.run.app', { 'force new connection': true }, { transports: ['polling'] });


var top1nombre = "Nombre top 1";
var top1Cantidad = "0";

var top2nombre = "Nombre top 2";
var top2Cantidad = "0";

var top3nombre = "Nombre top 3";
var top3Cantidad = "0";


var auxtop1nombre = "Nombre top 1";
var auxtop1Cantidad = "0";

var auxtop2nombre = "Nombre top 2";
var auxtop2Cantidad = "0";

var auxtop3nombre = "Nombre top 3";
var auxtop3Cantidad = "0";



var contadorGlobal = 0;
var datosTabla = [];

var myArrayLabel = ["Direct", "Referral", "Social", "Test"];
var myArrayData = [55, 30, 15, 5];

var flagUpdate = 0; //0:NO, 1:SI

$(document).ready(function () {
    $('#table_id').DataTable({
        data: datosTabla
    });

    const interval = setInterval(function () {
        refrescar();
    }, 3000);


});

const refreshList = document.getElementById('btn-refresh-list');
refreshList.addEventListener('click', function (e) {
    refrescar();
});

const refreshInfected = document.getElementById('btn-refresh-infected');
refreshInfected.addEventListener('click', function (e) {
    socket.emit('obtenerTop');
});



function refrescar() {
    //console.log("[CLIENTE] ----------------------- refrescando");
    socket.emit('refrescar');
}

socket.on('mensaje1', function (data) {
    if (data != null) {
        var datatable = $('#table_id').DataTable();
        var contadorTabla = datatable.rows().count();
        if (contadorGlobal != contadorTabla) {
            //console.log("[CLIENTE] - data ----------------------------------");
            //console.log(data.arrayDatos);
            var datatable = $('#table_id').DataTable();
            datatable.clear();
            datatable.rows.add(data.arrayDatos);
            datatable.draw();
            flagUpdate = 1; //SI
        }

        if(auxtop1nombre != top1nombre || auxtop2nombre != top2nombre || auxtop3nombre != top3nombre
            || auxtop1Cantidad != top1Cantidad || auxtop2Cantidad != top2Cantidad || auxtop3Cantidad != top3Cantidad){

                top1nombre = auxtop1nombre;
                top1Cantidad = auxtop1Cantidad;
                top2nombre = auxtop2nombre;
                top2Cantidad = auxtop2Cantidad;
                top3nombre = auxtop3nombre;
                top3Cantidad = auxtop3Cantidad;
                
                //console.log("Cambiando: " + auxtop1nombre + " a: " + top1nombre);
                //console.log("Cambiando: " + auxtop1Cantidad + " a: " + top1Cantidad);

                $('#top1_text').text("1. " + top1nombre);
                $('#top1_value').text("--------> " + top1Cantidad);

                //console.log("Cambiando: " + auxtop2nombre + " a: " + top2nombre);
                //console.log("Cambiando: " + auxtop2Cantidad + " a: " + top2Cantidad);

                $('#top2_text').text("2. " + top2nombre);
                $('#top2_value').text("--------> " + top2Cantidad);

                //console.log("Cambiando: " + auxtop3nombre + " a: " + top3nombre);
                //console.log("Cambiando: " + auxtop3Cantidad + " a: " + top3Cantidad);

                $('#top3_text').text("3. " + top3nombre);
                $('#top3_value').text("--------> " + top3Cantidad);
        }

    }
    else {
        refrescar();
    }
});

socket.on('contador', function (data) {
    contadorGlobal = data;
    var datatable = $('#table_id').DataTable();
    //console.log("datatable: " + datatable.rows().count() + " contadorGlobal: " + contadorGlobal);
});

socket.on('respuestaTop', function (data) {    
    if(data.arrayTop.length == 3){
        arrayaux = [];
        
        arrayaux = data.arrayTop[0];
        //console.log(arrayaux);
        auxtop1nombre = arrayaux [0];
        auxtop1Cantidad = arrayaux [1];

        arrayaux = data.arrayTop[1];
        //console.log(arrayaux);
        auxtop2nombre = arrayaux [0];
        auxtop2Cantidad = arrayaux [1];

        arrayaux = data.arrayTop[2];
        //console.log(arrayaux);
        auxtop3nombre = arrayaux [0];
        auxtop3Cantidad = arrayaux [1];

        //console.log(data.arrayTop);
    }
});

var datosAntiguos;
var datosNuevos;

socket.on('responseGroupAllInfected', function (data) {
    if(flagUpdate === 1){
        removeDataSet();
        addDataSet(); 
        data.arrayAllGroup.forEach(element => {
            console.log(element);   
            addData(element[0], element[1]);        
        });
    flagUpdate = 0;   
    }    
});


var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
var effectColors = {
	highlight: 'rgba(255, 255, 255, 0.75)',
	shadow: 'rgba(0, 0, 0, 0.5)',
	glow: 'rgb(255, 255, 0)'	
};

function randomScalingFactor() {
	return Math.round(Math.random() * 100);
}

var color = Chart.helpers.color;
var config = {
	type: 'doughnut',
	data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [{
			data: [0, 0, 0, 0, 0].map(function() {
				return randomScalingFactor();
			}),
			backgroundColor: [
				window.chartColors.red,
				window.chartColors.orange,
				window.chartColors.yellow,
				window.chartColors.green,
				window.chartColors.blue,
			],
			shadowOffsetX: 3,
			shadowOffsetY: 3,
			shadowBlur: 10,
			shadowColor: effectColors.shadow,
			bevelWidth: 2,
			bevelHighlightColor: effectColors.highlight,
			bevelShadowColor: effectColors.shadow,
			hoverInnerGlowWidth: 20,
			hoverInnerGlowColor: effectColors.glow,
			hoverOuterGlowWidth: 20,
			hoverOuterGlowColor: effectColors.glow
		}],
		labels: [
			'Red',
			'Orange',
			'Yellow',
			'Green',
			'Blue'
		]
	},
	options: {
		title: {
			display: true,
			text: 'Infectados por location'
		},
		tooltips: {
			shadowOffsetX: 3,
			shadowOffsetY: 3,
			shadowBlur: 10,
			shadowColor: effectColors.shadow,
			bevelWidth: 2,
			bevelHighlightColor: effectColors.highlight,
			bevelShadowColor: effectColors.shadow
		},
		animation: {
			animateScale: true,
			animateRotate: true
		},
		layout: {
			padding: {
				bottom: 10
			}
		}
	}
};

window.onload = function() {
	var ctx = document.getElementById('myChart').getContext('2d');
	window.myChart = new Chart(ctx, config);
};


var colorNames = Object.keys(chartColors);

function addDataSet(){
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
	var newColor = chartColors[colorName];
	var newDataset = {
		data: [],
		backgroundColor: [],
		shadowOffsetX: 3,
		shadowOffsetY: 3,
		shadowBlur: 10,
		shadowColor: effectColors.shadow,
		bevelWidth: 2,
		bevelHighlightColor: effectColors.highlight,
		bevelShadowColor: effectColors.shadow,
		hoverInnerGlowWidth: 20,
		hoverInnerGlowColor: effectColors.glow,
		hoverOuterGlowWidth: 20,
		hoverOuterGlowColor: effectColors.glow
	};

	for (var index = 0; index < config.data.labels.length; ++index) {
		newDataset.data.push(randomScalingFactor());

		var colorName = colorNames[index % colorNames.length];
        var newColor = window.chartColors[colorName];
        console.log("newColor: " + newColor);
		newDataset.backgroundColor.push(newColor);
	}

	config.data.datasets.push(newDataset);
	window.myChart.update();
}



function removeDataSet(){    
    var size = config.data.datasets[0].data.length;
    for(var i=0; i<size; i++){
        removeData();
    }
    config.data.datasets.pop();
	window.myChart.update();
}


function addData(label, data){
    if (config.data.datasets.length > 0) {
		var colorName = colorNames[config.data.datasets[0].data.length % colorNames.length];
		var newColor = window.chartColors[colorName];

		config.data.labels.push(label);

		config.data.datasets.forEach(function(dataset) {
			dataset.data.push(data);
			dataset.backgroundColor.push(newColor);
		});

		window.myChart.update();
	}
}




function removeData(){
    config.data.labels.splice(-1, 1); // remove the label first

	config.data.datasets.forEach(function(dataset) {
		dataset.data.pop();
		dataset.backgroundColor.pop();
	});

	window.myChart.update();
}







