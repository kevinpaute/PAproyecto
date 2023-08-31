import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    nombres: string;
    apellidos: string;
    cedula: string;
    email: string;
    telefono: string;
    direccion: string;
    genero: string;
    vehiculoarentar: string;
    costos: string;
    estado: string;
}

const userSchema = new Schema<IUser>({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    vehiculoarentar: {
        type: String,
        required: true
    },
    costos: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
});

export default model<IUser>('User', userSchema);
