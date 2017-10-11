'use strict';

angular.module('users').controller('CredentialsController', ['$scope','$localStorage','$location',
  function ($scope,$localStorage,$location) {
   // $scope.user = Authentication.user;
   
   $scope.credentials1={
		  username:$localStorage.localuser.username,
		 password:$localStorage.localuser.password		
	 
	  };
    $scope.next = function(isValid){
		
		if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'personalInfo');

        return false;
      }
		
		
		$localStorage.localuser.username = $scope.credentials1.username;
		$localStorage.localuser.password=$scope.credentials1.password;
		$localStorage.locationflags = false;
		$localStorage.personalInfoflags = false;
		$localStorage.roleflags = false;
		$localStorage.epali8eusiflags = false;
		$localStorage.credentialflags = false;
		$localStorage.apply = false;
		$location.path('/signup/epali8eusi'); 
	};
	$scope.back = function(){
		$localStorage.locationflags = false;
		$localStorage.credentialflags = true;
		$location.path('/signup/location'); 
	};
   
  }
]);