(function() {
    'use strict';
    angular
        .module('blog')
        .controller('MainController', MainController);
    MainController.$inject = ['postsService', '$state', '$rootScope', '$timeout'];
    /* @ngInject */
    function MainController(postsService, $state, $rootScope, $timeout) {
        var vm = this;
        vm.loaded = false;
        vm.postsList = {};
        activate();
        ////////////////

        function activate() {
          postsService.getPosts().then(function (response) {
            parseDate(response.data);
          });
          $rootScope.$on('$stateChangeSuccess', function() {
             document.body.scrollTop = document.documentElement.scrollTop = 0;
          });
        }

        function parseDate(data) {
          for (var i = data.length - 1; i >= 0; i--) {
            if ( !vm.postsList[data[i].year]) {
              vm.postsList[data[i].year] = {}
            }
            if ( !vm.postsList[data[i].year][data[i].month]) {
              vm.postsList[data[i].year][data[i].month] = []
            }
            vm.postsList[data[i].year][data[i].month].push(data[i]);
          }
          vm.loaded = true;
          $timeout(function() {
            vm.currentUrl = $state.params.postPath;
            if (!vm.currentUrl) {
              showFirstPost();
            }
          }, 0);
        }

        function showFirstPost() {
          var lastYear,
              lastMonth,
              lastPosts,
              post;

          for (var item in vm.postsList) {
            if (!lastYear) lastYear = item;
            if ( +item > +lastYear ) lastYear = item;
          }

          for (var item in vm.postsList[lastYear]) {
            if (!lastMonth) lastMonth = item;
            if ( +item > +lastMonth ) lastMonth = item;
          }

          lastPosts = vm.postsList[lastYear][lastMonth]

          lastPosts.forEach(function(elem) {
            if (!post) post = elem;
            if (elem.day >= post.day) {
              post = elem
            }
          })

          $state.go('post', {postPath: post.path})
        }
    }
})();
