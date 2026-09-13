class Computador{

    constructor(id){
        this.estado="disponible";
        this.id=id;
    }
}
class admcomp{
    constructor(){
        this.listpc=[];

        for(let i=0;i<15;i++){
            this.listpc.push(new Computador(i+1));
        }
    }
    opc(){
        let selectHTML = document.getElementById("select-computador");
        for(let i=0;i<this.listpc.length;i++){
            if(this.listpc[i].estado=="disponible"){
                let option=document.createElement("option");
                option.value=this.listpc[i].id;
                option.text="pc_"+ this.listpc[i].id;
                selectHTML.appendChild(option);
            }
        }
    }


}

let lista=new admcomp();
lista.opc();

function iniciarsesion(){
    console.log("boton presionado")
}