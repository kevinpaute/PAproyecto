import { Request, Response } from 'express';
import enviarCorreo from '../routes/enviarCorreo';
import Usuario from '../models/Usuario';

export async function createUser(req: Request, res: Response): Promise<Response> {
    const { nombres, apellidos, cedula, email, telefono, direccion, genero, vehiculoarentar, costos, estado } = req.body;
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

    try {
        const savedUser = await newUser.save();
        
        const mensaje = {
            from: "jhonmacias1999@gmail.com",
            to: newUser.email,
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
                    <html lang="es">
                        <head>
                            <link rel="stylesheet" href="style.css">
                            <meta charset="UTF-8">
                            <title>Correo de pruebas</title>
                        </head>
                        <body>
                            <header>
                                <h1>Actualización de perfil</h1>
                            </header>
                            <main>
                                <p style="color: dodgerblue;">¡Hola!</p>
                                <p>Tu perfil ha sido actualizado correctamente.</p>
                                <p>¡Gracias por confiar en nosotros!</p>
                                <a href="http://localhost:9524/fotos/${id}">Pagar Aceptado</a>
                            </main>
                        </body>
                    </html>`
            };
    
            await enviarCorreo(mensaje);
    
            return res.json({ status: 'Actualización Exitosa y correo enviado', user: updatedUser });
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        }
    }
    





