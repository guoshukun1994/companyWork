<template>
    <div v-loading="loading" element-loading-spinner="el-icon-loading" class="companyR">
        <div class="companyR-title">
            企业注册
        </div>
        <div class="companyR-theme"><span>*</span> 请完善企业信息</div>
        <div class="companyR-register">
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                :inline="true"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="企业编码:" prop="compCd">
                    <el-input v-model="ruleForm.compCd"></el-input>
                </el-form-item>
                <el-form-item label="企业名称:" prop="compName">
                    <el-input v-model="ruleForm.compName"></el-input>
                </el-form-item>
                <el-form-item label="企业简称:" prop="compSimp">
                    <el-input v-model="ruleForm.compSimp"></el-input>
                </el-form-item>
                <el-form-item label="企业地址:" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="企业法人:" prop="compLeader">
                    <el-input v-model="ruleForm.compLeader"></el-input>
                </el-form-item>
                <el-form-item label="法人电话:" prop="leaderPhone">
                    <el-input v-model="ruleForm.leaderPhone"></el-input>
                </el-form-item>
                <el-form-item label="联系人:" prop="compContact">
                    <el-input v-model="ruleForm.compContact"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话:" prop="contPhone">
                    <el-input v-model="ruleForm.contPhone"></el-input>
                </el-form-item>
                <el-form-item label="企业描述:" prop="compDescribe">
                    <el-input
                        v-model="ruleForm.compDescribe"
                        :rows="3"
                        type="textarea"
                        style="width:715px"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="compBussScope" label="经营范围:">
                    <el-input
                        v-model="ruleForm.compBussScope"
                        :rows="3"
                        type="textarea"
                        style="width:715px"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="compURL" label="企业网址:">
                    <el-input v-model="ruleForm.compURL" style="width:715px"></el-input>
                </el-form-item>
                <el-form-item class="compLOGO">
                    <el-upload
                        :auto-upload="false"
                        :on-remove="handleRemoveOne"
                        :on-change="handleChangeOne"
                        :file-list="logoList"
                        :limit="1"
                        class="upload-demo"
                        action
                        list-type="picture"
                    >
                        <el-button
                            @click="logoBut"
                            size="small"
                            type="primary"
                            style="width:350px;margin-left:100px"
                            >上传企业LOGO</el-button
                        >
                    </el-upload>
                    <div :class="{ logoActive: islogoActive }" style="margin-left:100px">
                        <!-- <div :class="{ logoActive: islogoActive }"> -->

                        <img
                            :src="logo"
                            style="width: 100%;height: 100%;margin:0 auto;width:350px;height:350px;"
                        />
                    </div>
                </el-form-item>
                <!-- ( png / jpg / jpeg / gif / tiff
                            格式,限1张,尺寸小于150*150) -->
                <el-form-item>
                    <el-upload
                        :on-remove="handleRemoveTwo"
                        :auto-upload="false"
                        :on-change="handleChangeTwo"
                        :file-list="photoList"
                        :limit="1"
                        class="upload-demo"
                        action
                        list-type="picture"
                    >
                        <el-button @click="photoBut" size="small" type="primary" style="width:350px"
                            >上传企业图片</el-button
                        >
                    </el-upload>
                    <div :class="{ photoActive: isphotoActive }">
                        <!-- <div :class="{ logoActive: islogoActive }"> -->

                        <img
                            :src="photo"
                            style="width: 100%;height: 100%;margin:0 auto;width:350px;height:350px;"
                        />
                    </div>
                </el-form-item>
                <el-form-item class="compPublic">
                    <el-upload
                        :on-remove="handleRemoveThree"
                        :auto-upload="false"
                        :on-change="handleChangeThree"
                        :file-list="publicList"
                        :limit="1"
                        class="upload-demo"
                        action
                        list-type="picture"
                    >
                        <el-button
                            @click="publicBut"
                            size="small"
                            type="primary"
                            style="width:350px"
                            >上传企业公众号</el-button
                        >
                    </el-upload>
                    <div :class="{ publicActive: ispublicActive }">
                        <img
                            :src="public"
                            style="width: 100%;height: 100%;margin:0 auto;width:350px;height:350px;"
                        />
                    </div>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button @click="submitForm('ruleForm')" type="primary">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item> -->
            </el-form>
            <div class="companyR-button">
                <el-button @click="resetForm('ruleForm')">清空</el-button>
                <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { compRegister, compDetailsNotRegistered } from '../../api/api';
export default {
    data() {
        let validateuserPhone = (rule, value, callback) => {
            const reg = /^1[0-9]{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入有效的手机号码'));
            } else {
                callback();
            }
        };
        let validateuserCompCd = (rule, value, callback) => {
            let reg = /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/;
            if (!reg.test(value)) {
                callback(new Error('只允许英文字母、数字和英文符号组成'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                compCd: '',
                compName: '',
                compSimp: '',
                address: '',
                compLeader: '',
                leaderPhone: '',
                compContact: '',
                contPhone: '',
                userCd: '',
                compDescribe: '',
                compBussScope: '',
                compURL: ''
            },
            logoList: [],
            photoList: [],
            publicList: [],
            logo: '',
            photo: '',
            public: '',
            compCD: '',
            loading: false,
            islogoActive: false,
            isphotoActive: false,
            ispublicActive: false,
            rules: {
                compCd: [
                    {
                        required: true,
                        message: '请输入企业编码',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在 1 到 20 个字符',
                        trigger: 'blur'
                    },
                    { validator: validateuserCompCd, trigger: 'blur' }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入企业地址',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 200,
                        message: '长度在 1 到 200 个字符',
                        trigger: 'blur'
                    }
                ],
                compName: [
                    {
                        required: true,
                        message: '请输入企业名称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                compSimp: [
                    {
                        required: true,
                        message: '请输入企业简称',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                compLeader: [
                    {
                        required: true,
                        message: '请输入企业法人',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                leaderPhone: [
                    {
                        required: true,
                        message: '请输入法人电话',
                        trigger: 'blur'
                    },
                    { validator: validateuserPhone, trigger: 'blur' }
                ],

                compContact: [
                    {
                        required: true,
                        message: '请输入联系人',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],

                contPhone: [
                    {
                        required: true,
                        message: '请输入联系人电话',
                        trigger: 'blur'
                    },
                    { validator: validateuserPhone, trigger: 'blur' }
                ],
                compDescribe: [
                    {
                        required: true,
                        message: '请输入企业描述',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 500,
                        message: '长度在 1 到 500 个字符',
                        trigger: 'blur'
                    }
                ],
                compBussScope: [
                    {
                        required: true,
                        message: '请输入企业经营范围',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 500,
                        message: '长度在 1 到 500 个字符',
                        trigger: 'blur'
                    }
                ],
                compURL: [
                    {
                        min: 1,
                        max: 100,
                        message: '长度在 1 到 100 个字符',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.ruleForm.userCd = localStorage.getItem('user_CD');
        this.compCD = localStorage.getItem('comp_CD');
        this.getcompDetailsInfo();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.loading = true;
                    // compRegister;
                    if (this.logo === '' && this.photo === '') {
                        this.$notify({
                            title: '注意!',
                            message: '请上传图片!',
                            type: 'warning'
                        });
                    } else if (this.photo === '') {
                        this.$notify({
                            title: '注意!',
                            message: '请上传企业图片!',
                            type: 'warning'
                        });
                    } else if (this.logo === '') {
                        this.$notify({
                            title: '注意!',
                            message: '请上传企业LOGO!',
                            type: 'warning'
                        });
                    } else {
                        this.loading = true;
                        const formData = new FormData();
                        formData.append('userCd', this.ruleForm.userCd);
                        formData.append('compCd', this.ruleForm.compCd);
                        formData.append('compName', this.ruleForm.compName);
                        formData.append('compSimp', this.ruleForm.compSimp);
                        formData.append('address', this.ruleForm.address);
                        formData.append('compLeader', this.ruleForm.compLeader);
                        formData.append('leaderPhone', this.ruleForm.leaderPhone);
                        formData.append('compContact', this.ruleForm.compContact);
                        formData.append('contPhone', this.ruleForm.contPhone);
                        formData.append('compDescribe', this.ruleForm.compDescribe);
                        formData.append('compBussScope', this.ruleForm.compBussScope);
                        formData.append('compURL', this.ruleForm.compURL);
                        formData.append('logo', this.logo);
                        formData.append('photo', this.photo);
                        formData.append('public', this.public);
                        console.log('public', this.public);
                        compRegister(formData, this.$store.getters.token).then((res) => {
                            this.loading = false;
                            if (res.code === 1) {
                                this.$notify({
                                    title: '成功!',
                                    message: '企业注册成功，等待平台审核后请重新登录!',
                                    type: 'success'
                                });
                                this.$refs['ruleForm'].resetFields();
                                this.logo = '';
                                this.photo = '';
                                this.photoList = [];
                                this.logoList = [];
                                this.publicList = [];
                                this.$store
                                    .dispatch('user/logout', this.$store.getters.token)
                                    .then(() => {
                                        this.$router.push('/login');
                                    });
                            } else if (res.code === 2) {
                                this.$notify({
                                    title: '失败!',
                                    message: '该企业编号已注册!',
                                    type: 'warning'
                                });
                            } else if (res.code === 3) {
                                this.$notify({
                                    title: '失败!',
                                    message: '缺少参数!',
                                    type: 'warning'
                                });
                            } else if (res.code === 4) {
                                this.$notify({
                                    title: '失败!',
                                    message: '该企业名称已注册!',
                                    type: 'warning'
                                });
                            } else if (res.code === 5) {
                                this.$notify({
                                    title: '失败!',
                                    message: '企业注册异常，请重试!',
                                    type: 'warning'
                                });
                            } else if (res.code === 6) {
                                this.$notify({
                                    title: '失败!',
                                    message: '系统异常，请重试!',
                                    type: 'warning'
                                });
                            } else if (res.code === 7) {
                                this.$notify({
                                    title: '失败!',
                                    message: '缺少图片信息!',
                                    type: 'warning'
                                });
                            } else if (res.code === 8) {
                                this.$notify({
                                    title: '失败!',
                                    message: '用户状态异常!',
                                    type: 'warning'
                                });
                            } else if (res.code === 9) {
                                this.$notify({
                                    title: '成功!',
                                    message: '企业信息修改成功!',
                                    type: 'success'
                                });
                                this.$store
                                    .dispatch('user/logout', this.$store.getters.token)
                                    .then(() => {
                                        this.$router.push('/login');
                                    });
                            }
                        });
                    }
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.logo = '';
            this.photo = '';
            this.logoList = [];
            this.photoList = [];
            this.publicList = [];
            this.islogoActive = true;
            this.isphotoActive = true;
            this.ispublicActive = true;
        },
        handleRemoveOne(file, fileList) {
            this.logo = '';
        },
        handleChangeOne(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;
            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.logoList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.logoList = [];
                return false;
            }
            // return isIMAGE && isLt1M
            this.logo = file.raw;
        },
        handleRemoveTwo(file, fileList) {
            this.photo = '';
        },
        logoBut() {
            this.logo = '';
            this.islogoActive = true;
        },
        photoBut() {
            this.photo = '';
            this.isphotoActive = true;
        },
        handleChangeTwo(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.photoList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.photoList = [];
                return false;
            }
            this.photo = file.raw;
        },
        // 公众号
        handleChangeThree(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;
            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.publicList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.publicList = [];
                return false;
            }
            this.public = file.raw;
        },
        handleRemoveThree(file, fileList) {
            this.public = '';
        },
        publicBut() {
            this.public = '';
            this.ispublicActive = true;
        },
        getcompDetailsInfo() {
            compDetailsNotRegistered({ compCD: this.compCD }, this.$store.getters.token).then(
                (res) => {
                    if (res.length === 0) {
                        this.islogoActive = true;
                        this.isphotoActive = true;
                        this.ispublicActive = true;
                    } else {
                        this.ruleForm.compCd = res[0].comp_CD;
                        this.ruleForm.compName = res[0].comp_Name;
                        this.ruleForm.compSimp = res[0].comp_Simp_Name;
                        this.ruleForm.address = res[0].comp_Address;
                        this.ruleForm.compLeader = res[0].comp_Leader;
                        this.ruleForm.compContact = res[0].comp_Contact;
                        this.ruleForm.contPhone = res[0].cont_Phone;
                        this.ruleForm.compDescribe = res[0].comp_Describe;
                        this.ruleForm.compBussScope = res[0].comp_Buss_Scope;
                        this.ruleForm.compURL = res[0].comp_URL;
                        this.ruleForm.leaderPhone = res[0].leader_Phone;
                        this.logo = res[0].comp_Logo;
                        this.photo = res[0].comp_Photo;
                        this.public = res[0].comp_Public;
                        this.logo === '' ? (this.islogoActive = true) : (this.islogoActive = false);
                        this.photo === ''
                            ? (this.isphotoActive = true)
                            : (this.isphotoActive = false);
                        this.public === ''
                            ? (this.ispublicActive = true)
                            : (this.ispublicActive = false);
                    }
                }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.companyR {
    .logoActive {
        display: none;
    }
    .photoActive {
        display: none;
    }
    .publicActive {
        display: none;
    }
    &-title {
        width: 95%;
        height: 50px;
        margin: 0 auto;
        line-height: 50px;
        border-bottom: 1px solid rgba(200, 200, 200, 0.6);
    }
    &-theme {
        width: 50%;
        margin: 0 auto;
        height: 50px;
        text-align: center;
        font-size: 26px;
        margin-top: 10px;
        color: gray;
        span {
            color: red;
        }
    }
    &-register {
        width: 50%;
        margin: 0 auto;
        margin-top: 10px;
        .el-input {
            width: 300px;
        }
    }
    &-button {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        .el-button {
            width: 100px;
        }
    }
}
</style>

<style lang="scss">
.companyR {
    .compLOGO {
        .el-upload-list--picture .el-upload-list__item {
            // display: inline;
            width: 350px;
            margin-left: 100px;
        }
    }
    .compPublic {
        // display: inline;
        width: 350px;
        margin-left: 100px;
    }
}
</style>
