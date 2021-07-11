'use strict';
const logic = require('./logic')
const express = require('express')
const router = express.Router({mergeParams: true})

// Get all todos
// router.get('/', async (req, res, next) => {
//   try {
//     debugger
//     const result = await logic.getById(req.params.id)
//     return res.json(result)
//   } catch (e) {
//     return next(e)
//   }
// })
router.get('/', async (req, res, next) => {
  try {
    debugger
    const result = await logic.getById(req.params.id)
    if (!result) return res.sendStatus(404)
    return res.json(result)
  } catch (e) {
    return next(e)
  }
})
//
// // Get one todo
// router.get('/:id', async (req, res, next) => {
//   try {
//     const result = await todosModel.getById(req.params.id)
//     if (!result) return res.sendStatus(404)
//     return res.json(result)
//   } catch (e) {
//     return next(e)
//   }
// })

// // Create a new todo
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await logic.set({data: req.body, id: req.params.id})
    if (!result) return res.sendStatus(409)
    return res.status(201).json(result)
  } catch (e) {
    return next(e)
  }
})

// Delete a todo
router.delete('/', async (req, res, next) => {
  try {
    const result = await logic.delete(req.params.id)
    if (!result) return res.sendStatus(404)
    return res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
})

// Update a todo
router.patch('/', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body


    const doc = await logic.getById(id)
    if (!doc) return res.sendStatus(404)
    // Merge existing fields with the ones to be updated
    Object.keys(data).forEach((key) => doc[key] = data[key])

    const updateResult = await logic.update(id, doc)
    if (!updateResult) return res.sendStatus(404)

    return res.json(doc)
  } catch (e) {
    return next(e)
  }
})

// Replace a todo
router.put('/', async (req, res, next) => {
  try {
    const updateResult = await logic.update(req.params.id, req.body)
    if (!updateResult) return res.sendStatus(404)

    const result = await logic.getById(req.params.id)
    return res.json(result)

  } catch (e) {
    return next(e)
  }
})


module.exports = router
