<template>
  <div class="set-bg">
    <el-form
      :model="loginFrom"
      :rules="loginRules"
      ref="loginFrom"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <div class="set-LOGO">管理系统</div>
      <h3 class="title">用户登录</h3>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginFrom.account"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="loginFrom.checkPass"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          class="login-set-btn"
          @click.native.prevent="handleSubmit"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginRequestPost } from "@/api/login";

export default {
  data() {
    return {
      logining: false,
      loginFrom: {
        account: "13509447983",
        checkPass: "123456"
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {


    handleSubmit() {
      const _this = this;
      _this.$refs.loginFrom.validate(valid => {
        if (valid) {
          _this.logining = true;
          const loginParams = {
            password: _this.loginFrom.checkPass,
            username: _this.loginFrom.account,
          };
          loginRequestPost(loginParams)
              .then(res => {
                console.log(res);
                console.log(res.status);
                const result = res;
                if (res.status === 200) {
                  _this.$message({
                    type: 'success',
                    message: "成功了！",
                  })
                  sessionStorage.setItem("user", JSON.stringify(result));
                  _this.$router.push({path: '/donorInfoP'})


                }
                 else {
                  _this.$message({
                        type: 'error',
                        message: "登录失败"
                      }
                  );
                }
              });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-set-btn {
  width: 100%;
  height: 45px;
  font-size: 18px;
  margin-top: 50px;
}
</style>

<style lang="scss" scoped>
@import "../style/vars.scss";

.set-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../assets/login.jpg");
  color: #393e46;
  background-size: cover;

  .login-container {
    position: fixed;
    top: 130px;
    left: calc(80% - 200px);
    /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 10px #393e46;
    box-sizing: border-box;
    .set-LOGO {
      position: fixed;
      top: 100px;
      left: calc(80% - 75px);
      height: 60px;
      width: 150px;
      background: $color-primary;
      color: #fff;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
    }
    .title {
      margin: 40px auto 40px auto;
      text-align: center;
      font-size: 26px;
      font-weight: 400;
      width: 110px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
}
</style>