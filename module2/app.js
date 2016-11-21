(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])

  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItems();

    toBuy.buyItem = function(item, itemIndex) {
      ShoppingListCheckOffService.buyItem(item, itemIndex);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
        { name: 'waffle mixes',
          quantity: 2 },
        { name: 'pancake mixes',
          quantity: 3 },
        { name: 'syrup',
          quantity: 1 },
        { name: 'bags of granola',
          quantity: 5 },
        { name: 'yogurts',
          quantity: 10 }
    ];

    var itemsAlreadyBought = [];

    service.buyItem = function(item, itemIndex) {
      itemsToBuy.splice(itemIndex, 1);
      itemsAlreadyBought.push(item);
      console.log(itemsToBuy);
    };

    service.getItems = function() {
      return itemsToBuy;
    };

    service.getBoughtItems = function() {
      return itemsAlreadyBought;
    }

  }


})();
