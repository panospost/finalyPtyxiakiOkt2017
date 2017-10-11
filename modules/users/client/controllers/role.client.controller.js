'use strict';

angular.module('users').controller('RoleController', ['$scope','$localStorage','$location',
  function ($scope,$localStorage,$location) {
   // $scope.user = Authentication.user;
   //sunartisi pelati
   $scope.pelatis = function(){
	   $localStorage.localuser.roles ="user";
	   $localStorage.roleflags = true;
	   $localStorage.personalInfoflags = false;
	   $location.path('/signup/personalInfo');
	   
   };   //sunartisi pelati
   
    //sunartisi pratiriouxos
   $scope.pratiriouxos = function(){
	    $localStorage.localuser.roles ='pratiriouxos';
	   $localStorage.roleflags = true;
	   $localStorage.personalInfoflags = false;
	   $location.path('/signup/personalInfo');
   };   //sunartisi pratiriouxos
   
   $scope.show = function(){
	   console.log($localStorage);
   };
    $scope.delete1 = function(){
	   delete $localStorage.lastName;
	   
	};
  }]);