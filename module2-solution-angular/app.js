(function () {
'use strict';

angular.module('ShoppingList', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyList = [
      { name: "Milk", quantity: "10" },
      { name: "Donut", quantity: "20" },
      { name: "Cookie", quantity: "30" },
      { name: "Chocolate", quantity: "50" },
      { name: "Cake", quantity: "10" }
    ];

    var boughtList = [];

    service.getBuyList = function() {
      return toBuyList;
    };

    service.getBoughtList = function() {
      return boughtList;
    };

    service.buyItem = function(item)  {
      boughtList.push(item);
      var boughtItemIndex = toBuyList.indexOf(item);
      toBuyList.splice(boughtItemIndex, 1);
    };

  }


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.buyList = ShoppingListCheckOffService.getBuyList();
  console.log(toBuy.buyList);
  toBuy.isEmpty = function() {
    return toBuy.buyList.length == 0;
  };

  toBuy.buyItem = function (item) {
    return ShoppingListCheckOffService.buyItem(item);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.boughtList = ShoppingListCheckOffService.getBoughtList();
  console.log(alreadyBought.boughtList);
  alreadyBought.isEmpty = function() {
    return alreadyBought.boughtList.length == 0;
  };
}

})();
