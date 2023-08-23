const Persona = require('../models/persona');

exports.obtenerPersonas = async (req, res) => {
  try {
    const personas = await Persona.find();
    const personasConUrlImagen = personas.map((persona) => {
      return {
        ...persona.toObject(),
        imagenUrl: `../imagenes/${persona.imagen}` // Aquí se construye la URL completa de la imagen
      };
    });
    res.json(personasConUrlImagen);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las personas' });
  }
};
