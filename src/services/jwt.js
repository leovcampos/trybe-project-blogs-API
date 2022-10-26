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

module.exports = {
    generateToken,
};
