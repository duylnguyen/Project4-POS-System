const express = require('express')
const menuApi = require('../models/menu.js')
const checkApi = require('../models/check.js')
const menuRouter = express.Router({mergeParams: true})

menuRouter.get('/', async (req, res) => {
  try {
    const check = await checkApi.getSingleCheck(req.params.checkId)
    const allMenuItems = await menuApi.getAllMenuItems(req.params.menuId)
    res.json(allMenuItems)
  } catch(err) {
    res.send(err)
  }
})

menuRouter.post('/', async (req, res) => {
  try {
    const allMenuItems = await menuApi.createMenuItem(req.body)
    res.json(allMenuItems)
  } catch(err) {
    res.send(err)
  }
})

menuRouter.get('/:menuId', async (req, res) => {
  try {
    const singleMenuItem = await menuApi.getSingleMenuItem(req.params.menuId)
    res.json(singleMenuItem)
  } catch(err) {
    res.send(err)
  }
})

menuRouter.put('/:menuId', async (req, res) => {
  try {
    const updatedMenuItem = await menuApi.updateMenuItem(req.params.menuId, req.body)
    res.json(updatedMenuItem)
  } catch(err) {
    res.send(err)
  }
})

menuRouter.delete('/:menuId', async (req, res) => {
  try {
    await menuApi.deleteMenuItem(req.params.menuId)
    res.json('Item Deleted')
  } catch(err) {
    res.send(err)
  }
})

module.exports = {
  menuRouter
}
