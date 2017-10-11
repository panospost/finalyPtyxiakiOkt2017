'use strict';

angular.module('admin').controller('AdminController', ['$scope', '$stateParams', '$state', '$filter', '$location', 'Authentication', 'Admin','$http',
	function($scope, $stateParams, $state, $filter, $location, Authentication, Admin,$http) {
		$scope.authentication = Authentication;
		/*
		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		*/
		$scope.remove = function(user) {
			if(confirm('Are you sure you want to delete this user?')) {
				if (user) {
					user.$remove();

					$scope.adminusers.splice($scope.adminusers.indexOf(user),1);

				} else {
					$scope.adminuser.$remove(function() {
						$state.go('admin.list');
					});
				}
			}
		};
		
		$scope.removeMessage = function(message) {
			if(confirm('Are you sure you want to delete this user?')) {
				if (message) {
					message.$remove();

					$scope.messagers.splice($scope.adminusers.indexOf(message),1);

				} else {
					$scope.adminuser2.$remove(function() {
						$state.go('adminmessages');
					});
				}
			}
		};
		
		
		
		

		$scope.update = function() {
			var user = $scope.adminuser;

			user.$update(function() {
				$location.path('admin/' + user._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			 Admin.query(function (data) {
				 $scope.adminusers = data;
				$scope.buildPager();
			});
		};
		

		$scope.findOne = function() {
			$scope.adminuser = Admin.get({
				userId: $stateParams.userId
			});
		};

		$scope.buildPager = function () {
			$scope.pagedItems = [];
			$scope.itemsPerPage = 15;
			$scope.currentPage = 1;
			$scope.figureOutItemsToDisplay();
		};

		$scope.figureOutItemsToDisplay = function () {
			$scope.filteredItems = $filter('filter')($scope.adminusers, { $: $scope.search});
			$scope.filterLength = $scope.filteredItems.length;
			var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
			var end = begin + $scope.itemsPerPage;
			$scope.pagedItems = $scope.filteredItems.slice(begin, end);
		};

		$scope.pageChanged = function() {
			$scope.figureOutItemsToDisplay();
		};
		///
		$scope.findMessages = function() {
			$http.get('/api/message').success(function(data){
				//console.log(data);
				console.log(data);
				$scope.messages = data;
				$scope.buildPager2();
			}).error(function(error){
				//console.log(error);
			});
		};
		$scope.buildPager2 = function () {
			$scope.pagedItems2 = [];
			$scope.itemsPerPage2 = 15;
			$scope.currentPage2 = 1;
			$scope.figureOutItemsToDisplay2();
		};
		$scope.figureOutItemsToDisplay2 = function () {
			$scope.filteredItems2 = $filter('filter')($scope.messages, { $: $scope.search2});
			$scope.filterLength2 = $scope.filteredItems2.length;
			var begin = (($scope.currentPage2 - 1) * $scope.itemsPerPage2);
			var end = begin + $scope.itemsPerPage2;
			$scope.pagedItems2 = $scope.filteredItems2.slice(begin, end);
		};
		$scope.pageChanged2 = function() {
			$scope.figureOutItemsToDisplay2();
		};
		$scope.findMessage = function() {
			$http.get('/api/messageOne?messageId='+$stateParams.messageId).success(function(data){
				//console.log(data);
				
				$scope.adminuser2 = data;
			}).error(function(error){
				console.log(error);
			});
		};
	}
]);