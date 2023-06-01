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
    const buttonVaciar = document.getElementById("buttonVaciar");
    if (!buttonVaciar) {
        const buttonVaciarElement = document.createElement("button");
        buttonVaciarElement.id = "buttonVaciar";
        buttonVaciarElement.textContent = "Vaciar Carrito";
        buttonVaciarElement.addEventListener("click", vaciarCarrito);
        buttonVaciarElement.classList.add("button-vaciar");
        contenedor.appendChild(buttonVaciarElement);
    }
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarTotal();
    mostrarResumen();
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

    const guardarTratamientos = new Promise((resolve, reject) => {
        Swal.fire({
            title: '¿Estás seguro de guardar los tratamientos?',
            text: "Se abrirá WhatsApp para confirmar la compra.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                resolve();
            } else {
                reject(new Error('La operación fue cancelada'));
            }
        });
    });

    guardarTratamientos.then(() => {
        const telefono = '2954290990';
        const totalCarrito = total;
        const mensaje = `¡Hola! Quiero realizar una compra de tratamientos por un total de $${totalCarrito}.`;
        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        window.location.href = url;
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    });
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
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById('contactForm').reset(); 
        })
});