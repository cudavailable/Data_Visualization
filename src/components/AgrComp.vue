<template>
  <div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'; 

export default {
  name: 'AgrComp',
  mounted() {
    const myChart = echarts.init(this.$refs.chartDom); 
    myChart.setOption({ 
      title: [
        {
          text: '第一产业占比（亿元）'
        }
      ],
      polar: {
        radius: [30, '80%']
      },
      angleAxis: {
        max: 100000,
        startAngle: 75
      },
      radiusAxis: {
        type: 'category',
        data: ['林业', '牧业', '渔业', '农业']
      },
      tooltip: {},
      series: {
        type: 'bar',
        data: [6820.83, 15467.98, 40652.36, 84438.58],
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}: {c}'
        }
      }
    });
  }
}
</script>

<style>
.chartDom{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 20px;
	  font-size: 18px;
	  color: #333;
	}
</style>