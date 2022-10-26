const { generateToken } = require('./jwt');
const userService = require('./user.service');

const loginUser = async (email, password) => {
    const user = await userService.getByEmail(email);

    if (!user || user.password !== password) {
        return {
            statusCode: 400,
            message: 'Invalid fields',
        };
    }

    return {
        statusCode: 200,
        message: generateToken(user.id),
    };
};

module.exports = {
    loginUser,
};
