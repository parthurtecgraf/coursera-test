(function () {
'use strict';

var buyList = [
  {
    name: "Milk",
    quantity: "10"
  },
  {
    name: "Donut",
    quantity: "20"
  },
  {
    name: "Cookie",
    quantity: "30"
  },
  {
    name: "Chocolate",
    quantity: "50"
  },
  {
    name: "Cake",
    quantity: "10"
  }
];

var boughtList = [];

angular.module('ShoppingList', [])
  .controller('ShoppingListController', ShoppingListController)
  .controller('BuyListController', BuyListController)
  .controller('BoughtListController', BoughtListController);

ShoppingListController.$inject = ['$scope'];
function ShoppingListController($scope) {
  $scope.buyList = buyList;
  $scope.boughtList = boughtList;
}

BuyListController.$inject = ['$scope'];
function BuyListController($scope) {
  $scope.buyItem = function (item) {
    $scope.boughtList.push(item);
    var boughtItemIndex = $scope.buyList.indexOf(item);
    $scope.buyList.splice(boughtItemIndex, 1);
    // console.log($scope.buyList.indexOf(item));
    if($scope.buyList.length == 0)
    {
      $scope.message = "Everything is bought!";
    }
    // Alterar a mensagem da segunda lista
  };
}

BoughtListController.$inject = ['$scope'];
function BoughtListController($scope) {
  // Colocar a mensagem aki
  if($scope.boughtList.length == 0)
  {
    $scope.message = "Nothing bought yet.";
  }
}

})();
