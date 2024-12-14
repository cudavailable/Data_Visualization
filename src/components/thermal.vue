<template>
<div class = "right_part">
  <h2 class="map-title">旅游指标与GDP</h2>
  <div ref="chartDom" style="width: 100%; height: 458px;" class=myImage></div>
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
  100280, // 2000年
  110863, // 2001年
  121717, // 2002年
  137422, // 2003年
  161840, // 2004年
  187319, // 2005年
  209407, // 2006年
  246619, // 2007年
  300670, // 2008年
  335354, // 2009年
  412119, // 2010年
  487940, // 2011年
  538580, // 2012年
  592963, // 2013年
  641280, // 2014年
  685993, // 2015年
  740061, // 2016年
  820754, // 2017年
  900309, // 2018年
  990865, // 2019年
  1015986, // 2020年
  1143670, // 2021年
  1204724 // 2022年
];

// 将数据转换为河流图所需的格式
const seriesData = years.flatMap((year, index) => [
  [`${year}`, domesticTouristData[index], '国内旅客'],
  [`${year}`, tourismExpenditureData[index]*10, '国内旅游总花费'],
  [`${year}`, gdpData[index]/2, 'GDP']
]);

onMounted(() => {
  chartInstance = echarts.init(chartDom.value);

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
      formatter:function(params)
    {
      return `<br>2020年，中国乃至全球旅游业遭受了前所未有的打击，主要原因是新冠疫情的全球大流行。这场疫情导致国内外旅游活动几乎全面停滞，旅游人数和旅游收入均出现了大幅下降。根据文化和旅游部的数据，2020年国内旅游人数同比下降52.1%，旅游收入下降61.1%。各地政府为了防控疫情，出台了一系列管控政策，包括关闭旅游景区和暂停旅游企业经营活动，进一步加剧了旅游业的萎缩。
      同时，居民出于对健康的担忧和收入减少，出游意愿明显下降。国际旅游市场也因旅行限制和航班减少而大幅萎缩。此外，疫情还推动了旅游业内部结构的调整和数字化转型，如智慧旅游建设成为新趋势。综上所述，2020年全国旅游业的显著下降是由新冠疫情及其引发的一系列连锁反应共同作用的结果。<br>`;
    }
    },
    legend: {
      data: ['国内旅客', '国内旅游总花费', 'GDP'],
      left: 40,
      top: 50
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
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<style>
/* 确保图表容器填满整个组件 */
div {
  width: 100%;
  height: 100%;
}
.map-title {
  height: 5px;
  margin: 20px;
  font-size: 24px; /* 标题字体大小 */
  font-weight: bold;
  color: #333; /* 标题颜色 */
  margin-bottom: 1px; /* 标题与地图之间的距离 */
  text-align: center;
}
.myImage{
  width: 100%;
  height: 100%;
  padding: 0px; /* 给容器增加内边距，让内容不贴近边缘 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}
</style>