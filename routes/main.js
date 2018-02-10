const express = require('express');
//const chatRoutes = require('./api/chat.js');
//const userRoutes = require('./api/user.js');
const ChatController = require('../../Controllers/ChatController.js');

module.exports = (app) => {
    const apiRoutes = express.Router();

    //apiRoutes.use('/chat', chatRoutes);
    //apiRoutes.use('/user', userRoutes);

    app.use('/', (req, res, next) => {
        return res.status(200).json({ status: ready });
    });
}
