(function() {
  'use strict';

  angular.module('core').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'ProductService', 'productListResolve', 'ngNotify'];

  function HomeController($scope, ProductService, productListResolve, ngNotify) {
    var vm = this;
    vm.form = {};
    vm.product_create = product_create;
    vm.product_update = product_update;
    vm.product_delete = product_delete;
    vm.list = productListResolve.data;
    vm.disableBtn = false;

    function product_create() {
      vm.disableBtn = true;
      ProductService.create(vm.form).then(function(res) {
        if (res.status === 200) {
          ngNotify.set('Product has been created. reloading!!!',{ type: 'success' });
        } else {
          ngNotify.set('error, missing data', { type: 'error' });
        }
        return ProductService.list();
      }).then(function(res){
        vm.list = res.data;
        vm.disableBtn = false;
      });
    }

    function product_update(item) {
      vm.disableBtn = true;
      ProductService.update(item._id, item).then(function(res) {
        if (res.status === 200) {
          ngNotify.set('Product has been created. reloading!!!',{ type: 'success' });
        } else {
          ngNotify.set('error, missing data', { type: 'error' });
        }
        return ProductService.list();
      }).then(function(res){
        vm.list = res.data;
        vm.disableBtn = false;
      });
    }

    function product_delete(id) {
      vm.disableBtn = true;
      ProductService.remove(id).then(function(res) {
        if (res.status === 200) {
          ngNotify.set('Product has been deleted. reloading!!!',{ type: 'success' });
        } else {
          ngNotify.set('error, missing data', { type: 'error' });
        }
        return ProductService.list();
      }).then(function(res){
        vm.list = res.data;
        vm.disableBtn = false;
      });
    }
  }
})();
