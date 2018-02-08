const express = require('express');
const chatRoutes = require('./api/chat');
const userRoutes = require('./api/user');

module.exports = (app) => {
    const apiRoutes = express.Router();

    apiRoutes.use('/chat', chatRoutes);
    apiRoutes.use('/user', userRoutes);

    app.use('/', apiRoutes);
}