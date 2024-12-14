<template>
  <div class="section">
    <!-- 切换按钮 -->
    <button class="toggle-btn" @click="toggleGroup">
      {{ currentGroup === 1 ? "切换到视图 2" : "切换到视图 1" }}
    </button>

    <!-- 内容容器 -->
    <div class="content-container">
      <!-- 左侧视图方框 -->
      <div class="box view-box">
        <component :is="currentGroup === 1 ? 'Echarts2' : 'Echarts3'" />
      </div>

      <!-- 右侧说明文字方框 -->
      <div class="box text-box">
        <div v-if="currentGroup === 1">
          <h2>数字经济——创新驱动的新时代</h2>
          <p>
            随着数字化转型的深入，数字经济正在成为全球经济增长的重要引擎。
            左图展示了2019年—2023年数字经济重点行业同比增速变化情况（数据来源：工业和信息化部）。
          </p>
          <p>
            由图可见，以上四个指标在2021年的同比增长达到最大，之后两年增速明显放缓。
            以下是具体分析：
          </p>
          <p>
            电子信息制造业增加值和电信业务收入的同比增长在2021年达到高峰，
            可能是因为疫情期间居家办公和在线活动增加，远程交流的需求增多，带动相关电子产品制造。
            而在2022年之后下降，可能是因为疫情影响逐渐减弱，消费需求增速放缓，
            加之国际关系紧张可能导致芯片出口限制；
          </p>
          <p>
            互联网业务收入和软件业务收入的同比增长整体在2021达到峰值，原因与前两者类似。
            在2022年，软件业务收入同比增长率为-1.1%，可能是疫情接近末尾，因疫情而产生的需求消退的同时，宏观经济又不太景气。
          </p>
        </div>
        <div v-else>
          <h2>数字经济对GDP的贡献</h2>
          <p>
            左图展示了2019年—2023年数字经济占三大产业及总GDP的比率（数据来源：中国信通院）。
          </p>
          <p>
            不同颜色的柱形代表数字经济对三大产业或总GDP的渗透情况。
          </p>
          <p>
            由图可见，数字经济在三大产业及总GDP的占比在近5年中逐年递增，数字经济已成为经济增长的新引擎。
            更具体地，可以发现GDP从第一产业到第三产业，数字经济的渗透率在逐渐提升。
          </p>
          <p>
            渗透率最高的是第三产业，在2023年渗透率已超过45%。
            这可能因为第三产业本身的信息密集特性、高度的线上化适配性、广泛的应用场景以及政策与市场的共同驱动。
            相比之下，第一、第二产业由于存在较多的物理生产环节和技术瓶颈，数字化渗透的速度相对较慢。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts2 from "../components/Echarts2.vue";
import Echarts3 from "../components/Echarts3.vue";

export default {
  name: "DigitalEconomyPage",
  components: {
    Echarts2,
    Echarts3,
  },
  data() {
    return {
      currentGroup: 1, // 当前组合的标识
    };
  },
  methods: {
    toggleGroup() {
      // 切换组合
      this.currentGroup = this.currentGroup === 1 ? 2 : 1;
    },
  },
};
</script>

<style scoped>
/* 页面整体样式 */
.section {
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 上方对齐 */
  padding: 20px;
  box-sizing: border-box;
}

/* 切换按钮样式 */
.toggle-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn:hover {
  background-color: #0056b3;
}

/* 内容容器样式 */
.content-container {
  display: flex;
  flex-direction: row; /* 左右布局 */
  gap: 20px; /* 方框之间的间距 */
  width: 90%;
  height: 80%;
  margin-bottom: 20px; /* 留出下边界距离 */
  box-sizing: border-box; /* 确保边框内的布局正确 */
}

/* 左右方框样式 */
.box {
  flex: 1; /* 左右方框各占一半空间 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* 留出下边界距离 */
  box-sizing: border-box; /* 确保边框内的布局正确 */
}

/* 左侧视图方框 */
.view-box {
  min-height: 350px; /* 防止高度过小 */
}

/* 右侧文字方框 */
.text-box {
  min-height: 350px; /* 防止高度过小 */
  text-align: left;
}

.text-box h2 {
  margin: 0 0 10px;
  margin-bottom: 20px; /* 标题与段落的间距 */
  font-size: 24px;
  color: #333;
}

.text-box p {
  margin-bottom: 16px;
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}
</style>
