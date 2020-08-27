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
import { loginRequest, loginRequestPost } from "@/api/login";

export default {
  data() {
    return {
      logining: false,
      loginFrom: {
        account: "18818299304",
        checkPass: "123456"
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    makeBaseAuth({ username, password }) {
      const tok = username + ":" + password;
      const hash = tok;
      return "Basic " + hash;
    },
    handleSubmit() {
      const _this = this;
      _this.$refs.loginFrom.validate(valid => {
        if (valid) {
          _this.logining = true;
          const loginParams = {
            username: _this.loginFrom.account,
            password: _this.loginFrom.checkPass
          };

          loginRequestPost(loginParams)
            .then(res => {
              loginRequest()
                .then(data => {
                  if (data.data.code === "000") {
                    const result = data.data.datas[0];
                    let roleType = result.roleType;
                    // const roleType = _this.loginFrom.account;
                    sessionStorage.setItem("user", JSON.stringify(result));
                    
                    // Todo: 修改用户角色权限
                    _this.$router.push({ path: "/donorInfoP" });

                    // if (roleType === "superAdmin") {
                    // } else {
                    //   _this.logining = false;
                    //   _this.$message({
                    //     message: "登录失败",
                    //     type: "error"
                    //   });
                    // }
                  } else {
                    _this.$message({
                      message: data.data.msg,
                      type: "error"
                    });
                  }
                })
                .catch(err => {
                  _this.logining = false;
                  _this.$message({
                    message: err.response.data.msg,
                    type: "error"
                  });
                });
            })
            .catch(err => {
              _this.logining = false;
              _this.$message({
                message: err.response.data.msg,
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
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
@import "../styles/vars.scss";

.set-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/login.jpg");
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