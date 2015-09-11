(function() {
    'use strict';
    angular
        .module('blog')
        .factory('postsService', postsService);
    postsService.$inject = ['$http'];
    /* @ngInject */
    function postsService($http) {
      var service = {
          getPosts: getPosts
      };
      return service;
      ////////////////
      function getPosts() {
        var req = {
          method: 'GET',
          url: 'assets/json/data.json',
          cache: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
        return $http(req);
      }
    }
})();