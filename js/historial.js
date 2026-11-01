class Cliente{
    constructor(id,nombre){
        this.id=id;
        this.nombre=nombre;
    }
}

class Computador{
    constructor(id,nombre){
        this.id=id;
        this.nombre=nombre;
    }
}

class Sesion{
    constructor(clienteid,compid,fecha,horainicio,horafin,duracionmin,montofinal){
        this.clienteid=clienteid;
        this.compid=compid;
        this.fecha=fecha;
        this.horainicio=horainicio;
        this.horafin=horafin;
        this.duracionmin=duracionmin;
        this.montofinal=montofinal;
    }
}

let listaclientes=[];
listaclientes.push(new Cliente(1,"tung tung perez"));
listaclientes.push(new Cliente(2,"tralalero trala six seven"));
listaclientes.push(new Cliente(3,"felipe akermanzzz (el cacas)"));

let listacomp=[];
listacomp.push(new Computador(1,"pc_1"));
listacomp.push(new Computador(2,"pc_2"));
listacomp.push(new Computador(3,"pc_3"));

let listasesiones=[];
listasesiones.push(new Sesion(1,1,"10/09/2026","14:00:00","15:00:00",60,1000));
listasesiones.push(new Sesion(2,2,"10/09/2026","16:00:00","16:30:00",30,500));
listasesiones.push(new Sesion(3,1,"11/09/2026","10:00:00","11:45:00",105,1750));

function buscarcliporid(id){
    for(let i=0;i<listaclientes.length;i++){
        if(listaclientes[i].id==id){
            return listaclientes[i];
        }
    }
    return null;
}

function buscarcompporid(id){
    for(let i=0;i<listacomp.length;i++){
        if(listacomp[i].id==id){
            return listacomp[i];
        }
    }
    return null;
}


function valorordenar(sesion,campo){
    if(campo=="cliente"){
        return buscarcliporid(sesion.clienteid).nombre.toLowerCase();
    }
    if(campo=="computador"){
        return buscarcompporid(sesion.compid).nombre;
    }
    if(campo=="fecha"){

        let partes=sesion.fecha.split("/");
        return partes[2]+partes[1]+partes[0];
    }
    return sesion[campo];
}

document.addEventListener('alpine:init', () => {
Alpine.data('historialApp', () => ({
    listaclientes: listaclientes,
    listacomp: listacomp,
    listasesiones: listasesiones,
    filtFecha: '',
    filtComp: '',
    filtCliente: '',
    ordenCampo: '',
    ordenAsc: true,
    nombreCliente(id){
        let cliente=buscarcliporid(id);
        if(cliente==null) return '';
        return cliente.nombre;
    },
    nombreComp(id){
        let comp=buscarcompporid(id);
        if(comp==null) return '';
        return comp.nombre;
    },
    filtradas(){
        let resultado=[];
        let fechafiltro="";
        if(this.filtFecha!=""){
            let partes=this.filtFecha.split("-");
            fechafiltro=partes[2]+"/"+partes[1]+"/"+partes[0];
        }
        for(let i=0;i<this.listasesiones.length;i++){
            let sesion=this.listasesiones[i];
        let pasa=true;
            if(fechafiltro!=""&&sesion.fecha!=fechafiltro){
                pasa=false;
            }
            if(this.filtComp!=""&&sesion.compid!=Number(this.filtComp)){
                pasa=false;
            }
            if(this.filtCliente!=""&&sesion.clienteid!=Number(this.filtCliente)){
                pasa=false;
            }
            if(pasa){
                resultado.push(sesion);
            }
        }
        if(this.ordenCampo!=""){
            let campo=this.ordenCampo;
            let asc=this.ordenAsc;
            resultado.sort(function(a,b){
                let va=valorordenar(a,campo);
                let vb=valorordenar(b,campo);
                let r=0;
                if(va>vb) r=1;
                if(va<vb) r=-1;
                if(!asc) r=-r;
                return r;
            });
        }
        return resultado;
    },
    ordenarPor(campo){
        if(this.ordenCampo==campo){
            this.ordenAsc=!this.ordenAsc;
        } else {
            this.ordenCampo=campo;
            this.ordenAsc=true;
        }
    },
    flecha(campo){
        if(this.ordenCampo!=campo) return '';
        if(this.ordenAsc) return ' ▲';
        return ' ▼';
    },
    limpiar(){
        this.filtFecha='';
        this.filtComp='';
        this.filtCliente='';
    }
}));
})