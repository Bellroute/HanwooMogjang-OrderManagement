<template>
  <div class="main__filter">
    <div class="main__order-filter">
      <ul>
        <li v-for="(orderType, i) in orderTypes" v-bind:key="i">
          <a
            @click="clickTypeFilter(orderType)"
            :class="{ active: orderType === selectedType }"
            >{{ orderType }}</a
          >
        </li>
      </ul>
    </div>
    <div class="main--order-filter">
      <div class="filter--results">
        <p>
          <strong style="padding-right: 3px">{{ ordersNumber }}</strong
          >개의 주문
        </p>
      </div>
      <div class="filter--status">
        <span
          v-for="(status, i) in orderStatuses"
          v-bind:key="i"
          @click="clickStatusFilter(status)"
          :class="{ active: status === selectedStatus }"
          >{{ status }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderFilter",
  props: ["ordersNumber"],
  data() {
    return {
      selectedType: "",
      selectedStatus: "",
      orderTypes: ["전체", "직접 수령", "배송"],
      orderStatuses: ["전체", "준비", "대기", "완료"]
    };
  },
  created: function() {
    var v = this;
    v.clickTypeFilter(this.orderTypes[0]);
    v.clickStatusFilter(this.orderStatuses[0]);
  },
  methods: {
    clickTypeFilter: function(type) {
      var v = this;
      if (type !== undefined) {
        v.selectedType = type;
      }
      this.$emit("filter-type", type);
    },
    clickStatusFilter: function(status) {
      var v = this;
      if (status !== undefined) {
        v.selectedStatus = status;
      }
      this.$emit("filter-status", status);
    }
  }
};
</script>

<style>
.main__order-filter {
  text-align: left;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.main--order-filter {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  flex-wrap: wrap;
}

.main__order-filter ul {
  padding: 10px 10px 20px 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: content-box;
  padding: 15px;
}

.main__order-filter ul li {
  display: inline-grid;
}

.main__order-filter ul li:first-child {
  margin-left: 10px;
}

.main__order-filter ul li a {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
}

.filter--results {
  font-size: 14px;
  padding-left: 20px;
}

.filter--results p {
  padding: 5px 10px;
  border-radius: 20px;
}

.active {
  background-color: #ffc645;
}

.filter--status span {
  font-size: 14px;
  margin-left: 10px;
  padding: 5px 10px;
  position: static;
  cursor: pointer;
  border-radius: 20px;
}
</style>
