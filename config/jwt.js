var jwt = require('jsonwebtoken');


const JWT_SIGN_SECRET = 'secretKey123456789secretKey';

module.exports = {
    generateTokenForUser: function (userData, cb) {
        console.log("USER id", userData);
        cb(jwt.sign({ userId: userData }, JWT_SIGN_SECRET,{expiresIn: '1h' }));
    },

    get_key: function () {
        return JWT_SIGN_SECRET;
    },
}