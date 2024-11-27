<template>
  <div>
    <h2 @click="handleTitleClick">沃土兴邦——第一产业的崛起与壮大</h2>
    <div class="section">
      <div class="left-container">
        <!-- 旭日图 -->
        <SunburstChart @province-clicked="handleProvinceClick" @region-clicked="handleRegionClick" />
      </div>
      <div class="right-container">
        <div class="top-right">
          <!-- 动态加载组件 -->
          <component :is="currentComponent" :province="selectedProvince" />
        </div>
        <div class="bottom-right">
          <!-- 点击“更多”时切换为新的图表组件 -->
          <button @click="showMoreCharts">更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SunburstChart from '../components/SunburstChart.vue';
import FoodProductionChart from '../components/FoodProductionChart.vue';
import AgricultureChart from '../components/AgricultureChart.vue';
import AgrComp from '../components/AgrComp.vue'; // 新的组件1
import AgrDisaster from '../components/AgrDisaster.vue'; // 新的组件2

export default {
  name: 'AgriculturePage',
  components: {
    SunburstChart,
    FoodProductionChart,
    AgricultureChart,
    AgrComp, // 注册新组件1
    AgrDisaster, // 注册新组件2
  },
  data() {
    return {
      selectedProvince: null, // 存储点击的省份
      currentComponent: 'FoodProductionChart', // 默认显示 FoodProductionChart 组件
    };
  },
  methods: {
    handleProvinceClick(province) {
      this.selectedProvince = province;  // 更新选择的省份
      this.currentComponent = 'AgricultureChart';  // 点击省份后切换为 AgricultureChart 组件
    },
    handleRegionClick(region) {
      // 点击区域时，切换回 FoodProductionChart 组件
      this.selectedProvince = null;  // 清空省份选择
      this.currentComponent = 'FoodProductionChart';  // 切换回 FoodProductionChart 组件
    },
    handleTitleClick() {
      // 点击标题时，回到默认组件 FoodProductionChart
      this.selectedProvince = null;  // 清空省份选择
      this.currentComponent = 'FoodProductionChart';  // 切换回 FoodProductionChart 组件
    },
    showMoreCharts() {
      // 点击"更多"时，切换为 AgrComp 或 AgrDisaster
      if (this.currentComponent === 'AgrComp') {
        this.currentComponent = 'AgrDisaster';
      } else {
        this.currentComponent = 'AgrComp';
      }
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

.bottom-right {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

button {
  background-color: white !important; /* 强制设置白色背景 */
  color: #007bff !important; /* 强制设置蓝色文字 */
  border: 1px solid #007bff !important; /* 强制设置蓝色边框 */
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 35px; /* 上移按钮 */
  text-align: center;
  box-shadow: none !important; /* 去除任何阴影效果 */
  outline: none !important; /* 去除任何外边框效果 */
  background-image: none !important; /* 移除背景图像 */
  transition: none !important; /* 去除任何过渡效果 */
}

button:hover {
  background-color: white !important; /* 悬浮时背景保持白色 */
  color: #007bff !important; /* 悬浮时文字保持蓝色 */
  border: 1px solid #007bff !important; /* 悬浮时边框颜色保持蓝色 */
}
</style>
