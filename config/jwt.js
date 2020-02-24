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
    }
}