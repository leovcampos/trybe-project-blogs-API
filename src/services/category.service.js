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

module.exports = {
    newCategory,
};
