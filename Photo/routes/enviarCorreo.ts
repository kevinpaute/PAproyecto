import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'jhonmacias1999@gmail.com',
    pass: 'bygkfyupcbffuyni'
  }
});

function enviarCorreo(mensaje: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> {
  return transporter.sendMail(mensaje);
}

export default enviarCorreo;
