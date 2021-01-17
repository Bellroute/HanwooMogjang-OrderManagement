<template>
  <div>
    <div class="add-button" @click="showAddModal">
      <span class="button-value">+ 주문 추가</span>
    </div>
    <OrderAddModal
      v-if="isAddOrderView"
      @close-modal="isAddOrderView = false"
      @add-order="addOrder"
    />
  </div>
</template>

<script>
import OrderAddModal from "@/components/OrderAddModal.vue";

export default {
  name: "OrderAddButton",
  components: {
    OrderAddModal
  },
  data() {
    return {
      isAddOrderView: false
    };
  },
  methods: {
    showAddModal: function() {
      this.isAddOrderView = true;
    },
    addOrder: function(data) {
      this.$emit("add-order", data);
    }
  }
};
</script>

<style>
.add-button {
  text-align: right;
  padding: 10px 10px 10px 30px;
  cursor: pointer;
}

.button-value {
  text-align: center;
  font-size: 15px;
  background-color: #42b883;
  padding: 10px 40px;
  color: white;
  border-radius: 10px;
}
</style>
