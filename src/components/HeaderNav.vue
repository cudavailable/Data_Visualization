<template>
  <div class="header-nav">
    <ul>
      <li @click="scrollToSection('economyOverview')">经济概览</li>
      <li @click="scrollToSection('agriculture')">农业</li>
      <li @click="scrollToSection('industry')">工业</li>
      <li @click="scrollToSection('services')">服务业</li>
      <li @click="scrollToSection('digitalEconomy')">数字经济</li>
      <li @click="scrollToSection('globalRole')">全球角色</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 0;
  z-index: 999;
  text-align: center;
}
.header-nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}
.header-nav li {
  margin: 0 20px;
  cursor: pointer;
  font-size: 16px;
}
.header-nav li:hover {
  text-decoration: underline;
}
</style>
