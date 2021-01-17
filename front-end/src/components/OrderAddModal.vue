<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <div class="card-title">
        <a style="margin: 10px">주문 상세 정보</a>
      </div>
      <div>
        <div class="info-box">
          <div class="info-title">
            <h4>주문 정보</h4>
          </div>
          <div class="info-detail">
            <div class="detail-main">
              <span class="detail-name">품목:</span>
              <input id="order-item" type="text" class="item" v-model="item" />
            </div>
            <div>
              <span class="detail-name">주문 타입:</span>
              <select id="order-type" class="detail" v-model="selectedType">
                <option>배송</option>
                <option>직접 수령</option>
              </select>
            </div>
            <div>
              <span class="detail-name">희망 수령 날짜:</span>
              <input
                id="order-date"
                type="text"
                class="detail"
                v-model="date"
              />
            </div>
            <div v-if="!isDelivery && selectedType === '직접 수령'">
              <span class="detail-name">희망 수령 시간:</span>
              <input
                id="order-time"
                type="text"
                class="detail"
                v-model="time"
              />
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            <h4>주문자 정보</h4>
          </div>
          <div class="info-detail">
            <div>
              <span class="detail-name">주문자명:</span>
              <input
                id="order-orderName"
                type="text"
                class="detail"
                v-model="orderName"
              />
            </div>
            <div>
              <span class="detail-name">연락처:</span>
              <input
                id="order-orderCallNumber"
                type="text"
                class="detail"
                v-model="orderCallNumber"
              />
            </div>
          </div>
        </div>
        <div class="info-box" v-if="isDelivery && selectedType === '배송'">
          <div class="info-title">
            <h4>배송 정보</h4>
          </div>
          <div class="info-detail">
            <div>
              <span class="detail-name">받는 사람:</span>
              <input
                id="order-recipient"
                type="text"
                class="detail"
                v-model="recipient"
              />
            </div>
            <div>
              <span class="detail-name">배송지:</span>
              <input
                id="order-recipientAddress"
                type="text"
                class="detail"
                v-model="recipientAddress"
              />
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            <h4>요청 사항</h4>
          </div>
          <div class="info-detail">
            <textarea id="order-etc" class="detail-name" v-model="etc" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span class="btn btn-edit" type="button" @click="checkForm">추가</span>
        <span class="btn btn-close" @click="$emit('close-modal')">취소</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderAddModal",
  data() {
    return {
      item: "",
      time: "",
      type: "",
      date: "",
      orderName: "",
      orderCallNumber: "",
      recipient: "",
      recipientAddress: "",
      etc: "",
      isDelivery: this.type === "배송",
      selectedStatus: this.status,
      selectedType: this.typev
    };
  },
  updated() {
    this.isDelivery = this.selectedType === "배송";
    this.status = this.selectedStatus;
    this.type = this.selectedType;
  },
  methods: {
    checkForm: function() {
      var order = {
        item: this.item,
        time: this.time,
        type: this.type,
        date: this.date,
        orderName: this.orderName,
        orderCallNumber: this.orderCallNumber,
        recipient: this.recipient,
        recipientAddress: this.recipientAddress,
        etc: this.etc
      };

      this.$emit("add-order", order);
      this.$emit("close-modal");
    }
  }
};
</script>

<style scoped>
.card-title {
  padding: 20px;
  color: black;
  background: white;
  padding-bottom: 30px;
}
.card-title > a {
  border-bottom: 2px solid black;
  padding-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: -1px;
}

input {
  width: 50%;
}

textarea {
  width: 100%;
  min-height: 10%;
}

.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  text-align: left;
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: whitesmoke;
  z-index: 10;
  opacity: 1;
  letter-spacing: -1px;
  max-height: 80%;
  overflow: scroll;
}
.info-box {
  margin-bottom: 10px;
  background-color: white;
  padding: 10px 20px;
  min-height: 100px;
}

.info-title {
  margin: 10px;
  color: #20232c;
  font-size: 16px;
  letter-spacing: -1px;
  border-bottom: 1px solid #ddd;
}

.info-detail {
  margin: 10px;
}

.detail-name {
  color: #20232c;
  font-size: 17px;
  margin-right: 20px;
}

.detail {
  color: #20232c;
  font-weight: bold;
  font-size: 17px;
}

.item {
  color: #20232c;
  font-size: 30px;
  font-weight: bold;
  padding-right: 10px;
}

.detail-main {
  padding-bottom: 10px;
}

.detail-type {
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 16px;
}

.isDelivery {
  background-color: #ffc645;
}

.isPickup {
  background-color: lightgreen;
}

.modal-footer {
  text-align: right;
  padding: 10px;
}

.btn {
  width: 20%;
  text-align: center;
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  font-size: 15px;
  cursor: pointer;
}

.btn-edit {
  background-color: #4169e1;
}

.btn-remove {
  background-color: #ea3e42;
}

.btn-close {
  background-color: darkgray;
}
</style>
