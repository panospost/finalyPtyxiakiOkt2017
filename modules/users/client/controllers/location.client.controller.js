'use strict';

angular.module('users').controller('LocationController',  ['$rootScope','$state', '$http','$timeout', '$location', '$window', 'Authentication','uiGmapGoogleMapApi','uiGmapIsReady','$localStorage',
  function ($scope, $state, $http, $timeout, $location, $window, Authentication,uiGmapGoogleMapApi,uiGmapIsReady,$localStorage)
  {
   // $scope.user = Authentication.user;
   $scope.credentials1={
		
		latitude:$localStorage.localuser.latitude,
		longitude:$localStorage.localuser.longitude,
		area:$localStorage.localuser.area,
		city:$localStorage.localuser.city,
		street:$localStorage.localuser.street,
		loc:$localStorage.localuser.loc
		
	 
	  };
	  $scope.map1 = {
					control:{},
					refresh:{},
				center: {
					   latitude:$scope.credentials1.latitude||40.724585999999995 , 
                   longitude:$scope.credentials1.longitude ||22.996168599999997
				},
				draggable: true,
				zoom: 10
			};
	
	
	 $scope.marker1 = {
			  id: 321,
			  coords: {
					latitude:$scope.credentials1.latitude||40.724585999999995 , 
                   longitude:$scope.credentials1.longitude ||22.996168599999997
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
			
					        	$scope.credentials1.latitude = marker.getPosition().lat();
								  $scope.credentials1.longitude = marker.getPosition().lng();

					  $scope.marker1.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
					  };
					}
			  }
			};
	  
	  
	  $scope.areas = [
			'Αττική',
			'Εύβοιας',
			'Ευρυτανίας',
			'Φωκίδας',
			'Φθοιώτιδας',
			'Βοιωτίας',
			'Χαλκιδικής',
			'Ημαθίας',
			'Κιλκίς',
			'Πέλλας',
			'Πιερίας',
			'Σερρών',
			'Θεσσαλονίκης',
			'Χανίων',
			'Ηρακλείου',
			'Λασιθίου',
			'Ρεθύμνης',
			'Δράμας',
			'Εβρου',
			'Καβάλας',
			'Ροδόπης',
			'Ξανθης',
			'Αρτας',
			'Ιωαννίνων',
			'Πρέβεζας',
			'Θεσπρωτίας',
			'Κέρκυρας',
			'Κεφαλληνίας',
			'Λευκάδας',
			'Ζακύνθου',
			'Χιου',
			'Λεσβου','Σαμου','Αρκαδίας','Αργολίδας','Κορινθίας','Λακωνίας',
			'Μεσσηνίας','Κυκλάδων','Δωδεκανήσου','Καρδίτσας','Λάρισας','Μαγνησίας',
			'Τρικάλων','Αχαΐας','Αιτωλοακαρνανίας','Ηλείας','Φλώρινας','Γρεβενών','Καστοριάς','Κοζάνης'
			
			
		];
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
			$scope.credentials1.latitude = place[0].geometry.location.lat();
			 $scope.credentials1.longitude = place[0].geometry.location.lng();
			$scope.credentials1.loc = [ place[0].geometry.location.lng(),place[0].geometry.location.lat()];
			console.log(place[0].formatted_address);
			$scope.latitude = place[0].geometry.location.lat();
			$scope.longitude = place[0].geometry.location.lng();
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
			
					        	$scope.credentials1.latitude = marker.getPosition().lat();
								 $scope.credentials1.longitude = marker.getPosition().lng();
								$scope.credentials1.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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

                $scope.credentials1.latitude = position.coords.latitude; 
               $scope.credentials1.longitude = position.coords.longitude;
			   $scope.credentials1.loc = [position.coords.longitude,position.coords.latitude];
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
			
					        	$scope.credentials1.latitude = marker.getPosition().lat();
								 $scope.credentials1.longitude = marker.getPosition().lng();
								$scope.credentials1.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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
        
    }
	
	};//getLocation
	 
		$scope.next = function(isValid){
			if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'locForm');

        return false;
      }
		
		 $localStorage.localuser.longitude = $scope.credentials1.latitude;
		 $localStorage.localuser.longitude = $scope.credentials1.longitude;
		 $localStorage.localuser.area = $scope.credentials1.area;
		 $localStorage.localuser.city = $scope.credentials1.city;	
		 $localStorage.localuser.street = $scope.address;
		 $localStorage.localuser.loc = $scope.credentials1.loc;
		 
		$localStorage.locationflags = true;
		$localStorage.credentialflags = false;
		$location.path('/signup/credentials'); 
	  
			
			
			
		};
		
		 
		$scope.back = function () {
			$localStorage.locationflags = true;
			$localStorage.personalInfoflags = false;
			$location.path('/signup/personalInfo');
			
		 };
   
   
   
  }
]);