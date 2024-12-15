<template>
  <div>
    <div class="section">
      <div class="content">
        <div class="left-container">
          <thermal v-if="state" />
          <ServiceIndustryChart v-else />
          <button @click="state = !state">→</button>
        </div>       
        <div class="right-container">
          <div class="top-right">
            <h3>介绍及可视化分析</h3>
            <pre class="text-content1">     旅游消费成为人们日常生活的重要组成部分，无论是国内游还是出境游，都带动了酒店行业的蓬勃发展。商务出行的频率也不断增加，各类商务会议、展览活动等为酒店行业带来了稳定的客源。酒店行业的繁荣发展，带动了相关产业链的发展，如旅游景区、交通运输、餐饮娱乐等行业，形成了产业联动效应，进一步促进了第三产业的发展和 GDP 的增加。</pre>
            <img src="../assets/service1.jpg" alt="服务业图片1" class="content-image">
            <pre class="text-content1">    视图一使用河流图，探索2000年到2022年全国GDP，国内旅游总花费以及国内旅客的变化趋势，用于展现近年来全国旅游业发展。</pre>
            <img src="../assets/service2.jpg" alt="服务业图片2" class="content-image">
            <pre class="text-content1">    视图二使用气泡图，探索从2000年到2010年再到2020年各个省份现存酒店数量以及GDP，其中各省酒店数量使用绿色气泡的面积表示，各省GDP使用蓝色气泡的面积表示。
    我们可以看到，总体而言，从2000年到2010年再到2020年，绿色气泡和蓝色气泡面积总体都逐渐增大，其中，绿色气泡先前小于蓝色气泡，之后部分绿色气泡大于蓝色气泡，由此可见从2000年到2020年旅游业发展迅速，发展速度大于全产业的发展速度。</pre>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import ServiceIndustryChart from '../components/ServiceIndustryChart.vue';
import thermal from '../components/thermal.vue';
export default {
  name: 'ServicePage',
  components: {
    ServiceIndustryChart,
    thermal
  },
   data() {
    return {
      state: true 
  };
  }
};
</script>

<style scoped>
.section {
  flex-direction: column;
  height: 90vh; /* 整个屏幕高度 */
  width: 100%;
  margin: 0; /* 去除外边距 */
  padding: 0; /* 去除内边距 */
  overflow: hidden; /* 防止内容溢出 */
  box-sizing: border-box; /* 确保边框和内边距不影响宽高 */
}

.left-container {
  flex: 3;
  padding: 10px;
  height: 90hv;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.content-image {
  width: 90%;
  height: auto;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 调整右侧容器样式 */
.top-right {
  background: rgb(255, 255, 255);
  padding: 15px;
  margin: 5px;
  height: 80%; /* 改为80%高度 */
  overflow-y: auto;
  margin: auto 0; /* 垂直居中 */
  border-radius: 20px;
}

.right-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-right: 100px;
  justify-content: center; /* 添加这行实现容器内的垂直居中 */
}

@media (max-width: 500px) {
  .section {
    flex-direction: column;
  }

  .left-container,
  .right-container {
    flex: none;
    width: 100%;
  }
}

.text-content1{
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
}

/* 网格容器样式 */
.content {
  display: flex;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  grid-template-rows: 1fr 1fr; /* 两行布局 */
  gap: 10px; /* 网格间距 */
  width: 100%; /* 宽度占满 */
  height: 100%; /* 高度占满父容器 */
}

/* ComponentA.vue */
button {
  margin: 1px 3px;
  padding: 8px 13px;
  cursor: pointer;
  border: none; /* 去除边框 */
  border-radius: 5px; /* 圆角边框 */
}
</style>