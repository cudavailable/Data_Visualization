<template>
	<div class="explain">
		<h3>我国工业资本投入（亿元）</h3>
		<h4>	中国工业在早期面临着资金匮乏的困境。在近代中国，工业基础薄弱，国内资金有限，导致了我国工业发展的滞后。然而随着时间的推移，中国政府和企业逐渐认识到资金对于工业发展的重要性，并采取了一系列措施来解决资金匮乏的问题。如今，我国工业已经完成了从无到有、从弱到强的发展过程。</h4>
	</div>
	<div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
	import * as echarts from 'echarts';
	
	export default {
	  name: 'IndustryCapital',
	  mounted() {
	    const myChart = echarts.init(this.$refs.chartDom); 
	    myChart.setOption({ 
			/*title: {
			    text: '工业资本投入（亿元）'
			  },*/
			  tooltip: {
			    trigger: 'axis',
			    axisPointer: {
			      type: 'cross',
			      label: {
			        backgroundColor: '#6a7985'
			      }
			    }
			  },
			  legend: {
			    data: ['国家', '外商', '集体', '法人', '个人'],
			            selected: { // 设置默认选中的系列
			              '国家': true,
			              '外商': true,
			              '集体': false,
			              '法人': false,
			              '个人': false
			            }
			  },
			  grid: {
			    left: '3%',
			    right: '4%',
			    bottom: '3%',
			    containLabel: true
			  },
			  xAxis: [
			    {
			      type: 'category',
			      boundaryGap: false,
			      data: ['2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
			    }
			  ],
			  yAxis: [
			    {
			      type: 'value',
				  axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
			    }
			  ],
			  series: [
			    {
			      name: '国家',
			      type: 'line',
			      stack: 'Total',
			      areaStyle: {},
			      emphasis: {
			        focus: 'series'
			      },
			      data: [16946.87,15551.84,16933.51,17588.92,22859.27,21321.02,20404.37,22601.38,29227.93,34694.96,39470.22,53076.32,59163.1,63905.79,70659.42,70401.64]
			    },
			    {
			      name: '外商',
			      type: 'line',
			      stack: 'Total',
			      areaStyle: {},
			      emphasis: {
			        focus: 'series'
			      },
			      data: [8671.64,9992.67,11859.4,14516.29,17278.27,18230.53,19656.06,19755.88,20925.05,22153.57,23216.68,22234.05,23977.69,22624.5,22816.81,23130.7]
			    },
			    {
			      name: '集体',
			      type: 'line',
			      stack: 'Total',
			      areaStyle: {},
			      emphasis: {
			        focus: 'series'
			      },
			      data: [1817.48,1550.73,1723.82,1941.29,1890.72,1862.96,1968.22,2080.47,3118.13,3383.92,3360.39,4101.08,3970.2,3716.62,4097.27,3835.93]
			    },
			    {
			      name: '法人',
			      type: 'line',
			      stack: 'Total',
			      areaStyle: {},
			      emphasis: {
			        focus: 'series'
			      },
			      data: [17557.94,20082.72,22978.67,27150.61,33851.08,39146.85,46337.12,53035.07,58093.87,61044.7,67101.55,73321.76,81531.3,82115.33,91367.06,104905.51]
			    },
			    {
			      name: '个人',
			      type: 'line',
			      stack: 'Total',
			      label: {
			        show: true,
			        position: 'top'
			      },
			      areaStyle: {},
			      emphasis: {
			        focus: 'series'
			      },
			      data: [7869.57,9014.01,11042.12,13496.05,18574.12,20503.82,23389.56,36429.18,30627.46,38806.07,42257.57,47459.19,57920.8,49482.81,47817.88,44625.89]
			    }
			  ]
    });
  }
}
</script>

<style>
</style>