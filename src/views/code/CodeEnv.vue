<template>
  <div class="env">
    <div class="env-info">
      <div
        style="height:40px;line-height:40px;border-bottom: 1px solid rgba(200, 200, 200, 0.6);"
      >条码存证中心</div>
      <div class="code-form" style="width:100%;margin:0 auto;">
        <div style="width:100%;">
          <UpLoad-Excel
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            style="display:inline;"
          />

          <el-button
            class="env-rightbutton"
            icon="el-icon-document"
            @click="exportExcel"
            style="width:120px;padding-left:8px"
          >模板下载(xls)</el-button>
          <el-button
            class="env-leftbutton"
            icon="el-icon-info"
            style="width:120px;padding-left:8px"
          >接口引入</el-button>
          <el-button
            class="env-rightbutton"
            icon="el-icon-circle-check"
            @click="layCode"
            style="width:120px"
            :loading="layCodeLoading"
          >存 证</el-button>
          <div
            style="height:20px;width:50px;background-color:rgba(230, 162, 60,0.4);display:inline;float:right;margin-top:20px"
          ></div>
          <div
            style="height:100%;width:80px;display:inline;float:right;margin-top:20px;color:gray"
          >异常数据 -</div>
        </div>
        <el-table
          ref="multipleTable"
          v-loading="loadingEnv"
          :element-loading-text="loadingText"
          element-loading-spinner="el-icon-loading"
          :data="getCodeInfo"
          style="width: 100%;margin-top:10px"
          :header-cell-style="{background:'rgba(48, 65, 86,0.2)'}"
          border
          @selection-change="handleSelectionChange"
          :row-class-name="tableRowClassName"
        >
          >
          <template slot="empty">
            <div>无数据</div>
          </template>
          <el-table-column type="selection" align="center" width="70" :selectable="checkboxT" />
          <el-table-column label="序号" width="70" type="index" align="center" />
          <el-table-column
            label="商品编码"
            width="150"
            align="center"
            prop="goods_CD"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="商品名称"
            align="center"
            prop="goods_Name"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="批次号"
            align="center"
            prop="goods_lot"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品价格(元)"
            align="center"
            prop="goods_Pric"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{tofix(scope.row.goods_Pric)}}</template>
          </el-table-column>
          <el-table-column
            label="验证码"
            align="center"
            prop="check_code"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="消费码"
            align="center"
            prop="consume_code"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="产品有效期"
            prop="Expire_date"
            align="center"
            :show-overflow-tooltip="true"
          />'
          <el-table-column
            label="生产日期"
            prop="product_date"
            align="center"
            :show-overflow-tooltip="true"
          >
            <!-- <template slot-scope="scope">{{changeTimestampInfo(scope.row.product_date*1000)}}</template> -->
          </el-table-column>

          <el-table-column
            label="企业编码"
            align="center"
            prop="comp_CD"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="企业简称"
            align="center"
            prop="comp_Simp_Name"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="备注" align="center" prop="memo" :show-overflow-tooltip="true" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.native.prevent="deleteRow(scope.$index, codeInfo)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px">
          <el-pagination
            layout="total,sizes,prev, pager, next"
            :total="total"
            style="text-align:center"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            @size-change="handleSizeChange"
            :page-sizes="[5, 10, 20, 100]"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpLoadExcel from "@/views/code/UpLoadExcel"
import { inputBar, checkMsgValue } from "../../api/api"
import { mapState, mapActions } from "vuex"
export default {
  components: { UpLoadExcel },
  data() {
    return {
      queryForm: {
        companyCode: "",
        companyName: "",
        companyTitle: "",
        companyPre: "",
        userCode: "",
        userName: ""
      },
      tableData: [],
      tableHeader: [],
      currentPage: 1,
      pageSize: 10,
      total: "",
      radio: "",
      timestampValue: "",
      codeInfo: [],
      multipleSelection: [],
      codeEnv: "",
      envData: "",
      compIDByUser: "",
      userType: "",
      loadingText: "",
      loadingEnv: false,
      layCodeLoading: false
    }
  },
  computed: {
    tofix() {
      return function(num) {
        return Number(num).toFixed(2)
      }
    },
    getCodeInfo() {
      // let currentCodeInfo = []
      // this.total = this.codeInfo.length
      // const count = (this.currentPage - 1) * 10
      // for (let i = 0; i < 10; i++) {
      //   if (i + count < this.codeInfo.length) {
      //     currentCodeInfo.push(this.codeInfo[i + count])
      //   }
      // }
      // return currentCodeInfo
      let currentCodeInfo = []

      this.total = this.codeInfo.length
      let start = this.pageSize * this.currentPage - this.pageSize
      let end = this.pageSize * this.currentPage

      end = end > this.codeInfo.length ? this.codeInfo.length : end

      for (let i = start; i < end; i++) {
        currentCodeInfo.push(this.codeInfo[i])
      }

      return currentCodeInfo
    },
    changeTimestampInfo() {
      return function(timestamp) {
        return this.changeTimestamp(timestamp)
      }
    }
  },
  created() {
    // this.codeInfo = this.$store.state.settings.mul.MUL
    // this.codeInfo.goodsCode = this.$store.state.settings.mul.MUL.goods_CD
    this.$store.state.settings.mul === undefined
      ? (this.codeInfo = "")
      : (this.codeInfo = this.$store.state.settings.mul.MUL)
    this.userType = localStorage.getItem("user_Type")
    if (this.userType != 2) {
      this.compIDByUser = localStorage.getItem("comp_ID")
    } else {
      this.compIDByUser = ""
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    layCode() {
      if (this.envData == "") {
        this.$notify({
          title: "注意!",
          message: "请选择存证条目!",
          type: "warning"
        })
      } else {
        this.layCodeLoading = true
        this.loadingEnv = true
        this.loadingText = "存证中"
        inputBar({ MSGS: this.envData }, this.$store.getters.token).then(
          res => {
            this.loadingEnv = false
            this.layCodeLoading = false

            if (res.code === 1) {
              this.$notify({
                title: "成功!",
                message: "条码存证成功!",
                type: "success"
              })
            } else if (res.code === 2) {
              this.$notify({
                title: "失败!",
                message: "条码存证失败,请重新尝试!",
                type: "warning"
              })
            } else if (res.code === 3) {
              this.$notify({
                title: "失败!",
                message: "存在已存证过的条码!",
                type: "warning"
              })
            }
          }
        )
      }
    },
    exportExcel() {
      this.downloadLoading = true
      import("@/vendor/Export").then(excel => {
        const tHeader = [
          "商品编码(必填)",
          "商品名称(必填)",
          "批次号(必填)",
          "产品价格(元/必填)",
          "验证码(必填)",
          "消费码(必填)",
          "产品有效期(必填)",
          "生产日期(必填)",
          "企业编码(必填)",
          "企业简称(必填)",
          "备注(选填)",
          " 备注信息(生产日期格式为:YYYY/MM/DD,如:1970/01/01;产品价格必须保留2位小数+单位,如:1000.00,单位默认为元;商品编码必须是新增过的!企业自己输入验证码规则：compID-企业自己产生的验证码 )"
        ]

        excel.export_json_to_excel({
          header: tHeader,
          data: "",
          filename: this.filename
        })

        this.downloadLoading = false
      })
      // }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      var envDataList = []
      for (let i = 0; i < val.length; i++) {
        var m = []
        m.push(val[i].goods_CD)
        m.push(val[i].goods_lot)
        m.push(val[i].Expire_date)
        m.push(Number(val[i].goods_Pric))
        m.push(val[i].check_code)
        m.push(val[i].consume_code)
        m.push(Math.round(new Date(val[i].product_date) / 1000))
        if (val[i].memo != undefined) {
          m.push(val[i].memo.toString())
        } else {
          m.push("")
        }
        m.push(val[i].goods_Name)
        envDataList.push(m)
      }
      this.envData = envDataList
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: "请不要上传超过1M大小的文件!",
        type: "warning"
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.codeInfo = []
      for (var i = 0; i < results.length; i++) {
        var codeExcel = {}
        codeExcel.goods_CD = results[i]["商品编码(必填)"]
        codeExcel.goods_Name = results[i]["商品名称(必填)"]
        codeExcel.goods_Pric = results[i]["产品价格(元/必填)"]
        codeExcel.goods_lot = results[i]["批次号(必填)"]
        codeExcel.check_code = results[i]["验证码(必填)"]
        codeExcel.consume_code = results[i]["消费码(必填)"]
        codeExcel.Expire_date = results[i]["产品有效期(必填)"]

        codeExcel.product_date = results[i]["生产日期(必填)"]
        codeExcel.comp_CD = results[i]["企业编码(必填)"]
        codeExcel.comp_Simp_Name = results[i]["企业简称(必填)"]
        codeExcel.memo = results[i]["备注(选填)"]
        this.codeInfo.push(codeExcel)
      }

      var handleSuccessData = []
      for (let i = 0; i < results.length; i++) {
        var k = []
        k.push(results[i]["商品编码(必填)"])
        k.push(results[i]["批次号(必填)"])
        k.push(results[i]["产品有效期(必填)"])
        k.push(Number(results[i]["产品价格(元/必填)"]))
        k.push(results[i]["验证码(必填)"])
        k.push(results[i]["消费码(必填)"])
        k.push(Math.round(new Date(results[i]["生产日期(必填)"]) / 1000))
        k.push(results[i]["备注(选填)"])
        k.push(results[i]["商品名称(必填)"])
        // k.push(new Date(results[i]["生产日期(必填)"]))
        handleSuccessData.push(k)
      }
      this.loadingEnv = true
      this.loadingText = "数据检测中"
      checkMsgValue(
        { MSGS: handleSuccessData, compIDByUser: this.compIDByUser },
        this.$store.getters.token
      ).then(res => {
        this.loadingEnv = false
        if (res.k.length > 0) {
          for (let n = 0; n < res.k.length; n++) {
            for (let p = 0; p < this.codeInfo.length; p++) {
              if (res.k[n] == this.codeInfo[p].check_code) {
                var a = this.codeInfo[p]
                a.status = 0
                this.codeInfo.splice(p, 1, a)
              }
            }
          }
          this.$message({
            message: "有数据异常,请修改后存证!",
            type: "warning"
          })
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.status == "0") {
        return "warning-row"
      }
    },
    checkboxT(row, rowIndex) {
      if (row.status == "0") {
        //      if(row.lie =='1'){
        return false //禁用
      } else {
        return true //不禁用
      }
    },
    changeTimestamp(timestamp) {
      const date = new Date(timestamp)
      const Y = date.getFullYear() + "/"
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/"
      const D =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate() + " "
      const h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":"
      const m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":"
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      return Y + M + D
    }
  }
}
</script>

<style lang="scss" scoped>
.env {
  &-info {
    width: 95%;
    margin: 0 auto;

    // position: absolute;
  }
  &-leftbutton {
    margin-top: 10px;
    background-color: rgb(48, 65, 86);
    color: white;
  }
  &-rightbutton {
    margin-top: 10px;
    margin-left: 10px;
    background-color: rgb(48, 65, 86);
    color: white;
  }
}
</style>
<style lang="scss">
.el-table .warning-row {
  background-color: rgba(230, 162, 60, 0.4);
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
