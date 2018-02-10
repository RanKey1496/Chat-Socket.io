const express = require('express');
const routes = express.Router();
const UserController = require('../../Controllers/UserController.js');

routes.get('/', UserController.getUsers);

module.exports = routes;