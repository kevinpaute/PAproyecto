const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Imagen = require('../models/imagen'); // Importa el modelo de Imagen

// Configurar Multer para manejar el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imagenes'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const nombreArchivo = file.fieldname + '-' + Date.now() + extension;
    cb(null, nombreArchivo); // Nombre de archivo personalizado
  }
});

const upload = multer({ storage: storage });

// Ruta para cargar imágenes
router.post('/imagen', upload.single('imagen'), async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const nuevaImagen = new Imagen({
      nombre: originalname,
      ruta: 'imagenes',
      filename: filename
    });
    await nuevaImagen.save();

    res.json({ message: 'Imagen cargada exitosamente', filename: filename });
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar la imagen' });
  }
});

module.exports = router;
