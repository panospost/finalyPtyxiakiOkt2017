'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication','$mdDialog','Users',
  function ($scope, Authentication,$mdDialog,Users) {
    $scope.user = Authentication.user;
	
	
	function showMapCtrl($scope, $mdDialog,Users){
			 $scope.hide = function() {
		  $mdDialog.hide();
		};

		$scope.cancel = function() {
		  $mdDialog.cancel();
		};

			$scope.answer = function(answer) {
			$mdDialog.hide(answer);
			
		
		};
	}
	
	
	$scope.settingsProfile = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
	
	  
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	
	
	
	$scope.settingsPass = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    
	  
	  
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	
	
	
  }
]);
