const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        morgan = require('morgan'),
        mongoose = require('mongoose'),
        socketEvents = require('./socketEvents'),
        config = require('./Config/main'),
        router = require('./routes/main.js');

var isProduction = false;
let server;
let PORT = process.env.PORT || 5000;

if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI);
    server = app.listen(3000)
} else {
    mongoose.connect(config.database, (err) => {
        if (err) throw err;
        else console.log('Connected to database');
    });
    mongoose.set('debug', true);
    server = app.listen(PORT);
    console.log(`Your server is running on port ${PORT}.`);
}

const io = require('socket.io').listen(server);

socketEvents(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors());
router(app);

module.exports = server;