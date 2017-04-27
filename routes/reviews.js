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

// Reviews#edit
router.get('/:id/edit', function(req, res) {
  const id = req.params.id;

  Review
    .findById(id)
    .then(function(review) {
      res.render('reviews/edit', {review: review});
    });
})

// Reviews#update
router.patch('/:id', function(req, res, next) {
  const id = req.params.id;

  Review
    .findById(id)
    .then(function(review) {
      return review.update({
        content: req.body.content,
        rating: req.body.rating
      });
    })
    .then(function(review) {
      console.log(review.ProductId);
      res.redirect(`/products/${review.ProductId}`);
    })
    .catch(function(err) { next(err) })
})

module.exports = router;
