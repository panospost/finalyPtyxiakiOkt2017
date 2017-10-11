'use strict';

(function () {
  // Orders Controller Spec
  describe('Orders Controller Tests', function () {
    // Initialize global variables
    var OrdersController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Orders,
      mockOrder;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Orders_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Orders = _Orders_;

      // create mock Order
      mockOrder = new Orders({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Order about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Orders controller.
      OrdersController = $controller('OrdersController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one Order object fetched from XHR', inject(function (Orders) {
      // Create a sample Orders array that includes the new Order
      var sampleOrders = [mockOrder];

      // Set GET response
      $httpBackend.expectGET('api/Orders').respond(sampleOrders);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.Orders).toEqualData(sampleOrders);
    }));

    it('$scope.findOne() should create an array with one Order object fetched from XHR using a OrderId URL parameter', inject(function (Orders) {
      // Set the URL parameter
      $stateParams.OrderId = mockOrder._id;

      // Set GET response
      $httpBackend.expectGET(/api\/Orders\/([0-9a-fA-F]{24})$/).respond(mockOrder);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.order).toEqualData(mockOrder);
    }));

    describe('$scope.create()', function () {
      var sampleOrderPostData;

      beforeEach(function () {
        // Create a sample Order object
        sampleOrderPostData = new Orders({
          title: 'An Order about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Order about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Orders) {
        // Set POST response
        $httpBackend.expectPOST('api/Orders', sampleOrderPostData).respond(mockOrder);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the Order was created
        expect($location.path.calls.mostRecent().args[0]).toBe('Orders/' + mockOrder._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/Orders', sampleOrderPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock Order in scope
        scope.Order = mockOrder;
      });

      it('should update a valid Order', inject(function (Orders) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/Orders\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/Orders/' + mockOrder._id);
      }));

      it('should set scope.error to error response message', inject(function (Orders) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/Orders\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(Order)', function () {
      beforeEach(function () {
        // Create new Orders array and include the Order
        scope.Orders = [mockOrder, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/Orders\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockOrder);
      });

      it('should send a DELETE request with a valid OrderId and remove the Order from the scope', inject(function (Orders) {
        expect(scope.Orders.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.Order = mockOrder;

        $httpBackend.expectDELETE(/api\/Orders\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to Orders', function () {
        expect($location.path).toHaveBeenCalledWith('Orders');
      });
    });
  });
}());