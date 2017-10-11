'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin1', {
        abstract: true,
        url: '/admin1',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
]);
