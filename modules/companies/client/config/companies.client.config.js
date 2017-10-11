'use strict';

// Configuring the orders module
angular.module('companies').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Πρατήρια',
      state: 'companies',
      type: 'dropdown',
      roles: ['*']
    });
	
	Menus.addSubMenuItem('topbar', 'companies', {
      title: 'Πληροφορίες για τα Πρατήρια της περιοχής σου',
      state: 'companies.list'
    });
	
    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'companies', {
      title: 'Προβολή των πρατηρίων μου',
      state: 'companies.list2',
	  roles: ['pratiriouxos']
    });
	
	Menus.addSubMenuItem('topbar', 'companies', {
      title: 'Δημιουργία Πρατηρίου',
      state: 'companies.create',
      roles: ['pratiriouxos']
    });
	
   
  }
]);