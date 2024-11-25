<!-- PieChartComponent.vue -->
<template>
  <div id="pie-chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PieChartComponent",
  props: {
    data: {
      type: Object, // 数据格式为年份为键的对象
      required: true,
    },
    year: {
      type: Number, // 当前年份
      required: true,
    },
    province: {
      type: String, // 当前选中的省份
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      isChartInitialized: false, // 标志位
    };
  },
  mounted() {
    console.log("Mounted: 当前接收的数据", this.data);
    console.log("Mounted: 当前年份", this.year);
    console.log("Mounted: 当前省份", this.province);
    this.initChart();
  },
  methods: {
    initChart() {
      if (!this.chart) {
        this.chart = echarts.init(document.getElementById("pie-chart"));
        this.isChartInitialized = true;
        this.updateChart(); // 初始化完成后更新图表
      }
    },
    updateChart() {
      if (!this.isChartInitialized) {
        console.error("PieChartComponent: 图表实例未初始化");
        return;
      }

      if (!this.data || !this.data[this.year]) {
        console.warn(`PieChartComponent: 年份 ${this.year} 的数据不可用`);
        return;
      }

      console.log("UpdateChart: 当前年份", this.year);
      console.log("UpdateChart: 当前省份", this.province);
      console.log("UpdateChart: 接收的数据", this.data);

      // 内圈：当年当前省份数据
      const currentYearData = this.data[this.year]?.pie?.find(
        (item) => item.name === this.province
      );
      const currentData = currentYearData?.value || [
        { value: 0, name: "第一产业" },
        { value: 0, name: "第二产业" },
        { value: 0, name: "第三产业" },
      ];

      if (!currentYearData) {
        console.warn(`未找到年份 ${this.year} 和省份 ${this.province} 的数据`);
      }

      // 配置图表
      const option = {
        title: {
          text: `产业结构 (${this.year}) - ${this.province}`,
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "当前年份",
            type: "pie",
            radius: ["30%", "50%"],
            center: ["50%", "60%"],
            data: currentData,
            label: {
              position: "inner",
              formatter: "{b}\n{d}%",
            },
          },
        ],
      };

      this.chart.setOption(option);
    },
    getColorByIndustry(name) {
      const colors = {
        "第一产业": "#bec936",
        "第二产业": "#c0c4c3",
        "第三产业": "#fcc307",
      };
      return colors[name] || "#cccccc";
    },
  },
  watch: {
    data: {
      handler(newVal) {
        if (this.isChartInitialized) {
          console.log("Watch: data 变化", newVal);
          this.updateChart();
        }
      },
      deep: true,
    },
    year(newVal) {
      if (this.isChartInitialized) {
        console.log("Watch: year 变化", newVal);
        this.updateChart();
      }
    },
    province(newVal) {
      if (this.isChartInitialized) {
        console.log("Watch: province 变化", newVal);
        this.updateChart();
      }
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
#pie-chart {
  width: 100%;
  height: 100%;
}
</style>
