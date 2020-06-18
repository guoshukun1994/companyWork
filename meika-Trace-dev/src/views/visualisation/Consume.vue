/* eslint-disable vue/attribute-hyphenation */
/* eslint-disable vue/attribute-hyphenation */
<template>
  <div class="consume">
    <div class="title">
      <div>消费Hash</div>
      <div @click="jumpMore">
        更多
        <img src="../../assets/more.png" />
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" :header-cell-style="tableHeaderColor">
        <el-table-column align="right" label="序号" type="index" :index="indexMethod"></el-table-column>
        <el-table-column align="center" label="验证码" width="250">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.check_code }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="消费Hash" width="500">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.consume_Hash }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Hash时间" width="160">
          <template slot-scope="scope">
            <p class="tableText">{{ getTime(scope.row.consume_Hash_Datetime) }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="区块高度" width="100">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.blockNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column label="区块Hash" align="center" width="450">
          <template slot-scope="scope">
            <p class="tableText">{{ scope.row.blockHash }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <p @click="jumpDetail(scope.row)" class="jump">详情</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="更多" :visible.sync="consumeDialagVisible" width="1380px" top="0">
        <ConsumeTable @getDetail="jumpDetail" :comp_CD="comp_CD" />
      </el-dialog>
    </div>
    <div>
      <el-dialog title="详情" :visible.sync="detailVisible" width="1380px" top="0">
        <CheckDetail :checkCode="checkCode" />
        <GoodDetail :goods_ID="goods_ID" :checkCode="checkCode"/>
        <CompanyDetail :comp_ID="comp_ID" :checkCode="checkCode"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getConsumeData } from "../../api/dataShow"
import { getInfo } from "../../api/user"
import { getTime } from "../../utils/index"
import ConsumeTable from "./ConsumeTable.vue"
import CompanyDetail from "./CompanyDetail.vue"
import GoodDetail from "./GoodDetail.vue"
import CheckDetail from "./CheckDetail.vue"

export default {
  name: "Consume",
  props: ["comp_CD"],
  components: {
    ConsumeTable,
    CheckDetail,
    GoodDetail,
    CompanyDetail
  },
  data() {
    return {
      checkCode: "",
      goods_CD: "",
      goods_ID:"",
      comp_ID:"",
      tableData: [],
      consumeDialagVisible: false,
      detailVisible: false
    }
  },
  mounted() {
    this.getConsumeData()
  },
  watch: {
    comp_CD: function(newVal) {
      this.getConsumeData()
    }
  },
  computed: {
    getTime() {
      return function(timestamp) {
        return getTime(timestamp)
      }
    }
  },
  methods: {
    getConsumeData() {
      getConsumeData({
        pageNumber: 1,
        pageSize: 8,
        comp_CD: this.comp_CD
      }).then(res => {
        this.tableData = res.consumeList
      })
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
    //设置表头行的样式
    tableHeaderColor() {
      return "background-color: #DBDBDB;"
    },
    jumpMore() {
      this.consumeDialagVisible = true
    },
    getDetail(data) {

    },
    jumpDetail(data) {
      this.detailVisible = true
      this.checkCode = data.check_code
      this.goods_CD = data.goods_CD
      this.goods_ID = data.goods_ID
      this.comp_ID = data.comp_ID
      // this.$store.commit('changeGood', data.goods_CD)
      // this.$store.commit('changeCheckCode', data.check_code)
      // this.$router.push({
      //     path: 'checkCode',
      //     query: {
      //         check_code: data.check_code,
      //         goods_CD: data.goods_CD,
      //         comp_CD: this.$store.state.comp_CD
      //     }
      // })
    },
    changeVisible(data) {
      this.consumeDialagVisible = false
    }
  }
}
</script>

<style lang="scss">
.consume {
  background: #EDEDED;
  .title {
    height: 53px;
    color: #000;
    margin-top: 20px;

    div:nth-child(1) {
      float: left;
      line-height: 53px;
      margin-left: 20px;
    }

    div:nth-child(2) {
      cursor: pointer;
      float: right;
      line-height: 53px;
      margin-right: 12px;

      img {
        vertical-align: middle;
        width: 20px;
        height: 20px;
      }
    }
  }

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

  .jump {
    color: #1795ff;
  }

  .jump:hover {
    cursor: pointer;
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
  /deep/.el-dialog__header {
    padding: 10px 10px 5px;
    height: 44px;
    background: rgba(42, 37, 66, 1);
  }
}
</style>
