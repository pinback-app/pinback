angular.module('greenfield.services', [])

.factory('main', function($http, $log, $location) {
  //test user
  var user_id = 148


  var venue_id;

  //Receives data for requested venue in specific date range and location
  var venueRequest = function(venue) {
    $log.info(venue);
    venue_id = "" + venue.id;
    id = venue_id;
    venue.url = "";
    venue.city = "";
    venue.region = "";
    venue.country = "";
    venue.latitude = venue.lat;
    venue.longitude = venue.lng;
    return $http({
      method: 'POST',
      url: '/api/venue',
      data: venue
    })
  }

  //Receives data for requested event 
  var eventRequest = function(event) {
    event.artists = event.artists[0].name;
    event.venue_id = venue_id;
    event.date_time = event.datetime;
    event.ticket_url = event.url;
    event.id = event.b_event_id.toString();
    $log.info(event);
    return $http({
      method: 'POST',
      url: '/api/event',
      data: event
    }).then(function(resp) {
      console.log(resp.data)
      var data = {
        event_id: resp.data.id,
        user_id: user_id
      };
      return $http({
        method: 'POST',
        url: '/api/userEvents',
        data: data
      })
    })
  }

  var mapRequest = function(obj) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: obj
    }).then(function(resp) {
      $location.path('/main').search({
        mapData: resp
      })
    })
  }

  var searchItem = function(stuff) {
    $http({
      method: "GET",
      url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + stuff.zip
    }).then(function(res) {
      stuff.city = res.data.results[0].address_components[1].long_name;
      stuff.state = res.data.results[0].address_components[res.data.results[0].address_components.length - 2].short_name; //fix DC edgecase by using slice two spaces after the comma in the formatted address field
      mapRequest(stuff);
    })

  }

  return {
    mapRequest: mapRequest,
    searchItem: searchItem,
    eventRequest: eventRequest,
    venueRequest: venueRequest
  };
});