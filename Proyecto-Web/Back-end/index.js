'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true })
        .then(()=>{
          console.log("Conexion establecida con la base de datos...");

          //creacion del servidor
          app.listen(port,()=>{
            console.log('Servidor Corriendo Correctamente en la url: localhost:3000');
          });
        
        })
        .catch(err => console.log(err));
