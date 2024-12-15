<template>
  <div class="right_part">
    <h2 class="map-title">旅游指标与GDP</h2>
    <div ref="chartDom" class="chart-container"></div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as echarts from 'echarts';
  
  const chartDom = ref(null);
  let chartInstance = null;
  
  // 年份数据
  const years = [
    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
    '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019',
    '2020', '2021', '2022'
  ];
  
  const domesticTouristData = [
    74400, 78400, 87800, 87000, 110200, 121200, 139400, 161000, 171200, 190200,
    210300, 264100, 295700, 326200, 361100, 399000, 443500, 500100, 553900, 600600, 287900,
    324600, 253000, 489100
  ];
  
  const tourismExpenditureData = [
    3175.54, 3522.37, 3878.36, 3442.27, 4710.71, 5285.86, 6229.7, 7770.6, 10183.7, 12579.77,
    19305.39, 22706.2, 26276.1, 30311.86, 34195.1, 39389.82, 45660.77, 51278.29, 57250.92, 22286.3, 29190.7,
    20444, 49133.1
  ];
  
  const gdpData = [
    100280, 110863, 121717, 137422, 161840, 187319, 209407, 246619, 300670, 335354,
    412119, 487940, 538580, 592963, 641280, 685993, 740061, 820754, 900309, 990865,
    1015986, 1143670, 1204724
  ];
  
  // 将数据转换为河流图所需的格式
  const seriesData = years.flatMap((year, index) => [
    [`${year}`, domesticTouristData[index], '国内旅客'],
    [`${year}`, tourismExpenditureData[index]*10, '国内旅游总花费'],
    [`${year}`, gdpData[index]/2, 'GDP']
  ]);
  
  onMounted(() => {
    chartInstance = echarts.init(chartDom.value);
    
    // 添加窗口大小变化监听
    const handleResize = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };
    
    window.addEventListener('resize', handleResize);
  
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        },
        formatter:function(params) {
          return `2020年，中国乃至全球旅游业遭受了前所未有的打击，
                \n<br>主要原因是新冠疫情的全球大流行。这场疫情导致国内
                \n<br>外旅游活动几乎全面停滞，旅游人数和旅游收入均出现
                \n<br>了大幅下降。根据文化和旅游部的数据，2020年国内旅
                \n<br>游人数同比下降52.1%，旅游收入下降61.1%。各地政府
                \n<br>为了防控疫情，出台了一系列管控政策，包括关闭旅游
                \n<br>景区和暂停旅游企业经营活动，进一步加剧了旅游业的
                \n<br>萎缩。同时，居民出于对健康的担忧和收入减少，出游
                \n<br>意愿明显下降。国际旅游市场也因旅行限制和航班减少
                \n<br>而大幅萎缩。此外，疫情还推动了旅游业内部结构的调
                \n<br>整和数字化转型，如智慧旅游建设成为新趋势。综上所
                \n<br>述，2020年全国旅游业的显著下降是由新冠疫情及其引
                \n<br>发的一系列连锁反应共同作用的结果。`;
        }
      },
      legend: {
        data: ['国内旅客', '国内旅游总花费', 'GDP'],
        left: 40,
        top: 50
      },
      grid: {
        top: 100,
        bottom: 50,
        left: 50,
        right: 50,
        containLabel: true
      },
      singleAxis: {
        top: 50,
        bottom: 50,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },
      series: [
        {
          type: 'themeRiver',
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          data: seriesData,
          itemStyle: {
            color: function(params) {
              const colorList = ['#FFB6C1', '#90EE90', '#ADD8E6']; // 淡粉色, 淡绿色，淡蓝色 
              return colorList[params.dataIndex % colorList.length];
            }
          }
        }
      ]
    };
  
    chartInstance.setOption(option);
  });
  
  onUnmounted(() => {
    // 移除事件监听
    window.removeEventListener('resize', () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    });
    
    if (chartInstance) {
      chartInstance.dispose();
    }
  });
  </script>
  
  <style>
  .right_part {
    width: 80%;
    height: 80vh; /* 使用视口高度 */
    display: flex;
    flex-direction: column;
  }
  
  .map-title {
    height: 40px;
    margin: 10px 0;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
  
  .chart-container {
    flex: 1;
    width: 100%;
    min-height: 600px; /* 增加最小高度 */
    padding: 10px;
    box-sizing: border-box;
    background: rgb(255, 255, 255);
  }
  
  @media screen and (max-width: 768px) {
    .chart-container {
      min-height: 400px; /* 在小屏幕上减小最小高度 */
    }
  }
  </style>