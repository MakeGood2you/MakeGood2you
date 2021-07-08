const database = require('../../middleware/database'),
    collection = 'users'


module.exports = {
    select, createUser
}

async function select() {
    return await database.selectCollection(collection)
}
async function createUser(user ,uid) {
    return await database.set(collection, uid, user)
}
