<template>
  <div class="login-container">
    <h2 class="login-title">OL Development Platform</h2>

    <a-form-model :model="form" class="login-form" style="margin: 0 auto">
      <h2 class="title">用户登录</h2>
      <a-form-model-item>
        <a-input v-model="form.account" class="inputBox">
          <img src="@/assets/img/account.png" slot="prefix" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.password" class="inputBox">
          <img src="@/assets/img/password.png" slot="prefix" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button class="submit" type="primary" @click="onSubmit"
          >登录</a-button
        >
      </a-form-model-item>
    </a-form-model>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import user from "../../assets/img/account.png"
// import mima from "../../assets/img/password.png"
export default {
  name: "index",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    onSubmit() {
      if (this.form.account == "tianjinyu" && this.form.password == "12345") {
        this.$router.replace({
          name: "map",
        });
      } else {
        this.$message.error("账号密码错误");
      }
    },
  },
};
</script>

<style scoped>
/deep/.ant-input {
  height: 45px;
}
/deep/.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
.login-form {
  width: 565px;
  height: 372px;
  margin: 0 auto;
  /* background: url("../../assets/img/bk.png"); */
  padding: 40px 110px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: rgb(165, 164, 164); */
  background: url("../../assets/img/map.jpg");
  background-repeat: no-repeat;
}

/* Log */
.login-title {
  color: #fff;
  text-align: center;
  margin: 150px 0;
  font-size: 70px;
  font-family: Microsoft Yahei;
}
/* 登陆按钮 */
.submit {
  width: 100%;
  height: 45px;
  font-size: 16px;
}
/* 用户登陆标题 */
.title {
  margin-left: 35%;
  margin-bottom: 50px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}
/* 输入框 */
/* .inputBox {
  height: 45px;
} */
/* 输入框内左边距50px */
</style>