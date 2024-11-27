<template>
  <div>
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import productData from '../assets/product.json';

export default {
  name: 'AgriculturalStackedChart',
  props: {
    province: {
      type: String,
      default: '北京市', // 默认显示北京市
    },
  },
  watch: {
    province: {
      immediate: true, // 初始化时触发
      handler(newProvince) {
        this.updateChart(newProvince);
      },
    },
  },
  data() {
    return {
      chart: null, // 保存图表实例
    };
  },
  mounted() {
    this.initChart();
    this.$nextTick(() => {
      if (this.chart) {
        this.updateChart(this.province); // 确保图表初始化后再更新
      }
    });
  },
  methods: {
    initChart() {
      const chartContainer = this.$refs.chartContainer;
      if (chartContainer) {
        this.chart = echarts.init(chartContainer);
      } else {
        console.error('Chart container not found.');
      }
    },
    updateChart(province) {
      if (!this.chart) {
        console.warn('Chart instance not ready, retrying...');
        this.$nextTick(() => this.updateChart(province));
        return;
      }

      const provinceData = productData[province];
      if (!provinceData || Object.keys(provinceData).length === 0) {
        console.error(`No data found for province: ${province}`);
        return;
      }

      const years = Object.keys(provinceData).sort((a, b) => a - b); // 按年份从小到大排序
      const cornData = years.map((year) => provinceData[year]['玉米产量(万吨)']);
      const wheatData = years.map((year) => provinceData[year]['小麦产量(万吨)']);
      const riceData = years.map((year) => provinceData[year]['稻谷产量(万吨)']);
      const fruitData = years.map((year) => provinceData[year]['水果产量(万吨)']);
      const meatData = years.map((year) => provinceData[year]['肉类产量(万吨)']);
      const seafoodData = years.map((year) => provinceData[year]['水产品总产量(万吨)']);

      const option = {
        color: ['#FDEBAA', '#DBE4FB', '#ABD1BC', '#FCB6A5', '#BED0F9', '#E3BBED'],
        title: {
          text: `${province}历年农产品产量`,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' },
          formatter: (params) => {
            let result = `${params[0].axisValueLabel}年<br/>`;
            params.forEach((item) => {
              result += `${item.marker} ${item.seriesName}: ${item.value} 万吨<br/>`;
            });
            return result;
          },
        },
        legend: {
          data: ['玉米', '小麦', '稻谷', '水果', '肉类', '水产品'],
          bottom: '0%',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: years,
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value} 万吨' },
        },
        series: [
          { name: '玉米', type: 'line', stack: 'Total', data: cornData, areaStyle: {} },
          { name: '小麦', type: 'line', stack: 'Total', data: wheatData, areaStyle: {} },
          { name: '稻谷', type: 'line', stack: 'Total', data: riceData, areaStyle: {} },
          { name: '水果', type: 'line', stack: 'Total', data: fruitData, areaStyle: {} },
          { name: '肉类', type: 'line', stack: 'Total', data: meatData, areaStyle: {} },
          { name: '水产品', type: 'line', stack: 'Total', data: seafoodData, areaStyle: {} },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 90%;
  height: 300px;
  margin-top: 120px;
}
</style>
