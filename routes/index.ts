import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto,crearFotoConParametro,
     getUsersWithPhotos,actualizarFotoConParametro,RechazarPagoV2,getUsersWithPhotosFinalizados } from '../controllers/photo.controller'
import {createUser,getAllUsers,
    getUserById,
    getUsersWithActiveStatus,
    getUsersWithInactiveStatus,
    getUsersWithPendingStatus,updateUser,enviarPago,eliminarUsuarioYEnviarCorreo, actualizarEstadoUsuario} from '../controllers/user.controller'; 


// middleware
// router.use(upload.single('image'));

// routes
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('image'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

// routes/index.ts
// ...
router.route('/photos/:id')
    .post(upload.single('image'), crearFotoConParametro)
    .put(upload.single('image'),crearFotoConParametro);


    //crear un usuario:
    router.route('/users') // Ruta para crear un usuario
    .post(createUser)
    .get(getAllUsers);
    

    router.route('/users/:id')
    .get(getUserById) // Obtener usuario por ID
    .put(updateUser); // Llamando a la función para actualizar un usuario

router.route('/users/estado/activo')
    .get(getUsersWithActiveStatus); // Obtener usuarios con estado "activo"

router.route('/users/estado/inactivo')
    .get(getUsersWithInactiveStatus); // Obtener usuarios con estado "inactivo"

router.route('/users/estado/esperando')
    .get(getUsersWithPendingStatus); // Obtener usuarios con estado "esperando"

    router.route('/users-with-photos')
    .get(getUsersWithPhotos); // Llama a la función que obtiene usuarios con fotos
    
    router.route('/enviar-correo')
    .post(enviarPago);


    router.route('/fotos/:id/photos/:photoId')
    .put(upload.single('image'), actualizarFotoConParametro);

    router.route('/pago-invalido')
    .post(RechazarPagoV2)
    router.route('/users/:id/eliminar-y-enviar-correo')
    .post(eliminarUsuarioYEnviarCorreo);

    router.put('/users/:id/actualizar-estado', actualizarEstadoUsuario);
    router.route('/finalizado')
    .get(getUsersWithPhotosFinalizados)

export default router;