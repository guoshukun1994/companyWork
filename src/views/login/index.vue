<template>
    <div
        v-loading="loading"
        class="login-container"
        element-loading-text="登录中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(42, 37, 66, 0.5)"
    >
        <div class="login-container-form">
            <el-row>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                        <div class="bg-purple-text">镁卡车轮精准溯源平台</div>
                        <div style="width:300px;margin:0 auto">
                            <div class="bg-purple-engName">
                                Accurate Traceability Management Platform based on Moac Blockchain
                            </div>
                        </div>
                        <div style="width:403px; margin: 0 auto">
                            <img src="../../assets/mkLogo.png" />
                        </div>
                    </div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content bg-purple-light">
                        <div class="bg-purple-light-dl">
                            登录
                        </div>
                        <el-form
                            ref="loginForm"
                            :model="loginForm"
                            :rules="loginRules"
                            auto-complete="on"
                            class="bg-purple-light-form"
                            style="margin-top:28px"
                        >
                            <el-form-item>
                                账号
                            </el-form-item>
                            <el-form-item prop="userCd">
                                <el-input
                                    ref="userCd"
                                    v-model="loginForm.userCd"
                                    placeholder="请输入登录账号"
                                    name="userCd"
                                    type="text"
                                    tabindex="1"
                                    auto-complete="off"
                                    @keyup.enter.native="handleLogin"
                                />
                            </el-form-item>
                            <el-form-item style="margin-top:40px">
                                密码
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input
                                    :key="passwordType"
                                    ref="password"
                                    v-model="loginForm.password"
                                    :type="passwordType"
                                    placeholder="请输入登录密码"
                                    name="password"
                                    @keyup.enter.native="handleLogin"
                                    tabindex="2"
                                    auto-complete="off"
                                />
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    :loading="loading"
                                    type="primary"
                                    @click.native.prevent="handleLogin"
                                    style="width:400px;margin-top:50px"
                                    >登录</el-button
                                >
                            </el-form-item>
                            <div
                                :loading="loading"
                                @click="register"
                                class="bg-purple-light-register"
                            >
                                没有账号，去注册
                            </div>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
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
.login-container {
    .el-icon-loading:before {
        color: rgba(235, 84, 5, 1);
    }
    .el-loading-spinner .el-loading-text {
        color: rgba(235, 84, 5, 1);
    }
}
.bg-purple-light {
    .el-input__inner {
        padding: 0;
        border-radius: 0;
        border-left: none;
        border-right: none;
        border-top: none;
        // height: 30px;
        // margin-top: -110px;
    }
    .el-form-item__content {
        margin-top: -20px;
    }
    .el-button--primary {
        background-color: rgba(235, 84, 5, 1);
        border-color: rgba(235, 84, 5, 1);
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
    background-image: url('../../assets/login.png');
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
    &-form {
        width: 1000px;
        height: 520px;
        background: white;
        border-radius: 4px;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -500px;
        margin-top: -260px;
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            // border-radius: 4px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            &-text {
                width: 403px;
                height: 40px;
                margin: 0 auto;
                margin-top: 112px;
                font-size: 30px;
                text-align: center;
            }
            &-engName {
                width: 250px;
                height: 40px;
                margin: 0 auto;
                // text-align: center;
                margin-top: 5px;
                font-size: 12px;
                color: #999999;
                line-height: 20px;
                float: left;
            }
            // float: left;
        }
        .bg-purple-light {
            &-dl {
                width: 370px;
                height: 36px;
                margin: auto;
                margin-top: 75px;
                color: #eb5405;
                font-size: 38px;
                text-align: center;
                font-weight: 550;
            }
            &-input {
                width: 370px;
                height: 90px;
                // background: red;
                margin: 0 auto;
                margin-top: 70px;
            }
            &-form {
                width: 400px;
                margin: 0 auto;
            }
            &-register {
                width: 400px;
                margin: 0 auto;
                height: 20px;
                text-align: center;
            }
            &-register:hover {
                cursor: pointer;
            }
        }
        .grid-content {
            // border-radius: 4px;
            min-height: 520px;
            border: 1px solid white;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
    }
}
</style>
