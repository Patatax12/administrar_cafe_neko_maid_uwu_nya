
document.getElementById('form-login').addEventListener('submit', function (evento) {
    evento.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const mensajeError = document.getElementById('mensaje-error');

    if (usuario === '' || contrasena === '') {
        mensajeError.textContent = 'Debes ingresar usuario y contraseña.';
        return;
    }

    mensajeError.textContent = '';
    alert('Esta es solo la vista de login — el acceso real se implementará en una entrega futura.');
});

