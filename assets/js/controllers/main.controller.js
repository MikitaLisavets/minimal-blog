(function() {
    'use strict';
    angular
        .module('blog')
        .controller('MainController', MainController);
    MainController.$inject = ['postsService', '$state'];
    /* @ngInject */
    function MainController(postsService, $state) {
        var vm = this;
        vm.loaded = false;
        vm.currentUrl = $state.params.postPath;
        vm.postsList = {};
        activate();
        ////////////////

        function activate() {
          postsService.getPosts().then(function (response) {
            parseDate(response.data);
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
          if (!vm.currentUrl) {
            showFirstPost()
          }
        }

        function showFirstPost() {
          var lastYear,
              lastMonth,
              lastPost;

          for (var item in vm.postsList) {
            if (!lastYear) lastYear = item;
            if ( +item > +lastYear ) lastYear = item;
          }

          for (var item in vm.postsList[lastYear]) {
            if (!lastMonth) lastMonth = item;
            if ( +item > +lastMonth ) lastMonth = item;
          }

          lastPost = vm.postsList[lastYear][lastMonth]
          $state.go('post', {postPath: lastPost[lastPost.length - 1].path})
        }
    }
})();