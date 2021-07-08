'use strict'

const dataQueries = require('./data-queries.js');

module.exports = {
  getById,
  set
}

async function getById(id) {
  return await dataQueries.getById(id);
}

async function set(id, doc) { //
  return await dataQueries.set(id, doc);
}
