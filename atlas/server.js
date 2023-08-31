require('dotenv').config(); // Cargar variables de entorno desde .env

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://jhonzambrano:espe123@atlascluster.lwave.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usuario = mongoose.model('usuarios', {
  username: String,
  password: String,
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usuario.findOne({ username, password }).exec();
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
