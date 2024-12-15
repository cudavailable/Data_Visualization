<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <div :class="['pie-chart', { 'with-data': showExtraData }]" ref="pieChartDom"></div>
      <div v-if="showExtraData" class="data-display">
        <div class="data-item">
          <div class="data-title">人均GDP</div>
          <div class="data-value">{{ formatNumber(currentData.perCapita) }}元</div>
        </div>
        <div class="data-item">
          <div class="data-title">第一产业增加值(亿元)</div>
          <div class="data-value">{{ currentData.primary?.toFixed(2) }}</div>
        </div>
        <div class="data-item">
          <div class="data-title">第二产业增加值(亿元)</div>
          <div class="data-value">{{ currentData.secondary?.toFixed(2) }}</div>
        </div>
        <div class="data-item">
          <div class="data-title">第三产业增加值(亿元)</div>
          <div class="data-value">{{ currentData.tertiary?.toFixed(2) }}</div>
        </div>
      </div>
    </div>
    <div class="control-panel">
      <button @click="startAnimation" v-if="!isPlaying" :disabled="!canPlay">
        开始播放
      </button>
      <button @click="stopAnimation" v-else>
        停止播放
      </button>
      <div class="year-control">
        <input 
          type="text" 
          v-model="inputYear" 
          @keyup.enter="jumpToYear"
          class="year-input"
          :placeholder="currentYear"
        >
        <button class="jump-button" @click="jumpToYear">跳转</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'IndustryStructureChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const pieChartDom = ref(null);
    const chartInstance = ref(null);
    const currentYearIndex = ref(0);
    const isPlaying = ref(false);
    const animationTimer = ref(null);
    const currentYear = ref('');
    const canPlay = ref(false);
    const showExtraData = ref(false);
    const currentData = ref({});

    const inputYear = ref('');

    const jumpToYear = () => {
      if (!inputYear.value) return;
      
      const targetIndex = props.data.findIndex(item => item.year === inputYear.value);
      if (targetIndex !== -1) {
        stopAnimation();
        currentYearIndex.value = targetIndex;
        currentYear.value = props.data[targetIndex].year;
        updateChart(props.data[targetIndex]);
        inputYear.value = ''; // 清空输入框
      } else {
        alert('未找到该年份的数据');
      }
    };

    const formatNumber = (num) => {
      return num?.toLocaleString('zh-CN');
    };

    const updateChart = (yearData) => {
      if (!chartInstance.value || !yearData) return;
      
      showExtraData.value = parseInt(yearData.year) >= 1978;
      currentData.value = yearData;
      currentYear.value = yearData.year; 

      const option = {
        title: {
          text: '三大产业结构',
          left: showExtraData.value ? '25%' : '50%',
          top: 5,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: 'rgba(255, 255, 255, 0.95)' 
            
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}亿元 ({d}%)',
          textStyle: {
            fontSize: 12
          }
        },
        legend: {
          orient: 'horizontal',
          bottom: 5,
          left: showExtraData.value ? '15%' : '50%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10,
            color: 'rgba(255, 255, 255, 0.9)' 
          }
        },
        series: [
          {
            name: '产业结构',
            type: 'pie',
            radius: ['20%', '55%'],
            center: showExtraData.value ? ['30%', '50%'] : ['50%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 6,
              borderColor: '#fff',
              borderWidth: 1,
              color:"white"
            },
            label: {
              show: true,
              formatter: '{b}\n{d}%',
              fontSize: 10,
              position: 'outside'
            },
            labelLine: {
              length: 10,
              length2: 10
            },
            emphasis: {
              label: {
                fontSize: 12,
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              }
            },
            data: [
              { 
                value: yearData.primary, 
                name: '第一产业',
                itemStyle: { color: '#5470c6' }
              },
              { 
                value: yearData.secondary, 
                name: '第二产业',
                itemStyle: { color: '#91cc75' }
              },
              { 
                value: yearData.tertiary, 
                name: '第三产业',
                itemStyle: { color: '#fac858' }
              }
            ]
          }
        ],
        animation: true,
        animationDuration: 800,
        animationEasing: 'cubicInOut'
      };

      chartInstance.value.setOption(option);
    };

    const initChart = () => {
      if (pieChartDom.value && !chartInstance.value) {
        chartInstance.value = echarts.init(pieChartDom.value);
        if (props.data && props.data.length > 0) {
          currentYear.value = props.data[0].year;
          updateChart(props.data[0]);
          canPlay.value = true;
        }
      }
    };

    const startAnimation = () => {
      if (!props.data || props.data.length === 0) return;
      
      isPlaying.value = true;
      animationTimer.value = setInterval(() => {
        currentYearIndex.value = (currentYearIndex.value + 1) % props.data.length;
        currentYear.value = props.data[currentYearIndex.value].year;
        updateChart(props.data[currentYearIndex.value]);
      }, 300);
    };

    const stopAnimation = () => {
      isPlaying.value = false;
      if (animationTimer.value) {
        clearInterval(animationTimer.value);
        animationTimer.value = null;
      }
    };

    const handleResize = () => {
      if (chartInstance.value) {
        chartInstance.value.resize();
      }
    };

    watch(() => props.data, (newData) => {
      if (newData && newData.length > 0) {
        currentYear.value = newData[0].year;
        canPlay.value = true;
        if (chartInstance.value) {
          updateChart(newData[0]);
        }
      }
    }, { immediate: true });

    onMounted(() => {
      window.addEventListener('resize', handleResize);
      nextTick(() => {
        initChart();
      });
    });

    onUnmounted(() => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      if (chartInstance.value) {
        chartInstance.value.dispose();
      }
    });

    return {
      inputYear,
      jumpToYear,
      pieChartDom,
      currentYear,
      isPlaying,
      canPlay,
      showExtraData,
      currentData,
      formatNumber,
      startAnimation,
      stopAnimation
    };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-width: 600px;
  padding: 10px;
}

.chart-wrapper {
  height: 300px;
  display: flex;
  position: relative;
  width: 100%;
}

.pie-chart {
  width: 100%;
  height: 100%;
  transition: width 0.3s ease;
  min-width: 0;
}

.pie-chart.with-data {
  width: 60%;
}

.data-display {
  width: 30%;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  margin-left: -50px; 
}

.data-item {
  text-align: center;
  padding: 6px;
  background: #1c9e66;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  right: 100px;
}

.data-title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);  
  margin-bottom: 2px;
}

.data-value {
  font-size: 14px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.95);  
}

.control-panel {
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 5px;
  margin-top: 5px;
}

.control-panel button {
  padding: 4px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  background: #4ECB71;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.control-panel button:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.control-panel button:not(:disabled):hover {
  background: #3da55d;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.year-display {
  font-size: 12px;
  min-width: 50px;
  padding: 3px 6px;
  background: #f5f5f5;
  border-radius: 3px;
  text-align: center;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}
.year-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.year-input {
  color: rgba(255, 255, 255, 0.95);  
  background: rgba(255, 255, 255, 0.1);  
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.year-input::placeholder {
  color: rgba(255, 255, 255, 0.5);  
}

.year-input::placeholder {
  color: #909399;
}

.jump-button {
  padding: 4px 8px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  background: #4ECB71;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.jump-button:hover {
  background: #3da55d;
}


</style>