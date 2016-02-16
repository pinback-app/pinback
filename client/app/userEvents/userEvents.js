angular.module('greenfield.userEvents', [])

.controller('userEventsController', function($scope, $log, $http) {

  // $scope.go = function(event){        //in case we don't like the ng-href method, we can change it to an ng-click
  //   location.assign("event.url");    //will do a reroute to http://127.0.0.1:3000/#/www.google.com instead of a redirect if the http is missing
  // }

  $scope.user = {
    id: 148
  };

  $http({
    type: 'GET',
    url: '/api/userEvents/' + $scope.user.id

  }).success(function(events){
    $log.info(events);
    $scope.user.events = events;
  })


});