(function() {

myApp.controller('ChekinsController',
 ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray){

    var ref, chekinsList;

    $scope.user = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com'
    }

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;

    ref = firebase.database().ref()
    .child('users').child($scope.whichUser).child('meetings').child($scope.whichMeeting)
    .child('chekins');

    chekinsList = $firebaseArray(ref);
    $scope.chekins = chekinsList;

    $scope.addCheckin = function() {
      $firebaseArray(ref).$add({
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName,
        email: $scope.user.email,
        data: firebase.database.ServerValue.TIMESTAMP
      }).then(function(){
        // console.log('/#!/chekins/'+ $scope.whichUser +'/'+ $scope.whichMeeting +'/chekinsList');
        $location.path('/chekins/'+ $scope.whichUser +'/'+ $scope.whichMeeting +'/chekinsList');
      });
      // console.log('added');
    }

    $scope.deleteChekin = function(id) {
      var delRef = ref.child(id);
      var record  = $firebaseObject(delRef);
      record.$remove(id);
      //console.log(record);

    }


  }]);
})();
