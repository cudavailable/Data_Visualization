<template>
  <div class="map-container">
    <h2 class="map-title">时间长河中的跃迁——1952-2023年中国经济全景</h2>
    <div id="gdp-map" class="map"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import chinaMap from '../assets/china.json';

export default {
  name: 'GDPMap',
  mounted() {
    echarts.registerMap('china', chinaMap); // 注册中国地图
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(document.getElementById('gdp-map'));

      const option = {
        tooltip: { trigger: 'item', formatter: '{b}: {c} (亿元)' },
        visualMap: {
          min: 0,
          max: 100000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          inRange: { color: ['#e0f7fa', '#006064'] }, // 使用柔和的颜色从浅蓝到深蓝
          show: true,
        },
        series: [
          {
            name: 'GDP',
            type: 'map',
            map: 'china',
            roam: true, // 允许地图缩放和平移
            label: {
              show: true,
              color: '#333', // 标签文字颜色
            },
            emphasis: {
              itemStyle: {
                areaColor: '#ffb74d', // 高亮颜色
              },
            },
            data: [
              { name: '北京', value: 36102 },
              { name: '上海', value: 38700 },
              { name: '广东', value: 110760 },
              // 更多省份的数据
            ],
          },
        ],
      };

      chart.setOption(option);

      // 添加点击事件
      chart.on('click', (params) => {
        this.$emit('provinceClick', {
          name: params.name,
          value: params.value,
          primary: 20,   // 假设第一产业占比
          secondary: 50, // 假设第二产业占比
          tertiary: 30,  // 假设第三产业占比
        });
      });

      // 窗口大小变化时自适应
      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
  },
  beforeDestroy() {
    // 移除 resize 事件监听
    window.removeEventListener('resize', this.chart?.resize);
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  padding: 20px; /* 给容器增加内边距，让内容不贴近边缘 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-title {
  font-size: 24px; /* 标题字体大小 */
  font-weight: bold;
  color: #333; /* 标题颜色 */
  margin-bottom: 20px; /* 标题与地图之间的距离 */
  text-align: center;
}

.map {
  width: 100%;
  height: calc(100% - 60px); /* 留出一些空间用于标题 */
  max-width: 1200px; /* 限制地图的最大宽度，避免过大 */
  margin: 0 auto;
}
</style>
