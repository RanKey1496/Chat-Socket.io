const User = require('../Models/User');

function findAll() {
    User.find().exec((err, data) => {
        if (err) throw err;
        return data;
    })
}

function create() {
    const newUser = {
        username: "rankey",
        firstName: "Jhon",
        lastName: "Gil"
    }

    var a = new User(newUser);
    a.save((err) => {
        if(err) throw err;
    })
    return a;
}

module.exports = {
    findAll,
    create
}