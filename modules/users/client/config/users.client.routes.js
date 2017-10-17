'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin','pratiriouxos']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
	  .state('signup', {
        abstract: true,
        url: '/signup',
        templateUrl: 'modules/users/client/views/signup1.client.view.html'//this is the real signup
        
      })
      . state('signup.credentials', {
        url: '/credentials',
        templateUrl: 'modules/users/client/views/signup/credentials.client.view.html'
      })
      .state('signup.role', {
        url: '/role',
        templateUrl: 'modules/users/client/views/signup/role.client.view.html'
      })
      .state('signup.personalInfo', {
        url: '/personalInfo',
        templateUrl: 'modules/users/client/views/signup/personalInfo.client.view.html'
      })
      .state('signup.location', {
        url: '/location',
        templateUrl: 'modules/users/client/views/signup/location.client.view.html'
      }).state('signup.epali8eusi', {
        url: '/epali8eusi',
        templateUrl: 'modules/users/client/views/signup/epali8eusi.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      }).state('signout', {
        url: '/api/auth/signout',
        templateUrl: ''
      });
	  
  }
]);
