
async function fetchData() {
    try {
        const response = await fetch('API/data.json'); 
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json(); 
        renderData(data); 
    } catch (error) {
        console.error('Hubo un problema con la petición:', error);
    }
}


function renderData(data) {
    const experienciaSection = document.querySelector('.contenido-centrado');

    data.forEach(item => {
        const tarjetaDiv = document.createElement('div');
        tarjetaDiv.className = 'tarjeta';

        const imagenDiv = document.createElement('div');
        imagenDiv.className = 'imagen';
        const img = document.createElement('img');
        img.src = item.logo; // Logo desde el JSON
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

fetchData();



