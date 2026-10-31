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
        compElegido: ''
    }));
});