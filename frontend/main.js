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
            card.style.animationDelay = `${index * 0.1}s`; // Efecto de cascada sutil al aparecer
            
            card.innerHTML = `
                <div class="product-img-placeholder">🧵</div>
                <div class="product-info">
                    <span class="cat">${p.categoria || 'Textil Premium'}</span>
                    <h3>${p.nombre || 'Insumo sin nombre'}</h3>
                    <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">Color: ${p.color || 'Varios'}</p>
                    <div class="product-footer">
                        <span class="price">$${p.precio || '0.00'}</span>
                        <button class="btn-add">Agregar al 🛒</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("No se pudo conectar a la API", error);
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: rgba(220, 38, 38, 0.05); border-radius: 16px; border: 1px solid rgba(220, 38, 38, 0.2);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔌</div>
                <h3 style="color: #fca5a5; margin-bottom: 1rem; font-family: 'Outfit';">Servidor Backend Apagado</h3>
                <p style="color: var(--text-secondary);">No nos logramos comunicar con la base de datos.<br>Por favor, asegúrate de correr tu proyecto <strong>BackendApplication</strong> desde NetBeans (Puerto 8080).</p>
            </div>
        `;
    }
}
