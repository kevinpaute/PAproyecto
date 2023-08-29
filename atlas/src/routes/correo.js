const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'jhonmacias1999@gmail.com',
    pass: 'bygkfyupcbffuyni'
  }
});

function enviarCorreo(mensaje) {
  return transporter.sendMail(mensaje);
}

module.exports = enviarCorreo;
