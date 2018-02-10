const express = require('express');
const chatRoutes = require('./api/chat.js');
const userRoutes = require('./api/user.js');

module.exports = (app) => {
    const apiRoutes = express.Router();

    apiRoutes.use('/chat', chatRoutes);
    apiRoutes.use('/user', userRoutes);

    app.use('/', apiRoutes);
}