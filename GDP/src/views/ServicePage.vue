<template>
  <div class="section">
    <h2>服务新潮——第三产业的蓬勃发展</h2>
    <ServiceIndustryChart />
  </div>
</template>

<script>
import ServiceIndustryChart from '../components/ServiceIndustryChart.vue';

export default {
  name: 'ServicePage',
  components: {
    ServiceIndustryChart
  }
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #e8e8e8;
}
</style>
