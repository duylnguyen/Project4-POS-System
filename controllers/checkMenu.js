const express = require('express')
const checkMenuApi = require('../models/menu.js')
const checkApi = require('../models/check.js')
const checkMenuRouter = express.Router({mergeParams: true})

checkMenuRouter.get('/', async (req, res) => {
    try {
        //const check = await checkApi.getSingleCheck(req.params.checkId)
    //   req.body.checkId = req.params.checkId
      const allItems = await checkMenuApi.getAllMenuItemByCheckId(req.params.checkId)
      res.json(allItems)
    } catch(err) {
      res.send(err)
    }
})

checkMenuRouter.post('/', async (req, res) => {
    try {
        const check = await checkApi.getSingleCheck(req.params.checkId)
        const newMenuItem = await checkMenuApi.createMenuItem(req.body)
        check.menu.push(newMenuItem)
        await check.save()
        res.json(newMenuItem)
    } catch(err) {
        res.send(err)
    }
})

module.exports = {
  checkMenuRouter
}