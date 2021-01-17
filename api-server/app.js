const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
var methodOverride = require('method-override');

const app = express();

app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongoDB server');
});
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api/orders', require('./routes/order'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(error.message);
});

// var Order = require('../api-server/model/order');

// for (var i = 0; i < 3; i++) {
//   var order = new Order({
//     item: '소고기 구이용 15kg - 15만원',
//     type: '배송',
//     date: '2021-01-17',
//     time: '20:00',
//     orderName: '벨루트',
//     orderCallNumber: '010-0000-0000',
//     recipient: '김피먹',
//     recipientAddress: '광주 동구 피먹동 100',
//     etc: '아이스박스 준비해주세요',
//     status: '준비'
//   });

//   order.save().then(() => {
//     console.log('save success');
//   });

//   order = new Order({
//     item: '소고기 구이용 15kg - 15만원',
//     type: '직접 수령',
//     date: '2021-01-18',
//     time: '20:00',
//     orderName: '벨루트',
//     orderCallNumber: '010-0000-0000',
//     etc: '아이스박스 준비해주세요',
//     status: '대기'
//   });

//   order.save().then(() => {
//     console.log('save success');
//   });
// }

module.exports = app;
