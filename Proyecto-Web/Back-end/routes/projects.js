'use strict'


var express =require('express');
var ProjectController = require('../controllers/projects');

var router = express.Router();

//Middelware
var multipart = require('connect-multiparty');
var multipartMiddelware = multipart({uploadDir:'./uploads'});
//Middelware

router.get('/home',ProjectController.home);
router.post('/test',ProjectController.test);
router.post('/save-project',ProjectController.saveProject);
router.get('/project/:id?',ProjectController.getProject);
router.get('/projects',ProjectController.getallProjects);
router.get('/public-projects',ProjectController.getPublicProjects);
router.get('/user-projects',ProjectController.getUserProjects);
router.put('/projectUpdate/:id',ProjectController.updateProjects);
router.get('/popular-projects',ProjectController.getMostPopularProjects);
router.delete('/projectdel/:id',ProjectController.DeleteProjects);
router.post('/upload-image/:id',multipartMiddelware,ProjectController.UploadImage);
router.post('/upload-file/:id',multipartMiddelware,ProjectController.UploadFile);
router.get('/get-image/:image', ProjectController.getImageFile);
router.get('/get-file/:file', ProjectController.getFile);
router.post('/Search-project',multipartMiddelware,ProjectController.getSearchProjects);
module.exports = router
