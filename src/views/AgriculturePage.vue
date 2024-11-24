<template>
  <div class="section">
    <h2>沃土兴邦——第一产业的坚实基础</h2>
    <AgricultureChart />
  </div>
</template>

<script>
import AgricultureChart from '../components/AgricultureChart.vue';

export default {
  name: 'AgriculturePage',
  components: {
    AgricultureChart
  }
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #f5f5f5;
}
</style>
