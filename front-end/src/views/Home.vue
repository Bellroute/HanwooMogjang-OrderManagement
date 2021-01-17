<template>
  <div class="home">
    <h1 style="text-align: center;">주문 진행 현황</h1>
    <DateNavigation v-on:event-data="fetchDate" />
    <OrderAddButton @add-order="addOrder" />
    <OrderFilter
      :ordersNumber="ordersNumber"
      v-on:filter-status="fetchStatus"
      v-on:filter-type="fetchType"
    />
    <MainSchedule
      v-if="orderList.length !== 0"
      :orderList="orderList"
      @change-status-wait="changeStatusWait"
      @change-status-done="changeStatusDone"
      @delete-order="deleteOrder"
      @update-order="updateOrder"
    />
    <div id="empty-order-page" v-else>
      <h3>등록된 주문이 없습니다.</h3>
      <p>다른 날짜 혹은 다른 검색 조건을 적용해보세요 :)</p>
    </div>
  </div>
</template>

<script>
import DateNavigation from "@/components/DateNavigation.vue";
import MainSchedule from "@/components/MainSchedule.vue";
import OrderFilter from "@/components/OrderFilter.vue";
import OrderAddButton from "@/components/OrderAddButton.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    DateNavigation,
    MainSchedule,
    OrderFilter,
    OrderAddButton
  },
  data() {
    return {
      date: "",
      type: "",
      status: "",
      orderList: [],
      ordersNumber: 0
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList: async function() {
      const baseURI = "http://localhost:8080";

      await axios
        .get(`${baseURI}/api/orders` + this.getFilters())
        .then(result => {
          console.log(result);
          this.orderList = result.data.orders;
          this.orderList.sort((a, b) => {
            if (a.time > b.time) return 1;
            if (a === b) return a.createdAt - b.createdAt;
            if (a.time < b.time) return -1;
          });
          this.ordersNumber = this.orderList.length;
        });
    },
    fetchDate: async function(date) {
      this.date = date;
      await this.getOrderList();
    },
    fetchType: async function(type) {
      this.type = type;
      await this.getOrderList();
    },
    fetchStatus: async function(status) {
      this.status = status;
      await this.getOrderList();
    },
    getFilters: function() {
      var paramDate = "date=";
      var paramType = "&type=";
      var paramStatus = "&status=";
      var weeks = ["일", "월", "화", "수", "목", "금", "토"];

      if (this.date.length === 0) {
        var today = new Date();
        this.date = {
          year: today.getFullYear(),
          month:
            today.getMonth() + 1 < 10
              ? "0" + (today.getMonth() + 1)
              : today.getMonth(),
          date: today.getDate(),
          today: weeks[today.getDay() % 7]
        };
      }
      if (this.type.length === 0 || this.type === "전체") {
        paramType = "";
        this.type = "";
      }
      if (this.status.length === 0 || this.status === "전체") {
        paramStatus = "";
        this.status = "";
      }

      return (
        "?" +
        paramDate +
        this.dateToString(this.date) +
        paramType +
        this.type +
        paramStatus +
        this.status
      );
    },
    dateToString(date) {
      return date.year + "-" + date.month + "-" + date.date;
    },
    changeStatusWait: async function(id) {
      const baseURI = "http://localhost:8080";
      var url = id + "/wait";

      await axios.put(`${baseURI}/api/orders/` + url).then(result => {
        console.log(result);
      });
    },
    changeStatusDone: async function(id) {
      const baseURI = "http://localhost:8080";
      var url = id + "/done";

      await axios.put(`${baseURI}/api/orders/` + url).then(result => {
        console.log(result);
      });
    },
    deleteOrder: async function(id) {
      const baseURI = "http://localhost:8080";

      axios.delete(`${baseURI}/api/orders/` + id).then(result => {
        console.log(result);
        this.ordersNumber = this.orderList.length;
      });
    },
    updateOrder: async function(data) {
      const baseURI = "http://localhost:8080";

      axios.put(`${baseURI}/api/orders/` + data._id, data).then(result => {
        console.log(result);
      });
    },
    addOrder: async function(data) {
      const baseURI = "http://localhost:8080";

      axios.post(`${baseURI}/api/orders/`, data).then(result => {
        console.log(result);
      });
    }
  }
};
</script>

<style>
.home {
  margin-left: 5%;
  margin-right: 5%;
  padding: 3%;
  background: white;
  height: fit-content;
}

h1 {
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
