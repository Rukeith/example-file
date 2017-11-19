'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Library = mongoose.model('Library'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Library
 */
exports.create = function(req, res) {
  var library = new Library(req.body);
  library.user = req.user;

  library.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(library);
    }
  });
};

/**
 * Show the current Library
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var library = req.library ? req.library.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  library.isCurrentUserOwner = req.user && library.user && library.user._id.toString() === req.user._id.toString();

  res.jsonp(library);
};

/**
 * Update a Library
 */
exports.update = function(req, res) {
  var library = req.library;

  library = _.extend(library, req.body);

  library.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(library);
    }
  });
};

/**
 * Delete an Library
 */
exports.delete = function(req, res) {
  var library = req.library;

  library.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(library);
    }
  });
};

/**
 * List of Libraries
 */
exports.list = function(req, res) {
  Library.find().sort('-created').populate('user', 'displayName').exec(function(err, libraries) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(libraries);
    }
  });
};

/**
 * Library middleware
 */
exports.libraryByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Library is invalid'
    });
  }

  Library.findById(id).populate('user', 'displayName').exec(function (err, library) {
    if (err) {
      return next(err);
    } else if (!library) {
      return res.status(404).send({
        message: 'No Library with that identifier has been found'
      });
    }
    req.library = library;
    next();
  });
};
