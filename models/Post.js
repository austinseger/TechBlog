const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true, // Ensures the table name is not pluralized
    underscored: true,
    modelName: 'post', // This ensures that the model uses the 'post' table
    tableName: 'post', // Explicitly set the table name to 'post'
  }
);

module.exports = Post;
