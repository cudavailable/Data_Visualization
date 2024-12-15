<!-- App.vue -->
<template>
  <div class="app-container" :class="currentRoute">
    <div class="dots-container">
      <div v-for="n in 100" :key="n" class="dot"></div>
    </div>
    <nav class="nav-container">
      <router-link to="/" class="nav-item">经济概览</router-link>
      <router-link to="/agriculture" class="nav-item">农业</router-link>
      <router-link to="/industry" class="nav-item">工业</router-link>
      <router-link to="/services" class="nav-item">服务业</router-link>
      <router-link to="/digital-economy" class="nav-item">数字经济</router-link>
      <!-- <router-link to="/global-role" class="nav-item">全球角色</router-link> -->
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const currentRoute = ref('')

    watch(() => route.path, (newPath) => {
      switch(newPath) {
        case '/':
          currentRoute.value = 'home'
          break
        case '/agriculture':
          currentRoute.value = 'agriculture'
          break
        case '/industry':
          currentRoute.value = 'industry'
          break
        case '/services':
          currentRoute.value = 'services'
          break
        case '/digital-economy':
          currentRoute.value = 'digital'
          break
        case '/global-role':
          currentRoute.value = 'global'
          break
        default:
          currentRoute.value = 'home'
      }
    }, { immediate: true })

    return {
      currentRoute
    }
  }
}
</script>

<style>
.app-container {
  min-height: 90vh;
  transition: background 0.5s ease;
  position: relative;
  overflow: hidden;
  animation: gradientBG 15s ease infinite;
  background-size: 200% 200%;
}

/* 添加dots-container */
.dots-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.nav-container {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 主题样式 */
.home {
  background: linear-gradient(135deg, #7F7FD5, #86A8E7, #91EAE4);
}

.agriculture {
  background: linear-gradient(135deg, #81FBB8, #28C76F);
}

.industry {
  background: linear-gradient(135deg, #A8BFFF, #884D80);
}

.services {
  background: linear-gradient(135deg, #FFB88C, #DE6262);
}

.digital {
  background: linear-gradient(135deg, #90F7EC, #32CCBC);
}

.global {
  background: linear-gradient(135deg, #88ACFE, #4481EB);
}

/* 创建随机分布的圆点 */
.dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  left: 0;
  top: -10vh;
  pointer-events: none;
}

/* 为每个圆点设置不同的动画参数，更均匀的分布 */
.dot:nth-child(1) { left: 3%; animation: fall 8s linear infinite; animation-delay: 0s; }
.dot:nth-child(2) { left: 17%; animation: fall 10s linear infinite; animation-delay: 1s; }
.dot:nth-child(3) { left: 33%; animation: fall 7s linear infinite; animation-delay: 2s; }
.dot:nth-child(4) { left: 45%; animation: fall 9s linear infinite; animation-delay: 0.5s; }
.dot:nth-child(5) { left: 56%; animation: fall 11s linear infinite; animation-delay: 1.5s; }
.dot:nth-child(6) { left: 72%; animation: fall 8s linear infinite; animation-delay: 2.5s; }
.dot:nth-child(7) { left: 84%; animation: fall 12s linear infinite; animation-delay: 0.7s; }
.dot:nth-child(8) { left: 96%; animation: fall 9s linear infinite; animation-delay: 1.8s; }
.dot:nth-child(9) { left: 8%; animation: fall 11s linear infinite; animation-delay: 0.2s; }
.dot:nth-child(10) { left: 24%; animation: fall 7s linear infinite; animation-delay: 1.3s; }

@keyframes fall {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  20% {
    transform: translateY(20vh) scale(1);
    opacity: 0.8;
  }
  90% {
    transform: translateY(90vh) scale(0.8);
    opacity: 0.3;
  }
  100% {
    transform: translateY(100vh) scale(0.5);
    opacity: 0;
  }
}

/* 为不同的圆点设置不同的大小 */
.dot:nth-child(3n) { width: 10px; height: 10px; }
.dot:nth-child(3n+1) { width: 16px; height: 16px; }
.dot:nth-child(3n+2) { width: 24px; height: 24px; }

/* 为不同的圆点设置不同的透明度 */
.dot:nth-child(2n) { opacity: 0.3; }
.dot:nth-child(2n+1) { opacity: 0.5; }

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>