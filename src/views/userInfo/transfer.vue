<template>
    <div class="transfer">
        <el-button
            v-if="userType == 2"
            @click="transferBut"
            class="transfer-button"
            icon="el-icon-sort"
            >批量转账</el-button
        >

        <el-dialog
            :visible.sync="dialogVisible"
            v-loading="loading"
            title="批量转账"
            width="70%"
            element-loading-spinner="el-icon-loading"
            center
        >
            <!-- <el-row style="margin-left:15px;">
                <el-col :span="4"
                    ><div class="grid-content bg-purple">
                        管理员姓名
                    </div></el-col
                >
                <el-col :span="11"
                    ><div class="grid-content bg-purple">
                        公钥地址
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="grid-content bg-purple">
                        账户余额(单位:MOAC )
                    </div></el-col
                >
                <el-col :span="4"
                    ><div class="grid-content bg-purple">
                        转账金额(单位:MOAC )
                    </div></el-col
                >
            </el-row>
            <el-form
                :inline="true"
                :prop="dynamicValidateForm"
                class="demo-form-inline"
                style="min-height:500px"
            >
                <el-form-item v-for="(item, index) in dynamicValidateForm" :index="index in dynamicValidateForm">
                    <el-input
                        :value="item.user_Name"
                        :disabled="true"
                        style="width:150px"
                    ></el-input>
                    <el-input
                        :value="item.public_Key"
                        :disabled="true"
                        style="width:430px"
                    ></el-input>
                    <el-input
                        v-model="item.balance"
                        :disabled="true"
                        style="width:150px"
                    ></el-input>
                    <el-input v-model="item.value" type="number" style="width:160px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="margin-top:-40px">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="transaction" type="primary">转 账</el-button>
            </div> -->

            <el-form
                ref="formData"
                :inline="true"
                :model="formData"
                label-width="85px"
                class="demo-dynamic"
            >
                <el-row>
                    <el-col
                        :span="24"
                        v-for="(domain, index) in formData.dynamicValidateForm"
                        :key="domain.key"
                        ><div class="grid-content bg-purple-dark">
                            <el-form-item label="用户编码:">
                                <el-input
                                    v-model="domain.user_CD"
                                    :disabled="true"
                                    style="width:100px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="公钥地址:">
                                <el-input
                                    v-model="domain.public_Key"
                                    :disabled="true"
                                    style="width:500px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="余额:">
                                <el-input
                                    v-model="domain.balance"
                                    :disabled="true"
                                    style="width:100px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                :rules="{
                                    required: true,
                                    message: '转账金额不能为空',
                                    trigger: 'blur'
                                }"
                                :prop="'dynamicValidateForm[' + index + '].value'"
                                label="转账金额:"
                            >
                                <el-input v-model="domain.value" style="width:100px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-button @click="cnacel">取 消</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
            <el-button @click="submitForm('formData')" type="primary">转 账</el-button>
        </el-dialog>
    </div>
</template>


<script>
import { batchTransfer } from '../../api/api';
export default {
    props: {
        transferData: Array
    },
    data() {
        return {
            dialogVisible: false,
            formData: {
                dynamicValidateForm: []
            },
            loading: false
        };
    },
    created() {
        this.userType = localStorage.getItem('user_Type');
    },
    methods: {
        transfer() {
            this.dialogVisible = true;
        },
        cnacel() {
            this.dialogVisible = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('请确认转账信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            this.loading = true;
                            for (let m = 0; m < this.formData.dynamicValidateForm.length; m++) {
                                if (this.formData.dynamicValidateForm[m].value === undefined) {
                                    this.$notify({
                                        title: '注意!',
                                        message: '缺少转账金额!',
                                        type: 'warning'
                                    });
                                    break;
                                } else if (m === this.formData.dynamicValidateForm.length - 1) {
                                    let tableData = JSON.parse(
                                        JSON.stringify(this.formData.dynamicValidateForm)
                                    );
                                    for (let p = 0; p < tableData.length; p++) {
                                        delete tableData[p].comp_CD;
                                        delete tableData[p].comp_Simp_Name;
                                        delete tableData[p].user_CD;
                                        delete tableData[p].user_Name;
                                        delete tableData[p].user_Type;
                                        delete tableData[p].user_Phone;
                                        delete tableData[p].user_Email;
                                        delete tableData[p].balance;
                                    }

                                    batchTransfer(
                                        { tableData: tableData },
                                        this.$store.getters.token
                                    ).then((res) => {
                                        this.loading = false;

                                        if (res.code === 1) {
                                            this.$notify({
                                                title: '成功!',
                                                message: '转账成功，请注意查收!',
                                                type: 'success'
                                            });
                                        } else if (res.code === 2) {
                                            this.$notify({
                                                title: '失败!',
                                                message: '转账失败!',
                                                type: 'warning'
                                            });
                                        }
                                    });
                                }
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消转账'
                            });
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            let index = this.formData.dynamicValidateForm.indexOf(item);
            if (index !== -1) {
                this.formData.dynamicValidateForm.splice(index, 1);
            }
        },

        transferBut() {
            if (!this.transferData.length) {
                this.$notify({
                    title: '注意!',
                    message: '请选择转账账号!',
                    type: 'warning'
                });
            }
            for (let i = 0; i < this.transferData.length; i++) {
                if (this.transferData[i].public_Key === null) {
                    this.$notify({
                        title: '注意!',
                        message: '请不要选择无公钥的账号!',
                        type: 'warning'
                    });
                    break;
                } else if (i === this.transferData.length - 1) {
                    this.formData.dynamicValidateForm = JSON.parse(
                        JSON.stringify(this.transferData)
                    );

                    this.dialogVisible = true;
                }
            }
        }
    }
};
</script>



// import { batchTransfer } from '../../api/api';
// export default {
//     props: {
//         transferData: Array
//     },
//     data() {
//         return {
//             userType: '',
//             dialogVisible: false,
//             dynamicValidateForm: []
//         };
//     },
//     created() {
//         this.userType = localStorage.getItem('user_Type');
//     },
//     methods: {
//         transfer() {
//             this.dynamicValidateForm = this.transferData;

//             if (!this.dynamicValidateForm.length) {
//                 this.$notify({
//                     title: '注意!',
//                     message: '请选择转账账号!',
//                     type: 'warning'
//                 });
//             }
//             for (let i = 0; i < this.dynamicValidateForm.length; i++) {
//                 if (this.dynamicValidateForm[i].public_Key === null) {
//                     this.$notify({
//                         title: '注意!',
//                         message: '请不要选择无公钥的账号!',
//                         type: 'warning'
//                     });
//                     break;
//                 } else if (i === this.dynamicValidateForm.length - 1) {
//                     this.dialogVisible = true;
//                 }
//             }
//         },

        transaction() {
            this.$confirm('请确认转账信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    for (let m = 0; m < this.dynamicValidateForm.length; m++) {
                        if (this.dynamicValidateForm[m].value === undefined) {
                            this.$notify({
                                title: '注意!',
                                message: '缺少转账金额!',
                                type: 'warning'
                            });
                            break;
                        } else if (m === this.dynamicValidateForm.length - 1) {
                            let tableData = JSON.parse(JSON.stringify(this.dynamicValidateForm));
                            for (let p = 0; p < tableData.length; p++) {
                                delete tableData[p].comp_CD;
                                delete tableData[p].comp_Simp_Name;
                                delete tableData[p].user_CD;
                                delete tableData[p].user_Name;
                                delete tableData[p].user_Type;
                                delete tableData[p].user_Phone;
                                delete tableData[p].user_Email;
                                delete tableData[p].balance;
                            }

                            batchTransfer({ tableData: tableData }, this.$store.getters.token).then(
                                (res) => {
                                    if (res.code === 1) {
                                        this.$notify({
                                            title: '成功!',
                                            message: '转账成功，请注意查收!',
                                            type: 'success'
                                        });
                                    } else if (res.code === 2) {
                                        this.$notify({
                                            title: '失败!',
                                            message: '转账失败!',
                                            type: 'warning'
                                        });
                                    }
                                }
                            );
                        }
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消转账'
                    });
                });
        }
    }
};



<style lang="scss" scoped>
.transfer {
    &-button {
        background-color: rgb(48, 65, 86);
        color: white;
        margin-top: 10px;
        width: 118px;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    // .bg-purple-dark {
    //     background: #99a9bf;
    // }
    // .bg-purple {
    //     background: #d3dce6;
    // }
    // .bg-purple-light {
    //     background: #e5e9f2;
    // }
    .grid-content {
        border-radius: 4px;
        min-height: 46px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
<style lang="scss">
.transfer {
    .el-dialog__body {
        text-align: center;
    }
    .el-form-item__error {
        margin-left: 0;
    }
}
</style>
