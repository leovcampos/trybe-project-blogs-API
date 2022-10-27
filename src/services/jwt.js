const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
    };

    const token = jwt.sign({
        data: {
            userId,
          },
        },
        secret,
        jwtConfig);
    
      return token;
};

const validateToken = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        const { data: { userId } } = jwt.verify(token, secret);
        return userId;
    } catch (e) {
        return false;
    }
};

module.exports = {
    generateToken,
    validateToken,
};
