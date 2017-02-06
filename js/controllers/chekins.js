(function() {

myApp.controller('ChekinsController',
 ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray){

    var ref, chekinsList;

    // $scope.user = {
    //   firstName: 'test',
    //   lastName: 'test',
    //   email: 'test@test.com'
    // }

    $scope.order = "data";
    $scope.direction = 'reverse';
    $scope.query = '';

    $scope.recordId = '';

    $scope.whichMeeting = $routeParams.mId;
    $scope.whichUser = $routeParams.uId;

    ref = firebase.database().ref()
    .child('users').child($scope.whichUser).child('meetings').child($scope.whichMeeting)
    .child('chekins');

    chekinsList = $firebaseArray(ref);
    $scope.chekins = chekinsList;

    $scope.pickRandom = function() {
      var whichRecord = Math.round(Math.random() * (chekinsList.length -1 ));
      $scope.recordId = chekinsList.$keyAt(whichRecord);
      // console.log($scope.recordId);
    }
    $scope.resetRandom = function() {
      $scope.recordId = '';
    }

    $scope.showLove = function (myChekin) {
      myChekin.show = !myChekin.show; // cretes a toggle

      if (myChekin.userState == "expanded") {
        myChekin.userState = '';
      } else {
        myChekin.userState = 'expanded';
      }
    }

    $scope.giveLove = function(myChekin, giftText) {
      console.log(myChekin, giftText);
      var refLove = ref.child(myChekin.$id).child('awards');
      var chekinsArray = $firebaseArray(refLove);

      chekinsArray.$add({
        name: giftText,
        data: firebase.database.ServerValue.TIMESTAMP
      });
    }

    $scope.deleteLove = function(myChekin, key) {

      var refLove = ref.child(myChekin.$id).child('awards').child(key);
      var record = $firebaseObject(refLove);
      record.$remove(key);

    }

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
