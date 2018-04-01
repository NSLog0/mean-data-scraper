'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  ObjectId = require('mongoose').Types.ObjectId, 
  errorHandler = require(path.resolve(
    './modules/core/server/controllers/errors.server.controller'
  ));


exports.list = function (req, res) {
  Product.find().sort('-created').exec(function (err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

exports.create = function(req, res) {
  var product = new Product(req.body);
  
  product.save(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

exports.update = function(req, res) {
  Product.update({ _id: ObjectId.createFromHexString(req.params.productID.toString()) }, req.body)
 .exec(function(err) {
   if (err) {
     return res.status(400).send({
       message: 'update error',
       err: err
     });
   } else {
     return res.status(200).json('update success');
   }
 }); 
};

exports.remove = function(req, res) {
  Product.remove({ _id: ObjectId.createFromHexString(req.params.productID.toString()) })
 .exec(function(err) {
   if (err) {
     return res.status(400).send({
       message: 'remove error',
       err: err
     });
   } else {
     return res.status(200).json('remove success');
   }
 }); 
};
