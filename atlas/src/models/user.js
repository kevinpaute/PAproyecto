const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    nombres:{
        type:String,
        require:true
    },
    apellidos:{
        type:String,
        require:true
    },
    cedula:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    telefono:{
        type:String,
        require:true
    },
    direccion:{
        type:String,
        require:true
    },
    genero:{
        type:String,
        require:true
    },
    vehiculoarentar:{
        type:String,
        require:true
    },
    costos:{
        type:String,
        require:true
    },
    estado:{
        type:String,
        require:true
    }
    
});

module.exports=mongoose.model('User',userSchema);