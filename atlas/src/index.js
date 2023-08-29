/*Codigo del servidor */
const express = require('express');
const mongoose = require('mongoose')
require("dotenv").config();
const userRoutes = require("./routes/user");


const app = express();
const port=process.env.PORT || 9000;


//midelware
app.use(express.json());
app.use('/api',userRoutes);


//router
app.get('/',(req,res) =>{
    res.send("Bienvenido a la JAPI")
});

//mongodb conexion
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>console.log('Conectado a la base de datos atlas'))
    .catch((error)=>console.log(error))




app.listen(port, () => console.log('server escuchando',port));