angular.module('greenfield.search', [])

  .controller('searchController', function($scope, $log, $http, main){
    
    $scope.aboutUs = false;
    $scope.team = false;
    $scope.contactUs = false;
    //These will populate the appropriate search fields in an object to get the corresponding map data.
    $scope.search = {};//defining the object and properties ahead of time ensures they are in the correct order for the API request

    $scope.search.zip = '';

    $scope.city = '';

    $scope.search.rawFromDate = '';

    $scope.search.rawToDate = '';

    $scope.clickTeam = function() {
      $scope.aboutUs = false;
      $scope.team = true;
      $scope.contactUs = false;
    }

    $scope.clickAbout = function() {
      $scope.aboutUs = true;
      $scope.team = false;
      $scope.contactUs = false;
    }

    $scope.clickContact = function() {
      $scope.contactUs = true;
      $scope.team = false;
      $scope.aboutUs = false;
    }

    $scope.resetNav = function() {
      $scope.contactUs = false;
      $scope.team = false;
      $scope.aboutUs = false;
    }

    //This reformats data (to and from date) to bands in town api formatted dates
    $scope.format = function(stuff){// when the time comes to pass this stuff to ben, reset this function to contain two inner functions, one that reformats everything, and a second that passes off the data to his function
      stuff.toDate = "" + stuff.rawToDate.getFullYear() + "-0" + (stuff.rawToDate.getMonth() + 1) + "-" + stuff.rawToDate.getDate()
      stuff.fromDate = "" + stuff.rawFromDate.getFullYear() + "-0" + (stuff.rawFromDate.getMonth() + 1) + "-" + stuff.rawFromDate.getDate()
      main.searchItem(stuff);
    } 

//concat city, state to zip 




  })
