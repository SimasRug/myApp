(function() {
  myApp.factory('Authentication', ['$rootScope','$location', '$firebaseAuth', function ($rootScope, $location, $firebaseAuth) {

    var ref = firebase.database().ref(); // refrence to the database
    var auth = $firebaseAuth(); // used for authentication

    return {
      login: function (user) {
        auth.$signInWithEmailAndPassword(user.email, user.password)
          .then(function(user) {
            // $rootScope.message = 'Seccesfull login';
            $location.path('/logedin');
          })
          .catch(function (error) {
            $rootScope.message = error.message;
          });
      },

      register: function(user) {
        auth.$createUserWithEmailAndPassword(
          // passing values got from the input fields
          user.email,
          user.password
        ).then(function(regUser) {
          // calls a promisse in a success case
          var regRef = ref.child('users') // this is used for basiclly adding more info about the user to the DB for certain uses in the app
          .child(regUser.uid).set({ // the value in child can be anythig from the user object its personal prefrence
            date: firebase.database.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
            //this data is passed through controller then passed in the function above thats how it gets here
          });

          $rootScope.message = user.firstName + ', thanks for registering';
        }).catch(function(error) {
          // for catching errors
          $rootScope.message = error.message;
        });
      }

    };

  }]);
})();
