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

            // Formateo de precio inicial
            const formatter = new Intl.NumberFormat('es-CO', {
                style: 'currency', currency: 'COP', minimumFractionDigits: 0
            });
            const formattedPrice = formatter.format(p.precio || 0);

            // 1. Selector de COLOR (Común para Hilos, Cremalleras, Hilazas, Cintas)
            let colorDisplay = '';
            const categoriesWithColor = ['Hilos', 'Cremalleras', 'Hilazas', 'Cintas de tela'];
            
            if (categoriesWithColor.includes(p.categoria)) {
                const placeholder = p.categoria === 'Hilos' ? 'Indicar número de hilo' : 'Indicar color';
                colorDisplay = `
                    <div class="color-selector">
                        <label style="font-size: 0.8rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem;">Color:</label>
                        <select class="color-dropdown" onchange="handleColorChange(this, '${p.idReferencia}')">
                            <option value="Blanco">Blanco</option>
                            <option value="Negro">Negro</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Amarillo">Amarillo</option>
                            <option value="Otro">Otro (Escribir...)</option>
                        </select>
                        <input type="text" id="custom-color-${p.idReferencia}" class="custom-color-input" placeholder="${placeholder}" style="display: none;">
                    </div>
                `;
            } else {
                colorDisplay = `<p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Atributo: ${p.color || 'Estándar'}</p>`;
            }

            // 2. Selector de TIPO (Solo para Cremalleras)
            let typeDisplay = '';
            if (p.categoria === 'Cremalleras') {
                typeDisplay = `
                    <div class="type-selector" style="margin-bottom: 1rem;">
                        <label style="font-size: 0.8rem; color: var(--text-secondary); display: block; margin-bottom: 0.4rem;">Tipo de Cremallera:</label>
                        <select class="color-dropdown" onchange="handleTypeChange(this, '${p.idReferencia}')">
                            <option value="2000">Cremallera Invisible</option>
                            <option value="2000">Cremallera Nylon</option>
                            <option value="2000">Cremallera Plástica</option>
                            <option value="12000">Cremallera Metálica</option>
                        </select>
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
                    ${typeDisplay}
                    ${colorDisplay}
                    <div class="product-footer">
                        <span class="price" id="price-${p.idReferencia}">${formattedPrice}</span>
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

// Función para manejar el cambio de tipo de cremallera y actualizar precio
window.handleTypeChange = (select, id) => {
    const priceElement = document.getElementById(`price-${id}`);
    const priceValue = parseInt(select.value);
    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0
    }).format(priceValue);
    priceElement.textContent = formattedPrice;
};
