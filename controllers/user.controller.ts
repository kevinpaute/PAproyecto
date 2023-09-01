import { Request, Response } from 'express';
import enviarCorreo from '../routes/enviarCorreo';
import Usuario from '../models/Usuario';
import nodemailer from 'nodemailer';

export async function createUser(req: Request, res: Response): Promise<Response> {
    const { nombres, apellidos, cedula, email, telefono, direccion, genero, vehiculoarentar, costos, estado } = req.body;

    try {
        // Verificar si ya existe un usuario con la misma cédula o correo electrónico
        const existingUser = await Usuario.findOne({ $or: [{ cedula }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Cédula o correo electrónico ya existen' });
        }

        // Si no existe, crear el nuevo usuario
        const newUser = new Usuario({
            nombres,
            apellidos,
            cedula,
            email,
            telefono,
            direccion,
            genero,
            vehiculoarentar,
            costos,
            estado
        });

        const savedUser = await newUser.save();

        const mensaje = {
            from: 'jhonmacias1999@gmail.com',
            to: newUser.email,
            subject: 'Registro exitoso',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registro Exitoso</title>
            </head>
            <style>
                body {
                    background-color: #f2f2f2;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }
            
                .card {
                    width: 300px;
                    background-color: #87CEEB; /* Color de fondo celeste */
                    border: 1px solid #666666; /* Borde gris */
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    text-align: center;
                    transform: translateZ(0);
                    transition: transform 0.3s;
                }
            
                .card:hover {
                    transform: translateY(-4px);
                }
            
                h1 {
                    font-size: 24px;
                    color: #333333;
                }
            
                p {
                    font-size: 16px;
                    color: #666666;
                    line-height: 1.5;
                }
            
                p.color-red {
                    color: red;
                }
            
                .card-image {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
            
                .card-image img {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                }
            </style>
            <body>
                <div class="card">
                    <div class="card-image">
                        <img src="https://i.ibb.co/NWDRjh0/logo.png" />
                    </div>
                    <h1>Registro Exitoso</h1><br>
                    <span>¡Felicitaciones! ${nombres}</span>
                    <p><b>Pronto le llegará un correo confirmando sus datos</b></p>
                    <p class="color-red">Los mensajes pueden tardar entre uno a tres días laborables</p>
                    
                    <p>En resumen, <span>"GRAND THEF AUTO"</span> se destaca como una concesionaria de alquiler de autos que combina la calidad, la estética y los precios asequibles para ofrecer a sus clientes una experiencia excepcional. Ya sea para un viaje de negocios, unas vacaciones en familia o simplemente para disfrutar de la conducción de un auto de calidad, esta concesionaria se ha ganado una reputación sólida
                         como la opción ideal para aquellos que buscan autos buenos, bonitos y baratos.</p>
                </div>  
            </body>
            </html>
            `
        };

        await enviarCorreo(mensaje);

        return res.json({ status: 'Registro Exitoso y correo enviado', user: savedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
};

//optener todos los usuarios
export async function getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
        const users = await Usuario.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
    }
}

//optener por ID:
export async function getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
        const user = await Usuario.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user by ID', error });
    }
}

//usuario activo:
export async function getUsersWithActiveStatus(req: Request, res: Response): Promise<Response> {
    try {
        const users = await Usuario.find({ estado: 'activo' });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users with estado: activo', error });
    }
}

//inactivo:
export async function getUsersWithInactiveStatus(req: Request, res: Response): Promise<Response> {
    try {
        const users = await Usuario.find({ estado: 'inactivo' });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users with estado: inactivo', error });
    }
}

//esperando:
export async function getUsersWithPendingStatus(req: Request, res: Response): Promise<Response> {
    try {
        const users = await Usuario.find({ estado: 'esperando' });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users with estado: esperando', error });
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombres, apellidos, cedula, email, telefono, direccion, genero, vehiculoarentar, costos, estado } = req.body;

    try {
        const updatedUser = await Usuario.findByIdAndUpdate(
            id,
            {
                nombres,
                apellidos,
                cedula,
                email,
                telefono,
                direccion,
                genero,
                vehiculoarentar,
                costos,
                estado
            },
            { new: true } // Devuelve el usuario actualizado
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const mensaje = {
            from: 'jhonmacias1999@gmail.com',
            to: updatedUser.email,
            subject: 'Actualización de perfil',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
                body {
                  background-color: #f2f2f2;
                  font-family: Arial, sans-serif;
                }
            
                .card {
                  width: 300px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  padding: 20px;
                  margin: 20px auto;
                  text-align: center;
                  transform: translateZ(0);
                  transition: transform 0.3s;
                }
            
                .card:hover {
                  transform: translateY(-4px);
                }
            
                h1 {
                  font-size: 24px;
                  color: #333333;
                }
            
                p {
                  font-size: 16px;
                  color: #666666;
                }
            
                .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4CAF50;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  transition: background-color 0.3s;
                }
            
                .btn:hover {
                  background-color: #45a049;
                }
            
                .card-image {
                  display: flex;
                  justify-content: center;
                  margin-bottom: 20px;
                }
            
                .card-image img {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                }
            
                a {
                  font-family: Georgia, 'Times New Roman', Times, serif;
                  color: #333333;
                  font-style: none;
                  text-decoration: none;
                }
            </style>
            
              </style>
            <body>
                <div class="card">
                  <div class="card-image">
                    <img src="logo.png" height="50px" width="100px">
                  </div>
                  
                  <span>¡Felicitaciones!</span>
                  <p><b>Nuestro sistema ha valido sus datos</b></p>
                  <p style="color: rgb(0, 255, 42);">Ya puede realizar el pago</p>
                  <span> En el siguiente enlace puede ir a realizar el pago</span>
                  <h3>Datos para realizar pago</h3>
                  <p>
                    Cuenta Banco Pichincha: 2205509012
                    Nombre: Alquiler Autos S.A. 
                    RUC: 1716434970001
                  </p>
                  <p> <a href="http://localhost:9524/fotos/${id}">Procer con el pago</a></p>
                  
                  
                  <p>En resumen, <span>"GRAND THEF AUTO"</span> se destaca como una concesionaria de alquiler de autos que combina la calidad, la estética y los precios asequibles para ofrecer a sus clientes una experiencia excepcional. Ya sea para un viaje de negocios, unas vacaciones en familia o simplemente para disfrutar de la conducción de un auto de calidad, esta concesionaria se ha ganado una reputación sólida
                     como la opción ideal para aquellos que buscan autos buenos, bonitos y baratos.</p>
                  
                </div>  
            </body>
            </html>
            `
        };

        await enviarCorreo(mensaje);

        return res.json({ status: 'Actualización Exitosa y correo enviado', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user', error });
    }
}


export async function enviarPago(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    

    try {
        const mensaje = {
            from: 'jhonmacias1999@gmail.com',
            to: email,
            subject: 'Pago exitoso',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
                body {
                  background-color: #f2f2f2;
                  font-family: Arial, sans-serif;
                }
            
                .card {
                  width: 300px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  padding: 20px;
                  margin: 20px auto;
                  text-align: center;
                  transform: translateZ(0);
                  transition: transform 0.3s;
                }
            
                .card:hover {
                  transform: translateY(-4px);
                }
            
                h1 {
                  font-size: 24px;
                  color: #333333;
                }
            
                p {
                  font-size: 16px;
                  color: #666666;
                }
            
                .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4CAF50;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  transition: background-color 0.3s;
                }
            
                .btn:hover {
                  background-color: #45a049;
                }
            
                .card-image {
                  display: flex;
                  justify-content: center;
                  margin-bottom: 20px;
                }
            
                .card-image img {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                }
            
                a {
                  font-family: Georgia, 'Times New Roman', Times, serif;
                  color: #333333;
                  font-style: none;
                  text-decoration: none;
                }
            </style>
            
              </style>
            <body>
                <div class="card">
                  <div class="card-image">
                    <img src="logo.png" height="50px" width="100px">
                  </div>
                  
                  <span>¡Felicitaciones!</span>
                  <p><b>Su pago se ha realziado correctamente</b></p>
                  <p style="color: rgb(49, 52, 221);">Pronto le llegará un correo con la factura correspondiete</p>
                  <p style="color: rgb(221, 49, 49);">Si su pago no llega dentro de 24 horas comunicarse con</p>
                  <span style="color: chartreuse;">grandtheauto@gmail.com/span>
                  
                  
                  
                  <p>En resumen, <span>"GRAND THEF AUTO"</span> se destaca como una concesionaria de alquiler de autos que combina la calidad, la estética y los precios asequibles para ofrecer a sus clientes una experiencia excepcional. Ya sea para un viaje de negocios, unas vacaciones en familia o simplemente para disfrutar de la conducción de un auto de calidad, esta concesionaria se ha ganado una reputación sólida
                     como la opción ideal para aquellos que buscan autos buenos, bonitos y baratos.</p>
                  
                </div>  
            </body>
            </html>`
        };

        await enviarCorreo(mensaje);

        return res.json({ status: 'Correo de pago enviado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending payment email', error });
    }
}
export async function eliminarUsuarioPorId(id: string): Promise<void> {
    try {
        // Busca al usuario por su ID y elimínalo
        const deletedUser = await Usuario.findByIdAndDelete(id);

        if (!deletedUser) {
            throw new Error('User not found'); // Si no se encuentra el usuario, lanza un error
        }
    } catch (error) { // Aquí indicamos explícitamente el tipo 'Error'
        throw new Error(`Error deleting user: ${(error as Error).message}`);
    }
}

export async function eliminarUsuarioYEnviarCorreo(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.body;

    try {
        // Primero eliminamos al usuario por su ID
        await eliminarUsuarioPorId(id);

        // Luego enviamos el correo
        const mensaje = {
            from: 'jhonmacias1999@gmail.com',
            to: email,
            subject: 'Usuario eliminado',
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
                body {
                  background-color: #f2f2f2;
                  font-family: Arial, sans-serif;
                }
            
                .card {
                  width: 300px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  padding: 20px;
                  margin: 20px auto;
                  text-align: center;
                  transform: translateZ(0);
                  transition: transform 0.3s;
                }
            
                .card:hover {
                  transform: translateY(-4px);
                }
            
                h1 {
                  font-size: 24px;
                  color: #333333;
                }
            
                p {
                  font-size: 16px;
                  color: #666666;
                }
            
                .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4CAF50;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
                  transition: background-color 0.3s;
                }
            
                .btn:hover {
                  background-color: #45a049;
                }
            
                .card-image {
                  display: flex;
                  justify-content: center;
                  margin-bottom: 20px;
                }
            
                .card-image img {
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                }
            
                a {
                  font-family: Georgia, 'Times New Roman', Times, serif;
                  color: #333333;
                  font-style: none;
                  text-decoration: none;
                }
            </style>
            
              </style>
            <body>
                <div class="card">
                  <div class="card-image">
                    <img src="logo.png" height="50px" width="100px">
                  </div>
                  
                  <span>¡Oh no!</span>
                  <p><b>Nuestro sistema ha valido sus datos</b></p>
                  <p style="color: rgb(255, 0, 0);">Y no parece estar correcto, le recomendamos que vuelva a ingresar sus datos correctamente</p>
                  <span> En el siguiente enlace puede volver a registrase</span>
                  <p style="text-align:center;"><b> Nota: Sus datos deben estar igual a su cédula</b></p>
            
                  <p><a href="#" target="_blank" rel="noopener noreferrer">http://grand-the-auto/registro/</a></p>
                  
                  
                  <p>En resumen, <span>"GRAND THEF AUTO"</span> se destaca como una concesionaria de alquiler de autos que combina la calidad, la estética y los precios asequibles para ofrecer a sus clientes una experiencia excepcional. Ya sea para un viaje de negocios, unas vacaciones en familia o simplemente para disfrutar de la conducción de un auto de calidad, esta concesionaria se ha ganado una reputación sólida
                     como la opción ideal para aquellos que buscan autos buenos, bonitos y baratos.</p>
                  
                </div>  
            </body>
            </html>`
        };

        await enviarCorreo(mensaje);

        return res.json({ status: 'Usuario eliminado y correo enviado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user and sending email', error });
    }
}

export async function actualizarEstadoUsuario(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id;
    const nuevoEstado = req.body.estado;
  
    try {
      const updatedUser = await Usuario.findByIdAndUpdate(userId, { estado: nuevoEstado }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      return res.json({ message: 'Estado de usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar el estado del usuario', error });
    }
  }



