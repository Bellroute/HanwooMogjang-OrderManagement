<template>
  <div class="home">
    <h2 style="text-align: center;">선물 포장 주문 현황</h2>
    <DateNavigation v-on:event-data="getOrderList" />
    <OrderFilter :ordersNumber="ordersNumber" />
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
      orderList: [],
      ordersNumber: 0
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList: async function(date) {
      const baseURI = "http://localhost:8080";
      var query = "?date=" + date;

      if (date == null) {
        query = "";
      }

      await axios.get(`${baseURI}/api/orders${query}`).then(result => {
        console.log(result);
        this.orderList = result.data.orders;
        this.ordersNumber = this.orderList.length;
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
  height: 80%;
}

h2 {
  padding-top: 1%;
  padding-bottom: 5%;
}
</style>
