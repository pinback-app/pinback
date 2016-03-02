angular.module('greenfield', [
    'greenfield.services',
    'greenfield.main',
    'greenfield.search',
    'greenfield.userEvents',
    'greenfield.login',
    'ngRoute',
    'ui.router',
    'ngMessages'//form validation in search.html
  ])

//states setup using ui router
.config(function ($routeProvider, $stateProvider, $sceProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/index.html', 
      templateUrl: 'app/search/search.html', 
      controller: 'searchController'
    })
    .state('main',{
      url: '/main.html',
      templateUrl: 'app/main/main.html',
      controller: 'BasicCenterController'
    })
    .state('search', {
      url: '/search.html',
      templateUrl: 'app/search/search.html',
      controller: "searchController"
    })
    .state('userEvents', {
      url: '/userEvents.html', 
      templateUrl: "app/userEvents/userEvents.html",
      controller: "userEventsController"
    })
    .state('login', {
      url: '/login.html',
      templateUrl: "app/login/login.html",
      controller: "loginController"
    })
  $urlRouterProvider.otherwise('/search.html')
})