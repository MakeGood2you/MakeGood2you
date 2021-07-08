'use strict'

const dataQueries = require('./data-queries.js');

module.exports = {
  get,
  createUser
}

async function get() {
  return await dataQueries.select();
}

async function createUser(user, uid) {
  return await dataQueries.createUser(user, uid);
}
