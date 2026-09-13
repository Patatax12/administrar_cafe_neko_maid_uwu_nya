
const computadores = [
    { codigo: "PC-01", estado: "ocupado" },
    { codigo: "PC-02", estado: "disponible" },
    { codigo: "PC-03", estado: "disponible" },
    { codigo: "PC-04", estado: "ocupado" },
    { codigo: "PC-05", estado: "fuera de servicio" },
];

const sesionesActivas = [
    { cliente: "DON DANNY", computador: "PC-01", horaInicio: "14:30" },
    { cliente: "OYE YA PO ARIEL", computador: "PC-04", horaInicio: "15:10" },
];

const totalRecaudadoHoy = 676767;

function mostrarResumen() {
    const disponibles = computadores.filter(pc => pc.estado === "disponible").length;

    document.getElementById("total-recaudado").textContent = `$${totalRecaudadoHoy.toLocaleString("es-CL")}`;
    document.getElementById("equipos-disponibles").textContent = disponibles;
    document.getElementById("cantidad-sesiones").textContent = sesionesActivas.length;
}


function mostrarSesionesActivas() {
    const cuerpoTabla = document.getElementById("cuerpo-tabla-sesiones");
    cuerpoTabla.innerHTML = ""; 

    sesionesActivas.forEach(sesion => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${sesion.cliente}</td>
            <td>${sesion.computador}</td>
            <td>${sesion.horaInicio}</td>
            <td>En curso</td>
            <td><button class="boton-finalizar">Finalizar</button></td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

mostrarResumen();
mostrarSesionesActivas();