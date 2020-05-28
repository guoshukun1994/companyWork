<template>
  <div class="count">
    <el-row :gutter="40">
      <el-col :span="4">
        <div class="warp">
          <img class="countImg" src="../../assets/good.png" />
          <p>
            商品标签数量
            <span>{{ count.tagCount }}</span>
            <span>个</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="warp">
          <img class="countImg" src="../../assets/label.png" />
          <p>
            标签消耗数量
            <span>{{ count.consumeCount }}</span>
            <span>个</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="warp">
          <img class="countImg" src="../../assets/sale.png" />
          <p>
            在售商品
            <span>{{ count.goodsCount }}</span>
            <span>品规</span>
          </p>
        </div>
      </el-col>
      <!-- <div style=""></div> -->
      <el-col :span="4" style="margin-left:-8px">
        <div class="warp">
          <img class="countImg" src="../../assets/scan.png" />
          <p>
            扫码验证次数
            <span>{{ count.sweepCount }}</span>
            <span>次</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="warp">
          <img class="countImg" src="../../assets/consume.png" />
          <p>
            消费失败
            <span>{{ count.failCount }}</span>
            <span>次</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="warp">
          <img class="countImg" src="../../assets/company.png" />
          <p>
            平台企业
            <span>{{ count.companyCount }}</span>
            <span>家</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getLabelData } from "../../api/dataShow"
export default {
  name: "Count",
  props: ["comp_CD"],
  data() {
    return {
      count: {
        companyCount: "",
        consumeCount: "",
        failCount: "",
        goodsCount: "",
        sweepCount: "",
        tagCount: ""
      }
    }
  },
  watch: {
    comp_CD: function(newVal) {
      this.getLabelData()
    }
  },
  mounted() {
    this.getLabelData()
  },
  methods: {
    getLabelData() {
      getLabelData({ comp_CD: this.comp_CD }).then(res => {
        this.count = res

        // this.chartData.rows = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.count {
  margin-top: 20px;
  // padding: 20px;
  width: 100%;
  .warp {
    height: 120px;
    padding: 16px 0;
    background: #ededed;
    text-align: center;
    color: #000;
    font-size: 12px;
    width: 250px;

    .countImg {
      height: 48px;
      width: 48px;
    }

    p {
      margin-top: 14px;

      span:nth-child(1) {
        color: #ff7f24;
        font-size: 17px;
      }

      span:nth-child(2) {
        color: #33ccff;
      }
    }
  }
}
</style>
