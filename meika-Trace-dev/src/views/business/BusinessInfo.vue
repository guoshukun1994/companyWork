<template>
  <div class="business">
    <div class="business-info">
      <span>企业信息维护</span>
    </div>
    <el-row
      style="width:95%;margin: 0 auto;margin-top:10px;border-bottom:1px solid rgba(200, 200, 200, 0.6)"
    >
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="height:50px">
          <el-form
            ref="queryForm"
            :model="queryForm"
            label-width="100px"
            class="business-queryForm"
            style="overflow-x:hidden;margin-left:-25px;line-height:50px"
          >
            <el-form-item label="企业编码:" style="float:left;" v-if="this.userType==2">
              <el-input v-model="queryForm.compCD" />
            </el-form-item>
            <el-form-item label="企业编码:" style="float:left;" v-if="this.userType!=2">
              <el-input v-model="showInfo.comp_CD" :disabled="true" />
            </el-form-item>
            <el-form-item label="企业名称:" style="float:left;" v-if="this.userType==2">
              <el-input v-model="queryForm.compName" />
            </el-form-item>
            <el-form-item label="企业名称:" style="float:left;" v-if="this.userType!=2">
              <el-input v-model="showInfo.comp_Name" :disabled="true" />
            </el-form-item>
            <el-form-item label="企业简称:" style="float:left;" v-if="this.userType==2">
              <el-input v-model="queryForm.compSimpName" />
            </el-form-item>
            <el-form-item label="企业简称:" style="float:left;" v-if="this.userType!=2">
              <el-input v-model="showInfo.comp_Simp_Name" :disabled="true" />
            </el-form-item>
            <el-form-item label="企业法人:" style="float:left;" v-if="this.userType==2">
              <el-input v-model="queryForm.compLeader" />
            </el-form-item>
            <el-form-item label="企业法人:" style="float:left;" v-if="this.userType!=2">
              <el-input v-model="showInfo.comp_Leader" :disabled="true" />
            </el-form-item>

            <el-button
              v-if="this.userType==2"
              class="business-query"
              icon="el-icon-search"
              @click="searchGoodsInfo"
              style="width:118px"
            >查 询</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div class="business-upButton" style="margin:0 auto;width:95%;margin-top:10px;">
      <!-- <div class="business-name">{{tableCompanyCd}} {{tableCompanyName}}</div> -->
      <el-row style="float:left;padding-bottom:10px">
        <el-button
          class="business-el-button"
          @click="addCompanyDia"
          icon="el-icon-circle-plus"
          v-if="userType=='2'"
        >企业新增</el-button>
        <el-button
          v-if="userType!=0"
          class="business-el-button"
          @click="layCompanyInfo"
          icon="el-icon-circle-check"
          :loading="layCompanyInfoLoading"
        >企业存证</el-button>
      </el-row>
    </div>

    <el-table
      ref="businessList"
      border
      :data="businessList"
      v-loading="loadingTwo"
      :element-loading-text="loadingTwoText"
      element-loading-spinner="el-icon-loading"
      tooltip-effect="dark"
      style="width: 95%;margin:0 auto"
      :header-cell-style="{background:'rgba(48, 65, 86,0.2)'}"
      :row-style="changeRowColorOne"
      @selection-change="chooseInstanceOne"
      @current-change="tableCurrentChangeOne"
      class="compInfoTable"
    >
      <!-- <el-table-column label="选择" width="55">
        <template slot-scope="scope">
          <el-radio v-model="tableRadioOne" :label="scope.row" @change="handleSelectionChangeOne">
            <i style="margin-left:40px" />
          </el-radio>
        </template>
      </el-table-column>-->
      <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center">
        <template slot-scope="scope">
          <span>{{ (queryForm.pageNum - 1) * queryForm.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="comp_CD"
        label="企业编码"
        width="100"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            class="companyID"
            @click="openCompanyDetails(scope.row.comp_CD)"
          >{{ scope.row.comp_CD }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="comp_Name"
        width="200"
        label="企业名称"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="comp_Simp_Name" label="企业简称" width="100" align="center" />
      <el-table-column
        prop="comp_Leader"
        :show-overflow-tooltip="true"
        label="企业法人"
        align="center"
        width="100"
      />
      <el-table-column prop="leader_Phone" label="企业法人电话" width="120" align="center" />
      <el-table-column
        prop="comp_Contact"
        label="联系人"
        width="90"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="cont_Phone" label="联系人电话" align="center" width="120" />
      <el-table-column
        prop="comp_Address"
        label="企业地址"
        align="center"
        width="250"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="comp_Hash"
        label="企业存证Hash"
        width="520"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{
          scope.row.comp_Hash==null ?'暂无存证':scope.row.comp_Hash
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="comp_Hash_Datetime"
        label="存证时间"
        width="160"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{
          scope.row.comp_Hash_Datetime==null?'暂无存证时间':changeTimestampInfo(scope.row.comp_Hash_Datetime*1000)
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" v-if="this.userType!=0" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDeleteOne(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="business-block" v-if="this.userType==2">
      <el-pagination
        @size-change="handleSizeChangeOne"
        @current-change="handleCurrentChangeOne"
        :current-page="queryForm.pageNum"
        :page-sizes="[5,10]"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="totalNumOne"
      ></el-pagination>
    </div>
    <div class="business-line" style="width:95%"></div>
    <!-- 第一个表格结束 -->
    <!-- 第二个表格开始 -->
    <div class="business-lineTwo">
      <el-row style="margin-top:10px">
        <!-- <el-button
          v-if="infoCompCd==''"
          @click="messageReminder"
          class="business-el-button"
          icon="el-icon-circle-plus"
          style="float:left"
        >资料新增</el-button>-->
        <el-button
          v-if="this.userType!=0"
          class="business-el-button"
          @click="addInfo"
          icon="el-icon-circle-plus"
          style="float:left"
        >资料新增</el-button>
        <el-button
          v-if="userType!=0"
          class="business-el-button"
          icon="el-icon-circle-check"
          @click="layData"
          style="float:left;margin-right:10px"
          :loading="layDataLoading"
        >资料存证</el-button>
      </el-row>
    </div>

    <el-table
      border
      ref="businessInfoList"
      :data="businessInfoList"
      v-loading="loadingInfo"
      :element-loading-text="loadingInfoText"
      element-loading-spinner="el-icon-loading"
      tooltip-effect="dark"
      style="width: 95%;margin:0 auto;margin-top:10px"
      :header-cell-style="{background:'rgba(48, 65, 86,0.2)'}"
      :row-style="changeRowColorTwo"
      :row-class-name="tableRowClassName"
      class="infoFrom"
      @selection-change="chooseInstanceTwo"
      @current-change="tableCurrentChangeTwo"
    >
      <!-- <el-table-column type="selection" align="center" width="70" /> -->
      <!-- <el-table-column label="选择" width="55" align="center">
        <template slot-scope="scope">
          <el-radio v-model="tableRadioOne" :label="scope.row" @change="handleSelectionChange">
            <i />
          </el-radio>
        </template>
      </el-table-column>-->
      <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
      <el-table-column label="序号" type="index" width="60" align="center">
        <template slot-scope="scope">
          <span>{{(pageNumTwo - 1) * pageSizeTwo + scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="comp_CD"
        label="企业编码"
        align="center"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template slot-scope="scope">{{ scope.row.comp_CD }}</template>
      </el-table-column>

      <el-table-column prop="photo_CD" label="资料编码" align="center" width="100">
        <template slot-scope="scope">
          <span
            class="companyID"
            @click="openInfoDetails(scope.row.photo_CD )"
          >{{ scope.row.photo_CD }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="photo_Type"
        label="资料类型"
        :show-overflow-tooltip="true"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.photo_Type=='90'?'其它':(scope.row.photo_Type=='00'?'企业图片':'资质证照') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="photo_Name"
        label="文件名"
        :show-overflow-tooltip="true"
        width="500"
        align="center"
      />
      <!-- <el-table-column
        prop="photo_Hash"
        label="存证Hash"
        align="center"
        :show-overflow-tooltip="true"
      />-->
      <el-table-column
        label="资料存证Hash"
        align="center"
        width="540"
        prop="photo_Hash"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{ scope.row.photo_Hash==null?'暂无存证':scope.row.photo_Hash }}</template>
      </el-table-column>
      <el-table-column
        label="存证时间"
        align="center"
        width="180"
        prop="photo_Hash_Datetime"
        :show-overflow-tooltip="true"
      >
        <template
          slot-scope="scope"
        >{{ scope.row.photo_Hash_Datetime==null?'暂无存证时间':changeTimestampInfo(scope.row.photo_Hash_Datetime*1000) }}</template>
      </el-table-column>

      <!-- <el-table-column
        prop="photo_Hash"
        label="总Hash"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="photo_Hash_Datetime" label="总Hash时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ changeTimestamp(scope.row.photo_Hash_Datetime*1000) }}</span>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" width="120" v-if="this.userType!=0" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDeleteTwo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="business-block">
      <el-pagination
        @size-change="handleSizeChangeTwo"
        @current-change="handleCurrentChangeTwo"
        :current-page="pageNumTwo"
        :page-sizes="[5, 10]"
        :page-size="pageSizeTwo"
        layout="total,sizes, prev, pager, next"
        :total="totalNumTwo"
      ></el-pagination>
      <el-dialog
        :visible.sync="dialogVisibleOne"
        style="margin:0 auto"
        title="企业新增"
        class="add-company"
        :close-on-click-modal="false"
      >
        <span>
          <!-- 企业新增弹出框开始 -->
          <!-- <div class="business-add-title">企业新增</div> -->
          <div class="business-add-business">
            <el-form
              :model="addCompanyForm"
              :rules="addCompanyFormRules"
              ref="addCompanyForm"
              label-width="100px"
              :inline="true"
              class="business-add-company"
              v-loading="loadingOne"
              element-loading-text="新增企业中"
              element-loading-spinner="el-icon-loading"
            >
              <el-form-item label="企业编码:" prop="compCD">
                <el-input v-model="addCompanyForm.compCD"></el-input>
              </el-form-item>
              <el-form-item label="企业名称:" prop="compName">
                <el-input v-model="addCompanyForm.compName"></el-input>
              </el-form-item>
              <el-form-item label="企业简称:" prop="compSimpName">
                <el-input v-model="addCompanyForm.compSimpName"></el-input>
              </el-form-item>
              <el-form-item label="企业地址:" prop="compAddress">
                <el-input v-model="addCompanyForm.compAddress"></el-input>
              </el-form-item>

              <el-form-item label="企业法人:" prop="compLeader">
                <el-input v-model="addCompanyForm.compLeader"></el-input>
              </el-form-item>
              <el-form-item label="法人电话:" prop="leaderPhone">
                <el-input v-model="addCompanyForm.leaderPhone"></el-input>
              </el-form-item>

              <el-form-item label="联系人:" prop="compContact">
                <el-input v-model="addCompanyForm.compContact"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话:" prop="contPhone">
                <el-input v-model="addCompanyForm.contPhone"></el-input>
              </el-form-item>

              <!-- <el-form-item label="公司网站" prop="companyWebsite">
                <el-input v-model="addCompanyForm.companyWebsite"></el-input>
              </el-form-item>-->
              <el-form-item label="企业描述:" prop="compDescribe">
                <el-input
                  type="textarea"
                  v-model="addCompanyForm.compDescribe"
                  :rows="4"
                  placeholder="500字以内"
                  style="width:610px"
                ></el-input>
              </el-form-item>
              <el-form-item label="经营范围:" prop="compBussScope">
                <el-input
                  type="textarea"
                  v-model="addCompanyForm.compBussScope"
                  :rows="4"
                  placeholder="500字以内"
                  style="width:610px"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业网址:" prop="compURL" class="add-business-compURL">
                <el-input v-model="addCompanyForm.compURL"></el-input>
              </el-form-item>
              <el-form-item style="width:100%" label="企业LOGO:" class="compLOGO">
                <el-upload
                  class="upload-demo"
                  action
  :auto-upload="false"
                  :on-remove="handleRemoveOne"
                  list-type="picture"
                  :on-change="handlePreviewOne"
                  :file-list="logoList"
                  :limit="1"
                  style="width:620px"
                >
                  <el-button size="small" type="primary">上传企业LOGO( png / jpg / jpeg / gif / tiff 格式,限1张,尺寸小于150*150)</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item style="width:100%" class="compIMG" label="企业图片:">
                <el-upload
                  class="upload-demo"
                  action
                  :on-remove="handleRemoveTwo"
                  list-type="picture"
                  :auto-upload="false"
                  :on-change="handlePreviewTwo"
                  :file-list="photoList"
                  :limit="1"
                  style="width:620px"
                >
                  <el-button size="small" type="primary">上传企业图片( png / jpg / jpeg / gif / tiff 格式,限1张,尺寸小于150*150)</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button @click="dialogVisibleOne = false">关 闭</el-button>

                <!-- <el-button @click="resetFormOne('addCompanyForm')">清 空</el-button> -->
                <!-- <el-button type="primary">新增资料</el-button> -->
                <el-button type="primary" @click="submitFormOne('addCompanyForm')">提 交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <!-- 企业新增弹出框结束-->
        </span>
      </el-dialog>
      <!-- 资料新增弹出框开始 -->
      <el-dialog
        title="资料新增"
        :visible.sync="dialogVisibleTwo"
        class="add-info"
        :close-on-click-modal="false"
      >
        <!-- <div class="business-add-title">资料新增</div> -->
        <div class="business-add-content">
          <el-form
            :inline="true"
            :model="addInfoForm"
            :rules="addInfoFormRules"
            ref="addInfoForm"
            label-width="85px"
            class="business-add-info"
            v-loading="loadingInfoTwo"
            element-loading-text="资料新增中"
            element-loading-spinner="el-icon-loading"
            style="margin-top:-30px"
          >
            <el-form-item label="企业编码:" prop="comp_CD">
              <el-input
                :value="infoComDeatils.comp_CD==null?'请先选择企业':infoComDeatils.comp_CD"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业地址:" prop="comp_Address">
              <el-input
                :value="infoComDeatils.comp_Address==null?'请先选择企业':infoComDeatils.comp_Address"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业名称:" prop="comp_Name">
              <el-input
                :value="infoComDeatils.comp_Name==null?'请先选择企业':infoComDeatils.comp_Name"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业简称:" prop="comp_Simp_Name">
              <el-input
                :value="infoComDeatils.comp_Simp_Name==null?'请先选择企业':infoComDeatils.comp_Simp_Name"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业法人:" prop="comp_Leader">
              <el-input
                :value="infoComDeatils.comp_Leader==null?'请先选择企业':infoComDeatils.comp_Leader"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="法人电话:" prop="leader_Phone">
              <el-input
                :value="infoComDeatils.leader_Phone==null?'请先选择企业':infoComDeatils.leader_Phone"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="comp_Contact">
              <el-input
                :value="infoComDeatils.comp_Contact==null?'请先选择企业':infoComDeatils.comp_Contact"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="cont_Phone">
              <el-input
                :value="infoComDeatils.cont_Phone==null?'请先选择企业':infoComDeatils.cont_Phone"
                :disabled="true"
                style="width:250px"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片描述:" prop="photoMemo">
              <el-input
                v-model="addInfoForm.photoMemo"
                type="textarea"
                :rows="4"
                style="width:610px"
                placeholder="200字符以内"
              ></el-input>
            </el-form-item>

            <el-form-item style="width:100%" label="企业图片:" class="addInfoImg">
              <el-upload
                class="upload-demo"
                :on-change="handlePreviewFive"
                :on-remove="handleRemoveFive"
                list-type="picture"
                :file-list="compPhotoList"
                action
                :auto-upload="false"
              >
                <el-button
                  size="small"
                  type="primary"
                  label="企业图片:"
                >上传企业图片( png / jpg / jpeg / gif / tiff 格式,限1张,尺寸小于150*150)</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item style="width:100%" label="资质证照:" class="addInfoImg" prop="compVerList">
              <el-upload
                class="upload-demo"
                :on-change="handlePreviewThree"
                :on-remove="handleRemoveThree"
                list-type="picture"
                :file-list="compVerList"
                action
                :auto-upload="false"
              >
                <el-button size="small" type="primary">上传企业资质证照( png / jpg / jpeg / gif / tiff 格式,限1张,尺寸小于150*150)</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item style="width:100%" label="其他图片:" class="addInfoImg">
              <el-upload
                class="upload-demo"
                :on-change="handlePreviewFour"
                :on-remove="handleRemoveFour"
                list-type="picture"
                :file-list="compOtherList"
                action
                :auto-upload="false"
              >
                <el-button size="small" type="primary">上传企业其他图片( png / jpg / jpeg / gif / tiff 格式,限1张,尺寸小于150*150)</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item style="width:100%">
              <el-button @click="dialogVisibleTwo = false">关 闭</el-button>
              <!-- <el-button @click="resetFormTwo('addInfoForm')">清 空</el-button> -->
              <el-button type="primary" @click="submitFormTwo('addInfoForm')">提 交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <!-- 资料新增弹出框结束-->
      <el-dialog title="资料详情" :visible.sync="dialogVisibleThree" center>
        <span>
          <div
            style="height:100%"
            v-loading="imgLoading"
            element-loading-text="资料加载中"
            element-loading-spinner="el-icon-loading"
          >
            <div style="height:100%">
              <el-row>
                <el-button style="float:left" @click="toFirst('1')">首 条</el-button>
                <el-button icon="el-icon-arrow-left" style="float:left" @click="toPur('3')">上一条</el-button>
                <el-button style="float:left" @click="toNext('4')">
                  下一条
                  <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
                <el-button style="float:left" @click="toLast('2')">末 条</el-button>
                <el-button style="float:right" @click="close">关闭</el-button>
              </el-row>
            </div>
            <el-form label-width="80px" :model="infoDialog" style="margin-top:20px;" :inline="true">
              <el-form-item label="资料编码:" prop="photo_CD">
                <el-input :disabled="true" :value="infoDialog.photo_CD" style="width:350px"></el-input>
              </el-form-item>
              <el-form-item label="资料类型:" prop="photo_Type">
                <el-input
                  disabled
                  style="width:350px"
                  :value="infoDialog.photo_Type==='00'?'企业图片':(infoDialog.photo_Type==='90'?'其他':'资质证照')"
                ></el-input>
              </el-form-item>
              <el-form-item label="资料名称:" prop="photo_Name" style="width:100%;">
                <el-input :disabled="true" v-model="infoDialog.photo_Name" style="width:795px"></el-input>
              </el-form-item>
              <el-form-item label="资料存证:" prop="photo_Hash">
                <el-input
                  :disabled="true"
                  style="width:350px"
                  :value="infoDialog.photo_Hash===null?'暂无存证':infoDialog.photo_Hash"
                ></el-input>
              </el-form-item>
              <el-form-item label="存证时间:" prop="photo_Hash_Datetime">
                <el-input
                  :disabled="true"
                  style="width:350px"
                  :value="infoDialog.photo_Hash_Datetime===null?'暂无存证时间':changeTimestamp(infoDialog.photo_Hash_Datetime*1000)"
                ></el-input>
              </el-form-item>
              <div style="height:100%;width:100%;text-align:center">
                <img :src="src" style="max-width: 100%;min-height: 500px;" />
              </div>
            </el-form>
          </div>
        </span>
      </el-dialog>
      <el-dialog title="企业详情" :visible.sync="dialogVisibleFour" width="50%">
        <span>
          <!-- 企业详情弹出框开始 -->

          <el-form
            label-width="100px"
            :model="companyDetails"
            :inline="true"
            class="business-add-company"
            v-loading="companyDetailsLoading"
            :element-loading-text="companyDetailsLoadingText"
            element-loading-spinner="el-icon-loading"
          >
            <el-form-item label="企业编码:">
              <el-input v-model="companyDetails.comp_CD" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业名称:">
              <el-input v-model="companyDetails.comp_Name" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业简称:">
              <el-input v-model="companyDetails.comp_Simp_Name" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业地址:">
              <el-input v-model="companyDetails.comp_Address" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业法人:">
              <el-input v-model="companyDetails.comp_Leader" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="法人电话:">
              <el-input v-model="companyDetails.leader_Phone" style="width:300px" disabled></el-input>
            </el-form-item>

            <el-form-item label="联系人:">
              <el-input v-model="companyDetails.comp_Contact" style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系人电话:">
              <el-input v-model="companyDetails.cont_Phone" style="width:300px" disabled></el-input>
            </el-form-item>

            <!-- <el-form-item label="公司网站" prop="companyWebsite">
                <el-input v-model="addCompanyForm.companyWebsite"></el-input>
            </el-form-item>-->
            <el-form-item label="企业描述:">
              <el-input
                v-model="companyDetails.comp_Describe"
                style="width:300px"
                :rows="3"
                type="textarea"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="经营范围:">
              <el-input
                v-model="companyDetails.comp_Buss_Scope"
                style="width:300px"
                :rows="3"
                type="textarea"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="企业网址:" prop="comp_URL">
              <el-input v-model="companyDetails.comp_URL" disabled style="width:715px"></el-input>
            </el-form-item>

            <el-form-item label prop="logoSrc" style="width:100%;height:100%;margin-top:-10px">
              <el-form-item prop="comp_URL">
                企业LOGO
                <div style="width:350px;height:350px;">
                  <img :src="logoSrc" style="width: 100%;height: 100%;" />
                </div>
              </el-form-item>
              <el-form-item prop="comp_URL">
                企业图片
                <div style="width:350px;height:350px;">
                  <img :src="compImgSrc" style="width: 100%;height: 100%;" />
                </div>
              </el-form-item>
              <!-- <img :src="logoSrc" style="max-width: 100%;max-height: 100%;margin:0 auto" />
              <img :src="compImgSrc" style="max-width: 100%;max-height: 100%;margin:0 auto" />-->
            </el-form-item>
            <!-- <el-form-item label="企业图片" prop="compImgSrc" style="width:100%;height:100%;">
                <img :src="compImgSrc" style="max-width: 100%;max-height: 100%;margin:0 auto" />
            </el-form-item>-->
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <!-- 企业新增弹出框结束-->
        </span>
      </el-dialog>
      <el-dialog
        title="企业信息编辑"
        :visible.sync="EditDialogVisible"
        width="50%"
        :close-on-click-modal="false"
      >
        <span>
          <el-form
            :inline="true"
            :model="editData"
            class="demo-form-inline"
            label-width="100px"
            v-loading="editLoading"
            :element-loading-text="editoadingText"
            element-loading-spinner="el-icon-loading"
            :rules="editDataRules"
            ref="editData"
          >
            <el-form-item label="企业编码:">
              <el-input v-model="editData.comp_CD" style="width:280px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="企业名称:" prop="comp_Name">
              <el-input v-model="editData.comp_Name" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="企业简称:" prop="comp_Simp_Name">
              <el-input v-model="editData.comp_Simp_Name" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="企业地址:" prop="comp_Address">
              <el-input v-model="editData.comp_Address" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="企业法人:" prop="comp_Leader">
              <el-input v-model="editData.comp_Leader" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="法人电话:" prop="leader_Phone">
              <el-input v-model="editData.leader_Phone" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" prop="comp_Contact">
              <el-input v-model="editData.comp_Contact" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话:" prop="cont_Phone">
              <el-input v-model="editData.cont_Phone" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="企业描述:" prop="comp_Describe">
              <el-input
                v-model="editData.comp_Describe"
                style="width:280px"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item label="经营范围:" prop="comp_Buss_Scope">
              <el-input
                v-model="editData.comp_Buss_Scope"
                style="width:280px"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item label="企业网址:" prop="comp_URL">
              <el-input v-model="editData.comp_URL" style="width:670px"></el-input>
            </el-form-item>
            <el-form-item style="width:95%;margin:0 auto;margin-top:-20px;text-align: center;">
              <el-form-item>
                <div>企业LOGO</div>
                <el-upload
                  class="upload-demo"
                  action
                  :on-change="editLogoHandlePreview"
                  :on-remove="editLogoHandleRemove"
                  :file-list="editLogoFileList"
                  list-type="picture"
                  :auto-upload="false"
                  :limit="1"
                  style="float:left;"
                >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editCompLogo"
                    style="width:350px"
                  >企业LOGO( png/jpg/jpeg/gif/tiff,限1张,尺寸小于150*150)</el-button>
                </el-upload>
                <div :class="{'logoActive':islogoActive}">
                  <img
                    :src="editLogo"
                    style="width: 100%;height: 100%;margin:0 auto;width:350px;height:350px"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <div>
                  <div>企业图片</div>

                  <el-upload
                    class="upload-demo"
                    action
                    :on-change="editPhotoHandlePreview"
                    :on-remove="editPhotoHandleRemove"
                    :file-list="editPhotoFileList"
                    list-type="picture"
                    :auto-upload="false"
                    :limit="1"
                    style="float:right"
                  >
                    <el-button
                      size="small"
                      type="primary"
                      style="width:350px"
                      @click="editCompPhoto"
                    >企业图片(png/jpg/jpeg/gif/tiff,限1张,尺寸小于150*150)</el-button>
                  </el-upload>
                  <div :class="{'PhotoActive':isPhotoActive}">
                    <img
                      :src="editPhoto"
                      style="width: 100%;height: 100%;margin:0 auto;width:350px;height:350px;"
                    />
                  </div>
                </div>
              </el-form-item>
            </el-form-item>

            <el-form-item style="width:100%;margin-top:10px">
              <el-button @click="EditDialogVisible = false">关 闭</el-button>
              <!-- <el-button type="primary" @click="edit">编 辑</el-button> -->
              <el-button type="primary" @click="submitForm('editData')">提 交</el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import {
  search,
  addCompany,
  compDetails,
  delComp,
  inputHash,
  dataDetails,
  inputDataHash,
  allCompData,
  allComp,
  dataForCD,
  compDataComp,
  compQualification,
  compOtherPhotos,
  goodsDataGoods,
  delData,
  editCompany,
  showUserMsgNotSuper
} from "../../api/api.js";
import { log } from "util";
export default {
  data() {
    var validateuserPhone = (rule, value, callback) => {
      const reg = /^1[0-9]{10}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的手机号码"));
      } else {
        callback();
      }
    };
    // var validateuserComCD = (rule, value, callback) => {
    //   let reg = /^[a-zA-Z\d~\!@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'\<,\>\.\?\/]+$/
    //   if (!reg.test(value)) {
    //     callback(new Error("编码不能包含空格和汉字"))
    //   } else {
    //     callback()
    //   }
    // }
    //  var validateGoodsCD = (rule, value, callback) => {
    //   let reg = /^[a-zA-Z\d~\!@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'\<,\>\.\?\/]+$/
    //   if (!reg.test(value)) {
    //     callback(new Error("编码不能包含空格和汉字"))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      editDataRules: {
        comp_Address: [
          { required: true, message: "请输入企业地址", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        comp_Buss_Scope: [
          { required: true, message: "请输入经营范围", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur"
          }
        ],
        comp_Contact: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        comp_Describe: [
          { required: true, message: "请输入企业描述", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur"
          }
        ],
        comp_Leader: [
          { required: true, message: "请输入企业法人", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        leader_Phone: [
          { required: true, message: "请输入法人电话", trigger: "blur" }
        ],
        comp_Name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        cont_Phone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ],
        comp_URL: [
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      },
      src: "",
      queryForm: {
        compCD: "",
        compSimpName: "",
        compName: "",
        compLeader: "",
        pageSize: 5,
        pageNum: 1
      },
      editData: {
        comp_Address: "",
        comp_Buss_Scope: "",
        comp_CD: "",
        comp_Contact: "",
        comp_Describe: "",
        comp_Leader: "",
        leader_Phone: "",
        cont_Phone: "",
        comp_Name: "",
        comp_Simp_Name: "",
        comp_URL: ""
      },
      editLogo: "",
      editPhoto: "",
      // editDisabled: true,
      businessList: [],
      infoLoading: false,
      businessInfoList: [],
      compCdForList: "",
      infoCompCd: "",
      EditDialogVisible: false,
      userType: "",
      infoCompDesc: "",
      tableCompanyName: "",
      tableCompanyCd: "",
      imageUrlLeft: "",
      imageUrlRight: "",
      businessEnv: "",
      envcomp_Name: "",
      envcomp_Leader: "",
      envcomp_Buss_Scope: "",
      pageNumOne: 1,
      pageSizeOne: 5,
      totalNumOne: 0,
      pageNumTwo: 1,
      pageSizeTwo: 5,
      totalNumTwo: 0,
      selectDataTwo: "",
      selectRowTwo: "",
      infoComDeatils: "",
      multipleSelection: [],
      businessCurrentPage: 5,
      dialogVisibleOne: false,
      dialogVisibleTwo: false,
      dialogVisibleThree: false,
      dialogVisibleFour: false,
      loadingInfoTwo: false,
      addCompanyForm: {
        compCD: "",
        compName: "",
        compSimpName: "",
        compDescribe: "",
        compLeader: "",
        leaderPhone: "",
        compContact: "",
        contPhone: "",
        compBussScope: "",
        compURL: "",
        compAddress: "",
        compPhoto: "",
        logoPhoto: ""
      },
      // photoOne: "",
      // photoTwo: "",
      editLogo: "",
      editPhoto: "",
      logoSrc: "",
      compImgSrc: "",
      condition: "",
      companyDetails: {},
      infoDialog: {},
      tableRadioOne: "",
      loadingOne: false,
      loadingTwo: false,
      loadingInfo: false,
      editLoading: false,
      editoadingText: "",
      addCompanyFormRules: {
        compCD: [
          { required: true, message: "请输入企业编码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
          // { validator: validateuserComCD, trigger: "blur" }
        ],
        compAddress: [
          { required: true, message: "请输入企业地址", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        compName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        compSimpName: [
          { required: true, message: "请输入企业简称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        compLeader: [
          { required: true, message: "请输入企业法人", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        leaderPhone: [
          { required: true, message: "请输入法人电话", trigger: "blur" },
          { validator: validateuserPhone, trigger: "blur" }
        ],
        compContact: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        contPhone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" },
          { validator: validateuserPhone, trigger: "blur" }
        ],
        compDescribe: [
          { required: true, message: "请输入企业描述", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur"
          }
        ],
        compBussScope: [
          { required: true, message: "请输入经营范围", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur"
          }
        ],
        compURL: [
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      },
      addInfoForm: {
        compCD: "",
        compDataPhoto_comp: [],
        compDataPhoto_qua: [],
        compDataPhoto_others: [],
        photoMemo: ""
      },
      addInfoFormRules: {
        photoMemo: [
          {
            required: true,
            message: "请输入图片描述",
            trigger: "blur"
          },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      },
      infoOptions: [
        {
          value: "1",
          label: "企业图片"
        },
        {
          value: "2",
          label: "资质证照"
        },
        {
          value: "3",
          label: "其他"
        }
      ],
      infoSelectValue: "",
      nextPhotoCd: "",
      layCompanyInfoLoading: false,
      layDataLoading: false,
      imgLoading: false,
      islogoActive: false,
      isPhotoActive: false,
      companyDetailsLoading: false,
      companyDetailsLoadingText: "",
      loadingTwoText: "",
      loadingInfoText: "",
      editLogoFileList: [],
      editPhotoFileList: [],
      showInfo: {},
      selectDataOne: [],
      selectRowOne: [],
      logoList: [],
      photoList: [],
      compPhotoList: [],
      compVerList: [],
      compOtherList: [],
      dataEnvList: []
      // display: none
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
    selectDataOne(data) {
      this.selectRowOne = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRowOne.push(this.businessList.indexOf(item));
        });
      }
    },
    selectDataTwo(data) {
      this.selectRowTwo = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRowTwo.push(this.businessInfoList.indexOf(item));
        });
      }
    }
  },
  methods: {
    // beforeUploadOne(file){

    // },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editoadingText = "资料更新中";
          this.editLoading = true;
          const formData = new FormData();
          formData.append("companyMessage", JSON.stringify(this.editData));
          formData.append("logo", this.editLogo);
          formData.append("photo", this.editPhoto);
          editCompany(formData, this.$store.getters.token).then(res => {
            this.editLoading = false;
            if (res.code == 200) {
              this.$notify({
                title: "成功!",
                message: "资料更新成功!",
                type: "success"
              });
              this.EditDialogVisible = false;
              if (this.userType == 0 || this.userType == 1) {
                this.loadingTwo = true;
                showUserMsgNotSuper(this.$store.getters.token).then(res => {
                  this.loadingTwo = false;
                  this.businessList = res.msg;
                  this.totalNumOne = res.msg.length;
                });
              } else {
                this.searchGoodsInfo();
              }
            } else if (res.code == 500) {
              this.$notify({
                title: "失败!",
                message: res.msg,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // editCompanyInfo() {},
    editLogoHandlePreview(file, fileList) {
      // this.editData.comp_Logo = ""editLogoFileList
  const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.editLogoFileList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.editLogoFileList=[]
        return false;
    }
      this.editLogo = fileList[0].raw;

    },
    editCompLogo() {
      // this.editLogo = ""
      this.islogoActive = true;
    },
    editLogoHandleRemove(file, fileList) {
      this.editLogo = "";
    },
    editPhotoHandlePreview(file, fileList) {
      const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.editPhotoFileList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.editPhotoFileList=[]
        return false;
      }
      this.editPhoto = fileList[0].raw;
    },
    editPhotoHandleRemove(file, fileList) {
      this.editPhoto = "";
    },
    editCompPhoto() {
      // this.editData.comp_Photo = ""
      this.isPhotoActive = true;
    },
    chooseInstanceOne(val) {
      this.selectDataOne = val;

      if (val.length > 1) {
        this.$refs.businessList.clearSelection();
        this.$refs.businessList.toggleRowSelection(val.pop());
      } else if (val.length == 1) {
        this.infoCompCd = val[0].comp_CD;
        this.infoComDeatils = val[0];
        this.businessEnv = val[0].comp_CD;
        this.envcomp_Name = val[0].comp_Name;
        this.envcomp_Leader = val[0].comp_Leader;
        this.envcomp_Buss_Scope = val[0].comp_Buss_Scope;

        this.loadingInfo = true;
        dataForCD(
          {
            compCD: val[0].comp_CD,
            pageSize: this.pageSizeTwo,
            pageNum: this.pageNumTwo
          },
          this.$store.getters.token
        ).then(res => {
          this.loadingInfo = false;
          this.businessInfoList = res.msg;
          this.totalNumTwo = res.total;
        });
      } else {
        this.infoCompCd = "";
        this.businessEnv = "";
        this.envcomp_Name = "";
        this.envcomp_Leader = "";
        this.envcomp_Buss_Scope = "";
        this.businessInfoList = [];
        this.totalNumTwo = 0;
      }
    },
    chooseInstanceTwo(val) {
      this.selectDataTwo = val;

      this.dataEnvList = val;
      // if (val.length == 1) {
      //   if (val[0] != undefined) {
      //     this.dataEnv = val[0].photo_CD
      //     // this.compCdForList = val[0].comp_CD
      //   }
      // } else {
      //   this.dataEnv = ""
      // }
    },
    tableCurrentChangeOne(currentRow, oldCurrentRow) {
      this.$refs.businessList.toggleRowSelection(currentRow);
    },
    tableCurrentChangeTwo(currentRow, oldCurrentRow) {
      this.$refs.businessInfoList.toggleRowSelection(currentRow);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    changeRowColorTwo({ row, rowIndex }) {
      if (this.selectRowTwo.includes(rowIndex)) {
        return "background-color:rgba(194, 224, 255,1)";
      }
      if (rowIndex % 2 === 1) {
        return "background-color:rgb(230, 230, 230)";
      }
    },
    changeRowColorOne({ row, rowIndex }) {
      if (this.selectRowOne.includes(rowIndex)) {
        return "background-color:rgba(194, 224, 255,1)";
      }
      if (rowIndex % 2 === 1) {
        return "background-color:rgb(230, 230, 230)";
      }
    },
    handleEdit(index, row) {
      this.EditDialogVisible = true;
      // this.editDisabled = true
      this.editLoading = true;
      this.isPhotoActive = false;
      this.islogoActive = false;
      this.editCompany = row.comp_CD;
      this.editLogoFileList = [];
      this.editPhotoFileList = [];

      compDetails({ compCD: row.comp_CD }, this.$store.getters.token).then(
        res => {
          this.editLoading = false;
          this.editData.comp_ID = res[0].comp_ID;

          this.editData.comp_Address = res[0].comp_Address;
          this.editData.comp_Buss_Scope = res[0].comp_Buss_Scope;
          this.editData.comp_CD = res[0].comp_CD;
          this.editData.comp_Contact = res[0].comp_Contact;
          this.editData.comp_Describe = res[0].comp_Describe;
          this.editData.comp_Leader = res[0].comp_Leader;
          this.editLogo = res[0].comp_Logo;
          this.editData.comp_Name = res[0].comp_Name;
          this.editPhoto = res[0].comp_Photo;
          this.editData.comp_Simp_Name = res[0].comp_Simp_Name;
          this.editData.comp_URL = res[0].comp_URL;
          this.editData.cont_Phone = res[0].cont_Phone;
          this.editData.leader_Phone = res[0].leader_Phone;
        }
      );
    },
    // edit() {
    //   this.editDisabled = false
    // },
    handleDeleteOne(index, row) {
      this.$confirm("此操作将永久删除该企业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadingTwo = true;
          delComp({ compCD: row.comp_CD }, this.$store.getters.token).then(
            res => {
              if (res.code == 1) {
                this.$notify({
                  title: "成功!",
                  message: "删除成功!",
                  type: "success"
                });
                if (this.userType == 0 || this.userType == 1) {
                  this.loadingTwo = true;
                  showUserMsgNotSuper(this.$store.getters.token).then(res => {
                    this.loadingTwo = false;

                    this.businessList = res.msg;
                    this.totalNumOne = res.msg.length;
                  });
                } else {
                  this.searchGoodsInfo();
                }
                this.loadingTwo = false;
              } else if (res.code == 2) {
                this.$notify({
                  title: "失败!",
                  message: "删除失败!",
                  type: "warning"
                });
                this.loadingTwo = false;
              } else if (res.code == 3) {
                this.$notify({
                  title: "失败!",
                  message: "请先删除该企业下的所有商品!",
                  type: "warning"
                });
                this.loadingTwo = false;
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDeleteTwo(index, row) {
      this.$confirm("此操作将永久删除该条资料, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loadingInfo = true;
          delData({ photoCD: row.photo_CD }, this.$store.getters.token).then(
            res => {
              if (res.code == 1) {
                dataForCD(
                  {
                    compCD: row.comp_CD,
                    pageSize: this.pageSizeTwo,
                    pageNum: this.pageNumTwo
                  },
                  this.$store.getters.token
                ).then(res => {
                  this.businessInfoList = res.msg;
                  this.totalNumTwo = res.total;
                });
                this.$notify({
                  title: "成功!",
                  message: "删除成功!",
                  type: "success"
                });
                this.loadingInfo = false;
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChangeOne(val) {
      this.queryForm.pageSize = val;

      this.queryForm.pageNum = 1;
      // this.getallCompInfo()
      this.changePageGoodsInfo();
    },
    handleSizeChangeTwo(val) {
      this.pageSizeTwo = val;
      this.pageNumTwo = 1;
      dataForCD(
        {
          compCD: this.infoCompCd,
          pageSize: this.pageSizeTwo,
          pageNum: this.pageNumTwo
        },
        this.$store.getters.token
      ).then(res => {
        this.businessInfoList = res.msg;
        this.totalNumTwo = res.total;
      });
      // this.getallCompDataInfo()
    },
    handleCurrentChangeOne(val) {
      this.queryForm.pageNum = val;

      this.changePageGoodsInfo();
    },
    handleCurrentChangeTwo(val) {
      this.pageNumTwo = val;

      dataForCD(
        {
          compCD: this.infoCompCd,
          pageSize: this.pageSizeTwo,
          pageNum: this.pageNumTwo
        },
        this.$store.getters.token
      ).then(res => {
        this.businessInfoList = res.msg;
        this.totalNumTwo = res.total;
      });
    },

    layCompanyInfo() {
      if (this.selectDataOne.length == 1) {
        this.layCompanyInfoLoading = true;
        this.loadingTwo = true;
        this.loadingTwoText = "存证中";
        inputHash(
          {
            compCD: this.businessEnv,
            comp_Name: this.envcomp_Name,
            comp_Leader: this.envcomp_Leader,
            comp_Buss_Scope: this.envcomp_Buss_Scope
          },
          this.$store.getters.token
        ).then(res => {
          this.loadingTwo = false;
          this.layCompanyInfoLoading = false;

          if (res.code === 1) {
            this.$notify({
              title: "成功!",
              message: "存证成功!",
              type: "success"
            });
            if (this.userType == 0 || this.userType == 1) {
              this.loadingTwo = true;
              showUserMsgNotSuper(this.$store.getters.token).then(res => {
                this.loadingTwo = false;

                this.businessList = res.msg;
                this.totalNumOne = res.msg.length;
              });
            } else {
              this.searchGoodsInfo();
            }
          } else if (res.code === 2) {
            this.$notify({
              title: "注意!",
              message: "该条数据已存证,请勿重复存证!",
              type: "warning"
            });
          } else if (res.code == 4) {
            this.$notify({
              title: "注意!",
              message:res.msg,
              type: "warning"
            });
          }
        });
      } else if (!this.selectDataOne.length) {
        this.$notify({
          title: "注意!",
          message: "请选择存证条目!",
          type: "warning"
        });
      }
    },
    layData() {
      if (!this.dataEnvList.length) {
        this.$notify({
          title: "注意!",
          message: "请选择存证条目!",
          type: "warning"
        });
      } else {
        this.layDataLoading = true;
        this.loadingInfo = true;
        this.loadingInfoText = "存证中";
        let infoEnvData = [];
        for (let k = 0; k < this.dataEnvList.length; k++) {
          infoEnvData.push(this.dataEnvList[k].photo_CD);
        }

        inputDataHash(
          { photoCDs: infoEnvData },
          this.$store.getters.token
        ).then(res => {
          this.layDataLoading = false;
          this.loadingInfo = false;

          if (res.code === 1) {
            this.$notify({
              title: "成功!",
              message: "存证成功!",
              type: "success"
            });

            dataForCD(
              {
                compCD: this.infoCompCd,
                pageSize: this.pageSizeTwo,
                pageNum: this.pageNumTwo
              },
              this.$store.getters.token
            ).then(res => {
              this.businessInfoList = res.msg;
              this.totalNumTwo = res.total;
            });
          } else if (res.code === 2) {
            this.$notify({
              title: "注意!",
              message: "存在已存证的条目,请重新选择!",
              type: "warning"
            });
            // if (res.errorphotCDs.length > 0) {
            //   for (let m = 0; m < res.errorphotCDs.length; m++) {
            //     for (let n = 0; n < this.businessInfoList.length; n++) {
            //       console.log(9999, res.errorphotCDs[m])

            //       if (
            //         res.errorphotCDs[m] == this.businessInfoList[n].photo_CD
            //       ) {
            //         var newbusinessInfoList = this.businessInfoList[n]
            //         console.log(66666, newbusinessInfoList)

            //         newbusinessInfoList.status = 0
            //         this.businessInfoList.splice(n, 1, newbusinessInfoList)
            //       }
            //     }
            //   }
            // }
          }
        });
      }
    },
    tableRowClassName(row, rowIndex) {
      // if (row.row.status == 0) {
      //   return "warning-row"
      // }
    },
    addCompanyDia() {
      this.dialogVisibleOne = true;
      Object.keys(this.addCompanyForm).forEach(
        key => (this.addCompanyForm[key] = "")
      );
      this.logoList = [];
      this.photoList = [];
    },

    submitFormOne(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.addCompanyForm.compPhoto == "" &&
            this.addCompanyForm.logoPhoto == ""
          ) {
            this.$notify({
              title: "注意!",
              message: "请上传图片!",
              type: "warning"
            });
          } else if (this.addCompanyForm.compPhoto == "") {
            this.$notify({
              title: "注意!",
              message: "请上传企业图片!",
              type: "warning"
            });
          } else if (this.addCompanyForm.logoPhoto == "") {
            this.$notify({
              title: "注意!",
              message: "请上传企业LOGO!",
              type: "warning"
            });
          } else {
            this.loadingOne = true;

            const formData = new FormData();
            formData.append("compCD", this.addCompanyForm.compCD);
            formData.append("compName", this.addCompanyForm.compName);
            formData.append("compSimpName", this.addCompanyForm.compSimpName);
            formData.append("compDescribe", this.addCompanyForm.compDescribe);
            formData.append("compLeader", this.addCompanyForm.compLeader);
            formData.append("leaderPhone", this.addCompanyForm.leaderPhone);
            formData.append("compContact", this.addCompanyForm.compContact);
            formData.append("contPhone", this.addCompanyForm.contPhone);
            formData.append("compBussScope", this.addCompanyForm.compBussScope);
            formData.append("compURL", this.addCompanyForm.compURL);
            formData.append("compAddress", this.addCompanyForm.compAddress);
            formData.append("compPhoto", this.addCompanyForm.compPhoto);
            formData.append("logoPhoto", this.addCompanyForm.logoPhoto);

            addCompany(formData, this.$store.getters.token).then(res => {
              this.loadingOne = false;
              if (res.code === 1) {
                this.dialogVisibleOne = false;
                this.$notify({
                  title: "成功!",
                  message: "新增企业成功!",
                  type: "success"
                });
                Object.keys(this.addCompanyForm).forEach(
                  key => (this.addCompanyForm[key] = "")
                );
                this.logoList = [];
                this.photoList = [];
                this.searchGoodsInfo();
              } else if (res.code === 3) {
                this.$notify({
                  title: "注意!",
                  message: "企业编码已存在!",
                  type: "warning"
                });
                this.getallCompInfo();
              } else if (res.code === 4) {
                this.$notify({
                  title: "注意!",
                  message: "图片发送不成功，请重新发送!",
                  type: "warning"
                });
                this.getallCompInfo();
              } else if (res.code === 5) {
                this.$notify({
                  title: "注意!",
                  message: "图片格式仅支持jpg和png格式!",
                  type: "warning"
                });
                this.getallCompInfo();
              } else if (res.code === 8) {
                this.$notify({
                  title: "注意!",
                  message: "企业名称已存在!",
                  type: "warning"
                });

                this.getallCompInfo();
              } else if (res.code === 9) {
                this.$notify({
                  title: "注意!",
                  message: "无权限!",
                  type: "warning"
                });

                this.getallCompInfo();
              } else {
                this.getallCompInfo();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    submitFormTwo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.addInfoForm.compDataPhoto_comp.length +
              this.addInfoForm.compDataPhoto_qua.length +
              this.addInfoForm.compDataPhoto_others.length <
            1
          ) {
            this.$notify({
              title: "注意!",
              message: "请至少添加一张图片!",
              type: "warning"
            });
          } else {
            this.loadingInfoTwo = true;
            const formData = new FormData();
            formData.append("compCD", this.infoCompCd);
            formData.append("photoMemo", this.addInfoForm.photoMemo);
            for (
              let i = 0;
              i < this.addInfoForm.compDataPhoto_comp.length;
              i++
            ) {
              formData.append(
                "compDataPhoto_comp",
                this.addInfoForm.compDataPhoto_comp[i].raw
              );
            }

            for (
              let m = 0;
              m < this.addInfoForm.compDataPhoto_qua.length;
              m++
            ) {
              formData.append(
                "compDataPhoto_qua",
                this.addInfoForm.compDataPhoto_qua[m].raw
              );
            }
            for (
              let o = 0;
              o < this.addInfoForm.compDataPhoto_others.length;
              o++
            ) {
              formData.append(
                "compDataPhoto_others",
                this.addInfoForm.compDataPhoto_others[o].raw
              );
            }

            compDataComp(formData, this.$store.getters.token).then(res => {
              this.loadingInfoTwo = false;
              this.dialogVisibleTwo = false;
              if (res.code === 1) {
                this.$notify({
                  title: "成功!",
                  message: "资料添加成功!",
                  type: "success"
                });
                this.compPhotoList = [];
                this.compVerList = [];
                this.compOtherList = [];
                dataForCD(
                  {
                    compCD: this.infoCompCd,
                    pageSize: this.pageSizeTwo,
                    pageNum: this.pageNumTwo
                  },
                  this.$store.getters.token
                ).then(res => {
                  this.businessInfoList = res.msg;
                  this.totalNumTwo = res.total;
                });
              } else if (res.code == 2) {
                this.$notify({
                  title: "失败!",
                  message: "图片上传失败,请重新上传!",
                  type: "warning"
                });
              }
            });
          }
        } else {
          this.loadingInfoTwo = false;
          return false;
        }
      });
    },
    resetFormOne(formName) {
      this.$refs[formName].resetFields();
      this.logoList = [];
      this.photoList = [];
    },
    resetFormTwo(formName) {
      // this.addInfoForm.compDataPhoto_comp = []
      // this.addInfoForm.compDataPhoto_qua = []
      // this.addInfoForm.compDataPhoto_others = []
      // this.addInfoForm.photoMemo = ""
      this.$refs[formName].resetFields();
    },

    addInfo() {
      this.compPhotoList = [];
      this.compVerList = [];
      this.compOtherList = [];
      this.addInfoForm.compDataPhoto_comp = [];
      this.addInfoForm.compDataPhoto_qua = [];
      this.addInfoForm.compDataPhoto_others = [];
      this.addInfoForm.photoMemo = "";
      if (this.infoCompCd == "") {
        this.$notify({
          title: "注意!",
          message: "请先选择企业编码!",
          type: "warning"
        });
      } else {
        this.dialogVisibleTwo = true;
      }
    },
    openCompanyDetails(compCD) {
      this.dialogVisibleFour = true;
      this.companyDetailsLoading = true;
      this.companyDetailsLoadingText = "资料加载中";

      compDetails({ compCD: compCD }, this.$store.getters.token).then(res => {
        this.companyDetailsLoading = false;

        this.companyDetails = res[0];
        this.logoSrc = res[0].comp_Logo;
        this.compImgSrc = res[0].comp_Photo;
      });
    },
    openInfoDetails(dataCD) {
      this.dialogVisibleThree = true;
      this.imgLoading = true;
      dataDetails({ photoCD: dataCD }, this.$store.getters.token).then(res => {
        this.imgLoading = false;
        this.infoDialog = res;
        this.nextPhotoCd = res.photo_CD;
        this.src = res.photo_Name;
      });
    },
    searchGoodsInfo() {
      this.loadingTwo = true;
      this.queryForm.pageNum = 1;
      search(this.queryForm, this.$store.getters.token).then(res => {
        this.loadingTwo = false;
        this.businessList = res.searchCompany;
        this.totalNumOne = res.num;
      });
    },
    changePageGoodsInfo() {
      search(this.queryForm, this.$store.getters.token).then(res => {
        this.businessList = res.searchCompany;
        this.totalNumOne = res.num;
      });
    },
    handleRemoveOne(file, fileList) {
      this.addCompanyForm.logoPhoto = "";
    },
    handlePreviewOne(file, fileList) {
      const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.logoList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.logoList=[]
        return false;
      }
      // return isIMAGE && isLt1M
      this.addCompanyForm.logoPhoto = fileList[0].raw;

    },
    handleRemoveTwo(file, fileList) {
      this.addCompanyForm.compPhoto = "";
    },
    handlePreviewTwo(file, fileList) {
           const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.photoList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.photoList=[]
        return false;
      }
      this.addCompanyForm.compPhoto = fileList[0].raw;
    },
    handleRemoveThree(file, fileList) {
      let obj = {};
      this.addInfoForm.compDataPhoto_qua = this.addInfoForm.compDataPhoto_qua.reduce(
        (cur, next) => {
          obj[next.uid] ? "" : (obj[next.uid] = true && cur.push(next));
          return cur;
        },
        []
      );
    },
    handlePreviewThree(file, fileList) {
           const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.compVerList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.compVerList=[]
        return false;
      }
      this.addInfoForm.compDataPhoto_qua = fileList;
    },
    handleRemoveFour(file, fileList) {
      let obj = {};
      this.addInfoForm.compDataPhoto_others = this.addInfoForm.compDataPhoto_others.reduce(
        (cur, next) => {
          obj[next.uid] ? "" : (obj[next.uid] = true && cur.push(next));
          return cur;
        },
        []
      );
    },
    handlePreviewFour(file, fileList) {
             const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.compOtherList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.compOtherList=[]
        return false;
      }
      this.addInfoForm.compDataPhoto_others = fileList;
    },
    handleRemoveFive(file, fileList) {
      let obj = {};
      this.addInfoForm.compDataPhoto_comp = this.addInfoForm.compDataPhoto_comp.reduce(
        (cur, next) => {
          obj[next.uid] ? "" : (obj[next.uid] = true && cur.push(next));
          return cur;
        },
        []
      );
    },
    handlePreviewFive(file, fileList) {
       const isIMAGE1 = file.raw.type === 'image/png'
      const isIMAGE2 = file.raw.type === 'image/gif'
      const isIMAGE3 = file.raw.type === 'image/jpg'
      const isIMAGE4 = file.raw.type === 'image/jpeg'
      const isIMAGE5 = file.raw.type === 'image/tiff'
      const isLt1M = file.raw.size / 1024 / 1024 < 1.5;

      if (!isIMAGE1&&!isIMAGE2&&!isIMAGE3&&!isIMAGE4&&!isIMAGE5) {
        this.$message.error('只支持png,jpg,jpeg,tiff,gif格式的图片!');
        this.compPhotoList=[]
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1.5MB!');
        this.compPhotoList=[]
        return false;
      }
      this.addInfoForm.compDataPhoto_comp = fileList;
    },
    changeTimestamp(timestamp) {
      const date = new Date(timestamp);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      const h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      const m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getallCompInfo() {
      allComp(
        { pageNum: this.pageNumOne, pageSize: this.pageSizeOne },
        this.$store.getters.token
      ).then(res => {
        this.businessList = res.temp;
        this.totalNumOne = res.total;
      });
    },
    getallCompDataInfo() {
      allCompData(
        { pageNum: this.pageNumTwo, pageSize: this.pageSizeTwo },
        this.$store.getters.token
      ).then(res => {
        this.businessInfoList = res.temp;
        this.totalNumTwo = res.total;
      });
    },
    toNext(condition) {
      dataDetails(
        { photoCD: this.nextPhotoCd, condition: condition },
        this.$store.getters.token
      ).then(res => {
        this.infoLoading = false;
        if (res.code == 4) {
          this.nextPhotoCd = res.nextPhotoCD.photo_CD;
          this.infoDialog = res.nextPhotoCD;
          this.src = this.infoDialog.photo_Name;
        } else if (res.code == 5) {
          this.$notify({
            title: "注意!",
            message: "不存在下一条!",
            type: "warning"
          });
        }
      });
    },
    toLast(condition) {
      dataDetails(
        { photoCD: this.nextPhotoCd, condition: condition },
        this.$store.getters.token
      ).then(res => {
        this.infoDialog = res[0];
        this.nextPhotoCd = res[0].photo_CD;
        this.src = this.infoDialog.photo_Name;
      });
    },
    toPur(condition) {
      dataDetails(
        { photoCD: this.nextPhotoCd, condition: condition },
        this.$store.getters.token
      ).then(res => {
        this.infoLoading = false;
        if (res.code == 4) {
          this.nextPhotoCd = res.onMsg.photo_CD;

          this.infoDialog = res.onMsg;
          this.src = this.infoDialog.photo_Name;
        } else if (res.code == 3) {
          this.$notify({
            title: "注意!",
            message: "不存在上一条!",
            type: "warning"
          });
        }
      });
    },
    toFirst(condition) {
      dataDetails(
        { photoCD: this.nextPhotoCd, condition: condition },
        this.$store.getters.token
      ).then(res => {
        this.nextPhotoCd = res[0].photo_CD;

        this.infoDialog = res[0];
        this.src = this.infoDialog.photo_Name;
      });
    },
    close() {
      this.dialogVisibleThree = false;
    }
  },
  created() {
    this.userType = localStorage.getItem("user_Type");
    this.showInfo = localStorage;
    if (this.userType == 0 || this.userType == 1) {
      this.loadingTwo = true;
      showUserMsgNotSuper(this.$store.getters.token).then(res => {
        this.loadingTwo = false;

        this.businessList = res.msg;
        this.totalNumOne = res.msg.length;
      });
    } else {
      this.searchGoodsInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.business {
  .logoActive {
    display: none;
  }
  .PhotoActive {
    display: none;
  }
  &-info {
    height: 40px;
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(200, 200, 200, 0.6);
    line-height: 50px;
    // position: absolute;
    &-queryForm {
      width: 90%;
      margin: 0 auto;
    }
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
  &-lineTwo {
    width: 95%;
    margin: 0 auto;

    // border-top: 1px solid rgba(200, 200, 200, 0.6);
  }
  &-query {
    width: 100px;
    background-color: rgb(48, 65, 86);
    color: white;
    float: right;
  }

  &-form {
    width: 100%;
    // background-color: red;
    height: 800px;
    margin-top: 20px;
  }
  &-el-button {
    background: rgb(48, 65, 86);
    color: white;
  }
  &-add-title {
    width: 100%;
    height: 40px;
    text-align: center;

    font-size: 22px;
    margin-top: -35px;
    border-bottom: 1px solid rgba(200, 200, 200, 0.6);
  }
  &-add-content {
    margin-top: 20px;
    text-align: center;
    // background-color: blue;
  }
  &-add-business {
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
  }
  &-name {
    float: left;
    font-size: 22px;
    margin-left: 80px;
    color: rgb(48, 65, 86);
    margin-top: 10px;
  }
  &-line {
    height: 1px;
    background: rgba(200, 200, 200, 0.6);
    margin: 0 auto;
    margin-top: 20px;
  }
  &-block {
    // float: right;
    margin-top: 10px;
    // margin-right: 90px;
    text-align: center;
  }
  &-table {
    width: 100%;
    height: 50px;
  }

  .companyID {
    text-decoration: underline;
    color: rgba(64, 158, 255, 0.8);
  }
  .companyID:hover {
    cursor: pointer;
    color: rgba(64, 158, 255, 1);
  }
}
</style>

<style lang="scss">
.business {
  .compInfoTable {
    thead .el-table-column--selection .cell {
      display: none;
    }
  }

  // .el-table--enable-row-hover .el-table__body tr:hover > td {
  //   background-color: rgba(102, 177, 255, 0.4) !important;
  // }
  .el-table .warning-row {
    background-color: rgba(230, 162, 60, 0.4);
  }
  .el-upload-list {
    width: 350px;
  }
  .add-company {
    .el-upload-list {
      width: 610px;
    }
  }
  .add-info {
    .el-upload-list {
      width: 610px;
    }
  }
  &-add-info {
    /deep/ .el-input__inner {
      width: 250px;
    }
  }
  /deep/.el-radio__inner {
    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 10px !important;
  }
  &-add-business {
    /deep/ .el-input__inner {
      width: 250px;
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
// .business .infoFrom {
//   .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
//   .el-table__body tr.current-row > td,
//   .el-table__body tr.hover-row.current-row > td,
//   .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
//   .el-table__body tr.hover-row.el-table__row--striped > td,
//   .el-table__body tr.hover-row > td {
//     background-color: rgba(102, 177, 255, 0.4) !important;
//   }
// }
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
.add-business-compURL {
  /deep/ .el-input__inner {
    width: 610px;
  }
}
.compLOGO {
  /deep/ .el-button--primary {
    width: 620px;
  }
}
.compIMG {
  /deep/ .el-button--primary {
    width: 620px;
  }
}
.addInfoImg {
  /deep/ .el-button--primary {
    width: 620px;
  }
}
</style>
