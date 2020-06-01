<template>
    <div
        v-loading="loading"
        class="login-container"
        element-loading-text="登录中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(42, 37, 66, 0.5)"
    >
        <div class="login-div">
            <div class="logonTitle">
                <div style="width:20%;float:left;height:100%;text-align:center;">
                    <img
                        src="../../assets/loginLogo (2).png"
                        style="width:70%;margin-top:25%;margin-left:10%"
                    />
                </div>
                <div class="title-container" style="height:100%;width:80%;float:right">
                    <div
                        class="title"
                        style="color:rgba(239,179,103,1);font-family:Microsoft YaHei;font-size:22px;padding-top:20px;font-size:24px"
                    >
                        墨 客 精 准 溯 源 平 台
                    </div>
                    <div style="text-align:center;font-size:18px;margin-top:13px;color:white">
                        Accurate Traceability Management Platform
                    </div>
                    <div style="text-align:center;margin-top:1px;font-size:18px;color:white">
                        based on Moac Blockchain
                    </div>
                </div>
            </div>

            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
                style="margin-top:18px"
            >
                <el-form-item prop="userCd">
                    <span class="svg-container">
                        <svg-icon icon-class="loginUser" />
                    </span>
                    <el-input
                        ref="userCd"
                        v-model="loginForm.userCd"
                        @keyup.enter.native="handleLogin"
                        placeholder="请输入登录账号"
                        name="userCd"
                        type="text"
                        tabindex="1"
                        auto-complete="off"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input
                        ref="password"
                        :key="passwordType"
                        v-model="loginForm.password"
                        :type="passwordType"
                        @keyup.enter.native="handleLogin"
                        placeholder="请输入登录密码"
                        name="password"
                        tabindex="2"
                        auto-complete="off"
                    />

                    <span @click="showPwd" class="show-pwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>

                <div
                    class="reset"
                    style="color:rgba(255,255,255,0.7);padding-top:2px;margin-bottom:2px"
                >
                    <span @click="toReset"> 忘记密码？</span>
                </div>

                <el-form-item style="float:left">
                    <el-button
                        :loading="loading"
                        @click.native.prevent="handleLogin"
                        type="primary"
                        style="margin-bottom:30px;height:45px;border-radius:5px;width:200px"
                        >登录</el-button
                    >
                </el-form-item>

                <el-form-item style="float:right;">
                    <el-button
                        :loading="loading"
                        @click.native.prevent="register"
                        type="primary"
                        style="height:45px;border-radius:5px;width:200px"
                        >注册</el-button
                    >
                </el-form-item>
            </el-form>
            <div
                style="width:100%;text-align:center;color:rgba(255, 2550, 255,0.5);margin-top:-10px"
            >
                使用建议:非IE浏览器，1920*1080分辨率下使用最佳
            </div>
            <div
                :class="{ active: isActive }"
                style="margin-top:20px;color:white;color:rgb(136, 150, 174);width:100%;text-align:center"
            >
                谷歌浏览器下载地址:
                <a href="https://www.google.cn/chrome/" style="color:rgba(64, 158, 255,0.9)"
                    >https://www.google.cn/chrome/</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import { loginSecond } from '../../api/api';
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                userCd: '',
                password: ''
            },

            loginRules: {
                userCd: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],

                password: [
                    {
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }
                ]
            },
            loading: false,
            fullscreenLoading: true,
            passwordType: 'password',
            redirect: undefined,
            isActive: true
        };
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },

    methods: {
        // messageInfo() {
        //   this.$alert("1920*1080分辨率下使用最佳", "使用建议", {
        //     confirmButtonText: "确定",
        //     callback: action => {
        //       // this.$message({
        //       //   type: "info",
        //       //   message: `action: ${action}`
        //       // })
        //     }
        //   })
        // },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
            } else {
                this.passwordType = 'password';
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                        this.loading = false;
                        this.$notify({
                            title: '注意',
                            message: '不支持当前IE浏览器，推荐使用谷歌、QQ等其他浏览器!',
                            type: 'warning'
                        });
                        this.isActive = false;
                    } else {
                        let loginFormInfo = {};
                        loginFormInfo = JSON.parse(JSON.stringify(this.loginForm));
                        loginFormInfo.password = md5(this.loginForm.password);
                        this.$store
                            .dispatch('user/login', loginFormInfo)
                            .then((response) => {
                                // console.log(1111, response);

                                this.loading = false;
                                //    这里是指定角色跳转路由，由于路由表设置有bug原因，只能在这里设置
                                // this.$store.dispatch('user/getInfo', response.token).then((res) => {
                                //     // console.log(777, response);

                                //     if (response.user_Type == 3) {
                                //         this.$router.push('/companyregister/addcompanyinfo');
                                //         // this.$router.go(0);
                                //     } else {
                                //         this.$router.push('/');
                                //         // this.$router.go(0);
                                //     }
                                // });

                                if (response.code == 1) {
                                    this.$router.push('/');

                                    this.loading = false;
                                } else {
                                    this.loading = false;
                                }

                                // if (response === 10) {
                                //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                                //     confirmButtonText: "确定",
                                //     cancelButtonText: "取消",
                                //     type: "warning"
                                //   }).then(() => {
                                //     loginSecond({ userCd: this.loginForm.userCd }).then(res => {
                                //       this.$store.dispatch("user/login", loginFormInfo)
                                //       this.$router.push("/")
                                //     })
                                //     this.$message({
                                //       type: "success",
                                //       message: "登录成功!"
                                //     })
                                //   })
                                // } else if (response == 1) {
                                // }
                            })
                            .catch((error) => {
                                this.loading = false;
                                this.$notify({
                                    title: '失败!',
                                    message: '连接服务器失败!',
                                    type: 'warning'
                                });
                            });
                    }
                } else {
                    return false;
                }
            });
        },
        register() {
            this.$router.push('/register');
        },
        toReset() {
            this.$router.push('/reset');
        }
        // openFullScreen() {
        //   const loading = this.$loading({
        //     lock: true,
        //     text: "Loading",
        //     spinner: "el-icon-loading",
        //     background: "rgba(0, 0, 0, 0.1)"
        //   })
        //   setTimeout(() => {
        //     loading.close()
        //   }, 2000)
        // }
    }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    /deep/.el-form-item__content {
        line-height: 40px;
        position: relative;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0.1) !important;
        border-radius: 5px;
        color: black;
        height: 45px;
    }

    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background-color: rgba(75, 71, 95, 0.1);
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;
            &:-webkit-autofill {
                transition: background-color 5000s ease-in-out 0s;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        color: #454545;
    }
    .login-form {
        /deep/.login-container .el-input input {
            color: black !important;
        }
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-image: url('../../assets/loginBG.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-color: $bg;
    overflow: hidden;
    /deep/.forget-text {
        color: white;
        margin-left: 150px;
        text-decoration: underline;
    }
    .active {
        display: none;
    }
    /deep/.forget-text:hover {
        color: rgb(64, 158, 255);
        cursor: pointer;
    }
    .login-form {
        position: relative;
        width: 420px;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
        margin-top: 40px;
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

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            // margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
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
    .logonTitle {
        width: 100%;
        height: 120px;

        margin: 0 auto;
        background: rgba(63, 55, 85, 1);
        // margin-top: 36px;
        // background: url("../../assets/loginLOGO.png");
    }
    .login-div {
        width: 500px;
        height: 380px;
        background-color: rgba(85, 81, 104, 0.3);
        position: absolute;
        top: 50%;
        margin-top: -175px;
        left: 50%;
        margin-left: -250px;
    }
    .reset {
        width: 100%;
        text-align: right;
        height: 20px;
        margin-top: -15px;
        line-height: 15px;
    }
    .reset:hover {
        cursor: pointer;
    }
}
</style>
