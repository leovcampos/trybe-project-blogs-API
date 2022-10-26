const { generateToken } = require('./jwt');
const { User } = require('../models');

const getByEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email,
        },  
    });
    if (user) return user.dataValues;

    return user;
};

const newUser = async ({ displayName, email, password, image }) => {
    const isUser = await getByEmail(email);
    if (isUser) {
        return {
            statusCode: 409,
            message: { message: 'User already registered' },
        };
    }

    const { dataValues } = await User.create({
        displayName,
        email,
        password,
        image,
    });

    return {
        statusCode: 201,
        message: { token: generateToken(dataValues.id) },
    };
};

module.exports = {
    newUser,
    getByEmail,
};
