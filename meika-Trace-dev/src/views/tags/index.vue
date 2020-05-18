<template>
  <div class="tags">
    <div
      style="width:95%;height:40px;margin: 0 auto;line-height:40px;border-bottom:1px solid rgba(200, 200, 200, 0.6);"
    >商品标签生成</div>
    <div
      style="width:95%;height:120px;margin:0 auto;margin-top:10px;border-bottom:1px solid rgba(200, 200, 200, 0.6);"
    >
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="企业名称:" v-if="userType==2">
          <el-select
            v-model="queryForm.compName"
            @change="getCompName"
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
        <el-form-item label="企业名称:" v-else>
          <el-input v-model="queryForm.compName" style="width:300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商品编码:">
          <el-input v-model="queryForm.goodsCD" style="width:300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="queryForm.goodsName" style="width:300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品规格:">
          <el-input v-model="queryForm.spen" style="width:300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="标签生成日期:">
          <el-date-picker
            v-model="queryForm.codeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="datePicke"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标签状态:">
          <el-radio-group v-model="radio">
            <el-radio
              v-for="(item, index) in [{key:'0',value:'已同步存证'},{key:'1',value:'未同步存证'}]"
              :key="item.key"
              @click.native.prevent="clickitem(item.key)"
              :label="item.key"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchLabelInfo"
          style="width: 100px;background-color: rgb(48, 65, 86);color: white;float: right;border:none;width:118px"
        >查 询</el-button>
      </el-form>
    </div>
    <div style="width:95%;height:60px;margin:0 auto;line-height:60px;text-align:right">
      <div style="float:right" v-if="userType!='2'">
        <span style="color:gray">企业编码:</span>
        <span style="color:gray">{{compCd}}</span>&nbsp;
        <span style="color:gray">企业简称:</span>
        <span style="color:gray">{{compSimpleName}}</span>
      </div>
      <div style="100%;text-align:left">
        <el-button @click="openTags" class="tags-button" icon="el-icon-circle-plus">标签生成</el-button>
        <el-button class="tags-button" icon="el-icon-caret-top" @click="synLabelToGoodsInfo">同步存证</el-button>
        <el-button icon="el-icon-document" @click="handleDownload" class="tags-button" style>导出Excel</el-button>
      </div>
    </div>

    <div class="tags-title">
      <el-table
        ref="tableData"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'rgba(48, 65, 86,0.2)'}"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @current-change="tableCurrentChange"
        :row-style="changeRowColor"
        border
        v-loading="formLoading"
        :element-loading-text="formLoadingText"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :show-overflow-tooltip="true"
          fixed="left"
        ></el-table-column>

        <el-table-column label="序号" type="index" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(queryForm.pageNum - 1) * queryForm.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_CD"
          width="150"
          label="商品编码"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="goods_Name"
          width="150"
          label="商品名称"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="商品规格"
          width="150"
          prop="goods_Spen"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          width="100"
          prop="goods_lot"
          label="批次号"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>

        <el-table-column
          label="商品价格(元)"
          width="110"
          prop="goods_Pric"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{tofix(scope.row.goods_Pric) }}</template>
        </el-table-column>
        <el-table-column
          width="150"
          label="验证码"
          prop="check_code"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          width="520"
          prop="consume_code"
          label="消费码"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          width="520"
          prop="reg_hash"
          label="标签存证Hash"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{scope.row.reg_hash=='0'?'暂无存证':scope.row.reg_hash }}</template>
        </el-table-column>
        <el-table-column
          width="180"
          prop="reg_Hash_Datetime"
          label="存证时间"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template
            slot-scope="scope"
          >{{scope.row.reg_Hash_Datetime=='0'?'暂无存证时间':changeTimestampInfo( scope.row.reg_Hash_Datetime*1000) }}</template>
        </el-table-column>
        <el-table-column
          width="95"
          prop="Expire_date"
          label="商品有效期"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          width="100"
          prop="product_date"
          label="生产日期"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ changeTimestampInfo(scope.row.product_date*1000)}}</template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="add_date"
          label="标签日期"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ changeTimestampInfo(scope.row.add_date*1000)}}</template>
        </el-table-column>
        <el-table-column prop="comp_CD" label="企业编码" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="comp_Simp_Name"
          label="企业简称"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="memo" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="hashStatus"
          label="存证状态"
          align="center"
          :show-overflow-tooltip="true"
        >
          <!-- <template slot-scope="scope"> {{scope.row.hashStatus==''?'未存证':(scope.row.hashStatus==0?'存证失败':(scope.row.hashStatus==2?'已存证':'存证中'))}}</template> -->
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="width:100%;text-align:center;margin-top:10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="queryForm.pageNum"
          :page-sizes="[10,20,50,100,500,'全部']"
          :page-size="queryForm.pageSize"
          layout="total,sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      title="标签生成"
      :visible.sync="dialogVisible"
      width="35%"
      center
      :close-on-click-modal="false"
    >
      <span>
        <el-form
          :inline="true"
          :model="tagData"
          class="demo-form-inline"
          label-width="110px"
          style="text-align:center"
          v-loading="dialogLoading"
          :element-loading-text="loadingText"
          element-loading-spinner="el-icon-loading"
          ref="tagData"
          :rules="rules"
        >
          <el-form-item label="企业名称:" prop="compName" v-if="userType==2">
            <div style="width:185px">
              <el-select
                v-model="tagData.compName"
                placeholder="请选择企业"
                @change="changeCompName"
                style="width:100%"
                filterable
                :loading="tagDataCompNameLoading"
              >
                <el-option
                  v-for="item in compNameOptions"
                  :key="item.goods_CD"
                  :label="item.comp_Name"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="企业名称:" prop="compName" v-else>
            <el-input v-model="tagData.compName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品:" prop="goodsName">
            <div style="width:185px">
              <el-select
                v-model="tagData.goodsName"
                placeholder="请选择商品"
                @change="changeGoodsName"
                style="width:100%"
                filterable
                :loading="tagDataGoodsLoading"
              >
                <el-option
                  v-for="item in goodsOptions"
                  :key="item.goods_CD"
                  :label="item.goodsNameSpen"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="商品名称:" prop="goodsNameValue">
            <el-input v-model="tagData.goodsNameValue" :disabled="true" style="width:100%"></el-input>
          </el-form-item>

          <el-form-item label="商品规格:" prop="goods_Spen">
            <el-input v-model="tagData.goods_Spen" style="width:100%" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品描述:" style="width:100%">
            <el-input
              v-model="tagData.goods_Describe"
              style="width:500px"
              type="textarea"
              :rows="3"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品效期:" prop="shelfLife">
            <el-input v-model="tagData.shelfLife" style="width:100%"></el-input>
          </el-form-item>

          <el-form-item label="生产日期:" prop="timeValue">
            <div class="block" style="width:185px">
              <el-date-picker
                v-model="tagData.timeValue"
                type="date"
                placeholder="选择生产日期"
                style="width:100%"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="批次号:" prop="goodsSlot">
            <el-input v-model="tagData.goodsSlot"></el-input>
          </el-form-item>
          <el-form-item label="商品价格(元):" prop="goodsPrice">
            <el-input v-model="tagData.goodsPrice" type="number"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="memo">
            <el-input v-model="tagData.memo"></el-input>
          </el-form-item>
          <el-form-item label="生成条数:" prop="num">
            <el-input v-model="tagData.num" type="number"></el-input>
          </el-form-item>
          <el-form-item style="width:100%">
            <el-button @click="dialogVisible = false">关 闭</el-button>
            <!-- <el-button @click="resetForm('tagData')">重置</el-button> -->
            <el-button @click="submitForm('tagData')" type="primary">提 交</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

import {
  allGoodsByUser,
  createCode,
  showNewBar,
  searchLabel,
  synLabelToGoods,
  AllGoodsNameCD,
  synInput,
  delLabelMsg,
  showAllCompNameID,
  showAllGoodsName,
  showGoodsMsg

} from "../../api/api";
import { stringify } from "querystring";
import { log } from "util";
export default {
  data() {
    var validateNum = (rule, value, callback) => {
      var reg = /^\d+$/;
      if (!reg.test(value)) {
        callback(new Error("请输入整数"));
      }
      callback();
    };
    var validateGoodsPrice = (rule, value, callback) => {
      var reg = /^\d+(\.\d+)?$/;
      if (!reg.test(value)) {
        callback(new Error("请输入数字"));
      }
      callback();
    };
    return {
      radio: "",
      rules: {
        goodsCd: [
          {
            required: true,
            message: "请选择商品编号",
            trigger: "blur"
          }
        ],
        shelfLife: [
          {
            required: true,
            message: "请输入商品效期",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        timeValue: [
          {
            required: true,
            message: "请选择生产日期",
            trigger: "blur"
          }
        ],
        goodsSlot: [
          {
            required: true,
            message: "请输入批次号",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        goodsPrice: [
          {
            required: true,
            message: "请输入产品价格",
            trigger: "blur"
          },
          { validator: validateGoodsPrice, trigger: "blur" }
        ],

        num: [
          {
            required: true,
            message: "请输入生成条数",
            trigger: "blur"
          },
          { validator: validateNum, trigger: "blur" }
        ],
        compName: [
          {
            required: true,
            message: "请选择企业名称",
            trigger: "blur"
          }
        ],
          goodsName: [
          {
            required: true,
            message: "请选择商品",
            trigger: "blur"
          }
        ],
        memo: [
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      },
      queryForm: {
        goodsName: "",
        goodsCD: "",
        codeTime: "",
        goodsLot: "",
        pageSize: 10,
        pageNum: 1,
        synStatus: "",
        addDateStart: "",
        addDateEnd: "",
        spen: "",
        compName: ""
      },

      list: null,
      multipleSelection: [],
      filename: "",
      dialogVisible: false,
      goodsOptions: [],
      adminGoodsOptions: [],
      compCd: "",
      compSimpleName: "",
      compName: "",
      compID: "",
      dialogLoading: false,
      checkCodesList: [],
      formLoading: false,
      tagData: {
        compName: "",
        goodsCd: "",
        shelfLife: "",
        goodsName: "",
        productTime: "",
        goodsSlot: "",
        goodsPrice: "",
        memo: "",
        num: "",
        userType: "",
        goodsValue: "",
        timeValue: "",
        goodsNameValue: "",
        goods_Spen: "",
        goods_Describe: ""
      },
      colOptionValue: "",
      loadingText: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      tagDataCompNameLoading: false,
      tagDataGoodsLoading: false,
      formLoadingText: "",
      selectData: [],
      selectRow: [],
      compNameOptions: [],
      ompNameLength: [],
      compOptionsOne: ""
    };
  },
  created() {
    this.showAllCompNameIDInfo();
    this.userType = localStorage.getItem("user_Type");
    this.compCd = localStorage.getItem("comp_CD");
    this.compSimpleName = localStorage.getItem("comp_Simp_Name");
    this.compName = localStorage.getItem("comp_Name");
    this.userType == 2
      ? (this.compName = "")
      : (this.queryForm.compName = localStorage.getItem("comp_Name"));

    this.compID = localStorage.getItem("comp_ID");
    if (this.userType != 2) {
      this.searchLabelInfo();
    }
  },
  computed: {
    tofix() {
      return function(num) {
        return Number(num).toFixed(2);
      };
    },
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
  methods: {
    getCompName(val) {
      if (val != null) {
        this.queryForm.compName = val.comp_Name;
      }
    },
    // showAllCompNameIDInfo() {
    //   // this.tagBindFormLoading = true
    //   console.log(333333333333);

    //   showAllCompNameID(this.$store.getters.token).then(res => {
    //     console.log(11111, res);

    //     this.compOptionsOne = res.allCompNameID;
    //     // this.tagBindFormLoading = false
    //     // this.tagBindFormGoodsNameLoading = true
    //     // this.tagsBindNameOptionsOne = res.allCompNameID
    //     // this.tagBindFormGoodsNameLoading = false

    //     // this.tagBindFormLoading = false
    //     // this.tagBindFormLoading = true
    //   });
    // },
    changeCompName(val) {
      this.ompNameLength = val;
      this.tagDataGoodsLoading = true;
      this.tagData.compName = val.comp_Name;
      this.compCd = val.comp_CD;
      showAllGoodsName({ compID: val.comp_ID }, this.$store.getters.token).then(
        res => {
          this.tagDataGoodsLoading = false;

          this.goodsOptions = res.goodsName;
        }
      );
    },
    showAllCompNameIDInfo() {
      this.tagDataCompNameLoading = true;
      showAllCompNameID(this.$store.getters.token).then(res => {
        this.tagDataCompNameLoading = false;

        this.compNameOptions = res.allCompNameID;
        this.compOptionsOne = res.allCompNameID;
      });
    },
    tableCurrentChange(currentRow, oldCurrentRow) {
      this.$refs.tableData.toggleRowSelection(currentRow);
    },
    flashOne() {
      this.searchLabelInfo();
    },
    flashTwo() {
      this.searchLabelInfo();
    },
    clickitem(index) {
      index === this.radio ? (this.radio = "") : (this.radio = index);
      this.queryForm.synStatus = this.radio;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    datePicke(val) {
      if (val != null) {
        this.queryForm.addDateStart = new Date(val[0]).getTime() / 1000;
        this.queryForm.addDateEnd = new Date(val[1]).getTime() / 1000;
      } else {
        this.queryForm.addDateStart = "";
        this.queryForm.addDateEnd = "";
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formLoading = true;
          delLabelMsg(
            { checkCode: row.check_code },
            this.$store.getters.token
          ).then(res => {
            this.formLoading = false;

            if (res.code == 1) {
              this.$notify({
                title: "成功!",
                message: "删除成功!",
                type: "success"
              });
              this.searchLabelInfo();
            } else if (res.code == 2) {
              this.$notify({
                title: "失败!",
                message: "已同步存证无法删除!",
                type: "warning"
              });
            } else if (res.code == 3 || res.code == 4) {
              this.$notify({
                title: "失败!",
                message: "导出过的标签无法删除!",
                type: "warning"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      if (isNaN(val) == true) {
        this.queryForm.pageSize = "";
        this.queryForm.pageNum = "";
        this.$set(this.queryForm, "allMsg", -1);
        searchLabel(this.queryForm, this.$store.getters.token).then(res => {
          this.formLoading = false;
          this.tableData = res.data;
          this.total = res.totalNum[0].total;
          this.$set(this.queryForm, "allMsg", "");
        });
      } else {
        this.queryForm.pageSize = val;
        this.queryForm.pageNum = 1;
        this.changePagesLabel();
      }
    },
    handleCurrentChange(val) {
      this.queryForm.pageNum = val;
      this.changePagesLabel();
    },

    changeTimestamp(timestamp) {
      const date = new Date(timestamp);
      const Y = date.getFullYear() + "/";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      const D =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + " ";
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
      return Y + M + D;
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        // this.downloadLoading = true
        import("../../vendor/ExportTags").then(excel => {
          const tHeader = [
            "商品编码",
            "商品名称",
            "商品规格",
            "批次号",
            "商品价格(元)",
            "验证码",
            "消费码",
            "商品有效期",
            "生产日期",
            "标签日期",
            "企业编码",
            "企业简称",
            "备注"
          ];
          const filterVal = [
            "goods_CD",
            "goods_Name",
            "goods_Spen",
            "goods_lot",
            "goods_Pric",
            "check_code",
            "consume_code",
            "Expire_date",
            "product_date",
            "add_date",
            "comp_CD",
            "comp_Simp_Name",
            "memo"
          ];
          // const list = [...this.multipleSelection]

          const list = JSON.parse(JSON.stringify(this.multipleSelection));

          list.forEach(item => {
            item.product_date = this.changeTimestamp(item.product_date * 1000);

            item.add_date = this.changeTimestamp(item.add_date * 1000);
          });

          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          });
          this.$refs.tableData.clearSelection();
          // this.downloadLoading = false
        });
      } else {
        this.$message({
          message: "请选择导出条目!",
          type: "warning"
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.selectData = val;
      this.checkCodesList = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.checkCodesList.push(this.multipleSelection[i].check_code);
      }
    },
    synLabelToGoodsInfo() {
      if (this.checkCodesList == "") {
        this.$notify({
          title: "注意!",
          message: "请选择需要同步的条目!",
          type: "warning"
        });
      } else {
        this.formLoading = true;
        this.formLoadingText = "同步存证中";
        synInput(
          { checkCodes: this.checkCodesList, source: 0 },
          this.$store.getters.token
        ).then(res => {
          this.formLoading = false;
          if (this.checkCodesList != "") {
            if (res.code == 1) {
              this.$notify({
                title: "成功!",
                message: "同步存证成功!",
                type: "success"
              });
              this.searchLabelInfo();
            } else if (res.code == 2) {
              this.$notify({
                title: "失败!",
                message: "存在同步过的条码,请勿重复同步！",
                type: "warning"
              });
            } else if (res.code == 3) {
              this.$notify({
                title: "失败!",
                message: "条码未上传成功,请稍后尝试!",
                type: "warning"
              });
            } else if (res.code == 4) {
              this.$notify({
                title: "注意!",
                message: "数据异常,请联系管理员!",
                type: "warning"
              });
            } else if (res.code == 7) {
              this.$notify({
                title: "注意!",
                message: "MOAC不足,请充值!",
                type: "warning"
              });
            }
          }
        });
      }
    },
    openTags() {
      Object.keys(this.tagData).forEach(key => (this.tagData[key] = ""));
      this.dialogVisible = true;
      this.getAllGoodsNameCDInfo();
      if (this.userType == 2) {
        this.showAllCompNameIDInfo();
      } else {
        this.tagData.compName = localStorage.getItem("comp_Name");
        showAllGoodsName(
          { compID: this.compID },
          this.$store.getters.token
        ).then(res => {
          this.tagDataGoodsLoading = false;

          // for (let i = 0; i < res.goodsNames.length; i++) {
          //   this.goodsOptions.push(res[i].goodsNames)
          // }
          this.goodsOptions = res.array;
        });
      }
    },
    changeRowColor({ row, rowIndex }) {
      if (this.selectRow.includes(rowIndex)) {
        return "background-color:rgb(194, 224, 255)";
      }
      if (rowIndex % 2 === 1) {
        return "background-color:rgb(230, 230, 230)";
      }
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => {})
    // },
    changeGoodsName(val) {
      this.tagData.goodsCd = val.goodsCD;
      this.tagData.goodsName = val.goodsNameSpen;

   this.tagData.goods_Spen=''
      this.tagData.goods_Describe=''
           showGoodsMsg({ goodsCD: val.goodsCD }, this.$store.getters.token).then(
        res => {

    this.tagData.goodsNameValue = res.goodsMsg.goods_Name;
      this.tagData.goods_Spen = res.goodsMsg.goods_Spen;
      this.tagData.goods_Describe = res.goodsMsg.goods_Describe;

        })

    },
    // getallGoodsByUser() {
    //   allGoodsByUser(this.$store.getters.token).then(res => {
    //     console.log(33333333333, res)

    //     this.goodsOptions = res.msg
    //   })
    // },
    searchLabelInfo() {
      if (this.queryForm.compName == null || this.queryForm.compName == "") {
        this.$notify({
          title: "注意!",
          message: "请先选择企业名称!",
          type: "warning"
        });
      } else {
        this.queryForm.pageNum = 1;
        this.formLoading = true;
        searchLabel(this.queryForm, this.$store.getters.token).then(res => {
          this.formLoading = false;
          this.tableData = res.data;
          this.total = res.totalNum[0].total;
        });
      }
    },
    changePagesLabel() {
      this.formLoading = true;
      searchLabel(this.queryForm, this.$store.getters.token).then(res => {
        this.formLoading = false;
        this.tableData = res.data;
        this.total = res.totalNum[0].total;
      });
    },
    getAllGoodsNameCDInfo() {
      AllGoodsNameCD(this.$store.getters.token).then(res => {
        this.tagDataLoading = true;
        this.adminGoodsOptions = res.AllGoodsNameCD;
        this.tagDataLoading = false;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogLoading = true;
          this.loadingText = "标签生成中";
          createCode(
            {
              num: this.tagData.num,
              compCD: this.compCd,
              goodsCD: this.tagData.goodsCd,
              goodsLot: this.tagData.goodsSlot,
              ExpireDate: this.tagData.shelfLife,
              goodsPric: this.tagData.goodsPrice,
              productDate: new Date(this.tagData.timeValue).getTime() / 1000,
              memo: this.tagData.memo
            },
            this.$store.getters.token
          ).then(res => {
            this.dialogLoading = false;
            if (res.code == 1) {
              this.$notify({
                title: "成功!",
                message: "生成标签成功!",
                type: "success"
              });
              if (this.userType != 2) {
                this.searchLabelInfo();
              }
              this.dialogVisible = false;
            } else if (res.code == 3) {
              this.$notify({
                title: "注意!",
                message: "数据填写不完整!",
                type: "warning"
              });
            } else if (res.code == 4) {
              this.$notify({
                title: "注意!",
                message: "商品编码不存在!",
                type: "warning"
              });
            } else if (res.code == 2) {
              this.$notify({
                title: "注意!",
                message: "最多生成条数为1000条!",
                type: "warning"
              });
            } else if (res.code == 5) {
              this.$notify({
                title: "注意!",
                message: "请先将商品存证!",
                type: "warning"
              });
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
.tags {
  &-title {
    width: 95%;
    margin: 0 auto;
  }
  &-button {
    background: rgb(48, 65, 86);
    color: white;
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
}
</style>

<style lang="scss">
.tags {
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: rgba(102, 177, 255, 0.4) !important;
  }
}
</style>
