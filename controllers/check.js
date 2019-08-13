const express = require('express')
const checkApi = require('../models/check.js')
const userApi = require('../models/user.js')
const checkRouter = express.Router({mergeParams: true})

checkRouter.get('/', async (req, res) => {
  try {
    const user = await userApi.getSingleUser(req.params.userId)
    const allChecks = await checkApi.getAllChecksByUserId(user._id)
    res.json(allChecks)
  } catch(err) {
    res.send(err)
  }
})

// checkRouter.get('/', (req, res) => {
//   userApi.getSingleUser(req.params.userId)
//     .then((user) => {
//       checkApi.getAllChecksByUserId(user._id)
//         .then((checks) => {
//           res.json(checks)
//         })
//     })
//     .catch((err) => {
//       res.send(err)
//     })
// })

checkRouter.post('/', async (req, res) => {
  try {
    req.body.userId = req.params.userId
    const newCheck = await checkApi.createCheck(req.body)
    res.json(newCheck)
  } catch(err) {
    res.send(err)
  }
})

// checkRouter.post('/', (req, res) => {
//     req.body.userId = req.params.userId
//     checkApi.createCheck(req.body)
//       .then((check) => {
//         res.json(check)
//       })
//       .catch((err) => {
//         res.send(err)
//       })
// })

checkRouter.get('/:checkId', async (req, res) => {
  try {
    await userApi.getSingleUser(req.params.userId)
    const singleCheck = await checkApi.getSingleCheck(req.params.checkId)
    res.json(singleCheck)
  } catch(err) {
    res.send(err)
  }  
})

checkRouter.put('/:checkId', async (req, res) => {
  try {
    req.body.userId = req.params.userId
    const updatedCheck = await checkApi.updateCheck(req.params.checkId, req.body)
    res.json(updatedCheck)
  } catch(err) {
    res.send(err)
  }
})

checkRouter.delete('/:checkId', async (req, res) => {
  try {
    req.body.userId = req.params.userId
    await checkApi.deleteCheck(req.params.checkId)
    res.json('Check Deleted')
  } catch(err) {
    res.send(err)
  }
 })

module.exports = {
  checkRouter
}
