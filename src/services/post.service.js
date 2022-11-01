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
        return { satusCode: 201, message: result };
    } catch (e) {
        return { statusCode: 404, message: e.message };
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

    const response = await newPost(title, content, categoryIds, userId);
    return response;
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

module.exports = {
    newPostService,
    findAllService,
    getByIdService,
};
