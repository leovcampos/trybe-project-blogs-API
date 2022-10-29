const postServices = require('../services/post.service');

const newPost = async (req, res) => {
    const { statusCode, message } = postServices.newPostService(req.body, req.user);

    res.status(statusCode).json(message);
};

module.exports = {
    newPost,
};
