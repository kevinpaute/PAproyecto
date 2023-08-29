const nodemailer = require('nodemailer');

function enviarCorreo(destinatario) {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'jhonmacias1999@gmail.com',
      pass: 'bygkfyupcbffuyni'
    }
  };
  
  const mensaje = {
    from: 'jhonmacias1999@gmail.com',
    to: destinatario,
    subject: 'Correo de pruebas',
    html: `<!DOCTYPE html>
      <html lang="es">
        <head>
          <link rel="stylesheet" href="style.css">
          <meta charset="UTF-8">
          <title>Correo de pruebas</title>
        </head>
        <body>
          <header>
            <h1>Este es un correo electrónico de pruebas</h1>
          </header>
          <main>
            <p style="color: tomato;">¡Hola!</p>
            <p>Este es un correo electrónico de pruebas enviado desde Nodemailer.</p>
            <p>¡Gracias por leerlo!</p>
          </main>
        </body>
      </html>`
  };

  const transport = nodemailer.createTransport(config);
  return transport.sendMail(mensaje);
}
enviarCorreo();
