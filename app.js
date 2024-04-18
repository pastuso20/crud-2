const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://daite21:f8D7rmOmnOgqu4DE@cluster0.oq1hsjh.mongodb.net/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a MongoDB Atlas establecida');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB Atlas:', error);
});

// Definir el esquema y el modelo
const postSchema = new mongoose.Schema({
    name: String,
    username: String,
    createdAt: { type: Date, default: Date.now },
    description: String,
    reactions: { type: Number, default: 0 }
  });

const PostModel = mongoose.model('posts', postSchema);

// Ruta de ejemplo para crear un nuevo documento
app.get('/crear-post', async (req, res) => {
  try {
    const ejemplo = new PostModel({
        name: 'nombre',
        username : '@username',
        description: 'Some description',
        reactions: 100
    });
    await ejemplo.save();
    res.send('Ejemplo creado correctamente');
  } catch (error) {
    console.error('Error al crear el ejemplo:', error);
    res.status(500).send('Error al crear el ejemplo');
  }
});

// Ruta GET para obtener todas las publicaciones
app.get('/posts', async (req, res) => {
    try {
      const posts = await PostModel.find(); // Busca todas las publicaciones en la base de datos
      res.json(posts); // Devuelve las publicaciones como respuesta en formato JSON
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
  });
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
