(function () {
  'use strict';

  angular
    .module('libraries')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('libraries', {
        abstract: true,
        url: '/libraries',
        template: '<ui-view/>'
      })
      .state('libraries.list', {
        url: '',
        templateUrl: 'modules/libraries/views/list-libraries.client.view.html',
        controller: 'LibrariesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Libraries List'
        }
      })
      .state('libraries.create', {
        url: '/create',
        templateUrl: 'modules/libraries/views/form-library.client.view.html',
        controller: 'LibrariesController',
        controllerAs: 'vm',
        resolve: {
          libraryResolve: newLibrary
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Libraries Create'
        }
      })
      .state('libraries.edit', {
        url: '/:libraryId/edit',
        templateUrl: 'modules/libraries/views/form-library.client.view.html',
        controller: 'LibrariesController',
        controllerAs: 'vm',
        resolve: {
          libraryResolve: getLibrary
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Library {{ libraryResolve.name }}'
        }
      })
      .state('libraries.view', {
        url: '/:libraryId',
        templateUrl: 'modules/libraries/views/view-library.client.view.html',
        controller: 'LibrariesController',
        controllerAs: 'vm',
        resolve: {
          libraryResolve: getLibrary
        },
        data: {
          pageTitle: 'Library {{ libraryResolve.name }}'
        }
      });
  }

  getLibrary.$inject = ['$stateParams', 'LibrariesService'];

  function getLibrary($stateParams, LibrariesService) {
    return LibrariesService.get({
      libraryId: $stateParams.libraryId
    }).$promise;
  }

  newLibrary.$inject = ['LibrariesService'];

  function newLibrary(LibrariesService) {
    return new LibrariesService();
  }
}());
