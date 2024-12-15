<template>
  <div class="scroll-container" :class="currentSection">
    <!-- 顶部跳转导航 -->
    <HeaderNav />
    
    <!-- 各个内容区域 -->
    <section id="economyOverview" class="section" @mouseover="updateSection('economyOverview')">
      <div class="section-padding"></div>
      <div class="section-content">
        <EconomyOverview />
      </div>
    </section>
    
    <section id="agriculture" class="section" @mouseover="updateSection('agriculture')">
      <div class="section-padding"></div>
      <div class="section-content">
        <AgriculturePage />
      </div>
    </section>
    
    <section id="industry" class="section" @mouseover="updateSection('industry')">
      <div class="section-padding"></div>
      <div class="section-content">
        <IndustryPage />
      </div>
    </section>
    
    <section id="services" class="section" @mouseover="updateSection('services')">
      <div class="section-padding"></div>
      <div class="section-content">
        <ServicePage />
      </div>
    </section>
    
    <section id="digitalEconomy" class="section" @mouseover="updateSection('digitalEconomy')">
      <div class="section-padding"></div>
      <div class="section-content">
        <DigitalEconomyPage />
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

export default {
  name: 'Home',
  components: {
    HeaderNav,
    EconomyOverview,
    AgriculturePage,
    IndustryPage,
    ServicePage,
    DigitalEconomyPage
  },
  data() {
    return {
      currentSection: 'economyOverview',
      observer: null
    }
  },
  mounted() {
    // 创建 Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.updateSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6 // 当元素60%可见时触发
      }
    );

    // 观察所有section
    document.querySelectorAll('.section').forEach(section => {
      this.observer.observe(section);
    });
  },
  beforeUnmount() {
    // 清理 observer
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    updateSection(sectionId) {
      this.currentSection = sectionId;
    }
  }
};
</script>

<style scoped>
.scroll-container {
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  transition: background-color 0.5s ease;
}

.section {
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  scroll-margin-top: 10vh;
  transition: all 0.5s ease;
}

/* 导航栏部分 */
.section-padding {
  height: 10vh;
  width: 100%;
  background-color: transparent;
}

/* 内容区域 */
.section-content {
  flex: 1;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

/* 主题样式 */
.economyOverview {
  background: linear-gradient(135deg, #1a2a6c, #2a5298, #1e4d92);
  color: #ffffff;
}

.agriculture {
  background: linear-gradient(135deg, #134e5e, #71b280);
  color: #ffffff;
}

.industry {
  background: linear-gradient(135deg, #000428, #004e92);
  color: #ffffff;
}

.services {
  background: linear-gradient(135deg, #904e95, #e96443);
  color: #ffffff;
}

.digitalEconomy {
  background: linear-gradient(135deg, #4b6cb7, #182848);
  color: #ffffff;
}

/* 动画效果 */
.section {
  animation: gradientBG 15s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 页面切换动画 */
.section-enter-active,
.section-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.section-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.section-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

html {
  scroll-behavior: smooth;
}
</style>