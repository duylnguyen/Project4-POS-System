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
 items: []
})

const CheckCollection = mongoose.model('Check', CheckSchema)

function getAllChecksByUserId(userId) {
  return CheckCollection.find({userId: userId})
}

module.exports = {
  getAllChecksByUserId,
}
