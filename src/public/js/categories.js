// ----- SELECTORES ----
let buttonsEditar = document.querySelectorAll('#edit');
let buttonsBorrar = document.querySelectorAll('#delete');
let buttonsGuardar = document.querySelectorAll('#save');

// ----- EVENTOS ----
buttonsEditar.forEach((button) => {
    button.addEventListener('click', handleEdit);
});

buttonsBorrar.forEach((button) => {
    button.addEventListener('click', handleDelete);
});

buttonsGuardar.forEach((button) => {
    button.addEventListener('click', handleSave);
});

// ----- FUNCIONES ----
function handleEdit(event) {
    // Se oculta el boton de editar
    event.target.classList.add('d-none');

    // Se muestra el boton de guardado
    event.target.parentElement.parentElement.querySelector('#save').classList.remove('d-none');

    // Se obtiene el id y el texto content
    const id =
        event.target.parentElement.parentElement.getAttribute('data-categorie');
    const name =
        event.target.parentElement.parentElement.children[0].textContent;

    // Verificamos si trajo un id
    if (!id) {
        return;
    }

    // Se crea el input para enviar sus valores al backend
    const input = document.createElement('INPUT');
    input.classList.add('form-control');
    input.value = name;

    // Se vácia la celda y se agrega el input
    event.target.parentElement.parentElement.children[0].textContent = '';
    event.target.parentElement.parentElement.children[0].appendChild(input);
}

async function handleSave(event) {
    const id =
        event.target.parentElement.parentElement.getAttribute('data-categorie');

    const name = event.target.parentElement.parentElement.querySelector('input').value
    
    console.log(name)
    // Verificamos si trajo un id
    if (!id || !name) {
        return;
    }

    // Construimos la data con el id a eliminar
    const data = { id: parseInt(id), newName: name };

    // Hacer petición al backend
    const sendData = await fetch('/categories/update', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Parseamos la data
    const result = await sendData.json();
    console.log(result)


    // Verificamos si fue eliminado
    if (result.isEdit) {
        // Recargamos la página
        window.location.reload()
    }
}

async function handleDelete(event) {
    const id =
        event.target.parentElement.parentElement.getAttribute('data-categorie');

    // Verificamos si trajo un id
    if (!id) {
        return;
    }

    // Construimos la data con el id a eliminar
    const data = { id: parseInt(id) };

    // Hacer petición al backend
    const sendData = await fetch('/categories/delete', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Parseamos la data
    const result = await sendData.json();

    // Verificamos si fue eliminado
    if (result.isDelete) {
        // Simulamos el eliminado de la categoria
        event.target.parentElement.parentElement.remove();
    }
}
