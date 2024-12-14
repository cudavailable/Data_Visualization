<template>
  <div ref="radarChart" class="radar-chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

export default {
  name: 'RadarChart',
  setup() {
    const radarChart = ref(null);

    onMounted(() => {
      const chartInstance = echarts.init(radarChart.value);

      // 数据
      const mechanizationData = [
        3259.7, 2974.32, 2552.15, 2328.26, 2271.74, 2003.35, 1920.48, 1876.1, 1820.41, 1625.56, 1587.85,
      ];
      const salesData = [
        5912, 5323, 4391, 3226, 2231, 1425, 1075, 632, 429, 330, 212,
      ];

      const option = {
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '农业机械化产值与农产品网络销售额',
          left: 'center',
          top: '5%',
        },
        legend: {
          data: ['农业机械化产值（单位：万亿元）', '农产品网络销售额（单位：万亿元）'],
          top: '85%',
        },
        radar: {
          radius: '65%',
          indicator: [
            { name: '2023', max: 7000 },
            { name: '2022', max: 7000 },
            { name: '2021', max: 7000 },
            { name: '2020', max: 7000 },
            { name: '2019', max: 7000 },
            { name: '2018', max: 7000 },
            { name: '2017', max: 7000 },
            { name: '2016', max: 7000 },
            { name: '2015', max: 7000 },
            { name: '2014', max: 7000 },
            { name: '2013', max: 7000 },
          ],
          shape: 'circle',
        },
        series: [
          {
            name: '农业对比',
            type: 'radar',
            data: [
              {
                value: mechanizationData,
                name: '农业机械化产值（单位：万亿元）',
                lineStyle: {
                  color: '#DBCC57',
                },
                itemStyle: {
                  color: '#DBCC57',
                },
              },
              {
                value: salesData,
                name: '农产品网络销售额（单位：万亿元）',
                lineStyle: {
                  color: '#95BE54',
                },
                itemStyle: {
                  color: '#95BE54',
                },
              },
            ],
          },
        ],
      };

      chartInstance.setOption(option);
    });

    return {
      radarChart,
    };
  },
};
</script>

<style scoped>
.radar-chart {
  width: 90%;
  height: 90%;
}
</style>
