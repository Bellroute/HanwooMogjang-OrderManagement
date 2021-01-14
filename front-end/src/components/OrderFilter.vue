<template>
  <div class="main__filter">
    <div class="main__order-filter">
      <ul>
        <li v-for="(orderType, i) in orderTypes" v-bind:key="i">
          <a @click="clickMainFilter(i)" :class="{active : i === selectedType}">{{ orderType }}</a>
        </li>
      </ul>
    </div>
    <div class="main--order-filter">
      <div class="filter--results">
        <p>
          <strong style="padding-right: 3px">3</strong>개의 주문
        </p>
      </div>
      <div class="filter--status">
        <span>전체</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderFilter",
  data() {
    return {
      selectedType: null,
      orderTypes: ["전체", "직접 수령", "배송"],
      orderStatuses: ["전체", "준비", "수령 대기", "배송 대기", "완료"]
    };
  },
  created: function() {
    var v = this;
    v.clickMainFilter(0);
  },
  methods: {
    clickMainFilter: function(type) {
      var v = this;
      if (type !== undefined) {
        v.selectedType = type;
      }
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
  max-width: 1024px;
  margin: 0 auto;
}

.main--order-filter {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  flex-wrap: wrap;
  max-width: 1024px;
  margin: 0 auto;
}

.main__order-filter ul {
  padding: 10px 10px 20px 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: content-box;
  padding: 15px;
  max-width: 1024px;
  margin: 0 auto;
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
  padding: 2px 15px 2px 3px;
  position: relative;
  cursor: pointer;
}

.filter--status span::after {
  content: "";
  border: solid #333;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  position: absolute;
  right: 2px;
  bottom: 10px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
