<template>
  <div class="section">
    <h2>数字经济——创新驱动的新时代</h2>
    <DigitalEconomyChart 
      :chartData="data" 
      :categories="categories"
      :legendData="legend"
    />
  </div>
</template>

<script>
import DigitalEconomyChart from '../components/DigitalEconomyChart.vue';

export default {
  name: 'DigitalEconomyPage',
  components: {
    DigitalEconomyChart,
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
}
</style>
