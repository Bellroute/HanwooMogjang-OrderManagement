const orderService = require('../service/order.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = async (req, res) => {
  try {
    const token = req.headers['x-access-token'] || req.headers['token'];
    let jwt_secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwt_secret);
  } catch {
    res
      .status(401)
      .json({ status: 401, message: '권한 없음. 로그인 후 이용해주세요.' });
  }
};

const getOrders = async (req, res) => {
  checkAuth(req, res);

  const date = req.query.date;
  const status = req.query.status;
  const type = req.query.type;

  try {
    const orders = await orderService.findOrders(date, status, type);

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getOrder = async (req, res) => {
  checkAuth(req, res);

  const id = req.params.id;

  try {
    const order = await orderService.findOrderById(id);

    return res.status(200).json({
      order
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const createOrder = async (req, res) => {
  checkAuth(req, res);

  try {
    const order = await orderService.createOrder(req.body);

    return res.status(201).json({
      order
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};

const updateOrderDetails = async (req, res) => {
  checkAuth(req, res);

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
  checkAuth(req, res);

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
  checkAuth(req, res);

  const id = req.params.id;

  try {
    await orderService.changeStatus(id, '준비');

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
  checkAuth(req, res);

  const id = req.params.id;

  try {
    await orderService.changeStatus(id, '대기');

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
  checkAuth(req, res);

  const id = req.params.id;

  try {
    await orderService.changeStatus(id, '완료');

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
