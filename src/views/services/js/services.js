// Elementos del DOM
const servicesList = document.getElementById('services-list');
const adminServicesList = document.getElementById('admin-services-list');
const addServiceButton = document.getElementById('add-service-button');
const addServiceModal = document.getElementById('add-service-modal');
const closeModalButton = document.getElementById('close-modal');
const saveServiceButton = document.getElementById('save-service');

// Función para cargar servicios desde la API
function loadServices() {
    fetch('http://localhost:5000/api/services')
        .then(response => response.json())
        .then(services => {
            servicesList.innerHTML = '';
            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.classList.add('service-card');
                serviceCard.innerHTML = `
                    <h3>${service.name}</h3>
                    <p>Categoría: ${service.category}</p>
                    <p>Precio: $${service.price}</p>
                `;
                servicesList.appendChild(serviceCard);
            });
        });
}

// Función para cargar los servicios en el panel de administración
function loadAdminServices() {
    fetch('http://localhost:5000/api/services')
        .then(response => response.json())
        .then(services => {
            adminServicesList.innerHTML = '';
            services.forEach(service => {
                const serviceCard = document.createElement('div');
                serviceCard.classList.add('admin-service-card');
                serviceCard.innerHTML = `
                    <h3>${service.name}</h3>
                    <p>Categoria: ${service.category}</p>
                    <p>Precio: $${service.price}</p>
                    <button onclick="deleteService('${service._id}')">Eliminar</button>
                `;
                adminServicesList.appendChild(serviceCard);
            });
        });
}

// Función para eliminar servicio
function deleteService(id) {
    fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
    }).then(() => loadAdminServices());
}

// Mostrar modal de agregar servicio
addServiceButton.addEventListener('click', () => {
    addServiceModal.style.display = 'flex';
});

// Cerrar el modal
closeModalButton.addEventListener('click', () => {
    addServiceModal.style.display = 'none';
});

// Guardar nuevo servicio
saveServiceButton.addEventListener('click', () => {
    const name = document.getElementById('service-name').value;
    const category = document.getElementById('service-category').value;
    const price = document.getElementById('service-price').value;

    fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category, price }),
    }).then(() => {
        loadAdminServices();
        addServiceModal.style.display = 'none';
    });
});

// Cargar servicios al iniciar
loadServices();
loadAdminServices();
