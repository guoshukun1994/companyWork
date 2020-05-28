<template>
  <div class="consumeTable">
    <div class="table">
      <el-table
        height="500px"
        :data="tableData"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
      >
        <el-table-column align="right" label="序号" type="index" :index="indexMethod" />
        <el-table-column align="center" label="验证码" width="290">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.check_code }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="消费Hash" width="550">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.consume_Hash }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Hash时间" width="160">
          <template slot-scope="scope">
            <p class="tableText">{{ getTime(scope.row.consume_Hash_Datetime) }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="区块高度" width="80">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.blockNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column label="区块Hash" align="center" width="550">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.blockHash }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <p class="jump" @click="jumpDetail(scope.row)">详情</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center" class="pagination">
      <el-pagination
        :background="true"
        :current-page="currentPage"
        :page-sizes="[22, 50, 100, 200]"
        :page-size="22"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getConsumeData } from "../../api/dataShow"
import { getTime } from "../../utils/index"

export default {
  name: "consumeTable",
  props: ["comp_CD"],
  data() {
    return {
      tableData: [],
      pageNumber: 1,
      pageSize: 22,
      currentPage: 1,
      total: 0
    }
  },
  handleSizeChange(val) {
    this.pageSize = val
    this.getConsumeData()
  },
  computed: {
    getTime() {
      return function(timestamp) {
        return getTime(timestamp)
      }
    }
  },
  watch: {
    comp_CD: function() {
      this.getConsumeData()
    }
  },
  mounted() {
    this.getConsumeData()
  },
  methods: {
    getConsumeData() {
      getConsumeData({
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        comp_CD: this.comp_CD
      }).then(res => {
        this.tableData = res.consumeList
        this.total = res.count
      })
    },
    handleSizeChange(val) {

      this.pageSize = val
      this.getConsumeData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getConsumeData()
    },
    indexMethod(index) {
      return index + 1
    },
    tableRowStyle({ rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "  background-color: rgba(5, 20, 48, 0.2);"
      } else {
        return "background-color: transparent"
      }
    },
    // 设置表头行的样式
    tableHeaderColor() {
      return "background-color: rgba(5, 20, 48, 0.2);"
    },
    jumpMore() {
      this.$router.push("/consumetable")
    },
    jumpDetail(data) {
      this.$emit("getDetail", data)
    }
  }
}
</script>

<style lang="scss" scoped>
.consumeTable {
  .table {
    width: 100%;
    .el-table {
      color: #000;
      background-color: transparent;
    }

    .el-table th,
    .el-table tr,
    .el-table td {
      border: 0;
    }

    .el-table tr {
      background-color: transparent;
    }

    .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 34px;
    }

    .el-table__body tr,
    .el-table__body td {
      padding: 0;
      margin: 0;
      height: 34px;
    }

    .el-table::before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;
    }

    .el-table__row:hover td {
      background-color: transparent;
    }
    .el-table__body .el-table__row td .cell {
      height: 34px;
      line-height: 34px;
    }
    .el-table__body .el-table__row td .tableText,
    .jump {
      margin: 0 auto;
      height: 34px;
      line-height: 34px;
    }
    .el-table__body .el-table__row td div {
      height: 34px;
      line-height: 34px;
    }
  }

  .tableText {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
