const mongoose = require('./connection.js')

const CheckSchema = new mongoose.Schema({
 open: {
    type: Date,
    default: Date.now
 },
 close: {
    type: Date,
    default: Date.now
 },
 openCheck: {
   type: Boolean,
   default: false
 },
 menu: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}],
 userId: {
   type: mongoose.Types.ObjectId
 }
})

const CheckCollection = mongoose.model('Check', CheckSchema)

function getAllChecksByUserId(userId) {
  return CheckCollection.find({userId: userId})
}

function createCheck(checkObject) {
  return CheckCollection.create(checkObject)
}

function getSingleCheck(checkId) {
  return CheckCollection.findById(checkId)
}

function updateCheck(checkId, updatedCheck) {
  return CheckCollection.findByIdAndUpdate(checkId, updatedCheck)
}

function deleteCheck(checkId) {
  return CheckCollection.findByIdAndDelete(checkId)
}

module.exports = {
  getAllChecksByUserId,
  createCheck,
  getSingleCheck,
  updateCheck,
  deleteCheck
}
