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

        $scope.meetings = meetingsInfo;


        $scope.addMeeting = function() {
          meetingsInfo.$add({
            name: $scope.meetingName,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function(){
             $scope.meetingName = '';
          });
        };

        $scope.deleteMeeting = function(key) {
          meetingsInfo.$remove(key);
        }
      }
    });


}]);

})();
