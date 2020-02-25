var jwt = require('jsonwebtoken');


const JWT_SIGN_SECRET = 'secretKey123456789secretKey';

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.idUser
        },
        JWT_SIGN_SECRET,{
            expiresIn: '1h'
        })
    },

    get_key: function () {
        return JWT_SIGN_SECRET;
    },

    extractToken_cookie: function (cookie) {
        if(cookie) {
            var token = cookie.cookies['Aymeric'];
            return jwt.verify(token, JWT_SIGN_SECRET);
        } else {
            return null;
        }
    }
}