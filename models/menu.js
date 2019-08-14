const mongoose = require('./connection.js')

const MenuSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  checkId: {
    type: mongoose.Types.ObjectId
  }
})

const MenuCollection = mongoose.model('Menu', MenuSchema)

function getAllMenuItems() {
  return MenuCollection.find()
}

function createMenuItem(menuObject) {
  return MenuCollection.create(menuObject)
}

function getSingleMenuItem(menuId) {
  return MenuCollection.findById(menuId)
}

function updateMenuItem(menuId, updatedMenu) {
  return MenuCollection.findByIdAndUpdate(menuId, updatedMenu)
}

function deleteMenuItem(menuId) {
  return MenuCollection.findByIdAndDelete(menuId)
}

function getAllMenuItemByCheckId(checkId) {
  return MenuCollection.find({checkId: checkId})
}

module.exports = {
  getAllMenuItems,
  createMenuItem,
  getSingleMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemByCheckId
}

