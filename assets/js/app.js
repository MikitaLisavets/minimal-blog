(function() {
  'use strict';
  angular
      .module('blog', ['ui.router'])
      .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('post', {
            url: "/:postPath",
            controller: 'MainController',
            templateUrl: function ($stateParams){
              if( $stateParams.postPath.length ) {
                return 'posts/html/' + $stateParams.postPath + '.html';
              }
            }
          });
      });
})();