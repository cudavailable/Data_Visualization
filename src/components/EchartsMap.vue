<template>
  <div ref="echartsContainer" style="width: 100%; height: 100%;"></div>
  
  <!-- 省份详情模态框 -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ selectedProvince }}</h3>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body" v-if="selectedProvinceInfo">
        <div class="province-info">
          <img 
            :src="selectedProvinceInfo.image" 
            class="province-image"
            :alt="selectedProvince"
          />
          <div class="info-content">
            <p class="description">{{ selectedProvinceInfo.description }}</p>
            
            <div class="key-points">
              <h4>主要特点</h4>
              <div class="tags">
                <span v-for="point in selectedProvinceInfo.keyPoints" 
                      :key="point" 
                      class="tag">
                  {{ point }}
                </span>
              </div>
            </div>

            <div class="industries">
              <h4>支柱产业</h4>
              <div class="industry-list">
                {{ selectedProvinceInfo.economy.pillarIndustries.join(' | ') }}
              </div>
            </div>

            <div class="statistics">
              <div class="stat-item">
                <span class="label">人口</span>
                <span class="value">{{ selectedProvinceInfo.statistics.population }}</span>
              </div>
              <div class="stat-item">
                <span class="label">面积</span>
                <span class="value">{{ selectedProvinceInfo.statistics.area }}</span>
              </div>
              <div class="stat-item">
                <span class="label">GDP</span>
                <span class="value">{{ selectedProvinceInfo.statistics.gdp }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import provinceInfo from "/src/assets/provinceInfo.json";

// 定义省份数据配置
const PROVINCE_DATA = {
  '北京市': { gdp: 43161.1 / 2200, population: 2200 },
  '天津市': { gdp: 16219.1 / 1380, population: 1380 },
  '河北省': { gdp: 40391.4 / 7600, population: 7600 },
  '山西省': { gdp: 21237.4 / 3500, population: 3500 },
  '内蒙古自治区': { gdp: 19865.3 / 2400, population: 2400 },
  '辽宁省': { gdp: 28975.8 / 4200, population: 4200 },
  '吉林省': { gdp: 12311.3 / 2400, population: 2400 },
  '黑龙江省': { gdp: 13698.2 / 3100, population: 3100 },
  '上海市': { gdp: 44652.8 / 2500, population: 2500 },
  '江苏省': { gdp: 122875.3 / 8500, population: 8500 },
  '浙江省': { gdp: 80209.6 / 6500, population: 6500 },
  '安徽省': { gdp: 45581.6 / 6100, population: 6100 },
  '福建省': { gdp: 53146.2 / 4100, population: 4100 },
  '江西省': { gdp: 31985.3 / 4600, population: 4600 },
  '山东省': { gdp: 83194.9 / 10100, population: 10100 },
  '河南省': { gdp: 58902.6 / 9900, population: 9900 },
  '湖北省': { gdp: 53799.7 / 5800, population: 5800 },
  '湖南省': { gdp: 47449.2 / 6600, population: 6600 },
  '广东省': { gdp: 129157.3 / 12600, population: 12600 },
  '广西壮族自治区': { gdp: 25235.7 / 5000, population: 5000 },
  '海南省': { gdp: 6818.6 / 1000, population: 1000 },
  '重庆市': { gdp: 29129 / 3200, population: 3200 },
  '四川省': { gdp: 59812.7 / 8300, population: 8300 },
  '贵州省': { gdp: 19941.2 / 3800, population: 3800 },
  '云南省': { gdp: 28723.5 / 4800, population: 4800 },
  '西藏自治区': { gdp: 2413.6 / 380, population: 380 },
  '陕西省': { gdp: 32415.9 / 3900, population: 3900 },
  '甘肃省': { gdp: 10243.5 / 2500, population: 2500 },
  '青海省': { gdp: 3611.2 / 600, population: 600 },
  '宁夏回族自治区': { gdp: 4515.7 / 700, population: 700 },
  '新疆维吾尔自治区': { gdp: 15915.2 / 2600, population: 2600 },
  '香港特别行政区': { gdp: 29757.1 / 740, population: 740 },
  '澳门特别行政区': { gdp: 2073.7 / 68, population: 68 },
  '台湾省': { gdp: 61905 / 2350, population: 2350 }
};

export default {
  name: "EchartsMap",
  props: {
    data: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      default: "#ef632b",
    }
  },
  data() {
    return {
      chart: null,
      mapName: "selectedProvince",
      isChartInitialized: false,
      provinceInfo: provinceInfo,
      showModal: false,
      selectedProvince: ''
    };
  },
  computed: {
    selectedProvinceInfo() {
      return this.provinceInfo[this.selectedProvince] || null;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.data) {
        this.initChart();
      }
    });
  },
  watch: {
    data: {
      handler(newVal) {
        if (newVal) {
          if (this.isChartInitialized) {
            this.updateMap();
          } else {
            this.$nextTick(() => {
              this.initChart();
            });
          }
        }
      },
      immediate: true,
      deep: true,
    },
    color() {
      if (this.isChartInitialized) {
        this.updateMap();
      }
    },
  },
  methods: {
    initChart() {
      const container = this.$refs.echartsContainer;
      if (!container) {
        console.error("ECharts 容器未正确加载！");
        return;
      }

      this.chart = echarts.init(container);

      try {
        echarts.registerMap(this.mapName, this.data);
        console.log("EchartsMap: 地图注册成功");
      } catch (error) {
        console.error("EchartsMap: 注册地图时出错:", error);
      }

      this.isChartInitialized = true;
      this.setOption();

      window.addEventListener("resize", this.chart.resize);
    },

    updateMap() {
      if (!this.isChartInitialized) {
        console.error("ECharts 实例未初始化！");
        return;
      }

      try {
        echarts.registerMap(this.mapName, this.data);
        console.log("EchartsMap: 地图重新注册成功");
      } catch (error) {
        console.error("EchartsMap: 重新注册地图时出错:", error);
      }

      this.setOption();
    },

    getBoundary() {
      let minLng = Infinity, maxLng = -Infinity;
      let minLat = Infinity, maxLat = -Infinity;
      
      const processCoordinates = (coords) => {
        if (Array.isArray(coords)) {
          if (typeof coords[0] === 'number') {
            // 单个坐标点
            minLng = Math.min(minLng, coords[0]);
            maxLng = Math.max(maxLng, coords[0]);
            minLat = Math.min(minLat, coords[1]);
            maxLat = Math.max(maxLat, coords[1]);
          } else {
            // 递归处理嵌套数组
            coords.forEach(coord => processCoordinates(coord));
          }
        }
      };

      // 处理所有特征
      if (this.data.features) {
        this.data.features.forEach(feature => {
          if (feature.geometry && feature.geometry.coordinates) {
            processCoordinates(feature.geometry.coordinates);
          }
        });
      }
      
      // 如果没有找到有效边界，使用默认值
      if (minLng === Infinity) {
        return {
          minLng: 73,
          maxLng: 135,
          minLat: 18,
          maxLat: 53
        };
      }
      
      return { minLng, maxLng, minLat, maxLat };
    },

    generateScatterData() {
      const { minLng, maxLng, minLat, maxLat } = this.getBoundary();
      const data = [];
      
      // 遍历所有省份特征
      this.data.features.forEach(feature => {
        const provinceName = feature.properties.name;
        const provinceData = PROVINCE_DATA[provinceName];
        
        if (provinceData) {
          // 根据省份数据计算散点数量和大小
          const count = Math.floor(provinceData.gdp*5) || 20; // 每2000亿GDP一个点
          const size = Math.max(6, Math.min(15, provinceData.population / 800)) || 4; // 人口每1500万对应1个大小单位
          
          // 获取省份的中心点
          const center = feature.properties.center || this.calculateCenter(feature.geometry.coordinates);
          
          // 在省份范围内生成散点
          for (let i = 0; i < count; i++) {
        data.push({
          value: [
            minLng + Math.random() * (maxLng - minLng),
            minLat + Math.random() * (maxLat - minLat)
          ],
          symbolSize: size
        });
      }
    }
  });
      
      return data;
    },

    calculateCenter(coordinates) {
      // 简单计算多边形中心点
      let sumLng = 0, sumLat = 0, count = 0;
      
      const processPoint = (point) => {
        if (Array.isArray(point)) {
          if (typeof point[0] === 'number') {
            sumLng += point[0];
            sumLat += point[1];
            count++;
          } else {
            point.forEach(p => processPoint(p));
          }
        }
      };

      processPoint(coordinates);
      
      return [sumLng / count, sumLat / count];
    },

    setOption() {
      const option = {
        geo: {
          map: this.mapName,
          roam: true,
        },
        series: [
          {
            type: "map",
            map: this.mapName,
            roam: true,
            data: [],
            itemStyle: {
              areaColor: this.color,
              borderColor: "#ccc",
            },
            emphasis: {
              itemStyle: {
                areaColor: this.color,
              },
            },
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'circle',
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            data: this.generateScatterData(),
            zlevel: 1
          }
        ],
      };

      this.chart.on('click', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'map') {
          this.selectedProvince = params.name;
          this.showModal = true;
        }
      });

      this.chart.setOption(option, true);
      this.chart.resize();
    },

    closeModal() {
      this.showModal = false;
      this.selectedProvince = '';
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.chart?.resize);
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.province-info {
  display: flex;
  gap: 40px;
}

.province-image {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.info-content {
  flex: 1;
}

.description {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #666;
  font-size: 16px;
}

.key-points, .industries {
  margin-bottom: 20px;
}

.key-points h4, .industries h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #f5f5f5;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
}

.industry-list {
  color: #666;
  line-height: 1.6;
}

.statistics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.label {
  display: block;
  color: #999;
  margin-bottom: 5px;
  font-size: 14px;
}

.value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

div[ref="echartsContainer"] {
  width: 100%;
  height: 100%;
}
</style>