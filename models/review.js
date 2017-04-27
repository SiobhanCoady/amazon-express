'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    content: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Review.belongsTo(models.Product);
      }
    }
  });
  return Review;
};
