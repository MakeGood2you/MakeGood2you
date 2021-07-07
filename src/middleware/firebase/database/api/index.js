import firebaseInstance from '../../';

export default {
  create, get, remove, set,
  // db
}


const db = firebaseInstance.firebase.database()


async function create(entity, document) {
  return db.ref(entity).push(document);
}

async function set(entity, document) {
  debugger
  return await db.ref(entity).set(document)

}

async function get(entity) {
  const result = await db.ref(entity).once("value")
  debugger
  return result.val()
}

//
async function remove(entity, id) {
  await db.ref(`${entity}/${id}`).remove()
  return {id}
}
