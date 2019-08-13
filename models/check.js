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
 items: [],
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

module.exports = {
  getAllChecksByUserId,
  createCheck,
  getSingleCheck,
  updateCheck,
}
