angular.module('greenfield.main', ['leaflet-directive'])
  .controller('BasicCenterController', ['$scope', '$location', '$log', '$filter', 'main', function($scope, $location, $log, $filter, main) {
    $scope.search = '';

    $scope.addEvent = function(event) {
        main.eventRequest(event);
      }
      //set data to bandsintown content
    var geojson = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: []
    }
    $scope.geojson = {};
    var data = $location.search();
    //declare map maprkers
    for (var i = 0; i < data.mapData.data.length; i++) {
      marker = {
        type: "Feature",
        properties: {
          id: i,
          name: data.mapData.data[i].name,
          lat: data.mapData.data[i].latitude,
          lng: data.mapData.data[i].longitude,
          events: data.mapData.data[i].events,
          message: data.mapData.data[i].name
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            data.mapData.data[i].longitude,
            data.mapData.data[i].latitude
          ]
        }
      }
      geojson.features.push(marker)
    };
    $scope.geojson.data = geojson
      //extend scope to map objects and set defaults
    angular.extend($scope, {
      defaults: {
        minZoom: 11,
        scrollWheelZoom: false
      },
      center: {
        lat: $scope.geojson.data.features[0].geometry.lat,
        lng: $scope.geojson.data.features[0].geometry.lng,
        zoom: 12
      },
      // markers: $scope.markers,
      position: {
        lat: $scope.geojson.data.features[0].geometry.lat,
        lng: $scope.geojson.data.features[0].geometry.lng,

      },
      layers: {
        baselayers: {
          osm: {
            name: 'CartoDB',
            url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            type: 'xyz'
          }
        }
      }
    });
    $scope.$watch('search', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== '') {
        $scope.geojson.data = $filter('filter')(geojson, 'name', newVal);
      } else {
        $scope.geojson.data = geojson;
      }
    })
  }])