// Libraries service used to communicate Libraries REST endpoints
(function () {
  'use strict';

  angular
    .module('libraries')
    .factory('LibrariesService', LibrariesService);

  LibrariesService.$inject = ['$resource'];

  function LibrariesService($resource) {
    return $resource('api/libraries/:libraryId', {
      libraryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
