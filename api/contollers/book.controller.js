'use strict';

var db = require('../config/db.config'),
    slug = require('slug');


// TODO, XXX: Sanitize and validate input before hitting the DB.

exports.list = (request, response) => {
  db('book').select('*')
    .then(function(rows) {
      response.json(rows);
    }).catch(function(err) {
      response.status(400);
      response.send(err);
    });
};

exports.create = (request, response) => {
  if (!request.body.slug) {
    request.body.slug = slug(request.body.title);
  }
  db('book').insert(request.body)
    .returning('*')
    .then(function(rows) {
      response.json(rows[0]);
    })
    .catch(function(err) {
      response.status(400);
      response.send(err);
    });
};

exports.read = (request, response) => {
  db('book').select('*')
    .where({'slug': request.params.slug})
    .then(function(rows) {
      if (!rows.length) {
        response.status(404);
        response.json({});
      } else {
        response.json(rows[0]);
      }
    })
    .catch(function(err) {
      response.status(400);
      response.send(err);
    });
};

exports.update = (request, response) => {
  request.body.updated_at = db.fn.now();
  db('book').update(request.body)
    .where({'slug': request.params.slug})
    .returning('*')
    .then(function(rows) {
      if (!rows.length) {
        response.status(404);
        response.json({});
      } else {
        response.json(rows[0]);
      }
    })
    .catch(function(err) {
      response.status(400);
      response.send(err);
    });
};

exports.delete = (request, response) => {
  db('book').delete()
    .where({'slug': request.params.slug})
    .returning('*')
    .then(function(rows) {
      if (!rows.length) {
        response.status(404);
        response.json({});
      } else {
        response.json(rows[0]);
      }
    })
    .catch(function(err) {
      response.status(400);
      response.send(err);
    });
};
