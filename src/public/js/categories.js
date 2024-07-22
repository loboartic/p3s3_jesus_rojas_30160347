let buttonsEditar = document.querySelectorAll('#edit');
let buttonsBorrar = document.querySelectorAll('#delete');

buttonsEditar.forEach((button) => {
    button.addEventListener('click', handleEdit);
});

buttonsBorrar.forEach((button) => {
    button.addEventListener('click', handleDelete);
});

function handleEdit(event) {
    console.log(
        event.target.parentElement.parentElement.getAttribute('data-categorie')
    );
    console.log('Dentro de editar');
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
