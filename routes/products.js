const express = require('express');
const router = express.Router();
const reviews = require('./reviews');

const Product = require('../models/index').Product;

// Products#index
router.get('/', function(req, res, next) {
  Product
    .findAll({order: [['createdAt', 'DESC']]})
    .then(function(products) {
      res.render('products/index', {products: products});
    });
})

// Products#new
router.get('/new', function(req, res, next) {
  const product = Product.build();

  res.render('products/new', {product: product});
})

// Products#create
router.post('/', function(req, res, next) {
  const {title, description, price} = req.body;

  Product
  .create({title: title, description: description, price: price})
  .then(function(product) {
    res.redirect(`/products/${product.id}`);
  })
  .catch(function(err) {
    next(err);
  })
})

// Products#destroy
router.delete('/:id', function(req, res) {
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product) { return product.destroy() })
    .then(function() { res.redirect('/products') });
})

// Products#edit
router.get('/:id/edit', function(req, res) {
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product) {
      res.render('products/edit', {product: product})
    });
})

// Products#update
router.patch('/:id', function(req, res, next) {
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product) {
      return product.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      });
    })
    .then(function(product) {
      res.redirect(`/products/${id}`);
    })
    .catch(function(err) { next(err) })
})

// Products#show
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  Product
    .findById(id)
    .then(function(product) {
      return Promise.all([
        product,
        product.getReviews({order: [['createdAt', 'DESC']]})
      ])
    })
    .then(function([product, reviews]) {
      res.render('products/show', {product: product, reviews:reviews});
    });
})

router.use('/:productId/reviews', reviews);

module.exports = router;
