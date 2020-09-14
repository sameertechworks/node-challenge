'use strict';

module.exports = (app) => {
  var handlers = require('../contollers/book.controller');
  const middleware = require('../validations/middleware');
  const schema = require('../validations/schema');

  app.route('/books')
    .get(handlers.list)
    .post(middleware(schema.bookCreate, 'body'), handlers.create);
  app.route('/book/:slug')
    .get(handlers.read)
    .put(middleware(schema.bookUpdate, 'body'), handlers.update)
    .delete(middleware(schema.bookDelete, 'params'), handlers.delete);
};
