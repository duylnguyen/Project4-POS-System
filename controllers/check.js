const express = require('express')
const checkApi = require('../models/check.js')
const checkRouter = express.Router()

checkRouter.get('/', async (req, res) => {
  try {
    const allChecks = await axios.get('/api/user/')
  }
})

module.exports = {
  checkRouter
}
