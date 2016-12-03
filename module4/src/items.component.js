(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
