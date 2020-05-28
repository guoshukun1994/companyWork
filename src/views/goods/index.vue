<template>
    <div class="goods">
        <div class="goods-info">
            <div
                style="width:100%;height:40px;border-bottom:1px solid rgba(200, 200, 200, 0.6);line-height:40px"
            >
                商品信息维护
            </div>
            <el-row style="width:100%;margin: 0 auto;margin-top:20px;">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark" style="min-height:50px">
                        <el-form
                            ref="queryForm"
                            :model="queryForm"
                            label-width="100px"
                            class="goods-queryForm"
                            style="margin-top:-10px;overflow-x:hidden;margin-left:-25px;"
                        >
                            <el-form-item
                                v-if="userType == 2"
                                label="企业编码:"
                                style="float:left;"
                            >
                                <el-input v-model="queryForm.compCD" style="width:150px" />
                            </el-form-item>
                            <el-form-item
                                v-if="userType == 2"
                                label="企业名称:"
                                style="float:left;"
                            >
                                <el-input v-model="queryForm.compName" style="width:150px" />
                            </el-form-item>
                            <el-form-item
                                v-if="userType == 2"
                                label="企业简称:"
                                style="float:left;"
                            >
                                <el-input v-model="queryForm.compSimpName" style="width:150px" />
                            </el-form-item>

                            <el-form-item label="商品编码:" style="float:left;">
                                <el-input v-model="queryForm.goodsCD" style="width:150px" />
                            </el-form-item>
                            <el-form-item label="商品名称:" style="float:left;">
                                <el-input v-model="queryForm.goodsName" style="width:150px" />
                            </el-form-item>
                            <el-form-item label="商品规格:" style="float:left;">
                                <el-input v-model="queryForm.spen" style="width:150px" />
                            </el-form-item>
                            <!-- <el-form-item label="商品简称:" style="float:left;">
                <el-input
                  v-model="queryForm.goodsSimpleName"
                  placeholder="请输入商品简称"
                  style="width:150px"
                />
              </el-form-item>-->

                            <el-button
                                @click="searchGoodsInfo"
                                class="goods-query"
                                icon="el-icon-search"
                                style="width:120px"
                                >查 询</el-button
                            >
                        </el-form>
                    </div>
                </el-col>
            </el-row>

            <div class="goods-form">
                <span v-if="userType != 2" style="float:right;margin-top:10px">
                    <span style="color:gray">企业编码:</span>
                    <span style="color:gray">{{ compTitleCd }}</span>
                    &nbsp;
                    <span style="color:gray">企业简称:</span>
                    <span style="color:gray">{{ compTitleName }}</span>
                </span>
                <el-button
                    v-if="this.userType != 0"
                    @click="addGoodsInfo"
                    class="goods-addgoods"
                    style="width:120px"
                    icon="el-icon-circle-plus"
                    >商品新增</el-button
                >
                <el-button
                    v-if="this.userType != 0"
                    @click="layGoods"
                    :loading="layGoodsLoading"
                    class="goods-goodsenv"
                    icon="el-icon-circle-check"
                    style="width:120px"
                    >商品存证</el-button
                >
                <el-table
                    ref="goodsData"
                    v-loading="loadingOne"
                    :element-loading-text="goodsDataLoadingText"
                    :data="goodsData"
                    :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
                    :row-style="changeRowColorOne"
                    @selection-change="chooseInstanceOne"
                    @current-change="tableCurrentChangeOne"
                    element-loading-spinner="el-icon-loading"
                    border
                    class="goodsTable"
                >
                    <template slot="empty">
                        <div>无数据</div>
                    </template>
                    <!-- <el-table-column label="选择" width="55">
            <template slot-scope="scope">
              <el-radio
                v-model="tableRadioOne"
                :label="scope.row"
                @change="handleSelectionChangeOne"
              >
                <i />
              </el-radio>
            </template>
          </el-table-column>-->
                    <el-table-column
                        type="selection"
                        width="55"
                        align="center"
                        fixed="left"
                    ></el-table-column>
                    <el-table-column label="序号" type="index" width="60" align="center">
                        <template slot-scope="scope">
                            <span>{{
                                (queryForm.pageNum - 1) * queryForm.pageSize + scope.$index + 1
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="userType == 2"
                        :show-overflow-tooltip="true"
                        label="企业编码"
                        align="center"
                        width="100"
                        prop="comp_CD"
                    />

                    <el-table-column
                        v-if="userType == 2"
                        :show-overflow-tooltip="true"
                        prop="comp_Simp_Name"
                        label="企业简称"
                        align="center"
                        width="100"
                    />
                    <el-table-column
                        v-if="userType == 2"
                        :show-overflow-tooltip="true"
                        prop="comp_Name"
                        label="企业名称"
                        align="center"
                        width="200"
                    />
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="商品编码"
                        align="center"
                        width="150"
                        prop="goods_CD"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="showGoodsDetails(scope.row.goods_CD)"
                                class="showGoodsDetails"
                                >{{ scope.row.goods_CD }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="商品名称"
                        align="center"
                        width="150"
                        prop="goods_Name"
                    />
                    <el-table-column
                        label="商品简称"
                        align="center"
                        width="150"
                        prop="goods_Simple_Name"
                    />
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="商品规格"
                        align="center"
                        width="150"
                        prop="goods_Spen"
                    />
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="商品存证Hash"
                        align="center"
                        width="540"
                        prop="goods_Hash"
                    >
                        <template slot-scope="scope">{{
                            scope.row.goods_Hash == null || scope.row.goods_Hash == ''
                                ? '暂无存证'
                                : scope.row.goods_Hash
                        }}</template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="false"
                        label="存证时间"
                        align="center"
                        width="180"
                        prop="goods_Hash_Datetime"
                    >
                        <template slot-scope="scope">{{
                            scope.row.goods_Hash_Datetime == null
                                ? '暂无存证时间'
                                : changeTimestamp(scope.row.goods_Hash_Datetime * 1000)
                        }}</template>
                    </el-table-column>
                    <el-table-column
                        v-if="this.userType != 0"
                        label="操作"
                        align="center"
                        width="180"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="handleEdit(scope.$index, scope.row)"
                                size="mini"
                                type="success"
                                >编 辑</el-button
                            >

                            <el-button
                                @click="handleDeleteOne(scope.$index, scope.row)"
                                size="mini"
                                type="danger"
                                >删 除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="text-align:center;margin-top:10px">
                    <el-pagination
                        :current-page="queryForm.pageNum"
                        :page-sizes="[5, 10]"
                        :page-size="queryForm.pageSize"
                        :total="totalNumOne"
                        @size-change="handleSizeChangeOne"
                        @current-change="handleCurrentChangeOne"
                        layout="total,sizes, prev, pager, next"
                    />
                </div>
            </div>
            <div class="goods-infoForm" style="margin-top:10px">
                <!-- <el-button
          v-if="addInfoDetails.goods_CD==null"
          class="goods-addgoods"
          style="float:left,width:120px"
          icon="el-icon-circle-plus"
          @click="messageReminder"
        >资料新增</el-button>-->
                <el-button
                    v-if="this.userType != 0"
                    @click="addInfo"
                    class="goods-addgoods"
                    style="float:left;width:120px"
                    icon="el-icon-circle-plus"
                    >资料新增</el-button
                >
                <el-button
                    v-if="this.userType != 0"
                    :loading="layGoodsInfoLoading"
                    @click="layGoodsInfo"
                    class="goods-goodsenv"
                    icon="el-icon-circle-check"
                    >资料存证</el-button
                >
                <el-table
                    ref="goodsInfoData"
                    v-loading="loadingThree"
                    :element-loading-text="goodsInfoDataLoadingText"
                    :data="goodsInfoData"
                    :header-cell-style="{ background: 'rgba(48, 65, 86,0.2)' }"
                    @selection-change="chooseInstanceTwo"
                    :row-style="changeRowColorTwo"
                    @current-change="tableCurrentChangeTwo"
                    element-loading-spinner="el-icon-loading"
                    border
                    class="infoForm"
                >
                    <template slot="empty">
                        <div>无数据</div>
                    </template>
                    <!-- <el-table-column type="selection" align="center" width="70" /> -->
                    <!-- <el-table-column label="选择" width="55" align="center"> -->
                    <!-- <template slot-scope="scope">
              <el-radio
                v-model="tableRadioTwo"
                :label="scope.row"
                @change="handleSelectionChangeTwo"
              >
                <i />
              </el-radio>
          </template>-->
                    <!-- </el-table-column>
          -->
                    <el-table-column
                        type="selection"
                        width="55"
                        align="center"
                        fixed="left"
                    ></el-table-column>

                    <el-table-column label="序号" type="index" width="50" align="center">
                        <template slot-scope="scope">
                            <span>{{ (currentPageTwo - 1) * pageSizeTwo + scope.$index + 1 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="商品编码"
                        align="center"
                        width="150"
                        prop="goods_CD"
                    />
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="资料编码"
                        align="center"
                        width="100"
                        prop="photo_CD"
                    >
                        <template slot-scope="scope">
                            <span
                                @click="showInfoDetails(scope.row.photo_CD)"
                                class="showGoodsDetails"
                                >{{ scope.row.photo_CD }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="类型"
                        align="center"
                        width="100"
                        prop="photo_Type"
                    >
                        <template slot-scope="scope">{{
                            scope.row.photo_Type == '00'
                                ? '商品图片'
                                : scope.row.photo_Type == '90'
                                ? '其它'
                                : '商品说明书'
                        }}</template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="文件名"
                        align="center"
                        width="400"
                        prop="photo_Name"
                    />
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="资料存证Hash"
                        align="center"
                        prop="photo_Hash"
                        width="520"
                    >
                        <template slot-scope="scope">{{
                            scope.row.photo_Hash == null ? '暂无存证' : scope.row.photo_Hash
                        }}</template>
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="存证时间"
                        align="center"
                        width="150"
                        prop="photo_Hash_Datetime"
                    >
                        <template slot-scope="scope">{{
                            scope.row.photo_Hash_Datetime == null
                                ? '暂无存证时间'
                                : changeTimestampInfo(scope.row.photo_Hash_Datetime * 1000)
                        }}</template>
                    </el-table-column>
                    <!-- <el-table-column
            label="总Hash"
            align="center"
            width="150"
            prop="photo_Hash"
            :show-overflow-tooltip="true"
          >
            <template
              slot-scope="scope"
            >{{ scope.row.photo_Hash==null?'暂未存证':scope.row.photo_Hash }}</template>
          </el-table-column>
          <el-table-column
            label="总Hash时间"
            align="center"
            width="200"
            prop="photo_Hash_Datetime"
            :show-overflow-tooltip="true"
          >
            <template
              slot-scope="scope"
            >{{ scope.row.photo_Hash_Datetime==null?'无存证时间': changeTimestamp(scope.row.photo_Hash_Datetime*1000) }}</template>
          </el-table-column>-->
                    <el-table-column
                        v-if="this.userType != 0"
                        label="操作"
                        align="center"
                        width="100"
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="handleDeleteTwo(scope.$index, scope.row)"
                                size="mini"
                                type="danger"
                                >删 除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="text-align:center;margin-top:10px">
                    <el-pagination
                        :current-page="currentPageTwo"
                        :page-sizes="[5, 10]"
                        :page-size="pageSizeTwo"
                        :total="totalNumTwo"
                        @size-change="handleSizeChangeTwo"
                        @current-change="handleCurrentChangeTwo"
                        layout="total,sizes, prev, pager, next"
                    />
                </div>
                <!-- 商品新增开始 -->
                <el-dialog
                    v-dialogDrag
                    :visible.sync="dialogVisibleOne"
                    :close-on-click-modal="false"
                    title="商品新增"
                    class="add-goods"
                >
                    <el-form
                        ref="addGoodsForm"
                        v-loading="loadingTwo"
                        :rules="addGoodsRules"
                        :model="addGoodsForm"
                        :inline="true"
                        :auto-upload="false"
                        element-loading-text="商品新增中"
                        element-loading-spinner="el-icon-loading"
                        label-width="100px"
                        class="goods-add-goods"
                    >
                        <el-form-item v-if="userType == '2'" label="企业编码:" prop="compCD">
                            <!-- <el-input v-model="addGoodsForm.compCD" /> -->
                            <el-select
                                v-model="addGoodsForm.compCD"
                                placeholder="请选择企业编码"
                                clearable
                                filterable
                            >
                                <el-option
                                    v-for="item in compCDoptions"
                                    :key="item.comp_CD"
                                    :label="item.comp_CD"
                                    :value="item.comp_CD"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品编码:" prop="goodsCD">
                            <el-input id="inputId" v-model="addGoodsForm.goodsCD" />
                        </el-form-item>

                        <el-form-item label="商品名称:" prop="goodsName">
                            <el-input v-model="addGoodsForm.goodsName" />
                        </el-form-item>
                        <el-form-item label="商品简称:" prop="goodsSimpleName">
                            <el-input v-model="addGoodsForm.goodsSimpleName" />
                        </el-form-item>
                        <el-form-item label="商品规格:" prop="goodsSpen">
                            <el-input v-model="addGoodsForm.goodsSpen" />
                        </el-form-item>
                        <el-form-item v-if="userType === '2'" label="保质期:" prop="shelfLife">
                            <el-input v-model="addGoodsForm.shelfLife" />
                        </el-form-item>
                        <el-form-item label="商品描述:" prop="goodsDescribe" style="width:100%">
                            <el-input
                                v-model="addGoodsForm.goodsDescribe"
                                :rows="4"
                                @input="descInputOne"
                                type="textarea"
                                style="width:610px"
                                placeholder="500字符以内"
                            />
                        </el-form-item>
                        <el-form-item label="备注:" prop="goodsMemo" style="width:100%">
                            <el-input
                                v-model="addGoodsForm.goodsMemo"
                                :rows="4"
                                type="textarea"
                                style="width:610px"
                                placeholder="500字符以内"
                            />
                        </el-form-item>
                        <el-form-item v-if="userType !== '2'" label="保质期:" prop="shelfLife">
                            <el-input v-model="addGoodsForm.shelfLife" />
                        </el-form-item>
                        <el-form-item style="width:100%" label="商品图片:" prop>
                            <el-upload
                                :on-remove="handleRemoveOne"
                                :file-list="goodsPhotofileList"
                                :on-change="handlePreviewOne"
                                :auto-upload="false"
                                :limit="1"
                                class="upload-demo"
                                action
                                list-type="picture"
                            >
                                <el-button size="small" type="primary" style="width:610px"
                                    >上传商品主题图片( png / jpg /jpeg / gif /
                                    tiff,限1张,文件大小<=1.5MB,长宽比例为7:4)</el-button
                                >
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div> -->
                            </el-upload>
                        </el-form-item>

                        <el-form-item style="margin-top:-10px">
                            <!-- <el-button type="primary" @click="submitFormOne('addGoodsForm')">新增资料</el-button> -->
                            <el-button @click="dialogVisibleOne = false">关 闭</el-button>
                            <el-button @click="resetFormOne('addGoodsForm')">清 空</el-button>
                            <el-button @click="submitFormOne('addGoodsForm')" type="primary"
                                >提 交</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- 商品新增结束 -->
                <!-- 资料新增弹出 -->
                <el-dialog
                    :visible.sync="dialogVisibleTwo"
                    :close-on-click-modal="false"
                    v-dialogDrag
                    title="资料新增"
                    class="add-info"
                >
                    <el-form
                        ref="addGoodsInfoForm"
                        v-loading="loadingFour"
                        :model="addGoodsInfoForm"
                        :inline="true"
                        :rules="addGoodsInfoFormRules"
                        element-loading-text="资料新增中"
                        element-loading-spinner="el-icon-loading"
                        label-width="100px"
                        class="goods-add-info"
                    >
                        <el-form-item label="企业编码:" prop="goodsCD">
                            <el-input :value="addInfoDetails.comp_CD" :disabled="true" />
                        </el-form-item>
                        <el-form-item label="企业简称:" prop="compTitleName">
                            <el-input :value="compTitleName" :disabled="true" />
                        </el-form-item>
                        <el-form-item label="商品名称:" prop="goods_Name">
                            <el-input :value="addInfoDetails.goods_Name" :disabled="true" />
                        </el-form-item>
                        <el-form-item label="商品编码:" prop="goodsCD">
                            <el-input :value="addInfoDetails.goods_CD" :disabled="true" />
                        </el-form-item>
                        <!-- <el-form-item label="资料编码:" prop="goodsCD" style="100%" class="goodsInfoCd">
              <el-input v-model="addGoodsInfoForm.goodsCD" style="width:610px" />
            </el-form-item>-->
                        <el-form-item label="图片描述:" prop="photoMemo" style="width:100%">
                            <el-input
                                v-model="addGoodsInfoForm.photoMemo"
                                :rows="4"
                                type="textarea"
                                style="width:620px"
                                placeholder="200字符以内"
                            />
                        </el-form-item>
                        <el-form-item style="width:100%" label="商品图片:">
                            <el-upload
                                :on-change="handlePreviewTwo"
                                :on-remove="handleRemoveTwo"
                                :file-list="goodsPhotoList"
                                :auto-upload="false"
                                class="upload-demo"
                                action
                                list-type="picture"
                            >
                                <el-button size="small" type="primary" style="width:620px"
                                    >上传商品图片( png / jpg / jpeg / gif /
                                    tiff,限1张,文件大小<=1.5MB,长宽比例为7:4)</el-button
                                >
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="width:100%" label="商品说明书:">
                            <el-upload
                                :on-change="handlePreviewThree"
                                :on-remove="handleRemoveThree"
                                :file-list="readList"
                                :auto-upload="false"
                                class="upload-demo"
                                action
                                list-type="picture"
                            >
                                <el-button size="small" type="primary" style="width:620px"
                                    >上传商品说明书( png / jpg / jpeg / gif /
                                    tiff,限1张,文件大小<=1.5MB,长宽比例为7:4)</el-button
                                >
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="width:100%" label="其他图片">
                            <el-upload
                                :on-change="handlePreviewFour"
                                :on-remove="handleRemoveFour"
                                :file-list="otherList"
                                :auto-upload="false"
                                class="upload-demo"
                                action
                                list-type="picture"
                            >
                                <el-button size="small" type="primary" style="width:620px"
                                    >上传其他图片( png / jpg / jpeg / gif /
                                    tiff,限1张,文件大小<=1.5MB,长宽比例为7:4)</el-button
                                >
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="width:100%" />
                        <el-form-item style="margin-top:-40px">
                            <el-button @click="dialogVisibleTwo = false">关 闭</el-button>
                            <el-button @click="submitFormTwo('addGoodsInfoForm')" type="primary"
                                >提 交</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog
                    :visible.sync="dialogVisibleThree"
                    v-dialogDrag
                    title="商品详情"
                    width="50%"
                    center
                >
                    <el-form
                        :inline="true"
                        :auto-upload="false"
                        v-loading="goodsLoading"
                        label-width="100px"
                        element-loading-text="资料加载中"
                        element-loading-spinner="el-icon-loading"
                        style="text-align:center"
                    >
                        <el-form-item label="商品编码:" prop="goods_CD">
                            <el-input
                                :value="goodInfoDetails.goods_CD"
                                :disabled="true"
                                style="width:300px"
                            />
                        </el-form-item>
                        <el-form-item label="商品存证:" prop="goods_Hash">
                            <el-input
                                v-model="goodInfoDetails.goods_Hash"
                                :disabled="true"
                                style="width:300px"
                            />
                        </el-form-item>
                        <el-form-item label="商品名称:" prop="goods_Name">
                            <el-input
                                v-model="goodInfoDetails.goods_Name"
                                :disabled="true"
                                style="width:300px"
                            />
                        </el-form-item>
                        <el-form-item label="商品简称:" prop="goods_Simple_Name">
                            <el-input
                                v-model="goodInfoDetails.goods_Simple_Name"
                                :disabled="true"
                                style="width:300px"
                            />
                        </el-form-item>
                        <el-form-item label="商品规格:" prop="goods_Spen">
                            <el-input
                                v-model="goodInfoDetails.goods_Spen"
                                :disabled="true"
                                style="width:300px"
                            />
                        </el-form-item>

                        <el-form-item label="保质期:" prop="shelf_life">
                            <el-input
                                v-model="goodInfoDetails.shelf_life"
                                :disabled="true"
                                style="width:300px"
                            />
                        </el-form-item>
                        <!-- <el-form-item label="商品描述:" prop="comp_Contact">
              <el-input v-model="goodInfoDetails.comp_Contact" :disabled="true" />
            </el-form-item>
            <el-form-item label="联系人电话:" prop="cont_Phone">
              <el-input v-model="goodInfoDetails.cont_Phone" :disabled="true" />
            </el-form-item>-->
                        <el-form-item label="商品描述:" prop="goods_Describe">
                            <el-input
                                v-model="goodInfoDetails.goods_Describe"
                                :rows="3"
                                :disabled="true"
                                type="textarea"
                                style="width:300px"
                                placeholder="500字符以内"
                            />
                        </el-form-item>
                        <el-form-item label="商品备注:" prop="goods_Memo">
                            <el-input
                                v-model="goodInfoDetails.goods_Memo"
                                :rows="3"
                                :disabled="true"
                                type="textarea"
                                style="width:300px"
                                placeholder="500字符以内"
                            />
                        </el-form-item>
                        <!-- <el-form-item label="保质期:" prop="shelfLife">
              <el-input v-model="addGoodsForm.shelfLife" />
            </el-form-item>-->
                        <el-form-item label prop="goods_Photo" style="width:100%;height:100%;">
                            商品图片
                            <div style="width:400px;height:400px;">
                                <img
                                    :src="goods_Photo"
                                    style="width: 100%;height: 100%;margin:0 auto"
                                />
                            </div>
                            <!-- <div style="width:400px;height:400px;background-color:red;">
                <img :src="compImgSrc" style="width: 100%;height: 100%;margin:0 auto" >
              </div>-->
                            <!-- <img :src="logoSrc" style="max-width: 100%;max-height: 100%;margin:0 auto" />
              <img :src="compImgSrc" style="max-width: 100%;max-height: 100%;margin:0 auto" />-->
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog
                    :visible.sync="dialogVisibleFour"
                    v-dialogDrag
                    title="资料详情"
                    width="50%"
                    center
                >
                    <span>
                        <div>
                            <el-row style="margin-top:10px">
                                <el-button @click="toFirst('1')">首 条</el-button>
                                <el-button @click="toPur('3')" icon="el-icon-arrow-left"
                                    >上一条</el-button
                                >
                                <el-button @click="toNext('4')">
                                    下一条
                                    <i class="el-icon-arrow-right el-icon--right" />
                                </el-button>
                                <el-button @click="toLast('2')">末 条</el-button>
                                <el-button @click="close" style="float:right">关闭</el-button>
                            </el-row>
                        </div>
                        <el-form
                            :model="infoDialog"
                            v-loading="imgLoading"
                            :inline="true"
                            label-width="80px"
                            style="margin-left:-5px;margin-top:20px;"
                            element-loading-text="资料加载中"
                            element-loading-spinner="el-icon-loading"
                        >
                            <el-form-item label="资料编码:" prop="photo_CD">
                                <el-input
                                    v-model="infoDialog.photo_CD"
                                    :disabled="true"
                                    style="width:350px"
                                />
                            </el-form-item>
                            <el-form-item label="资料类型:" prop="photo_Type">
                                <el-input
                                    :value="
                                        infoDialog.photo_Type === '00'
                                            ? '商品图片'
                                            : infoDialog.photo_Type === '90'
                                            ? '其他图片'
                                            : '商品说明书'
                                    "
                                    style="width:350px"
                                    disabled
                                />
                            </el-form-item>
                            <el-form-item label="资料名称:" prop="photo_Name" style="width:100%">
                                <el-input
                                    v-model="infoDialog.photo_Name"
                                    :disabled="true"
                                    style="width:795px"
                                />
                            </el-form-item>
                            <el-form-item label="资料存证:" prop="photo_Hash">
                                <el-input
                                    :value="
                                        infoDialog.photo_Hash == null
                                            ? '暂未存证'
                                            : infoDialog.photo_Hash
                                    "
                                    :disabled="true"
                                    style="width:350px"
                                />
                            </el-form-item>
                            <el-form-item label="存证时间:" prop="photo_Hash_Datetime">
                                <el-input
                                    :value="
                                        infoDialog.photo_Hash_Datetime == null
                                            ? '无存证时间'
                                            : changeTimestamp(infoDialog.photo_Hash_Datetime * 1000)
                                    "
                                    :disabled="true"
                                    style="width:350px"
                                />
                            </el-form-item>
                            <div style="height:100%;width:100%;text-align:center">
                                <img :src="src" style="max-width: 100%;min-height: 500px;" />
                            </div>
                        </el-form>
                    </span>
                </el-dialog>
                <!-- 商品编辑弹出框开始 -->

                <el-dialog
                    :visible.sync="editDialogVisible"
                    :close-on-click-modal="false"
                    v-dialogDrag
                    title="商品信息编辑"
                    width="50%"
                    center
                    class="edit-goods"
                >
                    <span>
                        <el-form
                            ref="editData"
                            :inline="true"
                            :model="editData"
                            v-loading="editDataLoading"
                            :element-loading-text="editDataLoadingText"
                            :rules="editDataRules"
                            label-width="100px"
                            class="demo-form-inline"
                            style="text-align:center"
                            element-loading-spinner="el-icon-loading"
                        >
                            <el-form-item label="企业编码:" prop="comp_CD">
                                <el-input
                                    v-model="editData.comp_CD"
                                    :disabled="true"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品编码:" prop="goods_CD">
                                <el-input
                                    v-model="editData.goods_CD"
                                    :disabled="true"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品名称:" prop="goods_Name">
                                <el-input
                                    v-model="editData.goods_Name"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品简称:" prop="goods_Simple_Name">
                                <el-input
                                    v-model="editData.goods_Simple_Name"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品规格:" prop="goods_Spen">
                                <el-input
                                    v-model="editData.goods_Spen"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="保质期:" prop="shelf_life">
                                <el-input
                                    v-model="editData.shelf_life"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品描述:" prop="goods_Describe">
                                <el-input
                                    v-model="editData.goods_Describe"
                                    :rows="3"
                                    type="textarea"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="商品备注:" prop="goods_Memo">
                                <el-input
                                    v-model="editData.goods_Memo"
                                    :rows="3"
                                    type="textarea"
                                    style="width:300px"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div>商品图片</div>

                                <el-upload
                                    :on-change="editPhotoHandlePreview"
                                    :on-remove="editPhotoHandleRemove"
                                    :file-list="editPhotoFileList"
                                    :auto-upload="false"
                                    :limit="1"
                                    class="upload-demo"
                                    action
                                    list-type="picture"
                                >
                                    <el-button
                                        @click="editGoodsPhotoInfo"
                                        size="small"
                                        type="primary"
                                        style="width:350px"
                                        >商品图片(png/jpg/jpeg/gif/tiff,限1张,文件大小<=1.5MB)</el-button
                                    >
                                </el-upload>
                                <div :class="{ goodsPhotoActive: isgoodsPhotoActive }">
                                    <img
                                        :src="editGoodsPhoto"
                                        style="width: 100%;height: 100%;width:350px;height:350px;"
                                    />
                                </div>
                            </el-form-item>
                            <el-form-item style="width:100%;margin-top:-10px">
                                <el-button @click="editDialogVisible = false">关 闭</el-button>
                                <!-- <el-button type="primary" @click="editGoodsInfo">编 辑</el-button> -->
                                <el-button @click="submitGoodsInfo('editData')" type="primary"
                                    >提 交</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </span>
                    <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editGoodsInfo">编 辑</el-button>
            <el-button type="primary" @click="submitGoodsInfo">确 定</el-button>
          </span>-->
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import {
    searchGoods,
    delGoods,
    addGoods,
    inputGoodsHash,
    goodsDataDetails,
    allGoods,
    allGoodsData,
    inputgoodsDataHash,
    goodsDataGoods,
    allGoodsForCompCD,
    delGoodsData,
    goodsDetails,
    editGoods,
    exitHashComp,
    showAllCompNameID
} from '../../api/api';
export default {
    data() {
        let validateGoodsCD = (rule, value, callback) => {
            let reg = /^[a-zA-Z\d~\!@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'\<,\>\.\?\/]+$/;
            if (!reg.test(value)) {
                callback(new Error('编码不能包含空格和汉字'));
            } else {
                callback();
            }
        };
        return {
            editDataRules: {
                // comp_CD: [
                //   { required: true, message: "请输入企业编码", trigger: "blur" }
                // ],
                // goods_CD: [
                //   { required: true, message: "请输入商品编码", trigger: "blur" }
                // ],
                goods_Name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                goods_Simple_Name: [
                    { required: true, message: '请输入商品简称', trigger: 'blur' },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                goods_Spen: [
                    { required: true, message: '请输入商品规格', trigger: 'blur' },
                    {
                        min: 1,
                        max: 100,
                        message: '长度在 1 到 100 个字符',
                        trigger: 'blur'
                    }
                ],
                shelf_life: [
                    { required: true, message: '请输入保质期', trigger: 'blur' },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                goods_Describe: [
                    { required: true, message: '请输入商品描述', trigger: 'blur' },
                    {
                        min: 1,
                        max: 500,
                        message: '长度在 1 到 500 个字符',
                        trigger: 'blur'
                    }
                ],
                goods_Memo: [{ required: true, message: '请输入商品备注', trigger: 'blur' }]
            },
            addGoodsInfoFormRules: {
                photoMemo: [
                    { required: true, message: '请输入图片描述', trigger: 'blur' },
                    {
                        min: 1,
                        max: 200,
                        message: '长度在 1 到 200 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            addGoodsRules: {
                goodsCD: [
                    { required: true, message: '请输入商品编码', trigger: 'blur' },
                    {
                        min: 1,
                        max: 20,
                        message: '长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                    // { validator: validateGoodsCD, trigger: "blur" }
                ],
                compCD: [{ required: true, message: '请选择企业编码', trigger: 'blur' }],
                goodsName: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                goodsSimpleName: [
                    { required: true, message: '请输入商品简称', trigger: 'blur' },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                goodsSpen: [
                    { required: true, message: '请输入商品规格', trigger: 'blur' },
                    {
                        min: 1,
                        max: 100,
                        message: '长度在 1 到 100 个字符',
                        trigger: 'blur'
                    }
                ],
                goodsDescribe: [
                    { required: true, message: '请输入商品描述', trigger: 'blur' },
                    {
                        min: 1,
                        max: 500,
                        message: '长度在 1 到 500 个字符',
                        trigger: 'blur'
                    }
                ],
                goodsMemo: [
                    // { required: true, message: "请输入商品备注", trigger: "blur" },
                    {
                        min: 1,
                        max: 500,
                        message: '长度在 1 到 500 个字符',
                        trigger: 'blur'
                    }
                ],
                shelfLife: [
                    { required: true, message: '请输入保质期', trigger: 'blur' },
                    {
                        min: 1,
                        max: 50,
                        message: '长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                goodsPhoto: [{ required: true, message: '请上传商品图片', trigger: 'blur' }]
            },
            addGoodsInfoForm: {
                photoMemo: '',
                goodsCD: '',
                goodsDataPhoto_goods: [],
                goodsDataPhoto_book: [],
                goodsDataPhoto_others: []
            },
            editData: {
                goods_CD: '',
                goods_ID: '',
                comp_ID: '',
                goods_Name: '',
                goods_Simple_Name: '',
                goods_Spen: '',
                shelf_life: '',
                goods_Describe: '',
                goods_Memo: ''
            },
            editGoodsPhoto: '',
            editPhotoFileList: [],
            // editDisabled: true,
            src: '',
            infoPhtotoCd: '',
            loadingOne: false,
            loadingTwo: false,
            loadingFour: false,
            editDataLoading: false,
            editDataLoadingText: '',
            // addGoodsInfoRules: {
            //   goodsCD: [
            //     { required: true, message: '请输入商品编码', trigger: 'blur' }
            //   ],
            //   photoMemo: [
            //     { required: true, message: '请输入备注信息', trigger: 'blur' }
            //   ]
            // },
            fileList: [],
            goodsPhotoList: [],
            readList: [],
            otherList: [],
            queryForm: {
                compCD: '',
                compSimpName: '',
                goodsName: '',
                compName: '',
                goodsSimpleName: '',
                goodsCD: '',
                pageSize: 5,
                pageNum: 1,
                spen: ''
            },
            tableRadioOne: '',
            userType: '',
            tableRadioTwo: '',
            addGoodsForm: {
                goodsCD: '',
                goodsName: '',
                goodsSimpleName: '',
                goodsSpen: '',
                goodsDescribe: '',
                goodsMemo: '',
                shelfLife: '',
                goodsPhoto: '',
                compCD: ''
            },
            dialogImageUrl: '',
            dialogVisible: false,
            addGoodsCompCD: '',
            editUserForm: {},
            goodInfoDetails: {},
            multipleSelection: [],
            goods_Photo: '',
            queryValue: '',
            loadingThree: false,
            addGoodsValue: '',
            goodsData: [],
            compTitleName: '',
            compTitleCd: '',
            compSimpName: '',
            goodsInfoData: [],
            dialogVisibleOne: false,
            dialogVisibleTwo: false,
            dialogVisibleThree: false,
            dialogVisibleFour: false,
            editDialogVisible: false,
            isgoodsPhotoActive: false,
            currentPageOne: 1,
            pageSizeOne: 5,
            totalNumOne: 0,
            currentPageTwo: 1,
            pageSizeTwo: 5,
            totalNumTwo: 0,
            goodsEnv: '',
            goodsInfoEnv: '',
            compCdForInfo: '',
            infoDialog: {},
            addInfoDetails: {},
            nextPhotoCd: '',
            addInfoGoodsCd: '',
            imgLoading: false,
            goodsLoading: false,
            layGoodsLoading: false,
            layGoodsInfoLoading: false,
            goodsDataLoadingText: '',
            goodsInfoDataLoadingText: '',
            selectRow: [],
            selectData: [],
            selectInfoRow: [],
            selectInfoData: [],
            goodsPhotofileList: [],
            selectValData: [],
            goodsEnvDataInfo: [],
            compCDoptions: [],
            addGoodsInfoGoodsCD: '',
            remnAntOne: 600
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
                    this.selectRow.push(this.goodsData.indexOf(item));
                });
            }
        },
        selectInfoData(data) {
            this.selectInfoRow = [];
            if (data.length > 0) {
                data.forEach((item, index) => {
                    this.selectInfoRow.push(this.goodsInfoData.indexOf(item));
                });
            }
        }
    },
    created() {
        allGoods({ pageSize: 5, pageNum: 1 }, this.$store.getters.token).then((res) => {
            this.compTitleName = res.compSimpNameMSG;
            this.compTitleCd = res.compCD;
        });
        this.searchGoodsInfo();
        this.showAllCompNameIDInfo();
        this.userType = localStorage.getItem('user_Type');
        this.addGoodsCompCD = localStorage.getItem('comp_CD');
    },
    methods: {
        descInputOne() {
            let txtLength = this.addGoodsForm.goodsDescribe.length;
            this.remnAntOne = 200 - txtLength;
        },
        editGoodsPhotoInfo() {
            this.editGoodsPhoto = '';
            this.isgoodsPhotoActive = true;
        },
        submitGoodsInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editDataLoadingText = '商品资料更新中';
                    this.editDataLoading = true;
                    const formData = new FormData();
                    formData.append('goodsMessage', JSON.stringify(this.editData));
                    formData.append('photo', this.editGoodsPhoto);
                    editGoods(formData, this.$store.getters.token).then((res) => {
                        this.editDataLoading = false;
                        if (res.code == 200) {
                            this.$notify({
                                title: '成功!',
                                message: '商品资料更新成功!',
                                type: 'success'
                            });
                            this.searchGoodsInfo();
                            this.editDialogVisible = false;
                        } else if (res.code == 500) {
                            this.$notify({
                                title: '失败!',
                                message: res.msg,
                                type: 'warning'
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        showAllCompNameIDInfo() {
            showAllCompNameID(this.$store.getters.token).then((res) => {
                if (res.code == 1) {
                    this.compCDoptions = res.allCompNameID;
                }
            });
        },
        editPhotoHandlePreview(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.editPhotoFileList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.editPhotoFileList = [];
                return false;
            }
            this.editGoodsPhoto = fileList[0].raw;
        },
        editPhotoHandleRemove(file, fileList) {
            this.editGoodsPhoto = '';
        },

        handleEdit(index, row) {
            this.editDialogVisible = true;
            this.editDataLoading = true;
            this.isgoodsPhotoActive = false;
            this.editPhotoFileList = [];

            goodsDetails({ goodsCD: row.goods_CD }, this.$store.getters.token).then((res) => {
                this.editDataLoading = false;
                this.editData.comp_CD = res[0].comp_CD;
                this.editData.comp_ID = res[0].comp_ID;
                this.editData.goods_CD = res[0].goods_CD;
                this.editData.goods_ID = res[0].goods_ID;
                this.editData.goods_Name = res[0].goods_Name;
                this.editData.goods_Simple_Name = res[0].goods_Simple_Name;
                res[0].goods_Memo == 'undefined'
                    ? ''
                    : (this.editData.goods_Memo = res[0].goods_Memo);
                this.editData.shelf_life = res[0].shelf_life;
                this.editData.goods_Describe = res[0].goods_Describe;
                this.editData.goods_Spen = res[0].goods_Spen;
                this.editGoodsPhoto = res[0].goods_Photo;
            });
        },
        chooseInstanceOne(val) {
            this.selectValData = val;
            this.selectData = val;

            val.length < 1
                ? (this.addGoodsInfoGoodsCD = '')
                : (this.addGoodsInfoGoodsCD = val[0].goods_CD);

            if (val.length > 1) {
                // this.$refs.goodsData.clearSelection();
                // this.$refs.goodsData.toggleRowSelection(val.pop());
            } else if (val.length == 1) {
                if (val[0] != undefined) {
                    this.compTitleName = val[0].comp_Simp_Name;
                    this.addInfoDetails = val[0];
                    this.addInfoGoodsCd = val[0].goods_CD;
                    this.compCdForInfo = val[0].goods_CD;
                    this.multipleSelection = val[0];
                    this.goodsEnv = val[0].goods_CD;
                    this.goods_NameEnv = val[0].goods_Name;
                    this.goods_SpenEnv = val[0].goods_Spen;
                    this.goods_DescribeEnv = val[0].goods_Describe;

                    this.loadingThree = true;
                    allGoodsForCompCD(
                        {
                            goodsCD: val[0].goods_CD,
                            pageSize: this.pageSizeTwo,
                            pageNum: this.currentPageTwo
                        },
                        this.$store.getters.token
                    ).then((res) => {
                        this.loadingThree = false;
                        this.goodsInfoData = res.goodsMsg;
                        this.totalNumTwo = res.totalNum[0].total;
                    });
                }
            } else {
                this.goodsEnv = '';
                this.goods_NameEnv = '';
                this.goods_SpenEnv = '';
                this.goods_DescribeEnv = '';
                this.goodsInfoData = [];
                this.totalNumTwo = 0;
            }
        },
        chooseInstanceTwo(val) {
            this.selectInfoData = val;
            this.goodsEnvDataInfo = val;
        },
        tableCurrentChangeOne(currentRow, oldCurrentRow) {
            this.$refs.goodsData.toggleRowSelection(currentRow);
        },
        tableCurrentChangeTwo(currentRow, oldCurrentRow) {
            this.$refs.goodsInfoData.toggleRowSelection(currentRow);
        },
        handleDeleteOne(index, row) {
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.loadingOne = true;
                    delGoods({ goodsCD: row.goods_CD }, this.$store.getters.token).then((res) => {
                        this.loadingOne = false;
                        if (res.code === 1) {
                            this.queryForm.pageNum = 1;
                            this.$notify({
                                title: '成功!',
                                message: '删除成功!',
                                type: 'success'
                            });
                            this.searchGoodsInfo();
                        } else if (res.code == 2) {
                            this.$notify({
                                title: '失败!',
                                message: '请先删除该商品下的所有标签!',
                                type: 'warning'
                            });
                        } else if (res.code == 3) {
                            this.$notify({
                                title: '失败!',
                                message: '商品已存证,无法删除!',
                                type: 'warning'
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        handleDeleteTwo(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.loadingThree = true;
                    delGoodsData({ photoCD: row.photo_CD }, this.$store.getters.token).then(
                        (res) => {
                            allGoodsForCompCD(
                                {
                                    goodsCD: this.compCdForInfo,
                                    pageSize: this.pageSizeTwo,
                                    pageNum: this.currentPageTwo
                                },
                                this.$store.getters.token
                            ).then((res) => {
                                this.loadingThree = false;
                                this.goodsInfoData = res.goodsMsg;
                                this.totalNumTwo = res.totalNum[0].total;
                            });
                            if (res.code === 1) {
                                this.$notify({
                                    title: '成功!',
                                    message: '删除成功!',
                                    type: 'success'
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
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        changeRowColorTwo({ row, rowIndex }) {
            if (this.selectInfoRow.includes(rowIndex)) {
                return 'background-color:rgba(194, 224, 255,1) ';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgb(230, 230, 230)';
            }
        },
        changeRowColorOne({ row, rowIndex }) {
            if (this.selectRow.includes(rowIndex)) {
                return 'background-color:rgba(194, 224, 255,1) ';
            }
            if (rowIndex % 2 === 1) {
                return 'background-color:rgba(230, 230, 230)';
            }
        },

        addGoodsInfo() {
            if (this.userType == 2) {
                Object.keys(this.addGoodsForm).forEach((key) => (this.addGoodsForm[key] = ''));
                this.goodsPhotofileList = [];
                this.dialogVisibleOne = true;
            } else {
                exitHashComp({ compCD: this.addGoodsCompCD }, this.$store.getters.token).then(
                    (res) => {
                        if (res.code == 1) {
                            this.dialogVisibleOne = true;
                            Object.keys(this.addGoodsForm).forEach(
                                (key) => (this.addGoodsForm[key] = '')
                            );
                        } else if (res.code == 2) {
                            this.$notify({
                                title: '注意!',
                                message: '企业不存在或未存证!',
                                type: 'warning'
                            });
                        }
                    }
                );
            }
        },
        addInfo() {
            if (this.addGoodsInfoGoodsCD == '') {
                this.$notify({
                    title: '注意!',
                    message: '请先选择商品编码!',
                    type: 'warning'
                });
            } else {
                this.addGoodsInfoForm.photoMemo = '';
                this.addGoodsInfoForm.goodsDataPhoto_goods = '';
                this.addGoodsInfoForm.goodsDataPhoto_book = '';
                this.addGoodsInfoForm.goodsDataPhoto_others = '';
                this.goodsPhotoList = [];
                this.readList = [];
                this.otherList = [];
                this.dialogVisibleTwo = true;
            }
        },
        submitFormOne(formName) {
            if (this.addGoodsForm.goodsPhoto == '') {
                this.$notify({
                    title: '注意!',
                    message: '请上传商品主题图片!',
                    type: 'warning'
                });
            } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loadingTwo = true;
                        const formData = new FormData();
                        formData.append('goodsCD', this.addGoodsForm.goodsCD);
                        formData.append('compCD', this.addGoodsForm.compCD);
                        formData.append('goodsName', this.addGoodsForm.goodsName);
                        formData.append('goodsSimpleName', this.addGoodsForm.goodsSimpleName);
                        formData.append('goodsSpen', this.addGoodsForm.goodsSpen);
                        formData.append('goodsDescribe', this.addGoodsForm.goodsDescribe);
                        formData.append('goodsMemo', this.addGoodsForm.goodsMemo);
                        formData.append('shelfLife', this.addGoodsForm.shelfLife);
                        formData.append('goodsPhoto', this.addGoodsForm.goodsPhoto);
                        formData.get('goodsPhoto');

                        addGoods(formData, this.$store.getters.token).then((res) => {
                            this.loadingTwo = false;
                            document.getElementById('inputId').focus();

                            if (res.code === 1) {
                                this.$notify({
                                    title: '成功!',
                                    message: '添加商品成功!',
                                    type: 'success'
                                });
                                this.loadingTwo = false;
                                this.addGoodsForm.goodsPhoto = '';
                                this.goodsPhotofileList = [];
                                this.searchGoodsInfo();
                            } else if (res.code === 4) {
                                this.$notify({
                                    title: '注意!',
                                    message: '商品编码已存在!',
                                    type: 'warning'
                                });
                            } else if (res.code === 6) {
                                this.$notify({
                                    title: '注意!',
                                    message: '企业编码不存在，请填写已存在的企业编码!',
                                    type: 'warning'
                                });
                                this.loadingTwo = false;
                            } else if (res.code === 7) {
                                this.$notify({
                                    title: '注意!',
                                    message: '企业未存证,无法新增商品!',
                                    type: 'warning'
                                });
                                this.loadingTwo = false;
                            } else if (res.code === 5) {
                                this.$notify({
                                    title: '注意!',
                                    message: '图片格式仅支持jpg和png格式!',
                                    type: 'warning'
                                });
                                this.loadingTwo = false;
                            } else if (res.code == 13) {
                                this.$notify({
                                    title: '注意!',
                                    message: '企业编码不存在!',
                                    type: 'warning'
                                });
                            } else if (res.code == 9) {
                                this.$notify({
                                    title: '注意!',
                                    message: '该商品名和规格已重复!',
                                    type: 'warning'
                                });
                            } else {
                                this.loadingTwo = false;
                            }
                        });
                    }
                });
            }
        },

        resetFormOne(formName) {
            this.$refs[formName].resetFields();
            this.addGoodsForm.goodsPhoto = '';
            this.goodsPhotofileList = [];
        },
        submitFormTwo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loadingFour = true;
                    const formData = new FormData();
                    formData.append('goodsCD', this.addInfoGoodsCd);
                    formData.append('photoMemo', this.addGoodsInfoForm.photoMemo);
                    for (let i = 0; i < this.addGoodsInfoForm.goodsDataPhoto_goods.length; i++) {
                        formData.append(
                            'goodsDataPhoto_goods',
                            this.addGoodsInfoForm.goodsDataPhoto_goods[i].raw
                        );
                    }

                    for (let m = 0; m < this.addGoodsInfoForm.goodsDataPhoto_book.length; m++) {
                        formData.append(
                            'goodsDataPhoto_book',
                            this.addGoodsInfoForm.goodsDataPhoto_book[m].raw
                        );
                    }
                    for (let k = 0; k < this.addGoodsInfoForm.goodsDataPhoto_others.length; k++) {
                        formData.append(
                            'goodsDataPhoto_others',
                            this.addGoodsInfoForm.goodsDataPhoto_others[k].raw
                        );
                    }

                    goodsDataGoods(formData, this.$store.getters.token).then((res) => {
                        this.loadingFour = false;

                        if (res.code === 1) {
                            allGoodsForCompCD(
                                {
                                    goodsCD: this.compCdForInfo,
                                    pageSize: this.pageSizeTwo,
                                    pageNum: this.currentPageTwo
                                },
                                this.$store.getters.token
                            ).then((res) => {
                                this.goodsInfoData = res.goodsMsg;
                                this.totalNumTwo = res.totalNum[0].total;
                            });
                            this.$notify({
                                title: '成功!',
                                message: '添加资料成功!',
                                type: 'success'
                            });

                            this.loadingFour = false;
                            this.dialogVisibleTwo = false;
                        } else if (res.code === 2) {
                            this.$notify({
                                title: '失败!',
                                message: '图片上传失败，请重新上传!',
                                type: 'warning'
                            });
                            this.loadingFour = false;

                            return false;
                        }
                    });
                }
            });
        },
        resetFormTwo(formName) {
            this.$refs[formName].resetFields();
        },
        handleSizeChangeOne(val) {
            this.queryForm.pageSize = val;
            this.queryForm.pageNum = 1;

            this.changePageGoodsInfo();
        },
        handleCurrentChangeOne(val) {
            this.queryForm.pageNum = val;
            this.changePageGoodsInfo();
        },
        handleSizeChangeTwo(val) {
            this.pageSizeTwo = val;
            this.currentPageTwo = 1;

            allGoodsForCompCD(
                {
                    goodsCD: this.compCdForInfo,
                    pageSize: this.pageSizeTwo,
                    pageNum: this.currentPageTwo
                },
                this.$store.getters.token
            ).then((res) => {
                this.goodsInfoData = res.goodsMsg;
                this.totalNumTwo = res.totalNum[0].total;
            });
        },
        handleCurrentChangeTwo(val) {
            this.currentPageTwo = val;
            allGoodsForCompCD(
                {
                    goodsCD: this.compCdForInfo,
                    pageSize: this.pageSizeTwo,
                    pageNum: this.currentPageTwo
                },
                this.$store.getters.token
            ).then((res) => {
                this.goodsInfoData = res.goodsMsg;
                this.totalNumTwo = res.totalNum[0].total;
            });
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemoveOne(file, fileList) {
            this.addGoodsForm.goodsPhoto = '';
        },
        handlePreviewOne(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.goodsPhotofileList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.goodsPhotofileList = [];
                return false;
            }
            this.addGoodsForm.goodsPhoto = file.raw;
        },
        handleRemoveTwo(file, fileList) {
            const obj = {};
            this.addGoodsInfoForm.goodsDataPhoto_goods = this.addGoodsInfoForm.goodsDataPhoto_goods.reduce(
                (cur, next) => {
                    obj[next.uid] ? '' : (obj[next.uid] = true && cur.push(next));
                    return cur;
                },
                []
            );
        },
        handlePreviewTwo(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.goodsPhotoList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.goodsPhotoList = [];
                return false;
            }
            this.addGoodsInfoForm.goodsDataPhoto_goods = fileList;
        },
        handleRemoveThree(file, fileList) {
            const obj = {};
            this.addGoodsInfoForm.goodsDataPhoto_book = this.addGoodsInfoForm.goodsDataPhoto_book.reduce(
                (cur, next) => {
                    obj[next.uid] ? '' : (obj[next.uid] = true && cur.push(next));
                    return cur;
                },
                []
            );
        },
        handlePreviewThree(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.readList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.readList = [];
                return false;
            }
            this.addGoodsInfoForm.goodsDataPhoto_book = fileList;
        },
        handleRemoveFour(file, fileList) {
            const obj = {};
            this.addGoodsInfoForm.goodsDataPhoto_others = this.addGoodsInfoForm.goodsDataPhoto_others.reduce(
                (cur, next) => {
                    obj[next.uid] ? '' : (obj[next.uid] = true && cur.push(next));
                    return cur;
                },
                []
            );
        },

        handlePreviewFour(file, fileList) {
            const isIMAGE1 = file.raw.type === 'image/png';
            const isIMAGE2 = file.raw.type === 'image/gif';
            const isIMAGE3 = file.raw.type === 'image/jpg';
            const isIMAGE4 = file.raw.type === 'image/jpeg';
            const isIMAGE5 = file.raw.type === 'image/tiff';
            const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

            if (!isIMAGE1 && !isIMAGE2 && !isIMAGE3 && !isIMAGE4 && !isIMAGE5) {
                this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
                this.otherList = [];
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1.5MB!');
                this.otherList = [];
                return false;
            }
            this.addGoodsInfoForm.goodsDataPhoto_others = fileList;
        },

        showGoodsDetails(goodsCD) {
            this.goodsLoading = true;
            this.dialogVisibleThree = true;
            goodsDetails({ goodsCD: goodsCD }, this.$store.getters.token).then((res) => {
                this.goodsLoading = false;
                this.goodInfoDetails = res[0];
                this.goods_Photo = res[0].goods_Photo;
            });
        },
        searchGoodsInfo() {
            this.loadingOne = true;
            this.queryForm.pageNum = 1;
            searchGoods(this.queryForm, this.$store.getters.token).then((res) => {
                this.loadingOne = false;
                this.goodsData = res;
                this.goodsData = res.temp;
                this.totalNumOne = res.totalNum_B[0].total;
            });
        },
        changePageGoodsInfo() {
            searchGoods(this.queryForm, this.$store.getters.token).then((res) => {
                this.goodsData = res;
                this.goodsData = res.temp;
                this.totalNumOne = res.totalNum_B[0].total;
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
        layGoods() {
            if (this.selectValData.length > 0) {
                this.layGoodsLoading = true;
                this.loadingOne = true;
                this.goodsDataLoadingText = '存证中';
                let inputGoodsData = [];
                for (let k = 0; k < this.selectValData.length; k++) {
                    inputGoodsData.push(this.selectValData[k].goods_CD);
                }

                inputGoodsHash(
                    {
                        goodsCD: inputGoodsData
                    },
                    this.$store.getters.token
                ).then((res) => {
                    this.layGoodsLoading = false;
                    this.loadingOne = false;

                    if (res.code === 1) {
                        this.searchGoodsInfo();
                        this.$notify({
                            title: '成功!',
                            message: '存证成功!',
                            type: 'success'
                        });
                    } else if (res.code === 2) {
                        this.$notify({
                            title: '注意!',
                            message: res.msg,
                            type: 'warning'
                        });
                    } else if (res.code === 3) {
                        this.$notify({
                            title: '注意!',
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                });
            } else if (!this.selectValData.length) {
                this.$notify({
                    title: '注意!',
                    message: '请选择存证条目!',
                    type: 'warning'
                });
            }
        },
        layGoodsInfo() {
            if (!this.goodsEnvDataInfo.length) {
                this.$notify({
                    title: '注意!',
                    message: '请选择需要存证的条目!',
                    type: 'warning'
                });
            } else {
                this.layGoodsInfoLoading = true;
                this.loadingThree = true;
                this.goodsInfoDataLoadingText = '存证中';
                let goodsEnvData = [];
                for (let i = 0; i < this.goodsEnvDataInfo.length; i++) {
                    goodsEnvData.push(this.goodsEnvDataInfo[i].photo_CD);
                }

                inputgoodsDataHash({ photoCDs: goodsEnvData }, this.$store.getters.token).then(
                    (res) => {
                        this.layGoodsInfoLoading = false;
                        this.loadingThree = false;

                        if (res.code === 1) {
                            this.$notify({
                                title: '成功!',
                                message: '存证成功!',
                                type: 'success'
                            });
                            allGoodsForCompCD(
                                {
                                    goodsCD: this.compCdForInfo,
                                    pageSize: this.pageSizeTwo,
                                    pageNum: this.currentPageTwo
                                },
                                this.$store.getters.token
                            ).then((res) => {
                                this.goodsInfoData = res.goodsMsg;
                                this.totalNumTwo = res.totalNum[0].total;
                            });
                        } else if (res.code === 2) {
                            this.$notify({
                                title: '注意!',
                                message: '存在已存证过的条目，请重新选择!',
                                type: 'warning'
                            });
                        }
                    }
                );
            }
        },

        getallGoodsData() {
            allGoodsData(
                { pageNum: this.currentPageTwo, pageSize: this.pageSizeTwo },
                this.$store.getters.token
            ).then((res) => {
                this.goodsInfoData = res.sqlMsg;

                this.totalNumTwo = res.totalNum[0].total;
            });
        },
        showInfoDetails(data) {
            this.dialogVisibleFour = true;
            this.imgLoading = true;
            this.infoPhtotoCd = data;

            goodsDataDetails({ photoCD: data }, this.$store.getters.token).then((res) => {
                this.imgLoading = false;
                this.infoDialog = res;
                this.src = res.photo_Name;
                this.nextPhotoCd = res.photo_CD;
            });
        },
        close() {
            this.dialogVisibleFour = false;
        },
        toNext(condition) {
            goodsDataDetails(
                {
                    photoCD: this.nextPhotoCd,
                    condition: condition
                },
                this.$store.getters.token
            ).then((res) => {
                this.infoLoading = false;
                if (res.code === 4) {
                    this.nextPhotoCd = res.nextPhotoCD.photo_CD;

                    this.infoDialog = res.nextPhotoCD;
                    this.src = this.infoDialog.photo_Name;
                } else if (res.code === 5) {
                    this.$notify({
                        title: '注意!',
                        message: '不存在下一条!',
                        type: 'warning'
                    });
                }
            });
        },
        toLast(condition) {
            goodsDataDetails(
                {
                    photoCD: this.nextPhotoCd,
                    condition: condition
                },
                this.$store.getters.token
            ).then((res) => {
                this.infoDialog = res[0];
                this.nextPhotoCd = res[0].photo_CD;

                this.src = this.infoDialog.photo_Name;
            });
        },
        toPur(condition) {
            goodsDataDetails(
                {
                    photoCD: this.nextPhotoCd,
                    condition: condition
                },
                this.$store.getters.token
            ).then((res) => {
                this.infoLoading = false;
                if (res.code === 4) {
                    this.nextPhotoCd = res.onMsg.photo_CD;

                    this.infoDialog = res.onMsg;
                    this.src = this.infoDialog.photo_Name;
                } else if (res.code === 3) {
                    this.$notify({
                        title: '注意!',
                        message: '不存在上一条!',
                        type: 'warning'
                    });
                }
            });
        },
        toFirst(condition) {
            goodsDataDetails(
                {
                    photoCD: this.nextPhotoCd,
                    condition: condition
                },
                this.$store.getters.token
            ).then((res) => {
                this.nextPhotoCd = res[0].photo_CD;

                this.infoDialog = res[0];

                this.src = this.infoDialog.photo_Name;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.goods {
    .goodsPhotoActive {
        display: none;
    }
    &-info {
        // height: 40px;
        width: 95%;
        margin: 0 auto;
        // border-bottom: 1px solid rgba(200, 200, 200, 0.6);
        // line-height: 50px;
        // position: absolute;
        &-queryForm {
            width: 100%;
            // margin: 0 auto;
            // background-color: red;
        }
    }
    /deep/.el-radio__inner {
        // border: 1px solid #dcdfe6;
        // border-radius: 100%;
        // width: 14px;
        // height: 14px;
        // background-color: #fff;
        // cursor: pointer;
        // -webkit-box-sizing: border-box;
        // box-sizing: border-box;
        margin-left: 10px !important;
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
    }
    /deep/.el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: white;
        float: left;
    }
    &-goodsenv {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        background-color: rgb(48, 65, 86);
        color: white;
    }
    &-addgoods {
        float: left;
        background-color: rgb(48, 65, 86);
        color: white;
    }
    &-add-goods {
        margin-top: 10px;
        width: 100%;
        text-align: center;
    }
    &-query {
        width: 100px;
        background-color: rgb(48, 65, 86);
        color: white;
        float: right;
    }
    &-addGoods {
        width: 100px;
        background-color: rgb(48, 65, 86);
        color: white;
        float: right;
        margin-bottom: 10px;
    }
    &-form {
        padding-top: 10px;
        width: 100%;
        margin: 0 auto;
        border-top: 1px solid rgba(200, 200, 200, 0.6);
    }
    &-infoForm {
        padding-top: 10px;
        width: 100%;
        margin: 0 auto;
        border-top: 1px solid rgba(200, 200, 200, 0.6);
    }
    &-add-title {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 22px;
        margin-top: -20px;
        border-bottom: 1px solid rgba(200, 200, 200, 0.6);
    }
    &-add-info {
        text-align: center;
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
}
.grid-content {
    border-radius: 4px;
}
.row-bg {
    padding: 10px 0;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.showGoodsDetails {
    text-decoration: underline;
    color: rgba(64, 158, 255, 0.8);
}
.showGoodsDetails:hover {
    cursor: pointer;
    color: rgba(64, 158, 255, 1);
}
</style>
<style lang="scss">
.goods {
    // .el-table__body tr.current-row > td {
    //   background-color: rgba(64, 158, 255, 0.3);
    // }

    .edit-goods {
        .el-upload-list {
            width: 350px;
        }
    }
    .add-goods {
        .el-upload-list {
            width: 610px;
        }
    }
    .add-info {
        .el-upload-list {
            width: 610px;
        }
    }

    &-add-goods {
        /deep/.el-input__inner {
            width: 250px;
        }
    }
    &-add-info {
        /deep/.el-input__inner {
            width: 250px;
        }
    }
    .goodsInfoCd {
        /deep/.el-input__inner {
            width: 610px;
        }
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
