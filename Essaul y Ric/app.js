
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
		var l1 = res.length;
		var sw = true;

		var celda;
		var txtcelda;
		var hilera;

		var c = 1;
		var v=res;
		var x=0;
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
            console.log(c);
            celda = document.createElement("td");
            txtcelda = document.createTextNode(x);
            celda.appendChild(txtcelda);
            hilera.appendChild(celda);
            celda = document.createElement("td");
            txtcelda = document.createTextNode(res/mod);
            celda.appendChild(txtcelda);				
			hilera.appendChild(celda);

			if (v==x){
					sw=false;
			}
			c++;
			
			tbody.appendChild(hilera);		
		}
		hilera = document.createElement("tr");
		hilera.className="danger";
		celda = document.createElement("td");
		celda.className="NumRp";
        txtcelda = document.createTextNode("Número repetido");
        celda.appendChild(txtcelda);
		hilera.appendChild(celda);		
        celda = document.createElement("td");
		celda.className="NumRp";
        txtcelda = document.createTextNode(res);
        celda.appendChild(txtcelda);
        hilera.appendChild(celda);
        res = x;
        celda = document.createElement("td");
		celda.className="NumRp";
        txtcelda = document.createTextNode((parseInt(res*mult)+parseInt(cons))%mod);
        celda.appendChild(txtcelda);
        hilera.appendChild(celda);
        celda = document.createElement("td");
		celda.className="NumRp";
        txtcelda = document.createTextNode((parseInt(res*mult)+parseInt(cons))%mod/mod);
        celda.appendChild(txtcelda);
		hilera.appendChild(celda);
		tfoot.appendChild(hilera);
		tabla.appendChild(tbody);
		tabla.appendChild(tfoot);
	}
}