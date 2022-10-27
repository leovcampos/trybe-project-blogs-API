const categoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.difine('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING },
    },
        {
            underscored: true,
            tableName: 'categories',
            timestamps: false,
        }
    );
    return Category;
};

module.exports = categoryModel;
