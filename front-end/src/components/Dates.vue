<template>
  <div>
    <p>{{ item.date }}</p>
    <span>{{ item.today }}</span>
  </div>
</template>

<script>
export default {
  name: "Dates",
  data() {
    return {};
  },
  props: ["date"],
  mounted() {
    this.item = this.date;
  }
};
</script>
