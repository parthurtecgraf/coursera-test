(function () {
'use strict';

angular.module('LunchCheck', [])
  .controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];
function LunchController($scope) {
  $scope.dishes = "";
  $scope.message = "";

  $scope.checkDishes = function () {
    if($scope.dishes == "")
    {
      $scope.message = "Please enter data first.";
      console.log("Dishes: " + $scope.dishes);
      console.log("Message: " + $scope.message);
      return;
    }
    var arrayOfDishes = $scope.dishes.split(',');
    if(arrayOfDishes.length <= 3)  {
      $scope.message = "Enjoy!";
    }
    else {
      $scope.message = "Too much!";
    }
    console.log(arrayOfDishes);
    console.log("Message: " + $scope.message);
  };
}

})();
