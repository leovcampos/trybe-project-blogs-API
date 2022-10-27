const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false,
        },
        published: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false,
        },
    },
        {
            timestamps: false,
            underscored: true,
            tableName: 'blog_posts',
        },
    );

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(
            models.User,
            {
                foreignKey: 'userId',
                as: 'users'
            }
        );
    }
    return BlogPost;
};

module.exports = BlogPostModel;