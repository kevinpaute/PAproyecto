import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import mongoose from 'mongoose';

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

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}

// controllers/photo.controller.ts
// ...
// export async function crearFotoConParametro(req: Request, res: Response): Promise<Response> {
//     const { title, description } = req.body;
//     const { id } = req.params; // Obtener el valor del parámetro "category"
//     const newPhoto = { title, description, imagePath: req.file.path, id }; // Incluir "category" en los datos de la foto
//     const photo = new Photo(newPhoto);
//     await photo.save();
//     return res.json({
//         message: 'Photo Saved Successfully',
//         photo
//     });
// };
// controllers/photo.controller.ts
// ...
// export async function crearFotoConParametro(req: Request, res: Response): Promise<Response> {
//     const { title, description } = req.body;
//     const { id } = req.params; // Obtener la categoría de la URL
//     if (!id) {
//         return res.status(400).json({ message: 'Category is required' });
//     }

//     const newPhoto = { title, description, imagePath: req.file.path, id }; // Usar la categoría de la URL
//     const photo = new Photo(newPhoto);
//     await photo.save();
//     return res.json({
//         message: 'Photo Saved Successfully',
//         photo
//     });
// };
// controllers/photo.controller.ts
// ...
// controllers/photo.controller.ts
// ...
// controllers/photo.controller.ts
// ...
export const crearFotoConParametro = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la URL
      const usuario = await Usuario.findById(id); // Encuentra al usuario correspondiente por su ID
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const { title, description } = req.body; // Obtén los datos de la foto desde el cuerpo de la solicitud
      const imagePath = req.file.path; // Obtén el path de la imagen cargada
  
      const photo = new Photo({
        title,
        description,
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
        ]);

        res.json(usersWithPhotos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios con fotos', error });
    }
};
