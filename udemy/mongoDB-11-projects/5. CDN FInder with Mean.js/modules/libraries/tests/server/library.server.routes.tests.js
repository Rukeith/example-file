'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Library = mongoose.model('Library'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  library;

/**
 * Library routes tests
 */
describe('Library CRUD tests', function () {

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

    // Save a user to the test db and create new Library
    user.save(function () {
      library = {
        name: 'Library name'
      };

      done();
    });
  });

  it('should be able to save a Library if logged in', function (done) {
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

        // Save a new Library
        agent.post('/api/libraries')
          .send(library)
          .expect(200)
          .end(function (librarySaveErr, librarySaveRes) {
            // Handle Library save error
            if (librarySaveErr) {
              return done(librarySaveErr);
            }

            // Get a list of Libraries
            agent.get('/api/libraries')
              .end(function (librariesGetErr, librariesGetRes) {
                // Handle Libraries save error
                if (librariesGetErr) {
                  return done(librariesGetErr);
                }

                // Get Libraries list
                var libraries = librariesGetRes.body;

                // Set assertions
                (libraries[0].user._id).should.equal(userId);
                (libraries[0].name).should.match('Library name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Library if not logged in', function (done) {
    agent.post('/api/libraries')
      .send(library)
      .expect(403)
      .end(function (librarySaveErr, librarySaveRes) {
        // Call the assertion callback
        done(librarySaveErr);
      });
  });

  it('should not be able to save an Library if no name is provided', function (done) {
    // Invalidate name field
    library.name = '';

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

        // Save a new Library
        agent.post('/api/libraries')
          .send(library)
          .expect(400)
          .end(function (librarySaveErr, librarySaveRes) {
            // Set message assertion
            (librarySaveRes.body.message).should.match('Please fill Library name');

            // Handle Library save error
            done(librarySaveErr);
          });
      });
  });

  it('should be able to update an Library if signed in', function (done) {
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

        // Save a new Library
        agent.post('/api/libraries')
          .send(library)
          .expect(200)
          .end(function (librarySaveErr, librarySaveRes) {
            // Handle Library save error
            if (librarySaveErr) {
              return done(librarySaveErr);
            }

            // Update Library name
            library.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Library
            agent.put('/api/libraries/' + librarySaveRes.body._id)
              .send(library)
              .expect(200)
              .end(function (libraryUpdateErr, libraryUpdateRes) {
                // Handle Library update error
                if (libraryUpdateErr) {
                  return done(libraryUpdateErr);
                }

                // Set assertions
                (libraryUpdateRes.body._id).should.equal(librarySaveRes.body._id);
                (libraryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Libraries if not signed in', function (done) {
    // Create new Library model instance
    var libraryObj = new Library(library);

    // Save the library
    libraryObj.save(function () {
      // Request Libraries
      request(app).get('/api/libraries')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Library if not signed in', function (done) {
    // Create new Library model instance
    var libraryObj = new Library(library);

    // Save the Library
    libraryObj.save(function () {
      request(app).get('/api/libraries/' + libraryObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', library.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Library with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/libraries/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Library is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Library which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Library
    request(app).get('/api/libraries/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Library with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Library if signed in', function (done) {
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

        // Save a new Library
        agent.post('/api/libraries')
          .send(library)
          .expect(200)
          .end(function (librarySaveErr, librarySaveRes) {
            // Handle Library save error
            if (librarySaveErr) {
              return done(librarySaveErr);
            }

            // Delete an existing Library
            agent.delete('/api/libraries/' + librarySaveRes.body._id)
              .send(library)
              .expect(200)
              .end(function (libraryDeleteErr, libraryDeleteRes) {
                // Handle library error error
                if (libraryDeleteErr) {
                  return done(libraryDeleteErr);
                }

                // Set assertions
                (libraryDeleteRes.body._id).should.equal(librarySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Library if not signed in', function (done) {
    // Set Library user
    library.user = user;

    // Create new Library model instance
    var libraryObj = new Library(library);

    // Save the Library
    libraryObj.save(function () {
      // Try deleting Library
      request(app).delete('/api/libraries/' + libraryObj._id)
        .expect(403)
        .end(function (libraryDeleteErr, libraryDeleteRes) {
          // Set message assertion
          (libraryDeleteRes.body.message).should.match('User is not authorized');

          // Handle Library error error
          done(libraryDeleteErr);
        });

    });
  });

  it('should be able to get a single Library that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Library
          agent.post('/api/libraries')
            .send(library)
            .expect(200)
            .end(function (librarySaveErr, librarySaveRes) {
              // Handle Library save error
              if (librarySaveErr) {
                return done(librarySaveErr);
              }

              // Set assertions on new Library
              (librarySaveRes.body.name).should.equal(library.name);
              should.exist(librarySaveRes.body.user);
              should.equal(librarySaveRes.body.user._id, orphanId);

              // force the Library to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Library
                    agent.get('/api/libraries/' + librarySaveRes.body._id)
                      .expect(200)
                      .end(function (libraryInfoErr, libraryInfoRes) {
                        // Handle Library error
                        if (libraryInfoErr) {
                          return done(libraryInfoErr);
                        }

                        // Set assertions
                        (libraryInfoRes.body._id).should.equal(librarySaveRes.body._id);
                        (libraryInfoRes.body.name).should.equal(library.name);
                        should.equal(libraryInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Library.remove().exec(done);
    });
  });
});
