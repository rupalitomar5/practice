'use strict';

module.exports = function(app) {
    var categories=require('../../server/controllers/core.server.controller');
    app.route('/categories')
        .get(categories.list)
        .post(categories.create);


    app.route('/categories/:categoryId')
        .get(categories.read);
  // Routing logic   
  // ...
};
