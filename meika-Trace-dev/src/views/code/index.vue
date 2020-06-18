<template>
  <div class="code">
    <div class="code-info">
      <div style="line-height:35px;border-bottom:1px solid rgba(200, 200, 200, 0.6);">历史标签查询</div>

      <div class="grid-content bg-purple-dark">
        <el-form
          ref="queryForm"
          :model="queryForm"
          class="info-queryForm"
          style="margin-top:10px;overflow-x:hidden;padding-bottom:-10px"
          :inline="true"
        >
          <el-form-item label="企业编码:" v-if="userType=='2'">
            <el-input v-model="queryForm.compCD" clearable />
          </el-form-item>
          <el-form-item label="企业名称:" v-if="userType=='2'">
            <el-input v-model="queryForm.compName" style="width:300px" clearable />
          </el-form-item>

          <el-form-item label="企业简称:" v-if="userType=='2'">
            <el-input v-model="queryForm.compSimpName" style="width:300px" clearable />
          </el-form-item>

          <el-form-item label="企业法人:" v-if="userType=='2'">
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
              type="datetimerange"
              bia
              range-separator="-"
              start-placeholder="生成开始日期"
              end-placeholder="生成结束日期"
              style="width:380px"
              @change="selectTime"
            />
          </el-form-item>
          <el-form-item label="标签状态:">
            <el-radio-group v-model="radio">
              <el-radio
                v-for="(item, index) in [{key:'3',value:'已消费'},{key:'4',value:'未消费'}]"
                :key="item.key"
                @click.native.prevent="clickitemOne(item.key)"
                :label="item.key"
              >{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="存证状态:">
            <el-radio-group v-model="envRadio">
              <el-radio
                v-for="(item, index) in [{key:'1',value:'未存证'},{key:'0',value:'已存证'}]"
                :key="item.key"
                @click.native.prevent="clickitemTwo(item.key)"
                :label="item.key"
              >{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button
            class="code-query"
            icon="el-icon-search"
            @click="searchBarInfo"
            style="width:120px;"
          >查 询</el-button>
        </el-form>
      </div>

      <div class="code-form">
        <div
          style="width:20%;height:40px;margin-top:10px;line-height:40px;float:right;text-align:right"
          v-if="userType!='2'"
        >
          <span style="color:gray">企业编码:</span>
          <span style="color:gray">{{compCd}}</span>&nbsp;
          <span style="color:gray">企业简称:</span>
          <span style="color:gray">{{compSimpleName}}</span>
        </div>
        <el-button
          class="code-rightbutton"
          icon="el-icon-circle-check"
          @click="toCodeEnv"
          style="width:120px;"
          :loading="toCodeEnvLoading"
        >标签存证</el-button>
        <el-table
          v-loading="tableLoading"
          :element-loading-text="loadingText"
          element-loading-spinner="el-icon-loading"
          ref="codeInfo"
          :data="codeInfo"
          :header-cell-style="{background:'rgba(48, 65, 86,0.2)'}"
          border
          @selection-change="handleSelectionChange"
          :row-style="changeRowColor"
          @current-change="tableCurrentChange"
          style="margin-top:60px"
        >
          <template slot="empty">
            <div>无数据</div>
          </template>
          <!-- <el-table-column type="selection" align="center" width="70" /> -->
          <!-- <el-table-column
            label="商品编码"
            width="120"
            align="center"
            prop="goods_CD"
            :show-overflow-tooltip="true"
          />-->
          <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
          <el-table-column label="序号" width="60" type="index" align="center">
            <template scope="scope">
              <span>{{ scope.$index+(queryForm.pageNum - 1) * queryForm.pageSize + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品编码"
            width="150"
            align="center"
            prop="goods_CD"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="商品名称"
            :show-overflow-tooltip="true"
            align="center"
            width="150"
            prop="goods_Name"
          />
          <el-table-column
            label="商品规格"
            :show-overflow-tooltip="true"
            align="center"
            width="150"
            prop="goods_Spen"
          />
          <el-table-column
            label="保质期"
            align="center"
            width="80"
            prop="shelf_life"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="批次号"
            align="center"
            prop="goods_lot"
            width="120"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="产品价格(元)" align="center" :show-overflow-tooltip="true" width="120">
            <template slot-scope="scope">{{tofix(scope.row.goods_Pric)}}</template>
          </el-table-column>
          <el-table-column
            label="验证码"
            align="center"
            prop="check_code"
            width="150"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="消费码"
            width="520"
            align="center"
            prop="consume_code"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="标签存证Hash"
            prop="reg_hash"
            align="center"
            width="520"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.reg_hash==null?'暂无存证': scope.row.reg_hash }}</template>
          </el-table-column>
          <el-table-column label="存证时间" prop="reg_Hash_Datetime" align="center" width="170">
            <template
              slot-scope="scope"
            >{{scope.row.reg_Hash_Datetime==null?'暂无存证时间': changeTimestampInfo(scope.row.reg_Hash_Datetime*1000) }}</template>
          </el-table-column>

          <el-table-column
            label="企业编码"
            align="center"
            prop="comp_CD"
            width="100"
            v-if="userType=='2'"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="企业简称"
            align="center"
            width="80"
            prop="comp_Simp_Name"
            v-if="userType=='2'"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="企业名称"
            width="200"
            v-if="userType=='2'"
            :show-overflow-tooltip="true"
            align="center"
            prop="comp_Name"
          />
          <el-table-column
            label="企业法人"
            v-if="userType=='2'"
            width="100"
            :show-overflow-tooltip="true"
            align="center"
            prop="comp_Leader"
          />
          <el-table-column
            label="消费状态"
            :show-overflow-tooltip="true"
            align="center"
            width="80"
            prop="consume_Status"
          >
            <template slot-scope="scope">{{scope.row.consume_Status==1?'已消费':'未消费'}}</template>
          </el-table-column>
            <el-table-column
            label="存证状态"
            :show-overflow-tooltip="true"
            align="center"
            width="80"
            prop="hashStatus"
          >
           <!-- <template slot-scope="scope"> {{scope.row.hashStatus==''?'未存证':(scope.row.hashStatus==0?'存证失败':(scope.row.hashStatus==2?'已存证':'存证中'))}}</template> -->
          </el-table-column>
          <el-table-column label="操作" align="center" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="width:100%;text-align:center;margin-top:10px">
          <el-pagination
            :current-page="queryForm.pageNum"
            :page-sizes="[10,20,50,100,500]"
            :page-size="queryForm.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totalNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchBar, allBar, delBindingBar, synInput } from "../../api/api";
import { log } from "util";

export default {
  data() {
    return {
      queryForm: {
        goodsCD: "",
        goodsName: "",
        compCD: "",
        goodslog: "",
        compName: "",
        compLeader: "",
        startTime: "",
        endTime: "",
        pageSize: 10,
        pageNum: 1,
        Chain: "",
        Spending: "",
        checkCode: "",
        spen: ""
      },
      totalNum: 0,
      radio: "",
      envRadio: "",
      tableData: [],
      tableHeader: [],

      timestampValue: [],
      codeInfo: [],
      multipleSelection: [],
      selectRow: [],
      userType: "",
      compCd: "",
      compSimpleName: "",
      checkCodes: "",
      loadingText: "",
      tableLoading: false,
      toCodeEnvLoading: false
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

  created() {
    this.searchBarInfo();

    this.userType = localStorage.getItem("user_Type");
    this.compCd = localStorage.getItem("comp_CD");
    this.compSimpleName = localStorage.getItem("comp_Simp_Name");
  },

  methods: {
    clickitemOne(index) {
      index === this.radio ? (this.radio = "") : (this.radio = index);
      this.queryForm.Spending = this.radio;
    },
    clickitemTwo(index) {
      index === this.envRadio ? (this.envRadio = "") : (this.envRadio = index);
      this.queryForm.Chain = this.envRadio;
    },
    handleCheckAllChange(val) {
      if (val.length > 0) {
        this.queryForm.Spending = val[0].status;
      } else {
        val = "";
        this.queryForm.Spending = "";
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableLoading = true;

          delBindingBar(
            { delCheckCode: row.check_code },
            this.$store.getters.token
          ).then(res => {
            this.tableLoading = false;
            this.searchBarInfo();
            if (res.code == 1) {
              this.$notify({
                title: "成功!",
                message: "已存证的标签无法删除!",
                type: "warning"
              });
            } else if (res.code == 2) {
              this.$notify({
                title: "失败!",
                message: "删除成功!",
                type: "success"
              });
            } else if (res.code == 3) {
              this.$notify({
                title: "失败!",
                message: "删除异常!",
                type: "warning"
              });
            } else if (res.code == 4 || res.code == 5) {
              this.$notify({
                title: "失败!",
                message: "标签已被导出,无法删除!",
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
    selectTime(timestampValue) {
      if (timestampValue != null) {
        this.queryForm.startTime = new Date(timestampValue[0]).getTime() / 1000;
        this.queryForm.endTime = new Date(timestampValue[1]).getTime() / 1000;
      } else {
        this.queryForm.startTime = "";
        this.queryForm.endTime = "";
      }
    },
    exportExcel() {
      this.downloadLoading = true;
      import("@/vendor/Export").then(excel => {
        const tHeader = [
          "商品编码",
          "商品名称",
          "批次号",
          "产品价格",
          "验证码",
          "消费码",
          "标签存证",
          "存证时间",
          "企业编码",
          "企业简称"
        ];

        excel.export_json_to_excel({
          header: tHeader,
          data: "",
          filename: this.filename
        });

        this.downloadLoading = false;
      });
      // }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
    // beforeUpload(file) {
    //   const isLt1M = file.size / 1024 / 1024 < 1

    //   if (isLt1M) {
    //     return true
    //   }

    //   this.$message({
    //     message: "请不要上传超过1M大小的文件",
    //     type: "warning"
    //   })
    //   return false
    // },
    // handleSuccess({ results, header }) {
    //   this.codeInfo = []
    //   for (var i = 0; i < results.length; i++) {
    //     var codeExcel = {}
    //     codeExcel.goodsCode = results[i]["商品编码"]
    //     codeExcel.goodsName = results[i]["商品名称"]
    //     codeExcel.goodsShelf = results[i]["产品价格"]
    //     codeExcel.goodsBatch = results[i]["批次号"]
    //     codeExcel.verCode = results[i]["验证码"]
    //     codeExcel.consumerCode = results[i]["消费码"]
    //     codeExcel.codeEnv = results[i]["二维码存证"]
    //     codeExcel.envTime = results[i]["存证时间"]
    //     codeExcel.companyCode = results[i]["企业编码"]
    //     codeExcel.companyTitle = results[i]["企业简称"]

    //     this.codeInfo.push(codeExcel)
    //   }
    // },
    toCodeEnv() {
      if (this.checkCodes == "") {
        this.$notify({
          title: "注意!",
          message: "请先选择存证条目!",
          type: "warning"
        });
      } else {
        this.toCodeEnvLoading = true;
        this.tableLoading = true;
        this.loadingText = "数据存证中";
        synInput(
          { checkCodes: this.checkCodes },
          this.$store.getters.token
        ).then(res => {
          this.toCodeEnvLoading = false;
          this.tableLoading = false;
          if (res.code == 1) {
            this.$notify({
              title: "成功!",
              message: "存证成功!",
              type: "success"
            });
            this.searchBarInfo();
          } else if (res.code == 2) {
            this.$notify({
              title: "失败!",
              message: "存在已存证的数据,请勿重复存证!",
              type: "warning"
            });
          } else if (res.code == 3) {
            this.$notify({
              title: "失败!",
              message: "条码未上传成功，请重新尝试!",
              type: "warning"
            });
          }
        });
      }
    },
    searchBarInfo() {
      if (this.userType != 2) {
        this.queryForm.compCD = localStorage.getItem("comp_CD");
      }

      this.tableLoading = true;
      this.loadingText = "数据加载中";
      this.queryForm.pageNum = 1;
      searchBar(this.queryForm, this.$store.getters.token).then(res => {
        this.tableLoading = false;
        this.codeInfo = res.sqlValue;
        this.totalNum = res.total[0].total;
      });
    },
    changePagesBar() {
      if (this.userType != 2) {
        this.queryForm.compCD = localStorage.getItem("comp_CD");
      }
      this.tableLoading = true;
      searchBar(this.queryForm, this.$store.getters.token).then(res => {
        this.tableLoading = false;
        this.codeInfo = res.sqlValue;
        this.totalNum = res.total[0].total;
      });
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.queryForm.pageNum = 1;

      this.changePagesBar();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNum = val;
      this.changePagesBar();
    },
    changeTimestamp(timestamp) {
      const date = new Date(timestamp);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D =
        date.getDate() < 10 ? "0" + date.getDate() + ":" : date.getDate() + " ";
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
    getallBarInfo() {
      allBar(
        { pageNum: this.pageNum, pageSize: this.pageSize },
        this.$store.getters.token
      ).then(res => {
        this.totalNum = res.totalNum[0].total;
        this.codeInfo = res.sqlMsg;
      });
    },
    changeRowColor({ row, rowIndex }) {
      if (this.selectRow.includes(rowIndex)) {
        return "background-color:rgba(194, 224, 255,1)";
      }
      if (rowIndex % 2 === 1) {
        return "background-color:rgb(230, 230, 230)";
      }
    },
    tableCurrentChange(currentRow, oldCurrentRow) {
      this.$refs.codeInfo.toggleRowSelection(currentRow);
    }
  },
  watch: {
    multipleSelection(data) {
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(this.codeInfo.indexOf(item));
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.code {
  &-info {
    width: 95%;
    margin: 0 auto;

    // line-height: 50px;
    // position: absolute;
  }
  &-leftbutton {
    float: left;
    margin-top: 10px;
    background-color: rgb(48, 65, 86);
    color: white;
  }
  &-rightbutton {
    float: left;
    margin-top: 10px;
    background-color: rgb(48, 65, 86);
    color: white;
  }
  &-form {
    width: 100%;
    margin: 0 auto;
    border-top: 1px solid rgba(200, 200, 200, 0.6);
  }
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
}
</style>
