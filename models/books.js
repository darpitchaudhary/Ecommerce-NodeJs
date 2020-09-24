'use strict';
module.exports = (sequelize, DataTypes) => {
  var Books = sequelize.define('Books', {
    bookId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      id:{
        allowNull: false,
        type: DataTypes.UUID,
      },
      seller_id:{
        allowNull: false,
        type: DataTypes.UUID,
      },
      isbn: {
        allowNull: false,
        type: DataTypes.STRING
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      authors: {
        allowNull: false,
        type: DataTypes.STRING
      },
      publicationDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      price: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
    },
    {
      freezeTableName: true
    });
  
    Books.associate = models => {
    Books.belongsTo(models.Users, { foreignKey: 'seller_id' });
    Books.hasMany(models.Cart, { foreignKey: 'bookForeignId'});
  };

  return Books;
};