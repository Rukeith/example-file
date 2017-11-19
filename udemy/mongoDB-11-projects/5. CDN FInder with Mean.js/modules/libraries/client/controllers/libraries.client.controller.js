(function () {
  'use strict';

  // Libraries controller
  angular
    .module('libraries')
    .controller('LibrariesController', LibrariesController);

  LibrariesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'libraryResolve'];

  function LibrariesController ($scope, $state, $window, Authentication, library) {
    var vm = this;

    vm.authentication = Authentication;
    vm.library = library;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Library
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.library.$remove($state.go('libraries.list'));
      }
    }

    // Save Library
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.libraryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.library._id) {
        vm.library.$update(successCallback, errorCallback);
      } else {
        vm.library.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('libraries.view', {
          libraryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
