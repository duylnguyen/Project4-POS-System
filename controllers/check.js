const express = require('express')
const checkApi = require('../models/check.js')
const checkRouter = express.Router()

checkRouter.get('/', async (req, res) => {
  try {
    const user = await userApi.getSingleUser(req.params.userId)
    const allChecks = await checkApi.getAllChecksByUserId(user._id)
    res.json(allChecks)
  } catch(err) {
    res.send(err)
  }
})

module.exports = {
  checkRouter
}
