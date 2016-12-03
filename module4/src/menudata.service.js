(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json"
        }).then(function (result) {
          var categories = [];
          var menu = result.data;
          for (var i = 0; i < menu.length; i++) {
            categories.push({
              "short_name": menu[i].short_name,
              "name": menu[i].name
            })
          }
          console.log("categories: ", categories);
          return categories;
      });
  };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
        params: {category: categoryShortName}
        }).then(function (result) {
          console.log("items: ", result.data);
          return result.data;
      });
  };
}

})();
