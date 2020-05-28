<template>
  <div class="lineChart" style="position:relative">
    <!-- <div class="title">企业产品消费趋势图</div> -->
    <ve-line height="274px" :data="chartData" :extend="chartExtend" style />
  </div>
</template>

<script>
import { getLineData } from "../../api/dataShow"
export default {
  name: "LineChart",
  props: ["comp_CD"],
  data: function() {
    return {
      chartData: {
        columns: ["month", "count"],
        rows: []
      },
      chartExtend: {
        grid: [{ x: "8%", y: "25%", width: "80%", height: "70%" }],
        textStyle: {
          color: ["#000"]
        },
        legend: {
          show: false
        },
        title: {
          show: true,
          text: "企业产品消费趋势图",
          padding: [20, 0, 0, 20],
          textStyle: {
            color: ["#000"],

            fontWeight: 400
          }
        },
        series: {
          type: "line",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(90, 177, 239)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(25, 212, 174)" // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      }
    }
  },
  watch: {
    comp_CD: function(newVal) {
      this.getLineData()
    }
  },
  mounted() {
    this.getLineData()
  },
  methods: {
    getLineData() {
      getLineData({ comp_CD: this.comp_CD }).then(res => {
        this.chartData.rows = res.reverse()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lineChart {
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
