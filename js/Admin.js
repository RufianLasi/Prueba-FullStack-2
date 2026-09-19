
document.addEventListener("DOMContentLoaded", () => {
    const formNuevoProducto = document.getElementById("formNuevoProducto");

    if (formNuevoProducto) {
        formNuevoProducto.addEventListener("submit", (e) => {
            e.preventDefault();

            const codigo = document.getElementById("prodCodigo").value.trim();
            const nombre = document.getElementById("prodNombre").value.trim();
            const precio = parseFloat(document.getElementById("prodPrecio").value);
            const stock = parseInt(document.getElementById("prodStock").value);
            const stockCritico = parseInt(document.getElementById("prodStockCritico").value);

            document.querySelectorAll(".mensaje-error").forEach(el => el.textContent = "");
            let esValido = true;

            if (codigo.length < 3) {
                document.getElementById("errorProdCodigo").textContent = "El código debe tener al menos 3 caracteres.";
                esValido = false;
            }
            if (nombre === "") {
                document.getElementById("errorProdNombre").textContent = "El nombre es obligatorio.";
                esValido = false;
            }
            if (isNaN(precio) || precio < 0) {
                document.getElementById("errorProdPrecio").textContent = "Ingrese un precio válido.";
                esValido = false;
            }
            if (isNaN(stock) || stock < 0) {
                document.getElementById("errorProdStock").textContent = "Ingrese un valor de stock válido.";
                esValido = false;
            }

            if (esValido) {
                if (stock <= stockCritico) {
                    alert(`ADVERTENCIA DE INVENTARIO: El stock ingresado (${stock}) es igual o inferior al Stock Crítico (${stockCritico}).`);
                }

                let productosGuardados = JSON.parse(localStorage.getItem("productosTienda")) || productosIniciales;
                productosGuardados.push({
                    id: Date.now(),
                    codigo: codigo,
                    nombre: nombre,
                    precio: precio,
                    stock: stock,
                    stockCritico: stockCritico,
                    img: "https://images6.alphacoders.com/127/1276438.jpg"
                });

                localStorage.setItem("productosTienda", JSON.stringify(productosGuardados));
                document.getElementById("mensajeAdminExito").textContent = "¡Producto registrado exitosamente!";
                formNuevoProducto.reset();
            }
        });
    }
});