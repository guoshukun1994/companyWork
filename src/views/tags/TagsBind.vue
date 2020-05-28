<template>
    <div class="tagsBind">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">商品标签绑定</div>
            </el-col>
        </el-row>

        <div
            style="width:95%;margin:0 auto;border-bottom: 1px solid rgba(200, 200, 200, 0.6);height:116px"
        >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="公司名称:">
          <el-input v-model="formInline.compName" style="width:300px"></el-input>
        </el-form-item>-->
                <el-form-item v-if="userType === 2" label="企业名称:">
                    <el-select
                        v-model="formInline.compName"
                        @change="getCompName"
                        :loading="formInlineLoading"
                        style="width:100%"
                        placeholder="请选择企业名称"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="item in compOptionsOne"
                            :label="item.comp_Name"
                            :value="item"
                            :key="item.comp_Name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else label="企业名称:">
                    <el-input
                        v-model="formInline.compName"
                        :disabled="true"
                        style="width:300px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品编码:">
                    <el-input v-model="formInline.goodsCD" style="width:270px"></el-input>
                </el-form-item>
                <el-form-item label="商品名称:">
                    <el-input v-model="formInline.goodsName" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="商品规格:">
                    <el-input v-model="formInline.spen" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="绑定日期:">
                    <div class="block">
                        <el-date-picker
                            v-model="timeValueOne"
                            @change="getTimeStamp"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="标签状态:">
                    <el-radio-group v-model="formInline.synInput">
                        <el-radio
                            v-for="(item, index) in [
                                { key: '1', value: '已同步存证' },
                                { key: '0', value: '未同步存证' }
                            ]"
                            :key="item.key"
                            @click.native.prevent="clickitem(item.key)"
                            :label="item.key"
                            >{{ item.value }}</el-radio
                        >
                    </el-radio-group>
                </el-form-item>
                <el-button
                    @click="searchBindingInfo"
                    type="primary"
                    icon="el-icon-search"
                    class="tags-button"
                    style="float:right;width:118px"
                    >查 询</el-button
                >
            </el-form>
        </div>
        <div style="width:95%;height:40px;margin:0 auto;margin-top:10px;text-align:left">
            <el-button
                @click="bindTags"
                v-if="userType === 2"
                type="primary"
                class="tags-button"
                icon="el-icon-caret-top"
                >标签绑定</el-button
            >
            <el-button
                @click="bindTagsInfo"
                v-else
                type="primary"
                class="tags-button"
                icon="el-icon-caret-top"
                >标签绑定</el-button
            >
            <el-button
                @click="synLabelsInfo"
                type="primary"
                class="tags-button"
                icon="el-icon-circle-check"
                >同步存证</el-button
            >
            <el-button @click="handleDownload" icon="el-icon-document" class="tags-button" style
                >导出Excel</el-button
            >
        </div>
        <div style="height:700px">
            <!-- <div class="block" style="width:95%;margin:0 auto;margin-top:10px;text-align:center">
            <el-pagination
                @size-change="handleSizeChangeOne"
                @current-change="handleCurrentChangeOne"
                :current-page.sync="formInline.pageNum"
                :page-sizes="[10, 20, 50, 100, 500]"
                :page-size="formInline.pageSize"
                :total="formInlineTotal"
                layout="total,sizes, prev, pager, next"
            ></el-pagination>
        </div> -->
            <pl-table
                ref="tableData"
                :datas="tableData"
                :row-style="changeRowColorTwo"
                :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
                @selection-change="handleSelectionChangeOne"
                @row-click="handleRowClick"
                @handlePageSize="handleSizeChangeOne"
                :pt-total="formInlineTotal"
                :page-size="formInline.pageSizee"
                :current-page="formInline.pageNum"
                v-loading="homeLoading"
                :row-height="60"
                pagination-layout="total, sizes, prev, pager, next"
                tooltip-effect="dark"
                style="width: 95%;margin:0 auto;margin-top:10px"
                border
                use-virtual
                big-data-checkbox
                element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading"
            >
                <pl-table-column
                    type="selection"
                    width="55"
                    align="center"
                    fixed="left"
                ></pl-table-column>
                <pl-table-column label="序号" type="index" width="60" align="center">
                    <template scope="scope">
                        <span>{{
                            scope.$index + (formInline.pageNum - 1) * formInline.pageSize + 1
                        }}</span>
                    </template>
                </pl-table-column>
                <pl-table-column
                    prop="goods_CD"
                    label="商品编码"
                    width="150"
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="goods_Name"
                    label="商品名称"
                    width="150"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="goods_Spen"
                    label="商品规格"
                    width="150"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="goods_lot"
                    label="批次号"
                    width="100"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="check_code"
                    label="验证码"
                    width="150"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="consume_code"
                    label="消费码"
                    width="520"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="reg_hash"
                    label="标签存证Hash"
                    show-overflow-tooltip
                    align="center"
                    width="520"
                >
                    <template slot-scope="scope">{{
                        scope.row.reg_hash == 0 || scope.row.reg_hash == '0'
                            ? (scope.row.reg_hash = '暂无存证')
                            : scope.row.reg_hash
                    }}</template>
                </pl-table-column>
                <pl-table-column
                    prop="reg_Hash_Datetime"
                    label="存证时间"
                    show-overflow-tooltip
                    align="center"
                    width="150"
                >
                    <template slot-scope="scope">{{
                        scope.row.reg_Hash_Datetime == 0
                            ? '暂无存证时间'
                            : changeTimestampInfo(scope.row.reg_Hash_Datetime * 1000)
                    }}</template>
                </pl-table-column>
                <pl-table-column
                    prop="comp_CD"
                    label="企业编码"
                    width="100"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="comp_Name"
                    label="企业名称"
                    width="200"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="hashStatus"
                    label="存证状态"
                    width="150"
                    show-overflow-tooltip
                    align="center"
                ></pl-table-column>
                <pl-table-column
                    prop="address"
                    label="操作"
                    show-overflow-tooltip
                    align="center"
                    width="100"
                    fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button
                            @click="handleDeleteOne(scope.$index, scope.row)"
                            size="mini"
                            type="warning"
                            >解 绑</el-button
                        >
                    </template>
                </pl-table-column>
            </pl-table>
        </div>

        <el-dialog
            :visible.sync="dialogVisible"
            v-dialogDrag
            :close-on-click-modal="false"
            title="商品标签绑定"
            width="50%"
        >
            <el-dialog
                :visible.sync="innerVisible"
                :close-on-click-modal="false"
                v-dialogDrag
                v-loading="true"
                width="65%"
                title="标签选择窗口"
                append-to-body
            >
                <div
                    v-loading="bindLoading"
                    element-loading-text="标签绑定中"
                    element-loading-spinner="el-icon-loading"
                >
                    <div
                        style="width:95%;margin:0 auto;border-bottom:1px solid rgba(200, 200, 200, 0.6);text-align:center"
                    >
                        <el-form
                            :inline="true"
                            :model="innerVisibleData"
                            class="demo-form-inline"
                            label-width="110px"
                        >
                            <el-form-item label="企业名称:">
                                <el-input
                                    v-model="innerVisibleData.compName"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品:">
                                <el-input
                                    :value="tagBindForm.goodsName"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品规格:">
                                <el-input
                                    :value="tagBindForm.goods_Spen"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品效期:">
                                <el-input
                                    :value="tagBindForm.goods_shelf_life"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品描述:">
                                <el-input
                                    :value="tagBindForm.goods_Describe"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="有效期:">
                                <el-input
                                    :value="tagBindForm.shelf_life"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="生产日期:">
                                <el-input
                                    :value="changeTimestampInfo(tagBindForm.product_date)"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="批次号:">
                                <el-input
                                    :value="tagBindForm.goods_lot"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格:">
                                <el-input
                                    :value="tagBindForm.goods_pric"
                                    :disabled="true"
                                    style="width:400px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品备注:">
                                <el-input
                                    :value="tagBindForm.goods_memo"
                                    :disabled="true"
                                    style="width:400px"
                                    type="textarea"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="验证码:">
                                <el-input
                                    v-model="innerVisibleData.orderCodeStart"
                                    type="number"
                                    placeholder="输入 - 后的流水号"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>至</el-form-item>
                            <el-form-item>
                                <el-input
                                    v-model="innerVisibleData.orderCodeEnd"
                                    placeholder="输入 - 后的流水号"
                                    type="number"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="标签生成日期:">
                                <el-date-picker
                                    v-model="innerVisibleTimeValue"
                                    @change="getInnerVisibleTimeValue"
                                    style="width:350px"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item style="float:right">
                                <el-button
                                    @click="searchLabelsInfo"
                                    type="primary"
                                    icon="el-icon-search"
                                    class="tags-button"
                                    >查 询</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </div>
                    <div style="height:310px;overflow:auto">
                        <el-table
                            ref="innerVisibleTabledata"
                            :data="innerVisibleTabledata"
                            :row-style="changeRowColorOne"
                            :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
                            @selection-change="handleSelectionChangeTwo"
                            @current-change="innerVisibleTabledataCurrentChange"
                            v-loading="innerVisibleTableLoading"
                            tooltip-effect="dark"
                            style="width: 95%;margin:0 auto;margin-top:20px"
                            border
                            element-loading-text="数据加载中"
                            element-loading-spinner="el-icon-loading"
                        >
                            <el-table-column
                                type="selection"
                                width="55"
                                align="center"
                            ></el-table-column>
                            <el-table-column label="序号" type="idnex" width="55" align="center">
                                <template scope="scope">
                                    <span>
                                        {{
                                            scope.$index +
                                                (innerVisibleData.pageNum - 1) *
                                                    innerVisibleData.pageSize +
                                                1
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="check_code"
                                label="验证码"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="consume_code"
                                label="消费码"
                                width="600"
                                show-overflow-tooltip
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="upd_date"
                                label="生成日期"
                                show-overflow-tooltip
                                align="center"
                            >
                                <template slot-scope="scope">
                                    {{ changeTimestampInfo(scope.row.upd_date * 1000) }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div
                        class="block"
                        style="width:95%;margin:0 auto;text-align:center;margin-top:10px"
                    >
                        <el-pagination
                            @size-change="handleSizeChangeThree"
                            @current-change="handleCurrentChangeThree"
                            :current-page.sync="innerVisibleData.pageNum"
                            :page-sizes="[5, 10, 20, 50]"
                            :page-size="innerVisibleData.pageSize"
                            :total="totalThree"
                            layout="total,sizes, prev, pager, next"
                        ></el-pagination>
                    </div>
                    <div style="width:95%;margin:0 auto;text-align:center;margin-top:20px">
                        <el-button @click="innerVisible = false">关 闭</el-button>
                        <el-button @click="scynDataToGoodsBind" type="primary">提 交</el-button>
                    </div>
                </div>
            </el-dialog>
            <!-- 商品标签绑定界面开始-->
            <div
                v-loading="tagsBindLoading"
                element-loading-text="标签绑定中"
                element-loading-spinner="el-icon-loading"
            >
                <el-form
                    ref="tagBindForm"
                    :inline="true"
                    :model="tagBindForm"
                    :rules="rules"
                    class="demo-form-inline"
                    style="margin:0 auto"
                    label-width="100px"
                >
                    <!-- <el-form-item label="企业名称:" style="width:100%">
            <el-input v-model="tagBindForm.user"></el-input>
          </el-form-item>-->

                    <!-- <el-form-item label="商品名称:">
            <el-input v-model="tagBindForm.user"></el-input>
          </el-form-item>-->
                    <el-form-item
                        v-if="userType === 2"
                        label="企业名称:"
                        prop="compName"
                        style="width:50%"
                    >
                        <div style="width:185px">
                            <el-select
                                v-model="tagBindForm.compName"
                                @change="getDiaCompName"
                                :loading="tagBindFormLoading"
                                placeholder="请选择企业"
                                style="width:300px"
                                filterable
                            >
                                <el-option
                                    v-for="item in tagsBindNameOptionsOne"
                                    :key="item.comp_ID"
                                    :label="item.comp_Name"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item v-else label="企业名称:">
                        <el-input
                            v-model="tagBindForm.compName"
                            :disabled="true"
                            style="width:300px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item v-if="userType === 2" label="商品:" prop="goodsName">
                        <el-select
                            v-model="tagBindForm.goodsName"
                            @change="getGoodsName"
                            :loading="tagBindFormGoodsNameLoading"
                            placeholder="请选择商品"
                            filterable
                            style="width:300px"
                        >
                            <el-option
                                v-for="item in tagsBindNameOptionsTwo"
                                :key="item.goodsCD"
                                :label="item.goodsNameSpen"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-else label="商品:" prop="goodsName" style="margin-left:60px">
                        <el-select
                            v-model="tagBindForm.goodsName"
                            @change="getGoodsName"
                            :loading="tagBindFormGoodsNameLoading"
                            placeholder="请选择商品"
                            filterable
                            style="width:300px"
                        >
                            <el-option
                                v-for="item in tagsBindNameOptionsTwo"
                                :key="item.goodsCD"
                                :label="item.goodsNameSpen"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品规格:" prop="goods_Spen">
                        <el-input
                            v-model="tagBindForm.goods_Spen"
                            :disabled="true"
                            style="width:300px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="商品效期:"
                        prop="goods_shelf_life"
                        style="margin-left:60px"
                    >
                        <el-input
                            v-model="tagBindForm.goods_shelf_life"
                            :disabled="true"
                            style="width:300px;"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述:" prop="goods_Describe">
                        <el-input
                            v-model="tagBindForm.goods_Describe"
                            :disabled="true"
                            type="textarea"
                            style="width:780px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="有效期:" prop="shelf_life">
                        <el-input v-model="tagBindForm.shelf_life" style="width:150px"></el-input>
                    </el-form-item>
                    <el-form-item label="生产日期:" prop="product_date">
                        <!-- <el-input v-model="tagBindForm.product_date"></el-input> -->

                        <el-date-picker
                            v-model="tagBindForm.product_date"
                            @change="bcd"
                            type="datetime"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="批次号:" prop="goods_lot">
                        <el-input v-model="tagBindForm.goods_lot"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格:" prop="goods_pric">
                        <el-input
                            v-model="tagBindForm.goods_pric"
                            style="width:150px"
                            type="number"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品备注:" prop="goods_memo">
                        <el-input
                            v-model="tagBindForm.goods_memo"
                            type="textarea"
                            style="width:520px"
                            placeholder="500个字符"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div
                    style="width:95%;height:1px;background:rgba(200, 200, 200, 0.6);;margin:0 auto"
                ></div>
                <el-form
                    :inline="true"
                    :model="tagBindForm"
                    class="demo-form-inline"
                    style="margin:0 auto;margin-top:10px"
                    label-width="100px"
                >
                    <el-form-item label="扫码标签:">
                        <el-input v-model="bindCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="synLabelsOneInfo" type="primary" class="tags-button"
                            >绑定验证码</el-button
                        >
                        <el-button
                            @click="submitForm('tagBindForm')"
                            type="primary"
                            class="tags-button"
                            style="margin-left:380px"
                            >批量选择</el-button
                        >
                    </el-form-item>
                </el-form>
                <div
                    v-loading="bindDataLoading"
                    element-loading-spinner="el-icon-loading"
                    style="max-height:400px;overflow-y:auto;padding-top:10px"
                >
                    <el-table
                        ref="multipleTable"
                        :data="bindData"
                        tooltip-effect="dark"
                        style="width: 95%;margin:0 auto;margin-top:-10px"
                        border
                    >
                        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                        <el-table-column
                            label="序号"
                            width="55"
                            type="index"
                            align="center"
                            fixed="left"
                        >
                            <template scope="scope">
                                <span>{{
                                    (tagsBindTablePageNum - 1) * tagsBindTablePageSize +
                                        scope.$index +
                                        1
                                }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="check_code"
                            label="验证码"
                            width="180"
                            align="center"
                            show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                            prop="consume_code"
                            label="消费码"
                            width="520"
                            show-overflow-tooltip
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="address"
                            label="操作"
                            show-overflow-tooltip
                            align="center"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    @click="handleDeleteBindData(scope.$index, scope.row)"
                                    size="mini"
                                    type="warning"
                                    >解 绑</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div
                    class="block"
                    style="width:95%;margin:0 auto;text-align:center;margin-top:10px"
                >
                    <el-pagination
                        @size-change="tagsBindTableSizeChange"
                        @current-change="tagsBindTableCurChange"
                        :current-page.sync="tagsBindTablePageNum"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="tagsBindTablePageSize"
                        :total="tagsBindTableTotal"
                        layout="total,sizes, prev, pager, next"
                    ></el-pagination>
                </div>
                <div style="width:95%;margin-top:10px;text-align:center">
                    <el-button @click="dialogVisible = false">关 闭</el-button>
                    <el-button @click="resetForm('tagBindForm')" type="primary">新 增</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    showAllCompNameID,
    searchBinding,
    delBindingBar,
    showAllGoodsName,
    showGoodsMsg,
    searchLabels,
    synLabels,
    synInput,
    synLabelsOne,
    searchNewBindingPool
} from '../../api/api';
import { log } from 'util';
export default {
    data() {
        let validateGoods_pric = (rule, value, callback) => {
            let reg = /^\d+(\.\d+)?$/;
            if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            }
            callback();
        };
        return {
            rules: {
                shelf_life: [
                    { required: true, message: '请输入有效期', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                product_date: [{ required: true, message: '请选择生产日期', trigger: 'blur' }],
                goods_lot: [
                    { required: true, message: '请输入批次号', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                goods_pric: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                    { validator: validateGoods_pric, trigger: 'blur' }
                ],
                goods_memo: [
                    {
                        min: 1,
                        max: 500,
                        message: '长度在 1 到 500 个字符',
                        trigger: 'blur'
                    }
                ],
                goodsName: [{ required: true, message: '请选择商品', trigger: 'blur' }],
                compName: [{ required: true, message: '请选择企业', trigger: 'blur' }]
            },
            formInline: {
                compName: '',
                goodsName: '',
                goodsCD: '',
                relDateStart: '',
                relDateEnd: '',
                pageSize: 10,
                pageNum: 1,
                synInput: '',
                spen: ''
            },
            compOptionsOne: '',
            tagBindForm: {
                compName: '',
                goodsName: '',
                goods_Spen: '',
                goods_shelf_life: '',
                shelf_life: '',
                goods_Describe: '',
                product_date: '',
                goods_lot: '',
                goods_pric: '',
                goods_memo: ''
            },
            innerVisibleData: {
                compName: '',
                compCD: '',

                goodsName: '',
                orderCodeStart: '',
                orderCodeEnd: '',
                updDateStart: '',
                updDateEnd: '',
                pageSize: 5,
                pageNum: 1
            },
            innerVisibleTabledata: [],
            radio: '',
            timeValueOne: '',
            timeValueTwo: '',
            dialogVisible: false,
            innerVisible: false,
            tableData: [],
            tagsBindTable: [],
            userType: Number,
            compID: '',
            compCD: '',
            tagsBindNameOptionsOne: '',
            tagsBindNameOptionsTwo: '',
            innerVisibleTimeValue: '',
            totalThree: 0,
            tagsSelectData: '',
            tagsBindLoading: false,
            multiOne: [],
            formInlineTotal: 0,
            homeLoading: false,
            innerVisibleTableLoading: false,
            tagsBindTablePageSize: 5,
            tagsBindTablePageNum: 1,
            tagsBindTableTotal: 0,
            formInlineLoading: false,
            tagBindFormLoading: false,
            tagBindFormGoodsNameLoading: false,
            bindDataLoading: false,
            bindLoading: false,
            selectDataOne: [],
            selectRowOne: [],
            selectInnerData: [],
            selectInnerRow: [],
            bindCode: '',
            a: [],
            b: '',
            xxx: '',
            goodsCD: '',
            doucumentNum: '',
            doucumentNum1: '',
            bindData: [],
            multipleSelectionDown: []
        };
    },
    computed: {
        changeTimestampInfo() {
            return function(timestamp) {
                return this.changeTimestamp(timestamp);
            };
        },
        // getCodeInfo() {
        // let currentCodeInfo = []
        //   this.total = this.codeInfo.length
        //   const count = (this.currentPage - 1) * 10
        //   for (let i = 0; i < 10; i++) {
        //     if (i + count < this.codeInfo.length) {
        //       currentCodeInfo.push(this.codeInfo[i + count])
        //     }
        //   }
        //   return currentCodeInfo
        // }
        getPageData() {
            let newtagsBindTable = [];
            this.tagsBindTableTotal = this.tagsBindTable.length;
            let start =
                this.tagsBindTablePageSize * this.tagsBindTablePageNum - this.tagsBindTablePageSize;
            let end = this.tagsBindTablePageSize * this.tagsBindTablePageNum;
            // let count =
            //   (this.tagsBindTablePageNum - 1) * (this.tagsBindTablePageSize + 1)
            // for (let i = 0; i < this.tagsBindTable.length; i++) {
            //   if (i + count < this.tagsBindTable.length) {
            //     newtagsBindTable.push(this.tagsBindTable[i + count])
            //   }
            // }
            end = end > this.tagsBindTable.length ? this.tagsBindTable.length : end;
            for (let i = start; i < end; i++) {
                newtagsBindTable.push(this.tagsBindTable[i]);
            }
            return newtagsBindTable;
        }
    },
    watch: {
        selectDataOne(data) {
            this.selectRowOne = [];
            if (data.length > 0) {
                data.forEach((item, index) => {
                    this.selectRowOne.push(this.tableData.indexOf(item));
                });
            }
        },
        selectInnerData(data) {
            this.selectInnerRow = [];
            if (data.length > 0) {
                data.forEach((item, index) => {
                    this.selectInnerRow.push(this.innerVisibleTabledata.indexOf(item));
                });
            }
        }
    },
    created() {
        // this.searchBindingInfo()
        // this.showAllGoodsNameInfo()
        this.userType = Number(localStorage.getItem('user_Type'));
        if (this.userType !== 2) {
            this.compID = localStorage.getItem('comp_ID');
            this.innerVisibleData.compCD = localStorage.getItem('comp_CD');
            this.compCD = localStorage.getItem('comp_CD');
            this.formInline.compName = localStorage.getItem('comp_Name');
            this.tagBindForm.compName = localStorage.getItem('comp_Name');
            this.searchBindingInfo();
        } else {
            this.formInline.compName = '';
            this.tagBindForm.compName = '';
        }

        this.showAllCompNameIDInfo();
    },
    methods: {
        handleDeleteBindData(index, row) {
            this.$confirm('此操作将解绑该条标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.bindDataLoading = true;
                    delBindingBar({ delCheckCode: row.check_code }, this.$store.getters.token).then(
                        (res) => {
                            this.homeLoading = false;
                            this.bindDataLoading = false;
                            if (res.code == 2) {
                                this.$notify({
                                    title: '成功!',
                                    message: '解绑成功!',
                                    type: 'success'
                                });
                                // this.searchBindingInfo();
                                searchNewBindingPool(
                                    {
                                        compCD: this.compCD,
                                        doucumentNum: this.doucumentNum,
                                        pageSize: this.tagsBindTablePageSize,
                                        pageNum: this.tagsBindTablePageNum
                                    },
                                    this.$store.getters.token
                                ).then((res) => {
                                    this.bindData = res.newBindingCode;
                                    this.tagsBindTableTotal = res.total[0].total;
                                });
                                if (this.userType !== 2) {
                                    this.searchBindingInfo();
                                }
                            } else if (res.code == 1) {
                                this.$notify({
                                    title: '注意!',
                                    message: '已存证,不能解绑!',
                                    type: 'warning'
                                });
                            } else if (res.code == 4 || res.code == 5) {
                                this.$notify({
                                    title: '注意!',
                                    message: '已导出的数据,不能解绑!',
                                    type: 'warning'
                                });
                            } else if (res.code == 3) {
                                this.$notify({
                                    title: '注意!',
                                    message: '解绑异常!',
                                    type: 'warning'
                                });
                            }
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解绑'
                    });
                });
        },
        tagsBindTableSizeChange(val) {
            this.tagsBindTablePageSize = val;
            this.tagsBindTablePageNum = 1;
            searchNewBindingPool(
                {
                    compCD: this.compCD,
                    doucumentNum: this.doucumentNum,
                    pageSize: this.tagsBindTablePageSize,
                    pageNum: this.tagsBindTablePageNum
                },
                this.$store.getters.token
            ).then((res) => {
                this.bindData = res.newBindingCode;
                this.tagsBindTableTotal = res.total[0].total;
            });
        },
        tagsBindTableCurChange(val) {
            this.tagsBindTablePageNum = val;
            searchNewBindingPool(
                {
                    compCD: this.compCD,
                    doucumentNum: this.doucumentNum,
                    pageSize: this.tagsBindTablePageSize,
                    pageNum: this.tagsBindTablePageNum
                },
                this.$store.getters.token
            ).then((res) => {
                this.bindData = res.newBindingCode;
                this.tagsBindTableTotal = res.total[0].total;
            });
        },
        resetForm(formName) {
            // this.dialogVisible = true;
            this.doucumentNum = '';
            this.bindData = [];
            this.tagsBindTable = [];
            this.innerVisibleData.compName = '';
            this.innerVisibleData.goodsName = '';
            this.$refs[formName].resetFields();
        },
        clickitem(index) {
            index === this.formInline.synInput
                ? (this.formInline.synInput = '')
                : (this.formInline.synInput = index);
        },
        searchBindingInfo() {
            this.homeLoading = true;
            this.formInline.pageNum = 1;
            searchBinding(this.formInline, this.$store.getters.token).then((res) => {
                this.homeLoading = false;
                if (this.userType === 2) {
                    if (this.formInline.compName === '') {
                        this.$notify({
                            title: '注意!',
                            message: '请先选择公司再查询!',
                            type: 'warning'
                        });
                    } else {
                        this.tableData = res.sqlValue;
                        this.formInlineTotal = res.sumValue[0].total;
                    }
                } else {
                    this.tableData = res.sqlValue;
                    this.formInlineTotal = res.sumValue[0].total;
                }
            });
        },
        changeSearchBindingInfo() {
            this.homeLoading = true;
            searchBinding(this.formInline, this.$store.getters.token).then((res) => {
                this.homeLoading = false;
                if (this.userType === 2) {
                    if (this.formInline.compName === '') {
                        this.$notify({
                            title: '注意!',
                            message: '请先选择公司再查询!',
                            type: 'warning'
                        });
                    } else {
                        this.tableData = res.sqlValue;
                        this.formInlineTotal = res.sumValue[0].total;
                    }
                } else {
                    this.tableData = res.sqlValue;
                    this.formInlineTotal = res.sumValue[0].total;
                }
            });
        },
        getCompName(val) {
            if (val != null) {
                this.formInline.compName = val.comp_Name;
            }
        },
        synLabelsOneInfo() {
            this.a = [];
            if (this.bindCode == '') {
                this.$notify({
                    title: '注意!',
                    message: '请输入验证码!',
                    type: 'warning'
                });
            } else {
                const add_date = Date.parse(new Date()) / 1000;
                // synLabelsOne()
                // 去问后端为什么要这样的数据结构!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                let d = [];
                d.push(this.bindCode);
                d.push('');
                let e = [];
                e.push(d);
                this.a.push(this.goodsCD);
                this.a.push(add_date);
                this.a.push(e);
                this.a.push(this.tagBindForm.goods_lot);
                this.a.push(this.tagBindForm.goods_Spen);
                this.a.push(this.tagBindForm.goods_pric);
                this.a.push(this.tagBindForm.product_date / 1000);
                this.a.push(this.tagBindForm.goods_memo);
                this.tagsBindLoading = true;
                synLabelsOne(
                    {
                        synLabelMsgs: this.a,
                        doucumentNum: this.doucumentNum1,
                        compCD: this.compCD
                    },
                    this.$store.getters.token
                ).then((res) => {
                    this.tagsBindLoading = false;
                    if (res.code == 1) {
                        this.$notify({
                            title: '成功!',
                            message: '绑定成功!',
                            type: 'success'
                        });
                        this.doucumentNum1 = res.doucumentNum;
                        searchNewBindingPool(
                            {
                                compCD: this.compCD,
                                doucumentNum: this.doucumentNum1,
                                pageSize: this.tagsBindTablePageSize,
                                pageNum: this.tagsBindTablePageNum
                            },
                            this.$store.getters.token
                        ).then((res) => {
                            this.bindData = res.newBindingCode;
                            this.tagsBindTableTotal = res.total[0].total;
                        });
                    } else if (res.code == 2) {
                        this.$notify({
                            title: '失败!',
                            message: '验证码错误!',
                            type: 'warning'
                        });
                    } else if (res.code == 3) {
                        this.$notify({
                            title: '注意!',
                            message: '请先将商品存证!',
                            type: 'warning'
                        });
                    } else if (res.code == 4) {
                        this.$notify({
                            title: '失败!',
                            message: '商品和验证码异常!',
                            type: 'warning'
                        });
                    }
                });
            }
        },
        abc() {
            // this.a.push(this.tagBindForm.goodsName)
            // this.a.push(this.tagBindForm.goods_shelf_life)
            // this.a.push(this.tagBindForm.shelf_life)
            // this.a.push(this.tagBindForm.goods_Describe)
        },
        bcd(val) {
            if (val != null) {
                this.tagBindForm.product_date = new Date(val).getTime();
            } else {
                this.tagBindForm.product_date = '';
            }
        },
        onSubmit() {
            console.log('submit!');
        },
        bindTags() {
            Object.keys(this.tagBindForm).forEach((key) => (this.tagBindForm[key] = ''));
            this.innerVisibleData.compName = '';
            this.innerVisibleData.compCD = '';

            this.innerVisibleData.goodsName = '';
            this.tagsBindTable = [];
            this.dialogVisible = true;
        },
        bindTagsInfo() {
            this.dialogVisible = true;
            this.doucumentNum = '';
            // this.tagBindFormLoading = true
            Object.keys(this.tagBindForm).forEach((key) => (this.tagBindForm[key] = ''));
            this.bindData = [];
            this.tagBindForm.compName = this.formInline.compName;
            showAllGoodsName({ compID: this.compID }, this.$store.getters.token).then((res) => {
                this.tagsBindNameOptionsTwo = res.array;

                // this.tagBindFormLoading = true
            });
            searchNewBindingPool(
                {
                    compCD: this.compCD,
                    doucumentNum: this.doucumentNum,
                    pageSize: this.tagsBindTablePageSize,
                    pageNum: this.tagsBindTablePageNum
                },
                this.$store.getters.token
            ).then((res) => {
                this.bindData = res.newBindingCode;
                this.tagsBindTableTotal = res.total[0].total;
            });
        },
        synLabelsInfo() {
            if (!this.multiOne.length) {
                this.$notify({
                    title: '注意!',
                    message: '请选择存证条目!',
                    type: 'warning'
                });
            } else {
                this.homeLoading = true;
                let multiOneInfo = [];
                for (let k = 0; k < this.multiOne.length; k++) {
                    multiOneInfo.push(this.multiOne[k].check_code);
                }
                synInput({ checkCodes: multiOneInfo, source: 1 }, this.$store.getters.token).then(
                    (res) => {
                        this.homeLoading = false;
                        if (res.code == 1) {
                            this.$notify({
                                title: '成功!',
                                message: '存证成功!',
                                type: 'success'
                            });
                            this.searchBindingInfo();
                        } else if (res.code == 2) {
                            this.$notify({
                                title: '注意!',
                                message: '已存在存证过的条码，请勿重复存证!',
                                type: 'warning'
                            });
                        } else if (res.code == 3) {
                            this.$notify({
                                title: '失败!',
                                message: '标签存证失败,请稍后尝试!',
                                type: 'warning'
                            });
                        } else if (res.code == 4) {
                            this.$notify({
                                title: '失败!',
                                message: '数据异常,请联系管理员!',
                                type: 'warning'
                            });
                        } else if (res.code == 7) {
                            this.$notify({
                                title: '失败!',
                                message: '剩余MOAC不足,请充值!',
                                type: 'warning'
                            });
                        }
                    }
                );
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.innerVisibleData.compName = this.tagBindForm.compName;
                    this.innerVisible = true;
                    this.searchLabelsInfo();
                } else {
                    return false;
                }
            });
        },
        // openSelect() {
        //   if (this.userType == 2) {
        //     if (
        //       this.innerVisibleData.compName == "" ||
        //       this.innerVisibleData.goodsName == ""
        //     ) {
        //       this.$notify({
        //         title: "注意!",
        //         message: "请先选择公司和商品!",
        //         type: "warning"
        //       });
        //     } else {
        //       this.innerVisible = true;
        //       this.searchLabelsInfo();
        //     }
        //   } else {
        //     if (this.tagBindForm.goodsName == "") {
        //       this.$notify({
        //         title: "注意!",
        //         message: "请先选择商品!",
        //         type: "warning"
        //       });
        //     } else {
        //       this.innerVisible = true;
        //       this.innerVisibleData.compName = this.tagBindForm.compName;
        //       this.searchLabelsInfo();
        //     }
        //   }
        // },
        showAllCompNameIDInfo() {
            this.tagBindFormLoading = true;
            showAllCompNameID(this.$store.getters.token).then((res) => {
                this.compOptionsOne = res.allCompNameID;
                this.tagBindFormLoading = false;
                this.tagBindFormGoodsNameLoading = true;
                this.tagsBindNameOptionsOne = res.allCompNameID;
                this.tagBindFormGoodsNameLoading = false;
                // this.tagBindFormLoading = false
                // this.tagBindFormLoading = true
            });
        },
        changeRowColorTwo({ row, rowIndex }) {
            if (this.selectRowOne.includes(rowIndex)) {
                return 'background-color:rgba(194, 224, 255, 1)';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgb(230, 230, 230)';
            }
        },
        changeRowColorOne({ row, rowIndex }) {
            if (this.selectInnerRow.includes(rowIndex)) {
                return 'background-color:rgba(194, 224, 255, 1)';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgb(230, 230, 230)';
            }
        },
        handleSelectionChangeOne(val) {
            this.selectDataOne = val;
            this.multiOne = val;
            this.multipleSelectionDown = val;
        },
        handleSelectionChangeTwo(val) {
            this.tagsSelectData = val;
            this.selectInnerData = val;
            this.b = val;
        },

        innerVisibleTabledataCurrentChange(currentRow, oldCurrentRow) {
            this.$refs.innerVisibleTabledata.toggleRowSelection(currentRow);
        },
        handleSelectionChangeThree(val) {
            this.b = val;
        },
        // handleClose() {
        //   this.$confirm("确认关闭？")
        //     .then(_ => {
        //       this.dialogVisible = false
        //     })
        //     .catch(_ => {})
        // },
        handleSizeChangeThree(val) {
            this.innerVisibleData.pageSize = val;
            this.innerVisibleData.pageNum = 1;
            this.searchLabelsInfo();
        },
        handleCurrentChangeThree(val) {
            this.innerVisibleData.pageNum = val;
            this.searchLabelsInfo();
        },
        scynDataToGoodsBind() {
            const add_date = Date.parse(new Date()) / 1000;
            if (this.b.length > 0) {
                this.bindLoading = true;
                this.a = [];
                let c = [];
                for (let i = 0; i < this.b.length; i++) {
                    let d = [];
                    d.push(this.b[i].check_code);
                    d.push(this.b[i].consume_code);
                    c.push(d);
                }
                this.a.push(this.goodsCD);
                this.a.push(add_date);
                this.a.push(c);
                this.a.push(this.tagBindForm.goods_lot);
                this.a.push(this.tagBindForm.shelf_life);
                this.a.push(this.tagBindForm.goods_pric);
                this.a.push(this.tagBindForm.product_date / 1000);
                this.a.push(this.tagBindForm.goods_memo);
                synLabels(
                    {
                        synLabelMsgs: this.a,
                        compCD: this.innerVisibleData.compCD,
                        doucumentNum: this.doucumentNum
                    },
                    this.$store.getters.token
                ).then((res) => {
                    this.bindLoading = false;
                    this.innerVisible = false;
                    if (res.code == 1) {
                        this.$notify({
                            title: '成功!',
                            message: '标签绑定成功!',
                            type: 'success'
                        });
                        this.doucumentNum = res.maxDocumentNum;
                        // this.tagBindForm.shelf_life=''
                        //   this.tagBindForm.product_date=''
                        //   this.tagBindForm.goods_lot=''
                        //   this.tagBindForm.goods_pric=''
                        //   this.tagBindForm.goods_memo=''
                        // this.searchBindingInfo();
                        searchNewBindingPool(
                            {
                                compCD: this.compCD,
                                doucumentNum: this.doucumentNum,
                                pageSize: this.tagsBindTablePageSize,
                                pageNum: this.tagsBindTablePageNum
                            },
                            this.$store.getters.token
                        ).then((res) => {
                            this.bindData = res.newBindingCode;
                            this.tagsBindTableTotal = res.total[0].total;
                        });
                        if (this.userType !== 2) {
                            this.searchBindingInfo();
                        }
                        // this.bindTagsInfo()
                        // this.bindData=[]

                        // this.dialogVisible = false;
                    } else if (res.code == 3) {
                        this.$notify({
                            title: '失败!',
                            message: '请先将商品存证!',
                            type: 'warning'
                        });
                    }
                });
            } else {
                this.$notify({
                    title: '注意!',
                    message: '请选择需要绑定的条目!',
                    type: 'warning'
                });
            }
            // this.innerVisible = false;
            // this.tagsBindTable = this.tagsSelectData;
        },
        getGoodsName(val) {
            this.goodsCD = val.goodsCD;
            this.tagBindForm.goodsName = val.goodsNameSpen;
            this.innerVisibleData.goodsName = val.goodsCD;
            showGoodsMsg({ goodsCD: val.goodsCD }, this.$store.getters.token).then((res) => {
                this.tagBindForm.goods_Spen = res.goodsMsg.goods_Spen;
                this.tagBindForm.goods_shelf_life = res.goodsMsg.shelf_life;
                this.tagBindForm.goods_Describe = res.goodsMsg.goods_Describe;
                this.tagBindForm.goods_Describe = res.goodsMsg.goods_Describe;
            });
        },
        getDiaCompName(val) {
            console.log(val);

            this.tagsBindTable = [];
            Object.keys(this.tagBindForm).forEach((key) => (this.tagBindForm[key] = ''));
            this.innerVisibleData.compName = val.comp_Name;
            this.innerVisibleData.compCD = val.comp_CD;
            this.compCD = val.comp_CD;
            this.tagBindForm.compName = val.comp_Name;
            this.tagBindForm.goodsName = '';
            this.innerVisibleData.goodsName = '';
            showAllGoodsName({ compID: val.comp_ID }, this.$store.getters.token).then((res) => {
                this.tagsBindNameOptionsTwo = res.array;
            });
        },
        handleSizeChangeOne(val) {
            if (this.formInline.pageSize !== val.size) {
                this.formInline.pageNum = 1;
            } else {
                this.formInline.pageNum = val.page;
            }
            this.formInline.pageSize = val.size;
            this.changeSearchBindingInfo();
        },

        handleDeleteOne(index, row) {
            this.$confirm('此操作将解绑该条标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.homeLoading = true;
                    delBindingBar({ delCheckCode: row.check_code }, this.$store.getters.token).then(
                        (res) => {
                            this.homeLoading = false;
                            if (res.code == 2) {
                                this.$notify({
                                    title: '成功!',
                                    message: '解绑成功!',
                                    type: 'success'
                                });
                                this.searchBindingInfo();
                            } else if (res.code == 1) {
                                this.$notify({
                                    title: '注意!',
                                    message: '已存证,不能解绑!',
                                    type: 'warning'
                                });
                            } else if (res.code == 4 || res.code == 5) {
                                this.$notify({
                                    title: '注意!',
                                    message: '已导出的数据,不能解绑!',
                                    type: 'warning'
                                });
                            } else if (res.code == 3) {
                                this.$notify({
                                    title: '注意!',
                                    message: '解绑异常!',
                                    type: 'warning'
                                });
                            }
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解绑'
                    });
                });
        },
        handleDeleteTwo(index, rows) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    rows.splice(index, 1);
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        searchLabelsInfo() {
            this.innerVisibleTableLoading = true;
            searchLabels(this.innerVisibleData, this.$store.getters.token).then((res) => {
                this.innerVisibleTableLoading = false;
                this.innerVisibleTabledata = res.labelMsg;
                this.totalThree = res.sumMsg[0].total;
            });
        },
        getInnerVisibleTimeValue() {
            if (this.innerVisibleTimeValue != null) {
                this.innerVisibleData.updDateStart =
                    new Date(this.innerVisibleTimeValue[0]).getTime() / 1000;
                this.innerVisibleData.updDateEnd =
                    new Date(this.innerVisibleTimeValue[1]).getTime() / 1000;
            } else {
                this.innerVisibleData.updDateStart = '';
                this.innerVisibleData.updDateEnd = '';
            }
        },
        // getTimeStamp(val) {
        //   timeArray = ""
        //   let timeArray = val.map(item => {
        //     return new Date(item).getTime(item)
        //   })
        //   this.formInline.dateStart = timeArray[0]
        //   this.formInline.dateEnd = timeArray[1]
        // },
        // showAllGoodsNameInfo() {
        //   showAllGoodsName(this.$store.getters.token).then(res => {
        //     console.log(res)
        //   })
        // },
        getTimeStamp() {
            if (this.timeValueOne != null) {
                this.formInline.relDateStart = new Date(this.timeValueOne[0]).getTime() / 1000;
                this.formInline.relDateEnd = new Date(this.timeValueOne[1]).getTime() / 1000;
            } else {
                this.formInline.relDateStart = '';
                this.formInline.relDateEnd = '';
            }
        },
        changeTimestamp(timestamp) {
            const date = new Date(timestamp);
            const Y = date.getFullYear() + '/';
            const M =
                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                '/';
            const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
            const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            const m =
                date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D;
        },
        handleDownload() {
            if (this.multipleSelectionDown.length) {
                // this.downloadLoading = true
                import('../../vendor/ExportTags').then((excel) => {
                    const tHeader = [
                        '商品编码',
                        '商品名称',
                        '商品规格',
                        '批次号',
                        '验证码',
                        '消费码',

                        '企业编码',
                        '企业名称',
                        '存证状态'
                    ];
                    const filterVal = [
                        'goods_CD',
                        'goods_Name',
                        'goods_Spen',
                        'goods_lot',
                        'check_code',
                        'consume_code',

                        'comp_CD',
                        'comp_Name',
                        'hashStatus'
                    ];

                    // const list = [...this.multipleSelection]
                    const list = JSON.parse(JSON.stringify(this.multipleSelectionDown));
                    // for (let p = 0; p < list.length; p++) {
                    //   console.log(list[p].reg_Hash_Datetime);

                    //   list[p].reg_Hash_Datetime == 0
                    //     ? (list[p].reg_Hash_Datetime = "暂无存证时间")
                    //     : (list[p].reg_Hash_Datetime = this.changeTimestampInfo(
                    //         list[p].reg_Hash_Datetime * 1000
                    //       ));
                    // }

                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename
                    });

                    // let f = [];
                    // for (let m = 0; m < this.multipleSelectionDown.length; m++) {
                    //   f.push(this.multipleSelectionDown[m].consume_code);
                    // }
                    // exportLabelNum({ exportCodes: f }, this.$store.getters.token).then(
                    //   res => {
                    //     this.searchCodePoolInfo();
                    //   }
                    // );
                    // this.$refs.multipleTable.clearSelection();
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
        handleRowClick(row, event, column) {
            this.$refs.tableData.toggleRowSelection([{ row: row }]); // 点击选中
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
.tagsBind {
    .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
    .el-table__body tr.current-row > td,
    .el-table__body tr.hover-row.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
    .el-table__body tr.hover-row.el-table__row--striped > td,
    .el-table__body tr.hover-row > td {
        background-color: rgba(102, 177, 255, 0.4) !important;
    }
    .plTableBox .myPagination {
        width: 100%;
        padding: 10px;
        text-align: center;
    }
}
</style>
