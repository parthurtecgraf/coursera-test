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
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response.then(function (result, searchTerm) {
      // process result and only keep items that match
      var foundItems = result.data;
      if ((foundItems === undefined) ||
          (foundItems !== undefined) && (foundItems.menu_items.length !== 0)) {
        for(var i = 0; i < foundItems.menu_items.length ; i++) {
          // if the description does not contain the searchTerm, it is removed
          if (searchTerm !== undefined &&
            foundItems.menu_items[i].description.toLowerCase().indexOf(searchTerm) === -1) {
            foundItems.menu_items.splice(i, 1);
          }
        }
      }
      // return processed items
      return foundItems;
    });
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = "";

  list.narrowItDown = function() {
    list.found = MenuSearchService.getMatchedMenuItems(list.searchTerm);
  };

  list.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
}
})();
