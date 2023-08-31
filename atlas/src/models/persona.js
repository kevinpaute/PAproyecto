const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personaSchema = new Schema({
  nombres: String,
  apellidos: String,
  imagen: String, // Campo para almacenar el nombre del archivo de la imagen en MongoDB
});

const Persona = mongoose.model('Persona', personaSchema);

module.exports = Persona;