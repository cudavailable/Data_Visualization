<template>
  <div class="section">
    <h2>工业巨轮——第二产业的崛起与壮大</h2>
    <IndustryChart />
  </div>
</template>

<script>
import IndustryChart from '../components/IndustryChart.vue';

export default {
  name: 'IndustryPage',
  components: {
    IndustryChart
  }
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #e0e0e0;
}
</style>
