
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-viaje");
    // Selecciona todos los campos de entrada y selects, incluyendo radios
    const campos = [
        form.nombre,
        form.destino,
        form.fecha,
        form.correo,
        form.telefono,
        form.tarjeta,
        // Para el grupo de radio, selecciona el primero (todos comparten name="guia")
        form.querySelector('input[name="guia"]')
    ];
    const mensajes = form.querySelectorAll(".mensaje-error");

    // Validación en tiempo real
    campos.forEach((campo, idx) => {
        if (campo.type === "radio") {
            // Para radio, escucha en todos los radios del grupo
            const radios = form.querySelectorAll('input[name="guia"]');
            radios.forEach(radio => {
                radio.addEventListener("change", function () {
                    validarCampo(radios, mensajes[idx]);
                });
            });
        } else {
            campo.addEventListener("input", function () {
                validarCampo(campo, mensajes[idx]);
            });
        }
    });

    function validarCampo(campo, mensaje) {
        // Para el grupo de radio
        if (NodeList.prototype.isPrototypeOf(campo) || Array.isArray(campo)) {
            let checked = false;
            campo.forEach(radio => { if (radio.checked) checked = true; });
            if (!checked) {
                mensaje.textContent = "Seleccione una opción.";
            } else {
                mensaje.textContent = "";
            }
            return;
        }

        // Para los demás campos
        if (!campo.checkValidity()) {
            if (campo.validity.valueMissing) {
                mensaje.textContent = "Este campo es obligatorio.";
            } else if (campo.type === "email" && campo.validity.typeMismatch) {
                mensaje.textContent = "Ingrese un correo válido.";
            } else if (campo.name === "telefono" && campo.validity.patternMismatch) {
                mensaje.textContent = "Ingrese solo números (8-15 dígitos).";
            } else if (campo.name === "destino" && campo.value === "") {
                mensaje.textContent = "Seleccione un destino.";
            } else {
                mensaje.textContent = "Dato inválido.";
            }
        } else {
            mensaje.textContent = "";
        }
    }

    // Guardar y redirigir al enviar, sin borrar los datos del formulario
    form.addEventListener("submit", function (e) {
        let valido = true;
        campos.forEach((campo, idx) => {
            if (campo.type === "radio") {
                const radios = form.querySelectorAll('input[name="guia"]');
                validarCampo(radios, mensajes[idx]);
                let checked = false;
                radios.forEach(radio => { if (radio.checked) checked = true; });
                if (!checked) valido = false;
            } else {
                validarCampo(campo, mensajes[idx]);
                if (!campo.checkValidity()) valido = false;
            }
        });

        if (!valido) {
            e.preventDefault();
            return;
        }

        // Guardar datos en localStorage
        const guiaSeleccionada = form.querySelector('input[name="guia"]:checked');
        const datos = {
            nombre: form.nombre.value,
            destino: form.destino.value,
            fecha: form.fecha.value,
            correo: form.correo.value,
            telefono: form.telefono.value,
            tarjeta: form.tarjeta.value,
            guia: guiaSeleccionada ? guiaSeleccionada.value : ""
        };
        localStorage.setItem('datosPersonales', JSON.stringify(datos));

        // Redirigir a cobrar.html (NO se borra el formulario)
        window.location.href = "cobrar.html";
    });
});

