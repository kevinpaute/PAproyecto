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
    teléfono:{
        type:String,
        require:true
    },
    dirección:{
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
    }
});

module.exports=mongoose.model('User',userSchema);