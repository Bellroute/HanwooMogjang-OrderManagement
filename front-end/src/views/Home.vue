<template>
  <div class="home">
    <h2 style="text-align: center;">선물 포장 주문 현황</h2>
    <DateNavigation />
    <hr />
    <div class="main_filter"></div>
    <MainSchedule />
  </div>
</template>

<script>
import DateNavigation from "@/components/DateNavigation.vue";
import MainSchedule from "@/components/MainSchedule.vue";

export default {
  name: "Home",
  components: {
    DateNavigation,
    MainSchedule
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
