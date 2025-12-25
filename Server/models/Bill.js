const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  name: String,
  price: Number,
  quantity: Number,
  category: String, 
  total: Number,
});

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [billItemSchema],
    paymentMethod: {
      type: String,
      enum: ['Cash', 'UPI', 'Card','Net Banking'],
      required: true,
    },
    customerEmail: String,

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model('Bill', billSchema);
