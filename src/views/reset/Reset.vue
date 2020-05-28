<template>
    <div
        v-loading="loadingOne"
        class="reset"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="reset-phone">
            <p style="font-size:26px;width:100%;text-align:center;color:rgba(255,255,255,0.6)">
                忘记密码
            </p>
            <div v-if="showNum !== 1">
                <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="80px">
                    <el-form-item label="登录账号" style="width:100%" prop="userCd">
                        <el-input v-model="form.userCd" style="width:400px"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="userPhone">
                        <el-input v-model="form.userPhone" style="width:270px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getPhoneCode" :disabled="!show" style="width:115px">
                            <span v-show="show">获取验证码</span>
                            <span v-show="!show" class="count">{{ count }} s</span>
                        </el-button>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verCode">
                        <el-input v-model="form.verCode" style="width:400px"></el-input>
                    </el-form-item>
                </el-form>
                <div style="width:100%;text-align:right;padding-right:20px">
                    <el-button @click="submitForm('form')" type="primary" style="width:190px"
                        >提交</el-button
                    >
                    <el-button @click="back" style="width:195px">返回</el-button>
                </div>
            </div>

            <div v-if="showNum === 1">
                <el-form
                    ref="checkForm"
                    :model="checkForm"
                    :rules="checkRules"
                    status-icon
                    label-width="100px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="密码" prop="newPsw">
                        <el-input
                            v-model="checkForm.newPsw"
                            type="password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkNewPsw">
                        <el-input
                            v-model="checkForm.checkNewPsw"
                            type="password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>

                    <!-- <el-form-item>
                    <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item> -->
                </el-form>
                <div style="width:100%;text-align:right">
                    <el-button
                        @click="submitFormCheck('checkForm')"
                        type="primary"
                        style="width:195px"
                        >提交</el-button
                    >
                    <el-button @click="back" style="width:190px">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sendSms, checkForgetPsw, modifySmsPsw } from '../../api/api';
import md5 from 'js-md5';
const TIME_COUNT = 60;
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (!regExp.test(value)) {
                callback(new Error('8-16位数字和字母组合密码'));
            }
            callback();
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.checkForm.newPsw) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                userCd: '',
                userPhone: '',
                verCode: ''
            },
            checkForm: {
                userCd: '',
                newPsw: '',
                checkNewPsw: ''
            },
            rules: {
                userCd: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
                userPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                verCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            checkRules: {
                newPsw: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkNewPsw: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            showNum: '',
            show: true,
            count: '',
            timer: null,
            loadingOne: false
        };
    },
    methods: {
        getPhoneCode() {
            if (!this.timer && this.form.userPhone !== '') {
                this.count = TIME_COUNT;
                this.show = false;

                sendSms({ phoneNum: this.form.userPhone }).then((res) => {
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                });
            } else if (this.form.userPhone === '') {
                this.$notify({
                    title: '注意!',
                    message: '请输入手机号!',
                    type: 'warning'
                });
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.checkForgetPswInfo();
                } else {
                    return false;
                }
            });
        },
        checkForgetPswInfo() {
            this.loadingOne = true;
            checkForgetPsw(this.form).then((res) => {
                this.loadingOne = false;

                if (res.code === 2) {
                    this.$notify({
                        title: '失败!',
                        message: '用户账号或手机号不存在!',
                        type: 'warning'
                    });
                } else if (res.code === 3) {
                    this.$notify({
                        title: '失败!',
                        message: '用户账号不存在!',
                        type: 'warning'
                    });
                } else if (res.code === 4) {
                    this.$notify({
                        title: '失败!',
                        message: '用户手机号不存在!',
                        type: 'warning'
                    });
                } else if (res.code === 5) {
                    this.$notify({
                        title: '失败!',
                        message: '系统异常,请联系管理员!',
                        type: 'warning'
                    });
                } else if (res.code === 6) {
                    this.$notify({
                        title: '失败!',
                        message: '系统异常，存在多个账号，请联系管理员!',
                        type: 'warning'
                    });
                } else if (res.code === 7) {
                    this.$notify({
                        title: '失败!',
                        message: '验证码无效!',
                        type: 'warning'
                    });
                } else if (res.code === 1) {
                    this.$notify({
                        title: '成功!',
                        message: '验证成功,请修改密码!',
                        type: 'success'
                    });
                    this.showNum = 1;
                    this.checkForm.userCd = res.userCd;
                }
            });
        },
        submitFormCheck(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let loginFormInfo = {};
                    loginFormInfo = JSON.parse(JSON.stringify(this.checkForm));
                    loginFormInfo.newPsw = md5(this.checkForm.newPsw);
                    modifySmsPsw({
                        userCd: loginFormInfo.userCd,
                        newPsw: loginFormInfo.newPsw
                    }).then((res) => {
                        if (res.code === 3) {
                            this.$notify({
                                title: '失败!',
                                message: '密码格式不对!',
                                type: 'warning'
                            });
                        } else if (res.code === 4) {
                            this.$notify({
                                title: '失败!',
                                message: '修改密码失败!',
                                type: 'warning'
                            });
                        } else if (res.code === 1) {
                            this.$notify({
                                title: '成功!',
                                message: '修改密码成功!',
                                type: 'success'
                            });
                            this.$router.push('/login');
                        }
                    });
                    this.modifySmsPswInfo();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        back() {
            this.$router.push('/login');
        }
    }
};
</script>

<style lang="scss" scoped>
.reset {
    background-color: rgb(45, 58, 75);
    height: 100%;
    &-phone {
        width: 500px;
        height: 500px;
        // background: red;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 500px;
        height: 400px;
        margin-left: -250px;
        margin-top: -200px;
    }
}
</style>
