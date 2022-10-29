const { Category, BlogPost, PostCategory, sequelize } = require('../models');

const validateCategotyId = async (categoryId) => {
    const categoriesPromises = categoryId.map((element) =>
        Category.findByPk(element));
    const resultPromises = await Promise.all(categoriesPromises);
    const validateCatId = resultPromises.every((element) => element !== null);

    return validateCatId;
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

module.exports = {
    newPostService,
};
