const database = require('../../../middleware/database'),
    tableName = 'users'


module.exports = {
  getById, set
}

async function getById(id) {
    return await database.getById(tableName, id)
}
//
async function set(id, doc) {
    return await database.set(tableName, id, doc)
}
