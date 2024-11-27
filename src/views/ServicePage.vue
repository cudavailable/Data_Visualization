<template>
  <div>
    <div class="section">
      <div class="left-container">
        <ServiceIndustryChart />
      </div>
      <div class="right-container">
        <div class="top-right">
          <h3>介绍及可视化分析</h3>
          <pre class="text-content1">     旅游消费成为人们日常生活的重要组成部分，无论是国内游还是出境游，都带动了酒店行业的蓬勃发展。商务出行的频率也不断增加，各类商务会议、展览活动等为酒店行业带来了稳定的客源。酒店行业的繁荣发展，带动了相关产业链的发展，如旅游景区、交通运输、餐饮娱乐等行业，形成了产业联动效应，进一步促进了第三产业的发展和 GDP 的增加。
          本视图使用气泡图，探索从2000年到2010年再到2020年各个省份现存酒店数量以及GDP，其中各省酒店数量使用绿色气泡的面积表示，各省GDP使用蓝色气泡的面积表示。从2000到2010年再到2020年，每十年将气泡半径缩小到以十年之前为基准的三分一。
          我们可以看到，总体而言，从2000年到2010年绿色圆圈的大小基本不变也就是总体来说这十年酒店数量半径为十年前三倍，面积则是十年前九倍，也就是酒店数量变为十年前九倍。而从图中可以看出，大部分蓝色气泡的大小略有增加，也就是大部分省份的气泡半径增加不止三倍，也就是GDP是是十年前的三倍以上。同理，点击2020年按钮可以发现，绿色气泡的面积略有缩小，蓝色气泡面积缩小幅度较大，说明2020年酒店数量略小于十年前九倍，而GDP值却远小于十年前三倍。     
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceIndustryChart from '../components/ServiceIndustryChart.vue';

export default {
  name: 'ServicePage',
  components: {
    ServiceIndustryChart
  }
};
</script>

<style scoped>
.section {
  display: flex;
  height: auto;
  background-color: #ffffff;
}

.left-container {

  flex: 1;
  background: rgb(255, 255, 255);
  padding: 10px;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-right {
  flex: 1;
  background: rgb(255, 255, 255);
  padding: 10px;
  margin: 5px;
  height: 100%;
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

</style>
