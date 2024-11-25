<template>
  <div class="scroll-container">
    <!-- 顶部跳转导航 -->
    <HeaderNav />
    <!-- 各个内容区域 -->
    <section id="economyOverview" class="section">
	  <div class="section-padding"></div>
      <div class="section-content">
        <EconomyOverview />
      </div>
    </section>
    <section id="agriculture" class="section">
      <div class="section-padding"></div>
      <div class="section-content">
        <AgriculturePage />
      </div>
    </section>
    <section id="industry" class="section">
	  <div class="section-padding"></div>      
	  <div class="section-content">
        <IndustryPage />
      </div>
    </section>
    <section id="services" class="section">
	  <div class="section-padding"></div>		
      <div class="section-content">
        <ServicePage />
      </div>
    </section>
    <section id="digitalEconomy" class="section">
	  <div class="section-padding"></div>		
      <div class="section-content">
        <DigitalEconomyPage />
      </div>
    </section>
    <section id="globalRole" class="section">
	  <div class="section-padding"></div>		
      <div class="section-content">
        <GlobalRolePage />
      </div>
    </section>
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue';
import EconomyOverview from './EconomyOverview.vue';
import AgriculturePage from './AgriculturePage.vue';
import IndustryPage from './IndustryPage.vue';
import ServicePage from './ServicePage.vue';
import DigitalEconomyPage from './DigitalEconomyPage.vue';
import GlobalRolePage from './GlobalRolePage.vue';

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
  /* @OYN */
  margin: 0;
  padding: 0;
  padding-top: 60px; /* 导航栏高度，避免内容被遮挡 */
  width: 100%;
  overflow-x: hidden; /* 防止横向滚动条 */

  /* height: 100vh; */
  overflow-y: auto;
  /* scroll-snap-type: y mandatory; */
}

.section {
  /* @OYN */
  flex-direction: column;
  position: relative; /* 使内部绝对定位的内容有效 */

  /* height: 100vh; */
  scroll-snap-align: start;
  min-height: 100vh; /* 确保每部分至少占据一屏 */
  padding: 20px; /* 给内容一些内边距 */
  background-color: #f0f0f0;
}

/* @OYN */
.section-padding {
  height: 10%;
  width: 100%;
  background-color: white; /* 填充背景颜色，与导航栏一致 */
}

.section-content {
  height: 90%;
  width: 100%;
  background-color: white; /* 填充背景颜色，与导航栏一致 */
}

html {
  scroll-behavior: smooth;
}
</style>