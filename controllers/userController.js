const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) res.status(500).send(err);
        res.status(200).json(users);
    });
};
