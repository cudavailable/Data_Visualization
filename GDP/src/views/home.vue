<template>
  <div class="scroll-container">
    <!-- 顶部跳转导航 -->
    <HeaderNav />
    
    <section id="economyOverview" class="section">
       <EconomyOverview />
    </section>
    
    <!-- 农业部分 -->
    <section id="agriculture" class="section">
      <AgriculturePage />
    </section>
    
    <!-- 工业部分 -->
    <section id="industry" class="section">
      <IndustryPage />
    </section>
    
    <!-- 服务业部分 -->
    <section id="services" class="section">
      <ServicePage />
    </section>
    
    <!-- 数字经济部分 -->
    <section id="digitalEconomy" class="section">
      <DigitalEconomyPage />
    </section>
    
    <!-- 全球角色部分 -->
    <section id="globalRole" class="section">
      <GlobalRolePage />
    </section>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';
import EconomyOverview from '../views/EconomyOverview.vue';
import AgriculturePage from '../views/AgriculturePage.vue';
import IndustryPage from '../views/IndustryPage.vue';
import ServicePage from '../views/ServicePage.vue';
import DigitalEconomyPage from '../views/DigitalEconomyPage.vue';
import GlobalRolePage from '../views/GlobalRolePage.vue';

export default {
  name: 'Home',
  components: {
    HeaderNav,
    EconomyOverview,
    AgriculturePage,
    IndustryPage,
    ServicePage,
    DigitalEconomyPage,
    GlobalRolePage
  }
};
</script>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  padding: 20px;
  background-color: #f0f0f0;
}
html {
  scroll-behavior: smooth;
}

</style>