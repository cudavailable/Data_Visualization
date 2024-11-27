<template>
	<div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'; 

export default {
  name: 'IndustryAdded',
  mounted() {
    const myChart = echarts.init(this.$refs.chartDom); 
    myChart.setOption({ 
		title: {
		    text: '工业增加值'
		  },
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'shadow'
		    },
		    formatter: function (params) {
		      let tar;
		      if (params[1] && params[1].value !== '-') {
		        tar = params[1];
		      } else {
		        tar = params[2];
		      }
		      return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
		    }
		  },
		  legend: {
		    data: ['增加', '减少']
		  },
		  grid: {
		    left: '3%',
		    right: '4%',
		    bottom: '3%',
		    containLabel: true
		  },
		  xAxis: {
		    type: 'category',
		    data: (function () {
		      let list = [];
		      for (let i = 1; i <= 11; i++) {
		        list.push(2012 + i);
		      }
		      return list;
		    })()
		  },
		  yAxis: {
		    type: 'value'
		  },
		  series: [
		    {
		      name: 'Placeholder',
		      type: 'bar',
		      stack: 'Total',
		      silent: true,
		      itemStyle: {
		        borderColor: 'transparent',
		        color: 'transparent'
		      },
		      emphasis: {
		        itemStyle: {
		          borderColor: 'transparent',
		          color: 'transparent'
		        }
		      },
		      data: [0, 222333.2,	233197.4,	234968.9,	245406.4,	275119.3,	275119.3,	301089.3,	311858.7,	312902.9,	374545.6,	395043.7,	399103.1]
		    },
		    {
		      name: '增加',
		      type: 'bar',
		      stack: 'Total',
		      label: {
		        show: true,
		        position: 'top'
		      },
		      data: [222333.2, 10864.2,	1771.5,	10437.5,	29712.9,	0,	25970,	10769.4,	1044.2,	61642.7,	20498.1,	4059.4]
		    },
		    {
		      name: '减少',
		      type: 'bar',
		      stack: 'Total',
		      label: {
		        show: true,
		        position: 'bottom'
		      },
		      data: ['-', '-', '-', '-',  '-', '-', '-','-', '-', '-',  '-', '-' ]
		    }
		  ]
	});
  }
}
</script>

<style>
</style>