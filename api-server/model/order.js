const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    item: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, default: '배송' },
    orderName: { type: String, required: true },
    orderCallNumber: { type: String, required: true },
    recipient: { type: String },
    recipientAddress: { type: String },
    etc: { type: String, default: '' },
    status: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

orderSchema.statics.findAllByDate = async function(date) {
  return await this.find({ date: date });
};

orderSchema.statics.delete = async function(id) {
  return await this.remove({ _id: id });
};

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
