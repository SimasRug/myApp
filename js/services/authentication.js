(function() {
  myApp.factory('Authentication', ['$rootScope', '$firebase', '$firebaseAuth', function ($rootScope, $firebase, $firebaseAuth) {

    var ref = firebase.database().ref(); // refrence to the database
    var auth = $firebaseAuth(); // used for authentication

    return {
      login: function (user) {
        $rootScope.message = 'Welcome ' + user.email;
      },

      register: function(user) {
        auth.$createUserWithEmailAndPassword(
          // passing values got from the input fields
          user.email,
          user.password
        ).then(function(regUser) {
          // calls a promisse in a success case
          $rootScope.message = user.firstName + ', thanks for registering';
        }).catch(function(error) {
          // for catching errors
          $rootScope.message = error.message;
        });
      }

    };

  }]);
})();
