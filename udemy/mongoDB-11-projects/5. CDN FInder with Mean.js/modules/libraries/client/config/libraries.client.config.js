(function () {
  'use strict';

  angular
    .module('libraries')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Libraries',
      state: 'libraries.list',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Add Library',
      state: 'libraries.create',
      roles: ['user']
    });
  }
}());
