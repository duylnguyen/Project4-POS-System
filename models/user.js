const mongoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
 userId: {
   type: String,
 },
 firstName: {
   type: String,
   required: true
 },
 lastName: {
   type: String,
   required: true
 },
 phone: {
   type: String,
   required: true
 }
})

const UserCollection = mongoose.model('User', UserSchema)

function getAllUsers() {
  return UserCollection.find()
}

function createNewUser(userObject) {
  return UserCollection.create(userObject)
}

function getSingleUser(userId) {
  return UserCollection.findById(userId)
}

function updateUser(userId, updatedUser) {
  return UserCollection.findByIdAndUpdate(userId, updatedUser)
}

function deleteUser(userId) {
  return UserCollection.findByIdAndDelete(userId)
}

module.exports = {
  getAllUsers,
  createNewUser,
  getSingleUser,
  updateUser,
  deleteUser
}
