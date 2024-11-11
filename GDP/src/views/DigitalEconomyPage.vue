<template>
  <div class="section">
    <h2>数字经济——创新驱动的新时代</h2>
    <DigitalEconomyChart />
    <Test />
  </div>
</template>

<script>
import DigitalEconomyChart from '../components/DigitalEconomyChart.vue';
import Test from '../components/Test.vue';

export default {
  name: 'DigitalEconomyPage',
  components: {
    DigitalEconomyChart,
    Test
  }
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #d0d0d0;
}
</style>
