<template>
  <div class="home">
    <h2 style="text-align: center;">선물 포장 주문 현황</h2>
    <DateNavigation v-on:event-data="fetchDate" />
    <OrderFilter
      :ordersNumber="ordersNumber"
      v-on:filter-status="fetchStatus"
      v-on:filter-type="fetchType"
    />
    <MainSchedule :orderList="orderList" />
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
  height: 80%;
}

h2 {
  padding-top: 1%;
  padding-bottom: 5%;
}
</style>
