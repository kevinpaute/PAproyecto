import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import mongoose from 'mongoose';
import enviarCorreo from '../routes/enviarCorreo';


// Models
import Photo, { IPhoto } from '../models/Photo';
import Usuario from '../models/Usuario';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const newPhoto = { title, description, imagePath: req.file.path };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

// export async function updatePhoto(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     const updatedPhoto = await Photo.findByIdAndUpdate(id, {
//         title,
//         description
//     });
//     return res.json({
//         message: 'Successfully updated',
//         updatedPhoto
//     });
// }


export const crearFotoConParametro = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la URL
      const usuario = await Usuario.findById(id); // Encuentra al usuario correspondiente por su ID
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      //const { title, description } = req.body; // Obtén los datos de la foto desde el cuerpo de la solicitud
      const imagePath = req.file.path; // Obtén el path de la imagen cargada
  
      const photo = new Photo({
        
        imagePath,
        usuario: usuario._id,
      });
  
      await photo.save(); // Guarda la foto en la base de datos
  
      res.status(201).json({ message: 'Foto creada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la foto', error });
    }
  };

  
  


  export const getUsersWithPhotos = async (req: Request, res: Response) => {
    try {
        const usersWithPhotos = await Usuario.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: '_id',
                    foreignField: 'usuario',
                    as: 'photos',
                },
            },
            {
                $match: {
                    $or: [
                        { estado: 'activo' },
                        { estado: 'esperando' }
                    ]
                }
            }
        ]);

        res.json(usersWithPhotos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios con fotos', error });
    }
};





export async function actualizarFotoConParametro(req: Request, res: Response): Promise<Response> {
    try {
        const { id, photoId } = req.params; // Obtén ambos IDs
        const imagePath = req.file.path; 

        const usuario = await Usuario.findById(id); // Encuentra al usuario correspondiente por su ID
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const updatedPhoto = await Photo.findByIdAndUpdate(photoId, { // Usa photoId para buscar y actualizar la foto
            imagePath,
            usuario: usuario._id,
        }, { new: true });

        if (!updatedPhoto) {
            return res.status(404).json({ message: 'Foto no encontrada' });
        }

        return res.json({
            message: 'Foto actualizada exitosamente',
            updatedPhoto
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la foto', error });
    }
}


export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}

export async function RechazarPagoV2(req: Request, res: Response): Promise<Response> {
    const { id, photoId, email } = req.body; // Agrega el idPhoto y el email al cuerpo de la solicitud

    try {
        const mensaje = {
            from: 'jhonmacias1999@gmail.com',
            to: email,
            subject: 'Oh! Algo ha pasado con su pago',
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
                  
                  <span>¡Oh! no</span>
                  <p style="color: red;">Su pago no se ha realizado correctamente</p>
                  <p>Lamentablemente, existen situaciones en las que un pago puede no ser aceptado. Estas circunstancias pueden variar
                   <br>
                        <p>1. La imágen no esta cargada correctamnte</p>
                        <br>
                    
                       <p>
                        2. En ciertas circunstancias, las entidades financieras pueden bloquear o restringir pagos como medida de seguridad. Esto puede suceder si se detecta actividad sospechosa en la cuenta
                       </p> 
            
                  </p>
            
                  <br>
                  <p>
                    Le recomendamos que vuelva a ingresar su comprobante de pago, con la finalidad de volver a revisarlo
                     <a href="http://localhost:9524/fotos/${id}/photos/${photoId}">Volver a pagar</a>
                  </p>
                     <p>
                    Pronto le llegará un mensaje de confirmación...
                  </p>
            
            
                  
                </div>  
            </body>
            </html>
            `
        };

        await enviarCorreo(mensaje);

        // Aquí podrías agregar la lógica para actualizar la foto si es necesario

        return res.json({ status: 'Correo de pago rechazado' });
    } catch (error) {
        return res.status(500).json({ message: 'Error sending payment email', error });
    }
}

export const getUsersWithPhotosFinalizados = async (req: Request, res: Response) => {
    try {
        const usersWithPhotos = await Usuario.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: '_id',
                    foreignField: 'usuario',
                    as: 'photos',
                },
            },
            {
                $match: {
                    estado: 'finalizado' // Agrega el filtro por estado finalizado
                }
            }
        ]);

        res.json(usersWithPhotos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios con fotos', error });
    }
};



  

  