class Cliente{
    constructor(id,nombre,correo){
        this.id=id;
        this.nombre=nombre;
        this.correo=correo;
    }
}

class admclientes{
    constructor(){
        this.listclientes=[];
        this.listclientes.push(new Cliente(1,"elpepe","pepe@gmail.com"));
        this.listclientes.push(new Cliente(2,"etesech","ete@gmail.com"));
        this.listclientes.push(new Cliente(3,":3","meow@gmail.com"));
        this.siguienteid=4;
    }

    mostrar(lista){
        let tbody=document.querySelector("#tablacli tbody");
        tbody.innerHTML="";

        for(let i=0;i<lista.length;i++){
            let fila=document.createElement("tr");
            fila.innerHTML="<td>"+lista[i].id+"</td><td>"+lista[i].nombre+"</td><td>"+lista[i].correo+"</td><td><button type='button' class='btnedit' data-id='"+lista[i].id+"'>Editar</button> <a href='historial.html'>Ver historial</a></td>";
            tbody.appendChild(fila);
        }

        let botones=document.querySelectorAll(".btnedit");
        for(let i=0;i<botones.length;i++){
            botones[i].addEventListener("click",function(){
                editar(Number(this.dataset.id));
            });
        }
    }

    buscar(texto){
        let resultado=[];
        for(let i=0;i<this.listclientes.length;i++){
            if(this.listclientes[i].correo.toLowerCase().includes(texto.toLowerCase())){
                resultado.push(this.listclientes[i]);
            }
        }
        return resultado;
    }

    agregar(nombre,correo){
        let nuevo=new Cliente(this.siguienteid,nombre,correo);
        this.siguienteid++;
        this.listclientes.push(nuevo);
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

let admin=new admclientes();
admin.mostrar(admin.listclientes);

function editar(id){
    let cliente=admin.buscarporid(id);
    if(cliente==null)return;

    let nomnuevo=prompt("Nuevo nombre:",cliente.nombre);
    if(nomnuevo==null)return;

    let cornuevo=prompt("Nuevo correo:",cliente.correo);
    if(cornuevo==null)return;

    cliente.nombre=nomnuevo;
    cliente.correo=cornuevo;
    admin.mostrar(admin.listclientes);
}

let btnbusc=document.getElementById("btnbusc");
btnbusc.addEventListener("click",function(){
    let texto=document.getElementById("buscorreo").value;
    admin.mostrar(admin.buscar(texto));
});

let btntodos=document.getElementById("btntodos");
btntodos.addEventListener("click",function(){
    document.getElementById("buscorreo").value="";
    admin.mostrar(admin.listclientes);
});

let formcli=document.getElementById("formcli");
formcli.addEventListener("submit",function(evento){
    evento.preventDefault();
    let nombre=document.getElementById("nomcli").value;
    let correo=document.getElementById("corcli").value;
    admin.agregar(nombre,correo);
    admin.mostrar(admin.listclientes);
    formcli.reset();
});
