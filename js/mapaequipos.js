const computadores = [
    { codigo: "PC-01", nombre: "Estación 1", ubicacion: "Pasillo 1", estado: "ocupado" },
    { codigo: "PC-02", nombre: "Estación 2", ubicacion: "Pasillo 2", estado: "ocupado" },
    { codigo: "PC-03", nombre: "Estación 3", ubicacion: "Pasillo 1", estado: "ocupado" },
    { codigo: "PC-04", nombre: "Estación 4", ubicacion: "Pasillo 1 Piso 2", estado: "ocupado" },
    { codigo: "PC-05", nombre: "Estación 5", ubicacion: "Pasillo 2 Piso 2", estado: "fuera de servicio" },
    { codigo: "PC-06", nombre: "Estación 6", ubicacion: "Escondite del Papu", estado: "reservado" },
    { codigo: "PC-07", nombre: "Estación 7", ubicacion: "El otro escondite del papu", estado: "disponible" },
];

const clientes = ["DON DANNY", "OYE YA PO ARIEL", "Ola Keki", "Felipe CACARMAN", "asi no era we :v"];

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

document.addEventListener('alpine:init', () => {
    Alpine.data('mapa', () => ({
        computadores: computadores,
        clientes: clientes,
        filtro: '',
        equipoElegido: null,
        clienteElegido: '',
        error: '',

        visibles() {
            if (this.filtro === '') return this.computadores;
            return this.computadores.filter(pc => pc.estado === this.filtro);
        },

        clickEquipo(pc) {
            if (pc.estado === 'disponible') {
                this.equipoElegido = pc;
                this.clienteElegido = '';
                this.error = '';
            } else if (pc.estado === 'ocupado') {
                if (confirm('¿Finalizar la sesión de ' + pc.codigo + '?')) {
                    pc.estado = 'disponible';
                }
            }
        },

        iniciarSesion() {
            if (this.clienteElegido === '') {
                this.error = 'Elige un cliente para iniciar la sesión.';
                return;
            }
            this.equipoElegido.estado = 'ocupado';
            this.equipoElegido = null;
        },

        cancelar() {
            this.equipoElegido = null;
        }
    }));
});