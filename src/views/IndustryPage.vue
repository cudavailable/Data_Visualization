<template>
  <div class="dashboard">
    <div class="left-column">
		<div class="leftCont">
			<IndustryProvince />
	    </div>
    </div>
    <div class="right-column">
      <div class="switch-buttons">
        <button @click="prevComponent">←</button>
        <div class="component-container">
        <IndustryAdded v-if="currentComponent === 'IndustryAdded'" />
        <IndustryProduct v-else-if="currentComponent === 'IndustryProduct'" />
        <IndustryCapital v-else-if="currentComponent === 'IndustryCapital'" />
        <IndustryEnergy v-else-if="currentComponent === 'IndustryEnergy'" />
        </div>
        <button @click="nextComponent">→</button>
      </div>
    </div>
  </div>
</template>

<script>
import IndustryProvince from '../components/IndustryProvince.vue';
import IndustryAdded from '../components/IndustryAdded.vue';
import IndustryProduct from '../components/IndustryProduct.vue';
import IndustryCapital from '../components/IndustryCapital.vue';
import IndustryEnergy from '../components/IndustryEnergy.vue';

export default {
  name: 'IndustryPage',
  components: {
	IndustryProvince,
	IndustryAdded,
	IndustryProduct,
	IndustryCapital,
	IndustryEnergy
  },
  data() {
    return {
      currentComponent: 'IndustryAdded'
    };
  },
  methods: {
    prevComponent() {
    const components = ['IndustryAdded','IndustryProduct', 'IndustryCapital', 'IndustryEnergy'];
    const currentIndex = components.indexOf(this.currentComponent);
    this.currentComponent = components[(currentIndex - 1 + components.length) % components.length];
  },
  nextComponent() {
    const components = ['IndustryAdded','IndustryProduct', 'IndustryCapital', 'IndustryEnergy'];
    const currentIndex = components.indexOf(this.currentComponent);
    this.currentComponent = components[(currentIndex + 1) % components.length];
  }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.left-column {
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
}

.leftCont {
	width: 100%;
	height: 80%;
	padding-top: 60px;
	padding-bottom: 40px;
}

.right-column {
  width: 50%;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
}

.switch-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.component-container {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  display: flex; /* 添加 Flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
}

button {
  margin: 0 10px;
}

#chartDom {
  width: 100%;
  height: 100%;
}

</style>
