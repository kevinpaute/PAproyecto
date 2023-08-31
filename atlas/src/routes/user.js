const express = require('express');

const userSchema= require("../models/user");
const route =  express.Router();
const enviarCorreo = require("./correo");



//definir las rutas endPoint

//crear usuario
// route.post('/users',(req,res)=>{
//   const user= userSchema(req.body);
//   user
//   .save()
//   .then((data) =>res.json(data))
//   .catch((error)=>res.json({message:error}));

// });

// Ruta para crear un usuario
route.post('/users', (req, res) => {
  const user = new userSchema(req.body);
  user.save()
    .then((data) => {
      const mensaje = {
        from: "jhonmacias1999@gmail.com", // Reemplaza con tu dirección de correo electrónico
        to: data.email, // Usamos el correo del usuario registrado
        subject: "Registro exitoso",
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

      enviarCorreo(mensaje)
        .then(info => {
          console.log("Correo enviado: " + info.response);
          res.json({ status: 'Registro Exitoso y correo enviado', data });
        })
        .catch(error => {
          console.log(error);
          res.json({ status: 'Registro Exitoso pero no se pudo enviar el correo', data });
        });
    })
    .catch((error) => res.json({ message: error }));
});



//obtener todos los usuarios
route.get('/users',(req,res)=>{
  
  userSchema
  .find()
  .then((data) =>res.json(data))
  .catch((error)=>res.json({message:error}));

});


route.get('/personas',(req,res)=>{
  
  userSchema
  .find()
  .then((data) =>res.json(data))
  .catch((error)=>res.json({message:error}));

});

//obtener por id:
route.get('/users/:id',(req,res)=>{
  //obtener el id desde el objeto de la peticion
  const {id}=req.params;
  userSchema
  .findById(id)
  .then((data) =>res.json(data))
  .catch((error)=>res.json({message:error}));

});

//actualizar
route.put('/users/:id',(req,res)=>{
  //obtener el id desde el objeto de la peticion
  const {id}=req.params;
  const {nombres,apellidos,cedula,email,telefono,direccion,genero,vehiculoarentar,costos,estado} = req.body;
  userSchema
  .updateOne({_id:id},{$set:{nombres,apellidos,cedula,email,telefono,direccion,genero,vehiculoarentar,costos,estado}})
  .then((data) =>res.json(data))
  .catch((error)=>res.json({message:error}));

});

//eliminar
route.delete('/users/:id',(req,res)=>{
  //obtener el id desde el objeto de la peticion
  const {id}=req.params;
  userSchema
  .deleteOne({_id:id})
  .then((data) =>res.json(data))
  .catch((error)=>res.json({message:error}));

});

//traer los esperando:
// Obtener usuarios con estado "esperando"
route.get('/users/estado/esperando', (req, res) => {
  userSchema
    .find({ estado: 'esperando' })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

route.get('/users/estado/activo', (req, res) => {
  userSchema
    .find({ estado: 'activo' })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

route.get('/users/estado/inactivo', (req, res) => {
  userSchema
    .find({ estado: 'inactivo' })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//insertar registro 





module.exports=route;