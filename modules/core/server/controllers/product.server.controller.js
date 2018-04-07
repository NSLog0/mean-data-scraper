'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  ObjectId = require('mongoose').Types.ObjectId,
  request = require('request'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.t = function(req, res) {
  var options = {
    url: 'http://www.imdb.com/title/tt1229340/',
    headers: {
      'User-Agent': 'IE'
    }
  };

  request(options, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      fs.writeFile('output.json', html, function(err) {

        console.log('File successfully written! - Check your project directory for the output.json file');

      })
      res.send('Check your console!');
    };
  });
}

exports.list = function(req, res) {
  Product.find().sort('-created').exec(function(err, articles) {
    if (err) {
      return res.status(422).send({message: errorHandler.getErrorMessage(err)});
    } else {
      res.json(articles);
    }
  });
};

exports.create = function(req, res) {
  var product = new Product(req.body);

  product.save(function(err) {
    if (err) {
      return res.status(422).send({message: errorHandler.getErrorMessage(err)});
    } else {
      res.json(product);
    }
  });
};

exports.update = function(req, res) {
  Product.update({
    _id: ObjectId.createFromHexString(req.params.productID.toString())
  }, req.body).exec(function(err) {
    if (err) {
      return res.status(400).send({message: 'update error', err: err});
    } else {
      return res.status(200).json('update success');
    }
  });
};

exports.remove = function(req, res) {
  Product.remove({
    _id: ObjectId.createFromHexString(req.params.productID.toString())
  }).exec(function(err) {
    if (err) {
      return res.status(400).send({message: 'remove error', err: err});
    } else {
      return res.status(200).json('remove success');
    }
  });
};
