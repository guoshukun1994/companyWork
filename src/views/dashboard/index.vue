<template>
    <div class="dashboard" style="width:90%;margin-left:20px;margin-top:20px">
        <el-form ref="userMsg" label-width="80px" style="width:400px">
            <el-form-item label="登录账号:">
                <el-input :value="userMsg.user_CD" :disabled="true" />
            </el-form-item>
            <el-form-item label="登录名称:">
                <el-input :value="userMsg.user_Name" :disabled="true" />
            </el-form-item>
            <el-form-item v-if="userMsg.user_Type != 2" label="企业ID:">
                <el-input :value="userMsg.comp_ID" :disabled="true" />
            </el-form-item>
            <el-form-item label="登录角色:">
                <el-input
                    :value="
                        userMsg.user_Type === '2'
                            ? '超级管理员'
                            : userMsg.user_Type === '1'
                            ? '管理员'
                            : '一般操作员'
                    "
                    :disabled="true"
                />
            </el-form-item>
            <el-form-item label="密码:">
                <el-input :disabled="true" value="******" style="width:215px" />
                <el-button @click="onSubmit" type="primary">修改密码</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            v-dialogDrag
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            title="修改密码"
            width="20%"
        >
            <span>
                <el-form
                    ref="psw"
                    :model="psw"
                    :rules="passRules"
                    v-loading="dialogVisibleLoading"
                    label-width="100px"
                    element-loading-text="修改密码中"
                    element-loading-spinner="el-icon-loading"
                >
                    <el-form-item label="旧密码:" prop="oldPass">
                        <el-input
                            v-model="psw.oldPass"
                            type="password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:" prop="newPass">
                        <el-input
                            v-model="psw.newPass"
                            type="password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码:" prop="checkPass">
                        <el-input
                            v-model="psw.checkPass"
                            type="password"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogVisible = false">关 闭</el-button>
                        <el-button @click="submitForm('psw')" type="primary">提 交</el-button>
                    </el-form-item>
                </el-form>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { modifyPSW } from '../../api/api';

export default {
    name: 'Dashboard',
    data() {
        let validateCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次确认新密码'));
            } else if (value !== this.psw.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        let validatePassword = (rule, value, callback) => {
            const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (!regExp.test(value)) {
                callback(new Error('请输入长度为8-16位由数字和字母组成的密码'));
            }
            callback();
        };

        return {
            userMsg: '',
            dialogVisibleLoading: false,
            dialogVisible: false,
            psw: { oldPass: '', newPass: '', checkPass: '' },
            passRules: {
                oldPass: [
                    {
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur'
                    }
                ],
                newPass: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
                    { validator: validatePassword, trigger: 'blur' }
                ],
                checkPass: [
                    {
                        required: true,
                        message: '请确认新密码',
                        trigger: 'blur'
                    },
                    { validator: validateCheckPass, trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters(['name'])
    },
    created() {
        this.userMsg = localStorage;
    },
    methods: {
        onSubmit() {
            this.dialogVisible = true;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogVisibleLoading = true;
                    modifyPSW(
                        {
                            userPSW: this.psw.oldPass,
                            newUserPSW: this.psw.newPass
                        },
                        this.$store.getters.token
                    ).then((res) => {
                        this.dialogVisibleLoading = false;

                        if (res.code === 2) {
                            this.$notify.error({
                                title: '错误',
                                message: '旧密码错误'
                            });
                        } else if (res.code === 1) {
                            this.$notify({
                                title: '成功',
                                message: '修改密码成功',
                                type: 'success'
                            });
                            this.$store
                                .dispatch('user/logout', this.$store.getters.token)
                                .then(() => {
                                    this.$router.push('/login');
                                })
                                .catch(() => {});
                            this.dialogVisible = false;
                        }
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-text {
        font-size: 12px;
        line-height: 46px;
    }
    /deep/.el-dialog__header {
        padding: 10px 10px 5px;
        height: 44px;
        background: rgba(42, 37, 66, 1);
    }
    /deep/.el-dialog__headerbtn {
        position: absolute;
        /* top: 20px; */
        top: 10px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 18px;
    }
    /deep/.el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: white;
        float: left;
    }
    /deep/.el-dialog__footer {
        padding: 10px 20px 20px;
        text-align: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-top: -40px;
    }
}
</style>
