const { Category } = require('../models');

const newCategory = async (name) => {
    const { dataValues } = await Category.create({
        name,
    });

    return {
        statusCode: 201,
        message: dataValues,
    };
};

const getAllCategoriesService = async () => {
    const result = await Category.findAll();
    const message = result.map(({ dataValues }) => dataValues);

    return {
        statusCode: 200,
        message,
    };
};

module.exports = {
    newCategory,
    getAllCategoriesService,
};
