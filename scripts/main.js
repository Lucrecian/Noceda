const contenedor = document.getElementById("contenedor");

async function obtenerDatos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
    } catch (error) {
    }
}


function servicios() {
    contenedor.innerHTML = "Estos son los servicios";
    obtenerDatos();
};

const buttonServicios = document.getElementById("servicios");
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
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
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
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toString());

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

    Swal.fire({
        title: 'Formulario de datos del cliente',
        html: `<p>Total: $${total}</p>
            <input id="nombreCliente" type="text" placeholder="Nombre del cliente" required>
            <input id="emailCliente" type="email" placeholder="Email del cliente" required>`,
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nombreCliente = document.getElementById('nombreCliente').value;
            const emailCliente = document.getElementById('emailCliente').value;

            if (!nombreCliente || !emailCliente) {
                Swal.showValidationMessage('Por favor, completa todos los campos');
                return;
            }

            const cliente = {
                nombre: nombreCliente,
                email: emailCliente
            };

            const formData = {
                cliente: cliente,
                tratamientos: carrito,
                total: total
            };

            return formData;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = result.value;
            enviarFormulario(formData);
        }
    });
}


function enviarFormulario(formData) {
    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada exitosamente',
            text: 'El proceso de compra ha sido exitoso',
            showConfirmButton: false,
            timer: 2000
        });
        vaciarCarrito();
    }, 2000);
}





