(function (window) { // pass a variable through the function then it works
// is there an alternaive for this, besides declaring the module
// outside the anonymous function?

 window.myApp = angular.module('myApp', ['ngRoute']);

// atach .config straight to module, then when routing divide
// controllers for views
// also user $routeProvider its a component of ngRoute
  myApp.config(['$routeProvider', function($routeProvider){

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
        templateUrl: 'views/logedin.html',
        controller: 'LogedInController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);


})(window);
