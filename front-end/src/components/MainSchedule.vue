<template>
  <div>
    <ul>
      <li
        class="list-schedule-item"
        v-for="(order, i) in orderList"
        v-bind:key="i"
      >
        <a>
          <div class="order-time">
            <p>{{ order.time }}</p>
          </div>
          <div class="order-item" @click="showModal(order)">
            <div>
              <h3>{{ order.item }}</h3>
            </div>
            <div class="order-info">
              <span>주문자:</span>
              <span style="font-weight: bold;">{{ order.orderName }}</span>
              <span>연락처:</span>
              <span style="font-weight: bold;">{{
                order.orderCallNumber
              }}</span>
            </div>
          </div>
          <div class="status">
            <div
              class="order-status"
              @click="changeStatus(order)"
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
    <OrderDetailsModal
      v-if="isModalViewed"
      :orderDetails="orderForModal"
      @close-modal="isModalViewed = false"
      @delete-order="deleteOrder"
      @update-order="updateOrder"
    />
  </div>
</template>

<script>
import OrderDetailsModal from "@/components/OrderDetailsModal.vue";

export default {
  name: "MainSchedule",
  props: ["orderList"],
  components: {
    OrderDetailsModal
  },
  data() {
    return {
      isModalViewed: false,
      orderForModal: []
    };
  },
  methods: {
    isConfirmed: function() {
      if (
        confirm("선택한 주문에 대한 진행 현황을 변경하시겠습니까?") === true
      ) {
        return true;
      } else {
        return false;
      }
    },
    changeStatus: function(order) {
      if (order.status.includes("준비")) {
        if (this.isConfirmed()) {
          if (order.type === "배송") {
            order.status = "배송 대기";
          } else {
            order.status = "수령 대기";
          }
          this.$emit("change-status-wait", order._id);
        }
      } else if (order.status.includes("대기")) {
        if (this.isConfirmed()) {
          order.status = "완료";
          this.$emit("change-status-done", order._id);
        }
      } else {
      }
    },
    deleteOrder: async function(id) {
      var index = -1;

      for (var i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i]._id === id) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        throw Error("주문 목록에 존재하지 않는 주문입니다.");
      }

      this.orderList.splice(index, 1);
      await this.$emit("delete-order", id);
    },
    showModal: function(order) {
      this.isModalViewed = true;
      this.orderForModal = order;
    },
    updateOrder: async function(data) {
      var index = -1;

      for (var i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i]._id === data._id) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        throw Error("주문 목록에 존재하지 않는 주문입니다.");
      }

      this.orderList[i] = data;
      await this.$emit("update-order", data);
    }
  }
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
  padding: 10px 10px 0px 0px;
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
