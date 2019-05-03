'use strict'

var User = require('../models/users');
var fs = require('fs');
var path = require('path');

var controller = {
  
    getLogin: function(req, res){
        return res.status(200).send({
          message:"soy el login"
        });
    },

    saveUser: function(req, res){
        var user = new User();

        var params = req.body;
        // var params = req.query;
        
        user.email = params.email;
        user.name = params.name;
        user.password = params.password;

        user.save((err, UsertStored) => {
          if(err) return res.status(500).send({message:"Error al Registrar al Usuario"});

          if(!UsertStored) return res.status(404).send({message:"No se ha podiudo Registrar"});

         return res.status(200).send({User: UsertStored});
       });
    },
          getUser: function(req,res){

            //var params = req.body;
            
          var params = req.query;
      
          var UserEmial = params.email;
          var UserPassword = params.password;

          if(UserEmial == null) return res.status(404).send({message:"Email no valida para buscar"});
          if(UserPassword == null) return res.status(404).send({message:"Email no valida para buscar"});

  
          User.findOne({email:UserEmial,password:UserPassword}, (err, user) => {
            if(err) return res.status(500).send({message:"Error al buscar el documento"});
  
            if(!user) return res.status(404).send({message:"El Doumento no existe"});
            
            return res.status(200).send({
               user
            });
            
          });
      },

      getOneUser: function(req,res){
        var UserEmial = req.params.email;

       if(UserEmial == null) return res.status(404).send({message:"Email no valida para buscar"});

         User.find({email:UserEmial}, (err, user) => {
         if(err) return res.status(500).send({message:"Error al buscar el documento"});

        if(!user) return res.status(404).send({message:"El Doumento no existe"});
        
        return res.status(200).send({
           user
        });
        
      });
  },

  updateUser: function(req, res){
    var id = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(id, update,{new:true},(err, UserUpdate)=>{
         if(err) return res.status(500).send({message:"Error:Imposibel Actualizar"});
         if(!UserUpdate) return res.status(404).send({message:"No se a podido Actualizar Los datos del Usuario ,porque no exite ese Usuario"});
         return res.status(200).send({User: UserUpdate});
   });
 },



};

module.exports = controller;