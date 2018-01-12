(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      var items = result.data.menu_items;

      var foundItems = [];
      if(searchTerm !== undefined) {
        for(var i = 0; i < items.length ; i++) {
          // if the description does not contain the searchTerm, it is not added
          if(items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(items[i]);
          }
        }
      }
      console.log(foundItems);
      // return processed items
      return foundItems;
    });
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.narrowItDown = function() {
    if(controller.searchTerm === "")  {
      controller.items = [];
      return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
    promise.then(function(response) {
      controller.items = response;
    })
    .catch(function(error) {
      console.log("Promise Error", error);
    })
  };

  controller.removeItem = function (itemIndex) {
    controller.items.splice(itemIndex, 1);
  };
}
})();
