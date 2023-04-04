function saludar () {
    console.log("¡Hola, bienvenido a nuestro Centro de Estética!")
}

saludar ()

function passwordValidation (pasword, repeatPassword) {
    if (pasword != "" || repeatPassword == "") {
        console.log ("La contraseña debe contener caracteres");
    }
    if (pasword == repeatPassword) {
        console.log ("La contraseña ingresada no es igual");
    }
    if (pasword.length < 8) {
        console.log ("La contraseña debe tener al menos 8 caracteres");
    }
    if (pasword.length > 15) {
        console.log ("La contraseña no puede contener mas de 15 caracteres")
    }
}
passwordValidation ("lu", "casa");

let nombreUsuario = prompt ("Ingrese su nombre de usuario, porfavor");
if (nombreUsuario == "") {
    alert ("No ha ingresado el nombre de usuario");
}
else {
    alert ("Nombre de usuario ingresado correctamente " + nombreUsuario);
}

let numeroPacientes = parseInt(prompt("Seleccione su turno según su orden de llegada, gracias."));
for (let turno = 1; turno <= numeroPacientes; turno ++) {
    let apellido = prompt("Apellido del paciente " + turno + "?");
    alert("El paciente " + apellido + ", tiene aisgnado su turno, número " + turno);
    console.log("El paciente" + apellido + ", tiene asignado el turno número " + turno);
}