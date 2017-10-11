'use strict';

// Articles controller
angular.module('orders').config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProvider) {
		GoogleMapApiProvider.configure({
	            key: 'AIzaSyA7960ao5UyglbLXu6cQwgMB0X8ScvE52s',
	          v: '3.20',
	        libraries: 'weather,geometry,visualization,places'
	    });
	}]).controller('OrdersController', ['$rootScope','$scope', '$stateParams', '$location', 'Authentication', 'Orders','Companies','$timeout','$http','$filter','$interval','$uibModal','uiGridConstants','uiGmapGoogleMapApi','uiGmapIsReady',
  function ($rootScope,$scope, $stateParams, $location, Authentication, Orders,Companies,$timeout,$http,$filter,$interval,$uibModal,uiGridConstants,uiGmapGoogleMapApi,uiGmapIsReady,IsReady) {
    $scope.authentication = Authentication;
	$scope.waypayment=['Μετρητά','Πιστωτική καρτα'];
	$scope.tporder = ['Πετρέλαιο Θέρμανσης'];
	$scope.hours = ['Πρωί(8-12)','Μεσημέρι(12-4)','Απόγευμα(4-8)'];
	$scope.pendingHint = 'Δεν υπάρχουν υπο διεκπαιρέωση παραγγελίες';
	$scope.historyHint = 'Δεν έχετε ολοκληρώσει ακόμα παραγγελίες';
	$scope.orderlongitude = $scope.authentication.longitude;
		$scope.orderlatitude=$scope.authentication.latitude;
    // dataepicker
	
	$scope.duedate = new Date();
	$scope.dateOptions = {
    dateDisabled: $scope.disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };
  
   $scope.minDate = new Date(
        $scope.duedate.getFullYear(),
        $scope.duedate.getMonth(),
        $scope.duedate.getDate() + 2);
	$scope.duedate=$scope.minDate;	
	$scope.dd = function(){
		
		console.log(this.duedate.toISOString().split("T")[0]);
		//console.log(this.duedate.toISOString().split("T")[0].split('"')[1]);
	};

  // Disable weekend selection
  $scope.disabled = function(date) {
	  var d=new Date()+2;
   // var date = data.date,
   //   mode = data.mode;
   // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    var day = date.getDay();
               return day === 1 || day === 2||day ===3||day === 4||day === 5||day === 6&&day!==d;
  };

  

  
  

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  $scope.afterTomorrow = new Date();
  $scope.afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: $scope.afterTomorrow,
      status: 'partially'
    }
  ];
	//gridOptions1
	$rootScope.gridOptions1 = {
		 exporterMenuCsv: false,
		 enableRowSelection: true,
		 enableRowHeaderSelection: false,
		 showColumnFooter: true,
		 enableGridMenu: true,
		 showGridFooter: true,
        enableSorting: true,
		
		
        columnDefs: [
		{ name:'Πελάτης', field: 'user.displayName'},
          { name:'Είδος Παραγγελίας', field: 'typeOfOrder'},
          { name:'Ποσότητα(λίτρα)', field: 'quantity',aggregationType: uiGridConstants.aggregationTypes.sum },
		  { name:'Εσοδα(ευρώ)', field: 'pricetp',aggregationType: uiGridConstants.aggregationTypes.sum },          
		  { name:'Μύνημα πελάτη', field: 'message'},
		  { name:'Tρόπος Πληρωμής', field: 'payment'},
		  { name:'Ημ.Παραλαβής', field: 'duedate'},
		  { name:'Ζώνη ώρας', field: 'hour'}
        ]
		
        
      };
	 
		

 

		  $scope.gridOptions1.multiSelect = false;
		  $scope.gridOptions1.modifierKeysToMultiSelect = false;
		  $scope.gridOptions1.noUnselect = false;
		  $scope.gridOptions1.onRegisterApi = function( gridApi ) {
			$scope.gridApi1 = gridApi;
		  };

	//
	//gridOptions
	
	$rootScope.gridOptions = {
		 exporterMenuCsv: false,
		 enableRowSelection: true,
		 enableRowHeaderSelection: false,
		 showColumnFooter: true,
		 enableGridMenu: true,
		 showGridFooter: true,
        enableSorting: true,
		
		
        columnDefs: [
		{ name:'Πελάτης', field: 'user.displayName'},
          { name:'Είδος Παραγγελίας', field: 'typeOfOrder'},
          { name:'Ποσότητα(λίτρα)', field: 'quantity',aggregationType: uiGridConstants.aggregationTypes.sum },
		  { name:'Εσοδα(ευρώ)', field: 'pricetp',aggregationType: uiGridConstants.aggregationTypes.sum },          
		  { name:'Μύνημα πελάτη', field: 'message'},
		  { name:'Tρόπος Πληρωμής', field: 'payment'},
		  { name:'Ημ.Παραλαβής', field: 'duedate'},
		  { name:'Ζώνη ώρας', field: 'hour'}
        ]
		
        
      };
	 
		

 

		  $scope.gridOptions.multiSelect = false;
		  $scope.gridOptions.modifierKeysToMultiSelect = false;
		  $scope.gridOptions.noUnselect = false;
		  $scope.gridOptions.onRegisterApi = function( gridApi ) {
			$scope.gridApi = gridApi;
		  };
		
	//gia to map tis create
	$scope.orderlongitude = $scope.authentication.longitude;
		$scope.orderlatitude=$scope.authentication.latitude;
	$scope.map1 = {
					control:{},
					refresh:{},
				center: {
					   latitude:$scope.orderlatitude||40.724585999999995 , 
                   longitude:$scope.orderlongitude ||22.996168599999997
				},
				draggable: true,
				zoom: 10
			};
	
	
	 $scope.marker1 = {
			  id: 321,
			  coords: {
					latitude:$scope.orderlatitude||40.724585999999995 , 
                   longitude:$scope.orderlongitude ||22.996168599999997
			  },
			  options: { 
							draggable: true,
						  labelContent:"Βρες την ακριβη σου θέση",
						  labelAnchor: "100 0",
						  labelClass:"marker-labels"
						 },
			  events: {
						dragstart: function (marker, eventName, args) {
								//  $log.log('marker dragstart');
								  lati = marker.getPosition().lat();
								  longi = marker.getPosition().lng();
								 	console.log('marker lat is '+lati);
								console.log('marker lng is '+longi);

								  $scope.marker1.options = {
									draggable: true,
									labelContent:"O marker kounietai",
									 labelAnchor: "100 0",
									labelClass:"marker-labels"
									
									
								  };
						},
					dragend: function (marker, eventName, args) {
					//  $log.log('marker dragend');
					//$localStorage.newlat = marker.getPosition().lat();
					 // $localStorage.newlng = marker.getPosition().lng();
								
					        	$scope.orderlatitude = marker.getPosition().lat();
								  $scope.orderlongitude  = marker.getPosition().lng();

					  $scope.marker1.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
					  };
					}
			  }
			};
	
	var lati = "";
		var longi = "";
		//σεαρσ μποξ
		var events = {
		places_changed: function (searchBox) {
        var place = searchBox.getPlaces();
		
		
        if (!place || place === 'undefined' || place.length === 0) {
            console.log('no place data :(');
            return;
        }
		$scope.address = place[0].formatted_address;
			//$scope.preUser.latitude = place[0].geometry.location.lat();
			// $scope.preUser.longitude = place[0].geometry.location.lng();
			 $scope.orderlatitude =  place[0].geometry.location.lat();
			 $scope.orderlongitude  = place[0].geometry.location.lng();
			//$scope.preUser.loc = [ place[0].geometry.location.lng(),place[0].geometry.location.lat()];
			//$scope.preUser.street = place[0].formatted_address;
			//$scope.latitude = place[0].geometry.location.lat();
			//$scope.longitude = place[0].geometry.location.lng();
        $scope.map1 = {
            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 18
        };
        $scope.marker1 = {
             id: 321,
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            },options: { 
							draggable: true,
						  labelContent:"Βρες την ακριβη σου θέση",
						  labelAnchor: "100 0",
						  labelClass:"marker-labels"
						 },
			  events: {
						dragstart: function (marker, eventName, args) {
								//  $log.log('marker dragstart');
								  lati = marker.getPosition().lat();
								  longi = marker.getPosition().lng();
								// 	console.log('marker lat is '+lati);
								//console.log('marker lng is '+longi);

								  $scope.marker1.options = {
									draggable: true,
									labelContent:"O marker kounietai",
									 labelAnchor: "100 0",
									labelClass:"marker-labels"
									
									
								  };
						},
					dragend: function (marker, eventName, args) {
					//  $log.log('marker dragend');
					//$localStorage.newlat = marker.getPosition().lat();
					 // $localStorage.newlng = marker.getPosition().lng();
								$scope.orderlatitude = marker.getPosition().lat();
							$scope.orderlongitude=marker.getPosition().lng();
					        	//$scope.preUser.latitude = marker.getPosition().lat();
							//	 $scope.preUser.longitude = marker.getPosition().lng();
							//	$scope.preUser.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
					  $scope.marker1.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
							};
						}
					}
				};
			}
		};
	  $scope.searchbox = { template: 'searchbox.tpl.html', events: events };
	  
	  $scope.getLocation = function(){
		//$scope.open();
		 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

                $scope.orderlatitude  = position.coords.latitude; 
                $scope.orderlongitude= position.coords.longitude;
			  // $scope.preUser.loc = [position.coords.longitude,position.coords.latitude];
                //console.log($scope.credentials.latitude);
               // console.log($scope.credentials.longitude);
				//
		
		  $scope.map1 = {
					control:{},
					refresh:{},
				center: {
					   latitude:position.coords.latitude||40.724585999999995 , 
                   longitude:position.coords.longitude ||22.996168599999997
				},
				draggable: true,
				zoom: 15
			};
        $scope.marker1 = {
             id: 321,
            coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },options: { 
							draggable: true,
						  labelContent:"Βρες την ακριβη σου θέση",
						  labelAnchor: "100 0",
						  labelClass:"marker-labels"
						 },
			  events: {
						dragstart: function (marker, eventName, args) {
								//  $log.log('marker dragstart');
								  lati = marker.getPosition().lat();
								  longi = marker.getPosition().lng();
								 //	console.log('marker lat is '+lati);
							//	console.log('marker lng is '+longi);

								  $scope.marker1.options = {
									draggable: true,
									labelContent:"O marker kounietai",
									 labelAnchor: "100 0",
									labelClass:"marker-labels"
									
									
								  };
						},
					dragend: function (marker, eventName, args) {
					//  $log.log('marker dragend');
					//$localStorage.newlat = marker.getPosition().lat();
					 // $localStorage.newlng = marker.getPosition().lng();
			
					        	 $scope.orderlatitude = marker.getPosition().lat();
								 $scope.orderlongitude = marker.getPosition().lng();
								//$scope.preUser.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
					  $scope.marker1.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
							};
						}
					}
				};
				
				
				
				////
        },
				function(error) {
					// On error code..
					$scope.showError(error);
				},
				{timeout: 5000, enableHighAccuracy: true, maximumAge: 75000});
        
      
		 }};
	//create
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'orderForm');

        return false;
      }
	   $scope.duedate.setDate($scope.duedate.getDate() + 1);
		//console.log(this.company1);
      // Create new Article object
      var order = new Orders({
		 company:this.compan,
        companyname: this.company,
        duedate: this.duedate.toISOString().split("T")[0],
		quantity:this.quantity,
		message:this.message,
		payment:this.payment,
		typeOfOrder:this.typeOfOrder,
		pricetp:this.pricetp,
		hour:this.hour,
		orderlongitude:this.orderlongitude,
		orderlatitude:this.orderlatitude
      });
		
			
		
      // Redirect after save
      order.$save(function (response) {
        $location.path('/orders');

        
		//console.log(response);
		//console.log($scope.company);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
	
	
	$scope.calc =function(){
		$scope.$watch('quantity', function(newVal, oldVal){
			$scope.pricetp = $scope.quantity*$scope.company.pricepL;
		}, true);
	};
	
	$scope.calc1 =function(){
		$scope.$watch('quantity', function(newVal, oldVal){
			if($scope.typeOfOrder=='Πετρέλαιο Κίνησης'){
			$scope.pricetp = $scope.quantity*$scope.pricepL1;
			}else{
				$scope.pricetp = $scope.quantity*$scope.pricepTh;
			}
		}, true);
	};
	
	
    // Remove existing order
    $scope.remove = function (order,orders,order2) {
      //if (order) {
        //order.$remove();
		var value1 = $http.post('/api/orders1/'+order);
		value1.success(function(data, status, headers, config) {
					  for (var i in orders) {
						  if (orders[i] === order2) {
							orders.splice(i, 1);
						  }
					}
		});
      
       
    };

    // Update existing order
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'orderForm');

        return false;
      }

      var order = $scope.order;

      order.$update(function () {
        $location.path('orders/' + order._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Orders
    $scope.find = function () {
      $scope.orders = Orders.get();
	  $scope.gridOptions.data =  $scope.orders;
	  console.log($rootScope.company);
	  
	  
    };
	
	$scope.findcompanies = function () {
		
     // Companies.get({},function(response){
		//  $scope.companies =response;
	//  });
	  //deferred.resolve($scope.companies);
	  //JSON.stringify($scope.companies);
      //console.log($scope.companies);//$scope.companies = angular.fromJson($scope.companies);
	  var value1 = $http.get('api/companiesCloseClient');
		 // companyId: $stateParams.companyId
		value1.success(function(data, status, headers, config) {
					$scope.companies = data;
					//console.log($scope.companies);
				});
	  
    };
	
	$scope.findsingleCompany = function () {
					$scope.compan = $stateParams.compan
					$scope.company = $stateParams.companyId;
				//	$scope.pricepL1 = data.pricepL;
					$scope.pricepL1= $stateParams.companyprice;
					//console.log($scope.pricepL1);
					$scope.pricepTh= $stateParams.companythermansi;
				//});
	  
    };
	
	
	
	//find finished orders - Istoriko paraggeliwn gia etaireies
	$scope.finishedOrders = function(){
			 //console.log($stateParams.companyId);
				var value1 = $http.get('api/finishedOrders?companyname='+$stateParams.companyId);
				
				value1.success(function(data, status, headers, config) {
							$scope.orders = data;
							$scope.gridOptions.data=data;
						});//value1
			
		//});//valval
	};
	//find pending orders
	$scope.pendingOrders = function(){
			 //console.log($stateParams.companyId);
				var value1 = $http.get('/api/corders/company?companyname='+$stateParams.companyId);
				
				value1.success(function(data, status, headers, config) {
							$scope.orders = data;
							$scope.gridOptions1.data=data;
						});//value1
			
		//});//valval
	};
	//istoriko paraggeliwn gia xrhstes
	$scope.historyUser = function(){
		
		var val = $http.get('api/ordersOfUser');
		 // companyId: $stateParams.companyId
		val.success(function(data, status, headers, config) {
					$scope.orders = data;
					console.log(data);
					$scope.finishOrder = $filter('filter')($scope.orders, {finished: "true"});
					$scope.pendingOrder = $filter('filter')($scope.orders, {finished: 'false'});
				});
		
	};
	
    // Find existing Article
    $scope.findOne = function () {
      $scope.order = Orders.read({
        orderId: $stateParams.orderId
      });
    };
	
	

  
	
	//
  }
]);
angular.module('orders').controller('ModalCtrl', ['$rootScope','$scope','$modalInstance',
   function($rootScope,$scope,$modalInstance){
	$scope.abool=false;
		  $scope.ok = function () {
			  console.log($rootScope.gridOptions1.data);
			  $scope.abool=true;
			  //κανε τα waypoints
			  //kane to routing
			  //update ta orders
			  //save to routing analoga to fortigo gia to id
			  
			  
			  
			  
			$modalInstance.close($scope.abool);
		  };

		  $scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		  };
}]);
