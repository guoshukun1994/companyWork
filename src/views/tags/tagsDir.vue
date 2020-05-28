<template>
    <div class="tags-dir">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">标签直接生成</div>
            </el-col>
        </el-row>

        <div
            style="width:95%;margin:0 auto;border-bottom: 1px solid rgba(200, 200, 200, 0.6);height:116px"
        >
            <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item v-if="userType === 2" label="企业名称:">
                    <el-select
                        v-model="formInline.compName"
                        @change="getCompId"
                        style="width:300px"
                        placeholder="请选择企业"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="item in compOptionsOne"
                            :label="item.comp_Name"
                            :value="item"
                            :key="item.comp_Name"
                            style="width:300px"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else label="企业名称:">
                    <!-- <el-input v-model="formInline.start" style="width:310px"></el-input> -->
                    <el-input :value="compName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="orderCodeStart">
                    <!-- <el-input v-model="formInline.start" style="width:310px"></el-input> -->
                    <el-input
                        v-model="formInline.orderCodeStart"
                        type="number"
                        placeholder="输入 - 后的流水号"
                    >
                        <template slot="prepend">{{ compID }}-</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <span style="color:gray">到</span>
                </el-form-item>
                <el-form-item prop="orderCodeEnd">
                    <el-input
                        v-model="formInline.orderCodeEnd"
                        placeholder="输入 - 后的流水号"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="标签生成日期:">
                    <el-date-picker
                        v-model="timeValue"
                        @change="getTimeStamp"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="导出次数:" prop="export">
                    <el-input v-model="formInline.export" type="number"></el-input>
                </el-form-item>
                <el-form-item label="绑定商品:">
                    <el-radio-group v-model="formInline.status">
                        <el-radio
                            v-for="item in [
                                { key: '1', value: '已绑定' },
                                { key: '0', value: '未绑定' }
                            ]"
                            :key="item.key"
                            @click.native.prevent="clickitem(item.key)"
                            :label="item.key"
                            >{{ item.value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-button
                    @click="searchCodePoolInfoOne('formInline')"
                    type="primary"
                    icon="el-icon-search"
                    class="tags-button"
                    style="float:right;width:118px"
                    >查 询</el-button
                >
            </el-form>
        </div>
        <div style="width:95%;margin:0 auto;text-align:left">
            <el-button
                @click="addTags"
                type="primary"
                style="margin-top:10px"
                icon="el-icon-circle-plus"
                class="tags-button"
                >标签生成</el-button
            >
            <el-button
                @click="handleDownload"
                type="primary"
                style="margin-top:10px"
                icon="el-icon-document"
                class="tags-button"
                >导出Excel</el-button
            >
            <ExportCode :codeData="multipleSelection" style="display:inline"></ExportCode>
        </div>
        <div style="height:700px">
            <pl-table
                ref="multipleTable"
                :datas="tableData"
                :row-style="changeRowColor"
                :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
                @selection-change="handleSelectionChange"
                v-loading="homeTableLoading"
                :row-height="60"
                :page-sizes="[10, 20, 50, 100, 500]"
                :page-size="formInline.pageSizee"
                :current-page="formInline.pageNum"
                :pt-total="total"
                @handlePageSize="handleSizeChange"
                @row-click="handleRowClick"
                border
                big-data-checkbox
                pagination-layout="total, sizes, prev, pager, next"
                use-virtual
                style="width:95%;margin:0 auto;margin-top:10px"
                element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading"
            >
                <pl-table-column type="selection" width="55" align="center"></pl-table-column>
                <pl-table-column label="序号" type="index" width="80" align="center">
                    <template scope="scope">
                        <span>{{
                            scope.$index + (formInline.pageNum - 1) * formInline.pageSize + 1
                        }}</span>
                    </template>
                </pl-table-column>
                <pl-table-column
                    :show-overflow-tooltip="true"
                    prop="comp_CD"
                    label="企业编码"
                    width="100"
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    :show-overflow-tooltip="true"
                    prop="comp_ID"
                    label="企业ID"
                    width="100"
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    :show-overflow-tooltip="true"
                    prop="comp_Name"
                    label="企业名称"
                    width="150"
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="check_code"
                    label="验证码"
                    width="200"
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    :show-overflow-tooltip="true"
                    prop="consume_code"
                    label="消费码"
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="upd_date"
                    label="生成日期"
                    align="center"
                    width="180"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">{{
                        scope.row.upd_date === null
                            ? '无存证时间'
                            : changeTimestampInfo(scope.row.upd_date * 1000)
                    }}</template>
                </pl-table-column>
                <pl-table-column
                    prop="export"
                    label="导出次数"
                    align="center"
                    show-overflow-tooltip
                    width="120"
                ></pl-table-column>
                <pl-table-column
                    prop="status"
                    label="是否绑定商品"
                    align="center"
                    width="120"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">{{
                        scope.row.status == 0 ? '未绑定' : '已绑定'
                    }}</template>
                </pl-table-column>
            </pl-table>
        </div>

        <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            v-dialogDrag
            title="标签生成"
            width="30%"
            center
        >
            <span>
                <el-form
                    ref="addTagsForm"
                    :model="addTagsForm"
                    v-loading="addTagsLoading"
                    :element-loading-text="loadingText"
                    :rules="addTagsFormRules"
                    label-width="120px"
                    element-loading-spinner="el-icon-loading"
                >
                    <el-form-item
                        v-if="userType == 2"
                        :rules="[{ required: true, message: '请选择企业' }]"
                        label="企业名称:"
                        prop="compName"
                    >
                        <el-select
                            v-model="addTagsForm.compName"
                            @change="getLatestCode"
                            style="width:100%"
                            placeholder="请选择企业"
                            filterable
                        >
                            <el-option
                                v-for="item in optionsValueTwo"
                                :label="item.compName"
                                :value="item"
                                :key="item.compName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-else label="企业名称:">
                        <el-input v-model="addTagsForm.compName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="企业编码:">
                        <el-input :value="addTagsForm.compCD" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="当前最新验证码:">
                        <el-input :value="addTagsForm.newCode" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="生成条数:" prop="num">
                        <el-input v-model="addTagsForm.num" type="number"></el-input>
                    </el-form-item>
                    <el-form-item style="width:80%;margin: 0 auto">
                        <el-button @click="dialogVisible = false">关 闭</el-button>
                        <el-button @click="submitForm('addTagsForm')" type="primary"
                            >提 交</el-button
                        >
                    </el-form-item>
                </el-form>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    showAllCompNameID,
    searchCodePool,
    showLableCode,
    generateBars,
    exportLabelNum
} from '../../api/api';
import ExportCode from '../exportcode/ExportCode';
export default {
    components: { ExportCode },
    data() {
        let validateNum = (rule, value, callback) => {
            let reg = /[^\d]/;
            if (reg.test(value)) {
                callback(new Error('请输入整数'));
            }
            callback();
        };
        return {
            addTagsFormRules: {
                num: [
                    { required: true, message: '请输入生成条数' },
                    {
                        validator: validateNum,
                        trigger: 'blur'
                    }
                ]
            },
            formInline: {
                compName: '',
                compCD: '',
                dateStart: '',
                dateEnd: '',
                orderCodeStart: '',
                orderCodeEnd: '',
                export: '',
                status: '',
                pageSize: 10,
                pageNum: 1
            },
            addTagsForm: {
                compName: '',
                compCD: '',
                newCode: '',
                num: ''
            },

            total: 0,
            timeValue: '',
            optionsValueOne: '',
            optionsValueTwo: '',
            exportTimes: '',
            currentPage: '',
            dialogVisible: false,
            tableData: [],
            compOptionsOne: '',
            compOptionsTwo: '',
            compID: '',
            compName: '',
            userType: '',
            multipleSelection: [],
            addTagsLoading: false,
            loadingText: '',
            homeTableLoading: false,
            selectRow: [],
            selectData: []
        };
    },
    computed: {
        changeTimestampInfo() {
            return function(timestamp) {
                return this.changeTimestamp(timestamp);
            };
        }
    },
    watch: {
        selectData(data) {
            this.selectRow = [];
            if (data.length > 0) {
                data.forEach((item, index) => {
                    this.selectRow.push(this.tableData.indexOf(item));
                });
            }
        }
    },
    created() {
        this.userType = Number(localStorage.getItem('user_Type'));
        this.compName = localStorage.getItem('comp_Name');
        localStorage.getItem('comp_CD') === ''
            ? (this.formInline.compCD = '')
            : (this.formInline.compCD = localStorage.getItem('comp_CD'));
        this.searchCodePoolInfo();
        this.showLableCodeInfo();
        this.showAllCompNameInfo();
    },
    methods: {
        handleClose(done) {
            done();
        },

        searchCodePoolInfoOne(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.homeTableLoading = true;
                    this.formInline.pageNum = 1;
                    searchCodePool(this.formInline, this.$store.getters.token).then((res) => {
                        this.homeTableLoading = false;
                        if (res.code === 1) {
                            this.tableData = res.sqlSumValue;
                            this.total = res.sumMsg[0].total;
                        } else if (res.code === 2) {
                            this.$notify({
                                title: '失败!',
                                message: '查询异常,请联系管理员!',
                                type: 'warning'
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        handleSizeChange(val) {
            if (this.formInline.pageSize !== val.size) {
                this.formInline.pageNum = 1;
            } else {
                this.formInline.pageNum = val.page;
            }
            this.formInline.pageSize = val.size;
            this.changeSearchCodePoolInfo();
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addTagsLoading = true;
                    this.loadingText = '标签生成中';
                    generateBars(this.addTagsForm, this.$store.getters.token).then((res) => {
                        this.addTagsLoading = false;
                        this.searchCodePoolInfo();
                        if (res.code == 1) {
                            this.$notify({
                                title: '成功!',
                                message: '标签添加成功!',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.searchCodePoolInfo();
                        } else if (res.code == 2) {
                            this.$notify({
                                title: '失败!',
                                message: '当前流水码不是最新,请刷新重试!',
                                type: 'warning'
                            });
                            this.dialogVisible = false;
                            this.showAllCompNameInfo();
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        getLatestCode(val) {
            this.addTagsForm.compName = val.compName;
            // this.addTagsForm.compID = val.comp_ID
            this.addTagsForm.compCD = val.comp_CD;

            // this.addTagsForm.latestCode = val.max
            val.max == null
                ? (this.addTagsForm.newCode = '未增加验证码')
                : (this.addTagsForm.newCode = val.max);
        },
        getCompId(val) {
            if (val == null) {
                this.compID = '';
            } else {
                this.formInline.compName = val.comp_Name;
                this.compID = '$MP$' + val.comp_ID;
            }
        },
        getTimeStamp(val) {
            // let timeArray = val.map(item => {
            //   return new Date(item).getTime(item)
            // })
            // this.formInline.dateStart = timeArray[0]
            // this.formInline.dateEnd = timeArray[1]
            if (val != null) {
                this.formInline.dateStart = new Date(val[0]).getTime() / 1000;
                this.formInline.dateEnd = new Date(val[1]).getTime() / 1000;
            } else {
                this.formInline.dateStart = '';
                this.formInline.dateEnd = '';
            }
        },
        clickitem(index) {
            index === this.formInline.status
                ? (this.formInline.status = '')
                : (this.formInline.status = index);
        },
        showAllCompNameInfo() {
            showAllCompNameID(this.$store.getters.token).then((res) => {
                this.compOptionsOne = res.allCompNameID;
                this.compOptionsTwo = res.allCompNameID;
            });
        },
        showLableCodeInfo() {
            showLableCode(this.$store.getters.token).then((res) => {
                if (this.userType == 2) {
                    this.optionsValueTwo = res.arr;
                } else {
                    this.addTagsForm.compName = res.arr[0].compName;
                    this.addTagsForm.compID = res.arr[0].comp_ID;
                    this.addTagsForm.compCD = res.arr[0].compCD;

                    res.arr[0].max == null
                        ? (this.addTagsForm.newCode = '暂未添加验证码')
                        : (this.addTagsForm.newCode = res.arr[0].max);
                    // this.addTagsForm.newCode = res.arr[0].max
                }
            });
        },
        onSubmit() {
            console.log('submit!');
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.selectData = val;
        },

        handleDownload() {
            if (this.multipleSelection.length) {
                // this.downloadLoading = true
                import('../../vendor/ExportTags').then((excel) => {
                    const tHeader = [
                        '企业编码',
                        '企业ID',
                        '企业名称',
                        '验证码',
                        '消费码',
                        '生成日期',
                        '是否绑定商品'
                    ];
                    const filterVal = [
                        'comp_CD',
                        'comp_ID',
                        'comp_Name',
                        'check_code',
                        'consume_code',
                        'upd_date',
                        'status'
                    ];

                    // const list = [...this.multipleSelection]
                    const list = JSON.parse(JSON.stringify(this.multipleSelection));
                    for (let p = 0; p < list.length; p++) {
                        list[p].status == 0
                            ? (list[p].status = '未绑定')
                            : (list[p].status = '已绑定');
                        list[p].upd_date = this.changeTimestampInfo(list[p].upd_date * 1000);
                    }

                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename
                    });

                    let f = [];
                    for (let m = 0; m < this.multipleSelection.length; m++) {
                        f.push(this.multipleSelection[m].consume_code);
                    }
                    exportLabelNum({ exportCodes: f }, this.$store.getters.token).then((res) => {
                        this.searchCodePoolInfo();
                    });
                    this.$refs.multipleTable.clearSelection();
                    // this.downloadLoading = false
                });
            } else {
                this.$message({
                    message: '请选择导出条目数!',
                    type: 'warning'
                });
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) => filterVal.map((j) => v[j]));
        },
        addTags() {
            this.addTagsForm.compName = '';
            this.addTagsForm.compID = '';
            this.addTagsForm.newCode = '';
            this.addTagsForm.num = '';
            this.showAllCompNameInfo();
            this.showLableCodeInfo();

            this.dialogVisible = true;
        },
        changeRowColor({ row, rowIndex }) {
            if (this.selectRow.includes(rowIndex)) {
                return 'background-color:rgb(194, 224, 255)';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgb(230, 230, 230)';
            }
        },

        searchCodePoolInfo() {
            this.homeTableLoading = true;
            this.formInline.pageNum = 1;
            searchCodePool(this.formInline, this.$store.getters.token).then((res) => {
                this.homeTableLoading = false;
                if (res.code === 1) {
                    this.tableData = res.sqlSumValue;
                    this.total = res.sumMsg[0].total;
                } else if (res.code === 2) {
                    this.$notify({
                        title: '失败!',
                        message: '查询异常,请联系管理员!',
                        type: 'warning'
                    });
                }
            });
        },
        changeSearchCodePoolInfo() {
            this.homeTableLoading = true;
            searchCodePool(this.formInline, this.$store.getters.token).then((res) => {
                this.homeTableLoading = false;
                if (res.code === 1) {
                    this.tableData = res.sqlSumValue;
                    this.total = res.sumMsg[0].total;
                } else if (res.code === 2) {
                    this.$notify({
                        title: '失败!',
                        message: '查询参数异常!',
                        type: 'warning'
                    });
                }
            });
        },
        changeTimestamp(timestamp) {
            const date = new Date(timestamp);
            const Y = date.getFullYear() + '-';
            const M =
                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                '-';
            const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            const m =
                date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        handleRowClick(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection([{ row: row }]); // 点击选中
        }
    }
};
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    width: 95%;
    margin: 0 auto;
    line-height: 50px;
    border-bottom: 1px solid rgba(200, 200, 200, 0.6);
}
.grid-content {
    height: 50px;
}
.tags-button {
    background-color: rgb(48, 65, 86);
    color: white;
    border: 0px;
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
/deep/.el-dialog__header {
    padding: 10px 10px 5px;
    height: 44px;
    background: rgba(42, 37, 66, 1);
    text-align: left;
}
/deep/.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: white;
}
</style>
<style lang="scss">
.tags-dir {
    /deep/.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
    .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td,
    .el-table__body tr.hover-row > td {
        background-color: rgba(102, 177, 255, 0.5) !important;
    }

    .plTableBox .myPagination {
        width: 100%;
        padding-top: 10px;
        text-align: center;
    }
}
</style>
