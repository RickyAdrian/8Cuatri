class Pieza{
    constructor(id){
        this.id = id;
        this.tiempo_llegada = 0;
        this.tiempo_ingreso_cola = 0;
        this.tiempo_salida_cola = 0;
        this.tiempo_ingreso_supervisor = 0;
        this.tiempo_salida_supervisor = 0;
    }
}

class Evento{
    static nueva_pieza_llegada = 1;
    static salida_supervisor = 2;
    constructor(tiempo, tipo_evento, pieza){
        this.tiempo = tiempo;
        this.tipo_evento = tipo_evento;
        this.pieza = pieza;
    }
}

function getTime(evento){
    return evento.tiempo
}

class Simulacion{
    static vacio = 0;
    static ocupado = 1;

    constructor(tiempo_simulacion = 10000){
        this.tiempo_simulacion =tiempo_simulacion;
        this.clock = 0;
        this.eventos = [];
        this.cola = [];
        this.salidas = [];
        this.estado_supervisor = this.vacio;
        this.preparar_entradas();
    }
    preparar_entradas() {
        var tiempo = 0;
        var id = 1;
        let pieza = undefined;
        while(true){
            tiempo += NumAleExp();
            pieza = new Pieza(id)
            id += 1
            pieza.tiempo_llegada = tiempo;
            this.eventos.push(new Evento(tiempo, Evento.nueva_pieza_llegada, pieza));
            if(tiempo > this.tiempo_simulacion){
                this.eventos.shift();
                break;
            }
        }       
    }
    siguiente_evento(){
        let evento = this.eventos.shift(0);
        // console.log(evento);
        if(Evento.tipo_evento == Evento.nueva_pieza_llegada){
            this.clock = evento.tiempo;
        }
        return evento;
    }
    run(){
        this.estado_supervisor = Simulacion.vacio;
        // console.log(this.eventos);
        while(this.eventos.length > 0){
            let evento = this.siguiente_evento();
            this.clock = evento.tiempo;
            if(evento.tipo_evento == Evento.nueva_pieza_llegada){
                evento.pieza.tiempo_ingreso_cola = this.clock;
                this.cola.push(evento.pieza);
            }if(evento.tipo_evento == Evento.salida_supervisor){
                this.estado_supervisor = Simulacion.vacio;
                evento.pieza.tiempo_salida_supervisor = this.clock;
                this.salidas.push(evento.pieza);
            }
            if(this.estado_supervisor == Simulacion.vacio && this.cola.length > 0){
                this.estado_supervisor = Simulacion.ocupado;
                let siguiente_pieza = this.cola.shift();
                let tiempo_ocupado = randn_bm(); // Checar esto
                siguiente_pieza.tiempo_ingreso_supervisor = this.clock;
                this.eventos.push(new Evento(this.clock+tiempo_ocupado, Evento.salida_supervisor, siguiente_pieza));
                // this.eventos.sort(key=getTime);
                // var sortable = [];
                // for (var i in tiempo){
                //     sortable.push([i, tiempo[i]])
                // }
                this.eventos.sort((a,b) =>{
                    return a.tiempo - b.tiempo;
                });
            }
            if(this.clock > this.tiempo_simulacion){
                break;
            }
        }
    }
}

var sim = new Simulacion(tiempo_simulacion=10000);
sim.run();

var timeinsystem = 0;
for(var i = 0; i < sim.salidas.length; i++){
    timeinsystem += (sim.salidas[i].tiempo_salida_supervisor - sim.salidas[i].tiempo_llegada);
}
console.log(timeinsystem/sim.salidas.length);