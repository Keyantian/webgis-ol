<template>
  <div class="position-box">
    经度：<a-input-number
      id="inputNumber"
      v-model="value[0].x"
      :min="0"
      :max="360"
      :step="0.01"
      style="margin-right: 30px"
    />
    纬度：<a-input-number
      id="inputNumber"
      v-model="value[1].y"
      :min="0"
      :max="360"
      :step="0.01"
      style="margin-right: 30px"
    />
    <a-button class="position-style" style="margin-right: 30px">定位</a-button>
    <a-button class="cancel-style" style="margin-right: 30px">取消</a-button>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      value: [{ x: 0 }, { y: 0 }],
    };
  },
  methods: {},
};
</script>

<style scoped>
.position-style {
  background-color: rgba(94, 94, 94, 0.7);
  color: white;
}
.cancel-style {
  background-color: rgba(243, 166, 22, 0.7);
  color: white;
}
</style>