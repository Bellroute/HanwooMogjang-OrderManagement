<template>
  <div id="dateNav" class="sub-header">
    <div class="tabWrap">
      <div class="swipe-tabs">
        <div class="swipe-tab">
          <slick id="carousel" ref="slick" :options="slickOptions">
            <div
              class="dates"
              v-for="(item, i) in dates"
              v-bind:key="i"
              :class="{ blue: item.today == '토', red: item.today == '일' }"
              @click="dateShcedules(item)"
            >
              <p>{{ item.date }}</p>
              <span>{{ item.today }}</span>
            </div>
          </slick>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#dateNav {
  padding-top: 3%;
  padding-bottom: 3%;
}

.slick-prev,
.slick-next {
  line-height: 1;
  opacity: 0.75;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  font-family: "slick";
  font-size: 25px;
  color: black;
}

#carousel .slick-list {
  border-radius: 12px;
  overflow: hidden;
}

#carousel {
  display: flex;
}

#carousel .slick-slide {
  float: left;
  height: 100%;
  min-height: 1px;
}

.blue {
  color: #3534a5;
}

.red {
  color: #ea3e42;
}

.dates {
  cursor: pointer;
}

.dates > p {
  font-size: 25px;
}

.dates > span {
  font-size: 15px;
}
</style>

<script>
import Slick from "vue-slick";

export default {
  name: "DateNavigation",
  components: {
    Slick
  },
  data() {
    return {
      slickOptions: {
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        draggable: false,
        dots: false,
        prevArrow: "<button type='button' class='slick-prev'><</button>",
        nextArrow: "<button type='button' class='slick-next'>></button>"
      },
      dates: []
    };
  },
  created() {
    var items = [];
    var today = new Date();
    var limitDay = 14;
    var weeks = ["일", "월", "화", "수", "목", "금", "토"];

    for (var i = 0; i < limitDay; i++) {
      items.push({
        date: today.getDate() + i,
        today: weeks[(today.getDay() + i) % 7]
      });
    }

    this.dates = items;
  },
  methods: {
    dateShcedules: function(item) {
      const selectedDate = item.date;
      this.$emit("event-data", selectedDate);
    }
  }
};
</script>
