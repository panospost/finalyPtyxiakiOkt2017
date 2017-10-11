'use strict';

// Articles controller
angular.module('routes').controller('RoutesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Routes','Companies','$timeout','$http',
function ($scope, $stateParams, $location, Authentication, Routes,Companies,$timeout,$http) {
$scope.authentication = Authentication;

// Create new Article
//date picker

//
$scope.create = function (isValid) {
$scope.error = null;

if (!isValid) {
$scope.$broadcast('show-errors-check-validity', 'orderForm');

return false;
}
//console.log(this.company1);
// Create new Article object
var route = new Routes({

companyname: this.company.companyname,
duedate: this.duedate,
quantity:this.rquantity,
income:this.income,
payment:this.payment,
orders:this.typeOfOrder

});



// Redirect after save
route.$save(function (response) {
$location.path('routes/' + response._id);

// Clear form fields
$scope.title = '';
$scope.content = '';
//console.log(response);
//console.log($scope.company);
}, function (errorResponse) {
$scope.error = errorResponse.data.message;
});
};

/*
$scope.$watch('company',function(newcompany){
$scope.$watch('quantity',function(newquantity){
$scope.pricetp = newquantity*$scope.newcompany.pricepL;
console.log($scope.pricetp);
console.log($scope.company.pricepL);
});});
*/
// Remove existing order
$scope.remove = function (route) {
if (route) {
route.$remove();

for (var i in $scope.routes) {
if ($scope.routes[i] === route) {
$scope.routes.splice(i, 1);
}
}
} else {
$scope.route.$remove(function () {
$location.path('routes');
});
}
};

// Update existing route
$scope.update = function (isValid) {
$scope.error = null;

if (!isValid) {
$scope.$broadcast('show-errors-check-validity', 'orderForm');

return false;
}

var route = $scope.route;

route.$update(function () {
$location.path('routes/' + route._id);
}, function (errorResponse) {
$scope.error = errorResponse.data.message;
});
};

// Find a list of Orders
$scope.find = function () {
$scope.routes = Routes.get();
};

$scope.findcompanies = function () {

// Companies.get({},function(response){
//  $scope.companies =response;
//  });
//deferred.resolve($scope.companies);
//JSON.stringify($scope.companies);
//console.log($scope.companies);//$scope.companies = angular.fromJson($scope.companies);
var value1 = $http.get('api/companies/');
// companyId: $stateParams.companyId
value1.success(function(data, status, headers, config) {
$scope.companies = data;
//console.log($scope.companies);
});

};


// Find existing Article
$scope.findOne = function () {
$scope.route = Routes.read({
routeId: $stateParams.routeId
});
};
}
]);