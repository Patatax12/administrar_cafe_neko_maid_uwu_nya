
const computadores = [
    { codigo: "PC-01", nombre: "Estación 1", ubicacion: "Pasillo 1", estado: "ocupado" },
    { codigo: "PC-02", nombre: "Estación 2", ubicacion: "Pasillo 2", estado: "disponible" },
    { codigo: "PC-03", nombre: "Estación 3", ubicacion: "Pasillo 1", estado: "disponible" },
    { codigo: "PC-04", nombre: "Estación 4", ubicacion: "Pasillo 1 Piso 2", estado: "ocupado" },
    { codigo: "PC-05", nombre: "Estación 5", ubicacion: "Pasillo 2 Piso 2", estado: "reservado" },
    { codigo: "PC-06", nombre: "Estación 6", ubicacion: "Escondite del Papu", estado: "fuera de servicio" },
];

function textoEstado(estado) {
    const textos = {
        disponible: "Disponible :D",
        ocupado: "Ocupado UnU",
        reservado: "Reservado >:C",
        "fuera de servicio": "Fuera de servicio :'v",
    };
    return textos[estado];
}

function claseEstado(estado) {
    return `estado-${estado.replace(/\s+/g, "-")}`;
}

function mostrarComputadores() {
    const grilla = document.getElementById("grilla-equipos");
    grilla.innerHTML = "";

    computadores.forEach(pc => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-equipo";

        tarjeta.innerHTML = `
            <div class="tarjeta-equipo-header">
                <span class="tarjeta-equipo-codigo">${pc.codigo}</span>
                <span class="indicador-estado ${claseEstado(pc.estado)}">${textoEstado(pc.estado)}</span>
            </div>
            <p class="tarjeta-equipo-nombre">${pc.nombre}</p>
            <p class="tarjeta-equipo-ubicacion"> ${pc.ubicacion}</p>
        `;

        if (pc.estado === "disponible") {
            tarjeta.addEventListener("click", () => {
                alert(`Iniciar sesión en ${pc.codigo} (funcionalidad real pendiente para otra entrega)`);
            });
        } else if (pc.estado === "ocupado") {
            tarjeta.addEventListener("click", () => {
                alert(`Finalizar sesión de ${pc.codigo} (funcionalidad real pendiente para otra entrega)`);
            });
        }

        grilla.appendChild(tarjeta);
    });
}

mostrarComputadores();