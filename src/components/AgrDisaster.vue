<template>
  <div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'; 

export default {
  name: 'AgrDisaster',
  mounted() {
    const myChart = echarts.init(this.$refs.chartDom); 
    myChart.setOption({ 
         tooltip: {
           trigger: 'axis',
           axisPointer: {
             type: 'cross',
             crossStyle: {
               color: '#999'
             }
           }
         },
         toolbox: {
           feature: {
             dataView: { show: true, readOnly: false },
             magicType: { show: true, type: ['line', 'bar'] },
             restore: { show: true },
             saveAsImage: { show: true }
           }
         },
         legend: {
           data: ['水灾', '旱灾', '风雹', '冷冻', '总受灾面积']
           //，'冷冻'
         },
         xAxis: [
           {
             type: 'category',
             data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
             axisPointer: {
               type: 'shadow'
             }
           }
         ],
         yAxis: [
           {
             type: 'value',
             name: '受灾面积（千公顷）',
             min: 200,
             max: 35000,
             interval: 2500,
             axisLabel: {
               formatter: '{value}'
             }
           },
         ],
         series: [
           {
             name: '水灾',
             type: 'bar',
             tooltip: {
               valueFormatter: function (value) {
                 return value + ' 千公顷';
               }
             },
             data: [7730,8760,4720,5620,8530,5410,3950,6680,7190,4760,3414]
           },
           {
             name: '旱灾',
             type: 'bar',
             tooltip: {
               valueFormatter: function (value) {
                 return value + ' 千公顷';
               }
             },
             data: [9340,14100,12270,10610,9870,9870,7712,7838,5081,3426,6090]
           },
           {
             name: '风雹',
             type: 'bar',
             tooltip: {
               valueFormatter: function (value) {
                 return value + ' 千公顷';
               }
             },
             data: [2781,3387,3225,2918,2908,2268,2407,2228,2765,2712,1528]
           },
           {
             name: '冷冻',
             type: 'bar',
             tooltip: {
               valueFormatter: function (value) {
                 return value + ' 千公顷';
               }
             },
             data: [1618,2320,2133,900,2885,525,3413,586,1052,379,871]
           },
           {
             name: '总受灾面积',
             type: 'line',
             tooltip: {
               valueFormatter: function (value) {
                 return value + ' 千公顷';
               }
             },
             data: [24960,31350,24890,21770,26220,18480,20814,19257,19958,11739,12072]
           }
         ]
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
		  color: #777;
		}
</style>