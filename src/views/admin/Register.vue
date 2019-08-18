<template>
  <div class="rgs">
    <!-- logo -->
    <img class="rgs-logo" src="@/assets/imgs/logo1.png" alt v-show="islogo" />
    <img class="rgs-small" src="@/assets/imgs/logo1.png" alt v-show="issmall" />
    <!-- 选择组件 -->
    <div class="rgs-select">
      <el-button class="rgs-select-login" @click="SelectLogin">登录</el-button>
      <el-button @click="SelectRegister">注册</el-button>
    </div>
    <!-- 登录组件 -->
    <div class="rgs-content" v-show="islogin">
      <el-form>
        <el-form-item>
          <el-input class="input" autocomplete="off" v-model="logingname" placeholder="账号"></el-input>
        </el-form-item>
        <div style="margin: 10px;"></div>
        <el-form-item>
          <el-input type="password" v-model="loginpassword" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbtn" type="success" @click="loginHander">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册组件 -->
    <div v-show="isregister" class="register">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon>
        <el-form-item prop="regname">
          <el-input
            class="register-input"
            autocomplete="off"
            v-model="ruleForm.regname"
            placeholder="账号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="regpassword">
          <el-input
            type="password"
            v-model="ruleForm.regpassword"
            autocomplete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="usertel">
          <el-input
            class="register-input"
            autocomplete="off"
            v-model="ruleForm.usertel"
            placeholder="电话号码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="address">
          <el-input
            class="register-input"
            autocomplete="off"
            v-model="ruleForm.address"
            placeholder="地址"
          ></el-input>
        </el-form-item>

        <el-form-item prop="userage">
          <el-input class="age" autocomplete="off" v-model="ruleForm.userage" placeholder="年龄"></el-input>
        </el-form-item>

        <el-radio-group v-model="ruleForm.usersex" size="medium" class="radio-group">
          <el-radio-button label="男">男</el-radio-button>
          <el-radio-button label="女">女</el-radio-button>
        </el-radio-group>

        <el-form-item prop="dep">
          <el-select v-model="depvalue" placeholder="请选择" class="select">
            <el-option
              v-for="item in depart"
              :key="item.departId"
              :label="item.departName"
              :value="item.departName"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="regbtn" type="success" @click="registerHander">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import URL from "../../service.config";
export default {
  data() {
    return {
      //组件选择
      issmall: false,
      islogin: false,
      islogo: true,
      isregister: false,
      //登录
      logingname: "",
      loginpassword: "",
      //注册

      depart: [],
      depvalue: [],
      // 表单验证
      ruleForm: {
        regname: "",
        regpassword: "",
        usertel: "",
        address: "",
        userage: "",
        usersex: "男"
      },
      //注册规则
      rules: {
        regname: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, message: "长度在3个字符以上", trigger: "blur" }
        ],
        regpassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        usertel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 8, max: 11, message: "长度在 8 到 11 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        userage: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { min: 2, max: 2, message: "年龄必须为两位", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    //获取部门
    axios({
      method: "get",
      url: URL.getdep
    })
      .then(res => {
        if (res.status == 200) {
          let data = res.data.data;
          for (let i = 0, len = data.length; i < len; i++) {
            this.depart.push(data[i]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    SelectLogin() {
      this.islogin = this.issmall = true;
      this.islogo = this.isregister = false;
    },
    SelectRegister() {
      this.islogin = this.islogo = false;
      this.isregister = this.issmall = true;
    },
    LoginSuccess() {
      this.$message({
        message: "恭喜你，登录成功",
        type: "success"
      });
      this.$router.push("/");
    },
    LoginError() {
      this.$message({
        message: "账号或密码错误，请您重新输入",
        type: "error"
      });
    },
    loginHander() {
      let formData = new FormData();
      formData.append("username", this.logingname);
      formData.append("password", this.loginpassword);
      axios({
        method: "post",
        url: URL.login,
        data: formData
      })
        .then(res => {
          if (res.data) {
            this.LoginSuccess();
          } else {
            this.LoginError();
          }
        })
        .catch(err => {
          this.$router.push("/err");
        });
      this.logingname = "";
    },

    RegisterSuccess() {
      this.$message({
        message: "恭喜你，注册成功，请先登录",
        type: "success"
      });
      this.SelectLogin();
    },

    RegisterError() {
      this.$message({
        message: "注册失败",
        type: "error"
      });
    },
    registerHander() {
      let formData = new FormData();
      formData.append("username", this.ruleForm.regname);
      formData.append("password", this.ruleForm.regpassword);
      formData.append("address", this.ruleForm.address);
      formData.append("tel", this.ruleForm.usertel);
      formData.append("age", this.ruleForm.userage);
      formData.append("sex", this.ruleForm.usersex);
      formData.append("depment", this.depvalue);
      axios({
        method: "post",
        url: URL.register,
        data: formData
      })
        .then(res => {
          if (res.data) {
            console.log(res);
            this.RegisterSuccess();
          } else {
            this.RegisterError();
          }
        })
        .catch(err => {
          // this.$router.push("/err");
          // console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-group {
  margin-left: 110px;
  margin-top: -20px;
  margin-bottom: 25px;
}
.register {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -150px;
}
.age {
  position: absolute;
  width: 100px;
}
.radio {
  position: absolute;
  right: 10px;
  margin-left: 150px;
  margin-top: -30px;
}
.loginbtn {
  position: relative;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  margin-top: 20px;
}
.input {
  height: 50px;
  width: 300px;
}
.rgs {
  position: absolute;
  background: #008de1;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  &-logo {
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -250px;
    width: 500px;
    height: 500px;
  }
  &-small {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 300px;
    height: 300px;
  }
  &-select {
    float: right;
    margin-top: 40px;
    margin-right: 50px;
    // background-color: #fff;
    &-login {
      margin-right: 20px;
    }
  }
  &-content {
    width: 300px;
    height: 240px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -120px;
    margin-left: -150px;
  }
}
</style>