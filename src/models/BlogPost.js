const BlogPostModel = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define("BlogPost", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false,
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        }
    },
        {
            underscored: true,
            timestamps: false,
            tableName: "blog_posts",
        }
    );

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
    }

    return BlogPost;
};

module.exports = BlogPostModel;
