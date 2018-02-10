const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        morgan = require('morgan'),
        mongoose = require('mongoose'),
        socketEvents = require('./socketEvents'),
        config = require('./Config/main'),
        router = require('./Routes/main');

var isProduction = false;
let server;

if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI);
    server = app.listen(3000)
} else {
    mongoose.connect(config.database, (err) => {
        if (err) throw err;
        else console.log('Connected to database');
    });
    mongoose.set('debug', true);
    server = app.listen(80);
    console.log(`Your server is running on port ${config.port}.`);
}

const io = require('socket.io').listen(server);

socketEvents(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors());
router(app);

module.exports = server;