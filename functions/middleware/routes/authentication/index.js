'use strict';
const logic = require('./logic')
// const user = require('./user')
const express = require('express')
const router = express.Router({mergeParams:true})


// Get all todos
router.get('/',async (req, res, next) => {
  debugger
  try {
    const result = await logic.get()
    debugger
    return res.json(result)
  } catch (e) {
    return next(e)
  }
})


// // Create a new todo
router.post('/', async (req, res, next) => {
  debugger
  try {
    // console.log(req.body)
    console.log(req.body)
    debugger
    const result = await logic.createUser(req.body, req.body.uid)
    if (!result) return res.sendStatus(409)
    return res.status(201).json(result)
  } catch (e) {
    return next(e)
  }
})



router.use('/:id', require('./user'))
module.exports = router


// const functions = require('firebase-functions');
// const {authentication, firebase} = require('../../middleware/init')
// // exports.trigers = require('./triggers');
// exports.addMessage = functions.https.onCall(async (data, context) => {
//   // ...
//   console.log(data, ' data')
//
// });
//
//
// exports.res = functions.region("europe-west1").auth.user().onCreate((user) => {
//   console.log('world')
// })
// //
// //
// // const router = require('express-promise-router')({
// //         mergeParams: true
// //     }),
// //     logic = require('./logic');
// //
// //
// // router.get('/',
// //     (req, res) => {
// //         const result = logic.getItems();
// //         res.status(200).json({result});
// //     });
// //
// // router.post('/',
// //     (req, res) => {
// //         const item = logic.createItem(req.body.item);
// //         res.status(200).json({item});
// //     });
// //
// // router.use('/:itemId', require('./item'));
// //
// // module.exports = router;
