import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import AgriculturePage from './views/AgriculturePage.vue';
import IndustryPage from './views/IndustryPage.vue';
import ServicePage from './views/ServicePage.vue';
import DigitalEconomyPage from './views/DigitalEconomyPage.vue';
import GlobalRolePage from './views/GlobalRolePage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/agriculture', component: AgriculturePage },
  { path: '/industry', component: IndustryPage },
  { path: '/services', component: ServicePage },
  { path: '/digital-economy', component: DigitalEconomyPage },
  { path: '/global-role', component: GlobalRolePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
