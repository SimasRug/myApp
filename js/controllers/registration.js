(function(){
myApp.controller('RegistrationController', ['$scope', function($scope) {
 $scope.user = { firstName:'bob', lastName: 'bobson', email: 'example@mail.com', password:'pass', };

  $scope.login = function() {
    $scope.message = 'Welcome';
  };

  $scope.register = function () {
    $scope.message = 'Welcome registered'
  };

}]);
})();
