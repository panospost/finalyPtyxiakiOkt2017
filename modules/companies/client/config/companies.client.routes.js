'use strict';

// Setting up route
angular.module('companies').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('companies', {
        abstract: true,
        url: '/companies',
        template: '<ui-view/>'
      })
		.state('companies.order', {
        url: '/order/:compan/:companyId/:companyprice/:companythermansi',
        templateUrl: 'modules/companies/client/views/orderSingleCompany.client.view.html'
      })
	  .state('companies.list', {
        url: '',
        templateUrl: 'modules/companies/client/views/list-companies.client.view.html'
      })	  
	  .state('companies.list2', {
        url: '/mycompanies',
        templateUrl: 'modules/companies/client/views/list-companies1.client.view.html'
      })
      .state('companies.create', {
        url: '/create',
        templateUrl: 'modules/companies/client/views/create-company.client.view.html',
        data: {
          roles: ['pratiriouxos', 'admin']
        }
      }).state('companies.history',{
			url:'/history/:companyId',
			templateUrl:'modules/orders/client/views/finishedorders.client.view.html'
	}).state('companies.pending',{
			url:'/pending/:companyId',
			templateUrl:'modules/orders/client/views/pendingorders.client.view.html'
	}).state('companies.view', {
        url: '/:companyId',
        templateUrl: 'modules/companies/client/views/view-company.client.view.html'
      })
      .state('companies.edit', {
        url: '/:companyId/edit',
        templateUrl: 'modules/companies/client/views/edit-company.client.view.html',
        
      }).state('companies.createDrivers', {
        url: '/drivers/:companyId',
        templateUrl: 'modules/companies/client/views/createdrivers.client.view.html',
        
      }).state('companies.listDrivers', {
        url: '/listdrivers/:companyId',
        templateUrl: 'modules/companies/client/views/listdrivers.client.view.html',
        
       }).state('companies.forGuests', {
        url: '/listCompanies/guest',
        templateUrl: 'modules/companies/client/views/guestsViewCompanies.client.view.html',
        
      }).state('UserHome', {
        abstract: true,
        url: '/UserHome',
        templateUrl: 'modules/companies/client/views/UserHome.client.view.html',
        data: {
          roles: ['user', 'admin','pratiriouxos']
        }
      }).state('UserHome.homePage', {
        url: '/homePage',
        templateUrl: 'modules/companies/client/views/homePage.client.view.html'
      }).state('enallaktiki', {
        url: '/enallaktiki',
        templateUrl: 'modules/companies/client/views/enallaktiki.client.view.html'
      }).state('UserHome.companyDetails', {
        url: '/companyDetails/:companyId',
        templateUrl: 'modules/companies/client/views/companyDetails.client.view.html'
      });
  }]);