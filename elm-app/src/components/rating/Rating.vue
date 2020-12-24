<template>
  <div class="Rating-gray">
    <i v-for="(item, index) in itemClasses" :key="index"
       class="fa " :class="item"></i>
  </div>
</template>

<script>
import {LENGTH, CLS_ON, CLS_HALF, CLS_OFF} from "@/constant/constant";

export default {
  name: "Rating",
  props: {
    rating: Number
  },
  computed: {
    itemClasses () {
      // 4.8分， 4个全🌟， 一个半🌟
      let result = [];
      // 对分数进行处理，向下取0.5的倍数
      let score = Math.floor (this.rating * 2) / 2;
      // 控制半🌟
      let hasDecimal = score % 1 !== 0;
      // 全🌟
      let integer = Math.floor (score);
      // 全🌟放到数组中
      for (let i = 0; i < integer; i++) {
        result.push (CLS_ON);
      }
      // 半🌟
      if (hasDecimal) {
        result.push (CLS_HALF);
      }
      // 补齐
      while (result.length < LENGTH) {
        result.push (CLS_OFF)
      }
      return result;
    }
  },
}
</script>

<style scoped>
.Rating-gray {
  color: #ffbe00;
  margin-right: 1.066667vw;
  display: inline-block;
}
</style>