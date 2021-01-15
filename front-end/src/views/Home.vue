<template>
  <div class="home">
    <h1 style="text-align: center;">주문 진행 현황</h1>
    <DateNavigation v-on:event-data="fetchDate" />
    <OrderFilter
      :ordersNumber="ordersNumber"
      v-on:filter-status="fetchStatus"
      v-on:filter-type="fetchType"
    />
    <MainSchedule
      v-if="orderList.length !== 0"
      :orderList="orderList"
      v-on:change-status-wait="changeStatusWait"
      v-on:change-status-done="changeStatusDone"
    />
    <div id="empty-order-page" v-else>
      <h3>
        등록된 주문이 없습니다.
      </h3>
      <p>다른 날짜 혹은 다른 검색 조건을 적용해보세요 :)</p>
    </div>
  </div>
</template>

<script>
import DateNavigation from "@/components/DateNavigation.vue";
import MainSchedule from "@/components/MainSchedule.vue";
import OrderFilter from "@/components/OrderFilter.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    DateNavigation,
    MainSchedule,
    OrderFilter
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

      if (this.date.length === 0) {
        this.date = new Date().getDate();
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
        this.date +
        paramType +
        this.type +
        paramStatus +
        this.status
      );
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
    }
  }
};
</script>

<style>
.home {
  margin-left: 15%;
  margin-right: 15%;
  padding: 3%;
  background: white;
  height: fit-content;
}

h1 {
  padding-top: 1%;
  padding-bottom: 5%;
}
</style>
