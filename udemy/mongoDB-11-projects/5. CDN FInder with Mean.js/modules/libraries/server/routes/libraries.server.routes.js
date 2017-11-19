'use strict';

/**
 * Module dependencies
 */
var librariesPolicy = require('../policies/libraries.server.policy'),
  libraries = require('../controllers/libraries.server.controller');

module.exports = function(app) {
  // Libraries Routes
  app.route('/api/libraries').all(librariesPolicy.isAllowed)
    .get(libraries.list)
    .post(libraries.create);

  app.route('/api/libraries/:libraryId').all(librariesPolicy.isAllowed)
    .get(libraries.read)
    .put(libraries.update)
    .delete(libraries.delete);

  // Finish by binding the Library middleware
  app.param('libraryId', libraries.libraryByID);
};
