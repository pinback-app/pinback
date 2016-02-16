//dummy data
var mapItems = [{
  name: 'Blackwall Hitch',
  b_venue_id: 3051563,
  lat: 38.8047222,
  lon: -77.0472222,
  events: [{
    b_event_id: 10786327,
    url: "http://www.bandsintown.com/event/10786327/buy_tickets?app_id=mapit&came_from=233",
    datetime: "2016-01-07T09:00:00",
    artists: [{
      "name": "Darcy Dawn & Company",
      "url": "http://www.bandsintown.com/DarcyDawnAndCompany"
    }]

  }, {
    b_event_id: 10786327,
    url: "http://www.bandsintown.com/event/10786327/buy_tickets?app_id=mapit&came_from=233",
    datetime: "2016-01-07T09:00:00",
    artists: [{
      "name": "Lucero",
      "url": "http://www.bandsintown.com/Lucero"
    }]

  }]

}]
//processed data
mainMarker = {
  id: 0,
  lat: mapItems[0].lat,
  lng: mapItems[0].lon,
  focus: true,
  message: '<div>' + mapItems[0].name + '</div>',


};