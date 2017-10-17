'use strict';

// Articles controller
angular.module('companies').config(['uiGmapGoogleMapApiProvider', function (GoogleMapApiProvider) {
		GoogleMapApiProvider.configure({
	            key: 'AIzaSyBJvjX6aXzZ0xBsuuKUct1Dd3YZ-Xxk1Fc',
	          v: '3.20',
	        libraries: 'weather,geometry,visualization,places'
	    });
	}]).directive('compare', function() {
			 return {
				  require: "ngModel",
				  scope: {
					otherModelValue: "=compare"
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
}).controller('CompaniesController', ['$rootScope','$scope', '$stateParams', '$location', 'Authentication', 'Companies','$timeout','$http','uiGmapGoogleMapApi','uiGmapIsReady','$filter','$uibModal','uiGridConstants','$state','$localStorage','$mdDialog','$mdToast',
  function ($rootScope,$scope, $stateParams, $location, Authentication, Companies,$timeout,$http,uiGmapGoogleMapApi,IsReady,$filter,$uibModal,uiGridConstants,$state,$localStorage,$mdDialog,$mdToast) {
	 $scope.hideYpoboli=true;
	 $scope.address="Μην ξεχάσετε να εισάγετε την τοποθεσία του πρατηρίου";
	  $scope.authentication = Authentication;
	  $scope.routeCredentials = {};
	  $scope.creCredentials = {};
	  $scope.routeCre = {};
	  $scope.litres1;
	  $scope.litres2;
	  $scope.litres3;
	  $scope.disableViewOrders=true;
	  $scope.disableViewOrders=true;
	  $scope.disableViewOrders3=true;
		$scope.companyDrivers = {};
		$scope.companyTrucks = {};
	  //create drivers
	  $scope.routeCredentials.orders = [];
	  $scope.drivercred ={
		  firstName:"",
		  lastName:"",
		  username:"",
		  password:"",
		  email:"",
		  company:null
	  };
	  //mdtabs functions
	   $scope.firstTab = function() {
		//var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
		$scope.selectedIndex = 0;

	  };
	  $scope.secondTab = function() {
		//var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
		$scope.selectedIndex = 1;

	  };
	  $scope.thirdTab = function() {
		//var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
		$scope.selectedIndex = 2;

	  };
	  
	  //listthe drivers of the company
	  $scope.listDrivers = function(){
		   var value1 = $http.get('api/companyDrivers?company='+$stateParams.companyId);
		 // companyId: $stateParams.companyId
		value1.success(function(data, status, headers, config) {
					$scope.drivers = data;
					//console.log($scope.company);
				});
		  
	  };
	  
	    $scope.removeDriver = function(driver,alldrivers,ddriver){
		
			var value3=	$http.delete('/api/drivers/'+ driver);
		value3.success(function(data, status, headers, config) {
					  for (var i in alldrivers) {
						  if (alldrivers[i] === ddriver) {
							alldrivers.splice(i, 1);
						  }
					}
				});
		
	};
	  
	  //list the trucks of the company
	   $scope.listTrucks = function(){
		   var value1 = $http.get('api/companyTrucks?company='+$stateParams.companyId);
		 // companyId: $stateParams.companyId
		value1.success(function(data, status, headers, config) {
					$scope.trucks = data;
					//console.log($scope.company);
				});
		  
	  };
	    $scope.removeTruck = function(driver,alldrivers,ddriver){
		
			var value3=	$http.delete('/api/trucks/'+ driver);
		value3.success(function(data, status, headers, config) {
					  for (var i in alldrivers) {
						  if (alldrivers[i] === ddriver) {
							alldrivers.splice(i, 1);
						  }
					}
				});
		
	};
	  
	  
	
	  //ypobolipratiriou
	  //μαπΠρατηριο κοντρολερ
	  
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
	
			 
			 $localStorage.street=locality.short_name+"  , TK: "+$localStorage.postalCode+" ,  "+$localStorage.area;
			 
			 
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
	  
	  //τελος του μαπ πρατηριο κοντρολερ
	  
	  $scope.showMap = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/core/client/views/showMapPratirio.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.city =$localStorage.city;
		//$scope.User.streetnumber=0;
    //$scope.User.postalCode=$localStorage.postalCode;
	 $scope.address=$localStorage.street;		
	 $scope.area=$localStorage.area; 
	  $scope.latitude=$localStorage.lat;
	  $scope.longitude=$localStorage.lon;
	  	  $scope.coords1=[$localStorage.lon,$localStorage.lat];
	 	  $scope.hideYpoboli=false;
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	
	$scope.showUpdateMap = function(ev){
		$mdDialog.show({
      controller: showMapCtrl,
      templateUrl: 'modules/core/client/views/showMapPratirio.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.company.city =$localStorage.city;
		//$scope.User.streetnumber=0;
    //$scope.User.postalCode=$localStorage.postalCode;
	 $scope.company.address=$localStorage.street;		
	 $scope.company.area=$localStorage.area; 
	  $scope.company.latitude=$localStorage.lat;
	  $scope.company.longitude=$localStorage.lon;
	  	  $scope.company.loc1=[$localStorage.lon,$localStorage.lat];
	 	  
	  
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
	};
	  
	  
	  
	  ////////////ypobolpratirou////////////////////////////////////////////////
	  
	  $scope.areasCC = [
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
	  
	   $scope.drivercreation = function (isValid,form) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'DriversForm');
		
        return false;
      }

			$scope.drivercred.company = $stateParams.companyId;

      $http.post('/api/drivers', $scope.drivercred).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.driver = response;
		
		//console.log($scope.authentication.user.roles);
		  // And redirect to the previous or home page
		  
		  //console.log($scope.authentication.user.roles);
		  //console.log(response);
		// $scope.DriversForm.$setPristine();
		 //form.$setPristine();
       // form.$setUntouched();
	   $scope.drivercred.firstName="";
	    $scope.drivercred.lastName="";
		 $scope.drivercred.password="";
		  $scope.drivercred.firstName="";
		   $scope.drivercred.email="";
		   $scope.epassword="";
		 $scope.donedriver = "Ο οδηγος του πρατηρίου σας καταχωρήθηκε";
        //$state.go($state.previous.state.name || 'home', $state.previous.params);
		 //console.log($scope.authentication.user.roles);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
	  
	 $scope.truckcreation = function (isValid,form) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'TrucsForm');
		
        return false;
      }

			$scope.truckcred.company = $stateParams.companyId;

      $http.post('/api/trucks', $scope.truckcred).success(function (response) {
        // If successful we assign the response to the global user model
       
		
	
	   $scope.truckcred.firstName="";
	    $scope.truckcred.model="";
		 $scope.truckcred.size="";
		  $scope.truckcred.trafficNumber="";
		   $scope.truckcred.insuranceNumber="";
		
		 $scope.donedriver = "Το φορτηγό του πρατηρίου σας καταχωρήθηκε";
       
      }).error(function (response) {
        $scope.error = response.message;
      });
	
    };
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  //τρακ τσεκμποξες
	  $scope.checkbox2=function(){
	  $scope.$watch('truck2', function(newVal, oldVal){
			
			if($scope.truck2===true){
				$scope.truck1= false;
			}
		}, true);
	  };
	   $scope.checkbox1=function(){
	  $scope.$watch('truck1', function(newVal, oldVal){
			
			if($scope.truck1===true){
				$scope.truck2= false;
			}
		}, true);
	  };
	  
	  
	 
	  //
	  //searchbox create company
	 var events = {
    places_changed: function (searchBox) {
        var place = searchBox.getPlaces();
		
		
        if (!place || place === 'undefined' || place.length === 0) {
            console.log('no place data :(');
            return;
        }
		$scope.address = place[0].formatted_address;
			$scope.latitude = place[0].geometry.location.lat();
			$scope.lοngitude = place[0].geometry.location.lng();
			$scope.coords1 = [ place[0].geometry.location.lng(),place[0].geometry.location.lat()];
			
			
			//console.log(place[0].address_components[4]);
			$scope.latitude = place[0].geometry.location.lat();
			$scope.longitude = place[0].geometry.location.lng();
        $scope.map = {
            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 18
        };
        $scope.marker = {
            id: 0,
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
								  //lati = marker.getPosition().lat();
								  //longi = marker.getPosition().lng();
								 //	console.log('marker lat is '+lati);
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
			
					        	$scope.latitude = marker.getPosition().lat();
								  $scope.longitude = marker.getPosition().lng();
									$scope.coords1 = [ marker.getPosition().lng(),marker.getPosition().lat()];
					  $scope.marker1.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
							};
						}
					}//ηβεντς
        };
    }
};
$scope.searchbox = { template: 'searchbox.tpl.html', events: events };
    
		
	//  console.log("ti sto peo einai to aythenitcation :"+user);
		var user = Authentication;
		JSON.stringify(user);
		angular.toJson(user, 1);
		$scope.markers3 = {};
		$scope.self = this;
		//self.map = $scope.map2();
		$scope.mapctrl = {};
		
		//console.log(user.firstname);
	  $scope.latitude = "";
	  $scope.longitude = "";
	  /////////////////////////////////////
	  //create a company
	     $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'companyForm');

        return false;
      }

      // Create new Article object
      var company = new Companies({
        companyname: this.companyname,
        phonenumber: this.phonenumber,
		address:this.address,
		city:this.city,
		area:this.area,
		latitude: this.latitude,
		longitude: this.longitude,
		pricepL:this.pricepL,
		priceTh:this.priceTh,		
		truck1:this.truck1,
		truck2:this.truck2,
		loc1:this.coords1
		
      });

      // Redirect after save
      company.$save(function (response) {
        $location.path('companies/' + response._id);

        // Clear form fields
       
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };//create a company
	  
	  
	  
	  
	 //maps many maps
        // for the map
        $scope.map = {

            center: {
                latitude: "40.65099394300474",
                longitude: "22.924316496582037"
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
					latitude: "40.65099394300474",
					longitude: "22.924316496582037"
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
								  $scope.latitude = marker.getPosition().lat();
								  $scope.longitude = marker.getPosition().lng();
								 // 	console.log('marker lat is '+lat);
								//	console.log('marker lng is '+lon);

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
			
						$scope.latitude = marker.getPosition().lat();
								  $scope.longitude = marker.getPosition().lng();
									$scope.coords1 = [marker.getPosition().lng(),marker.getPosition().lat()];
					  $scope.marker.options = {
						draggable: true,
						labelContent:"H thesi sou einai edw",
						labelAnchor: "100 0",
						labelClass:"marker-labels"		
						
					  };
					}
			  }
			};/////////////
			
			//o panw einani o map sto create a map
			
			/////////////
			 $scope.map1 = {
        windowTemplate: "window_template.html",
        windowParameter: function(marker){
          return marker;
        },
        center: {
            latitude: "40.65099394300474",
                longitude: "22.924316496582037"
        },
        zoom: 10
    };
	$scope.marker1 = {
			  id: 0,
			  coords: {
				latitude: $scope.authentication.user.latitude,
				longitude: $scope.authentication.user.longitude
			  },
			  options: { draggable: false,
			  labelContent:"H θεση σας",
			  labelAnchor: "50 0",
			  labelClass:"marker-labels"}
	};
			
	
			var markers1 = [];
			
			var takeMarker = function(object,count) {
 
		  var ret = {
			  phonenumber:object.phonenumber,
			 
			  address:object.address,
				price1:object.pricepL,
				price2:object.priceTh,
			  id: count,
				name: object.companyname,
				show:true,
				options: {
               maxWidth: 400
           },
				coordinates: {
				  latitude: object.latitude,
				  longitude: object.longitude
				}
		  };
			JSON.stringify(ret);
		//	console.log(ret);
			return ret;
			
			
		  };
		  
		//o map st companies?

    $scope.markers = {};
	/*
    angular.forEach(markers1, function(marker) {
     
    });*/

    $scope.markerClick = function(marker) {
        if(marker.show) {
            marker.show = false;
        } else {
            angular.forEach($scope.markers, function(curMarker) {
                curMarker.show = false;
            });
            marker.show = true;
        }
    };

    $scope.markerClose = function(marker) {
        marker.show = false;
    };
    	
			//////////////για λιστ companies to map
	  
	  
	  
    
    
 

    // Remove existing Article
    $scope.remove = function (company,allcomp,comp) {
			var value4=	$http.delete('/api/companies/'+ company);
		value4.success(function(data, status, headers, config) {
					  for (var i in allcomp) {
						  if (allcomp[i] === comp) {
							allcomp.splice(i, 1);
						  }
					}
				});
		/*
      if (company) {
        company.$remove();

        for (var i in $scope.companies1) {
          if ($scope.companies1[i] === company) {
            $scope.companies.splice(i, 1);
          }
        }
      } else {
        $scope.company.$remove(function () {
          $location.path('companies');
        });
      }  /*/
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'companyForm');

        return false;
      }
	  
	  $scope.company.pricepL = parseInt($scope.company.pricepL,10);
	  $scope.company.priceTh = parseInt($scope.company.priceTh,10);

      var company = $scope.company;

      $http.put('/api/companies/'+$scope.company._id,$scope.company).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'companyForm');
        $scope.success = 'τα στοιχεία του πρατηρίου επεξεργάστηκαν';
        
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
		
    // Find a list of companies
    $scope.find1 = function () {
    
	//pare tis etaireies oles
	$scope.companies = Companies.get({});
	 $timeout(function(){
		 var x=0;
	 angular.forEach($scope.companies,function(company){
         //console.log($scope.tempcompanies[i].id);
            //console.log(JSON.stringify($scope.companies[i]));
			markers1.push(takeMarker($scope.companies[x],x));
        x++;
		 });
		//console.log(JSON.stringify(markers[0].latitude));
		 
	 }, 1000);
	};
	
	   $scope.findEnallaktikis = function () {
    
	//pare tis etaireies oles
	 $http.get('/api/companiesEnallaktikis').success(function (response) {
        // If successful show success message and clear form
		$scope.companiesEnallaktikis = response;
        //$scope.$broadcast('show-errors-reset', 'companyForm');
        //$scope.success = 'τα στοιχεία του πρατηρίου επεξεργάστηκαν';
        
      }).error(function (response) {
        $scope.error = response.message;
		console.log(response.message);
      });
 
    };//bres oles tis etaireies telos
		
		$scope.find=function(){
			 var value1 = $http.get('api/companies/2companies');
		 // companyId: $stateParams.companyId
		value1.success(function(data, status, headers, config) {
					$scope.companies1 = data;
					//console.log($scope.company);
				});
		};
		//////findonedokimastiko
		
		$scope.findTwo = function () {
   //bres ti sygkekrimeni etaireia
	
		 
		//var stri2 = stringforc.split('d')[0];
		//console.log($scope.fdate1);
		 var value1 = $http.get('api/companies/'+$stateParams.companyId);
		 // companyId: $stateParams.companyId
		value1.success(function(data, status, headers, config) {
					$rootScope.company = data;
					 
				
					$scope.cmarker1 = {
							  id: 2,
							  coords: {
								latitude: $rootScope.company.latitude,
								longitude: $rootScope.company.longitude
							  },
							  options: { draggable: false,
							  labelContent:"H θεση της εταιρειας",
							  labelAnchor: "50 0",
							  labelClass:"marker-labels"}
					};
					
	 
					
	 			
	 
				});//value gia companies meta apo edw den fainetai to companies gamwne
		
    };
		
		
		
		
		////
    // Find existing Article
    $scope.findOne = function () {
   //bres ti sygkekrimeni etaireia
		

		 $scope.fdate1 = new Date();
    $scope.fdate1.setDate($scope.fdate1.getDate() + 2);
	 $scope.fdate1= $scope.fdate1.toISOString();
	// $scope.fdate1=JSON.stringify($scope.fdate1);
	 $scope.fdate1=$scope.fdate1.split("T")[0];
	
		//var stri2 = stringforc.split('d')[0];
		//console.log($scope.fdate1);
		 var value1 = $http.get('api/companies/'+$stateParams.companyId);
		 // companyId: $stateParams.companyId
		value1.success(function(data, status, headers, config) {
					$rootScope.company = data;
					$localStorage.company =data;; 
					$scope.track1=data.truck1;
					$scope.track2=data.truck2;
					$scope.marker2={
								  id: 0,
								  coords: {
									latitude: $rootScope.company.latitude,
									longitude: $rootScope.company.longitude
								  },
								  options: { draggable: false,
								  labelContent:"H θεση σας",
								  labelAnchor: "50 0",
								  labelClass:"marker-labels"}
								};
					$scope.cmarker1 = {
							  id: 2,
							  coords: {
								latitude: $rootScope.company.latitude,
								longitude: $rootScope.company.longitude
							  },
							  options: { draggable: false,
							  labelContent:"H θεση της εταιρειας",
							  labelAnchor: "50 0",
							  labelClass:"marker-labels"}
					};
					//$scope.marker2.longitude =$scope.company.latitude;
					//$scope.marker2.longitude =$scope.company.latitude;
					//console.log($scope.company);
					//orders of company
		var value4 = $http.get('/api/corders/company?companyname='+$rootScope.company.companyname);
	  //pare ta orders tis etaireias
	 
	  
	  value4.success(function(data, status, headers, config) {
			
				$rootScope.orders = data;
				//console.log("data einai "+JSON.stringify(data));
				$rootScope.orders =$filter('filter')($rootScope.orders,{finished:false});
				
					//'Μεσημέρι(12-4)','Απόγευμα(4-8)'
					$rootScope.gridOptions.data=$filter('filter')($rootScope.orders, {hour: 'Πρωί(8-12)'});
					$rootScope.gridOptions2.data=$filter('filter')($rootScope.orders, {hour: 'Μεσημέρι(12-4)'});
					$rootScope.gridOptions3.data=$filter('filter')($rootScope.orders, {hour: 'Απόγευμα(4-8)'});
					$scope.ordersSum1 =$scope.gridApi.grid.columns[3].getAggregationValue();
					$scope.ordersSum2 =$scope.gridApi2.grid.columns[3].getAggregationValue();
					$scope.ordersSum3 =$scope.gridApi3.grid.columns[3].getAggregationValue();
				
				
					//elegxos gia prwines paraggelies
					if($scope.ordersSum1===0){
						$scope.prwinoHint ="Δεν υπάρχουν παραγγελίες για  την πρωινή ζώνη";
					}else if($scope.ordersSum1<=$scope.track1){
						$scope.prwinoHint = "οι παραγγελίες της πρωινής ζώνης γίνονται με ένα δρομολόγιο  στο πρώτο φορτηγό";
						//console.log("οι παραγγελίες της πρωινής ζώνης γίνονται με ένα δρομολόγιο  στο πρώτο φορτηγό");
					}else if($scope.ordersSum1<= $scope.track1+$scope.track2){
						$scope.prwinoHint = "οι παραγγελίες της πρωινης ζώνης χρειάζονται και το δεύτερο φορτηγό";
						//console.log("οι παραγγελίες της πρωινης ζώνης χρειάζονται και το δεύτερο φορτηγό");
					}else{
						$scope.prwinoHint = "οι παραγγελίες της πρωινής ζώνης χρειάζονται παραπάνω απο ένα δρομολόγια";
						//console.log("οι παραγγελίες της πρωινής ζώνης χρειάζονται παραπάνω απο ένα δρομολόγια");
					}
					//elegxos gia mesimerianes paraggelies
					if($scope.ordersSum2===0){
						$scope.mesimeriHint ="Δεν υπάρχουν παραγγελίες για  την μεσημεριανή ζώνη";
					}else if($scope.ordersSum2<=$scope.track1){
						//console.log("οι παραγγελίες της μεσημεριανής ζώνης γίνονται με ένα δρομολόγιο  στο πρώτο φορτηγό");
						$scope.mesimeriHint = "οι παραγγελίες της μεσημεριανής ζώνης γίνονται με ένα δρομολόγιο  στο πρώτο φορτηγό";
					}else if($scope.ordersSum2<= $scope.track1+$scope.track2){
						$scope.mesimeriHint="οι παραγγελίες της μεσημεριανής ζώνης χρειάζονται και το δεύτερο φορτηγό";
					//	console.log("οι παραγγελίες της μεσημεριανής ζώνης χρειάζονται και το δεύτερο φορτηγό");
					}else {
						$scope.mesimeriHint="οι παραγγελίες της μεσημεριανής ζώνης χρειάζονται παραπάνω απο ένα δρομολόγια";
						//console.log("οι παραγγελίες της μεσημεριανής ζώνης χρειάζονται παραπάνω απο ένα δρομολόγια");
					}
					//elegxos gia apogeumatines paraggelies
					if($scope.ordersSum3===0){
						$scope.apogeymaHint ="Δεν υπάρχουν παραγγελίες για την απογευματινή ζώνη";
					}else if($scope.ordersSum3<=$scope.track1){
						$scope.apogeymaHint="οι παραγγελίες της απογευματινής ζώνης γίνονται με ένα δρομολόγιο  στο πρώτο φορτηγό";
						//console.log("οι παραγγελίες της απογευματινής ζώνης γίνονται με ένα δρομολόγιο  στο πρώτο φορτηγό");
					}else if($scope.ordersSum3<= $scope.track1+$scope.track2){
						$scope.apogeymaHint="οι παραγγελίες της απογευματινής ζώνης χρειάζονται και το δεύτερο φορτηγό";
						console.log("οι παραγγελίες της απογευματινής ζώνης χρειάζονται και το δεύτερο φορτηγό");
					}else{
						$scope.apogeymaHint ="οι παραγγελίες της απογευματινής ζώνης χρειάζονται παραπάνω απο ένα δρομολόγια";
						//console.log("οι παραγγελίες της απογευματινής ζώνης χρειάζονται παραπάνω απο ένα δρομολόγια");
					}
				
				
				
				},200);//value4succes gia orders p eiani
	 
					
	 			
	 
				});//value gia companies meta apo edw den fainetai to companies gamwne
		var getdrivers = $http.get('/api/companyDrivers?company='+$stateParams.companyId);
		getdrivers.success(function(data, status, headers, config) {
			$scope.companyDrivers = data;
		},200);
		
		var getTrucks = $http.get('/api/companyTrucks?company='+$stateParams.companyId);
		getTrucks.success(function(data, status, headers, config) {
			$scope.companyTrucks = data;
		},200);
		
    };//console.log("eksw apo ti findone: "+ $scope.company);
	
	$scope.findForGuestUsers=function(){
		
		 if (navigator.geolocation) {
			 
        navigator.geolocation.getCurrentPosition(function (position) {
					$localStorage.lat= position.coords.latitude; 
                   $localStorage.lon =	position.coords.longitude;    
$scope.companies = $http.get('/api/mobile/companies?longitude='+$localStorage.lon+'&latitude='+$localStorage.lat);				   
			
        },
				function(error) {
					// On error code..
					//$scope.showError(error);
					console.log(error);
				},
				{timeout: 5000, enableHighAccuracy: true, maximumAge: 75000});
        
      }
		
		
		
		
	}
	//για λιστ ορντερσ το μαπ
	function directions(maps, newLat, newLong,waypoint1,self) {
							//var waypoint = waypoint1
							//console.log(waypoint1);
						
							var directionsService = new maps.DirectionsService();
							$scope.directionsDisplay.setMap(self);
							
							

							var request = {
								origin: newLat + ", " + newLong,
								destination: newLat + ", " + newLong,
								waypoints: waypoint1,
								travelMode: maps.TravelMode.DRIVING,
								optimizeWaypoints: true
							};

							directionsService.route(request, function (response, status) {
								console.log('directions found');
								if (status === maps.DirectionsStatus.OK) {
									$scope.directionsDisplay.setOptions({ suppressMarkers: true });
									$scope.directionsDisplay.setDirections(response);
									$scope.directionsDisplay.setPanel(document.getElementById("panel"));
								} else {
									console.log('Directions request failed due to ' + status);
								}
							});

	}//directions fuction
		
		
		//gia routing analoga me tin zwni wras
	$scope.routing= function(Time){
		$scope.timeline = Time;
		 $scope.fdate = new Date();
    $scope.fdate.setDate($scope.fdate.getDate() + 1);
		
		$scope.markers3 = [];
		//$scope.directionsDisplay.setDirections();pws adeiazoun ta directions gamwne
		if($scope.directionsDisplay !== null) { 
		   $scope.directionsDisplay.setMap(null);
		   $scope.directionsDisplay = null;
		   }//adeiase ton xarti apo directions kai markers, worked like a charm :D
   
		//console.log('Just clicked this button with time: '+Time);
		var value = $http.get('api/companies/'+$stateParams.companyId);
		value.success(function(data, status, headers, config) {
					$scope.company = data;
					//adeiazoume ton xarti kai to panel odigiwn
				var value4 = $http.get('/api/corders/company?companyname='+$scope.company.companyname);		
					value4.success(function(data, status, headers, config){
						var Orders = data;//oles oi paraggelies tis etaireias 8eloun filtrarisma
						var NumberOf = Orders.length;
						//var tomorrow =.. kai meta filter me to tommorow
						//var gradeC = $filter('filter')(Orders, {duedate: '2016-01-13T22:00:00.000Z'});filter me to tommorow
						var gradeD = $filter('filter')(Orders, {hour: Time});
						//edw exoume twra tis paraggelies tis epi8umitis imeromminias k wras logika
						$scope.numberoforders1 = gradeD.length;
						//meta edw kanoume logiki filatrarismatos?isws s na allo functiongia na mhn mperdeutei to pragma
						var sumordersOf= 0;
						for(var i=0;i<gradeD.length-1;i++){
							sumordersOf = gradeD[i].quantity+sumordersOf;
						}//sum of the orders na oume prwto filtrarisma
						if($scope.company.truck1>=sumordersOf){
							//
							//
							//
							//
							//
							var coord1 = {};//pinakas me ta coordinates twn paraggeliwn
					//$timeout(function(){
							var x=0;
								angular.forEach(gradeD, function(curMarker) {
									//console.log(curMarker.user.latitude+"edw ti ginetai");//edw kaleis to push marker ;)
									$scope.markers3[x]=takeMarker4(curMarker,x);
									coord1[x]=$scope.markers3[x].coordinates;
									//console.log($rootScope.waypoint2[x]);
									x++;
								});//angularforeach // exoume balei tous markers ston pinaka logika se ayto to point nai gamwne
							$scope.markers3[$scope.markers3.length+1]={
									 message:'',
									 hour:'Σημείο Λήξης Διαδρομής',
									 date:'Σημείο Έναρξης Διαδρομής',
									  dehnumber:'',
										price:null,
									  id: $scope.markers3.length+1,
										name: $scope.company.companyname,
										sname:'',
										show:true,
										options: {
									   maxWidth: 400
								   },
										coordinates: {
										  latitude: $scope.company.latitude,
										  longitude: $scope.company.longitude
										}
								};//min ksexname kai ton marker tis etaireias :)
							
							//google maps magic :P
							uiGmapGoogleMapApi.then(function(maps) {
								var displaymap;
							IsReady.promise().then(function (maps) {
								displaymap = $scope.mapctrl.getGMap();
								
							});
							var waypoint2 = [];
							var x = 0;
							angular.forEach(coord1,function(curOrder){
									//lati = curOrder.latitude+"";
									//longi = curOrder.longitude+"";
								//undefined  console.log(x+" = "+JSON.stringify(lati));
							 waypoint2[x]={location: new maps.LatLng(curOrder.latitude,curOrder.longitude),
							   stopover:true};
							   x++;
							 });
							
								console.log('start');
								$scope.directionsDisplay = new maps.DirectionsRenderer();
								
								IsReady.promise(1).then(function(instances) {
									directions(maps, $scope.company.latitude,
															$scope.company.longitude,waypoint2,displaymap);
									
								});
							});	//uiGmapGoogleMapApi.then the end 
							//logika ola pane roloi :)
							/*kane update ola ta orders se finished auta se finished
							*apo8ikeyse ta routes sti vasi katallilws
							*/
							
						}//if truck1 einai xwraei oles tis parraggelies
						else if($scope.company.truck1+$scope.company.truck2>=sumordersOf){
							//to mege8os twn paraggeliwn den xwraei sto prwto megalo fortigo
							//filtrarisma kata perioxi kai xrisimopoihsh tou deyterou fortigou
							//me geoNear sto mongoose allo http call :p
							//kane update ola ta orders se finished auta se finished
							//apo8ikeyse ta routes sti vasi katallilws
							
						}else{
							/*
							spase se parapanw apo dyo ta dromologia gia na leitourgisei
							kane update ola ta orders se finished auta se finished
							//apo8ikeyse ta routes sti vasi katallilws
							*/
							
						}
						//afou ksemperdepsoun ta routes kane update ta orders se finished
						var updatefinished = $http.get('/api/updatefinished?companyname='+$scope.company.companyname+'&fdate='+$scope.fdate+'&timeline='+Time);
							updatefinished.success(function(data, status, headers, config){
								console.log("Orders updated successfully");
							});
					});//value4 me ta orders aktina drasis mas :p	oxi meta apo ayti tin paren8esi!!!!!
		});//value success
	};//scoperouting teleiwnei edw
	
	
	//companyid(); map gia ta routing
	 $scope.map2 = {
        windowTemplate: "window_template1.html",
        windowParameter: function(marker){
          return marker;
        },
        center: {
            latitude: "40.65099394300474",
                longitude: "22.924316496582037"
        },
        zoom: 10
     };
	$scope.marker2 = {
			  id: 0,
			  coords: {
				latitude: user.latitude,
				longitude: user.longitude
			  },
			  options: { draggable: false,
			  labelContent:"H θεση σας",
			  labelAnchor: "50 0",
			  labelClass:"marker-labels"}
	};
	var markers2 = [];
			
	var takeMarker4 = function(object,count) {
			
			//ta stoixeia twn markers
		  var ret = {
			  message:'Μυνημα Πελατη: '+object.message,
			 hour:'Ζώνη ώρας: '+object.hour,
			 date:'Ημερομμηνία Παραλαβής: '+object.duedate.split('T')[0],
			  dehnumber:'Αριθμός Δεή: '+object.dehnumber,
				price:'Ποσό Πληρωμής: '+object.pricetp,
			  id: count,
				name:'Ονομα Πελατη: '+ object.user.firstName,
				sname:object.user.lastName,
				show:false,
				options: {
               maxWidth: 400
           },
				coordinates: {
				  latitude: object.user.latitude,
				  longitude: object.user.longitude
				}
		  };
			JSON.stringify(ret);
			//console.log(ret);
			return ret;
			
			
		  };//takemarker balton sto map2
		  
		//prwino grid
		$rootScope.gridOptions = {
			exporterMenuCsv: false,
		 enableRowSelection: true,
		 enableRowHeaderSelection: false,
		 enableGridMenu: true,
		 showColumnFooter: true,
        
		
		
        columnDefs: [
		{ name:'Πελάτης', field: 'user.displayName'},
          { name:'Διεύθυνση', field: 'user.street'},
          { name:'Ποσότητα(λίτρα)', field: 'quantity',aggregationType: uiGridConstants.aggregationTypes.sum },
		  { name:'Εσοδα(ευρώ)', field: 'pricetp',aggregationType: uiGridConstants.aggregationTypes.sum },
          { name:'city', field: 'user.city'},          
		  { name:'Αρ.Δεή', field: 'dehnumber'},
		  { name:'Tρόπος Πληρωμής', field: 'payment'},
		  { name:'Ημ.Παραλαβής', field: 'duedate'},
		  { name:'Ζώνη ώρας', field: 'hour'}
        ]
		
        
      };
	 
		

 

		  $scope.gridOptions.multiSelect = true;
		  $scope.gridOptions.modifierKeysToMultiSelect = false;
		  $scope.gridOptions.noUnselect = false;
		  $scope.gridOptions.onRegisterApi = function( gridApi ) {
			$scope.gridApi = gridApi;
			$scope.gridApi.selection.on.rowSelectionChanged($scope, function(row){
				$scope.litres1=$scope.gridApi.grid.columns[2].getAggregationValue();
				console.log($scope.gridApi.selection.getSelectedCount());
				if($scope.gridApi.selection.getSelectedCount()>0){
					  $scope.litres1=$scope.gridApi.grid.columns[2].getAggregationValue();
					  if($scope.truck.size>= $scope.litres1){
						  $scope.disableViewOrders = false;
					  }else{
						  $scope.disableViewOrders = true;
						   $scope.hint1 = "Το μέγεθος του φορτηγού δεν επαρκεί για αυτές τις παραγγελίες";
					  }

				  }else{
						$scope.litres1 = 0;
						$scope.disableViewOrders = true;
						 $scope.hint3 ="";
					}
				
			});
		  };
	///////////////prwino grind
	
	//////////////mesimeriano grid
		$rootScope.gridOptions2 = {
			exporterMenuCsv: false,
		 enableRowSelection: true,
		 enableRowHeaderSelection: false,
		 enableGridMenu: true,
		 showColumnFooter: true,
       
		
		
        columnDefs: [
		{ name:'Πελάτης', field: 'user.displayName'},
          { name:'Διεύθυνση', field: 'user.street'},
          { name:'Ποσότητα(λίτρα)', field: 'quantity',aggregationType: uiGridConstants.aggregationTypes.sum },
		  { name:'Εσοδα(ευρώ)', field: 'pricetp',aggregationType: uiGridConstants.aggregationTypes.sum },
          { name:'city', field: 'user.city'},          
		  { name:'Αρ.Δεή', field: 'dehnumber'},
		  { name:'Tρόπος Πληρωμής', field: 'payment'},
		  { name:'Ημ.Παραλαβής', field: 'duedate'},
		  { name:'Ζώνη ώρας', field: 'hour'}
        ]
		
        
      };
	 
		

 

  $rootScope.gridOptions2.multiSelect = true;
  $rootScope.gridOptions2.modifierKeysToMultiSelect = false;
  $rootScope.gridOptions2.noUnselect = false;
 $rootScope.gridOptions2.onRegisterApi = function( gridApi ) {
    $scope.gridApi2 = gridApi;
	$scope.gridApi2.selection.on.rowSelectionChanged($scope, function(row){
		//console.log($scope.gridApi2.grid.columns[2].getAggregationValue());
		if($scope.gridApi2.selection.getSelectedCount()>0){
		  $scope.litres2=$scope.gridApi2.grid.columns[2].getAggregationValue();
		  
		  if($scope.truck.size>= $scope.litres2){
						  $scope.disableViewOrders2 = false;
			 }else{
						  $scope.disableViewOrders2 = true;
						   $scope.hint2 = "Το μέγεθος του φορτηγού δεν επαρκεί για αυτές τις παραγγελίες";
		  }
		  
		  
		}else{
			$scope.litres2 = 0;
			$scope.disableViewOrders2 = true;
			 $scope.hint2 = "";
		}
	});
  };
	/////////////mesimeriano grid
	
	////////////apogeumatino grid
		$rootScope.gridOptions3 = {
			exporterMenuCsv: false,
			
		 enableRowSelection: true,
		 enableRowHeaderSelection: false,
		 enableGridMenu: true,
		 showColumnFooter: true,
       
		
		
        columnDefs: [
		{ name:'Πελάτης', field: 'user.displayName'},
          { name:'Διεύθυνση', field: 'user.street'},
          { name:'Ποσότητα(λίτρα)', field: 'quantity',aggregationType: uiGridConstants.aggregationTypes.sum },
		  { name:'Εσοδα(ευρώ)', field: 'pricetp',aggregationType: uiGridConstants.aggregationTypes.sum },
          { name:'city', field: 'user.city'},          
		  { name:'Αρ.Δεή', field: 'dehnumber'},
		  { name:'Tρόπος Πληρωμής', field: 'payment'},
		  { name:'Ημ.Παραλαβής', field: 'duedate'},
		  { name:'Ζώνη ώρας', field: 'hour'}
        ]
		
        
      };
	 
		

 

  $rootScope.gridOptions3.multiSelect = true;
  $rootScope.gridOptions3.modifierKeysToMultiSelect = false;
  $rootScope.gridOptions3.noUnselect = false;
  $rootScope.gridOptions3.onRegisterApi = function( gridApi ) {
    $scope.gridApi3 = gridApi;
	$scope.gridApi3.selection.on.rowSelectionChanged($scope, function(row){
		//console.log($scope.gridApi3.grid.columns[2].getAggregationValue());
		
		if($scope.gridApi3.selection.getSelectedCount()>0){
		  $scope.litres3=$scope.gridApi3.grid.columns[2].getAggregationValue();
		    if($scope.truck.size>= $scope.litres3){
						  $scope.disableViewOrders3 = false;
						  
						  
			 }else{
						  $scope.disableViewOrders3 = true;
						  $scope.hint3 = "Το μέγεθος του φορτηγού δεν επαρκεί για αυτές τις παραγγελίες";
		  }
		  
		  
		}else{
			$scope.litres3 = 0;
			$scope.disableViewOrders3 = true;
			 $scope.hint3 = "";
		}
	});
  };
	///////////apogeumatino grid
	
	
	
	
  $scope.toggleRowSelection = function() {
    $scope.gridApi.selection.clearSelectedRows();
    $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
  };
   $scope.prevStateData = [];
  $scope.currentSelection = [];
	$scope.getCurrentSelection = function(timezone) {
		//to timezone einai apo t koympaki stinn html
			if(timezone ==='prwini'){
				$scope.disably = false;
				//gia undo tou dromologiou
					//$scope.prevStateData1 = $rootScope.gridOptions.data;
				  $scope.currentSelection = $scope.gridApi.selection.getSelectedRows();
				   angular.forEach($scope.currentSelection, function (data, index) {
				$rootScope.gridOptions.data.splice($rootScope.gridOptions.data.lastIndexOf(data), 1);
				});
				 
				 $rootScope.gridOptions1.data =  $scope.currentSelection;
			}else if(timezone ==='mesimeri'){
				$scope.disably1 = false;
				//gia undo tou dromologiou
				//$scope.prevStateData2 = $rootScope.gridOptions2.data;
				 $scope.currentSelection = $scope.gridApi2.selection.getSelectedRows();
				  angular.forEach($scope.currentSelection, function (data, index) {
						$rootScope.gridOptions2.data.splice($rootScope.gridOptions2.data.lastIndexOf(data), 1);
					});
				 $rootScope.gridOptions1.data =  $scope.currentSelection;
			}else{
				$scope.disably2 = false;
				//gia undo tou dromologiou
				//$scope.prevStateData3 = $rootScope.gridOptions3.data;
				$scope.currentSelection = $scope.gridApi3.selection.getSelectedRows();
				
				  angular.forEach($scope.currentSelection, function (data, index) {
							$rootScope.gridOptions3.data.splice($rootScope.gridOptions3.data.lastIndexOf(data), 1);
						});
						
				 $rootScope.gridOptions1.data =  $scope.currentSelection;
			}
		
			// console.log("to id to truck einai"+$scope.truck._id+"to truck einai"+$scope.truck);
			 $scope.routetruck = $scope.truck._id;
			
	};
	//apo to plunker
	

  $scope.hideGrid = false;
  $scope.animationsEnabled = true;
	$scope.booli = false;
	$scope.disably = true;
	$scope.disably1 = true;
	$scope.disably2 = true;
  $scope.open = function (size,timezone) {
	  
		$scope.getCurrentSelection(timezone);
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalController',
      size: size,
	  resolve: {
        bools: function () {
          return $scope.booli;
        }
      }
    });
		
	modalInstance.result.then(function (bools,timezone) {
     // $scope.routeCredentials.orders = [];
	// console.log(timezone);
	  
			 
			
			$scope.ordersSum1 =$scope.gridApi.grid.columns[3].getAggregationValue();
			if($scope.ordersSum1===0){
						$scope.prwinoHint ="Δεν υπάρχουν αλλες παραγγελίες για  την πρωινή ζώνη";
				}
		//	
	  
				  
					
				$scope.ordersSum2 = $scope.gridApi2.grid.columns[3].getAggregationValue();
				
				if($scope.ordersSum2===0){
						$scope.mesimeriHint ="Δεν υπάρχουν αλλες παραγγελίες για τη μεσημεριανής ζώνη";
					}
		 // $scope.disably1 = false;
	  
		    angular.forEach($scope.currentSelection, function (data, index) {
							$rootScope.gridOptions3.data.splice($rootScope.gridOptions3.data.lastIndexOf(data), 1);
						});
						
			$scope.ordersSum3 = $scope.gridApi3.grid.columns[3].getAggregationValue();
			if($scope.ordersSum3===0){
						$scope.apogeymaHint ="Δεν υπάρχουν αλλες παραγγελίες για  τη απογευματινή ζώνη";
					}
			//$scope.disably2 = false;
	  
	 
	   
	  // $scope.creCredentials.orders = JSON.stringify($rootScope.gridOptions1.data);
	   //$scope.creCredentials.lengthy = $rootScope.gridOptions1.data.length;
		$scope.routeCre.orders = $rootScope.gridOptions1.data;
		$scope.routeCredentials.orderQuantity  =$rootScope.gridApi1.grid.columns[2].getAggregationValue();
		$scope.routeCredentials.orderIncome  =$rootScope.gridApi1.grid.columns[3].getAggregationValue();
		$scope.routeCredentials.companynname = $rootScope.company.id;
		$scope.routeCredentials.routetruck = $scope.routetruck;
		$scope.routeCredentials.rootedirect = $rootScope.rootedirect;
		$scope.routeCredentials.hour = $rootScope.gridOptions1.data[0].hour;
		$rootScope.routeCredentials.driver =$filter('filter')($scope.companyDrivers,{displayName:$scope.driver});
		$rootScope.routeCredentials.driver =$rootScope.routeCredentials.driver.id;
		
	/*
		var varr2 = $http.post('api/CreateRoute',$scope.routeCredentials);
		varr2.success(function(data){
			
			angular.forEach($scope.routeCre.orders , function(curMarker) {
									
									
									$scope.creCredentials.tauto = curMarker._id;
									$scope.creCredentials.email = curMarker.user.email;
									$scope.creCredentials.created = curMarker.created;
								
									
									$scope.creCredentials.route = JSON.stringify(data.id);
									
									var varrr = $http.post('api/UpdateOrders?orderid='+curMarker._id,$scope.creCredentialsΦ);
									
								});//angular.foreach
		
		
		});//varr2.successend
		*/

    });// modalInstance then
	  
	  $scope.saveRoute = function(teCredentials,orders){
				//console.log("ta route credentials einai+ "+teCredentials);				 
				  if($scope.routeCredentials.orderQuantity!==0){
				  var varr2 = $http.post('api/CreateRoute',teCredentials);
					varr2.success(function(data){					
						angular.forEach(orders , function(curMarker) {										
												$scope.creCredentials.tauto = curMarker._id;
												$scope.creCredentials.email = curMarker.user.email;
												$scope.creCredentials.created = curMarker.created;						
												$scope.creCredentials.route = JSON.stringify(data.id);											
												var varrr = $http.post('api/UpdateOrders?orderid='+curMarker._id,$scope.creCredentials);
											});//angular.foreach				
					  //console.log("routeCreated");
					});//varr2.successend
				  }
				  
			 $scope.disably = true;
		  $scope.disably1 = true;
		  $scope.disably2 = true;
	 };//saveRoute
	  $scope.cancelRoute1 = function(pushdatra){
		// $rootScope.gridOptions.data.push(pushdatra);
		//$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
		//$scope.gridApi.core.refresh();
		//$scope.gridApi.grid.queueGridRefresh();
		$state.go($state.current, {}, {reload: true});
		// window.location.reload();
		//$rootScope.gridOptions2.data.refresh();
		  //console.log("to route akyrw8ike");
		  $scope.disably = true;
		  $scope.disably1 = true;
		  $scope.disably2 = true;
	  };
	  
	  
	  
	  
	 // $scope.gridApi.selection.clearSelectedRows();
	  //console.log($scope.gridApi.grid.columns[2].getAggregationValue());
  };//open modal
	
  	//μοδαλς γριντ
	$rootScope.gridOptions1 = {
		 enableRowSelection: true,
		 enableRowHeaderSelection: false,
		 enableGridMenu: true,
		 showGridFooter: true,
        enableSorting: true,
		showColumnFooter: true,
		
        columnDefs: [
		{ name:'Πελάτης', field: 'user.displayName'},
          { name:'Διεύθυνση', field: 'user.street'},
          { name:'Ποσότητα(λίτρα)', field: 'quantity',aggregationType: uiGridConstants.aggregationTypes.sum },
		  { name:'Εσοδα(ευρώ)', field: 'pricetp',aggregationType: uiGridConstants.aggregationTypes.sum },
          { name:'city', field: 'user.city'},          
		  { name:'Αρ.Δεή', field: 'dehnumber'},
		  { name:'Tρόπος Πληρωμής', field: 'payment'},
		  { name:'Ημ.Παραλαβής', field: 'duedate'},
		  { name:'Ζώνη ώρας', field: 'hour'}
        ]
		
        
      };
		$rootScope.gridOptions1.multiSelect = true;
		  $rootScope.gridOptions1.modifierKeysToMultiSelect = false;
		  $rootScope.gridOptions1.noUnselect = false;
		  $rootScope.gridOptions1.onRegisterApi = function( gridApi ) {
			$rootScope.gridApi1 = gridApi;
		  };

	//
}]);//telos tou controller
//////////////////////////////////////////////////////
angular.module('companies').controller('ModalController', ['$rootScope','$scope', '$stateParams', '$location', 'Authentication', 'Companies','$timeout','$http','uiGmapGoogleMapApi','uiGmapIsReady','$filter','$modalInstance',
  function ($rootScope,$scope, $stateParams, $location, Authentication, Companies,$timeout,$http,uiGmapGoogleMapApi,IsReady,$filter,$modalInstance)
  {
		
	  $scope.mapctr2 = {};
	  $rootScope.rootedirect={};
	  //function pou dinei ta direction sto map 
	  function directions(maps, newLat, newLong,waypoint1,self) {
							//var waypoint = waypoint1
							//console.log(waypoint1);
						
							var directionsService = new maps.DirectionsService();
							$scope.directionsDisplay.setMap(self);
							
							

							var request = {
								origin: newLat + ", " + newLong,
								destination: newLat + ", " + newLong,
								waypoints: waypoint1,
								travelMode: maps.TravelMode.DRIVING,
								optimizeWaypoints: true
							};

							directionsService.route(request, function (response, status) {
								console.log('directions found');
								console.log(response);
								if (status === maps.DirectionsStatus.OK) {
									$rootScope.rootedirect = response;
									//console.log(response);
									$scope.directionsDisplay.setOptions({ suppressMarkers: true });
									$scope.directionsDisplay.setDirections(response);
									//$scope.directionsDisplay.setPanel(document.getElementById("panel"));
								} else {
									console.log('Directions request failed due to ' + status);
								}
							});

	}
	  
	  
	  $scope.routing2= function(data){
		  	
				  uiGmapGoogleMapApi.then(function(maps) {
		  //console.log="arxi t routing";
		  
		  if(!$scope.directionsDisplay){
		    $scope.directionsDisplay = new maps.DirectionsRenderer();
		  }
		 // console.log="!$scope.directionsDisplay";
		var gradeD = data;
		// $scope.fdate = new Date();
    //$scope.fdate.setDate($scope.fdate.getDate() + 1);
		
		$scope.markers31 = [];
		//$scope.directionsDisplay.setDirections();pws adeiazoun ta directions gamwne
		if($scope.directionsDisplay !== null) { 
		   $scope.directionsDisplay.setMap(null);
		   $scope.directionsDisplay = null;
		   }//adeiase ton xarti apo directions kai markers, worked like a charm :D
  // console.log("adeiase ton map");
		
		
					
					
				
				
							var coord1 = {};
					
							var x=0;
								angular.forEach(gradeD, function(curMarker) {
									//console.log(curMarker.user.latitude+"edw ti ginetai");//edw kaleis to push marker ;)
									$scope.markers31[x]=takeMarker4(curMarker,x);
									coord1[x]=$scope.markers31[x].coordinates;
									//console.log($rootScope.waypoint2[x]);
									x++;
								});// console.log("pare ta coords");
								//angularforeach // exoume balei tous markers ston pinaka logika se ayto to point nai gamwne
							$scope.markers31[$scope.markers31.length+1]={
									 message:'',
									 hour:'Σημείο Λήξης Διαδρομής',
									 date:'Σημείο Έναρξης Διαδρομής',
									  dehnumber:'',
										price:null,
									  id: $scope.markers31.length+1,
										name: $rootScope.company.companyname,
										sname:'',
										show:true,
										options: {
									   maxWidth: 400
								   },
										coordinates: {
										  latitude: $rootScope.company.latitude,
										  longitude: $rootScope.company.longitude
										}
								};//min ksexname kai ton marker tis etaireias :)
							// console.log("vale marker etaireias");
							//google maps magic :P
							
								var displaymap;
							IsReady.promise().then(function (maps) {
								displaymap = $scope.mapctr2.getGMap();
								//console.log="show map gamw";
								$scope.map2.center = {
									latitude: $rootScope.company.latitude,
										longitude:  $rootScope.company.longitude
								};
								
							});
							var waypoint2 = [];
							var y = 0;
							angular.forEach(coord1,function(curOrder){
								console.log(curOrder);
									//lati = curOrder.latitude+"";
									//longi = curOrder.longitude+"";/////////////////////ayto apo panw einai gia na ta dior8wseis
								//undefined  console.log(x+" = "+JSON.stringify(lati));//curOrder.latitude,curOrder.longitude//curOrder.orderlatitude,curOrder.orderlongitude
							 waypoint2[y]={location: new maps.LatLng(curOrder.latitude,curOrder.longitude),
							   stopover:true};
							   
							   y++;
							 });
							
								console.log('start');
								$scope.directionsDisplay = new maps.DirectionsRenderer();
								
								IsReady.promise(1).then(function(instances) {
									directions(maps, $rootScope.company.latitude,
															$rootScope.company.longitude,waypoint2,displaymap);
									
								}); //console.log("kane to routing");
							});	//uiGmapGoogleMapApi.then the end 
							//logika ola pane roloi :)
							/*kane update ola ta orders se finished auta se finished
							*apo8ikeyse ta routes sti vasi katallilws
							*/
							
						
							//to mege8os twn paraggeliwn den xwraei sto prwto megalo fortigo
							//filtrarisma kata perioxi kai xrisimopoihsh tou deyterou fortigou
							//me geoNear sto mongoose allo http call :p
							//kane update ola ta orders se finished auta se finished
							//apo8ikeyse ta routes sti vasi katallilws
							
					
						//afou ksemperdepsoun ta routes kane update ta orders se finished
					//	var updatefinished = $http.get('/api/updatefinished?companyname='+$scope.company.companyname+'&fdate='+$scope.fdate+'&timeline='+Time);
							//updatefinished.success(function(data, status, headers, config){
								//console.log("Orders updated successfully");
							//});
					//value4 me ta orders aktina drasis mas :p	oxi meta apo ayti tin paren8esi!!!!!
		
	};
	  
	  
	  
	  /////////////////////////////////////////////////////////
	   $scope.map2 = {
        windowTemplate: "window_template1.html",
        windowParameter: function(marker){
          return marker;
        },
        center: {
            latitude: "40.65099394300474",
                longitude: "22.924316496582037"
        },
        zoom: 10
     };

	var markers2 = [];
			
	var takeMarker4 = function(object,count) {
			
			//ta stoixeia twn markers
		  var ret = {
			  message:'Μυνημα Πελατη: '+object.message,
			 hour:'Ζώνη ώρας: '+object.hour,
			 date:'Ημερομμηνία Παραλαβής: '+object.duedate.split('T')[0],
			  dehnumber:'Αριθμός Δεή: '+object.dehnumber,
				price:'Ποσό Πληρωμής: '+object.pricetp,
			  id: count,
				name:'Ονομα Πελατη: '+ object.user.firstName,
				sname:object.user.lastName,
				show:false,
				options: {
               maxWidth: 400
           },
				coordinates: {
				  //latitude: object.user.latitude,
				  //longitude: object.user.longitude
				   latitude: object.orderlatitude,
				  longitude: object.orderlongitude
				}
		  };
			JSON.stringify(ret);
			//console.log(ret);
			return ret;
			
			
		  };
	 
		$scope.abool=false;
		  $scope.ok = function () {
			 // console.log($rootScope.gridOptions1.data);
			  $scope.abool=true;
			  //κανε τα waypoints
			  //kane to routing
			  //update ta orders
			  //save  to eidos tou  fortigou(megalo h mikro) gia to id
			  
			  //$rootScope.rootedirect apo8ikeuse to edw 
			  
			  
			$modalInstance.close($scope.abool);
		  };

		  $scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		  };

 
  }]);//telos tou controller