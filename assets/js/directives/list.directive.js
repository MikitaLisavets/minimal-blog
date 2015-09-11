(function() {
    'use strict';
    angular
        .module('blog')
        .directive('list', list);
    list.$inject = [];
    /* @ngInject */
    function list() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: MainController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        function link(scope, element, attrs) {
          element.on('click', function () {
            var parent = element.parent(),
                activeClass = attrs.class.slice(0, attrs.class.lastIndexOf('-')) + '_active';
            if (parent.hasClass(activeClass)) {
              parent.removeClass(activeClass);
            } else {
              parent.addClass(activeClass);
            }
          })
        }
    }
    /* @ngInject */
    function MainController() {
    }
})();