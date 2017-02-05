(function () {

myApp.controller('LogedInController',
  ['$scope','$rootScope', '$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray){

    var ref = firebase.database().ref(); // refrence to the database
    var auth = $firebaseAuth(); // used for authentication



    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
        var meetingsInfo = $firebaseArray(meetingsRef);

        $scope.meetings = meetingsInfo;

        meetingsInfo.$loaded().then( function(data) {
          $rootScope.howManyMeetings = meetingsInfo.length;
        });

        meetingsInfo.$watch(function(data) {
          $rootScope.howManyMeetings = meetingsInfo.length;
        });


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
