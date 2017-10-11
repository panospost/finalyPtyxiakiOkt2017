
'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  order = mongoose.model('order'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, order;

/**
 * order routes tests
 */
describe('order CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new order
    user.save(function () {
      order = {
        title: 'order Title',
        content: 'order Content'
      };

      done();
    });
  });

  it('should be able to save an order if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new order
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function (ordersaveErr, ordersaveRes) {
            // Handle order save error
            if (ordersaveErr) {
              return done(ordersaveErr);
            }

            // Get a list of orders
            agent.get('/api/orders')
              .end(function (ordersGetErr, ordersGetRes) {
                // Handle order save error
                if (ordersGetErr) {
                  return done(ordersGetErr);
                }

                // Get orders list
                var orders = ordersGetRes.body;

                // Set assertions
                (orders[0].user._id).should.equal(userId);
                (orders[0].title).should.match('order Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an order if not logged in', function (done) {
    agent.post('/api/orders')
      .send(order)
      .expect(403)
      .end(function (ordersaveErr, ordersaveRes) {
        // Call the assertion callback
        done(ordersaveErr);
      });
  });

  it('should not be able to save an order if no title is provided', function (done) {
    // Invalidate title field
    order.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new order
        agent.post('/api/orders')
          .send(order)
          .expect(400)
          .end(function (ordersaveErr, ordersaveRes) {
            // Set message assertion
            (ordersaveRes.body.message).should.match('Title cannot be blank');

            // Handle order save error
            done(ordersaveErr);
          });
      });
  });

  it('should be able to update an order if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new order
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function (ordersaveErr, ordersaveRes) {
            // Handle order save error
            if (ordersaveErr) {
              return done(ordersaveErr);
            }

            // Update order title
            order.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing order
            agent.put('/api/orders/' + ordersaveRes.body._id)
              .send(order)
              .expect(200)
              .end(function (orderUpdateErr, orderUpdateRes) {
                // Handle order update error
                if (orderUpdateErr) {
                  return done(orderUpdateErr);
                }

                // Set assertions
                (orderUpdateRes.body._id).should.equal(ordersaveRes.body._id);
                (orderUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of orders if not signed in', function (done) {
    // Create new order model instance
    var orderObj = new order(order);

    // Save the order
    orderObj.save(function () {
      // Request orders
      request(app).get('/api/orders')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single order if not signed in', function (done) {
    // Create new order model instance
    var orderObj = new order(order);

    // Save the order
    orderObj.save(function () {
      request(app).get('/api/orders/' + orderObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', order.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single order with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/orders/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'order is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single order which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent order
    request(app).get('/api/orders/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No order with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an order if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new order
        agent.post('/api/orders')
          .send(order)
          .expect(200)
          .end(function (ordersaveErr, ordersaveRes) {
            // Handle order save error
            if (ordersaveErr) {
              return done(ordersaveErr);
            }

            // Delete an existing order
            agent.delete('/api/orders/' + ordersaveRes.body._id)
              .send(order)
              .expect(200)
              .end(function (orderDeleteErr, orderDeleteRes) {
                // Handle order error error
                if (orderDeleteErr) {
                  return done(orderDeleteErr);
                }

                // Set assertions
                (orderDeleteRes.body._id).should.equal(ordersaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an order if not signed in', function (done) {
    // Set order user
    order.user = user;

    // Create new order model instance
    var orderObj = new order(order);

    // Save the order
    orderObj.save(function () {
      // Try deleting order
      request(app).delete('/api/orders/' + orderObj._id)
        .expect(403)
        .end(function (orderDeleteErr, orderDeleteRes) {
          // Set message assertion
          (orderDeleteRes.body.message).should.match('User is not authorized');

          // Handle order error error
          done(orderDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      order.remove().exec(done);
    });
  });
});
