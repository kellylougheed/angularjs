(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as cats',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categoryDetail', {
    url: '/category-detail/{categoryId}',
    templateUrl: 'src/templates/category-detail.template.html',
    controller: 'CategoryDetailController as detail',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getAllCategories()
        .then(function(categories) {
          var cat = categories[$stateParams.categoryId].short_name;
          console.log("cat: ", cat);
          return MenuDataService.getItemsForCategory(cat);
        })
      }],
    }
  });
}

})();
