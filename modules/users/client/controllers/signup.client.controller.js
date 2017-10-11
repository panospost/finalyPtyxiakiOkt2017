'use strict';

angular.module('users').directive('aDisabled', function() {
    return {
        compile: function(tElement, tAttrs, transclude) {
            //Disable ngClick
            tAttrs["ngClick"] = "!("+tAttrs["aDisabled"]+") && ("+tAttrs["ngClick"]+")";

            //Toggle "disabled" to class when aDisabled becomes true
            return function (scope, iElement, iAttrs) {
                scope.$watch(iAttrs["aDisabled"], function(newValue) {
                    if (newValue !== undefined) {
                        iElement.toggleClass("disabled", newValue);
                    }
                });

                //Disable href on click
                iElement.on("click", function(e) {
                    if (scope.$eval(iAttrs["aDisabled"])) {
                        e.preventDefault();
                    }
                });
            };
        }
    };
}).controller('SignUpController', ['$scope','$localStorage','$http','$location','Users', 'Authentication','$state','uiGmapGoogleMapApi','uiGmapIsReady','$mdDialog','$mdToast',
  function ($scope,$localStorage,$http,$location,Users,Authentication,$state,uiGmapGoogleMapApi,uiGmapIsReady,$mdDialog,$mdToast) {
	  $scope.preUser={
		  firstName:"",
		 lastName:"",
		username:"",
		password:"",
		phonenumber:null,
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
	  
	  $scope.User={
		  address:null,
		  streetnumber:null,
		  postalCode:null,
	  };
	  
	  $scope.selectedIndex = 0;
	  $scope.preUser = {};
	  $scope.preUser.street=null;
     $scope.authentication = Authentication;
	 $localStorage.address=null;
		$localStorage.streetnumber = null;
		$localStorage.postalCode =null;
		$localStorage.street=null;
		$localStorage.city = null;
		$localStorage.area= null; 
	  $localStorage.lat = null;
	  $localStorage.lon =null;
	
	$scope.apply = function(){
		
		$http.post('/api/auth/signup', $localStorage.localuser).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
		

		delete $localStorage.roleflags;
		delete $localStorage.locationflags;
		delete $localStorage.credentialflags;
		delete $localStorage.personalInfoflags;
		delete $localStorage.epali8eusiflags;
		delete $localStorage.apply;
		
		  // And redirect to the previous or home page
		  $state.go('home');
		  
		 // $location.path('/companies');
		  
        
		 //console.log($scope.authentication.user.roles);
      }).error(function (response) {
        $scope.error = response.message;
      });
	};
	
	
	//new prospa8eia signup
	
	$scope.signup = function(){
		console.log($scope.preUser);
		$http.post('/api/auth/signup', $scope.preUser).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
		

			
		  // And redirect to the previous or home page
		  $state.go('home');
		  
		 // $location.path('/companies');
		  
        
		 //console.log($scope.authentication.user.roles);
      }).error(function (response) {
        $scope.error = response.message;
		console.log( $scope.error);
      });
	};
	
	 function showMapCtrl($scope, $mdDialog,$localStorage) {
		 $scope.map1 = {
					control:{},
					refresh:{},
				center: {
					   latitude:$localStorage.lat, 
                   longitude:$localStorage.lon  
				},
				draggable: true,
				zoom: 15
			};
	
	
	 $scope.marker1 = {
			  id: 321,
			  coords: {
					  latitude:$localStorage.lat, 
                   longitude:$localStorage.lon  
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
			
					        	$localStorage.lat = marker.getPosition().lat();
								  $localStorage.lon = marker.getPosition().lng();

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
		console.log(place);
		
        if (!place || place === 'undefined' || place.length === 0) {
            console.log('no place data :(');
            return;
        }
		$localStorage.street = place[0].formatted_address;
		
		console.log($scope.address);
			$localStorage.lat = place[0].geometry.location.lat();
			 $localStorage.lon = place[0].geometry.location.lng();
			 
			  for (var i=0; i<place[0].address_components.length; i++) {
            for (var b=0;b<place[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (place[0].address_components[i].types[b] == "postal_code") {
                    //this is the object you are looking for
                    var postal = place[0].address_components[i];
                    //break;
                }
				if (place[0].address_components[i].types[b] == "locality") {
                    //this is the object you are looking for
                    var locality = place[0].address_components[i];
                    //break;
                }

				if (place[0].address_components[i].types[b] == "street_number") {
                    //this is the object you are looking for
                    var political= place[0].address_components[i];
                    //break;
                }
				
				if (place[0].address_components[i].types[b] == "premise") {
                    //this is the object you are looking for
                    var premise= place[0].address_components[i];
                    //break;
                }
				if (place[0].address_components[i].types[b] == "administrative_area_level_3") {
                    //this is the object you are looking for
                    var neighborhood= place[0].address_components[i];
                    //break;
					//console.log(neighborhood);
                }
				// console.log(results[0].address_components[i].types[b]);
            }
        }
		//$localStorage.address=route.short_name;
		//$localStorage.streetnumber = premise.short_name+"/"+political.short_name;
	if(postal){
			$localStorage.postalCode =postal.short_name;
	    }else{
			$localStorage.postalCode = '-';
		}
		if(locality){
			$localStorage.city =locality.short_name;
	    }else{
			$localStorage.city = '-';
		}
		if(neighborhood){
			$localStorage.area =neighborhood.short_name;
	    }else{
			$localStorage.area = '-';
		}
			 
			$localStorage.street=$localStorage.city+"  , TK: "+$localStorage.postalCode+" ,  "+$localStorage.area;
			 
			 
//console.log( $localStorage.street);
			 
			 
			 
			 
			//$scope.preUser.loc = [ place[0].geometry.location.lng(),place[0].geometry.location.lat()];
		//	$scope.preUser.street = place[0].formatted_address;
		////	$scope.latitude = place[0].geometry.location.lat();
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
			
					        	$localStorage.lat = marker.getPosition().lat();
								 $localStorage.lon = marker.getPosition().lng();
								$scope.preUser.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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
  
	$scope.showMap = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/core/client/views/showMap.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.User.address =$localStorage.city;
		$scope.User.streetnumber=0;
    $scope.User.postalCode=$localStorage.postalCode;
	 $scope.preUser.street=$localStorage.street;
		$scope.preUser.city=$localStorage.city;
	 $scope.preUser.area=$localStorage.area; 
	  $scope.preUser.latitude=$localStorage.lat;
	  $scope.preUser.longitude=$localStorage.lon;
	  	  $scope.preUser.loc=[$localStorage.lon,$localStorage.lat];
	  
	  
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	
	//settingmapupdatetopo8esia
	$scope.settingsMap = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/core/client/views/showMap.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    //  $scope.User.address =$localStorage.city;
	//	$scope.User.streetnumber=0;
    //$scope.User.postalCode=$localStorage.postalCode;
	 $scope.preUser.street=$localStorage.street;
		$scope.preUser.city=$localStorage.city;
	 $scope.preUser.area=$localStorage.area; 
	  $scope.preUser.latitude=$localStorage.lat;
	  $scope.preUser.longitude=$localStorage.lon;
	  	  $scope.preUser.loc=[$localStorage.lon,$localStorage.lat];
		  
	   var user = new Users($scope.preUser);

      user.$update(function (response) {
        //$scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
		
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
		console.log(response);
      });
	  
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	
	$scope.show = false;
	
	//για την εναλλακτικη τοποθεσια
	$scope.enallaktikiTopo8esia = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/core/client/views/enallaktikiTopo8esia.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
     $scope.hide = true;
	 $scope.preUser.street2=$localStorage.street;
	  $scope.preUser.latitude2=$localStorage.lat;
	  $scope.preUser.longitude2=$localStorage.lon;
	  	  $scope.preUser.loc2=[$localStorage.lon,$localStorage.lat];
	  
	   var user = new Users($scope.preUser);

      user.$update(function (response) {
        //$scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
		
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
		console.log(response);
      });
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	
	
	  
	

	
	
	
	 //get address me geolocation stin eggrafi 
	  $scope.getLocation = function(){
		  
		//$scope.open();
		 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
					$localStorage.lat= position.coords.latitude; 
                   $localStorage.lon =	position.coords.longitude;
               $scope.preUser.latitude = position.coords.latitude; 
              $scope.preUser.longitude = position.coords.longitude;
			  $scope.preUser.loc = [position.coords.longitude,position.coords.latitude];
               // console.log($scope.credentials.latitude);
			   var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		codeLatLng(lat, lng);
          // console.log(x[0]);    
			
        },
				function(error) {
					// On error code..
					//$scope.showError(error);
					console.log(error);
				},
				{timeout: 5000, enableHighAccuracy: true, maximumAge: 75000});
        
      }
	};//getLocation
	
	//function gia address
	function codeLatLng(lat, lng) {
		var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      //console.log(results)
        if (results[1]) {
         //formatted address
         //console.log(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "postal_code") {
                    //this is the object you are looking for
                    var postal = results[0].address_components[i];
                    //break;
                }
				if (results[0].address_components[i].types[b] == "locality") {
                    //this is the object you are looking for
                    var locality = results[0].address_components[i];
                    //break;
                }
				if (results[0].address_components[i].types[b] == "street_number") {
                    //this is the object you are looking for
                    var political= results[0].address_components[i];
                    //break;
                }
				if (results[0].address_components[i].types[b] == "route") {
                    //this is the object you are looking for
                    var route = results[0].address_components[i];
                    //break;
                }
				if (results[0].address_components[i].types[b] == "premise") {
                    //this is the object you are looking for
                    var premise= results[0].address_components[i];
                    //break;
                }
				if (results[0].address_components[i].types[b] == "neighborhood") {
                    //this is the object you are looking for
                    var neighborhood= results[0].address_components[i];
                    //break;
					//console.log(neighborhood);
                }
				// console.log(results[0].address_components[i].types[b]);
            }
        }
		$scope.User.address=route.short_name;
		$scope.User.streetnumber = premise.short_name+"/"+political.short_name;
		$scope.User.postalCode =postal.short_name;
		$scope.preUser.street=route.short_name+" "+premise.short_name+"/"+political.short_name+" ,  TK:"+postal.short_name+" , "+neighborhood.short_name;
		$scope.preUser.city = locality.short_name;
		$scope.preUser.area= neighborhood.short_name;
		
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  };
	
  }
]);