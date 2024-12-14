<template>
   <div ref="radarChart" class="radar-chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

export default {
  name: 'AgricultureChart',
  setup() {
    const radarChart = ref(null);

    onMounted(() => {
      const chartInstance = echarts.init(radarChart.value);

     
      const agricultureData = [
        87073.38, 84438.58, 78339.51, 71748.23, 66066.45, 61452.6,
        58059.76, 55659.89, 54205.34, 51851.12, 48342.36, 
      ];
      const populationData = [
        47700, 49100, 49800, 51000, 52600, 54100, 55700, 57300, 60300,
        61900, 63000, 
      ];

      const option = {
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '农业生产总值与农村常住人口',
          left: 'center',
          top: '5%',
        },
        legend: {
          data: ['农业生产总值（单位：万亿元）', '农村常住人口（单位：千万）'],
          top: '85%',
        },
        radar: {
          radius: '65%',
          indicator: [
            { name: '2023', max: 100000 },
            { name: '2022', max: 100000 },
            { name: '2021', max: 100000 },
            { name: '2020', max: 100000 },
            { name: '2019', max: 100000 },
            { name: '2018', max: 100000 },
            { name: '2017', max: 100000 },
            { name: '2016', max: 100000 },
            { name: '2015', max: 100000 },
            { name: '2014', max: 100000 },
            { name: '2013', max: 100000 },
          ],
          shape: 'circle',
        },
        series: [
          {
            name: '农业与人口数据',
            type: 'radar',
            data: [
              {
                value: agricultureData,
                name: '农业生产总值（单位：万亿元）',
                lineStyle: {
                  color: '#DBCC57',
                },
                itemStyle: {
                  color: '#DBCC57',
                },
              },
              {
                value: populationData,
                name: '农村常住人口（单位：千万）',
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
