function saludar () {
    console.log("¡Hola, bienvenido a nuestro Centro de Estética!")
}

saludar ()

/*
function passwordValidation (pasword, repeatPassword) {
    if (pasword != "" || repeatPassword == "") {
        console.log ("La contraseña debe contener caracteres");
    }
    if (pasword !== repeatPassword) {
        console.log ("La contraseña ingresada no es igual");
    }
    if (pasword.length < 8) {
        console.log ("La contraseña debe tener al menos 8 caracteres");
    }
    if (pasword.length > 15) {
        console.log ("La contraseña no puede contener mas de 15 caracteres")
    }
}
passwordValidation ("lu", "casa"); */

let nombreUsuario = prompt ("Ingrese nombre del paciente");
if (nombreUsuario == "") {
    alert ("No ha ingresado el nombre");
}
else {
    alert ("Nombre de usuario ingresado correctamente " + nombreUsuario);
}

/* let numeroPacientes = parseInt(prompt("Seleccione su turno según su orden de llegada, gracias."));
for (let turno = 1; turno <= numeroPacientes; turno ++) {
    let apellido = prompt("Apellido del paciente " + turno + "?");
    alert("El paciente " + apellido + ", tiene aisgnado su turno, número " + turno);
    console.log("El paciente" + apellido + ", tiene asignado el turno número " + turno);
}*/

class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
    }

    toString = function () {
        return this.nombre + "( $" + this.precio.toFixed(2) + ")";
    };
}

let misServicios = [
    new Servicio(1, "Limpieza facial profunda", 4800),
    new Servicio(2, "Dermaplaning", 3800),
    new Servicio(3, "Peeling", 8800),
    new Servicio(4, "Mesoglow - Dermapen", 3500),
    new Servicio(5, "Mesoterapia", 9000),
    new Servicio(6, "Luz pulsada intensa", 12000),
    new Servicio(7, "Plasma rico en plaquetas", 10000),
    new Servicio(8, "Sesión Skin", 2500), 
];

 /* uso del forEach */

misServicios.forEach((unServicio ) => {
    console.log("--> " + unServicio.toString());
});


/*arrays y objeto combinados*/

class Tratamientos {
    constructor(tratamiento, precio) {
        this.tratamiento = tratamiento.toUpperCase ();
        this.precio = parseFloat (precio);
        this.agendado = false;
    }
}

let misTratamientos = [];

let respuesta = "SI";

do {
    let tratamiento = prompt("Ingrese el nombre del tratamiento que desea realizar");
    let precio = prompt("Ingrese el precio del tratamiento elegido");
    const unTratamiento = new Tratamientos(tratamiento,precio);
    misTratamientos.push(unTratamiento);
    console.log("Tratamietos seleccionados" ,misTratamientos.length);
    respuesta = prompt("¿Quieres seleccionar otro tratamiento? SI/NO");
} while (respuesta.toUpperCase() !== "NO")

console.log("Aquí estan tus tratamientos seleccionados", misTratamientos);

let suma = 0;

for (const unTratamiento of misTratamientos) {
    console.log("Los tratamientos seleccionados son" ,unTratamiento);
    suma = suma + unTratamiento.precio;
}

console.log("Aquí puede observar el monto total de los tratamientos seleccionados: " ,suma);

/* funciones de orden superior 2 */

let fechaNuevostratamientos = new Date(2023, 4, 29);
let hoy = new Date();

const diferencia = fechaNuevostratamientos - hoy;

const milisegundosPorDia = 86400000;

console.log("--> ¡Cuenta regresiva para la incorporación de nuevos tratamientos! solo faltan: " + Math.round ((diferencia/milisegundosPorDia)));
