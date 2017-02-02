(function(){
myApp.controller('RegistrationController',
 ['$scope', 'Authentication', function($scope, Authentication) {

  $scope.user = { firstName:'bob', lastName: 'bobson', email: 'example@mail.com', password:'test123', };




  $scope.login = function() {
    Authentication.login($scope.user);
  };

  $scope.register = function() {
    Authentication.register($scope.user);
  };

}]);
})();
