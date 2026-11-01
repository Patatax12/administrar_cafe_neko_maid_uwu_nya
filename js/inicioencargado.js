
const computadores = [
    { codigo: "PC-01", estado: "ocupado" },
    { codigo: "PC-02", estado: "ocupado" },
    { codigo: "PC-03", estado: "ocupado" },
    { codigo: "PC-04", estado: "ocupado" },
    { codigo: "PC-05", estado: "fuera de servicio" },
    { codigo: "PC-06", estado: "reservado" },
    { codigo: "PC-07", estado: "disponible" }

];

const sesionesActivas = [
    { cliente: "DON DANNY", computador: "PC-01", horaInicio: "14:30", precioporhora: 6700 },
    { cliente: "OYE YA PO ARIEL", computador: "PC-04", horaInicio: "15:10", precioporhora: 6700 },
    { cliente: "Ola Keki", computador: "PC-02", horaInicio: "15:45", precioporhora: 6700 },
    { cliente: "Felipe CACARMAN", computador: "PC-03", horaInicio: "13:45", precioporhora: 6700 }
];

const totalRecaudadoHoy = 676767;

const horaActual = "16:30"; 


function aMinutos(hora) {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
}

function montoSesion(sesion) {
    const minutos = aMinutos(horaActual) - aMinutos(sesion.horaInicio);
    return Math.round((minutos / 60) * sesion.precioporhora);
}

document.addEventListener('alpine:init', () => {
    Alpine.data('inicio', () => ({
        totalRecaudado: totalRecaudadoHoy,
        computadores: computadores,
        sesiones: sesionesActivas,

        disponibles() {
            return this.computadores.filter(pc => pc.estado === 'disponible').length;
        },

        ordenar(campo) {
            this.sesiones.sort((a, b) => a[campo].localeCompare(b[campo]));
        },

        minutos(sesion) {
            return aMinutos(horaActual) - aMinutos(sesion.horaInicio);
        },

        finalizar(sesion) {
            const cobro = montoSesion(sesion);
            if (!confirm('¿Finalizar la sesión de ' + sesion.cliente + '? Se cobran $' + cobro.toLocaleString('es-CL'))) {
                return;
            }
            this.totalRecaudado += cobro;
            this.computadores.find(pc => pc.codigo === sesion.computador).estado = 'disponible';
            this.sesiones = this.sesiones.filter(s => s.computador !== sesion.computador);
        }
    }));
});

