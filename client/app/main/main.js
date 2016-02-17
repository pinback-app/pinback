angular.module('greenfield.main', ['leaflet-directive'])
  .controller('BasicCenterController', function($scope, $location, $log, main) {
      $scope.search = {}; //defining the object and properties ahead of time ensures they are in the correct order for the API request

      $scope.search.zip = '';

      $scope.city = '';

      $scope.search.rawFromDate = '';

      $scope.search.rawToDate = '';

      $scope.format = function(stuff) { // when the time comes to pass this stuff to ben, reset this function to contain two inner functions, one that reformats everything, and a second that passes off the data to his function
        stuff.toDate = "" + stuff.rawToDate.getFullYear() + "-0" + (stuff.rawToDate.getMonth() + 1) + "-" + stuff.rawToDate.getDate();
        stuff.fromDate = "" + stuff.rawFromDate.getFullYear() + "-0" + (stuff.rawFromDate.getMonth() + 1) + "-" + stuff.rawFromDate.getDate();
        main.searchItem(stuff);
      }

      $scope.addEvent = function(event) {
          main.eventRequest(event);
        }
          //set data to bandsintown content
        var data = $location.search();
        //declare map maprkers
        $scope.markers = [];
        $log.log($scope.markers)
        for (var i = 0; i < data.mapData.data.length; i++) {
          marker = {
            id: i,
            name: data.mapData.data[i].name,
            lat: data.mapData.data[i].latitude,
            lng: data.mapData.data[i].longitude,
            events: data.mapData.data[i].events,
            message: data.mapData.data[i].name
          }
          $scope.markers.push(marker)
        };

        //Set data variables for rendering venue information on click
        //"Could not load data" should not be displayed
        $scope.data = {};
        $scope.data.showMarker = {
          name: 'Could not load data'
        };
        $scope.data.venue = 'Could not load data';

        //extend scope to map objects and set defaults
        angular.extend($scope, {
          defaults: {
            minZoom: 11,
            scrollWheelZoom: false
          },
          center: {
            lat: $scope.markers[0].lat,
            lng: $scope.markers[0].lng,
            zoom: 12
          },
          markers: $scope.markers,
          position: {
            lat: $scope.markers[0].lat,
            lng: $scope.markers[0].lng
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



        //displays event information when marker is clicked
        $scope.$on('leafletDirectiveMarker.click', function(e, args) {
          // references data by id in args
          var id = args.leafletEvent.target.options.id;
          var venue = $scope.markers[id];
          main.venueRequest(venue);
          $scope.data.showMarker = $scope.markers[id].events;
          $scope.reveal = true;
          // console.log($scope.data.showMarker[0])
        });
  })