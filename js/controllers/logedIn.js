(function () {

myApp.controller('LogedInController',
  ['$scope', '$firebaseAuth', '$firebaseArray',
  function($scope, $firebaseAuth, $firebaseArray){

    var ref = firebase.database().ref(); // refrence to the database
    var auth = $firebaseAuth(); // used for authentication



    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
        var meetingsInfo = $firebaseArray(meetingsRef);
        console.log(meetingsInfo);
        console.log(authUser.uid);
        $scope.addMeeting = function() {
          console.log('a');
          meetingsInfo.$add({
            name: $scope.meetingName,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function(){
             $scope.meetingName = '';
          });
        };
      }
    });


}]);

})();
