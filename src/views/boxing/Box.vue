<template>
    <div class="box">
        <div
            style="
                line-height: 35px;
                border-bottom: 1px solid rgba(200, 200, 200, 0.6);
                width: 95%;
                margin: 0 auto;
            "
        >
            商品装箱管理
        </div>
        <div
            style="
                width: 95%;
                margin: 0 auto;
                border-bottom: 1px solid rgba(200, 200, 200, 0.6);
                height: 115px;
                margin-top: 10px;
            "
        >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item v-if="userType == 2" label="企业名称:">
                    <el-select
                        v-model="formInline.compName"
                        @change="getCompName"
                        style="width: 100%;"
                        placeholder="请选择企业名称"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="item in compNameOptions"
                            :label="item.comp_Name"
                            :value="item"
                            :key="item.comp_Name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else label="企业名称:">
                    <el-input v-model="compName" :disabled="true" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="包装编码:">
                    <el-input v-model="formInline.box_CD" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="包装名称:">
                    <el-input v-model="formInline.box_Name" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="包装单位:">
                    <el-input v-model="formInline.box_unit" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="orderCodeStart">
                    <!-- <el-input v-model="formInline.start" style="width:310px"></el-input> -->
                    <el-input
                        v-model="formInline.orderCodeStart"
                        style="width: 160px;"
                        type="number"
                        placeholder="输入 - 后的流水号"
                    >
                        <!-- <template slot="prepend">{{compID}}-</template> -->
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <span style="color: gray;">到</span>
                </el-form-item>
                <el-form-item prop="orderCodeEnd">
                    <el-input
                        v-model="formInline.orderCodeEnd"
                        placeholder="输入 - 后的流水号"
                        style="width: 160px;"
                        type="number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="生产日期:">
                    <div class="block">
                        <el-date-picker
                            v-model="value"
                            @change="pickTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="是否存证:" style="margin-left: 50px;">
                    <el-radio-group v-model="radio1">
                        <el-radio
                            v-for="item in [
                                { key: '0', value: '未存证' },
                                { key: '1', value: '已存证' }
                            ]"
                            :key="item.key"
                            @click.native.prevent="clickitem(item.key)"
                            :label="item.key"
                            >{{ item.value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="包装层级:" style="margin-left: 50px;">
                    <el-radio-group v-model="radio2">
                        <el-radio
                            v-for="item in [
                                { key: '0', value: '顶级' },
                                { key: '1', value: '全部' }
                            ]"
                            :key="item.key"
                            @click.native.prevent="clickitem2(item.key)"
                            :label="item.key"
                            >{{ item.value }}</el-radio
                        >
                        <!-- <el-radio :label="3">顶级</el-radio>
                        <el-radio :label="6">全部</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button
                        @click="searchBoxInfo"
                        class="code-query"
                        icon="el-icon-search"
                        style="width: 120px; background-color: rgb(48, 65, 86); color: white;"
                        >查 询</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div style="width: 95%; margin: 0 auto; margin-top: 10px;">
            <!-- <el-button
        class="code-query"
        icon="el-icon-search"
        style="width:120px;background-color: rgb(48, 65, 86);color: white;"
      >查 询</el-button>-->
            <!-- <el-button
        class="code-query"
        icon="el-icon-search"
        style="width:120px;background-color: rgb(48, 65, 86);color: white;"
      >同步存证</el-button>-->
        </div>
        <el-table
            :data="tableData"
            v-loading="loadingOne"
            style="width: 95%; margin: 0 auto; margin-top: 10px;"
            border
            element-loading-spinner="el-icon-loading"
        >
            <!-- <el-table-column type="selection" width="50px" align="center"></el-table-column> -->
            <el-table-column label="序号" type="index" width="60" align="center">
                <template slot-scope="scope">
                    <span>{{
                        (formInline.pageNum - 1) * formInline.pageSize + scope.$index + 1
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="box_cd"
                label="包装编码"
                width="100"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="box_name"
                label="包装名称"
                width="180"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="box_unit"
                label="包装单位"
                align="center"
                width="80"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="check_code"
                label="包装验证码"
                width="300"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="consume_code"
                label="包装消费码"
                width="520"
                align="center"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="box_hash"
                label="包装存证Hash"
                width="520"
                align="center"
            ></el-table-column>
            <el-table-column prop="box_hash_date" label="存证时间" align="center" width="170">
                <template slot-scope="scope">{{
                    scope.row.box_hash_date == null
                        ? '暂无存证时间'
                        : changeTimestampInfo(scope.row.box_hash_date)
                }}</template>
            </el-table-column>
            <el-table-column
                prop="total"
                label="次级标签数量"
                align="center"
                width="120"
            ></el-table-column>
            <el-table-column prop="box_date" label="生产日期" width="170" align="center">
                <template slot-scope="scope">{{
                    scope.row.box_date == null
                        ? '无生成时间'
                        : changeTimestampInfo(scope.row.box_date)
                }}</template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_cd"
                label="企业编码"
                align="center"
                width="150"
            ></el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                prop="comp_Name"
                label="企业名称"
                align="center"
                width="150"
            ></el-table-column>
            <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="handleDio(scope.$index, scope.row)" type="danger" size="mini"
                        >详情</el-button
                    >
                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div style="width: 95%; margin: 0 auto; text-align: center; margin-top: 10px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="formInline.pageNum"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="formInline.pageSize"
                :total="total"
                layout="sizes, prev, pager, next,total"
            ></el-pagination>
        </div>
        <el-dialog v-dialogDrag :visible.sync="dialogVisible" title="包装内容详情" width="50%">
            <el-form :inline="true" :model="dioInfo" class="demo-form-inline">
                <el-form-item label="企业名称：">
                    <el-input
                        v-model="dioInfo.comp_Name"
                        :disabled="true"
                        style="width: 600px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="包装编码：">
                    <el-input
                        v-model="dioInfo.box_cd"
                        :disabled="true"
                        style="width: 200px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="包装名称：">
                    <el-input
                        v-model="dioInfo.box_name"
                        :disabled="true"
                        style="width: 200px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="包装单位：">
                    <el-input
                        v-model="dioInfo.box_unit"
                        :disabled="true"
                        style="width: 200px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="包装说明：">
                    <el-input
                        :disabled="true"
                        :value="dioInfo.box_remarks"
                        style="width: 800px;"
                        type="textarea"
                        rows="4"
                    ></el-input>
                </el-form-item>
                <el-form-item label="包装验证码：">
                    <el-input
                        v-model="dioInfo.check_code"
                        :disabled="true"
                        style="width: 200px;"
                    ></el-input>
                </el-form-item>
                <el-form-item label="包装消费码：">
                    <el-input
                        v-model="dioInfo.consume_code"
                        :disabled="true"
                        style="width: 200px;"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="height: 1px; width: 100%; background: rgb(220, 223, 230);"></div>
            <!-- <div style="margin-top:20px">次级标签数量:</div> -->
            <el-table
                :data="diaData"
                v-loading="dioLoading"
                style="width: 100%; margin-top: 20px;"
                border
                element-loading-spinner="el-icon-loading"
            >
                <!-- <el-table-column label="序号" type="index" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ (formInline.pageNum - 1) * formInline.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>-->
                <el-table-column label="序号" type="index" width="60" align="center">
                    <template slot-scope="scope">
                        <span>{{ (pageNumDio - 1) * pageSizeDio + scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="child_check_code"
                    label="验证码"
                    width="180"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="child_consume_code"
                    label="消费码"
                    width="550"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="total"
                    label="次级标签数量"
                    width="120"
                    align="center"
                ></el-table-column>
                <el-table-column prop="child_tag_type" label="标签类型" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.child_tag_type === 2 ? '箱子' : '商品' }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="detail_name"
                    label="商品/包装名称"
                    width="120"
                    align="center"
                ></el-table-column>
            </el-table>

            <div style="width: 100%; text-align: center; margin-top: 20px;">
                <el-pagination
                    @size-change="handleSizeChangeDio"
                    @current-change="handleCurrentChangeDio"
                    :current-page="pageNumDio"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="pageSizeDio"
                    :total="totalDio"
                    layout="total, sizes, prev, pager, next"
                ></el-pagination>
            </div>

            <!-- <span slot="footer" class="dialog-footer"> -->
            <!-- <div style="width:100%;text-align:center;margin-top:20px">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>-->

            <!-- </span> -->
        </el-dialog>
    </div>
</template>

<script>
import { searchBox, searchSecondary, showAllCompNameID } from '../../api/api';
import moment from 'moment';
export default {
    data() {
        return {
            formInline: {
                comp_CD: '',
                box_CD: '',
                box_Name: '',
                box_unit: '',
                orderCodeStart: '',
                orderCodeEnd: '',
                consume_code: '',
                box_hash_date_start: '',
                box_hash_date_endTime: '',
                Chain: '',
                pageNum: 1,
                pageSize: 10,
                //________________________________冯添加的参数
                box_status: ''
            },
            total: 0,
            tableData: [],
            diaData: [],
            dioInfo: {},
            value: '',
            radio1: '',
            radio2: '',
            pageNumDio: 1,
            pageSizeDio: 10,
            totalDio: 0,
            dialogVisible: false,
            userType: '',
            compCD: '',
            compName: '',
            compNameOptions: '',
            selectValue: [],
            loadingOne: false,
            dioLoading: false
        };
    },
    computed: {
        changeTimestampInfo() {
            return function(timestamp) {
                return this.changeTimestamp(timestamp);
            };
        }
    },
    mounted() {
        this.userType = localStorage.getItem('user_Type');
        this.compCD = localStorage.getItem('comp_CD');
        if (this.userType != 2) {
            this.formInline.comp_CD = this.compCD;
        }
        this.compName = localStorage.getItem('comp_Name');

        // this.searchBoxInfo();
        this.showAllCompNameIDInfo();
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        // handleSelectionChange(val) {
        //   console.log(val);
        // },
        handleCurrentChange(val) {
            this.formInline.pageSize = val;
            this.formInline.pageNum = 1;
            this.changePagesBoxInfo();
        },
        handleCurrentChangeDio(val) {
            this.formInline.pageNum = val;
            this.changePagesBoxInfo();
        },

        handleSizeChange(val) {
            this.pageSizeDio = val;
            this.pageNumDio = 1;

            this.changeDioPage();
        },
        handleSizeChangeDio(val) {
            this.pageNumDio = val;
            this.changeDioPage();
        },
        handleDio(index, row) {
            this.dioInfo = row;
            this.dialogVisible = true;
            this.searchSecondaryInfo();
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        searchBoxInfo() {
            if (this.selectValue == null || (this.selectValue.length == 0 && this.userType == 2)) {
                this.$notify({
                    title: '注意!',
                    message: '请先选择企业名称!',
                    type: 'warning'
                });
            } else {
                this.formInline.pageNum = 1;
                this.loadingOne = true;
                searchBox(this.formInline, this.$store.getters.token).then((res) => {
                    this.loadingOne = false;
                    console.log('res', res);
                    if (res.code == 1) {
                        console.log('objArr', res.objArr[0].count);
                        this.tableData = res.objArr;
                        this.total = res.objArr[0].count;
                    }
                });
            }
        },
        changePagesBoxInfo() {
            this.formLoading = true;
            searchBox(this.formInline, this.$store.getters.token).then((res) => {
                this.loadingOne = false;
                if (res.code == 1) {
                    this.tableData = res.objArr;
                    this.total = res.total[0].total;
                }
            });
        },
        changeDioPage() {
            this.dioLoading = true;
            searchSecondary(
                {
                    box_CD: this.dioInfo.box_cd,
                    pageSize: this.pageSizeDio,
                    pageNum: this.pageNumDio
                },
                this.$store.getters.token
            ).then((res) => {
                this.dioLoading = false;
                if (res.code == 1) {
                    this.diaData = res.objArr;
                    this.totalDio = res.total[0].total;
                }
            });
        },
        searchSecondaryInfo() {
            this.dioLoading = true;
            searchSecondary(
                {
                    box_CD: this.dioInfo.box_cd,
                    pageSize: this.pageSizeDio,
                    pageNum: this.pageNumDio
                },
                this.$store.getters.token
            ).then((res) => {
                this.dioLoading = false;
                if (res.code == 1) {
                    this.diaData = res.objArr;
                    this.totalDio = res.total[0].total;
                }
            });
        },
        pickTime(val) {
            if (val != null) {
                let date1 = new Date(val[0]);

                let date2 = new Date(val[1]);

                this.formInline.box_hash_date_start =
                    date1.getFullYear() +
                    '-' +
                    '0' +
                    (date1.getMonth() + 1) +
                    '-' +
                    '0' +
                    date1.getDate();
                // " " +
                // "0" +
                // date1.getHours() +
                // ":" +
                // "0" +
                // date1.getMinutes() +
                // ":" +
                // "0" +
                // date1.getSeconds();
                this.formInline.box_hash_date_endTime =
                    date2.getFullYear() +
                    '-' +
                    '0' +
                    (date2.getMonth() + 1) +
                    '-' +
                    '0' +
                    date2.getDate();
            } else {
                this.formInline.box_hash_date_start = '';
                this.formInline.box_hash_date_endTime = '';
            }
        },
        changeTimestamp(timestamp) {
            // const moment = require('moment');
            // module.exports = function fomatDataUtils(date) {
            //     return moment(date).format('YYYY-MM-DD HH:mm:ss');
            // };
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
        clickitem(index) {
            index === this.radio1 ? (this.radio1 = '') : (this.radio1 = index);
            this.formInline.Chain = this.radio1;
        },
        clickitem2(index) {
            index === this.radio2 ? (this.radio2 = '') : (this.radio2 = index);
            this.formInline.box_status = this.radio2;
        },
        showAllCompNameIDInfo() {
            this.tagDataCompNameLoading = true;
            showAllCompNameID(this.$store.getters.token).then((res) => {
                this.tagDataCompNameLoading = false;

                this.compNameOptions = res.allCompNameID;
            });
        },
        getCompName(val) {
            this.selectValue = val;
            if (val !== null) {
                this.formInline.compName = val.comp_Name;
                this.formInline.comp_CD = val.comp_CD;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.box {
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
}
</style>

<style lang="scss">
.box {
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
    .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td,
    .el-table__body tr.hover-row > td {
        background-color: rgba(102, 177, 255, 0.4) !important;
    }
    // .el-table th,
    // .el-table tr {
    //     background-color: rgba(214, 217, 221, 1) !important;
    // }
}
</style>
