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
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      if (this.chart) {
        this.chart.dispose();
      }

      const chartDom = this.$refs.chart;
      if (!chartDom) {
        console.error("RiverChart: 容器未正确加载！");
        return;
      }

      this.chart = echarts.init(chartDom);
      
      if (this.gdpDataByYear && this.selectedProvince) {
        this.renderChart();
      }

      this.chart.on("click", this.handleChartClick);
      window.addEventListener("resize", this.handleResize);
    },

    handleChartClick(params) {
      if (params.componentType === 'series') {
        const clickedYear = parseInt(params.name, 10);
        if (!isNaN(clickedYear)) {
          this.$emit("yearChange", clickedYear);
        }
      } else if (params.componentType === 'xAxis') {
        const clickedYear = parseInt(params.value, 10);
        if (!isNaN(clickedYear)) {
          this.$emit("yearChange", clickedYear);
        }
      }
    },

    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },

    renderChart() {
      if (!this.chart || !this.gdpDataByYear || !this.selectedProvince) {
        return;
      }

      const years = Object.keys(this.gdpDataByYear)
        .map(Number)
        .filter((year) => year >= this.minYear && year <= this.maxYear)
        .sort((a, b) => a - b);

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

      const option = {
        title: {
          text: `${this.selectedProvince} ${this.year}年 三大产业 GDP 趋势图`,
          left: "center",
          top: "5%",
          textStyle: {
            color: '#fff'  // 设置标题文字颜色为白色
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            snap: true,
            label: {
              show: true,
              backgroundColor: '#fff',
              formatter: (params) => {
                return params.value + '年';
              }
            },
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid'
            }
          },
          formatter: (params) => {
            const year = params[0].name;
            let html = `<div style="padding: 3px 6px;">
              <div style="font-weight:bold;margin-bottom:8px;font-size:14px">${year}年</div>`;
            params.forEach(param => {
              const value = param.value || 0;
              const color = param.color;
              html += `<div style="display:flex;justify-content:space-between;margin:6px 0;align-items:center">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${color};margin-right:6px"></span>
                <span style="flex:1">${param.seriesName}:</span>
                <span style="font-weight:bold;margin-left:12px">${value.toFixed(2)}%</span>
              </div>`;
            });
            html += '</div>';
            return html;
          }
        },
        legend: {
          data: ['第一产业', '第二产业', '第三产业'],
          right: 20,  // 距离右侧的距离
          top: 20,    // 距离顶部的距离
          orient: 'vertical', // 垂直排列
          itemGap: 15, // 图例项之间的间距
          textStyle: {
            fontSize: 12, // 字体大小
            color: '#fff' // 字体颜色
          },
        },
        grid: {
          left: '0%',
          right: '10%',
          bottom: '15%',
          top: '25%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: years,
          axisLabel: {
            show: true,
            interval: 'auto',
            rotate: 45,
            formatter: '{value}年',
            fontSize: 12,
            color: '#fff'
          },
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#fff'
            }
          },
          axisPointer: {
            show: true,
            snap: true,
            label: {
              show: true,
              formatter: '{value}年'
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          axisLabel: {
            formatter: '{value}%',
            color: '#fff'
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#fff'
            }
          }
        },
        series: [
          {
            name: "第一产业",
            type: "line",
            stack: "总量",
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: true,
            emphasis: {
              focus: 'series',
              scale: true,
              blurScope: 'coordinateSystem'
            },
            triggerEvent: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgb(128, 255, 165)' },
                { offset: 1, color: 'rgb(1, 191, 236)' }
              ])
            },
            data: firstIndustryData
          },
          {
            name: "第二产业",
            type: "line",
            stack: "总量",
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: true,
            emphasis: {
              focus: 'series',
              scale: true,
              blurScope: 'coordinateSystem'
            },
            triggerEvent: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgb(0, 221, 255)' },
                { offset: 1, color: 'rgb(77, 119, 255)' }
              ])
            },
            data: secondIndustryData
          },
          {
            name: "第三产业",
            type: "line",
            stack: "总量",
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: true,
            emphasis: {
              focus: 'series',
              scale: true,
              blurScope: 'coordinateSystem'
            },
            triggerEvent: true,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgb(255, 191, 0)' },
                { offset: 1, color: 'rgb(224, 62, 76)' }
              ])
            },
            data: thirdIndustryData
          }
        ]
      };

      this.chart.setOption(option);
    },
  },
  watch: {
    gdpDataByYear: {
      handler(newVal) {
        if (newVal && this.selectedProvince) {
          this.$nextTick(() => this.renderChart());
        }
      },
      deep: true,
    },
    selectedProvince(newVal) {
      if (newVal && this.gdpDataByYear) {
        this.$nextTick(() => this.renderChart());
      }
    },
    year() {
      if (this.chart) {
        this.$nextTick(() => this.renderChart());
      }
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.river-chart-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>