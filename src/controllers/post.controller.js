const postServices = require('../services/post.service');

const newPost = async (req, res) => {
    const { statusCode, message } = await postServices.newPostService(req.body, req.user);
    res.status(statusCode).json(message);
};

const findAll = async (req, res) => {
    const { statusCode, message } = await postServices.findAllService();
    console.log(req.user);
    res.status(statusCode).json(message);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { statusCode, message } = await postServices.getByIdService(id);

    res.status(statusCode).json(message);
};

module.exports = {
    newPost,
    findAll,
    getById,
};
