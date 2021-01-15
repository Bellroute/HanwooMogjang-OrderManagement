const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order.controller');

// 주문 목록 조회
// GET /api/orders
router.get('/', OrderController.getOrders);

// 주문 조회
// GET /api/orders/:id
router.get('/:id', OrderController.getOrder);

// 주문 생성
// POST /api/orders
router.post('/', OrderController.createOrder);

// 주문 내용 수정
// PUT /api/orders/:id
router.put('/:id', OrderController.updateOrderDetails);

// 주문 삭제
// DELETE /api/orders/:id
router.delete('/:id', OrderController.deleteOrder);

// 주문 상태 변경
// PUT /api/orders/:id/ready
router.put('/:id/ready', OrderController.changeStatusToReady);

// PUT /api/orders/:id/wait
router.put('/:id/wait', OrderController.changeStatusToWait);

// PUT /api/orders/:id/done
router.put('/:id/done', OrderController.changeStatusToDone);

module.exports = router;
