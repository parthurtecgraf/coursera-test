(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

// 'categories' is injected through state's resolve
CategoriesController.$inject = ['categories']
function CategoriesController(categories) {
  var categoriesCtrl = this;
  categoriesCtrl.categories = categories;
}

})();
