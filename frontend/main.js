// --- Fetch logic to Spring Boot Backend ---
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    const grid = document.getElementById('product-grid');
    try {
        // Hacemos la peticion al Backend Java en el puerto local 8080
        const response = await fetch('http://localhost:8080/api/productos');
        
        if (!response.ok) {
            throw new Error('Error al conectar con servidor ' + response.status);
        }
        
        const products = await response.json();
        grid.innerHTML = ''; // Limpiar el estado de carga

        if(products.length === 0) {
            // Placeholder estilizado cuando la BD está vacía
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; border: 1px dashed var(--glass-border); border-radius: 16px;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🪡</div>
                    <h3 style="color: #fff; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;">Catálogo Vacío</h3>
                    <p style="color: var(--text-secondary);">Aún no hay insumos textiles guardados en tu base de datos.<br>Añade un producto en MySQL para verlo aparecer aquí mágicamente.</p>
                </div>
            `;
            return;
        }

        // Renderizamos cada producto iterando el arreglo devuelto por Java
        products.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'product-card animate-up';
            card.style.animationDelay = `${index * 0.1}s`;

            // Formateo de precio a COP (ej. 2700 -> $2.700)
            const formattedPrice = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(p.precio || 0);

            // Lógica para el selector de color en Hilos
            let colorDisplay = `<p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Color: ${p.color || 'Varios'}</p>`;
            
            if (p.categoria === 'Hilos') {
                colorDisplay = `
                    <div class="color-selector">
                        <label style="font-size: 0.8rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem;">Seleccionar Color:</label>
                        <select class="color-dropdown" onchange="handleColorChange(this, '${p.idReferencia}')">
                            <option value="Blanco">Blanco</option>
                            <option value="Negro">Negro</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Amarillo">Amarillo</option>
                            <option value="Otro">Otro (Indicar número)</option>
                        </select>
                        <input type="text" id="custom-color-${p.idReferencia}" class="custom-color-input" placeholder="Indicar número de hilo" style="display: none;">
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="product-img-container">
                    <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.nombre}" class="product-img">
                </div>
                <div class="product-info">
                    <span class="cat">${p.categoria || 'Textil Premium'}</span>
                    <h3>${p.nombre || 'Insumo sin nombre'}</h3>
                    ${colorDisplay}
                    <div class="product-footer">
                        <span class="price">${formattedPrice}</span>
                        <button class="btn-add">Agregar al 🛒</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("No se pudo conectar a la API", error);
        // ... error message ...
    }
}

// Función global para manejar el cambio de color
window.handleColorChange = (select, id) => {
    const customInput = document.getElementById(`custom-color-${id}`);
    if (select.value === 'Otro') {
        customInput.style.display = 'block';
        customInput.focus();
    } else {
        customInput.style.display = 'none';
    }
};
