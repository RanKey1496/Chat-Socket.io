const express = require('express');
const routes = express.Router();
const ChatController = require('../../Controllers/ChatController.js');

routes.get('/', ChatController.getConversations);
routes.get('/new', ChatController.newConversation);

module.exports = routes;