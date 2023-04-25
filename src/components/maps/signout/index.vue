<template>
  <div class="ol-usersignout">
    <a-icon type="user"></a-icon>

    <a-popconfirm
      title="确定退出登录？"
      ok-text="确定"
      cancel-text="取消"
      @confirm="confirm"
      @cancel="cancel"
    >
      <span style="margin-left: 10px; cursor: pointer"> 田金雨 </span>
    </a-popconfirm>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    confirm(e) {
      console.log(e);
      this.$router.replace({
        name: "login",
      });
    },
    cancel(e) {},
  },
};
</script>

<style scoped>
.ol-usersignout {
  display: flex;
  align-items: center;
  color: white;
  font-size: 17px;
  font-family: Microsoft Yahei;
  margin-left: 700px;
}
</style>