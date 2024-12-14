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
      const disasterAreaData = [
        12071.7, 11739.2, 19256.9, 20814.3, 18478.1, 21769.8, 24890.7, 31350, 32470, 37430, 47210, 
      ];
      const grainYieldData = [
        68652.77, 68284.75, 66949.15, 66384.34, 65789.22, 61222.62, 58849.33, 55911.31, 53940.86, 50413.85, 49804.23, 
      ];

      const option = {
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '农业受灾面积与粮食产量',
          left: 'center',
          top: '5%',
        },
        legend: {
          data: ['农业受灾面积（单位：公顷）', '粮食产量（单位：万吨）'],
          top: '85%',
        },
        radar: {
          radius: '65%',
          indicator: [
          { name: '2023', max: 90000, min: 10000 },
          { name: '2022', max: 90000, min: 10000 },
          { name: '2021', max: 90000, min: 10000 },
          { name: '2020', max: 90000, min: 10000 },
          { name: '2019', max: 90000, min: 10000 },
          { name: '2018', max: 90000, min: 10000 },
          { name: '2017', max: 90000, min: 10000 },
          { name: '2016', max: 90000, min: 10000 },
          { name: '2015', max: 90000, min: 10000 },
          { name: '2014', max: 90000, min: 10000 },
          { name: '2013', max: 90000, min: 10000 },
                ],
          shape: 'circle',
        },
        series: [
          {
            name: '农业对比',
            type: 'radar',
            data: [
              {
                value: disasterAreaData,
                name: '农业受灾面积（单位：公顷）',
                lineStyle: {
                  color: '#DBCC57',
                },
                itemStyle: {
                  color: '#DBCC57',
                },
              },
              {
                value: grainYieldData,
                name: '粮食产量（单位：万吨）',
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
