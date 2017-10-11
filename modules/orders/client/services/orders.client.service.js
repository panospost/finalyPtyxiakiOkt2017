'use strict';

//Order service used for communicating with the orders REST endpoints
angular.module('orders').factory('Orders', ['$resource',
  function ($resource) {
    return $resource('api/orders/:orderId', {
      orderId: '@_id'
    }, {
		get:{
			method:'GET',
		isArray:'false'
		},
      update: {
        method: 'PUT',
		isArray:'false'
      },
	  read:{
		  method:'GET'
	  }
    });
  }
]);
angular.module('orders').factory('Companies', ['$resource',
  function ($resource) {
    return $resource('api/companies', {
      
    }, {
		get:{
			method:'GET',
			isArray:'false'
			
		},
      update: {
        method: 'PUT',
		isArray:'false'
      },
	  read:{
		  method:'GET'
		 
	  }
    });
  }
]);