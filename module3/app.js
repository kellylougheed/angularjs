(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])

  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'list.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'controller',
      bindToController: true
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService', '$http'];
  function NarrowItDownController(MenuSearchService, $http) {
    var controller = this;

    controller.searchTerm = MenuSearchService.getSearchTerm();

    controller.foundItems = MenuSearchService.getFoundItems();

    controller.errorMessage = MenuSearchService.getErrorMessage();

    controller.search = function(searchTerm) {
      MenuSearchService.getMatchedMenuItems(searchTerm);
    };

    controller.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    };

  }

  function MenuSearchService($http) {
    var service = this;

    var searchTerm = "";

    var foundItems = [];

    var errorMessage = "";

    service.getSearchTerm = function() {
      return searchTerm;
    };

    service.getFoundItems = function() {
      return foundItems;
    }

    service.getErrorMessage = function() {
      return errorMessage;
    }

    service.removeItem = function(itemIndex) {
      console.log(itemIndex);
      foundItems.splice(itemIndex, 1);
    };

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function (result) {
          foundItems = [];
          var menu = result.data.menu_items;
          for (var i = 0; i < result.data.menu_items.length; i++) {
            if (menu[i].description.includes(searchTerm) || menu[i].name.includes(searchTerm)) {
              foundItems.push(menu[i]);
            }
          }
          console.log(foundItems);
          if (foundItems.length === 0) {
            errorMessage = "Nothing found.";
          } else {
            errorMessage = "";
          }
          return foundItems;
      });
    };

    
  }


})();
