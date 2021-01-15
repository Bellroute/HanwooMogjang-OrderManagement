<template>
  <div>
    <ul>
      <li
        class="list-schedule-item"
        v-for="order in orderList"
        v-bind:key="order.id"
      >
        <a>
          <div class="order-time">
            <p>{{ order.time }}</p>
          </div>
          <div class="order-item">
            <div>
              <h3>{{ order.item }}</h3>
            </div>
            <div class="order-info">
              <span>주문자:</span>
              <span>{{ order.orderName }}</span>
              <span>연락처:</span>
              <span>{{ order.orderCallNumber }}</span>
            </div>
          </div>
          <div class="status">
            <div
              class="order-status"
              :class="{
                isReady: order.status.includes('준비'),
                isWait: order.status.includes('대기'),
                isDone: order.status.includes('완료')
              }"
            >
              <p>{{ order.status }}</p>
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
  props: ["orderList"]
};
</script>

<style>
#empty-order-page {
  padding: 20px;
}

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
