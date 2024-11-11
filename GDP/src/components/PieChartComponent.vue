<template>
  <div id="pie-chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'PieChartComponent',
  props: {
    data: {
      type: Array,
      default: () => [
        { value: 30, name: '第一产业' },
        { value: 40, name: '第二产业' },
        { value: 30, name: '第三产业' },
      ],
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(document.getElementById('pie-chart'));
      const option = {
        title: { text: 'GDP 产业结构', subtext: '全国或某省份', left: 'center' },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.data.map((item) => item.name),
        },
        series: [
          {
            name: 'GDP 产业结构',
            type: 'pie',
            radius: ['40%', '70%'],
            data: this.data,
          },
        ],
      };
      chart.setOption(option);
    },
  },
  watch: {
    data() {
      this.initChart(); // 监测 data 变化后重新绘制图表
    },
  },
};
</script>

<style scoped>
#pie-chart {
  width: 100%;
  height: 100%;
}
</style>
