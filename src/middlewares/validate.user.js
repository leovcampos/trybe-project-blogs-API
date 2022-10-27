const isDisplayNameInvalid = (request) => {
    if (request.displayName.length < 8) {
        return {
            statusCode: 400,
            message: { message: '"displayName" length must be at least 8 characters long' },
        };
    }

    return false;
};

const isPasswordInvalid = (request) => {
    if (request.password.length < 6) {
        return {
            statusCode: 400,
            message: { message: '"password" length must be at least 6 characters long' },
        };
    }

    return isDisplayNameInvalid(request);
};

const validateFields = (request) => {
    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!regex.test(request.email)) {
        return {
            statusCode: 400,
            message: { message: '"email" must be a valid email' },
        };
    }

    return isPasswordInvalid(request);
};

const validateUser = (req, res, next) => {
    const { displayName, password, email } = req.body;
    const error = {
        statusCode: 400,
        message: { message: 'Some required fields are missing' },
    };

    if (!displayName || !password || !email) {
        return res.status(error.statusCode).json(error.message);
    }

    if (validateFields(req.body)) {
        const { statusCode, message } = validateFields(req.body);
        return res.status(statusCode).json(message);
    }

    next();
};

module.exports = validateUser;
