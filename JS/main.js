

async function fetchData() {
    try {
        const response = await fetch('API/data.json'); 
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json(); 

        localStorage.setItem('experiencias', JSON.stringify(data));
        renderData(data); 
    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }
}


function renderData(data) {
    const experienciaSection = document.querySelector('.contenido-centrado');

    experienciaSection.innerHTML = ''; 

    data.forEach(item => {
        const tarjetaDiv = document.createElement('div');
        tarjetaDiv.className = 'tarjeta';

        const imagenDiv = document.createElement('div');
        imagenDiv.className = 'imagen';
        const img = document.createElement('img');
        img.src = item.logo || ''; 
        img.alt = item.puesto;
        img.className = 'exp';
        imagenDiv.appendChild(img);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';

        const puestoH3 = document.createElement('h3');
        puestoH3.className = 'puesto';
        puestoH3.textContent = item.puesto;

        const empresaP = document.createElement('p');
        empresaP.className = 'empresa';
        empresaP.innerHTML = `<span>${item.empresa}</span>`;

        const descripcionP = document.createElement('p');
        descripcionP.className = 'descripcion';
        descripcionP.textContent = item.descripcion;

        contentDiv.appendChild(puestoH3);
        contentDiv.appendChild(empresaP);
        contentDiv.appendChild(descripcionP);

        tarjetaDiv.appendChild(imagenDiv);
        tarjetaDiv.appendChild(contentDiv);

        experienciaSection.appendChild(tarjetaDiv);
    });
}


function addExperienceToLocalStorage(experience) {
    let experiencias = JSON.parse(localStorage.getItem('experiencias')) || [];
    experiencias.push(experience);
    localStorage.setItem('experiencias', JSON.stringify(experiencias));
    renderData(experiencias); 
}


document.addEventListener('DOMContentLoaded', () => {
    const agregarBtn = document.querySelector('.btn-info');
    
    agregarBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Agregar Experiencia',
            html:
                '<input id="puesto" class="swal2-input" placeholder="Puesto">' +
                '<input id="empresa" class="swal2-input" placeholder="Empresa">' +
                '<input id="duracion" class="swal2-input" placeholder="Duración">' +
                '<textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>',
            confirmButtonText: 'Agregar',
            customClass: {
                confirmButton: 'custom-confirm-button'
            },
            focusConfirm: false,
            preConfirm: () => {
                const puesto = Swal.getPopup().querySelector('#puesto').value;
                const empresa = Swal.getPopup().querySelector('#empresa').value;
                const duracion = Swal.getPopup().querySelector('#duracion').value;
                const descripcion = Swal.getPopup().querySelector('#descripcion').value;
                
                if (!puesto || !empresa || !duracion || !descripcion) {
                    Swal.showValidationMessage(`Por favor completa todos los campos`);
                }
                
                return { puesto: puesto, empresa: empresa, duracion: duracion, descripcion: descripcion }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                
                addExperienceToLocalStorage(result.value);

                
                Swal.fire({
                    title: 'Experiencia Agregada',
                    text: `Puesto: ${result.value.puesto}\nEmpresa: ${result.value.empresa}\nDuración: ${result.value.duracion}\nDescripción: ${result.value.descripcion}`,
                    icon: 'success'
                });

                
                console.log('Puesto:', result.value.puesto);
                console.log('Empresa:', result.value.empresa);
                console.log('Duración:', result.value.duracion);
                console.log('Descripción:', result.value.descripcion);
            }
        });
    });
});


fetchData();





