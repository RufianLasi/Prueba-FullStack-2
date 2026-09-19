
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carritoTienda")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoTienda", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const elementosContador = document.querySelectorAll(".cart-count");
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    elementosContador.forEach(el => el.textContent = totalItems);
}

function agregarAlCarrito(idProducto) {
    let productos = JSON.parse(localStorage.getItem("productosTienda")) || productosIniciales;
    let prod = productos.find(p => p.id === idProducto);
    if (!prod) return;

    let carrito = obtenerCarrito();
    let item = carrito.find(i => i.id === idProducto);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
    }

    guardarCarrito(carrito);
    alert(`¡${prod.nombre} fue añadido al carrito!`);
}

function eliminarDelCarrito(idProducto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(i => i.id !== idProducto);
    guardarCarrito(carrito);
    renderizarTablaCarrito();
}

function renderizarTablaCarrito() {
    const tbody = document.getElementById("tablaCarritoBody");
    const totalElemento = document.getElementById("totalCarrito");
    if (!tbody) return;

    let carrito = obtenerCarrito();
    tbody.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">El carrito está vacío.</td></tr>`;
    } else {
        carrito.forEach(item => {
            let subtotal = item.precio * item.cantidad;
            total += subtotal;
            tbody.innerHTML += `
                <tr>
                    <td>${item.nombre}</td>
                    <td>$${item.precio.toLocaleString('es-CL')}</td>
                    <td>${item.cantidad}</td>
                    <td>$${subtotal.toLocaleString('es-CL')}</td>
                    <td><button onclick="eliminarDelCarrito(${item.id})" style="background-color:#ff4d4d; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Eliminar</button></td>
                </tr>
            `;
        });
    }

    if (totalElemento) {
        totalElemento.textContent = `$${total.toLocaleString('es-CL')}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarTablaCarrito();
});