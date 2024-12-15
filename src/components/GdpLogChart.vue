<template>
  <div class="chart-container">
    <div ref="chartDom" class="chart"></div>
    
    <!-- 自定义全屏模态框 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ currentEvent?.title }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <div class="modal-body" v-if="currentEvent">
          <div class="event-content">
            <div class="event-image" v-if="currentEvent.imageUrl">
              <img :src="currentEvent.imageUrl" :alt="currentEvent.title">
            </div>
            <div class="event-details">
              <div class="event-description">
                <h4>事件描述</h4>
                <p>{{ currentEvent.fullDesc }}</p>
              </div>
              
              <div class="event-tags">
                <h4>关键标签</h4>
                <div class="tags">
                  <span v-for="(point, index) in currentEvent.keyPoints" 
                        :key="index" 
                        class="tag">
                    {{ point }}
                  </span>
                </div>
              </div>

              <div class="event-impact">
                <h4>历史影响</h4>
                <p>{{ currentEvent.impact }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';
import historicalEvents from '/src/assets/gdp-events.json';

export default {
  name: 'GdpLogChart',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartDom = ref(null);
    const chartInstance = ref(null);
    const showModal = ref(false);
    const currentEvent = ref(null);

    const showEventDetails = (year) => {
      const event = historicalEvents[year];
      if (event) {
        currentEvent.value = event;
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
      currentEvent.value = null;
    };

    const initChart = async () => {
      await nextTick();
      if (!chartDom.value) return;
      if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
        console.warn('无有效数据');
        return;
      }

      const container = chartDom.value;
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        console.warn('容器尺寸为0，等待调整');
        return;
      }

      if (chartInstance.value) {
        chartInstance.value.dispose();
      }

      chartInstance.value = echarts.init(container);
      
      // 计算增长率
      const growthRates = props.data.map((item, index) => {
        if (index === 0) return null;
        const prevValue = props.data[index - 1].value;
        const currentValue = item.value;
        return ((currentValue - prevValue) / prevValue * 100).toFixed(2);
      });

      const option = {
        grid: {
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#fff'
            }
          },
          formatter: function(params) {
            let result = `<div style="font-weight:bold;margin-bottom:5px;">${params[0].name}年</div>`;
            params.forEach(param => {
              const color = param.color;
              const value = param.seriesName === 'GDP增长率' ? 
                `${param.value}%` : 
                param.value.toFixed(2);
              result += `<div style="display:flex;justify-content:space-between;align-items:center;margin:3px 0;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color};margin-right:5px;"></span>
                <span style="flex:1;">${param.seriesName}:</span>
                <span style="font-weight:bold;margin-left:15px;">${value}</span>
              </div>`;
            });
            if (historicalEvents[params[0].name]) {
              result += `<div style="margin-top:5px;padding-top:5px;border-top:1px solid #eee;">
                <span style="color:#ff7675">★ ${historicalEvents[params[0].name].shortDesc}</span>
              </div>`;
            }
            return result;
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.data.map(item => item.year),
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            rotate: 45,
            color: '#fff'
          }
        },
        yAxis: [
          {
            name: 'GDP对数值',
            type: 'value',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              formatter: value => value.toFixed(2),
              color: '#fff'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#ddd'
              }
            }
          },
          {
            name: '增长率(%)',
            type: 'value',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#91cc75'
              }
            },
            axisLabel: {
              formatter: value => `${value}%`,
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'GDP对数值',
            type: 'line',
            data: props.data.map(item => ({
              value: item.value,
              itemStyle: {
                color: historicalEvents[item.year] ? '#ff7675' : '#5470c6',
                borderWidth: historicalEvents[item.year] ? 3 : 2,
                borderColor: '#fff'
              },
              symbolSize: historicalEvents[item.year] ? 12 : 8
            })),
            smooth: true,
            lineStyle: {
              width: 3
            }
          },
          {
            name: 'GDP增长率',
            type: 'line',
            yAxisIndex: 1,
            data: growthRates,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#fff',
              borderWidth: 2,
              borderColor: '#fff'
            },
            lineStyle: {
              width: 2,
              type: 'dashed'
            }
          }
        ]
      };

      try {
        chartInstance.value.setOption(option);
        chartInstance.value.on('click', (params) => {
          if (params.componentType === 'series') {
            showEventDetails(params.name);
          }
        });
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
      showModal,
      currentEvent,
      closeModal
    };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
  position: relative;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 80%;
  min-width: 600px;
  min-height: 400px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  position: relative;
  animation: slideIn 0.3s ease;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

.event-content {
  display: flex;
  gap: 40px;
}

.event-image {
  flex: 0 0 400px;
}

.event-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.event-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.event-details h4 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #333;
}

.event-description p {
  line-height: 1.8;
  color: #666;
  font-size: 16px;
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #e0e0e0;
}

.event-impact p {
  line-height: 1.8;
  color: #666;
  font-size: 15px;
  margin: 0;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

</style>