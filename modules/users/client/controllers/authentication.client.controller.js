'use strict';

angular.module('users').config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProvider) {
		GoogleMapApiProvider.configure({
	        key: 'AIzaSyADFLqoFVhpsHjADFUFEHD7H12vi2kwLtE',
	          v: '3.20',
	        libraries: 'weather,geometry,visualization,places'
	    });
	}]).directive('compareTo', function() {
			 return {
				  require: "ngModel",
				  scope: {
					otherModelValue: "=compareTo"
				  },
				  link: function(scope, element, attributes, ngModel) {

					ngModel.$validators.compareTo = function(modelValue) {
					  return modelValue === scope.otherModelValue;
					};

					scope.$watch("otherModelValue", function() {
					  ngModel.$validate();
					});
				  }
				};
}).controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication','$uibModal',
  function ($scope, $state, $http, $location, $window, Authentication,$uibModal) {
	  $scope.credentials={
		  firstName:"",
		 lastName:"",
		username:"",
		password:"",
		phonenumber:0,
		mobile:null,
		email:"",
		roles:"user",
		latitude:"",
		longitude:"",
		area:"",
		city:"",
		street:"",
		loc:[0,0],
		dehnumber:null
	 
	  };
	  var lati="";
	  var longi="";
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
		//σεαρσ μποξ
		 var events = {
    places_changed: function (searchBox) {
        var place = searchBox.getPlaces();
		
		
        if (!place || place === 'undefined' || place.length === 0) {
            console.log('no place data :(');
            return;
        }
		$scope.address = place[0].formatted_address;
			$scope.credentials.latitude = place[0].geometry.location.lat();
			 $scope.credentials.longitude = place[0].geometry.location.lng();
			$scope.credentials.loc = [ place[0].geometry.location.lng(),place[0].geometry.location.lat()];
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
			
					        	$scope.credentials.latitude = marker.getPosition().lat();
								 $scope.credentials.longitude = marker.getPosition().lng();
								$scope.credentials.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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
		
		
		
    $scope.authentication = Authentication;
	
	$scope.map1 = {

				center: {
					   latitude:$scope.credentials.latitude||40.724585999999995 , 
                   longitude:$scope.credentials.longitude ||22.996168599999997
				},
				draggable: true,
				zoom: 10
			};
	
	
	 $scope.marker1 = {
			  id: 321,
			  coords: {
					latitude:$scope.credentials.latitude||40.724585999999995 , 
                   longitude:$scope.credentials.longitude ||22.996168599999997
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
			
					        	$scope.credentials.latitude = marker.getPosition().lat();
								  $scope.credentials.longitude = marker.getPosition().lng();

					  $scope.marker1.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
					  };
					}
			  }
			};
	//τηε μαπ
	
    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }
	//get position coordinates
	$scope.getLocation = function(){
		//$scope.open();
		 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

                $scope.credentials.latitude = position.coords.latitude; 
               $scope.credentials.longitude = position.coords.longitude;
			   $scope.credentials.loc = [position.coords.longitude,position.coords.latitude];
                console.log($scope.credentials.latitude);
                console.log($scope.credentials.longitude);
				//
				$scope.map1 = {
            "center": {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            },
            "zoom": 18
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
			
					        	$scope.credentials.latitude = marker.getPosition().lat();
								 $scope.credentials.longitude = marker.getPosition().lng();
								$scope.credentials.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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
	$scope.showError = function(error){
		console.log(error);
	};

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

			//console.log("angular"+$scope.roles);

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
		
		//console.log($scope.authentication.user.roles);
		  // And redirect to the previous or home page
		  
		  //console.log($scope.authentication.user.roles);
		  
		  
        $state.go($state.previous.state.name || 'home', $state.previous.params);
		 //console.log($scope.authentication.user.roles);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid,lati,longi) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials,lati,longi).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
		 $scope.map=response.latitude;
	  longi=response.longitude;
	  
	  if($scope.authentication.user.roles[0] ==='pratiriouxos'){
		   $state.go( 'companies.list2');
	  }else{
        // And redirect to the previous or home page
        $state.go( 'home');
	  }
		//$location.path('/companies');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
	////
	 $scope.map = {

            center: {
                latitude: $scope.authentication.user.latitude,
					longitude: $scope.authentication.user.longitude
            },
            draggable: true,
            zoom: 10
        };
        // map options
        $scope.options = {
            scrollwheel: true,
            panControl: true,
            rotateControl: true,
            scaleControl: true,
            streetViewControl: true
        };

        // map marker
          $scope.marker = {
			  id: 0,
			  coords: {
					latitude: $scope.authentication.user.latitude,
					longitude: $scope.authentication.user.longitude
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

								  $scope.marker.options = {
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
			
						lati = marker.getPosition().lat();
								  longi = marker.getPosition().lng();

					  $scope.marker.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
					  };
					}
			  }
			};
			/////////////
	////////////////////////σαηναπ μαπ για τεστ
	
	//logiki t modal
	$scope.open = function () {
	  
		
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalController1',
      size: 'sm',
	  resolve: {
        string: function () {
          return $scope.str;
        }
      }
    });
	modalInstance.result.then(function (string) {
		if(string==='pelatis'){
			$scope.credentials.roles ='user';
		}else if(string==='pratiriouxos'){
			$scope.credentials.roles ='pratiriouxos';
		}
		console.log($scope.credentials.roles);
	});
  };//open modal
	//vima1 modal
	$scope.vima1 = function () {
	  
		
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
       templateUrl: 'vima1modal.html',
      controller: 'Vima1controller',
      size: 'md',
	  resolve: { cred: function () {
          return $scope.credentials1;
	  }
	  }
      
    });
	modalInstance.result.then(function (cred) {
			 $scope.credentials.firstName=cred.firstName;
			 $scope.credentials.lastName=cred.lastName;
			$scope.credentials.mobile=cred.mobile;
			 $scope.credentials.phonenumber=cred.phonenumber;
			$scope.credentials.dehnumber=cred.dehnumber;
			 $scope.credentials.email=cred.email;
		console.log($scope.credentials);
	});
  };//telosvima1 modal
  
  
  //vima2 moda2
	$scope.vima2 = function () {
	  
		
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'vima2modal.html',
      controller: 'Vima2controller',
      size: 'lg',
	  resolve: {
        string: function () {
          return $scope.str;
        }
      }
    });
	modalInstance.result.then(function (string) {
		
		console.log($scope.credentials.roles);
	});
  };//telosvima2 modal
  //vima3 modal
	$scope.vima3 = function () {
	  
		
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalController1',
      size: 'sm',
	  resolve: {
        string: function () {
          return $scope.str;
        }
      }
    });
	modalInstance.result.then(function (string) {
		if(string==='pelatis'){
			$scope.credentials.roles ='user';
		}else if(string==='pratiriouxos'){
			$scope.credentials.roles ='pratiriouxos';
		}
		console.log($scope.credentials.roles);
	});
  };//telosvima3 modal
	
  }
]);

angular.module('users').controller('ModalController1', ['$rootScope','$state', '$http', '$location', '$window', 'Authentication','$modalInstance',
  function ($scope, $state, $http, $location, $window, Authentication,$modalInstance)
  {
				$scope.str = "";
		$scope.set1 = function(){
			$scope.str = "pelatis";
			$modalInstance.close($scope.str);
			console.log("pelatis");
		};
		$scope.set = function(){
			$scope.str = "pratiriouxos";
			$modalInstance.close($scope.str);
			console.log("pratiriouxos");
		};
		 
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			$location.path('/');
		 };
 
  }]);//telos tou controller

angular.module('users').controller('Vima1controller', ['$rootScope','$state', '$http', '$location', '$window', 'Authentication','$modalInstance',
  function ($scope, $state, $http, $location, $window, Authentication,$modalInstance)
  {
				$scope.credentials1={
		  firstName:"",
		 lastName:"",
		phonenumber:0,
		mobile:null,
		email:"",		
		dehnumber:null
	 
	  };
		$scope.set = function(){

		//console.log($scope.credentials1);
			
			$modalInstance.close($scope.credentials1);
			
		};
		
		 
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			
		 };
 
  }]);//telos tou controller

angular.module('users').config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProvider) {
		GoogleMapApiProvider.configure({
	        key: 'AIzaSyADFLqoFVhpsHjADFUFEHD7H12vi2kwLtE',
	          v: '3.20',
	        libraries: 'weather,geometry,visualization,places'
	    });
	}]).controller('Vima2controller', ['$rootScope','$state', '$http','$timeout', '$location', '$window', 'Authentication','uiGmapGoogleMapApi','uiGmapIsReady','$modalInstance',
  function ($scope, $state, $http, $timeout, $location, $window, Authentication,uiGmapGoogleMapApi,uiGmapIsReady,$modalInstance)
  {
	  
	
	  
	  $scope.credentials1={
		
		latitude:"",
		longitude:"",
		area:"",
		city:"",
		street:"",
		loc:[0,0]
		
	 
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
	 
		$scope.set = function(){
		
		
		console.log($scope.credentials1);
		
	 
	  
			
			$modalInstance.close($scope.credentials1);
			
		};
		
		 
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			
		 };
 
  }]);

