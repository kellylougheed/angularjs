(function() {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunchMenu = "";
    $scope.message = "";
    $scope.color = "";

    $scope.checkLunch = function(str) {
      if (str === "") {
        $scope.color = "red";
        $scope.message = "Please enter data first";
      } else {
        $scope.color = "green";
        var arr = str.split(",");
        if (arr.length <= 3) {
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much!";
        }
      }
    }

  }

})();
