const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagenSchema = new Schema({
  nombre: String, // Nombre de la imagen (opcional)
  ruta: String,   // Ruta donde se guarda la imagen en el servidor (por ejemplo, 'public/imagenes')
  filename: String // Nombre de archivo generado por multer
});

const Imagen = mongoose.model('Imagen', imagenSchema);

module.exports = Imagen;
