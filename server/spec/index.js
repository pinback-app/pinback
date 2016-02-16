var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../index.js');

var db = require('../models/db/index.js');

var newUserId;

var venueId = '353453545345435';
var eventId = '434242434'
 
after(function() {
  // runs after all tests in this block

  // db.queryHelper("truncate `events`; tuncate `users`; truncate `venues`;", [], function() {
  //   return;
  // });

  // note: i cannot get these queries above to work for some reason, 
  // run the script below manually to clear data
  // delete from `users_events`; delete from `users`; delete from `events`; delete from `venues`;
});

describe("Greenfield - Server - REST API Routes", function() {

  describe('/api/user', function() {

    describe('POST', function() {

      it('responds with a 201 (Created) and the json data for the new user', function(done) {

        var newUser = {
          name: 'new_user_api_test'
        };

        var new_user_id;

        request(app)
          .post('/api/user')
          .send(newUser)
          .expect(function(res) {
            expect(res.body.id).to.exist;
            expect(res.body.name).to.equal('new_user_api_test');
            newUserId = res.body.id;
          })
          .expect(201, done);
      });

    });
  });

  describe('/api/venue', function() {

    describe('POST', function() {

      it('responds with a 201 (Created) and the json data for the new venue', function(done) {

        var newVenue = {
          id: venueId,
          url: 'http://www.venue.com',
          name: 'new venue',
          city: 'San Francisco',
          region: 'CA',
          country: 'USA',
          latitude: '43434.32',
          longitude: '4343434.232'
        };

        request(app)
          .post('/api/venue')
          .send(newVenue)
          .expect(function(res) {
            expect(res.body.id).to.exist;
            expect(res.body.name).to.equal('new venue');
            expect(res.body.city).to.equal('San Francisco');
            expect(res.body.region).to.equal('CA');
            expect(res.body.country).to.equal('USA');
            expect(res.body.latitude).to.equal('43434.32');
            expect(res.body.longitude).to.equal('4343434.232');
          })
          .expect(201, done);
      });

    });
  });

  describe('/api/event', function() {

    describe('POST', function() {

      it('responds with a 201 (Created) and the json data for the new event', function(done) {

        var newEvent = {
          id: eventId,
          artists: 'new event artists',
          date_time: '9-28-2016',
          ticket_url: 'http://www.eventbrite.com',
          venue_id: venueId //FYI - this must already exist in the db
        };

        request(app)
          .post('/api/event')
          .send(newEvent)
          .expect(function(res) {
            expect(res.body.id).to.exist;
            expect(res.body.artists).to.equal('new event artists');
            expect(res.body.date_time).to.equal('2016-09-28T07:00:00.000Z');
            expect(res.body.ticket_url).to.equal('http://www.eventbrite.com');
            expect(res.body.venue_id).to.equal(venueId);
          })
          .expect(201, done);
      });
    });
  });

  describe('/userEvents', function() {

    describe('POST', function() {

      it('responds with a 201 (Created) and the json data for the new user event combo', function(done) {

        var userEvent = {
          user_id: newUserId,
          event_id: eventId
        };

        request(app)
          .post('/api/userEvents')
          .send(userEvent)
          .expect(function(res) {
            expect(res.body.id).to.exist;
            expect(res.body.user_id).to.equal(newUserId);
            expect(res.body.event_id).to.equal(eventId);
          })
          .expect(201, done);
      });
    });



    describe('GET', function() {

      it('responds with a 200 (OK) and the json data for the events for this user', function(done) {

        request(app)
          .get('/api/userEvents/' + newUserId)
          .expect(function(res) {
            var events = res.body;
            expect(events[0].id).to.exist;
            expect(events[0].artists).to.equal('new event artists');
            expect(events[0].date_time).to.equal('2016-09-28T07:00:00.000Z');
            expect(events[0].ticket_url).to.equal('http://www.eventbrite.com');
            expect(events[0].venue_id).to.equal(venueId);
            expect(events[0].name).to.equal('new venue');
          })
          .expect(200, done);
      });
    });

    describe('DELETE', function() {

      it('responds with a 204 (Deleted)', function(done) {

        var userEvent = {
          user_id: newUserId,
          event_id: eventId
        };

        request(app)
          .delete('/api/userEvents')
          .send(userEvent)
          .expect(204, done);
      });
    });
  });

  describe('/search', function() {

    describe('POST', function() {

      it('responds with a 200 (OK) and the json data for the search results', function(done) {

        var searchParams = {
          city: 'San Francisco',
          state: 'CA',
          fromDate: '2016-01-29',
          toDate: '2016-01-30'
        };

        request(app)
          .post('/api/search')
          .send(searchParams)
          .expect(function(res) {
            expect(res.body).to.exist;
            expect(Array.isArray(res.body)).to.equal(true);
          })
          .expect(200, done);
      });
    });
  });
});
