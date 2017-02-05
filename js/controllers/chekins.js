(function() {

myApp.controller('ChekinsController',
 ['$scope', '$rootScope', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope,$routeParams, $firebaseObject, $firebaseArray){

    var ref;

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;

    ref = firebase.database().ref()
    .child('users').child($scope.whichUser).child('meetings').child($scope.whichMeeting)
    .child('chekins');

    $scope.addCheckin = function() {
      $firebaseArray(ref).$add({
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        email: $scope.user.email,
        data: firebase.database.ServerValue.TIMESTAMP
      });
      console.log('added');
    }


  }]);
})();
