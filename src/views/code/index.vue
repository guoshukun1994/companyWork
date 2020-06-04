<template>
    <div class="code">
        <div class="code-info">
            <div style="line-height:35px;border-bottom:1px solid rgba(200, 200, 200, 0.6);">
                历史标签查询
            </div>

            <div class="grid-content bg-purple-dark">
                <el-form
                    ref="queryForm"
                    :model="queryForm"
                    :inline="true"
                    class="info-queryForm"
                    style="margin-top:10px;overflow-x:hidden;padding-bottom:-10px"
                >
                    <el-form-item v-if="userType === '2'" label="企业编码:">
                        <el-input v-model="queryForm.compCD" clearable />
                    </el-form-item>
                    <el-form-item v-if="userType === '2'" label="企业名称:">
                        <el-input v-model="queryForm.compName" style="width:300px" clearable />
                    </el-form-item>

                    <el-form-item v-if="userType === '2'" label="企业简称:">
                        <el-input v-model="queryForm.compSimpName" style="width:300px" clearable />
                    </el-form-item>

                    <el-form-item v-if="userType === '2'" label="企业法人:">
                        <el-input v-model="queryForm.compLeader" clearable />
                    </el-form-item>

                    <el-form-item label="商品编码:">
                        <el-input v-model="queryForm.goodsCD" clearable />
                    </el-form-item>
                    <el-form-item label="商品名称:">
                        <el-input v-model="queryForm.goodsName" style="width:300px" clearable />
                    </el-form-item>
                    <el-form-item label="商品规格:">
                        <el-input v-model="queryForm.spen" style="width:300px" clearable />
                    </el-form-item>
                    <el-form-item label="验证码:">
                        <el-input v-model="queryForm.checkCode" style="width:300px" clearable />
                    </el-form-item>
                    <el-form-item label="标签日期:">
                        <el-date-picker
                            v-model="timestampValue"
                            @change="selectTime"
                            type="datetimerange"
                            bia
                            range-separator="-"
                            start-placeholder="生成开始日期"
                            end-placeholder="生成结束日期"
                            style="width:380px"
                        />
                    </el-form-item>
                    <el-form-item label="标签状态:">
                        <el-radio-group v-model="radio">
                            <el-radio
                                v-for="item in [
                                    { key: '3', value: '已消费' },
                                    { key: '4', value: '未消费' }
                                ]"
                                :key="item.key"
                                @click.native.prevent="clickitemOne(item.key)"
                                :label="item.key"
                                >{{ item.value }}</el-radio
                            >
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin-left:10px" label="存证状态:">
                        <el-radio-group v-model="envRadio">
                            <el-radio
                                v-for="item in [
                                    { key: '1', value: '未存证' },
                                    { key: '0', value: '已存证' }
                                ]"
                                :key="item.key"
                                @click.native.prevent="clickitemTwo(item.key)"
                                :label="item.key"
                                >{{ item.value }}</el-radio
                            >
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin-left:10px" label="删除状态:">
                        <el-radio-group v-model="delRadio">
                            <el-radio
                                v-for="item in [
                                    { key: '0', value: '未删除' },
                                    { key: '1', value: '已删除' }
                                ]"
                                :key="item.key"
                                @click.native.prevent="clickitemThree(item.key)"
                                :label="item.key"
                                >{{ item.value }}</el-radio
                            >
                        </el-radio-group>
                    </el-form-item>
                    <el-button
                        @click="searchBarInfo"
                        class="code-query"
                        icon="el-icon-search"
                        style="width:120px;"
                        >查 询</el-button
                    >
                </el-form>
            </div>

            <div style="width::100%;height:1px;background:rgb(220, 223, 230)"></div>
            <div
                v-if="userType !== '2'"
                style="width:20%;height:40px;margin-top:10px;line-height:40px;float:right;text-align:right"
            >
                <span style="color:gray">企业编码:</span>
                <span style="color:gray">{{ compCd }}</span
                >&nbsp;
                <span style="color:gray">企业简称:</span>
                <span style="color:gray">{{ compSimpleName }}</span>
            </div>
            <el-button
                @click="toCodeEnv"
                :loading="toCodeEnvLoading"
                class="code-rightbutton"
                icon="el-icon-circle-check"
                style="width:120px;"
                >标签存证</el-button
            >
            <ExportCode :codeData="multipleSelection" style="display:inline"></ExportCode>
            <ExportWechatCode
                :weChatCodeData="multipleSelection"
                style="display:inline"
            ></ExportWechatCode>
            <BulkDel
                :deleteData="multipleSelection"
                @childDe="childDe"
                @getData1="getData1"
                @getData2="getData2"
                style="display:inline"
            ></BulkDel>
            <BulkRe
                :reData="multipleSelection"
                @childRe="childRe"
                @getInfo1="getInfo1"
                @getInfo2="getInfo2"
                @changeDel1="changeDel1"
                @changeDel2="changeDel2"
                style="display:inline"
            ></BulkRe>
            <BulkExc :excelData="multipleSelection" style="display:inline"></BulkExc>

            <div style="height:700px;margin-top:10px;">
                <pl-table
                    ref="multipleTable"
                    :datas="codeInfo"
                    v-loading="tableLoading"
                    :element-loading-text="loadingText"
                    :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
                    @selection-change="handleSelectionChange"
                    :row-style="changeRowColor"
                    @row-click="handleRowClick"
                    :row-height="60"
                    :page-sizes="[10, 20, 50, 100, 500]"
                    :page-size="queryForm.pageSize"
                    :current-page="queryForm.pageNum"
                    @handlePageSize="handleSizeChange"
                    :pager-count="5"
                    :pt-total="totalNum"
                    pagination-layout="total, sizes, prev, pager, next"
                    big-data-checkbox
                    use-virtual
                    border
                >
                    <template slot="empty">
                        <div>无数据</div>
                    </template>
                    <pl-table-column
                        type="selection"
                        width="55"
                        align="center"
                        fixed="left"
                    ></pl-table-column>
                    <pl-table-column label="序号" width="60" type="index" align="center">
                        <template scope="scope">
                            <span>{{
                                scope.$index + (queryForm.pageNum - 1) * queryForm.pageSize + 1
                            }}</span>
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="存证状态"
                        align="center"
                        width="80"
                        ><template v-slot="scope">
                            {{ scope.row.hashStatus }}
                        </template>
                        <!-- <template slot-scope="scope"> {{scope.row.hashStatus==''?'未存证':(scope.row.hashStatus==0?'存证失败':(scope.row.hashStatus==2?'已存证':'存证中'))}}</template> -->
                    </pl-table-column>
                    <pl-table-column label="商品编码" width="150" align="center">
                        <template v-slot="scope">
                            {{ scope.row.goods_CD }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="商品名称"
                        align="center"
                        width="150"
                    >
                        <template v-slot="scope">
                            {{ scope.row.goods_Name }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="商品规格"
                        align="center"
                        width="150"
                    >
                        <template v-slot="scope">
                            {{ scope.row.goods_Spen }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="保质期"
                        align="center"
                        width="80"
                    >
                        <template v-slot="scope">
                            {{ scope.row.shelf_life }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="批次号"
                        align="center"
                        width="120"
                    >
                        <template v-slot="scope">
                            {{ scope.row.goods_lot }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="产品价格(元)"
                        align="center"
                        width="120"
                    >
                        <template slot-scope="scope">{{ tofix(scope.row.goods_Pric) }}</template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="验证码"
                        align="center"
                        width="150"
                        ><template v-slot="scope">
                            {{ scope.row.check_code }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="消费码"
                        width="520"
                        align="center"
                        ><template v-slot="scope">
                            {{ scope.row.consume_code }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="标签存证Hash"
                        prop="reg_hash"
                        align="center"
                        width="520"
                    >
                        <template slot-scope="scope">{{
                            scope.row.reg_hash === null ? '暂无存证' : scope.row.reg_hash
                        }}</template>
                    </pl-table-column>
                    <pl-table-column label="存证时间" align="center" width="170">
                        <template slot-scope="scope">{{
                            scope.row.reg_Hash_Datetime === null
                                ? '暂无存证时间'
                                : changeTimestampInfo(scope.row.reg_Hash_Datetime * 1000)
                        }}</template>
                    </pl-table-column>

                    <pl-table-column
                        v-if="userType === '2'"
                        :show-overflow-tooltip="true"
                        label="企业编码"
                        align="center"
                        width="100"
                        ><template v-slot="scope">
                            {{ scope.row.comp_CD }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        v-if="userType === '2'"
                        :show-overflow-tooltip="true"
                        label="企业简称"
                        align="center"
                        width="80"
                        ><template v-slot="scope">
                            {{ scope.row.comp_Simp_Name }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        v-if="userType === '2'"
                        :show-overflow-tooltip="true"
                        label="企业名称"
                        width="200"
                        align="center"
                        ><template v-slot="scope">
                            {{ scope.row.comp_Name }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        v-if="userType === '2'"
                        :show-overflow-tooltip="true"
                        label="企业法人"
                        width="100"
                        align="center"
                        ><template v-slot="scope">
                            {{ scope.row.comp_Leader }}
                        </template>
                    </pl-table-column>
                    <pl-table-column
                        :show-overflow-tooltip="true"
                        label="消费状态"
                        align="center"
                        width="80"
                        prop="consume_Status"
                    >
                        <template slot-scope="scope">{{
                            scope.row.consume_Status === '0' ? '未消费' : '已消费'
                        }}</template>
                    </pl-table-column>

                    <pl-table-column label="操作" align="center" width="80" fixed="right">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleDelete(scope.$index, scope.row)"
                                size="mini"
                                type="danger"
                                >删除</el-button
                            >
                        </template>
                    </pl-table-column>
                </pl-table>
            </div>
        </div>
    </div>
</template>

<script>
import { searchBar, delBindingBar, synInput } from '../../api/api';
import ExportCode from '../exportcode/ExportCode';
import ExportWechatCode from '../exportcode/ExportWechatCode';
import BulkDel from './BulkDel';
import BulkRe from './BulkRe';
import BulkExc from './BulkExc';

export default {
    components: {
        ExportCode,
        ExportWechatCode,
        BulkDel,
        BulkRe,
        BulkExc
    },
    data() {
        return {
            queryForm: {
                goodsCD: '',
                goodsName: '',
                compCD: '',
                goodslog: '',
                compName: '',
                compLeader: '',
                startTime: '',
                endTime: '',
                pageSize: 10,
                pageNum: 1,
                Chain: '',
                Spending: '',
                checkCode: '',
                spen: '',
                delFlag: '0'
            },
            totalNum: 0,
            radio: '',
            envRadio: '',
            delRadio: '0',
            tableData: [],
            tableHeader: [],
            timestampValue: [],
            codeInfo: [],
            multipleSelection: [],
            selectRow: [],
            userType: '',
            compCd: '',
            compSimpleName: '',
            checkCodes: '',
            loadingText: '',
            tableLoading: false,
            toCodeEnvLoading: false,
            currentStartIndex: 0,
            currentEndIndex: 500
        };
    },

    computed: {
        changeTimestampInfo() {
            return function(timestamp) {
                return this.changeTimestamp(timestamp);
            };
        },
        tofix() {
            return function(num) {
                return Number(num).toFixed(2);
            };
        }
    },
    watch: {
        multipleSelection(data) {
            this.selectRow = [];
            if (data.length > 0) {
                data.forEach((item, index) => {
                    // console.log('1111', item);
                    this.selectRow.push(this.codeInfo.indexOf(item));
                });
            }
        }
    },

    created() {
        this.userType = localStorage.getItem('user_Type');
        this.compCd = localStorage.getItem('comp_CD');
        this.compSimpleName = localStorage.getItem('comp_Simp_Name');
        this.searchBarInfo();
    },

    methods: {
        childRe(loading) {
            this.tableLoading = loading;
        },
        childDe(loading) {
            this.tableLoading = loading;
        },
        getData1(data) {
            this.codeInfo = data;
        },
        getData2(data) {
            this.totalNum = data;
        },
        getInfo1(data) {
            this.codeInfo = data;
        },
        getInfo2(data) {
            this.totalNum = data;
        },
        changeDel1(data) {
            this.delRadio = data;
        },
        changeDel2(data) {
            this.queryForm.delFlag = data;
        },
        clickitemOne(index) {
            index === this.radio ? (this.radio = '') : (this.radio = index);
            this.queryForm.Spending = this.radio;
        },
        clickitemTwo(index) {
            index === this.envRadio ? (this.envRadio = '') : (this.envRadio = index);
            this.queryForm.Chain = this.envRadio;
        },
        clickitemThree(index) {
            index === this.delRadio ? (this.delRadio = '') : (this.delRadio = index);
            this.queryForm.delFlag = this.delRadio;
        },
        handleCheckAllChange(val) {
            if (val.length > 0) {
                this.queryForm.Spending = val[0].status;
            } else {
                val = '';
                this.queryForm.Spending = '';
            }
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.tableLoading = true;

                    delBindingBar({ delCheckCode: row.check_code }, this.$store.getters.token).then(
                        (res) => {
                            this.tableLoading = false;
                            this.searchBarInfo();
                            if (res.code === 1) {
                                this.$notify({
                                    title: '成功!',
                                    message: '已存证的标签无法删除!',
                                    type: 'warning'
                                });
                            } else if (res.code === 2) {
                                this.$notify({
                                    title: '成功!',
                                    message: '删除成功!',
                                    type: 'success'
                                });
                            } else if (res.code === 3) {
                                this.$notify({
                                    title: '失败!',
                                    message: '删除异常!',
                                    type: 'warning'
                                });
                            } else if (res.code === 4 || res.code == 5) {
                                this.$notify({
                                    title: '失败!',
                                    message: '标签已被导出,无法删除!',
                                    type: 'warning'
                                });
                            }
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        selectTime(timestampValue) {
            if (timestampValue !== null) {
                this.queryForm.startTime = new Date(timestampValue[0]).getTime() / 1000;
                this.queryForm.endTime = new Date(timestampValue[1]).getTime() / 1000;
            } else {
                this.queryForm.startTime = '';
                this.queryForm.endTime = '';
            }
        },
        exportExcel() {
            this.downloadLoading = true;
            import('@/vendor/Export').then((excel) => {
                const tHeader = [
                    '商品编码',
                    '商品名称',
                    '批次号',
                    '产品价格',
                    '验证码',
                    '消费码',
                    '标签存证',
                    '存证时间',
                    '企业编码',
                    '企业简称'
                ];
                excel.export_json_to_excel({
                    header: tHeader,
                    data: '',
                    filename: this.filename
                });

                this.downloadLoading = false;
            });
            // }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) => filterVal.map((j) => v[j]));
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
            let envData = [];
            if (val.length > 0) {
                for (let i = 0; i < val.length; i++) {
                    envData.push(val[i].check_code);
                }
                this.checkCodes = envData;
            } else {
                this.checkCodes = [];
            }
        },
        toCodeEnv() {
            if (this.checkCodes === '') {
                this.$notify({
                    title: '注意!',
                    message: '请先选择存证条目!',
                    type: 'warning'
                });
            } else {
                this.toCodeEnvLoading = true;
                this.tableLoading = true;
                this.loadingText = '数据存证中';
                synInput({ checkCodes: this.checkCodes }, this.$store.getters.token).then((res) => {
                    this.toCodeEnvLoading = false;
                    this.tableLoading = false;
                    if (res.code === 1) {
                        this.$notify({
                            title: '成功!',
                            message: '存证成功!',
                            type: 'success'
                        });
                        this.searchBarInfo();
                    } else if (res.code === 2) {
                        this.$notify({
                            title: '失败!',
                            message: '存在已存证的数据,请勿重复存证!',
                            type: 'warning'
                        });
                    } else if (res.code === 3) {
                        this.$notify({
                            title: '失败!',
                            message: '条码未上传成功，请重新尝试!',
                            type: 'warning'
                        });
                    }
                });
            }
        },
        searchBarInfo() {
            if (this.userType !== 2) {
                this.queryForm.compCD = localStorage.getItem('comp_CD');
            }
            this.tableLoading = true;
            this.loadingText = '数据加载中';
            this.queryForm.pageNum = 1;
            searchBar(this.queryForm, this.$store.getters.token).then((res) => {
                if (res.code === 1) {
                    this.tableLoading = false;
                    this.codeInfo = res.sqlValue;
                    this.totalNum = res.total[0].total;
                } else if (res.code === 6) {
                    this.$notify({
                        title: '失败!',
                        message: '查询异常，请联系管理员!',
                        type: 'warning'
                    });
                }
            });
        },
        changePagesBar() {
            if (this.userType !== 2) {
                this.queryForm.compCD = localStorage.getItem('comp_CD');
            }
            this.tableLoading = true;
            searchBar(this.queryForm, this.$store.getters.token).then((res) => {
                if (res.code === 1) {
                    this.tableLoading = false;
                    this.codeInfo = res.sqlValue;
                    this.totalNum = res.total[0].total;
                } else if (res.code === 6) {
                    this.$notify({
                        title: '失败!',
                        message: '查询异常，请联系管理员!',
                        type: 'warning'
                    });
                }
            });
        },
        handleSizeChange(val) {
            if (this.queryForm.pageSize !== val.size) {
                this.queryForm.pageNum = 1;
            } else {
                this.queryForm.pageNum = val.page;
            }
            this.queryForm.pageSize = val.size;

            this.changePagesBar();
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

        changeRowColor({ row, rowIndex }) {
            if (this.selectRow.includes(rowIndex)) {
                return 'background-color:rgb(194, 224, 255)';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgb(230, 230, 230)';
            }
        },

        handleRowClick(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection([{ row: row }]); // 点击选中
        }
    }
};
</script>

<style lang="scss" scoped>
.code {
    &-info {
        width: 95%;
        margin: 0 auto;
    }
    &-leftbutton {
        float: left;
        margin-top: 10px;
        background-color: rgb(48, 65, 86);
        color: white;
    }
    &-rightbutton {
        margin-top: 10px;
        background-color: rgb(48, 65, 86);
        color: white;
    }
    // &-form {
    //     width: 100%;
    //     margin: 0 auto;
    //     border-top: 1px solid rgba(200, 200, 200, 0.6);
    // }
    &-query {
        width: 100px;
        background-color: rgb(48, 65, 86);
        color: white;
        float: right;
    }
}
</style>
<style lang="scss">
.code {
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
    .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td,
    .el-table__body tr.hover-row > td {
        background-color: rgba(102, 177, 255, 0.5) !important;
    }
    .plTableBox .myPagination {
        width: 100%;
        padding: 0px;
        text-align: center;
    }
}
</style>
