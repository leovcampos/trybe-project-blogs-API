const postServices = require('../services/post.service');

const newPost = async (req, res) => {
    const { statusCode, message } = await postServices.newPostService(req.body, req.user);
    res.status(statusCode).json(message);
};

const findAll = async (req, res) => {
    const { statusCode, message } = await postServices.findAllService();
    res.status(statusCode).json(message);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { statusCode, message } = await postServices.getByIdService(id);

    res.status(statusCode).json(message);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { statusCode, message } = await postServices.deletePostService(id, userId);

    res.status(statusCode).json(message);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { statusCode, message } = await postServices.updatePostService(id, userId, req.body);

    res.status(statusCode).json(message);
};

const getByQuery = async (req, res) => {
    const { q } = req.query;
    const { statusCode, message } = await postServices.getByQueryService(q);

    res.status(statusCode).json(message);
};

module.exports = {
    newPost,
    findAll,
    getById,
    updatePost,
    deletePost,
    getByQuery,
};
