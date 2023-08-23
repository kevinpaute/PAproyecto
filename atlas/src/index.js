const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Importar el módulo 'path' de Node.js
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//require("dotenv").config();
const userRoutes = require("./routes/user");
const imagenRoutes = require('./routes/imageRoutes'); 
const imagenes = require('./imagenes'); 
const cors = require('cors');

const app = express();
const port =  9000;

// Middleware
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json())
app.use('/api', userRoutes);
app.use('/api', imagenRoutes);
app.use('/api', imagenes);

// Router
app.get('/', (req, res) => {
    res.send("Bienvenido a la JAPI");
});

// MongoDB conexión
const MONGODB_URI2 = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Iniciar servidor y escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
