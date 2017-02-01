(function () {

var myApp = angular.module('myApp', ['ngRoute'])

// atach .config straight to module, then when routing divide
// controllers for views
// also user $routeProvider its a component of ngRoute
  .config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when( '/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller:'RegistrationController'
      })
      .when('/logedin', {
        templateUrl: 'views/logedin',
        controller: 'LogedInCotroller'
      })
      .otherwise({
        redirectTo: 'login'
      });
  }]);


})();
