const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
    },
        {
            timestamps: false,
            underscored: true,
            tableName: 'posts_categories',
        },
    );

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(
            models.Category,
            {
                foreignKey: 'categoryId',
                as: 'categories',
                through: PostCategory,
                otherKey: 'postId'
            },
        );
        models.Category.belongsToMany(
            models.BlogPost,
            {
                foreignKey: 'postId',
                as: 'blog-posts',
                through: PostCategory,
                otherKey: 'categoryId',
            },
        );
    }

    return PostCategory;
};

module.exports = PostCategoryModel;
