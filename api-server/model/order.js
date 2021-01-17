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

orderSchema.statics.createOrder = async function(data) {
  if (data.type === '배송') {
    data.time = '배송';
  }
  data.status = '준비';
  return await this.create(data);
};

orderSchema.statics.findAllByDate = async function(date) {
  return await this.find({ date: date });
};

orderSchema.statics.delete = async function(id) {
  return await this.remove({ _id: id });
};

orderSchema.statics.updateOrder = async function(id, data) {
  return await this.updateOne(
    { _id: id },
    {
      $set: {
        type: data.type,
        item: data.item,
        date: data.date,
        time: data.time,
        orderName: data.orderName,
        orderCallNumber: data.orderCallNumber,
        recipient: data.recipient,
        recipientAddress: data.recipientAddress,
        etc: data.etc,
        status: data.status
      }
    }
  );
};

orderSchema.statics.changeStatus = async function(id, status) {
  return await this.updateOne({ _id: id }, { $set: { status: status } });
};

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;
