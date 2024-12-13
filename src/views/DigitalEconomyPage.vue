<template>
  <div class="section">
    <div class="content-container">
      <!-- 左侧图表 -->
      <div class="chart-container">
        <Echarts2 />
      </div>

      <!-- 右侧文字说明 -->
      <div class="text-container">
        <h2>数字经济——创新驱动的新时代</h2>
        <p>
          随着数字化转型的深入，数字经济正在成为全球经济增长的重要引擎。
          左图展示了2019年—2023年数字经济重点行业同比增速变化情况（数据来源：工业和信息化部）。
        </p>
        <p>
          由图可见，以上四个指标在2021年的同比增长达到最大，之后两年增速明显放缓。以下是具体分析：
        </p>
        <p>
          电子信息制造业增加值和电信业务收入的同比增长在2021年达到高峰，可能是因为疫情期间居家办公和在线活动增加，远程交流的需求增多，带动相关电子产品制造。
          而在2022年之后下降，可能是因为疫情影响逐渐减弱，消费需求增速放缓，加之国际关系紧张可能导致芯片出口限制；
        </p>
        <p>
          互联网业务收入和软件业务收入的同比增长整体在2021达到峰值，原因与前两者类似。
          在2022年，软件业务收入同比增长率为-1.1%，可能是疫情接近末尾，因疫情而产生的需求消退的同时，宏观经济又不太景气。
        </p>
      </div>
    </div>

    <!-- <h2>数字经济——创新驱动的新时代</h2> -->
    <!-- <div class="grid-container"> -->

      <!-- <div class="grid-title"> -->
        <!-- <h2>数字经济——创新驱动的新时代</h2> -->
      <!-- </div> -->

      <!-- <div class="grid-item">
        <DigitalEconomyChart 
          :chartData="data" 
          :categories="categories"
          :legendData="legend"
        />
      </div> -->

      <!-- <div class="grid-item">
        <Echarts2 />
      </div>

      <div class="grid-item">
        <Echarts3 />
      </div>

      <div class="grid-item">
        <Echarts4 />
      </div> -->
      
    <!-- </div> -->
  </div>
</template>

<script>
// import DigitalEconomyChart from '../components/DigitalEconomyChart.vue';
import Echarts2 from "../components/Echarts2.vue";
// import Echarts3 from "../components/Echarts3.vue";
// import Echarts4 from "../components/Echarts4.vue";

export default {
  name: 'DigitalEconomyPage',
  components: {
    // DigitalEconomyChart,
    Echarts2,
    // Echarts3,
    // Echarts4,
  },
  // data() {
  //   return {
  //     data: [70, 100, 220, 340],
  //     categories: ['2020年', '2021年', '2022年', '2023年'],
  //     legend: ['具有一定影响力的工业互联网平台（家）'] // 传递的图例数据，需与系列的 name 对应
  //   };
  // },
};
</script>

<style scoped>
.section {
  height: 100vh;
  scroll-snap-align: start;
  background-color: #ffffff;
  display: flex; /* 使用 flex 布局 */
  justify-content: center;
  align-items: center;
}

/* 网格容器样式 */
.content-container {
  display: flex;
  flex-direction: row; /* 水平布局 */
  gap: 20px; /* 网格间距 */
  width: 90%; 
  height: 80%; 
  max-width: 1200px; /* 最大宽度 */
}

/* 左侧图表容器 */
.chart-container {
  flex: 1; /* 左侧图表占1份宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc; /* 可选：边框便于调试 */
  padding: 10px;
  background-color: #ffffff; /* 图表背景色 */
  height: 80%; /* 压缩高度 */
  margin-bottom: 20px; /* 与下边界留出距离 */
  box-sizing: border-box; /* 确保边框内的布局正确 */
}

/* 右侧文字说明容器 */
.text-container {
  flex: 1; /* 右侧文字说明占1份宽度 */
  display: flex;
  flex-direction: column; /* 竖直布局 */
  justify-content: center;
  align-items: flex-start; /* 左对齐 */
  padding: 20px;
  background-color: #ffffff; /* 文字背景色 */
  border: 1px solid #ccc; /* 可选：边框便于调试 */
  font-family: Arial, sans-serif; /* 可选：文字样式 */
  height: 80%; /* 压缩高度 */
  margin-bottom: 20px; /* 与下边界留出距离 */
  box-sizing: border-box; /* 确保边框内的布局正确 */
}

.text-container h2 {
  margin-bottom: 16px; /* 标题与段落的间距 */
  font-size: 24px;
  color: #333;
}

.text-container p {
  margin-bottom: 12px;
  line-height: 1.6;
  font-size: 16px;
  color: #666;
}
</style>
