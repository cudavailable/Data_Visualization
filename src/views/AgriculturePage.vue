<template>
  <div>
    <h2 @click="handleTitleClick">沃土兴邦——第一产业的崛起与壮大</h2>
    <div class="section">
      <div class="left-container">
        <SunburstChart @province-clicked="handleProvinceClick" @region-clicked="handleRegionClick" />
      </div>
      <div class="right-container">
        <div class="top-right">
          <!-- 动态加载组件 -->
          <component :is="currentComponent" :province="selectedProvince" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SunburstChart from '../components/SunburstChart.vue';
import FoodProductionChart from '../components/FoodProductionChart.vue';
import AgricultureChart from '../components/AgricultureChart.vue';

export default {
  name: 'AgriculturePage',
  components: {
    SunburstChart,
    FoodProductionChart,
    AgricultureChart,
  },
  data() {
    return {
      selectedProvince: null, // 存储点击的省份
      currentComponent: 'FoodProductionChart', // 默认显示FoodProductionChart组件
    };
  },
  methods: {
    handleProvinceClick(province) {
      this.selectedProvince = province;  // 更新选择的省份
      this.currentComponent = 'AgricultureChart';  // 点击省份后切换为AgricultureChart组件
    },
    handleRegionClick(region) {
      // 点击区域时，切换回FoodProductionChart组件
      this.selectedProvince = null;  // 清空省份选择
      this.currentComponent = 'FoodProductionChart';  // 切换回FoodProductionChart组件
    },
    handleTitleClick() {
      // 点击标题时，回到默认组件 FoodProductionChart
      this.selectedProvince = null;  // 清空省份选择
      this.currentComponent = 'FoodProductionChart';  // 切换回FoodProductionChart组件
    },
  },
};
</script>

<style scoped>
.section {
  display: flex;
  height: auto;
  background-color: #ffffff;
}

.left-container {
  flex: 1;
  background: rgb(255, 255, 255);
  padding: 10px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-right {
  flex: 1;
  background: rgb(255, 255, 255);
  padding: 10px;
  margin: 5px;
  height: 100%;
}

@media (max-width: 768px) {
  .section {
    flex-direction: column;
  }

  .left-container,
  .right-container {
    flex: none;
    width: 100%;
  }
}
</style>
