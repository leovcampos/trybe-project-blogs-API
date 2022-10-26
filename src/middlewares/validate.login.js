const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (email && password) return next();

    res.status(400).json({ message: 'Some required fields are missing' });
};

module.exports = validateLogin;
