(function(){
myApp.controller('RegistrationController',
 ['$scope', '$firebase', '$firebaseAuth', function($scope, $firebase, $firebaseAuth) {

  // $scope.user = { firstName:'bob', lastName: 'bobson', email: 'example@mail.com', password:'test123', };

 var ref = firebase.database().ref(); // refrence to the database
 var auth = $firebaseAuth(); // used for authentication


  $scope.login = function() {
    $scope.message = 'Welcome';
  };

  $scope.register = function() {

    auth.$createUserWithEmailAndPassword(
      // passing values got from the input fields
      $scope.user.email,
      $scope.user.password
    ).then(function(regUser) {
      // calls a promisse in a success case
      $scope.message = $scope.user.firstName + ', thanks for registering';
    }).catch(function(error) {
      // for catching errors
      $scope.message = error.message;
    });

  };

}]);
})();
