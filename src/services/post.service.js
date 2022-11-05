const { Op } = require('sequelize');
const { Category, BlogPost, PostCategory, sequelize, User } = require('../models');

const validateCategotyId = async (categoryIds) => {
    const getCategories = await Category.findAll({
        where: {
            id: { [Op.or]: categoryIds },
        },
    });

    return getCategories.length === categoryIds.length;
};

const newPost = async (title, content, categoryIds, userId) => {
    try {
        const result = await sequelize.transaction(async (element) => {
            const { dataValues } = await BlogPost.create(
                { title, content, userId },
                { transaction: element },
            );
            await Promise.all(categoryIds.map(async (categoryId) => {
                await PostCategory.create({ postId: dataValues.id, categoryId },
                    { transaction: element });
            }));
            return dataValues;
        });
        return { statusCode: 201, message: result };
    } catch (error) {
        return { statusCode: 404, message: error.message };
    }
};

const newPostService = async ({ title, content, categoryIds }, { id: userId }) => {
    const validateCategories = await validateCategotyId(categoryIds);
    if (!validateCategories) {
        return {
            statusCode: 400,
            message: { message: 'one or more "categoryIds" not found' },
        };
    }

    const result = await newPost(title, content, categoryIds, userId);
    return result;
};

const findAllService = async () => {
    const result = await BlogPost.findAll({
        include: [{
            model: Category,
            as: 'categories',
        }, {
            model: User,
            as: 'user',
            attributes: {
                exclude: ['password'],
            },
        },
        ],
    });

    return {
        statusCode: 200,
        message: result.map(({ dataValues }) => dataValues),
    };
};

const getByIdService = async (id) => {
    const [post] = await BlogPost.findAll({
        where: { id },
        include: [{ model: Category, as: 'categories' },
        { model: User, as: 'user', attributes: { exclude: ['password'] } }],
    });

    if (!post) {
        return {
            statusCode: 404,
            message: {
                message: 'Post does not exist',
            },
        };
    }

    return {
        statusCode: 200,
        message: post,
    };
};

const deletePostService = async (idP, userId) => {
    const result = await getByIdService(idP);
    if (result.statusCode === 404) return result;

    const { user: { id } } = result.message;
    if (id === userId) {
        await BlogPost.destroy({ where: { id: idP } });
        return { statusCode: 204, message: result.message };
    }

    return { statusCode: 401, message: { message: 'Unauthorized user' } };
};

const updatePostService = async (idP, userId, { title, content }) => {
    const result = await getByIdService(idP);

    if (result.statusCode === 404) return result;

    const { user: { id } } = result.message;
    if (id === userId) {
        await BlogPost.update(
            { title, content },
            { where: { id: idP } },
        );
        return getByIdService(idP);
    }

    return {
        statusCode: 401,
        message: { message: 'Unauthorized user' },
    };
};

const getByQueryService = async (request) => {
    const queries = { include: [
            { model: Category, as: 'categories' },
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
        ],
    };
    if (request) {
        const postByQuery = await BlogPost.findAll({
            where: {
                [Op.or]: [{ title: { [Op.like]: `%${request}%` } },
                    { content: { [Op.like]: `%${request}%` } },
                ],
            },
            ...queries,
        });
        return { statusCode: 200, message: postByQuery };
    }
    const allPosts = await BlogPost.findAll({ ...queries });
    return { statusCode: 200, message: allPosts };
};

module.exports = {
    newPostService,
    findAllService,
    getByIdService,
    updatePostService,
    deletePostService,
    getByQueryService,
};
