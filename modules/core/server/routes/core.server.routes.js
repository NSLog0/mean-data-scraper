'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  var product = require('../controllers/product.server.controller');

  app.route('/api/v1/products')
    .get(product.list)
    .post(product.create);
  app.route('/api/v1/products/:productID')
    .put(product.update)
    .delete(product.remove);
  app.route('/t').get(product.t);

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

};
