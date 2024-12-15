<template>
  <div class="pie-chart-component">
    <div class="chart-header">
      <button class="prev-btn" @click="switchView(currentViewIndex - 1)">←</button>
      <h2>{{ views[currentViewIndex].name }}</h2>
      <button class="next-btn" @click="switchView(currentViewIndex + 1)">→</button>
    </div>

    <div v-if="loading" class="loading-state">
      <p>正在加载数据...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    <div v-else class="chart-wrapper">
      <transition name="fade" mode="out-in">
        <component
          :is="views[currentViewIndex].component"
          :data="views[currentViewIndex].data"
          :key="currentViewIndex"
          ref="chart"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { markRaw } from "vue";
import GdpLogChart from "./GdpLogChart.vue";
import PopulationChart from "./PopulationChart.vue";
import IndustryChart from "./IndustryChart.vue";

export default {
  name: "PieChartComponent",
  components: {
    GdpLogChart,
    PopulationChart,
    IndustryChart,
  },
  data() {
    return {
      currentViewIndex: 0,
      loading: true,
      error: null,
      views: [
        { name: "GDP对数变换趋势", component: markRaw(GdpLogChart), data: [] },
        { name: "人口与GDP关系", component: markRaw(PopulationChart), data: [] },
        { name: "三大产业结构变化", component: markRaw(IndustryChart), data: [] },
      ],
    };
  },
  async mounted() {
    console.log("PieChartComponent: 开始加载数据...");
    await this.loadData();
    window.addEventListener('resize', this.handleResize);
    console.log("PieChartComponent: 数据加载完成，子组件已渲染");
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.$refs.chart) {
        this.$refs.chart.resize?.();
      }
    },
    async loadData() {
      this.loading = true;
      this.error = null;
      
      try {
        const jsonData = await import("/src/assets/merged_data.json");
        const years = Object.keys(jsonData.default);
        
        if (!years.length) {
          throw new Error('数据加载失败：没有年份数据');
        }

        // GDP对数变换数据
        this.views[0].data = years.map((year) => ({
          year,
          value: jsonData.default[year]["GDP(对数变换)"],
        }));

        // 人口与GDP关系数据
        this.views[1].data = years.map((year) => ({
          year,
          gdp: jsonData.default[year]["GDP(对数变换)"],
          population: jsonData.default[year]["年末总人口(万人)"],
          youngPop: jsonData.default[year]["0-14岁人口(万人)"],
          workingPop: jsonData.default[year]["15-64岁人口(万人)"],
          elderlyPop: jsonData.default[year]["65岁及以上人口(万人)"],
          dependencyRatio: jsonData.default[year]["总抚养比(%)"],
        }));

        // 三大产业数据（1952年后）
        this.views[2].data = years
          .filter((year) => parseInt(year) >= 1952)
          .map((year) => ({
            year,
            primary: jsonData.default[year]["第一产业增加值(亿元)"],
            secondary: jsonData.default[year]["第二产业增加值(亿元)"],
            tertiary: jsonData.default[year]["第三产业增加值(亿元)"],
            perCapita: jsonData.default[year]["人均国内生产总值(元)"],
            primaryContrib: jsonData.default[year]["第一产业对GDP的贡献率(%)_x"],
            secondaryContrib: jsonData.default[year]["第二产业对GDP的贡献率(%)_x"],
            tertiaryContrib: jsonData.default[year]["第三产业对GDP的贡献率(%)_x"],
          }));

        console.log("数据加载成功:", this.views);
      } catch (error) {
        console.error("数据加载错误:", error);
        this.error = `数据加载失败: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    switchView(index) {
      const totalViews = this.views.length;
      this.currentViewIndex = (index + totalViews) % totalViews;
    },
  },
};
</script>

<style scoped>
.pie-chart-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  background: transparent
}

.chart-wrapper {
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  background: transparent
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  gap: 20px;
  padding: 0 20px;
}

.chart-header h2 {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  min-width: 200px;
  color: #ffffff;
}

.prev-btn,
.next-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0 16px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  min-width: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.prev-btn:hover,
.next-btn:hover {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.prev-btn:active,
.next-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  position: absolute;
  width: 100%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.loading-state,
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
}

.loading-state {
  color: #666;
}

.error-state {
  color: #ff4444;
}

:deep(.chart-container) {
  width: 100%;
  height: 100% !important;
  max-width: 1200px;
  margin: 0 auto;
  border: none;
  box-shadow: none;
  overflow: hidden;
  background: transparent
}
</style>