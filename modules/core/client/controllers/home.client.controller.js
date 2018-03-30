(function() {
  'use strict';

  angular.module('core').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'ProductService', 'productListResolve'];

  function HomeController($scope, ProductService, productListResolve) {
    var vm = this;

    vm.product_create = product_create;
    vm.product_update = product_update;
    vm.product_delete = product_delete;
    vm.list = productListResolve.data;

    function product_create() {
      var params = {
        url: vm.url,
        name: vm.name,
        amount: vm.amount
      };

      ProductService.create(params);
    }

    function product_update() {
      alert('update');
    }

    function product_delete(id) {
      console.log(id);
    }
  }
})();
