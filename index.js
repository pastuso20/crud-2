document.getElementById('input-post').value = "";

const updateAction = document.getElementById('action-update');

let menuButtonPost = document.getElementById('menu-button');
if (window.innerWidth < 868) menuButtonPost.innerHTML = '<i class="fa-solid fa-feather"></i>';
window.addEventListener('resize', () => {
    if (window.innerWidth < 868) {
        menuButtonPost.innerHTML = '<button><i class="fa-solid fa-feather"></i></button>';
    } else {
        menuButtonPost.innerHTML = '<button>Postear</button>';
    }
});

let buttonNewPost = document.getElementById('b-newpost');
console.log(buttonNewPost);

buttonNewPost.addEventListener('click', function (event) {
    event.preventDefault();

    // Obtén el valor del textarea
    let description = document.getElementById('input-post').value;

    // Define los datos que quieres enviar
    let data = {
        name: 'Alvaro Hurtado',
        username: '@programadorAH540',
        reactions: 0,
        description: description
    };

    console.log(data);

    // Haz la solicitud POST
    fetch('https://api-crud-qrd4.onrender.com/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });

    document.getElementById('input-post').value = "";
});





/* traer los datos */
fetch('https://api-crud-qrd4.onrender.com/posts')
    .then(res => res.json())
    .then(data => {
        // Iterar sobre cada objeto en el array de datos
        data.forEach(post => {
            // Crear un nuevo elemento div con la clase 'onepost'
            const postDiv = document.createElement('div');
            const Allposts = document.getElementById('allpost');
            postDiv.classList.add('onepost');

            // Crear la estructura HTML interna con los datos del post actual
            postDiv.innerHTML = `
        <div class="avatar-container">
          <div class="img-container">
            <img src=${'https://robohash.org/' + post.name} alt="imagen-2024-04-18-090123651">
          </div>
        </div>
        <div class="name-container">
          <p id="post-name">${post.name}</p>
          <p id="post-username">${post.username}</p>
          <p id="post-date">${post.createdAt}</p>
          <p id="__id" class="__id">${post._id}</p>
        </div>
        <div class="description-container">
          <p id="post-description">${post.description}</p>
        </div>
        <div class="actions-container">
          <div class="action">
            <i class="fa-solid fa-heart"></i>
            <p id="post-reactions">${post.reactions}</p>
          </div>
          <div class="action">
            <i class="fa-solid fa-pen-to-square" title="editar"></i>
            <i class="fa-solid fa-trash" title="editar"></i>
          </div>
        </div>
      `;

            // Agregar el nuevo elemento div al cuerpo del documento (o a cualquier otro contenedor deseado)
            Allposts.appendChild(postDiv);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));


// Obtener el contenedor donde se agregarán los fragmentos
const contenedor = document.getElementById("whatsup");

// Obtener el contenedor donde se agregarán los fragmentos

// Realizar la solicitud de la API y procesar los datos
fetch('https://dummyjson.com/comments')
    .then(res => res.json())
    .then(data => {
        // Obtener los primeros 10 comentarios aleatorios
        const comments = data.comments.slice(0, 10);

        // Iterar sobre los comentarios obtenidos
        comments.forEach(item => {
            // Crear un nuevo elemento div para el fragmento
            const fragmento = document.createElement('div');
            fragmento.classList.add('item');

            // Rellenar el fragmento con los datos correspondientes
            fragmento.innerHTML = `
        <p class="item-name">${item.user.username}</p>
        <p class="item-comentario">${item.body}</p>
      `;

            // Agregar el fragmento al contenedor
            contenedor.appendChild(fragmento);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));


const allPost = document.getElementById('allpost');
allPost.addEventListener('click', (e) => {
    console.log(e.target.parentElement.parentElement);
    console.log(e.target);


    // Verificar si se hizo clic en un botón de acción
    if (e.target.parentElement.classList.contains('action')) {
        // Encontrar el contenedor 'onepost' más cercano al botón de acción
        const onepost = e.target.closest('.onepost');

        // Verificar si se encontró el contenedor 'onepost'
        if (onepost) {
            // Encontrar el elemento '__id' dentro de 'name-container' del 'onepost' actual
            const idElement = onepost.querySelector('.name-container .__id');

            // Verificar si se encontró el elemento '__id'
            if (idElement) {
                // Recuperar el valor almacenado en '__id'
                const idValue = idElement.textContent;

                // Hacer lo que necesites con el valor recuperado
                console.log('Valor de __id:', idValue);
                console.log(e.target.id);
                if(e.target.id == 'action-delete'){
                    console.log('BORRAR');
                }

                if(e.target.id == 'action-update'){
                    console.log('ACTUALIZAR');
                }

            }
        }
    }
});
