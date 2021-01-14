<template>
  <div>
    <ul>
      <li class="list-schedule-item">
        <a>
          <div class="order-time">
            <p>20:00</p>
          </div>
          <div class="order-item">
            <div>
              <h3>소고기 구이용 10만원 2set</h3>
            </div>
            <div class="order-info">
              <span>주문자:</span>
              <span>벨루트</span>
              <span>연락처:</span>
              <span>010-0000-0000</span>
            </div>
          </div>
          <div class="status">
            <div class="order-status isReady">
              <p>준비</p>
            </div>
          </div>
        </a>
      </li>
      <li class="list-schedule-item">
        <a>
          <div class="order-time">
            <p>20:00</p>
          </div>
          <div class="order-item">
            <div>
              <h3>소고기 구이용 10만원 2set</h3>
            </div>
            <div class="order-info">
              <span>주문자: 벨루트</span>
              <span>연락처: 010-0000-0000</span>
            </div>
          </div>
          <div class="status">
            <div class="order-status isWait">
              <p>수령 대기</p>
            </div>
          </div>
        </a>
      </li>
      <li class="list-schedule-item">
        <a>
          <div class="order-time">
            <p>20:00</p>
          </div>
          <div class="order-item">
            <div>
              <h3>소고기 구이용 10만원 2set</h3>
            </div>
            <div class="order-info">
              <span>주문자: 벨루트</span>
              <span>연락처: 010-0000-0000</span>
            </div>
          </div>
          <div class="status">
            <div class="order-status isDone">
              <p>완료</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainSchedule",
  data() {
    return {
      options: ["준비", "수령 대기", "배송 대기", "완료"]
    };
  }
};
</script>

<style>
ol,
ul,
li {
  list-style: none;
}

li {
  display: list-item;
}

.list-schedule-item > a {
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 30px 15px;
}

a {
  outline: none;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.order-time {
  width: 10%;
  font-weight: 700;
  text-align: center;
  font-size: 15px;
}

.order-item {
  text-align: left;
  width: 70%;
}

.order-info {
  font-size: 13px;
}

.order-info > span {
  padding-right: 3px;
}

.status {
  width: 15%;
}

.order-status {
  text-align: center;
  width: 100%;
  text-align: center;
  padding: 8px 5px;
  border-radius: 6px;
  font-size: 12px;
}

.isReady {
  color: white;
  background-color: #3534a5;
}

.isWait {
  color: white;
  background-color: #ea3e42;
}

.isDone {
  color: #999;
  background-color: #ddd;
}
</style>
