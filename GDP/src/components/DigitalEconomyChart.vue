
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
    legendData: {
      type: Array,
      required: true, // 确保传入图例数据
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
        title: {
          text: "2020年—2023年工业互联网平台数量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.legendData, // 使用传入的 legendData
          bottom: 0, // 图例位置，可选 "top" | "bottom" | "left" | "right"
        },
        xAxis: {
          type: 'category',
          data: this.categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: this.legendData[0], // 使用 legendData 的第一个值
            data: this.chartData,
            type: 'bar',
            label: {
              show: true, // 开启标签显示
              position: "top", // 标签位置：柱形顶部
              formatter: "{c}", // 标签内容：{c}表示数据值
            },
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
  