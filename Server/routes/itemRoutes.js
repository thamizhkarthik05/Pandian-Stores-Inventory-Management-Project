const express = require('express');
const router = express.Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// GET all items
router.get('/', getItems);

// CREATE item
router.post('/', createItem);

// UPDATE item
router.put('/:id', updateItem);

// DELETE item
router.delete('/:id', deleteItem);

module.exports = router;
