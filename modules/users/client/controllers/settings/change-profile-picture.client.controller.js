'use strict';

angular.module('users').controller('ChangeLocationController',  ['$rootScope','$state', '$http','$timeout', '$location', '$window', 'Authentication','uiGmapGoogleMapApi','uiGmapIsReady','$localStorage','Users',
  function ($scope, $state, $http, $timeout, $location, $window, Authentication,uiGmapGoogleMapApi,uiGmapIsReady,$localStorage,Users)
  {
    $scope.user = Authentication.user;
  
	  $scope.map1 = {
					control:{},
					refresh:{},
				center: {
					   latitude:$scope.user.latitude||40.724585999999995 , 
                   longitude:$scope.user.longitude ||22.996168599999997
				},
				draggable: true,
				zoom: 10
			};
	
	
	 $scope.marker1 = {
			  id: 321,
			  coords: {
					latitude:$scope.user.latitude||40.724585999999995 , 
                   longitude:$scope.user.longitude ||22.996168599999997
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
			
					        	$scope.user.latitude = marker.getPosition().lat();
								  $scope.user.longitude = marker.getPosition().lng();

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
			$scope.user.latitude = place[0].geometry.location.lat();
			 $scope.user.longitude = place[0].geometry.location.lng();
			$scope.user.loc = [ place[0].geometry.location.lng(),place[0].geometry.location.lat()];
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
			
					        	$scope.user.latitude = marker.getPosition().lat();
								 $scope.user.longitude = marker.getPosition().lng();
								$scope.user.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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
	  $scope.searchbox = { template: 'searchbox1.tpl.html', events: events };
	  
	  $scope.getLocation = function(){
		//$scope.open();
		 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

                $scope.user.latitude = position.coords.latitude; 
               $scope.user.longitude = position.coords.longitude;
			   $scope.user.loc = [position.coords.longitude,position.coords.latitude];
                //console.log($scope.credentials.latitude);
               // console.log($scope.credentials.longitude);
				//
		
		  $scope.map1 = {
					control:{},
					refresh:{},
				center: {
					   latitude:position.coords.latitude , 
                   longitude:position.coords.longitude 
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
			
					        	$scope.user.latitude = marker.getPosition().lat();
								 $scope.user.longitude = marker.getPosition().lng();
								$scope.user.loc = [ marker.getPosition().lng(),marker.getPosition().lat()];
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
	 
		$scope.updateloc = function(isValid){
			if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'locForm');

        return false;
      }
		
		var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'locForm1');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
			
			
			
		};
		
		 
		
   
   
   
  }
]);
/*
angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    
	
	
	
	
	
	$scope.imageURL = $scope.user.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/picture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
  }
]);*/
