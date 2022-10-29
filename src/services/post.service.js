const { Category, BlogPost, PostCategory, User } = require('../models');

const validateCategotyId = async (categoryId) => {
    const categoriesPromises = categoryId.map((element) =>
        Category.findByPk(element));
    const resultPromises = await Promise.all(categoriesPromises);
    const validateCatId = resultPromises.every((element) => element !== null);

    return validateCatId;
};

const newPost = async (title, content, categoryIds, userId) => {
    
};

const newPostService = async ({ title, content, categoryIds }, { id: userId }) => {
    const validateCategories = await validateCategotyId(categoryIds);
    if (!validateCategories) {
        return {
            statusCode: 400,
            message: { message: 'one or more "categoryIds" not found' },
        };
    }

    const response = await newPost();
};

module.exports = {
    newPostService,
};
