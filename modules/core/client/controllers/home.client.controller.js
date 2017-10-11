'use strict';

angular.module('core').controller('HomeController', ['$scope','Authentication','$http','$mdDialog','$mdToast',
  function ($scope, Authentication,$http,$mdDialog,$mdToast) {
	
    // This provides Authentication context.
    $scope.authentication = Authentication;
	
	
	 $scope.sendMessage = function(isValid){
		   if (!isValid) {
			  
          $scope.$broadcast('show-errors-check-validity', 'messageForm');
		

        return false;
      }
		
	};
	
	var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $scope.showSimpleToast = function() {
    var pinTo = $scope.getToastPosition();
	var data=({
		user:this.contactName,
		email:this.email,
		bodyofMessage:this.contactMsg
	});
	$http.post('api/users/sendMessage',data)
		.success(function(data,status,headers,config){
			 $mdToast.show(
			  $mdToast.simple()
				.textContent('Το μήνυμα σας στάλθηκε επιτυχώς')
				.position(pinTo )
				.hideDelay(3000)
			);
			
		}).error(function(data,status,headers,config){
			
		});
		$scope.contactName=null;
		$scope.email=null;
		$scope.contactMsg=null;
		   
		// Set back to pristine.
		$scope.contactForm.$setPristine();
		// Since Angular 1.3, set back to untouched state.
		$scope.contactForm.$setUntouched();
  };
	
	
 function DialogController($scope, $mdDialog) {
	 
	 
	 
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
  
   $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'modules/core/client/views/login.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
	
	
  }
]);
