<template>
  <div class="section">
   <!-- <h2>工业巨轮——第二产业的崛起与壮大</h2> -->
	<div class="content">
	<div class="comp">
	<IndustryAdded />
	</div>
	<div class="comp">
	<IndustryProduct />
	</div>
	<div class="comp">
	<IndustryCapital />
	</div>
	<div class="comp">
	<IndustryEnergy />
	</div>
    <IndustryChart />
  </div>
  </div>
</template>

<script>
import IndustryAdded from '../components/IndustryAdded.vue';
import IndustryProduct from '../components/IndustryProduct.vue';
import IndustryCapital from '../components/IndustryCapital.vue';
import IndustryEnergy from '../components/IndustryEnergy.vue';
import IndustryChart from '../components/IndustryChart.vue';

export default {
  name: 'IndustryPage',
  components: {
	IndustryAdded,
	IndustryProduct,
	IndustryCapital,
	IndustryEnergy,
    IndustryChart
  }
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #d0d0d0;
  display: flex; /* 使用 flex 布局 */
  justify-content: center;
  align-items: center;
}

/* 网格容器样式 */
.content {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  grid-template-rows: 1fr 1fr; /* 两行布局 */
  gap: 10px; /* 网格间距 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满父容器 */
}

.comp{
	background-color: #f5f5f5; /* 背景色 */
	border: 1px solid #ccc; /* 边框 */
	/* padding: 10px; */
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

</style>
