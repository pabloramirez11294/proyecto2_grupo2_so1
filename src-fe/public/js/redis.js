var persona1Aux = "";
var persona2Aux = "";
var persona3Aux = "";
var persona4Aux = "";
var persona5Aux = "";

var barra1 = 0;
var barra2 = 0;
var barra3 = 0;
var barra4 = 0;
var barra5 = 0;
var barra6 = 0;
var barra7 = 0;
var barra8 = 0;
var barra9 = 0;
var barra10 = 0;


var flagCambio = 0; //0: NO, 1:SI




$(document).ready(function () {
	setInterval(function () { getTop5(); }, 10000);
	setInterval(function () { getBar(); }, 10000);

});

function getTop5() {
	flagCambio = 0; //INICIO SIN CAMBIOS
	var url1 = "https://us-central1-sopes1-proy2.cloudfunctions.net/Persona1";
	var url2 = "https://us-central1-sopes1-proy2.cloudfunctions.net/Persona2";
	var url3 = "https://us-central1-sopes1-proy2.cloudfunctions.net/Persona3";
	var url4 = "https://us-central1-sopes1-proy2.cloudfunctions.net/Persona4";
	var url5 = "https://us-central1-sopes1-proy2.cloudfunctions.net/Persona5";
	peticionPersona1(url1, 1);
	peticionPersona1(url2, 2);
	peticionPersona1(url3, 3);
	peticionPersona1(url4, 4);
	peticionPersona1(url5, 5);

	try {
		var datatable = $('#table_id_redis').DataTable();
		datatable.clear();
		//$('#redis1_text').text("1. Name: " + persona1Aux[0].name + " | Location: " + persona1Aux[0].location + " | Age: " + persona1Aux[0].age + " | Infected Type: " + persona1Aux[0].infected_type + " | State: " + persona1Aux[0].state);
		datatable.row.add([persona1Aux[0].name, persona1Aux[0].location, persona1Aux[0].age, persona1Aux[0].infected_type,persona1Aux[0].state]).draw(false);
		//$('#redis2_text').text("2. Name: " + persona2Aux[0].name + " | Location: " + persona2Aux[0].location + " | Age: " + persona2Aux[0].age + " | Infected Type: " + persona2Aux[0].infected_type + " | State: " + persona2Aux[0].state);
		datatable.row.add([persona2Aux[0].name, persona2Aux[0].location, persona2Aux[0].age, persona2Aux[0].infected_type,persona2Aux[0].state]).draw(false);
		//$('#redis3_text').text("3. Name: " + persona3Aux[0].name + " | Location: " + persona3Aux[0].location + " | Age: " + persona3Aux[0].age + " | Infected Type: " + persona3Aux[0].infected_type + " | State: " + persona3Aux[0].state);
		datatable.row.add([persona3Aux[0].name, persona3Aux[0].location, persona3Aux[0].age, persona3Aux[0].infected_type,persona3Aux[0].state]).draw(false);
		//$('#redis4_text').text("4. Name: " + persona4Aux[0].name + " | Location: " + persona4Aux[0].location + " | Age: " + persona4Aux[0].age + " | Infected Type: " + persona4Aux[0].infected_type + " | State: " + persona4Aux[0].state);
		datatable.row.add([persona4Aux[0].name, persona4Aux[0].location, persona4Aux[0].age, persona4Aux[0].infected_type,persona4Aux[0].state]).draw(false);
		//$('#redis5_text').text("5. Name: " + persona5Aux[0].name + " | Location: " + persona5Aux[0].location + " | Age: " + persona5Aux[0].age + " | Infected Type: " + persona5Aux[0].infected_type + " | State: " + persona5Aux[0].state);	
		datatable.row.add([persona5Aux[0].name, persona5Aux[0].location, persona5Aux[0].age, persona5Aux[0].infected_type,persona5Aux[0].state]).draw(false);
	} catch {

	}
}

function getBar() {
	
	var bar1 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont1";
	var bar2 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont2";
	var bar3 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont3";
	var bar4 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont4";
	var bar5 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont5";
	var bar6 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont6";
	var bar7 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont7";
	var bar8 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont8";
	var bar9 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont9";
	var bar10 = "https://us-central1-sopes1-proy2.cloudfunctions.net/cont10";

	peticionBar(bar1, 1);
	peticionBar(bar2, 2);
	peticionBar(bar3, 3);
	peticionBar(bar4, 4);
	peticionBar(bar5, 5);
	peticionBar(bar6, 6);
	peticionBar(bar7, 7);
	peticionBar(bar8, 8);
	peticionBar(bar9, 9);
	peticionBar(bar10, 10);

	try {
		removeDataBar();
		addDataBar("0-9", parseInt(barra1));
		addDataBar("10-19", parseInt(barra2));
		addDataBar("20-29", parseInt(barra3));
		addDataBar("30-39", parseInt(barra4));
		addDataBar("40-49", parseInt(barra5));
		addDataBar("50-59", parseInt(barra6));
		addDataBar("60-69", parseInt(barra7));
		addDataBar("70-79", parseInt(barra8));
		addDataBar("80-89", parseInt(barra9));
		addDataBar("90-100", parseInt(barra10));	
	} catch {

	}


}

function peticionPersona1(url, numeroPersona) {
	makeRequest('GET', url)
		.then(function (datums) {
			//var jsonPersona = JSON.parse(datums);
			var jsonPersona = JSON.parse(datums);
			switch (numeroPersona) {
				case 1:
					persona1Aux = jsonPersona;
					break;
				case 2:
					persona2Aux = jsonPersona;
					break;
				case 3:
					persona3Aux = jsonPersona;
					break;
				case 4:
					persona4Aux = jsonPersona;
					break;
				case 5:
					persona5Aux = jsonPersona;
					break;
				default:
					console.log("Error en el switch");
					break;
			}
		})
		.catch(function (err) {
			console.error('Augh, there was an error!', err.statusText);
		});
}


function peticionBar(url, numeroPersona) {
	makeRequest('GET', url)
		.then(function (datums) {
			//var jsonPersona = JSON.parse(datums);
			var jsonPersona = JSON.parse(datums);
			//console.log(jsonPersona);
			switch (numeroPersona) {
				case 1:
					barra1 = jsonPersona[0].contador;
					break;
				case 2:
					barra2 = jsonPersona[0].contador;
					break;
				case 3:
					barra3 = jsonPersona[0].contador;
					break;
				case 4:
					barra4 = jsonPersona[0].contador;
					break;
				case 5:
					barra5 = jsonPersona[0].contador;
					break;
				case 6:
					barra6 = jsonPersona[0].contador;
					break;
				case 7:
					barra7 = jsonPersona[0].contador;
					break;
				case 8:
					barra8 = jsonPersona[0].contador;
					break;
				case 9:
					barra9 = jsonPersona[0].contador;
					break;
				case 10:
					barra10 = jsonPersona[0].contador;
					break;
				default:
					console.log("Error en el switch");
					break;
			}
		})
		.catch(function (err) {
			console.error('Augh, there was an error!', err.statusText);
		});
}


function makeRequest(method, url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send();
	});
}



/// BARRA

// used for example purposes
function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // create initial empty chart
  var ctx_live = document.getElementById("mycanvas");
  var myChartBar = new Chart(ctx_live, {
	type: 'bar',
	data: {
	  labels: [],
	  datasets: [{
		data: [],
		borderWidth: 1,
		borderColor:'#00c0ef',
		label: 'infectados',
	  }]
	},
	options: {
	  responsive: true,
	  title: {
		display: true,
		text: "Redis - Infectados por rango de edad",
	  },
	  legend: {
		display: false
	  },
	  scales: {
		yAxes: [{
		  ticks: {
			beginAtZero: true,
		  }
		}]
	  }
	}
  });


function addDataBar(etiqueta, cantidad){
    myChartBar.data.labels.push(etiqueta);
	myChartBar.data.datasets[0].data.push(cantidad);
    myChartBar.update();
}

function removeDataBar(){
	var size = myChartBar.data.datasets[0].data.length;
	for(var i=0; i<size; i++){
		myChartBar.data.labels.splice(-1, 1); // remove the label first
		myChartBar.data.datasets.forEach(function(dataset) {
			dataset.data.pop();
		});
	 }
	 myChartBar.update();
}