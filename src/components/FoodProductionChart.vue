<template>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import jsonData from '../assets/data.json'; // 总产量数据
import growthData from '../assets/data2.json'; // 同比增长数据

export default {
  setup() {
    const chart = ref(null); // 图表容器
    const chartInstance = ref(null); // ECharts 实例
    const selectedYear = ref('2013'); // 默认年份
    const data = ref(jsonData); // 总产量数据
    const growthDataRef = ref(growthData); // 同比增长数据

    const years = Array.from({ length: 2022 - 2013 + 1 }, (_, i) => (2013 + i).toString());
    
    const provinceColorMap = {
      // 省份颜色映射...
      "新疆": "#FDEBAA",   
      "甘肃省": "#FDEBAA",   
      "宁夏": "#FDEBAA",   
      "内蒙古自治区": "#FDEBAA", 

      "黑龙江省": "#EDC3A5", 
      "吉林省": "#EDC3A5",   
      "辽宁省": "#EDC3A5",   

      "广东": "#DBE4FB",   
      "福建": "#DBE4FB",   
      "海南": "#DBE4FB",   

      "北京市": "#ABD1BC",   
      "天津市": "#ABD1BC",   
      "河北省": "#ABD1BC",   
      "山东省": "#ABD1BC",  
      "河南省": "#ABD1BC",   

      "山西省": "#E3BBED",  
      "陕西": "#E3BBED",  

      "西藏": "#CCCC99",   
      "青海": "#CCCC99",   

      "四川省": "#F1F1F1",   
      "重庆市": "#F1F1F1",   

      "云南省": "#BED0F9",   
      "贵州省": "#BED0F9",   
      "广西": "#BED0F9",  

      "江苏省": "#FCB6A5",   
      "上海市": "#FCB6A5",  
      "浙江省": "#FCB6A5",   
      "安徽省": "#FCB6A5",   
      "湖北省": "#FCB6A5",   
      "湖南省": "#FCB6A5",  
      "江西省": "#FCB6A5",   
    };

    const initChart = () => {
      chartInstance.value = echarts.init(chart.value);

      const option = {
        timeline: {
          axisType: 'category',
          orient: 'horizontal',
          autoPlay: false,
          playInterval: 2000,
          data: years,
          label: {
            formatter: '{value} 年',
            color: '#4A90E2', // 标签文字颜色
          },
          bottom: '8%',
          height: '10%',
          width: '80%',
          left: 'center',
          tooltip: { show: false },
          lineStyle: {
            color: '#DBE4FB', // 时间轴主线颜色（淡蓝色）
            width: 6,        
          },
          itemStyle: {
            color: '#BED0F9',    // 时间节点默认颜色（浅蓝色）
          },
          controlStyle: {
            color: '#BED0F9',      // 播放控制按钮颜色
          },
        },
        title: {
          text: '各省粮食产量气泡图',
          subtext: '横轴：粮食总产量，纵轴：人均粮食产量',
          left: 'center',
          top: '3%' 
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => 
            `${params.value[3]}<br/>粮食总产量: ${params.value[0]}万吨<br/>人均粮食产量: ${params.value[2]}万吨`
        },
        xAxis: {
          name: '总产量',
          type: 'value',
          min: 0,
          max: 9000
        },
        yAxis: {
          name: '人均粮食产量',
          type: 'value',
          min: 0,  // 根据实际数据调整
          max: 2500,  // 根据实际数据调整
          axisLabel: {
            formatter: (value) => value.toFixed(2)  // 保留两位小数
          }
        },
        grid: {
          left: '12%', 
          right: '12%',
          top: '18%',
          bottom: '25%'
        },
        series: [{
          name: '粮食产量',
          type: 'scatter',
          symbolSize: (data) => Math.sqrt(data[2]) * 1.2, // 根据人均粮食产量动态调整气泡大小
          data: [], // 初始数据为空
          itemStyle: {
              color: (params) => provinceColorMap[params.data[3]] || "#808080", // 根据省份设置颜色
              borderWidth: 1,  // 设置边框宽度
              borderColor: '#fff' // 可选：设置边框颜色
          }
        }]
      };

      chartInstance.value.setOption(option);
      updateChart(selectedYear.value);

     // 监听图例选择变化事件
     chartInstance.value.on('legendselectchanged', (event) => {
        const selectedProvinces = event.selected;
        const filteredData = chartData.filter(item => selectedProvinces[item[3]]);
        chartInstance.value.setOption({
          series: [{ data: filteredData }]
        });
      });
    };

    const updateChart = (year) => {
      const yearTotalData = data.value[year] || [];
      const yearGrowthData = growthDataRef.value[year] || {};

      // 创建过滤后的 chartData，确保人均粮食产量存在
      const chartData = yearTotalData
        .map(item => {
          const perCapitaYield = item.perCapitaYield;  // 使用人均粮食产量
          const totalYield = item.totalYield;
          const province = item.province;

          return [totalYield, perCapitaYield, perCapitaYield, province];
        });

      // 更新图表数据
      chartInstance.value.setOption({
        series: [{ data: chartData }],
        title: { subtext: `${year} 年各省粮食产量气泡图` }
      });
    };

    onMounted(() => {
      initChart();
      chartInstance.value.on('timelinechanged', (event) => {
        const year = years[event.currentIndex];
        selectedYear.value = year;
        updateChart(year);
      });
    });

    return { chart };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  padding: 0;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
