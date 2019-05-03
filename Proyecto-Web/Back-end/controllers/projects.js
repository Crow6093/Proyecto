'use strict'
var Project = require('../models/projects');
var fs = require('fs');
var path = require('path');

var controller = {
      home: function(req,res){
          return res.status(200).send({
            message:"soy el home"
          });
      },
      test:function(req,res){
        return res.status(200).send({
          message:"soy el metodos test"
        });
      },

      saveProject: function(req, res){
          var project = new Project();

          var params = req.body;
          project.name = params.name;
          project.description = params.description;
          project.category = params.category;
          project.year = params.year;
          project.langs = params.langs;
          project.image = 'default.png';
          project.email = params.email;
          project.visibility = params.visibility;
          project.file = null;
          project.assessment = params.assessment;
          project.NumberOfAssessments = params.NumberOfAssessments;
          project.TotalAssessments = params.TotalAssessments;
          project.VotedUser = [];

          project.save((err, projectStored) => {
            if(err) return res.status(500).send({message:"Error al guardar el documento"});

            if(!projectStored) return res.status(404).send({message:"No se ha podiudo Guardar"});

           return res.status(200).send({project: projectStored});
         });
      },
      getProject: function(req,res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message:"ID no valida para buscar"});

        Project.findById(projectId, (err, project) => {
      //    Project.find({name:projectId}, (err, project) => {//buscar por campo , es caseSensitive
          if(err) return res.status(500).send({message:"Error al buscar el documento"});

          if(!project) return res.status(404).send({message:"El Doumento no existe"});

          return res.status(200).send({
            project
          });

        });
      },
//para buscar todos los proyectos
      getallProjects: function(req, res){
        //project.find({year:2019}).sort('year').exec((err, projects)=>{//busca solo por anio , como un where  y con el sort ordenas
        // y usando .sort('-year') ordena al contrario el mas nuevo primero.
        Project.find({}).sort('-year').exec((err, projects)=>{
          if(err) return res.status(500).send({message:"Error a; devolver los datos"});

          if(!projects) return res.status(404).send({message:"No hay proyectos"});

          return res.status(200).send({projects});

        });
      },    
       getPublicProjects: function(req, res) {
        Project.find({visibility:/Publico/i}).exec((err, projects)=>{//busca solo por anio , como un where  y con el sort ordenas
        // y usando .sort('-year') ordena al contrario el mas nuevo primero.
          if(err) return res.status(500).send({message:"Error a; devolver los datos"});

          if(!projects) return res.status(404).send({message:"No hay proyectos"});

          return res.status(200).send({projects});

        });
      },
      //EDITAR ESTE MEDOTO//
      getUserProjects: function(req, res){
        //  var UserEmail = req.params.email;
         var UserEmail = req.query.email;
        Project.find({email:UserEmail}).exec((err, projects)=>{//busca solo por anio , como un where  y con el sort ordenas
        // y usando .sort('-year') ordena al contrario el mas nuevo primero.
          if(err) return res.status(500).send({message:"Error a; devolver los datos"});

          if(!projects) return res.status(404).send({message:"No hay proyectos"});

          return res.status(200).send({projects});

        });
      },
//UPDATE POR ID
      updateProjects: function(req, res){
         var projectId = req.params.id;
         var update = req.body;

        Project.findByIdAndUpdate(projectId, update,{new:true},(err, projectUpdate)=>{

              if(err) return res.status(500).send({message:"Error:Imposibel Actualizar"});
              if(!projectUpdate) return res.status(404).send({message:"No se a podido Actualizar el proyecto ,porque no exite ese proyecto"});
              return res.status(200).send({project: projectUpdate});

        });
      },

      DeleteProjects: function(req, res){
         var projectId = req.params.id;
        Project.findByIdAndRemove(projectId,(err, projectRemoved)=>{
              if(err) return res.status(500).send({message:"Error:Imposibel Borrar Proyecto"});
              if(!projectRemoved) return res.status(404).send({message:"No se a podido Borrar el Documento , Docuemto Desconocido"});

              return res.status(200).send({project: projectRemoved});

        });
      },

      UploadImage: function(req, res){
         var projectId = req.params.id;
         var fileName ='Imagen No subida..';

         if (req.files) {
           var filePath = req.files.image.path;
           var fileSplit = filePath.split('\\');
           var fileName = fileSplit[1];
           var exSplit = fileName.split('\.');
           var fileExt = exSplit[1];

           if (fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg'|| fileExt=='gif'|| fileExt=='rar' ) {

            Project.findByIdAndUpdate(projectId,{image:fileName},{new:true},(err,projectUpdated)=>{
              if (err) return res.status(500).send({message:'la imagen no se a subido'});
              if (!projectUpdated) return res.status(404).send({message:'La imagen no se puede subir , porque el projecto no existe'});
              return res.status(200).send({
                files: projectUpdated});
            });

          }else{
              fs.unlink(filePath, (err)=>{
                return res.status(200).send({message:'la extension no es valida'})});}

       }else{
         return res.status(200).send({
           message: fileName});
          }
      },
      getImageFile: function(req,res){
          var file = req.params.image;
          var path_file = './uploads/'+file;

          fs.exists(path_file, (exists)=>{
              if(exists){
                  return res.sendFile(path.resolve(path_file));
              }else{
                return res.status(200).send({
                  message: "No existe la imagen..."
                })
              }
          });
      },

      
      UploadFile: function(req, res){
        var projectId = req.params.id;
        var fileName ='Fichero No subido..';

        if (req.files) {
          var filePath = req.files.file.path;
          var fileSplit = filePath.split('\\');
          var fileName = fileSplit[1];
          var exSplit = fileName.split('\.');
          var fileExt = exSplit[1];

          if (fileExt=='zip'|| fileExt=='rar' ) {

           Project.findByIdAndUpdate(projectId,{file:fileName},{new:true},(err,projectUpdated)=>{
             if (err) return res.status(500).send({message:'El archivo no se a subido'});
             if (!projectUpdated) return res.status(404).send({message:'El archivo no se puede subir , porque el projecto no existe'});
             return res.status(200).send({
               files: projectUpdated});
           });

         }else{
             fs.unlink(filePath, (err)=>{
               return res.status(200).send({message:'la extension no es valida'})});}

      }else{
        return res.status(200).send({
          message: fileName});
         }
     },
     getFile: function(req,res){
      var file = req.params.file;
      var path_file = './uploads/'+file;

      fs.exists(path_file, (exists)=>{
          if(exists){
              return res.sendFile(path.resolve(path_file));
          }else{
            return res.status(200).send({
              message: "El fichero Ya no existe..."
            })
          }
      });
  },
  
// metodo para el buscador de proyectos
  getSearchProjects: function(req, res) {
    var nameproject = req.body.id;
    Project.find({name: new RegExp('^'+nameproject+'$', "i"),visibility:/Publico/i}).exec((err, projects)=>{
      if(err) return res.status(500).send({message:"Error a; devolver los datos"});

      if(!projects) return res.status(404).send({message:"No hay proyectos"});

      return res.status(200).send({projects});

    });},
    getMostPopularProjects: function(req, res){ 
      Project.find({visibility:/Publico/i}).sort('-TotalAssessments').limit(3).exec((err, projects)=>{
        if(err) return res.status(500).send({message:"Error al devolver los datos"});

        if(!projects) return res.status(404).send({message:"No hay proyectos"});

        return res.status(200).send({projects});

      });
    }
};

module.exports = controller;