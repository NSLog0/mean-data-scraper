(function() {
  'use strict';

  angular.module('core.services').service('ProductService', ProductService);

  ProductService.$inject = ['$http', '$q'];

  function ProductService($http, $q) {
    this.create = function(data) {
      var defer = $q.defer();

      $http.post('/api/v1/products', data).then(success, error);

      function success(res) {
        defer.resolve(res);
      }

      function error(res) {
        defer.reject(res);
      }

      return defer.promise;

    };

    this.list = function(page, perPage) {
      var defer = $q.defer();
      $http.get('/api/v1/products').then(success, error);

      function success(res) {
        defer.resolve(res);
      }

      function error(res) {
        defer.reject(res);
      }

      return defer.promise;
    };

    this.update = function(id, item) {
      var defer = $q.defer();
      $http.put('/api/v1/products/'+id, item).then(success, error);

      function success(res) {
        defer.resolve(res);
      }

      function error(res) {
        defer.reject(res);
      }

      return defer.promise;
    };

    this.remove = function(id) {
      var defer = $q.defer();
      $http.delete('/api/v1/products/'+id).then(success, error);

      function success(res) {
        defer.resolve(res);
      }

      function error(res) {
        defer.reject(res);
      }

      return defer.promise;
    };
  }
})();
