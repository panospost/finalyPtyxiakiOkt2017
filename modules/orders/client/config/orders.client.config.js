'use strict';

// Configuring the orders module
angular.module('orders').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Παραγγελίες',
      state: 'orders',
      type: 'dropdown',
      roles: ['*']
    });
	
   
	
    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'orders', {
      title: 'Δημιουργήστε Παραγγελία',
      state: 'orders.create'
      
    });
	 // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'orders', {
      title: 'Οι παραγγελίες μου',
      state: 'orders.list',
	  roles: ['pratiriouxos','user']
    });
	
  }
]);