
const productosIniciales = [
    { id: 1, codigo: "GME001", nombre: "Zelda: Tears of Kingdom", precio: 59990, img: "https://images6.alphacoders.com/127/1276438.jpg" },
    { id: 2, codigo: "GME002", nombre: "God of War Ragnarok", precio: 49990, img: "https://images.alphacoders.com/118/1183377.jpg" },
    { id: 3, codigo: "GME003", nombre: "Elden Ring", precio: 44990, img: "https://images.alphacoders.com/114/1141381.jpg" }
];

const datosGeograficos = {
    "Metropolitana": ["Santiago", "San Miguel", "Providencia", "Las Condes"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

document.addEventListener("DOMContentLoaded", () => {

    const catalogo = document.getElementById("catalogo-dinamico");
    if (catalogo) {
        let productos = JSON.parse(localStorage.getItem("productosTienda")) || productosIniciales;
        catalogo.innerHTML = "";
        productos.forEach(p => {
            catalogo.innerHTML += `
                <article class="card-juego">
                    <img src="${p.img}" alt="${p.nombre}">
                    <h3>${p.nombre}</h3>
                    <p class="precio">$${p.precio.toLocaleString('es-CL')}</p>
                    <a href="detalle-producto.html" class="btn-accion" style="text-decoration:none; display:block; margin-bottom:5px;">Ver Detalle</a>
                    <button onclick="agregarAlCarrito(${p.id})" class="btn-accion">Añadir al Carrito</button>
                </article>
            `;
        });
    }

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    if (selectRegion && selectComuna) {
        Object.keys(datosGeograficos).forEach(region => {
            let opt = document.createElement("option");
            opt.value = region;
            opt.textContent = region;
            selectRegion.appendChild(opt);
        });

        selectRegion.addEventListener("change", () => {
            selectComuna.innerHTML = '<option value="">Seleccione Comuna...</option>';
            const comunas = datosGeograficos[selectRegion.value] || [];
            comunas.forEach(comuna => {
                let opt = document.createElement("option");
                opt.value = comuna;
                opt.textContent = comuna;
                selectComuna.appendChild(opt);
            });
        });
    }
});
