const express = require('express')
const userApi = require('../models/user.js')
const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  try {
    const allUsers = await userApi.getAllUsers()
    res.json(allUsers)
  } catch(err) {
    res.send(err)
  }
})

userRouter.post('/', async (req, res) => {
  try {
    const newUser = await userApi.createNewUser(req.body)
    res.json(newUser)
  } catch(err) {
    res.send(err)
  }
})

userRouter.get('/:userId', async (req, res) => {
  try {
    const singleUser = await userApi.getSingleUser(req.params.userId)
    res.json(singleUser)
  } catch(err) {
    res.send(err)
  }
})

userRouter.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await userApi.updateUser(req.params.userId, req.body)
    res.json(updatedUser)
  } catch(err) {
    res.send(err)
  }
})

module.exports = {
  userRouter
}
