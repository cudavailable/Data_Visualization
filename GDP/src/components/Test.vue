<template>  
    <div ref="chart" style="width: 600px; height: 400px;"></div>  
  </template>  
   
  <script>  
  import * as echarts from 'echarts';  
   
  export default {  
    name: 'Chart',  
    mounted() {  
      this.initChart();  
    },  
    methods: {  
      initChart() {  
        // 基于准备好的dom，初始化echarts实例  
        const chart = echarts.init(this.$refs.chart);  
   
        // 指定图表的配置项和数据  
        const option = {  
          title: {  
            text: 'ECharts 入门示例'  
          },  
          tooltip: {},  
          xAxis: {  
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']  
          },  
          yAxis: {},  
          series: [{  
            name: '销量',  
            type: 'bar',  
            data: [5, 20, 36, 10, 10, 20]  
          }]  
        };  
   
        // 使用刚指定的配置项和数据显示图表。  
        chart.setOption(option);  
      }  
    }  
  };  
  </script>  
   
  <style scoped>  
  /* 你可以在这里添加组件的样式 */  
  </style>