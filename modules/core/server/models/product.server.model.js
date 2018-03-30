'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'name cannot be blank'
  },
  url: {
    type: String,
    default: '',
    trim: true
  },
  amount: {
    type: Number,
    default: 0
  },
  prev_amount: {
    type: Number,
    default: 0
  }
});

mongoose.model('Product', ProductSchema);
