<template>
  <div ref="charts" class="charts-view"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    options(val) {
      this.chart.setOption(val);
    }
    // options: {
    //     handler(val){
    //         this.chart.setOption(val)
    //     },
    //     deep: true  // 深度监听比较耗费性能
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.charts, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.charts, this.resize);
    // 销毁并释放内存
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.charts);
      this.chart.setOption(this.options);
    }
  }
};
</script>

<style scoped></style>
