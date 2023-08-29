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
        html: ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div style="background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <div style="background-color: #cccccc; width: 80%; max-width: 600px; border-radius: 8px; padding: 20px; text-align: center;">
                    <div class="card" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); padding: 20px; text-align: center; transform: translateZ(0); transition: transform 0.3s;">
                        <div class="card-image" style="display: flex; justify-content: center; margin-bottom: 20px;">
                            <img src="logo.png" height="50px" width="100px" style="border-radius: 50%;">
                        </div>
                        <h1 style="font-size: 24px; color: #333333;">Registro Exitoso</h1>
                        <span style="color: #333333;">¡Felicitaciones!</span>
                        <p><b style="font-size: 16px; color: #666666;">Pronto le llegará un correo confirmando sus datos</b></p>
                        <p style="color: red;">Los mensajes pueden tardar entre uno a tres días laborables</p>
                        
                        <p>En resumen, <span style="font-family: Georgia, 'Times New Roman', Times, serif; color: #333333;">"GRAND THEF AUTO"</span> se destaca como una concesionaria de alquiler de autos que combina la calidad, la estética y los precios asequibles para ofrecer a sus clientes una experiencia excepcional. Ya sea para un viaje de negocios, unas vacaciones en familia o simplemente para disfrutar de la conducción de un auto de calidad, esta concesionaria se ha ganado una reputación sólida como la opción ideal para aquellos que buscan autos buenos, bonitos y baratos.</p>
                    </div>
                </div>
            </div>
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
  const {nombres,apellidos,cedula,email,teléfono,dirección,genero,vehiculoarentar,costos} = req.body;
  userSchema
  .updateOne({_id:id},{$set:{nombres,apellidos,cedula,email,teléfono,dirección,genero,vehiculoarentar,costos}})
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





module.exports=route;