(function() {
    'use strict';
    angular
        .module('blog')
        .filter('month', month);
    function month() {
        return monthFilter;
        ////////////////
        function monthFilter(items) {
          
          var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          return months[items];
      }
    }
})();