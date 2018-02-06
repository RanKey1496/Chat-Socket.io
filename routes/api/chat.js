const express = require('express');
const routes = express.Router();
const ChatController = require('../../Controllers/ChatController');

routes.get('/', ChatController.getConversations);

module.exports = routes;