(function (window) { // pass a variable through the function then it works
// is there an alternaive for this, besides declaring the module
// outside the anonymous function?

 window.myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ngAnimate']);


 myApp.run(['$rootScope', '$location', function($rootScope, $location){
   $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
     if( error = 'AUTH_REQUIRED') {
       $rootScope.message = 'You must be loged in';
       $location.path('/login');
     }
   });
 }]);



// atach .config straight to module, then when routing divide
// controllers for views
// also user $routeProvider its a component of ngRoute
  myApp.config(['$routeProvider', function($routeProvider){

    $routeProvider
      .when( '/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController',
        resolve:{
          removeAuth: function(Authentication) {
            return Authentication.logout();
          }
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller:'RegistrationController',
        resolve:{
          removeAuth: function(Authentication) {
            return Authentication.logout();
          }
        }
      })
      .when('/logedin', {
        templateUrl: 'views/logedIn.html',
        controller: 'LogedInController',
        resolve: {
          currentAuth: function(Authentication) {
            return Authentication.requireAuth();
          }
        }
      })
      .when('/chekins/:uId/:mId',{
          templateUrl: 'views/chekins.html',
          controller: 'ChekinsController',
          // resolve: {
          //   currentAuth: function(Authentication) {
          //     return Authentication.requireAuth();
          //   }
          // }
      })
      .when('/chekins/:uId/:mId/chekinsList',{
          templateUrl: 'views/chekinsList.html',
          controller: 'ChekinsController'//,
          // resolve: {
          //   currentAuth: function(Authentication) {
          //     return Authentication.requireAuth();
          //   }
          // }
      })
      .otherwise({
        redirectTo: '/logedin'
      });
  }]);


})(window);
