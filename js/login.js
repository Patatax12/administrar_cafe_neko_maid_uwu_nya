
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

//Danny o Ari, Uhmmm se supone o lo que entiendo no tiene que ser un entorno "real real" si no mostrar que es lo que
//sucederia en caso de que falle la custionsita, imagino que las fallas tendrian que ser al final el Lab
//Ahi lo estaremos viendo