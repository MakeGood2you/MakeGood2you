// module.exports = {
//     create, get, remove, set,
//     // db
// }
// const admin = require("firebase-admin");
//
// const serviceAccount = require("../../key/serviceAccountKey.json");
//
//
//
// const db = admin.database()
//
//
// async function create(entity, document) {
//     return db.ref(entity).push(document);
// }
//
// async function set(entity, document) {
//     return await db.ref(entity).set(document)
//
// }
//
// async function get(entity) {
//     const result = await db.ref(entity).once("value")
//     return result ? result : null
// }
//
// //
// async function remove(entity, id) {
//     await db.ref(`${entity}/${id}`).remove()
//     return {id}
// }
