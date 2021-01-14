<template>
  <div class="home">
    <h2 style="text-align: center;">선물 포장 주문 현황</h2>
    <DateNavigation />
    <OrderFilter />
    <MainSchedule />
  </div>
</template>

<script>
import DateNavigation from "@/components/DateNavigation.vue";
import MainSchedule from "@/components/MainSchedule.vue";
import OrderFilter from "@/components/OrderFilter.vue";

export default {
  name: "Home",
  components: {
    DateNavigation,
    MainSchedule,
    OrderFilter
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
