'use strict';

//Order service used for communicating with the orders REST endpoints
angular.module('companies').factory('Companies', ['$resource',
  function ($resource) {
    return $resource('api/companies/:companyId', {
      companyId: '@_id'
    }, {
		get:{
			method:'GET',
			isArray:'true'
			
		},
      update: {
        method: 'PUT',
		isArray:'true'
      },
	  read:{
		  method:'GET',
		  isArray:'false'
		  
		 
	  }
    });
  }
]);


