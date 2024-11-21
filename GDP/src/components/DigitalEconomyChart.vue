
<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
  name: 'EChartsBar',
  props: {
    chartData: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);

      const option = {
        xAxis: {
          type: 'category',
          data: this.categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.chartData,
            type: 'bar',
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
/* 自定义样式 */
</style>
  