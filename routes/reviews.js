const express = require('express');
const router = express.Router({mergeParams: true});

const Models = require('../models/index');
const Product = Models.Product;
const Review = Models.Review;

// Reviews#create
router.post('/', function(req, res) {
  const productId = req.params.productId;

  Review
    .create({
      content: req.body.content,
      rating: parseInt(req.body.rating),
      ProductId: productId})
    .then(function() { res.redirect(`/products/${productId}`) })
})

// Reviews#destroy
router.delete('/:id', function(req, res) {
  const id = req.params.id;
  const productId = req.params.productId;

  Review
    .findById(id)
    .then(function(review) { return review.destroy() })
    .then(function() { res.redirect(`/products/${productId}`) });
})

module.exports = router;
