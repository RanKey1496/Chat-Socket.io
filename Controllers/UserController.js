const User = require('../Models/User');

exports.getUsers = (req, res, next) => {
    User.find({}).exec((err, data) => {
        return res.status(200).json({ data: data });
    });
}