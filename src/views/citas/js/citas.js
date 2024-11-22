let citas = [];

function addCita(clienteId, servicio, fecha, hora) {
    const nuevaCita = {
        id: citas.length + 1,
        clienteId: clienteId,
        servicio: servicio,
        fecha: fecha,
        hora: hora,
        estado: 'programada'
    };
    citas.push(nuevaCita);
    return nuevaCita;
}

function displayCitas() {
    const adminServicesList = document.getElementById('admin-services-list');
    adminServicesList.innerHTML = ''; 
    citas.forEach(cita => {
        const citaCard = document.createElement('div');
        citaCard.className = 'admin-service-card';
        citaCard.innerHTML = `
            <h4>${cita.servicio}</h4>
            <p>Fecha: ${cita.fecha}</p>
            <p>Hora: ${cita.hora}</p>
            <p>Estado: ${cita.estado}</p>
            <button onclick="editCita(${cita.id})">Editar</button>
        `;
        adminServicesList.appendChild(citaCard);
    });
}

function editCita(id) {
    const cita = citas.find(c => c.id === id);
    if (cita) {
        document.getElementById('edit-status').value = cita.estado;
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';

        document.getElementById('edit-form').onsubmit = (e) => {
            e.preventDefault();
            const estado = document.getElementById('edit-status').value;
            cita.estado = estado;
            displayCitas();
            closeModal();
        };
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.getElementById('reservation-form').onsubmit = (e) => {
    e.preventDefault();

    const servicio = document.getElementById('service').value;
    const fecha = document.getElementById('date').value;
    const hora = document.getElementById('time').value;

    if (servicio && fecha && hora) {
        const clienteId = Date.now(); 
        addCita(clienteId, servicio, fecha, hora);
        displayCitas(); 
    }
};

displayCitas();
