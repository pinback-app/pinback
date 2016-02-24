angular.module('greenfield.main', ['leaflet-directive'])
  .controller('BasicCenterController', ['$scope', '$location', '$log', '$filter', 'main', function($scope, $location, $log, $filter, main) {
    $scope.search = '';

    //function that will redirect user to the search page, which is currently set as home
    $scope.goHome = function() {
      $location.path('/#/search')
    }

    $scope.addEvent = function(event) {
        main.eventRequest(event);
      }
      //set data to bandsintown content
    // var onEachFeature = function(feature, layer) {
    //   // does this feature have a property named popupContent?
    //   console.log('CLICKED')
    //   if (feature.properties && feature.properties.popupContent) {
    //     layer.bindPopup(feature.properties.popupContent);
    //   }
    // }
    // $scope.geojson.options = {onEachFeature: onEachFeature}

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

    //On click event that will show selected venue details
    $scope.$on("leafletDirectiveGeoJson.click", function(ev, featureSelected, leafletEvent) {
      $scope.search = featureSelected.model.properties.name;
    });
    $scope.$on("leafletDirectiveMap.click", function(ev, featureSelected, leafletEvent) {
      $scope.search = "";
    });

    $scope.geojson = {};
    var data = $location.search();
    var venues = data.mapData.data
    //declare map maprkers
    for (var i = 0; i < venues.length; i++) {
      for (var j = 0; j < venues[i].events.length; j++) {
        
        venues[i].events[j].datetime = moment(venues[i].events[j].datetime).format('MMMM Do YYYY, h:mm:ss a');
      }

      marker = {
        type: "Feature",
        properties: {
          id: i,
          name: venues[i].name,
          lat: venues[i].latitude,
          lng: venues[i].longitude,
          events: venues[i].events,
          popupContent: venues[i].name,
          focus: true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            venues[i].longitude,
            venues[i].latitude
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
        scrollWheelZoom: true
      },
      center: {
        lat: $scope.geojson.data.features[0].geometry.coordinates[1],
        lng: $scope.geojson.data.features[0].geometry.coordinates[0],
        zoom: 12
      },
      position: {
        lat: $scope.geojson.data.features[0].geometry.coordinates[1],
        lng: $scope.geojson.data.features[0].geometry.coordinates[0],
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

    //$watch event that will update list view based on map interactions
    $scope.$watch('search', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== '') {
        $scope.geojson.data = $filter('filter')(geojson, 'name', newVal);
      } else {
        $scope.geojson.data = geojson;
      }
    })
  }])