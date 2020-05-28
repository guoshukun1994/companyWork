<template>
  <div class="ring">
    <ve-ring :data="chartData" :extend="chartExtend" height="274px" :settings="chartSettings"></ve-ring>
    <!-- <div v-else style="line-height:274px;text-align:center;color:#909399;font-size:14px;">暂无数据</div> -->
  </div>
</template>

<script>
import { getRingData } from "../../api/dataShow"
export default {
  name: "ring",
  props: ["comp_CD"],
  data() {
    return {
      chartExtend: {
        legend: {
          left: 60,
          top: 75,
          orient: "vertical",
          textStyle: {
            color: ["#000"]
          }
        },
        title: {
          show: true,
          text: "商品消费占比图",
          padding: [20, 0, 0, 20],
          textStyle: {
            color: ["#000"],
            fontWeight: 400
          }
        },

        series: {
          type: "pie",
          radius: [65, "65%"],
          center: ["70%", "50%"],
          label: {
            show: true,
            formatter: "{d}%"
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 20
          }
        }
      },
      chartSettings: {
        offsetY: 100,
        limitShowNum: 5
      },
      chartData: {
        columns: ["goods_Name", "quantity"],
        rows: []
      }
    }
  },
  watch: {
    comp_CD: function(newVal) {
      this.getRingData()
    }
  },
  mounted() {
    this.getRingData()
  },
  methods: {
    getRingData() {
      getRingData({ comp_CD: this.comp_CD }).then(res => {
        this.chartData.rows = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ring {
  height: 274px;
  width: 100%;
  background: #ededed;

  .title {
    height: 54px;
    line-height: 54px;
    margin-left: 20px;
  }
}
</style>
