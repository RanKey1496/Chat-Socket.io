const express = require('express');
const chatRoutes = require('./api/chat');

module.exports = (app) => {
    const apiRoutes = express.Router();

    apiRoutes.use('/chat', chatRoutes);

    app.use('/', apiRoutes);
}