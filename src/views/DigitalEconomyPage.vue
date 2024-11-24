<template>
  <div class="section">
    <!-- <h2>数字经济——创新驱动的新时代</h2> -->
    <div class="grid-container">

      <!-- <div class="grid-title"> -->
        <!-- <h2>数字经济——创新驱动的新时代</h2> -->
      <!-- </div> -->

      <div class="grid-item">
        <DigitalEconomyChart 
          :chartData="data" 
          :categories="categories"
          :legendData="legend"
        />
      </div>

      <div class="grid-item">
        <Echarts2 />
      </div>

      <div class="grid-item">
        <Echarts3 />
      </div>

      <div class="grid-item">
        <Echarts4 />
      </div>
      
    </div>
  </div>
</template>

<script>
import DigitalEconomyChart from '../components/DigitalEconomyChart.vue';
import Echarts2 from "../components/Echarts2.vue";
import Echarts3 from "../components/Echarts3.vue";
import Echarts4 from "../components/Echarts4.vue";

export default {
  name: 'DigitalEconomyPage',
  components: {
    DigitalEconomyChart,
    Echarts2,
    Echarts3,
    Echarts4,
  },
  data() {
    return {
      data: [70, 100, 220, 340],
      categories: ['2020年', '2021年', '2022年', '2023年'],
      legend: ['具有一定影响力的工业互联网平台（家）'] // 传递的图例数据，需与系列的 name 对应
    };
  },
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #d0d0d0;
  display: flex; /* 使用 flex 布局 */
  justify-content: center;
  align-items: center;
}

/* 网格容器样式 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  grid-template-rows: 1fr 1fr; /* 两行布局 */
  gap: 10px; /* 网格间距 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满父容器 */
}

/* 网格项目样式 */
.grid-item {
  background-color: #f5f5f5; /* 背景色 */
  border: 1px solid #ccc; /* 边框 */
  /* padding: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* width: 100%; */
  /* height: 100%; */
}
</style>
