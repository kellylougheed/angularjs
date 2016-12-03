(function () {
'use strict';

angular.module('data')
.controller('CategoryDetailController', CategoryDetailController);

CategoryDetailController.$inject = ['items', '$stateParams'];
function CategoryDetailController(items, $stateParams) {
  var detail = this;
  detail.items = items.menu_items;
  detail.cat = items.category.name;
}

})();
