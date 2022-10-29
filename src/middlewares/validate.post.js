const validatePost = (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    if (title && content && categoryIds && req.method === 'POST') {
        return next();
    }

    return res.status(400).json({ message: 'Some required fields are missing' });
};

module.exports = validatePost;
