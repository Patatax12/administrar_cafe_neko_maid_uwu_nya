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
        this.horainiciomili=Date.now();
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

    opc(){
        let selHTML=document.getElementById("selcomp");
        selHTML.innerHTML="";
        for(let i=0;i<this.listpc.length;i++){
            if(this.listpc[i].estado=="disponible"){
                let option=document.createElement("option");
                option.value=this.listpc[i].id;
                option.text="pc_"+this.listpc[i].id;
                selHTML.appendChild(option);
            }
        }
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
        this.listclientes.push(new Cliente(1,"six sevenlando"));
        this.listclientes.push(new Cliente(2,"tung tung "));
        this.listclientes.push(new Cliente(3,"tralalero"));
    }

    opc(){
        let selHTML=document.getElementById("selcli");
        selHTML.innerHTML="";
        for(let i=0;i<this.listclientes.length;i++){
            let option=document.createElement("option");
            option.value=this.listclientes[i].id;
            option.text=this.listclientes[i].nombre;
            selHTML.appendChild(option);
        }
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

let listacomp=new admcomp();
let listaclientes=new admclientes();
let listasesiones=[];
let siguienteidsesion=1;

listacomp.opc();
listaclientes.opc();

function mostraractivas(){
    let tbody=document.querySelector("#tablact tbody");
    tbody.innerHTML="";

    for(let i=0;i<listasesiones.length;i++){
        let sesion=listasesiones[i];
        if(sesion.horafin==null){
            let cliente=listaclientes.buscarporid(sesion.clienteid);
            let comp=listacomp.buscarporid(sesion.compid);

            let fila=document.createElement("tr");
            fila.innerHTML="<td>"+cliente.nombre+"</td><td>pc_"+comp.id+"</td><td>"+sesion.horainicio+"</td><td><button type='button' class='btnfin' data-id='"+sesion.id+"'>Finalizar</button></td>";
            tbody.appendChild(fila);
        }
    }

    let botones=document.querySelectorAll(".btnfin");
    for(let i=0;i<botones.length;i++){
        botones[i].addEventListener("click",function(){
            finalizarsesion(Number(this.dataset.id));
        });
    }
}

function iniciarsesion(evento){
    evento.preventDefault();

    let clienteid=Number(document.getElementById("selcli").value);
    let compid=Number(document.getElementById("selcomp").value);

    let comp=listacomp.buscarporid(compid);
    if(comp==null||comp.estado!="disponible"){
        alert("Ese computador ya no esta disponible.");
        return;
    }

    let nueva=new Sesion(siguienteidsesion,clienteid,compid,comp.precioPorHora);
    siguienteidsesion++;

    listasesiones.push(nueva);
    comp.estado="ocupado";

    mostraractivas();
    listacomp.opc();
}

function finalizarsesion(id){
    let sesion=null;
    for(let i=0;i<listasesiones.length;i++){
        if(listasesiones[i].id==id){
            sesion=listasesiones[i];
        }
    }
    if(sesion==null)return;

    let costoservicio=Number(prompt("Costo fijo por servicios (0 si no aplica):","0"));
    if(isNaN(costoservicio))costoservicio=0;

    let ahora=Date.now();
    let duracionmili=ahora-sesion.horainiciomili;
    let duracionmin=Math.round(duracionmili/60000);
    if(duracionmin<1)duracionmin=1;

    let montouso=(duracionmin/60)*sesion.preciohora;
    let montofinal=montouso+costoservicio;

    sesion.horafin=new Date().toLocaleTimeString();
    sesion.duracionmin=duracionmin;
    sesion.costoservicio=costoservicio;
    sesion.montofinal=Math.round(montofinal);

    let comp=listacomp.buscarporid(sesion.compid);
    if(comp!=null){
        comp.estado="disponible";
    }

    mostrarboleta(sesion);
    mostraractivas();
    listacomp.opc();
}

function mostrarboleta(sesion){
    let cliente=listaclientes.buscarporid(sesion.clienteid);
    let costouso=Math.round((sesion.duracionmin/60)*sesion.preciohora);

    let texto="Cliente: "+cliente.nombre+"\n";
    texto=texto+"Duracion: "+sesion.duracionmin+" minutos\n";
    texto=texto+"Precio por hora: $"+sesion.preciohora+"\n";
    texto=texto+"Costo uso computador: $"+costouso+"\n";
    texto=texto+"Costo servicios: $"+sesion.costoservicio+"\n";
    texto=texto+"------------------------\n";
    texto=texto+"TOTAL: $"+sesion.montofinal;

    document.getElementById("titbol").style.display="block";
    let boleta=document.getElementById("bol");
    boleta.style.display="block";
    boleta.textContent=texto;
}

let formses=document.getElementById("formses");
formses.addEventListener("submit",iniciarsesion);
