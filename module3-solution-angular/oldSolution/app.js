(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController ', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems ', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    // templateUrl: 'foundItems.html',
    scope: {
      found-items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService() {
  var service = this;
  service.getMatchedMenuItems = function (searchTerm) {
    //   var response = $http({
    //     method: "GET",
    //     url: (ApiBasePath + "/menu_items.json")
    //   });
    //   return response.then(function (result, searchTerm) {
    //     // process result and only keep items that match
    //     var foundItems = result.data;
    //     console.log(foundItems);
    //     // return processed items
    //     return foundItems;
    //   });
    console.log("MenuSearchService.getMatchedMenuItems: " + searchTerm);
    return searchTerm;
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;
  narrowItDown.title = "NarrowedDownList"
  narrowItDown.searchTerm = "";
  narrowItDown.foundItems = MenuSearchService.getMatchedMenuItems(searchTerm);
  console.log(narrowItDown.foundItems);
}

})();
