// controllers/authController.js
const Usuario = require('../models/usuarioModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Usuario.findOne({ username });

    if (!user) {
        console.log(`Usuario ${username} no encontrado`);
        return res.status(500).json({ success: false, message: 'El usuario no existe' });
    }

    const isPasswordValid = await user.isCorrectPassword(password);

    if (isPasswordValid) {
      return res.status(200).json({ success: true, message: 'Usuario autenticado correctamente' });
    } else {
      return res.status(500).json({ success: false, message: 'Usuario y/o contraseña incorrectos' });
    }
    } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};
