<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card" v-if="!this.isUpdateView">
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
              <span class="item">{{ orderDetails.item }}</span>
              <span
                class="detail-type"
                :class="{
                  isDelivery: orderDetails.type.includes('배송'),
                  isPickup: orderDetails.type.includes('수령')
                }"
              >{{ orderDetails.type }}</span>
            </div>
            <div>
              <span class="detail-name">주문 번호:</span>
              <span class="detail">{{ orderDetails._id }}</span>
            </div>
            <div>
              <span class="detail-name">희망 수령 날짜:</span>
              <span class="detail">{{ orderDetails.date }}</span>
            </div>
            <div v-if="!isDelivery">
              <span class="detail-name">희망 수령 시간:</span>
              <span class="detail">{{ orderDetails.time }}</span>
            </div>
            <div>
              <span class="detail-name">진행 현황:</span>
              <span class="detail">{{ orderDetails.status }}</span>
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
              <span class="detail">{{ orderDetails.orderName }}</span>
            </div>
            <div>
              <span class="detail-name">연락처:</span>
              <span class="detail">{{ orderDetails.orderCallNumber }}</span>
            </div>
          </div>
        </div>
        <div class="info-box" v-if="isDelivery">
          <div class="info-title">
            <h4>배송 정보</h4>
          </div>
          <div class="info-detail">
            <div>
              <span class="detail-name">받는 사람:</span>
              <span class="detail">{{ orderDetails.recipient }}</span>
            </div>
            <div>
              <span class="detail-name">배송지:</span>
              <span class="detail">{{ orderDetails.recipientAddress }}</span>
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            <h4>요청 사항</h4>
          </div>
          <div class="info-detail">
            <div class="detail-name">{{ orderDetails.etc }}</div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span class="btn btn-edit" @click="isUpdateView = true">수정</span>
        <span class="btn btn-remove" @click="deleteOrder(orderDetails._id)">삭제</span>
        <span class="btn btn-close" @click="$emit('close-modal')">닫기</span>
      </div>
    </div>
    <div class="modal-card" v-if="this.isUpdateView">
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
              <input id="order-item" type="text" class="item" v-model="orderDetails.item" />
            </div>
            <div>
              <span class="detail-name">주문 번호:</span>
              <span id="order-id" class="detail">{{ orderDetails._id }}</span>
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
              <input id="order-date" type="text" class="detail" v-model="orderDetails.date" />
            </div>
            <div v-if="!isDelivery && selectedType === '직접 수령'">
              <span class="detail-name">희망 수령 시간:</span>
              <input id="order-time" type="text" class="detail" v-model="orderDetails.time" />
            </div>
            <div>
              <span class="detail-name">진행 현황:</span>
              <select id="order-status" class="detail" v-model="selectedStatus">
                <option>준비</option>
                <option>대기</option>
                <option>완료</option>
              </select>
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
                v-model="orderDetails.orderName"
              />
            </div>
            <div>
              <span class="detail-name">연락처:</span>
              <input
                id="order-orderCallNumber"
                type="text"
                class="detail"
                v-model="orderDetails.orderCallNumber"
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
                v-model="orderDetails.recipient"
              />
            </div>
            <div>
              <span class="detail-name">배송지:</span>
              <input
                id="order-recipientAddress"
                type="text"
                class="detail"
                v-model="orderDetails.recipientAddress"
              />
            </div>
          </div>
        </div>
        <div class="info-box">
          <div class="info-title">
            <h4>요청 사항</h4>
          </div>
          <div class="info-detail">
            <textarea id="order-etc" class="detail-name" v-model="orderDetails.etc" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span class="btn btn-edit" type="button" @click="checkForm">수정</span>
        <span class="btn btn-close" @click="isUpdateView = false">취소</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetailsModal",
  props: ["orderDetails"],
  data() {
    return {
      isUpdateView: false,
      isDelivery: this.orderDetails.type === "배송",
      selectedStatus: this.orderDetails.status,
      selectedType: this.orderDetails.type
    };
  },
  components: {},
  updated() {
    this.isDelivery = this.selectedType === "배송";
    this.orderDetails.status = this.selectedStatus;
    this.orderDetails.type = this.selectedType;
  },
  methods: {
    isDeleted: function() {
      if (confirm("해당 주문을 삭제하시겠습니까?") === true) {
        return true;
      } else {
        return false;
      }
    },
    deleteOrder: function(id) {
      if (this.isDeleted()) {
        this.$emit("delete-order", id);
        this.$emit("close-modal");
      }
    },
    checkForm: function() {
      var order = this.orderDetails;
      console.log(order);
      this.$emit("update-order", order);
      this.isUpdateView = false;
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
  border: 1px solid;
  background-color: white;
  outline: none;
  font-family: "Avenir Next", "KoPub Dotum", sans-serif;
  height: auto;
  padding: 10px;
  width: 95%;
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
