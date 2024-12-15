<template>
  <div class="chart-container">
    <div ref="chartDom" class="chart"></div>
    <div class="chart-buttons">
      <button @click="showModal('total')" class="info-button" style="top: 6%; left: 8%">?</button>
      <button @click="showModal('young')" class="info-button" style="top: 6%; right: 43%">?</button>
      <button @click="showModal('working')" class="info-button" style="bottom: 52%; left: 8%">?</button>
      <button @click="showModal('elderly')" class="info-button" style="bottom: 52%; right: 43%">?</button>
    </div>

    <!-- 模态框 -->
    <div v-if="showModalFlag" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ currentInfo.title }}</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="info-image" v-if="currentInfo.imageUrl">
          <img :src="currentInfo.imageUrl" :alt="currentInfo.title">
        </div>
        <div class="info-text">
          <p>{{ currentInfo.description }}</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'PopulationGdpChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartDom = ref(null);
    const chartInstance = ref(null);
    const showModalFlag = ref(false);
    const currentInfo = ref({});

    const chartInfo = {
  total: {
    title: '总人口与GDP关系分析',
    imageUrl: '/src/assets/images/total-population.png',
    description: '从趋势可以看出，随着GDP的增长，人口总量也在稳步增加，但增长速度有所放缓。这反映了我国人口发展与经济增长的协同关系。具体来看，GDP呈现出明显的上升趋势，而人口增长曲线则相对平缓，说明经济增长速度快于人口增长速度。这种态势表明我国已经从人口红利驱动型增长逐步转向更依赖技术进步和效率提升的发展模式。'
  },
  young: {
    title: '0-14岁人口与GDP关系分析',
    imageUrl: '/src/assets/images/young-population.png',
    description: '近年来，尽管GDP持续增长，但0-14岁人口比例呈现明显的下降趋势，这与我国计划生育政策和人口结构转型密切相关。从图中可以观察到，少年儿童人口在GDP快速增长的同时却持续下降，从早期的3.5亿左右降至现在的2.5亿左右。这种趋势反映出我国面临着人口年轻化不足的挑战，可能会影响未来的劳动力供给和社会发展活力。'
  },
  working: {
    title: '劳动年龄人口与GDP关系分析',
    imageUrl: '/src/assets/images/working-population.png',
    description: '劳动力人口的变化与GDP增长之间存在较强的正相关关系，反映了人口红利对经济发展的重要影响。从具体数据来看，劳动年龄人口从6亿左右增长到接近10亿，与GDP的增长轨迹较为吻合。但近年来，劳动年龄人口增长趋于平缓，甚至出现轻微下降，这表明我国人口红利正在逐渐消退，需要通过提高劳动生产率和发展高新技术产业来维持经济增长。'
  },
  elderly: {
    title: '老年人口与GDP关系分析',
    imageUrl: '/src/assets/images/elderly-population.png',
    description: '随着GDP的增长，老年人口比例显著上升，表明我国人口老龄化程度不断加深，这对未来的经济发展和社会保障体系提出了新的挑战。从趋势看，老年人口从不到1亿快速增长到超过2亿，增长速度明显快于GDP增长速度。这种快速老龄化的趋势预示着我国需要加快发展养老产业、完善社会保障体系，并通过科技创新和产业升级来应对劳动力结构变化带来的挑战。'
  }
};

    const showModal = (type) => {
      currentInfo.value = chartInfo[type];
      showModalFlag.value = true;
    };

    const closeModal = () => {
      showModalFlag.value = false;
    };

    const initChart = async () => {
      await nextTick();
      if (!chartDom.value) return;
      
      const container = chartDom.value;
      if (chartInstance.value) {
        chartInstance.value.dispose();
      }

      chartInstance.value = echarts.init(container);
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            return params[0].axisValue + '年<br/>' +
                   params.map(param => {
                     return param.seriesName + ': ' + 
                            (param.seriesName.includes('GDP') ? 
                             param.value : (param.value).toFixed(2) + '亿');
                   }).join('<br/>');
          }
        },
        grid: [
          { left: '10%', top: '10%', width: '32%', height: '25%', containLabel: true },
          { right: '10%', top: '10%', width: '32%', height: '25%', containLabel: true },
          { left: '10%', bottom: '25%', width: '32%', height: '25%', containLabel: true },
          { right: '10%', bottom: '25%', width: '32%', height: '25%', containLabel: true }
        ],
        xAxis: [
          { gridIndex: 0, type: 'category', show: false, data: props.data.map(item => item.year), boundaryGap: false },
          { gridIndex: 1, type: 'category', show: false, data: props.data.map(item => item.year), boundaryGap: false },
          { gridIndex: 2, type: 'category', show: false, data: props.data.map(item => item.year), boundaryGap: false },
          { gridIndex: 3, type: 'category', show: false, data: props.data.map(item => item.year), boundaryGap: false }
        ],
        yAxis: [
          { 
            gridIndex: 0, 
            type: 'value', 
            name: '总人口(亿)',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 50,
            position: 'left',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color:"#fff"
            },
            splitLine: { show: true, lineStyle: { type: 'dashed' } }
          },
          { 
            gridIndex: 0, 
            type: 'value', 
            name: 'GDP对数值',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 45,
            position: 'right',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: false }
          },
          { 
            gridIndex: 1, 
            type: 'value', 
            name: '0-14岁人口(亿)',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 50,
            position: 'left',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: true, lineStyle: { type: 'dashed' } }
          },
          { 
            gridIndex: 1, 
            type: 'value', 
            name: 'GDP对数值',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 45,
            position: 'right',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: false }
          },
          { 
            gridIndex: 2, 
            type: 'value', 
            name: '15-64岁人口(亿)',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 50,
            position: 'left',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: true, lineStyle: { type: 'dashed' } }
          },
          { 
            gridIndex: 2, 
            type: 'value', 
            name: 'GDP对数值',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 45,
            position: 'right',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: false }
          },
          { 
            gridIndex: 3, 
            type: 'value', 
            name: '65岁以上人口(亿)',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 50,
            position: 'left',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: true, lineStyle: { type: 'dashed' } }
          },
          { 
            gridIndex: 3, 
            type: 'value', 
            name: 'GDP对数值',
            nameTextStyle: {
              color: '#ffffff'  // 添加这行，设置坐标轴名称颜色为白色
            },
            nameLocation: 'middle',
            nameGap: 45,
            position: 'right',
            axisLabel: { 
              formatter: '{value}',
              margin: 8,
              color: '#fff'
            },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '总人口',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: props.data.map(item => item.population / 10000),
            symbolSize: 2,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#FF6B6B' },
            lineStyle: { width: 2 }
          },
          {
            name: 'GDP对数值',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: props.data.map(item => item.gdp),
            symbolSize: 1,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#4ECB71' },
            lineStyle: { width: 2 }
          },
          {
            name: '0-14岁人口',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: props.data.map(item => item.youngPop / 10000),
            symbolSize: 2,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#FFA94D' },
            lineStyle: { width: 2 }
          },
          {
            name: 'GDP对数值',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 3,
            data: props.data.map(item => item.gdp),
            symbolSize: 1,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#4ECB71' },
            lineStyle: { width: 2 }
          },
          {
            name: '15-64岁人口',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 4,
            data: props.data.map(item => item.workingPop / 10000),
            symbolSize: 2,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#339AF0' },
            lineStyle: { width: 2 }
          },
          {
            name: 'GDP对数值',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 5,
            data: props.data.map(item => item.gdp),
            symbolSize: 1,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#4ECB71' },
            lineStyle: { width: 2 }
          },
          {
            name: '65岁以上人口',
            type: 'line',
            xAxisIndex: 3,
            yAxisIndex: 6,
            data: props.data.map(item => item.elderlyPop / 10000),
            symbolSize: 2,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#845EF7' },
            lineStyle: { width: 2 }
          },
          {
            name: 'GDP对数值',
            type: 'line',
            xAxisIndex: 3,
            yAxisIndex: 7,
            data: props.data.map(item => item.gdp),
            symbolSize: 1,
            symbol: 'circle',
            showSymbol: true,
            showAllSymbol: true,
            itemStyle: { color: '#4ECB71' },
            lineStyle: { width: 2 }
          }
        ]
      };

      try {
        chartInstance.value.setOption(option);
      } catch (error) {
        console.error('设置图表选项时出错:', error);
      }
    };

    const handleResize = () => {
      if (chartInstance.value) {
        chartInstance.value.resize();
      }
    };

    watch(() => props.data, async (newData) => {
      if (newData && newData.length) {
        await initChart();
      }
    }, { deep: true });

    onMounted(async () => {
      window.addEventListener('resize', handleResize);
      await initChart();
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.value) {
        chartInstance.value.dispose();
      }
    });

    return {
      chartDom,
      showModalFlag,
      currentInfo,
      showModal,
      closeModal
    };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
  min-width: 800px;
  min-height: 0px;
}

.info-button {
position: absolute;
width: 24px;
height: 24px;
border-radius: 50%;
background: #4ECB71;
color: white;
border: none;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
z-index: 10;
transition: background-color 0.3s;

min-width: 24px;
min-height: 24px;
max-width: 24px;
max-height: 24px;
padding: 0;
box-sizing: border-box;
flex-shrink: 0;
flex-grow: 0;
}

.info-button:hover {
  background: #3da55d;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  position: relative;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  width: 100%;
  text-align: left;
  position: absolute;
  left: 0;
  padding: 0 40px; /* 为关闭按钮留出空间 */
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #666;
}

.modal-body {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 25px; /* 增加图片和文字之间的间距 */
}

.info-image {
  margin: 0;
  text-align: center;
}

.info-image img {
  width: auto;
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
}

.info-text {
  line-height: 1.8;
  color: #333;
  font-size: 16px;
  text-align: justify;
  padding: 0 10px;
}

@media screen and (max-width: 768px) {
  .modal-header h3 {
    font-size: 18px;
  }
  
  .modal-body {
    padding: 20px 15px;
    gap: 20px;
  }
  
  .info-text {
    font-size: 14px;
    line-height: 1.6;
  }
}
</style>