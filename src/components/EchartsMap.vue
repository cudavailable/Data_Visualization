<!-- EchartsMap.vue -->
<template>
  <div ref="echartsContainer" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "EchartsMap",
  props: {
    data: {
      type: Object,
      required: true, // GeoJSON for the province
    },
    color: {
      type: String,
      default: "#ef632b", // 默认颜色
    },
  },
  data() {
    return {
      chart: null,
      mapName: "selectedProvince", // 可考虑根据省份动态命名
      isChartInitialized: false, // 标志位，表示图表是否已初始化
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.data) {
        this.initChart();
      }
    });
  },
  watch: {
    data: {
        handler(newVal) {
          if (newVal) {
            if (this.isChartInitialized) {
              this.updateMap();
            } else {
              this.$nextTick(() => {
                this.initChart();
              });
            }
          }
        },
        immediate: true,
        deep: true,
      },
    color() {
      if (this.isChartInitialized) {
        this.updateMap();
      }
    },
  },
  methods: {
    initChart() {
      const container = this.$refs.echartsContainer;
      if (!container) {
        console.error("ECharts 容器未正确加载！");
        return;
      }

      this.chart = echarts.init(container);

      // 注册地图
      try {
        echarts.registerMap(this.mapName, this.data);
        console.log("EchartsMap: 地图注册成功");
      } catch (error) {
        console.error("EchartsMap: 注册地图时出错:", error);
      }

      this.isChartInitialized = true; // 设置标志位为 true

      this.setOption();

      window.addEventListener("resize", this.chart.resize);
      console.log("EchartsMap: 图表初始化成功！");
    },
    updateMap() {
      if (!this.isChartInitialized) {
        console.error("ECharts 实例未初始化！");
        return;
      }

      // 重新注册地图（如果需要）
      try {
        echarts.registerMap(this.mapName, this.data);
        console.log("EchartsMap: 地图重新注册成功");
      } catch (error) {
        console.error("EchartsMap: 重新注册地图时出错:", error);
      }

      this.setOption();
    },
    setOption() {
      const option = {
        tooltip: { trigger: "item", formatter: "{b}" },
        series: [
          {
            type: "map",
            map: this.mapName,
            roam: true,
            data: [], // 确保 'data' 被提供，哪怕是空数组
            itemStyle: {
              areaColor: this.color, // 使用传入的颜色
              borderColor: "#ccc",
            },
            emphasis: {
              itemStyle: {
                areaColor: this.color, // 鼠标悬停颜色
              },
            },
          },
        ],
      };

      // 调试：打印 option 对象
      console.log("EchartsMap: ECharts Option:", option);

      this.chart.setOption(option, true); // 第二个参数为 true 表示不合并之前的配置
      this.chart.resize();
      console.log("EchartsMap: 地图已更新");
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
      console.log("EchartsMap: 图表已销毁");
    }
    window.removeEventListener("resize", this.chart?.resize);
  },
};
</script>

<style scoped>
div[ref="echartsContainer"] {
  width: 100%;
  height: 100%;
}
</style>
