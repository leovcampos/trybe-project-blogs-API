const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define("BlogPost", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
        userId: DataTypes.INTEGER,
    },
        {
            underscored: true,
            timestamps: false,
            tableName: "blog_posts",
        }
    );

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    }

    return BlogPost;
};

module.exports = BlogPostModel;
