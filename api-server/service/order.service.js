const mockOrders = [
  {
    id: 1,
    type: '배송',
    item: '소고기 구이용 15kg - 15만원',
    date: new Date().getDate(),
    time: '20:00',
    orderName: '벨루트',
    orderCallNumber: '010-0000-0000',
    recipient: '김피먹',
    recipientAddress: '광주 동구 피먹동 100',
    etc: '',
    status: '준비'
  },
  {
    id: 2,
    type: '배송',
    item: '소고기 구이용 15kg - 15만원',
    date: new Date().getDate(),
    time: '21:00',
    orderName: '벨루트',
    orderCallNumber: '010-0000-0000',
    recipient: '김피먹',
    recipientAddress: '광주 동구 피먹동 100',
    etc: '',
    status: '완료'
  },
  {
    id: 3,
    type: '배송',
    item: '소고기 구이용 15kg - 15만원',
    date: new Date().getDate() + 1,
    time: '20:00',
    orderName: '벨루트',
    orderCallNumber: '010-0000-0000',
    recipient: '김피먹',
    recipientAddress: '광주 동구 피먹동 100',
    etc: '',
    status: '배송 대기'
  }
];

const findOrdersByDate = async date => {
  try {
    return mockOrders.filter(order => order.date == date);
  } catch (error) {
    throw Error(error.message);
  }
};

const findOrdersById = async id => {
  try {
    return mockOrders[0];
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
    console.log('db에 저장');
  } catch (error) {
    throw Error(error.message);
  }
};

const updateOrder = async (id, data) => {
  try {
    console.log('업데이트');
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteOrder = async id => {
  try {
    console.log('삭제');
  } catch (error) {
    throw Error(error.message);
  }
};

const changeStatus = async (id, typeCode) => {
  try {
    console.log('상태 변경');
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  findOrdersByDate,
  findOrdersById,
  createOrder,
  updateOrder,
  deleteOrder,
  changeStatus
};
