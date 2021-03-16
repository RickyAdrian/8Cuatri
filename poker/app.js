//Funcion de alerta para mostrar datos! fase 2 liena codigo 150
function Alerta() {
	alert("Genera numeros aleatorios!");
  }

var primos = [2,3,5,7,11,13,17,19,23,29,31,37,
41,43,47,53,59,61,67,71,73,79,83,89,
97,101,103,107,109,113,127,131,137,139,149,151,
157,163,167,173,179,181,191,193,197,199,211,223]
// 227,229,233,239,241,251,257,263,269,271,277,281,
// 283,293,307,311,313,317,331,337,347,349,353,359,
// 367,373,379,383,389,397,401,409,419,421,431,433,
// 439,443,449,457,461,463,467,479,487,491,499,503,
// 509,521,523,541,547,557,563,569,571,577,587,593,
// 599,601,607,613,617,619,631,641,643,647,653,659,
// 661,673,677,683,691,701,709,719,727,733,739,743,
// 751,757,761,769,773,787,797,809,811,821,823,827,
// 829,839,853,857,859,863,877,881,883,887,907,911,
// 919,929,937,941,947,953,967,971,977,983,997];

window.onload=function()
{
	var tabla = document.getElementById("tabla");
	
	document.getElementById("generar").onclick = function (){
		var tlength = tabla.rows.length;		
		if(tlength>1){
			for (var i = tlength - 1; i >= 1; i--) {
				tabla.deleteRow(i);
			}			
		}
		
		var res = parseInt(document.getElementById("semilla").value);
		var mult = parseInt(document.getElementById("multiplicador").value);
		var cons = parseInt(document.getElementById("constante").value);
		var mod = parseInt(document.getElementById("modulo").value);

		var tbody = document.createElement("tbody");
		var tfoot = document.createElement("tfoot");
		var sw = true;

		var celda;
		var txtcelda;
		var hilera;

		var c = 1;
		var v=res;
		var x=0;
		var numAle = [];

		while(sw){
			hilera = document.createElement("tr");
			x = (parseInt(res*mult)+parseInt(cons))%mod;	
			
			celda = document.createElement("td");
            txtcelda = document.createTextNode(c);
            celda.appendChild(txtcelda);
            hilera.appendChild(celda);
            celda = document.createElement("td");
            txtcelda = document.createTextNode(res);
            celda.appendChild(txtcelda);
            hilera.appendChild(celda);
            res = x;
            // console.log(c);
            celda = document.createElement("td");
            txtcelda = document.createTextNode(x);
            celda.appendChild(txtcelda);
            hilera.appendChild(celda);
			// Dato para la fase 2!!
            celda = document.createElement("td");
            txtcelda = document.createTextNode(res/mod);
			numAle.push(res/mod);
            celda.appendChild(txtcelda);				
			hilera.appendChild(celda);

			if (v==x){
					sw=false;
			}
			c++;
			
			tbody.appendChild(hilera);		
		}
		hilera = document.createElement("tr");
		hilera.className="NumRp";
		celda = document.createElement("td");
        txtcelda = document.createTextNode("Número repetido");
        celda.appendChild(txtcelda);
		hilera.appendChild(celda);		
        celda = document.createElement("td");
        txtcelda = document.createTextNode(res);
        celda.appendChild(txtcelda);
        hilera.appendChild(celda);
        res = x;
        celda = document.createElement("td");
        txtcelda = document.createTextNode((parseInt(res*mult)+parseInt(cons))%mod);
        celda.appendChild(txtcelda);
        hilera.appendChild(celda);
        celda = document.createElement("td");
        txtcelda = document.createTextNode((parseInt(res*mult)+parseInt(cons))%mod/mod);
        celda.appendChild(txtcelda);
		hilera.appendChild(celda);
		tfoot.appendChild(hilera);
		tabla.appendChild(tbody);
		tabla.appendChild(tfoot);


		//Fase 2, promedio de datos!
		console.log("Fase 2, promedio de datos!");
		var muestra = numAle.slice(0,30);
		var esperado = 0.5;
		var suma = muestra.reduce((a,b)=> a+b,0)
		var prom = suma/muestra.length;
		var diferencia = prom - esperado;
		var raizN = Math.sqrt(muestra.length);
		var razi1s2 = 0.0833;
		var z_0 = (diferencia * raizN) / razi1s2; 
		console.log("Muestreo de z_0: " +z_0);
		console.log("z_/2: ", 1.96);

		if(z_0 < 1.96){
			txtcelda = document.createTextNode("No se rechaza");
			var item2 = document.getElementById("remplace2").childNodes[0];
			item2.replaceChild(txtcelda, item2.childNodes[0]);
		}else{
			txtcelda = document.createTextNode("Se rechaza");
			var item2 = document.getElementById("remplace2").childNodes[0];
			item2.replaceChild(txtcelda, item2.childNodes[0]);
		}

		
		// Para mostrar promedio de datos!

		

		txtcelda = document.createTextNode(z_0);
		var item1 = document.getElementById("remplace1").childNodes[0];
		item1.replaceChild(txtcelda, item1.childNodes[0]);
		
		// txtcelda = document.createTextNode("No se rechaza");
		// var item2 = document.getElementById("remplace2").childNodes[0];
		// item2.replaceChild(txtcelda, item2.childNodes[0]);
		
		
		//Fase 2 prueba de frecuencias
		var col1 = 0;
		var col2 = 0;
		var col3 = 0;
		var col4 = 0;
		
		for(var i = 0; i < muestra.length; i++){
			if(muestra[i] <= 0.25){ 
				col1++
				// console.log(muestra[i]);
				// console.log("variable 1: "+col1);
			}if(muestra[i] <= 0.50 && muestra[i] >= 0.25){ 
				col2++
				// console.log(muestra[i]);
				// console.log("variable 2: "+col2);
			}if(muestra[i] <= 0.75 && muestra[i] >= 0.50){ 
				col3++
				// console.log(muestra[i]);
				// console.log("variable 3: "+col3);
			}if(muestra[i] <= 1 && muestra[i] >= 0.75){ 
				col4++
				// console.log(muestra[i]);
				// console.log("variable 4: "+col4);
			}
		}
		console.log("-------------------")
		console.log("-------------------")
		console.log("Fase 2 prueba de frecuencias")
		var FE = muestra.length/4;
		console.log("Fe: "+FE); 
		console.log("N: "+muestra.length); 

		console.log("variable 1: "+ col1, "//", "0.25");
		console.log("variable 2: "+ col2, "//", "0.50");
		console.log("variable 3: "+ col3, "//", "0.75");
		console.log("variable 4: "+ col4, "//", "1");

		//Diferencia de FE-FO
		var Diff1 = FE-col1;
		var Diff2 = FE-col2;
		var Diff3 = FE-col3;
		var Diff4 = FE-col4;
		console.log("Diferencia1: "+Diff1)
		console.log("Diferencia2: "+Diff2)
		console.log("Diferencia3: "+Diff3)
		console.log("Diferencia4: "+Diff4)
		//Numeros de las diferencia 1234 elevados ^2
		var difCuadrado1 = Diff1**2;
		var difCuadrado2 = Diff2**2;
		var difCuadrado3 = Diff3**2;
		var difCuadrado4 = Diff4**2;
		console.log("Diferencia1 s2: "+difCuadrado1)
		console.log("Diferencia2 s2: "+difCuadrado2)
		console.log("Diferencia3 s2: "+difCuadrado3)
		console.log("Diferencia4 s2: "+difCuadrado4)
		var list_Cuadrados = [difCuadrado1,difCuadrado2,difCuadrado3,difCuadrado4]
		var suma_Cuadrados = list_Cuadrados.reduce((a,b)=> a+b,0)
		console.log("Suma de variables^2: "+suma_Cuadrados);

		var xs2_0= suma_Cuadrados/muestra.length;
		var rexs2_0053 = 7.81;
		
		
		console.log("x^2_0: "+xs2_0);
		console.log("x^2_0.05,3: "+rexs2_0053);


		if(xs2_0 < rexs2_0053){
			console.log("No se rechaza H0")
			console.log("H0: Los numeros tienen una distribucion uniforme")
		}else{
			console.log("Se rechaza H0")
			console.log("H1: Los numeros no tienen una distribucion uniforme")
		}

		// Mostrar segundo panel 
		var mostrarDato = document.getElementById("oculto");
		var btn_mostrar = document.getElementById("mostrar");
		btn_mostrar.onclick = function(){
			mostrarDato.style.display = "block";
		}

		// Fabricacion de series
		c1=0;
		c2=0;
		c3=0;
		c4=0;
		i=0;
		j=1


		for(i=i; j > i; j--){
			for(var i=0; i < muestra.length; i++){
				if(muestra[i] >= 0.50 && muestra[j] >= 0.50){ 
					c4++
					// console.log("Dato 1: ", muestra[i]);
					// console.log("Dato 2: ", muestra[j]);
					// console.log("Columna 4: " ,c4);
				}
				if(muestra[i] <= 0.50 && muestra[j] <= 0.50){ 
					c1++
					// console.log("Dato 1: ", muestra[i]);
					// console.log("Dato 2: ", muestra[j]);
					// console.log("Columna 1: " ,c1);
				}
				if(muestra[i] <= 0.50 && muestra[j] >= 0.50){ 
					c3++
					// console.log("Dato 1: ", muestra[i]);
					// console.log("Dato 2: ", muestra[j]);
					// console.log("Columna 3: " ,c3);
				}
				if(muestra[i] >= 0.50 && muestra[j] <= 0.50){ 
					c2++
					// console.log("Dato 1: ", muestra[i]);
					// console.log("Dato 2: ", muestra[j]);
					// console.log("Columna 2: " ,c2);
				}
				j++
			}
		}
		console.log("-------------------")
		console.log("-------------------")
		console.log("Fase 2 Fabricacion de series")
		console.log("Sumatoria de numeros pares FO");
		console.log("c1: "+c1);
		console.log("c2: "+c2);
		console.log("c3: "+c3);
		console.log("c4: "+c4);
		n= 2;
		console.log("n : ",n);
		FE = (muestra.length-1) / n**2; 
		console.log("FE: ",FE);
		var Fo_Fe1 = (c1-FE)**2;
		var Fo_Fe2 = (c2-FE)**2;
		var Fo_Fe3 = (c3-FE)**2;
		var Fo_Fe4 = (c4-FE)**2;
		var sumaTotalFo_Fe = Fo_Fe1+Fo_Fe2+Fo_Fe3+Fo_Fe4;
		console.log("Fo_Fe1**2: "+Fo_Fe1);
		console.log("Fo_Fe2**2: "+Fo_Fe2);
		console.log("Fo_Fe3**2: "+Fo_Fe3);
		console.log("Fo_Fe4**2: "+Fo_Fe4);
		xs2_0 = (n**2) / (muestra.length-1) * sumaTotalFo_Fe;
		console.log("x^2_0: ",xs2_0);

		if(xs2_0 <= 2){
			console.log("1 y 2");
		}if(xs2_0 >= 4){
			console.log("4")
		}


		var nada=0, par =0, doblepar =0, tercia=0, poker=0, full=0, quintilla=0;
		for(var i = 0; i < muestra.length; i++){
			var cartaJugada = 0;
			var ctn0 =0,ctn1 =0, ctn2 =0,ctn3 =0, ctn4 =0,ctn5 =0, ctn6 =0,ctn7 =0, ctn8 =0, ctn9 =0;
			var m  = muestra[i]
			var mSq = m.toFixed(5);
			var dt = mSq.slice(2,7);
			var arrayPoker = dt.split("");
			console.log("-------------------")
			console.log("-------------------")
			console.log("Conteo de numeros!")
			// console.log(arrayPoker); //Datos de numeros aleatorios desglosados en los ultimos 5 decimales

			// Como hacer que funcione el comparador de jugadas

			// 4 5 6 8 5  = 1 = par
			// 0 1 2 3 4

			// 6 5 6 8 5  = 2 = doblepar
			// 0 1 2 3 4

			// 4 5 4 8 4  = 3 = tercia
			// 0 1 2 3 4

			// 4 5 5 5 5  = 6 = poker
			// 0 1 2 3 4

			// 4 5 4 5 5  = 4 = full
			// 0 1 2 3 4

			// 5 5 5 5 5  = 10 = quintilla
			// 0 1 2 3 4
			var indiceP0 = arrayPoker[0];
			var indiceP1 = arrayPoker[1];
			var indiceP2 = arrayPoker[2];
			var indiceP3 = arrayPoker[3];
			var indiceP4 = arrayPoker[4];

			var indice0 = parseInt(indiceP0,Number);
			var indice1 = parseInt(indiceP1,Number);
			var indice2 = parseInt(indiceP2,Number);
			var indice3 = parseInt(indiceP3,Number);
			var indice4 = parseInt(indiceP4,Number);

			if(indice0 == indice1 || indice0 == indice2 || 
				indice0 == indice3 || indice0 == indice4){
					
				cartaJugada++
			}
			if(indice1 == indice2 || indice1 == indice3 || 
				indice1 == indice4){
					
				cartaJugada++
			}
			if(indice2 == indice3 || indice2 == indice4){
					
				cartaJugada++
			}
			if(indice3 == indice4){
					
				cartaJugada++
			}
		

			for(var j = 0; j < arrayPoker.length; j++){
				// console.log(arrayPoker[j]);
				var lect = arrayPoker[j]
				var lectToInt = parseInt(lect,Number);

				switch(lectToInt){
					case 0:
						ctn0++;
						break;
					case 1:
						ctn1++;
						break;
					case 2:
						ctn2++;
						break;
					case 3:
						ctn3++;
						break;
					case 4:
						ctn4++;
						break;
					case 5:
						ctn5++;
						break;
					case 6:
						ctn6++;
						break;
					case 7:
						ctn7++;
						break;
					case 8:
						ctn8++;
						break;
					case 9:
						ctn9++;
						break;
				}

				if(j == 4){
					
					console.log("Conteo numeros de 0: ",ctn0, "Conteo numeros de 1: ",ctn1,"Conteo numeros de 2: ",ctn2, "Conteo numeros de 3: ",ctn3,"Conteo numeros de 4: ",
					ctn4, "Conteo numeros de 5: ",ctn5,"Conteo numeros de 6: ",ctn6, "Conteo numeros de 7: ",ctn7,
					"Conteo numeros de 8: ",ctn8, "Conteo numeros de 9: ",ctn9);
					
					switch(cartaJugada){
						case 0:
							console.log("No tienes nada: ",arrayPoker)
							nada++;
							break;
						case 1:
							console.log("Tienes un par: ",arrayPoker)
							par++;
							break;
						case 2:
							console.log("Tienes dos par: ",arrayPoker)
							doblepar++;
							break;
						case 3:
							console.log("Puedes tener tercia, full o poker: ",arrayPoker)
							// tercia++;
							full++;
							// poker++;
							break;
						case 4:
							console.log("Tienes quintilla: ",arrayPoker)
							quintilla++;
							break;
					}

					if(i <= muestra.length){
						console.log("-------------------")
						console.log("Numero de jugadas")
						console.log("Nada: ",nada);
						console.log("par: ",par);
						console.log("doblepar: ",doblepar);
						console.log("tercia: ",tercia);
						console.log("poker: ",poker);
						console.log("full: ",full);
						console.log("quintilla: ",quintilla);
						console.log("-------------------")
					}	
				}

			}
			
		}
		console.log("Fe de poker");
			// var Pnada =0.3024, Ppar=0.504, Pdoblepar =0.108, Ptercia =0.072, Pfull =0.009, Ppoker= 0.0045, Pquintilla = 0.0001;
			var Probabilidad = [0.3024, 0.504, 0.108, 0.072, 0.009, 0.0045, 0.0001]
			var sumaFe = []
			var parx2 = 0
			var diferentesx2 = 0
			var acumuladox2 = 0

			var id = 1;
			for(var i =0; i < Probabilidad.length; i++){
				var FePoker = muestra.length * Probabilidad[i];
				
				if (id == 1){
					console.log("De Fe-Nada de poker: ",FePoker)
				}
				if (id == 2){
					console.log("De Fe-Par de poker: ",FePoker)
				}
				if (id == 3){
					console.log("De Fe-DoblePar de poker: ",FePoker)
				}
				if (id == 4){
					console.log("De Fe-Tercia de poker: ",FePoker)
				}
				if (id == 5){
					console.log("De Fe-Full de poker: ",FePoker)
				}
				if (id == 6){
					console.log("De Fe-Poker de poker: ",FePoker)
				}
				if (id == 7){
					console.log("De Fe-Quintilla de poker: ",FePoker)
				}
				id++	

				if(FePoker < 5.00){
					sumaFe.push(FePoker);
					var sumaTotalFe = sumaFe.reduce((a,b)=> a+b,0);	
				}
				parx2 = (par-(Probabilidad[1]*muestra.length))**2 / sumaTotalFe;		
				diferentesx2 = (nada-(Probabilidad[0]*muestra.length))**2 / sumaTotalFe;		
				acumuladox2 = (1-sumaTotalFe)**2 / sumaTotalFe;		
			}
			console.log("Acumulado: ",sumaTotalFe);
			console.log("x2 par: ",parx2);
			console.log("x2 diferentes: ",diferentesx2);
			console.log("x2 acumulados: ",acumuladox2);
			console.log("tu Chi cuadradda es: ", 7.81);

	}
	
}

// Pendiente generar nnumeros aleatorios
function genera_parametros(){
	x_0=103;
	m=1001;
	primos.forEach(a=>{
		primos.forEach(c=>{
			num_ale = generador_mixto(a,c,x_0,m)
			if(num_ale.length == m){ //tambien deberia revisar si hay numeros repetidos
				imprimir_configuracion_parametros_a_pantalla
			}
		});
	});
}

