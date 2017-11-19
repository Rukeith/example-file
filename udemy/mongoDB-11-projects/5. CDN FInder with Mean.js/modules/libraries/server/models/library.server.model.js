'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Library Schema
 */
var LibrarySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Library name',
    trim: true
  },
  url: {
    type: String,
    default: '',
    required: 'Please fill Library url',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  version: {
    type: String,
    default: '',
    trim: true
  },
  type: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Library', LibrarySchema);
