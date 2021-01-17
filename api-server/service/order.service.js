const mongoose = require('mongoose');
var Order = require('../model/order');

const findOrders = async (date, status, type) => {
  orders = await Order.findAllByDate(date)
    .then(foundOrders => {
      return foundOrders;
    })
    .catch(err => console.log(err));

  if (status !== undefined) {
    orders = orders.filter(order => order.status.includes(status));
  }
  if (type !== undefined) {
    orders = orders.filter(order => order.type === type);
  }

  try {
    return orders;
  } catch (error) {
    throw Error(error.message);
  }
};

const findOrderById = async id => {
  try {
    return Order.findById({ _id: id }, function(error, order) {
      console.log('--- Read one ---');
      if (error) {
        console.log(error);
      } else {
        console.log(order);
      }
    });
  } catch (error) {
    throw Error(error.message);
  }
};

const createOrder = async data => {
  const type = data.type;
  const item = data.item;
  const date = data.date;
  const orderName = data.orderName;
  const orderCallNumber = data.orderCallNumber;
  const recipient = data.recipient;
  const recipientAddress = data.recipientAddress;
  const etc = data.etc;
  const status = '준비';

  try {
    var order = await Order.createOrder(data).then(result => {
      return result;
    });

    return order;
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};

const updateOrder = async (id, data) => {
  try {
    await Order.updateOrder(id, data).then(result => {
      return result;
    });
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};

const deleteOrder = async id => {
  try {
    order = await Order.delete(id).then(console.log('삭제: id-', id));
  } catch (error) {
    throw Error(error.message);
  }
};

const changeStatus = async (id, status) => {
  try {
    await Order.changeStatus(id, status).then(result => {
      return result;
    });
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  findOrders,
  findOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStatus
};
