'use strict'

var express =require('express');
var UserController = require('../controllers/user');

var router = express.Router();

//Middelware
var multipart = require('connect-multiparty');
var multipartMiddelware = multipart({uploadDir:'./uploads'});
//Middelware

router.get('/logintest', UserController.getLogin);
router.post('/saveUser', UserController.saveUser);
router.post('/login',UserController.getUser);
router.get('/user/:email',UserController.getOneUser);
router.put('/userEdit/:id',UserController.updateUser);

module.exports = router
