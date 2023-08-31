import { Schema, model, Document, Types  } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String,
    usuario: { type: Types.ObjectId, ref: 'User' } // Cambiar a Types.ObjectId
});

export interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
    usuario: string; // Agregar el campo usuario al modelo

}

export default model<IPhoto>('Photo', schema);