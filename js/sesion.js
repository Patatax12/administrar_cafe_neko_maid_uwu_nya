class Computador{
    constructor(id){
        this.estado="disponible";
        this.id=id;
        this.precioPorHora=1000;
    }
}

class Cliente{
    constructor(id,nombre){
        this.id=id;
        this.nombre=nombre;
    }
}

class Sesion{
    constructor(id,clienteid,compid,preciohora){
        this.id=id;
        this.clienteid=clienteid;
        this.compid=compid;
        this.fecha=new Date().toLocaleDateString();
        this.horainicio=new Date().toLocaleTimeString();
        this.horafin=null;
        this.duracionmin=null;
        this.preciohora=preciohora;
        this.costoservicio=0;
        this.montofinal=null;
    }
}

class admcomp{
    constructor(){
        this.listpc=[];
        for(let i=0;i<10;i++){
            this.listpc.push(new Computador(i+1));
        }
    }

    disponibles(){
        let resultado=[];
        for(let i=0;i<this.listpc.length;i++){
            if(this.listpc[i].estado=="disponible"){
                resultado.push(this.listpc[i]);
            }
        }
        return resultado;
    }

    buscarporid(id){
        for(let i=0;i<this.listpc.length;i++){
            if(this.listpc[i].id==id){
                return this.listpc[i];
            }
        }
        return null;
    }
}

class admclientes{
    constructor(){
        this.listclientes=[];
        this.listclientes.push(new Cliente(1,"elpepe"));
        this.listclientes.push(new Cliente(2,"etesech"));
        this.listclientes.push(new Cliente(3,":3"));
    }

    buscarporid(id){
        for(let i=0;i<this.listclientes.length;i++){
            if(this.listclientes[i].id==id){
                return this.listclientes[i];
            }
        }
        return null;
    }
}

document.addEventListener('alpine:init', () => {
    Alpine.data('sesionApp', () => ({
        listaclientes: new admclientes(),
        listacomp: new admcomp(),
        listasesiones: [],
        siguienteidsesion: 1,
        clienteElegido: '',
        compElegido: '',
        error: '',
        boletaTexto: '',

        activas() {
            let resultado = [];
            for (let i = 0; i < this.listasesiones.length; i++) {
                if (this.listasesiones[i].horafin == null) {
                    resultado.push(this.listasesiones[i]);
                }
            }
                return resultado;
        },

        nombreCliente(id) {
            let c = this.listaclientes.buscarporid(id);
            if (c == null) return '';
            return c.nombre;
        },

        iniciarsesion() {
            this.error = '';

            if (this.clienteElegido === '') {
                this.error = 'Debes seleccionar un cliente.';
                return;
            }
            if (this.compElegido === '') {
                this.error = 'Debes seleccionar un computador.';
                return;
            }

            let comp = this.listacomp.buscarporid(Number(this.compElegido));
            if (comp == null || comp.estado != "disponible") {
                this.error = 'Ese computador ya no está disponible.';
                return;
            }

            let nueva = new Sesion(
                this.siguienteidsesion,
                Number(this.clienteElegido),
                comp.id,
                comp.precioPorHora
            );
            this.siguienteidsesion++;
            this.listasesiones.push(nueva);
            comp.estado = "ocupado";

            this.clienteElegido = '';
            this.compElegido = '';
        },

        finalizarsesion(sesion) {
            this.error = '';

            if (!confirm('¿Finalizar la sesión de ' + this.nombreCliente(sesion.clienteid) + '?')) return;

            let duracion = prompt("Duración de la sesión en minutos:", "60");
            if (duracion == null) return;
            duracion = Number(duracion);
            if (isNaN(duracion) || duracion <= 0) {
                this.error = 'La duración debe ser un número mayor a 0.';
                return;
            }

            let servicios = prompt("Costo fijo por servicios (0 si no aplica):", "0");
            if (servicios == null) return;
            servicios = Number(servicios);
            if (isNaN(servicios) || servicios < 0) {
                this.error = 'El costo de servicios debe ser un número desde 0.';
                return;
            }

            let montouso = (duracion / 60) * sesion.preciohora;

            sesion.horafin = new Date().toLocaleTimeString();
            sesion.duracionmin = duracion;
            sesion.costoservicio = servicios;
            sesion.montofinal = Math.round(montouso + servicios);

            let comp = this.listacomp.buscarporid(sesion.compid);
            if (comp != null) comp.estado = "disponible";

            this.mostrarboleta(sesion);
        },

        mostrarboleta(sesion) {
            let costouso = Math.round((sesion.duracionmin / 60) * sesion.preciohora);

            let texto = "Cliente: " + this.nombreCliente(sesion.clienteid) + "\n";
            texto += "Fecha: " + sesion.fecha + "\n";
            texto += "Duración: " + sesion.duracionmin + " minutos\n";
            texto += "Precio por hora: $" + sesion.preciohora + "\n";
            texto += "Costo uso computador: $" + costouso + "\n";
            texto += "Costo servicios: $" + sesion.costoservicio + "\n";
            texto += "------------------------\n";
            texto += "TOTAL: $" + sesion.montofinal;

            this.boletaTexto = texto;
        }
    }));
});