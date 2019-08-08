<template>
  <div class="analysis-view">
    <e-charts :options="options" style="height: 400px"></e-charts>
  </div>
</template>

<script>
import ECharts from "../../components/ECharts";
import axios from "axios";
// import random from "lodash/random";

export default {
  name: "analysis",
  components: {
    ECharts
  },
  data() {
    return {
      options: {}
    };
  },
  mounted() {
    // this.interval = setInterval(() => {
    //     this.options.series[0].data = this.options.series[0].data.map(() =>
    //         random(100)
    //     );
    //     this.options = {...this.options}; // 赋值新的对象实现数据更新监听
    // }, 3000);
    this.getChartsData();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getChartsData() {
      axios.get("/api/dashboard/chart", { params: { ID: 12345 } }).then(res => {
        this.options = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data
            }
          ]
        };
      });
    }
  }
};
</script>

<style scoped></style>
