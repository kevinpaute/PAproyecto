import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import Photo from '../models/Photo';
import { Router } from 'express'
const router = Router();
// Ruta para obtener usuarios con sus fotos
router.get('/users-with-photos', async (req: Request, res: Response) => {
  try {
    const usersWithPhotos = await Usuario.aggregate([
      {
        $lookup: {
          from: 'photos',
          localField: '_id',  // Campo en la colección users
          foreignField: 'usuario',  // Campo en la colección photos
          as: 'photos',
        },
      },
    ]);

    res.json(usersWithPhotos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios con fotos', error });
  }
});
