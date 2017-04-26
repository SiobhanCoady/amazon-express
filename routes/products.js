const express = require('express');
const router = express.Router();

const Product = require('../models/index').Product;

// Products#index
router.get('/', function(req, res, next) {
  Product
    .findAll()
    .then(function(products) {
      res.render('products/index', {products: products});
    });
})

// Products#show
router.get('/:id', function(req, res) {
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product) {
      res.render('products/show', {product: product});
    });
})

module.exports = router;
