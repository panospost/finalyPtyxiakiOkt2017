'use strict';

angular.module('users').controller('PersonalInfoController', ['$scope','$localStorage','$location',
  function ($scope,$localStorage,$location) {
   // $scope.user = Authentication.user;
   $scope.$storage = $localStorage;
   $scope.credentials1={
		  firstName:$localStorage.localuser.firstName,
		 lastName:$localStorage.localuser.lastName,
		phonenumber:$localStorage.localuser.phonenumber,
		mobile:$localStorage.localuser.mobile,
		email:$localStorage.localuser.email,		
		dehnumber:$localStorage.localuser.dehnumber
	 
	  };
    $scope.next = function(isValid){
		
		if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'personalInfo');

        return false;
      }
		
		
		$localStorage.localuser.firstName = $scope.credentials1.firstName;
		$localStorage.localuser.lastName=$scope.credentials1.lastName;
		$localStorage.localuser.phonenumber=$scope.credentials1.phonenumber;
		$localStorage.localuser.mobile=$scope.credentials1.mobile;
		$localStorage.localuser.email=$scope.credentials1.email;
		$localStorage.localuser.dehnumber = $scope.credentials1.dehnumber;
		$localStorage.locationflags = false;
		$localStorage.personalInfoflags = true;
		$location.path('/signup/location');
	};
	$scope.back = function(){
		$localStorage.roleflags = false;
		$localStorage.personalInfoflags = true;
		$location.path('/signup/role');
	};
  }
]);