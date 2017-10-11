'use strict';

//Route service used for communicating with the routes REST endpoints
angular.module('routes').factory('Routes', ['$resource',
  function ($resource) {
    return $resource('api/routes/:routeId', {
      routeId: '@_id'
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
