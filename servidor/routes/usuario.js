const express = require('express');
const router = express.Router();
const enviarCorreo = require('./correo'); 
var getConnection = require('../conexion');


//Web service para consultar usuario por numero de cedula
router.get('/usuario/:cedula', (req, res)=>{
    getConnection(function(err, conn){
              const {cedula} = req.params;
              if (err) {
                return res.sendStatus(400);
              }
              conn.query('SELECT * FROM usuario WHERE cedulaUsuario = ?' , [cedula], function (err, rows) {
                if (err) {
                    conn.release();
                    return res.sendStatus(400, 'No se puede conectar a la base de datos');
                }
                res.send(rows);
                conn.release();
              });
    });
});

/*INSERTAR UN USUARIO A LA DB */

router.post('/usuario/', (req, res)=>{

  /*TRAER LOS DATOS DEL CUERPO HTML  */
  const data = {
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    cedulaUsuario : req.body.cedulaUsuario,
    telefonoUsuario : req.body.telefonoUsuario,
    direccionUsuario : req.body.direccionUsuario,
    correoUsuario : req.body.correoUsuario
  }
 
  const query = "INSERT INTO usuario(nombre,apellido,cedulaUsuario,telefonoUsuario,direccionUsuario,correoUsuario) VALUES(\'"+data.nombre + "\',\'"+data.apellido
  + "\',\'" + data.cedulaUsuario + "\',\'" + data.telefonoUsuario
  + "\',\'" + data.direccionUsuario + "\',\'" +data.correoUsuario + "\')";
  getConnection(function(err, conn){
            if (err) {
              console.log("No se puede conectar a la base de datos" + err);
            }
            conn.query(query , function (err, result) {
              if (!err) {
                  res.json({status:'Registro Exitoso'});
              }else{
                console.log(err);

              }
              conn.release();
            });
  });
  enviarCorreo(req.body.correoUsuario)
  .then(info => {
    console.log(info);
    res.json({ status: 'Registro Exitoso y correo enviado' });
  })
  .catch(error => {
    console.log(error);
    res.json({ status: 'Registro Exitoso pero no se pudo enviar el correo' });
  });
});


/*Traer Todos los usuarios */
router.get('/usuarios', (req, res)=>{
  getConnection(function(err, conn){
            if (err) {
              return res.sendStatus(400);
            }
            conn.query('SELECT * FROM usuario' , function (err, rows) {
              if (err) {
                  conn.release();
                  return res.sendStatus(400, 'No se puede conectar a la base de datos');
              }
              res.send(rows);
              conn.release();
            });
  });
});

/**Buscar por ID */
//Web service para consultar usuario por numero de cedula
router.get('/usuario/getById/:id', (req, res)=>{
  getConnection(function(err, conn){
            const {id} = req.params;
            if (err) {
              return res.sendStatus(400);
            }
            conn.query('SELECT * FROM usuario WHERE idUsuario = ?' , [id], function (err, rows) {
              if (err) {
                  conn.release();
                  return res.sendStatus(400, 'No se puede conectar a la base de datos');
              }
              res.send(rows);
              conn.release();
            });
  });
});

/**AZTUALIZAR UN USUARIOS */
router.put('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const data = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cedulaUsuario: req.body.cedulaUsuario,
    telefonoUsuario: req.body.telefonoUsuario,
    direccionUsuario: req.body.direccionUsuario,
    correoUsuario: req.body.correoUsuario
  }
  const query = "UPDATE usuario SET nombre = ?, apellido = ?, cedulaUsuario = ?, telefonoUsuario = ?, direccionUsuario = ?, correoUsuario = ? WHERE idUsuario = ?";
  getConnection(function (err, conn) {
    if (err) {
      console.log("No se puede conectar a la base de datos" + err);
    }
    conn.query(query, [data.nombre, data.apellido, data.cedulaUsuario, data.telefonoUsuario, data.direccionUsuario, data.correoUsuario, id], function (err, result) {
      if (!err) {
        res.json({ status: 'Actualización Exitosa' });
      } else {
        console.log(err);
      }
      conn.release();
    });
  });
});





module.exports = router;