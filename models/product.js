'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    title: {type: DataTypes.STRING,
            unique: true},
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        Product.hasMany(models.Review);
      }
    }
  });
  return Product;
};
