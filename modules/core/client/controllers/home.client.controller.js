(function() {
  'use strict';

  angular.module('core').controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'ProductService', 'productListResolve', 'ngNotify'];

  function HomeController($scope, ProductService, productListResolve, ngNotify) {
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

      ProductService.create(params).then(function(res) {
        if (res.status === 200) { 
          ngNotify.set('Product has been created. reloading!!!',{ type: 'success' });
          return ProductService.list();
        } else { 
          ngNotify.set('error, missing data', { type: 'error' });
        }
      }).then(function(res){
        vm.list = res.data;
      });
    }

    function product_update(item) {
      ProductService.update(item._id, item).then(function(res) {
        if (res.status === 200) { 
          ngNotify.set('Product has been created. reloading!!!',{ type: 'success' });
          return ProductService.list();
        } else { 
          ngNotify.set('error, missing data', { type: 'error' });
        }
      }).then(function(res){
        vm.list = res.data;
      });
    }

    function product_delete(id) {
      ProductService.remove(id).then(function(res) {
        if (res.status === 200) { 
          ngNotify.set('Product has been deleted. reloading!!!',{ type: 'success' });
          return ProductService.list();
        } else { 
          ngNotify.set('error, missing data', { type: 'error' });
        }
      }).then(function(res){
        vm.list = res.data;
      });
    }
  }
})();
