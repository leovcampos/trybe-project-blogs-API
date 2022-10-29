const validatePost = (req, res, next) => {
    const { title, content, categoryId } = req.body;

    if (title && content && categoryId && req.method === 'POST') {
        return next();
    }

    return res.status(400).json({ message: 'Some required fields are missing' });
};

module.exports = validatePost;
