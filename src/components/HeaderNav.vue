<template>
  <div
    class="header-nav"
    :style="{ background: `linear-gradient(to right, ${activeGradient.join(', ')})` }"
  >
    <ul>
      <li
        v-for="(item, index) in navItems"
        :key="index"
        @click="handleClick(index, item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      navItems: [
        { id: "economyOverview", name: "经济概览" },
        { id: "agriculture", name: "农业" },
        { id: "industry", name: "工业" },
        { id: "services", name: "服务业" },
        { id: "digitalEconomy", name: "数字经济" },
        { id: "globalRole", name: "全球角色" },
      ],
      gradients: [
        ["#F56C6C", "#F78C8C", "#F9ACAC", "#FBDCDC", "#FDECEC", "#FEF5F5"],
        ["#67C23A", "#8BCB56", "#A5D473", "#BFDE90", "#D9E7AD", "#F3F1CA"],
        ["#909399", "#A6A7AA", "#BCBCC1", "#D2D3D6", "#E8E9EC", "#F5F5F5"],
		["#E6A23C", "#E9B364", "#ECC48D", "#F0D5B6", "#F3E6DE", "#F7F7F6"],
        ["#409EFF", "#62AFFF", "#83C0FF", "#A5D0FF", "#C6E1FF", "#E8F2FF"],
        ["#303133", "#515151", "#737373", "#949494", "#B6B6B6", "#D7D7D7"],
      ],
      activeGradient: [],
    };
  },
  mounted() {
    this.activeGradient = this.gradients[0];
  },
  methods: {
    handleClick(index, sectionId) {
      this.activeGradient = this.gradients[index];
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style scoped>
.header-nav {
  position: fixed; /* 确保导航栏固定在页面顶部 */
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh; /* 设置导航栏高度为视口的 10% */
  z-index: 1000; /* 确保导航栏层级高于内容 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.header-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.header-nav li {
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}
</style>
