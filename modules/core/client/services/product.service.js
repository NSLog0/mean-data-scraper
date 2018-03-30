(function() {
  'use strict';

  angular.module('core.services').service('ProductService', ProductService);

  ProductService.$inject = ['$http'];

  function ProductService($http) {
    this.create = function(data) {
      $http.post('/api/v1/products', data).then(success, error);

      function success(res) {
        return res;
      }

      function error(res) {
        return res;
      }
    };
    this.remove = function() {};
    this.list = function(page, perPage) {
      $http.get('/api/v1/products').then(success, error);

      function success(res) {
        return res.data;
      }

      function error(res) {
        return res;
      }
    };
    this.find = function(id) {};
  }
})();
