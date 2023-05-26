function saludar() {
    console.log("¡Hola, bienvenido a nuestro Centro de Estética!")
}

const contenedor = document.getElementById("contenedor");

function servicios() {
    contenedor.innerHTML = "Estos son los servicios";
};

const buttonServicios = document.getElementById("servicios");
console.log(buttonServicios);
buttonServicios.addEventListener("click", servicios)

class Servicio {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

let misServicios = [
    new Servicio(1, "Limpieza facial profunda", 4800),
    new Servicio(2, "Dermaplaning", 3800),
    new Servicio(3, "Peeling", 8800),
    new Servicio(4, "Mesoglow - Dermapen", 3500),
    new Servicio(5, "Mesoterapia", 9000),
    new Servicio(6, "Luz pulsada intensa", 12000),
    new Servicio(7, "Plasma rico en plaquetas", 10000),
    new Servicio(8, "Sesión Skin", 2500)
];

function servicios() {
    let listaHTML = '<ul>';
    for (let servicio of misServicios) {
        listaHTML += `<li><input type="checkbox" onchange="actualizarCarrito(${servicio.id}, this.checked)"> ${servicio.nombre} - Precio: $${servicio.precio}</li>`;
    }
    listaHTML += '</ul>';
    contenedor.innerHTML = listaHTML;
    contenedor.innerHTML += 'Total: $<span id="total">0</span>';
    const buttonGuardar = document.getElementById("buttonGuardar");
    if (!buttonGuardar) {
        const buttonElement = document.createElement("button");
        buttonElement.id = "buttonGuardar";
        buttonElement.textContent = "Guardar";
        buttonElement.addEventListener("click", guardarCarrito);
        buttonElement.classList.add("button-guardar");
        contenedor.appendChild(buttonElement);
    }
}

let carrito = [];
let total = 0;

function actualizarCarrito(servicioId, isChecked) {
    const servicio = misServicios.find(servicio => servicio.id === servicioId);

    if (isChecked) {
        carrito.push(servicio);
        total += servicio.precio;
    } else {
        carrito = carrito.filter(item => item.id !== servicioId);
        total -= servicio.precio;
    }

    actualizarTotal();
}

function actualizarTotal() {
    const totalElement = document.getElementById("total");
    totalElement.textContent = total;
}


function mostrarResumen() {
    let resumenHTML = '<h3>Resumen de tratamientos seleccionados:</h3>';
    resumenHTML += '<ul>';
    for (let servicio of carrito) {
        resumenHTML += `<li>${servicio.nombre} - Precio: $${servicio.precio}</li>`;
    }
    resumenHTML += '</ul>';
    resumenHTML += `<p>Total: $${total}</p>`;
    contenedor.innerHTML = resumenHTML;
}

function guardarCarrito() {
    mostrarResumen();
    console.log("Carrito guardado:", carrito);
    Swal.fire({
        title: 'Confirmar',
        text: '¿Estás seguro de guardar los tratamientos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const telefono = '2954290990';
            const mensaje = `¡Hola! Quiero realizar una compra de tratamientos por un total de $${total}.`;
            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            window.location.href = url;
            localStorage.setItem('tratamientosSeleccionados', JSON.stringify(carrito));
        }
    });
    
    setTimeout(() => {
        const telefono = '2954290990';
        const mensaje = `¡Hola! Quiero realizar una compra de tratamientos por un total de $${total}.`;
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.location.href = url;
    }, 5000);
}

const datosForm = document.getElementById('datosForm');
const nombreInput = document.getElementById('nombre');
const dniInput = document.getElementById('dni');

if (localStorage.getItem('datosUsuario')) {
    ocultarFormulario();
    const datosGuardados = JSON.parse(localStorage.getItem('datosUsuario'));
    const nombre = datosGuardados.nombre;
    const dni = datosGuardados.dni;
    console.log('Nombre:', nombre);
    console.log('DNI:', dni);
} else {
    datosForm.addEventListener('submit', guardarDatos);
}

function guardarDatos(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const dni = dniInput.value;
    const datosUsuario = { nombre, dni };
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    console.log('Nombre:', nombre);
    console.log('DNI:', dni);
    ocultarFormulario();
}




document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = {
        title: name,
        body: message,
        userId: 1 
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            alert('Mensaje enviado correctamente');
            document.getElementById('contactForm').reset(); 
        })
        .catch(error => {
            console.log('Error: ' + error.message);
            alert('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
        });
});
