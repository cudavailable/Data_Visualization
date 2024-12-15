import { createRouter, createWebHistory } from 'vue-router';
import AgriculturePage from './views/AgriculturePage.vue';
import IndustryPage from './views/IndustryPage.vue';
import ServicePage from './views/ServicePage.vue';
import DigitalEconomyPage from './views/DigitalEconomyPage.vue';
import GlobalRolePage from './views/GlobalRolePage.vue';
import EconomyOverview from './views/EconomyOverview.vue';

const routes = [
  { path: '/', component: EconomyOverview },
  { path: '/agriculture', component: AgriculturePage },
  { path: '/industry', component: IndustryPage },
  { path: '/services', component: ServicePage },
  { path: '/digital-economy', component: DigitalEconomyPage },
  { path: '/global-role', component: GlobalRolePage },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(), // 使用 hash 模式
  routes,
});

export default router;
