const db = require('../config/db');

const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) callback(err, null);
            callback(null, results);
        });
    },
};

module.exports = User;
