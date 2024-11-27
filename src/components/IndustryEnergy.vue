<template>
	<div ref="chartDom" id="chartDom" style="width: 100%;height: 100%"></div>
</template>

<script>
	import * as echarts from 'echarts';
	
	export default {
	  name: 'IndustryEnergy',
	  mounted() {
	  const myChart = echarts.init(this.$refs.chartDom); 
	myChart.setOption({
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['product','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011', '2012', '2013', '2014', '2015', '2016', '2017'],
          ['煤炭采选业', 211.39,222.19,301.19,436.43,690.42,1162.95,1459.02,1804.58,2399.25,3056.93,3784.66,4907.26,5370.24,5212.57,4684.47,4006.66,3037.68,2648.38],
          ['石油和天然气开采业', 789.41,809.65,814.63,945.99,1112.28,1463.56,1822.23,2225.5,2675.07,2791.48,2927.99,3021.96,3076.51,3820.61,3947.87,3424.93,2330.97,2648.93],
          ['电力、蒸汽、热水生产和供应业', 2744.47,2467.78,2822.82,3803.9,5064.19,6777.83,7605.76,8253.16,9443.68,11789.72,12879.37,12847.89,14552.6,16936.6,19674.07,22591.9,24772.48,24284.99],
          ['石油加工及炼焦业', 172.55,241.99,235.97,322.04,637.91,801.29,939.29,1415.38,1827.51,1839.82,2035.08,2268.48,2500.45,3039.13,3208.49,2538.65,2696.23,2676.77],
          ['煤气生产和供应业投资', 73.66,76.56,87.33,151.64,209.77,274.63,331.49,346.64,420.02,650.65,964.19,1244.43,1604.67,2210.24,2241.59,2331.49,2134.8,2229.78]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
		{
		  type: 'line',
		  smooth: true,
		  seriesLayoutBy: 'row',
		  emphasis: { focus: 'series' }
		},
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }
      ]
    });
    myChart.on('updateAxisPointer', function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
    myChart.setOption(option);
   }
  }


</script>

<style>
</style>