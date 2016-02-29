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
    $scope.format = function(dateInfo){
      dateInfo.toDate = "" + dateInfo.rawToDate.getFullYear() + "-0" + (dateInfo.rawToDate.getMonth() + 1) + "-" + ("0" + dateInfo.rawToDate.getDate()).slice(-2)
      dateInfo.fromDate = "" + dateInfo.rawFromDate.getFullYear() + "-0" + (dateInfo.rawFromDate.getMonth() + 1) + "-" + ("0" + dateInfo.rawFromDate.getDate()).slice(-2)
      main.searchItem(dateInfo);
    } 

  })
