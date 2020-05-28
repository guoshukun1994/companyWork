<template>
    <div class="examine">
        <div class="examine-title">企业注册审核</div>
        <el-form :inline="true" :model="formInline" class="examine-form">
            <el-form-item label="企业编码:">
                <el-input v-model="formInline.compCD" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="企业名称:">
                <el-input v-model="formInline.compName" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="企业简称:">
                <el-input v-model="formInline.compSimp" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="企业法人:">
                <el-input v-model="formInline.leader" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="注册时间:">
                <div class="block">
                    <el-date-picker
                        v-model="registerValue"
                        @change="getTimeArray"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="审核状态:" style="margin-left:20px">
                <el-radio-group v-model="radio">
                    <el-radio
                        v-for="item in [
                            { key: '2', value: '待审核' },
                            { key: '0', value: '审核通过' },
                            { key: '9', value: '审核未通过' }
                        ]"
                        :key="item.key"
                        @click.native.prevent="clickitemOne(item.key)"
                        :label="item.key"
                        >{{ item.value }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button
                    @click="searchCompInfo"
                    type="primary"
                    class="examine-query"
                    icon="el-icon-search"
                    >查 询</el-button
                >
            </el-form-item>
        </el-form>
        <div class="examine-line"></div>
        <div style="width:95%;margin:0 auto;margin-top:10px">
            <el-button
                @click="verBusiness"
                type="primary"
                class="examine-ver"
                icon="el-icon-star-on"
                >企业审核</el-button
            >
        </div>
        <el-table
            ref="tableData"
            :data="tableData"
            @selection-change="handleSelectionChange"
            v-loading="tableDataLoading"
            :row-style="changeRowColor"
            :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
            @current-change="tableCurrentChange"
            style="width: 95%;margin:0 auto;margin-top:10px"
            border
            element-loading-text
            element-loading-spinner="el-icon-loading"
        >
            >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="序号" align="center" width="80">
                <template slot-scope="scope">
                    <span>{{
                        (formInline.pageNum - 1) * formInline.pageSize + scope.$index + 1
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_CD"
                label="企业编码"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_Name"
                label="企业名称"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_Simp_Name"
                label="企业简称"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_Leader"
                label="企业法人"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="leader_Phone"
                label="法人电话"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_Contact"
                label="联系人"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="cont_Phone"
                label="联系人电话"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_Address"
                label="企业地址"
                align="center"
            ></el-table-column>
            <el-table-column prop="add_Date" label="注册时间" align="center" width="180">
                <template slot-scope="scope">{{
                    scope.row.add_Date == null
                        ? '无注册时间'
                        : changeTimestampInfo(scope.row.add_Date * 1000)
                }}</template>
            </el-table-column>
            <el-table-column label="审核状态" align="center" width="80" prop="del_Flag">
                <template slot-scope="scope">{{
                    scope.row.del_Flag == 0
                        ? '已通过'
                        : scope.row.del_Flag == 2
                        ? '待审核'
                        : '未通过'
                }}</template>
            </el-table-column>
        </el-table>
        <div class="examine-block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="formInline.pageNum"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="formInline.pageSize"
                :total="total"
                layout="total,sizes, prev, pager, next"
            ></el-pagination>
        </div>
        <el-dialog
            v-dialogDrag
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            title="企业审核"
            width="40%"
            center
        >
            <span>
                <el-form
                    ref="dialogVisibleData"
                    v-loading="dialogVisibleLoading"
                    :element-loading-text="dialogVisibleLoadingText"
                    :model="dialogVisibleData"
                    label-width="100px"
                    element-loading-spinner="el-icon-loading"
                >
                    <el-form-item label="企业编码:">
                        <el-input
                            v-model="dialogVisibleData.innerCompCD"
                            :disabled="true"
                            style="width:300px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称:" prop="innerCompName">
                        <el-input
                            v-model="dialogVisibleData.innerCompName"
                            :disabled="true"
                            style="width:300px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        :rules="[{ required: true, message: '请选择审核结果', trigger: 'blur' }]"
                        label="审核结果:"
                        prop="innerRadio"
                    >
                        <el-radio-group v-model="dialogVisibleData.innerRadio">
                            <el-radio
                                v-for="item in [
                                    { key: '0', value: '通过' },
                                    { key: '9', value: '未通过' }
                                ]"
                                :key="item.key"
                                @click.native.prevent="clickitemTwo(item.key)"
                                :label="item.key"
                                >{{ item.value }}</el-radio
                            >
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        :rules="[
                            { min: 10, max: 200, message: '长度为10到200个字符', trigger: 'blur' }
                        ]"
                        label="未通过理由:"
                        prop="reason"
                    >
                        <el-input
                            v-model="dialogVisibleData.reason"
                            :rows="4"
                            type="textarea"
                            placeholder="请填写未通过的理由(10个汉字<=理由<=200个字符)"
                        ></el-input>
                    </el-form-item>
                    <div style="width:100%;text-align:center">
                        <el-button @click="dialogVisible = false">关 闭</el-button>
                        <el-button @click="verComp('dialogVisibleData')" type="primary"
                            >提 交</el-button
                        >
                    </div>
                </el-form>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { checkComp, checkStatus } from '../../api/api';
import { log } from 'util';
export default {
    data() {
        return {
            formInline: {
                compCD: '',
                compName: '',
                compSimp: '',
                leader: '',
                startDate: '',
                endDate: '',
                status: '',
                pageSize: 10,
                pageNum: 1
            },

            total: 0,
            tableData: [],
            dialogVisibleData: {
                reason: '',
                innerRadio: '',
                innerCompCD: '',
                innerCompName: ''
            },
            registerValue: '',
            radio: '',
            dialogVisible: false,
            tableDataLoading: false,
            dialogVisibleLoading: false,
            dialogVisibleLoadingText: '',
            mul: [],
            exmineStatus: ''
        };
    },
    computed: {
        changeTimestampInfo() {
            return function(timestamp) {
                return this.changeTimestamp(timestamp);
            };
        }
    },
    created() {
        this.searchCompInfo();
    },
    methods: {
        clickitemOne(index) {
            index === this.radio ? (this.radio = '') : (this.radio = index);
            this.formInline.status = this.radio;
        },
        tableCurrentChange(currentRow, oldCurrentRow) {
            this.$refs.tableData.toggleRowSelection(currentRow);
        },
        clickitemTwo(index) {
            index === this.dialogVisibleData.innerRadio
                ? (this.dialogVisibleData.innerRadio = '')
                : (this.dialogVisibleData.innerRadio = index);
            this.dialogVisibleData.innerRadio = index;
            //   this.queryForm.synStatus = this.radio
        },
        verComp(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (
                        this.dialogVisibleData.innerRadio == 9 &&
                        this.dialogVisibleData.reason == ''
                    ) {
                        this.$notify({
                            title: '注意!',
                            message: '请输入未通过理由!',
                            type: 'warning'
                        });
                    } else {
                        this.dialogVisibleLoading = true;
                        this.dialogVisibleLoadingText = '审核操作中';
                        checkStatus(
                            {
                                compCD: this.dialogVisibleData.innerCompCD,
                                status: this.dialogVisibleData.innerRadio,
                                arguement: this.dialogVisibleData.reason
                            },
                            this.$store.getters.token
                        ).then((res) => {
                            this.dialogVisibleLoading = false;
                            this.dialogVisible = false;
                            if (res.code == 1) {
                                this.$notify({
                                    title: '成功!',
                                    message: '企业审核操作成功,请往该账户发送MOAC!',
                                    type: 'success'
                                });
                                this.searchCompInfo();
                            } else if (res.code == 2) {
                                this.searchCompInfo();
                            }
                        });
                    }
                }
            });
        },
        // if (this.innerRadio == "") {
        //   this.$notify({
        //     title: "注意!",
        //     message: "请选择审核结果!",
        //     type: "warning"
        //   })
        // } else if (this.innerRadio != "") {
        //   if (this.innerRadio == 9 && this.reason == "") {
        //     this.$notify({
        //       title: "注意!",
        //       message: "请填写未通过理由!",
        //       type: "warning"
        //     })
        //   } else {
        //     this.dialogVisibleLoading = true
        //     this.dialogVisibleLoadingText = "审核操作中"
        //     checkStatus(
        //       {
        //         compCD: this.innerCompCD,
        //         status: this.innerRadio,
        //         arguement: this.reason
        //       },
        //       this.$store.getters.token
        //     ).then(res => {
        //       this.dialogVisibleLoading = false
        //       this.dialogVisible = false
        //       if (res.code == 1) {
        //         this.$notify({
        //           title: "成功",
        //           message: "企业审核操作成功!",
        //           type: "success"
        //         })
        //         this.searchCompInfo()
        //       }
        //     })
        //   }
        // }
        // },
        onSubmit() {},
        verBusiness() {
            if (
                this.dialogVisibleData.innerCompName != '' &&
                this.dialogVisibleData.innerCompCD != ''
            ) {
                if (this.exmineStatus != 2) {
                    this.$notify({
                        title: '注意!',
                        message: '该企业已经审核结束,无法再次审核!',
                        type: 'warning'
                    });
                } else {
                    this.dialogVisible = true;
                }
            } else {
                this.$notify({
                    title: '注意!',
                    message: '请选择需要审核的企业!',
                    type: 'warning'
                });
            }
        },
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.tableData.clearSelection();
                this.$refs.tableData.toggleRowSelection(val.pop());
            } else if (val.length == 1) {
                this.dialogVisibleData.innerCompName = val[0].comp_Name;
                this.dialogVisibleData.innerCompCD = val[0].comp_CD;
                this.exmineStatus = val[0].del_Flag;
            } else if (val.length != 1) {
                this.dialogVisibleData.innerCompName = '';
                this.dialogVisibleData.innerCompCD = '';
            }
        },
        handleSizeChange(val) {
            this.formInline.pageSize = val;
            this.formInline.pageNum = 1;
            this.changePageComInfo();
        },
        handleCurrentChange(val) {
            this.formInline.pageNum = val;
            this.changePageComInfo();
        },
        changeTimestamp(timestamp) {
            const date = new Date(timestamp);
            const Y = date.getFullYear() + '-';
            const M =
                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                '-';
            const D = date.getDate() < 10 ? '0' + date.getDate() + ':' : date.getDate() + ' ';
            const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            const m =
                date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        searchCompInfo() {
            this.tableDataLoading = true;
            this.formInline.pageNum = 1;

            checkComp(this.formInline, this.$store.getters.token).then((res) => {
                this.tableDataLoading = false;

                if (res.code == 1) {
                    this.tableData = res.sql;
                    this.total = res.sum[0].total;
                }
            });
        },
        changePageComInfo() {
            this.tableDataLoading = true;
            checkComp(this.formInline, this.$store.getters.token).then((res) => {
                this.tableDataLoading = false;

                if (res.code == 1) {
                    this.tableData = res.sql;
                    this.total = res.sum[0].total;
                }
            });
        },
        getTimeArray(val) {
            if (val != null) {
                this.formInline.startDate = new Date(val[0]).getTime() / 1000;
                this.formInline.endDate = new Date(val[1]).getTime() / 1000;
            } else {
                this.formInline.startDate = '';
                this.formInline.endDate = '';
            }
        },
        changeRowColor({ row, rowIndex }) {
            // console.log("rowIndex", index)
            if (this.dialogVisibleData.innerCompCD == row.comp_CD) {
                return 'background-color:rgba(102, 177, 255, 0.5) ';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgba(208, 212, 225,0.3)';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.examine {
    thead .el-table-column--selection .cell {
        display: none;
    }

    &-title {
        width: 95%;
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(200, 200, 200, 0.6);
    }
    &-form {
        width: 95%;
        margin: 0 auto;
        margin-top: 10px;
    }
    &-query {
        width: 120px;
        background-color: rgb(48, 65, 86);
        color: white;
        float: right;
        border: 0px;
    }
    &-line {
        width: 95%;
        margin: 0 auto;
        height: 1px;
        background-color: rgba(200, 200, 200, 0.6);
        margin-top: -10px;
    }
    &-block {
        width: 95%;
        margin: 0 auto;
        text-align: center;
        margin-top: 10px;
    }
    &-ver {
        width: 120px;
        background-color: rgb(48, 65, 86);
        color: white;
        border: 0px;
    }
    /deep/.el-dialog__header {
        padding: 10px 10px 5px;
        height: 44px;
        background: rgba(42, 37, 66, 1);
    }
    /deep/.el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: white;

        float: left;
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
}
</style>

<style lang="scss">
.examine {
    thead .el-table-column--selection .cell {
        display: none;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
    .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td,
    .el-table__body tr.hover-row > td {
        background-color: rgba(102, 177, 255, 0.5) !important;
    }
}
</style>
