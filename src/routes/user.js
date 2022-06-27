'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');
var api = express.Router();

api.post('/registerUser', userController.registerUser);
api.post('/loginUser', userController.loginUser);

api.get( '/getDatosDummy', userController.getDatosDummy);
module.exports = api;