<template>
  <div class="river-chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "RiverChartComponent",
  props: {
    year: {
      type: Number,
      required: true,
    },
    minYear: {
      type: Number,
      required: true,
    },
    maxYear: {
      type: Number,
      required: true,
    },
    gdpDataByYear: {
      type: Object,
      required: true,
    },
    selectedProvince: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // 初始化图表
    initChart() {
      const chartDom = this.$refs.chart;
      if (!chartDom) {
        console.error("RiverChart: 容器未正确加载！");
        return;
      }

      this.chart = echarts.init(chartDom);
      this.renderChart();
	  
	  // 监听点击事件：更新年份
	        this.chart.on("click", (params) => {
	          const clickedYear = params.name;
	          if (clickedYear) {
	            const selectedYear = parseInt(clickedYear, 10);
	            this.$emit("yearChange", selectedYear);
	          }
	        });

      // 自动适配窗口大小
      window.addEventListener("resize", () => {
        if (this.chart) {
          this.chart.resize();
        }
      });
    },

    // 计算颜色值的线性插值
    interpolateColor(min, max, value, startColor, endColor) {
      const ratio = (value - min) / (max - min);
      const startRGB = startColor.match(/\d+/g).map(Number); // 提取 RGB 数值
      const endRGB = endColor.match(/\d+/g).map(Number);

      const interpolated = startRGB.map((start, index) =>
        Math.round(start + ratio * (endRGB[index] - start))
      );

      return `rgba(${interpolated.join(",")})`;
    },

    // 生成每个产业的颜色数组
    generateColors(data, min, max, startColor, endColor) {
      return data.map((value) =>
        this.interpolateColor(min, max, value, startColor, endColor)
      );
    },

    // 渲染图表
    renderChart() {
      if (!this.chart) {
        console.warn("RiverChart: 图表实例未初始化！");
        this.initChart();
        return;
      }

      if (!this.gdpDataByYear || !this.selectedProvince) {
        console.error("数据或省份未加载！");
        return;
      }

      const years = Object.keys(this.gdpDataByYear)
        .map(Number)
        .filter((year) => year >= this.minYear && year <= this.maxYear)
        .sort((a, b) => a - b);

      // 提取每年每个产业的数据
      const firstIndustryData = years.map((year) => {
        const provinceData = this.gdpDataByYear[year]?.pie?.find(
          (item) => item.name === this.selectedProvince
        );
        return provinceData?.value?.find((industry) => industry.name === "第一产业")?.value || 0;
      });

      const secondIndustryData = years.map((year) => {
        const provinceData = this.gdpDataByYear[year]?.pie?.find(
          (item) => item.name === this.selectedProvince
        );
        return provinceData?.value?.find((industry) => industry.name === "第二产业")?.value || 0;
      });

      const thirdIndustryData = years.map((year) => {
        const provinceData = this.gdpDataByYear[year]?.pie?.find(
          (item) => item.name === this.selectedProvince
        );
        return provinceData?.value?.find((industry) => industry.name === "第三产业")?.value || 0;
      });

      // 动态计算每个产业的颜色范围
      const firstRange = [Math.min(...firstIndustryData), Math.max(...firstIndustryData)];
      const secondRange = [Math.min(...secondIndustryData), Math.max(...secondIndustryData)];
      const thirdRange = [Math.min(...thirdIndustryData), Math.max(...thirdIndustryData)];

      // 动态生成颜色数组
      const firstColors = this.generateColors(
        firstIndustryData,
        firstRange[0],
        firstRange[1],
        "rgba(165, 212, 115, 1)", // 起始颜色
        "rgba(103, 194, 58, 1)" // 结束颜色
      );
      const secondColors = this.generateColors(
        secondIndustryData,
        secondRange[0],
        secondRange[1],
        "rgba(144, 147, 153, 1)", // 起始颜色
        "rgba(188, 188, 193, 1)" // 结束颜色
      );
      const thirdColors = this.generateColors(
        thirdIndustryData,
        thirdRange[0],
        thirdRange[1],
        "rgba(230, 162, 60, 1)", // 起始颜色
        "rgba(236, 196, 141, 1)" // 结束颜色
      );
	  
      const option = {
        title: {
          text: `${this.selectedProvince} ${this.year}年 三大产业 GDP 趋势图`,
          left: "center",
          top: "10%",
        },
        tooltip: {
          trigger: "item",
          formatter: (params) => {
            const yearIndex = params.dataIndex;
            const year = years[yearIndex];
            const first = firstIndustryData[yearIndex] || 0;
            const second = secondIndustryData[yearIndex] || 0;
            const third = thirdIndustryData[yearIndex] || 0;
            return `
              <b>${year} 年</b><br/>
              第一产业: ${first}%<br/>
              第二产业: ${second}%<br/>
              第三产业: ${third}%<br/>
            `;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "25%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: years,
          axisLabel: {
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          max: 100,
        },
        series: [
          {
            name: "第一产业",
            type: "bar",
            stack: "总量",
            data: firstIndustryData,
            itemStyle: {
              color: (params) => firstColors[params.dataIndex],
            },
          },
          {
            name: "第二产业",
            type: "bar",
            stack: "总量",
            data: secondIndustryData,
            itemStyle: {
              color: (params) => secondColors[params.dataIndex],
            },
          },
          {
            name: "第三产业",
            type: "bar",
            stack: "总量",
            data: thirdIndustryData,
            itemStyle: {
              color: (params) => thirdColors[params.dataIndex],
            },
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
  watch: {
    gdpDataByYear: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
    selectedProvince() {
      this.renderChart();
    },
    year() {
      this.renderChart();
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.resizeChart);
  },
};
</script>

<style scoped>
.river-chart-container {
  width: 100%;
  height: 100%;
}
.chart {
  width: 100%;
  height: 150%;
}
</style>
