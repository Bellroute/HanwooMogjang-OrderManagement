const orderService = require('../service/order.service');

const getOrders = async (req, res) => {
  const date = req.query.date ? req.query.date : new Date().getDate();

  try {
    const orders = await orderService.findOrdersByDate(date);

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await orderService.findOrdersById(id);

    return res.status(200).json({
      order
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    await orderService.createOrder(req.body);

    return res.status(201).json({
      status: 201,
      message: 'Creation Success'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const updateOrderDetails = async (req, res) => {
  const id = req.params.id;
  const details = req.body;

  try {
    await orderService.updateOrder(id, details);

    return res.status(200).json({
      status: 200,
      message: 'Update Success'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    await orderService.deleteOrder(id);

    return res.status(200).json({
      status: 200,
      message: 'Delete Success'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const changeStatusToReady = async (req, res) => {
  const id = req.params.id;

  try {
    await orderService.changeStatus(id, 0);

    return res.status(200).json({
      status: 200,
      message: 'Change Status Success: READY'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const changeStatusToWait = async (req, res) => {
  const id = req.params.id;

  try {
    await orderService.changeStatus(id, 0);

    return res.status(200).json({
      status: 200,
      message: 'Change Status Success: WAIT'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const changeStatusToDone = async (req, res) => {
  const id = req.params.id;

  try {
    await orderService.changeStatus(id, 0);

    return res.status(200).json({
      status: 200,
      message: 'Change Status Success: DONE'
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderDetails,
  deleteOrder,
  changeStatusToReady,
  changeStatusToWait,
  changeStatusToDone
};
