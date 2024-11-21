<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'Echarts2',
  mounted() {
    var chartDom = this.$refs.chart;  // 使用 Vue 的 ref 获取 DOM
    var myChart = echarts.init(chartDom);

    var option = {
      title: {
        text: '同比增长',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['电子信息制造业增加值', '电信业务收入', '互联网业务收入', '软件业务收入'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2019', '2020', '2021', '2022', '2023'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '电子信息制造业增加值',
          type: 'line',
          stack: 'Total',
          data: [9.3, 7.7, 15.7, 7.6, 3.4],
        },
        {
          name: '电信业务收入',
          type: 'line',
          stack: 'Total',
          data: [0.5, 3.9, 8.1, 8, 6.2],
        },
        {
          name: '互联网业务收入',
          type: 'line',
          stack: 'Total',
          data: [21.4, 12.5, 21.2, -1.1, 6.8],
        },
        {
          name: '软件业务收入',
          type: 'line',
          stack: 'Total',
          data: [16.4, 13.2, 17.1, 12.9, 13.4],
        },
      ],
    };

    myChart.setOption(option);
  }
}
</script>

<style scoped>
/* 自定义样式 */
</style>