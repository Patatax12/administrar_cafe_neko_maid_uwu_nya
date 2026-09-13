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

function cargarfiltros(){
    let selcomp=document.getElementById("filtcomp");
    for(let i=0;i<listacomp.length;i++){
        let option=document.createElement("option");
        option.value=listacomp[i].id;
        option.text=listacomp[i].nombre;
        selcomp.appendChild(option);
    }

    let selcli=document.getElementById("filtcl");
    for(let i=0;i<listaclientes.length;i++){
        let option=document.createElement("option");
        option.value=listaclientes[i].id;
        option.text=listaclientes[i].nombre;
        selcli.appendChild(option);
    }
}

function mostrarhist(lista){
    let tbody=document.querySelector("#tablahist tbody");
    tbody.innerHTML="";

    for(let i=0;i<lista.length;i++){
        let sesion=lista[i];
        let cliente=buscarcliporid(sesion.clienteid);
        let comp=buscarcompporid(sesion.compid);

        let fila=document.createElement("tr");
        fila.innerHTML="<td>"+cliente.nombre+"</td><td>"+comp.nombre+"</td><td>"+sesion.fecha+"</td><td>"+sesion.horainicio+"</td><td>"+sesion.horafin+"</td><td>"+sesion.duracionmin+"</td><td>$"+sesion.montofinal+"</td>";
        tbody.appendChild(fila);
    }
}

function aplicarfiltros(){
    let fecha=document.getElementById("filtfech").value;
    let compid=document.getElementById("filtcomp").value;
    let clienteid=document.getElementById("filtcl").value;

    let resultado=[];
    for(let i=0;i<listasesiones.length;i++){
        let sesion=listasesiones[i];
        let pasa=true;

        if(fecha!=""&&sesion.fecha!=fecha){
            pasa=false;
        }
        if(compid!=""&&sesion.compid!=Number(compid)){
            pasa=false;
        }
        if(clienteid!=""&&sesion.clienteid!=Number(clienteid)){
            pasa=false;
        }

        if(pasa){
            resultado.push(sesion);
        }
    }

    mostrarhist(resultado);
}

cargarfiltros();
mostrarhist(listasesiones);

let btnfilt=document.getElementById("btnfilt");
btnfilt.addEventListener("click",aplicarfiltros);

let btnlimp=document.getElementById("btnlimp");
btnlimp.addEventListener("click",function(){
    document.getElementById("filtfech").value="";
    document.getElementById("filtcomp").value="";
    document.getElementById("filtcl").value="";
    mostrarhist(listasesiones);
});
