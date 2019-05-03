'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//cargar archviso de rutas
var project_routes = require('./routes/projects');
var user_routes = require('./routes/users');

//middelwares (capa que se ejecuta antes de ejecutar un controlador)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}) ;

//rutas
app.use('/',project_routes);
app.use('/user',user_routes);

//exportar
module.exports = app;
