(function () {
  'use strict';

  angular
    .module('libraries')
    .controller('LibrariesListController', LibrariesListController);

  LibrariesListController.$inject = ['LibrariesService'];

  function LibrariesListController(LibrariesService) {
    var vm = this;

    vm.libraries = LibrariesService.query();
  }
}());
