<template>
  <div
    class="register-container"
    v-loading="registerLoading"
    element-loading-text="用户注册中"
    element-loading-spinner="el-icon-loading"
  >
    <!-- <div style="width:20%;background:red;margin:0 auto;margin-top:100px">
      <img src="../../assets/star.png" />
      <div class="title">企业信息</div>
    </div>-->
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      :inline="true"
      label-width="100px"
    >
      <el-form-item style="width:77%;height:40px" class="conpInfo">
        <div>
          <!-- <img
            src="../../assets/star.png"
            style="vertical-align:middle;margin-right:20px;margin-top:-6px"
          /> -->
          <div class="title" style="margin-top:20px">企业信息</div>
        </div>
      </el-form-item>
      <el-form-item prop="compCD" label="企业编码:">
        <el-input
          v-model="registerForm.compCD"
          style="width:200px"
          placeholder="请输入企业编码"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="address" label="企业地址:">
        <el-input
          v-model="registerForm.address"
          style="width:200px"
          placeholder="请输入企业地址"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="compName" label="企业名称:">
        <el-input
          v-model="registerForm.compName"
          style="width:200px"
          placeholder="请输入企业名称"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="compSimp" label="企业简称:">
        <el-input
          v-model="registerForm.compSimp"
          style="width:200px"
          placeholder="请输入企业简称"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="compLeader" label="企业法人:">
        <el-input
          v-model="registerForm.compLeader"
          style="width:200px"
          placeholder="请输入企业法人"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="leaderPhone" label="法人电话:">
        <el-input
          v-model="registerForm.leaderPhone"
          style="width:200px"
          placeholder="请输入法人电话"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="compContact" label="联系人:">
        <el-input
          v-model="registerForm.compContact"
          style="width:200px"
          placeholder="请输入联系人"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="contPhone" label="联系人电话:">
        <el-input
          v-model="registerForm.contPhone"
          style="width:200px"
          placeholder="请输入联系人电话"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>

      <el-form-item style="width:77%;height:30px;" class="conpInfo">
        <div>
          <!-- <img
            src="../../assets/user.png"
            style="vertical-align:middle;margin-right:20px;margin-top:-8px"
          /> -->
          <span class="title">默认账号</span>
        </div>
      </el-form-item>

      <el-form-item prop="userCD" label="用户编码:">
        <el-input
          v-model="registerForm.userCD"
          style="width:130px"
          placeholder="请输入用户编码"
        />

        <span style="color:gray"><登录账号</span>
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>

      <el-form-item prop="userName" label="用户名称:">
        <el-input
          v-model="registerForm.userName"
          style="width:200px"
          placeholder="请输入用户名称"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>

      <el-form-item prop="password" label="密码:">
        <el-input
          v-model="registerForm.password"
          show-password
          style="width:200px"
          placeholder="请输入密码"
          type="password"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="checkPassword" label="确认密码:">
        <el-input
          v-model="registerForm.checkPassword"
          show-password
          style="width:200px"
          type="password"
          placeholder="请确认密码"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="phoneNum" label="手机号:">
        <el-input
          v-model="registerForm.phoneNum"
          style="width:200px"
          placeholder="请输入用户手机号"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-form-item prop="email" label="邮箱:">
        <el-input
          v-model="registerForm.email"
          style="width:200px"
          placeholder="请输入注册邮箱"
        />
        <div
          style="width:200px;height:1px;background:rgba(153,153,153,0.5)"
        ></div>
      </el-form-item>
      <el-row style="text-align:center">
        <el-button @click="toLogin">返回</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('registerForm')"
          >提交</el-button
        >
      </el-row>
      <!-- <el-checkbox v-model="checked" style="margin-top:20px;">
        <span style="color:white">已阅读并接受用户注册协议</span>
        <a style="color:rgb(102, 177, 255);" @click="open">《用户注册协议》</a>
      </el-checkbox>-->
    </el-form>
  </div>
</template>

<script>
import { register } from "../../api/api";
import md5 from "js-md5";
export default {
  name: "Register",
  data() {
    var validatePassword = (rule, value, callback) => {
      const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!regExp.test(value)) {
        callback(new Error("8-16位数字和字母组合密码"));
      }
      callback();
    };
    var validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号码格式!"));
      }
      callback();
    };
    var validateInfo = (rule, value, callback) => {
      let reg = /^[a-zA-Z\d~\!@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'\<,\>\.\?\/]+$/;
      if (!reg.test(value)) {
        callback(new Error("编码不能包含空格和汉字"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        compCD: "",
        compName: "",
        userCD: "",
        userName: "",
        password: "",
        compSimp: "",
        email: "",
        address: "",
        compLeader: "",
        leaderPhone: "",
        compContact: "",
        contPhone: "",
        checkPassword: "",
        phoneNum: ""
      },
      userCD: "",
      password: "",
      checked: true,
      registerLoading: false,
      show: true,
      count: "",
      timer: null,
      disabled: false,
      selectPhoneOptions: [
        {
          value: "1",
          label: "中国 +86"
        }
      ],

      selectPhone: "1",
      registerRules: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "blur" }
        ],
        checkPassword: [
          {
            required: true,
            message: "请再次确认密码",
            trigger: "blur"
          },
          { validator: validateCheckPassword, trigger: "blur" }
        ],
        compName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        userCD: [
          {
            required: true,
            message: "请输入用户编码",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          { validator: validateInfo, trigger: "blur" }
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        compSimp: [
          {
            required: true,
            message: "请输入企业简称",
            trigger: "blur"
          },
          ,
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        compCD: [
          {
            required: true,
            message: "请输入企业编码",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
          // { validator: validateInfo, trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "请输入注册邮箱",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请输入企业地址",
            trigger: "blur"
          },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        compLeader: [
          {
            required: true,
            message: "请输入企业法人",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        leaderPhone: [
          {
            required: true,
            message: "请输入法人电话",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        compContact: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        contPhone: [
          {
            required: true,
            message: "请输入联系人电话",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        phoneNum: [
          {
            required: true,
            message: "请输入用户电话",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ]
        // selectRole: [
        //   {
        //     required: true,
        //     message: "请选择角色",
        //     trigger: "blur"
        //   }
        // ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      primaryType: "primary"
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerLoading = true;
          let registerFormInfo = JSON.parse(JSON.stringify(this.registerForm));

          registerFormInfo.password = md5(this.registerForm.password);
          register(
            // compCD: this.registerForm.compCD,
            // compName: this.registerForm.compName,
            // userCD: this.registerForm.userCD,
            // userName: this.registerForm.userName,
            // password: this.registerForm.password,
            // compSimp: this.registerForm.compSimp,
            // phoneNum: this.registerForm.phoneNum,
            // email: this.registerForm.email,
            // address: this.registerForm.address,
            // compLeader: this.registerForm.compLeader,
            // leaderPhone: this.registerForm.leaderPhone,
            // compContact: this.registerForm.compContact,
            // contPhone: this.registerForm.contPhone
            registerFormInfo
          ).then(res => {
            this.registerLoading = false;

            if (res.code == 1) {
              this.$notify({
                title: "成功!",
                message: "正在审核中!",
                type: "success"
              });
              this.$router.push("/login");
            } else if (res.code == 2) {
              this.$notify({
                title: "失败!",
                message: "企业编码已存在,请重新输入!",
                type: "warning"
              });
            } else if (res.code == 3) {
              this.$notify({
                title: "失败!",
                message: "用户编码已存在,请重新输入!",
                type: "warning"
              });
            } else if (res.code == 5) {
              this.$notify({
                title: "失败!",
                message: "该手机号已注册!",
                type: "warning"
              });
            } else if (res.code == 6) {
              this.$notify({
                title: "失败!",
                message: "该企业名称已被注册,请重新注册!",
                type: "warning"
              });
            } else if (res.code == 4) {
              this.$notify({
                title: "失败!",
                message: "信息填写不完整!",
                type: "warning"
              });
            }
          });
          // } else {
          //   return false
        }
      });
    },
    toLogin() {
      this.$router.push("/login");
    },
    open() {
      this.$confirm(
        "检测到未保存的内容，是否在离开页面前保存修改？",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存",
          cancelButtonText: "放弃修改"
        }
      )
        .then(() => {
          this.$message({
            type: "info",
            message: "保存修改"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
    },
    getPhoneCodeInfo() {
      this.disabled = true;
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            this.disabled = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
// 字体有内联样式

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-icon-loading:before {
    color: rgba(235, 84, 5, 1);
  }
  .el-loading-spinner .el-loading-text {
    color: rgba(235, 84, 5, 1);
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0;
      color: black;
      height: 47px;
      caret-color: black;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-select {
    background-color: rgba(0, 0, 0, 0.1);
    width: 140px;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/login.png");
  // background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  // background-color: $bg;
  overflow: hidden;
  /deep/.forget-text {
    color: white;
    margin-left: 150px;
    text-decoration: underline;
  }
  /deep/.forget-text:hover {
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
  .login-form {
    width: 800px;
    max-width: 100%;
    margin: 0 auto;
    background: white;
    text-align: center;
    margin-top: 130px;
    border-radius: 4px;
    padding-bottom: 20px;
  }
  .register {
    float: right;
    margin-right: 60px;
    color: white;
    text-decoration: underline;
  }
  .register:hover {
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
  .join-moac {
    float: left;
    color: rgb(64, 158, 255);
    margin-left: 60px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .inputPhone {
    width: 290px;
    float: right;
    margin-top: -67px;
  }
  .selectPhone {
    width: 120px;
    margin-top: 20px;
    .el-select {
      border: 1px solid rgb(62, 73, 87);
      border-radius: 5px;
    }
  }
  .send-phonecode {
    float: right;
    margin-top: -70px;
    width: 290px;
    height: 45px;
  }
  .selectRole {
    width: 100%;
    border: 1px solid rgb(62, 73, 87);
    border-radius: 5px;
    background-color: rgb(40, 52, 67);
  }
  .conpInfo {
    // background-color: rgb(45, 58, 75);
    .title {
      color: #eb5405;
      font-size: 24px;
      vertical-align: middle;
      margin-left: 20px;
      font-weight: 550;
    }
  }
}
</style>
<style lang="scss">
.register-container {
  .el-form-item {
    background-color: #fff;
    // border-bottom: 1px solid rgba(153, 153, 153, 0.5);
    border-radius: 0px;
  }
  .el-form-item__label {
    line-height: 50px;
    color: #333333;
    background-color: white;
  }
  .el-form-item__error {
    padding-top: 10px;
  }
  .el-button {
    background: rgba(102, 102, 102, 1);
    border-color: rgba(102, 102, 102, 1);
    color: white;
  }
  .el-button--primary {
    background: rgba(235, 84, 5, 1);
    border-color: rgba(235, 84, 5, 1);
  }
}
</style>
