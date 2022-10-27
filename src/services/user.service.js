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
        image: image || '',
    });

    return {
        statusCode: 201,
        message: { token: generateToken(dataValues.id) },
    };
};

const getById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        return {
            statusCode: 404,
            message: { message: 'User does not exist' },
        };
    }

    delete user.dataValues.password;

    return {
        statusCode: 200,
        message: { message: user.dataValues },
    };
};

const getAll = async () => {
    const result = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    
    return {
        statusCode: 200,
        message: result,
    };
};

module.exports = {
    newUser,
    getByEmail,
    getById,
    getAll,
};
