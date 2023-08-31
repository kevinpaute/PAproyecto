import { connect } from 'mongoose';
require('dotenv').config();

export async function startConnection() {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI not defined in the environment variables.");
        return;
    }

    const db = await connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false 
    });
    
    console.log('Database is connected');
}
