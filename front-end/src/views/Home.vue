<template>
  <div class="home">
    <h2 style="text-align: center;">선물 포장 주문 현황</h2>
    <DateNavigation />
    <div class="main_filter"></div>
    <div class="main_schedule"></div>
  </div>
</template>

<script>
import DateNavigation from "@/components/DateNavigation.vue";

export default {
  name: "Home",
  components: {
    DateNavigation
  }
};
</script>

<style>
.home {
  padding-left: 15%;
  padding-right: 15%;
}
</style>
