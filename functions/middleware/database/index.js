module.exports = {
    create, get, remove, set,
    // db
}
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://osher-project-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database()


async function create(entity, document) {
    return db.ref(entity).push(document);
}

async function set(entity, document) {
    return await db.ref(entity).set(document)

}

async function get(entity) {
    const result = await db.ref(entity).once("value")
    return result.val()
}

//
async function remove(entity, id) {
    await db.ref(`${entity}/${id}`).remove()
    return {id}
}
