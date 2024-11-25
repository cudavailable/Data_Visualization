<template>
    <div ref="chart" style="height: 100%; width: 100%"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import pictorialBarImage from '../assets/pictorialBar-spirit.png'; // 图片路径


  export default {
    name: 'Echarts4',
    props: {
      chartTitle: {
        type: String,
        default: "2019-2023年数字经济占总GDP百分比（数据来源：中国信通院）",
      },
    },
  
    data() {
      return {
        chart: null, // 图表实例
        maxData: 100,
        option: null, // 配置项
      };
    },
  
    mounted() {
      // 初始化图表
      this.chart = echarts.init(this.$refs.chart);
      this.setOption();
      // this.updateDataPeriodically();
    },
  
    beforeDestroy() {
      // 销毁图表实例
      if (this.chart) {
        this.chart.dispose();
      }
    },
  
    methods: {
      setOption() {
        this.option = {
          tooltip: {
            formatter: function (params) {
              return `${params.name}: ${params.value.toFixed(1)}%`;
            }
          },
          title: {
            text: this.chartTitle, // 使用父级传递的标题
            left: "left",
            top: "top",
            textStyle: {
              fontSize: 19,
              fontWeight: "bold",
            },
          },
          xAxis: {
            max: this.maxData,
            splitLine: { show: false },
            offset: 10,
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              margin: 10
            }
          },
          yAxis: {
            data: ['2019', '2020', '2021', '2022', '2023'],
            inverse: true,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
              margin: 10,
              color: '#999',
              fontSize: 16
            }
          },
          grid: {
            top: 'center',
            height: 200,
            left: 70,
            right: 100
          },
          series: [
            {
              // 当前数据
              type: 'pictorialBar',
              symbol: pictorialBarImage,
              symbolRepeat: 'fixed',
              symbolMargin: '5%',
              symbolClip: true,
              symbolSize: 30,
              symbolBoundingData: this.maxData,
              data: [36.2, 38.6, 39.8, 41.5, 42.8],
              markLine: {
                symbol: 'none',
                label: {
                  formatter: function (params) {
                    return 'max: ' + params.value.toFixed(1) + '%';
                  },
                  position: 'start'
                },
                lineStyle: {
                  color: 'green',
                  type: 'dotted',
                  opacity: 0.2,
                  width: 2
                },
                data: [{ type: 'max' }]
              },
              z: 10
            },
            {
              // 完整数据
              type: 'pictorialBar',
              itemStyle: {
                opacity: 0.2
              },
              label: {
                show: true,
                // formatter: function (params) {
                //   return ((params.value / this.maxData) * 100).toFixed(1) + ' %';
                // },
                formatter: function (params) {
                  return params.value.toFixed(1) + '%';
                },

                position: 'right',
                offset: [10, 0],
                color: 'green',
                fontSize: 18
              },
              animationDuration: 0,
              symbolRepeat: 'fixed',
              symbolMargin: '5%',
              symbol: pictorialBarImage,
              symbolSize: 30,
              symbolBoundingData: this.maxData,
              data: [36.2, 38.6, 39.8, 41.5, 42.8],
              z: 5
            }
          ]
        };
  
        // 设置图表配置项
        this.chart.setOption(this.option);
      },
  
      // 定时更新数据
    //   updateDataPeriodically() {
        // const random = () => +(Math.random() * (this.maxData - 10)).toFixed(1);
        // const random = () => +(Math.random() * 100).toFixed(1); 

        // setInterval(() => {
        //   const dynamicData = [random(), random(), random(), random(), random()];
        //   this.chart.setOption({
            // series: [
            //   {
                // data: dynamicData.slice()
            //   },
            //   {
                // data: dynamicData.slice()
            //   }
            // ]
        //   });
        // }, 3000);
    //   }
    }
  };
  </script>
  
  <style scoped>
  /* 可添加样式 */
  </style>
  