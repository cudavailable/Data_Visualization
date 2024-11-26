<template>
  <div ref="chartContainer" style="width: 100%; height: 600px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'SunburstChart',
  mounted() {
    this.initChart();
  },
  methods: {
  initChart() {
    const chart = echarts.init(this.$refs.chartContainer);

    const option = {
      title: {
        text: '中国农业九大分区',
        left: 'center',
        top: '4%',  
      },
      series: {
        type: 'sunburst',
        data: [
          {
            name: '北方半干旱区',
            itemStyle: { color: '#FDEBAA' },
            children: [
              { name: '新疆', value: 1, itemStyle: { color: '#FDEBAA' } },
              { name: '甘肃省', value: 1, itemStyle: { color: '#FDEBAA' } },
              { name: '宁夏', value: 1, itemStyle: { color: '#FDEBAA' } },
              { name: '内蒙古自治区', value: 1, itemStyle: { color: '#FDEBAA' } },
            ],
          },
          {
            name: '东北平原区',
            itemStyle: { color: '#EDC3A5' },
            children: [
              { name: '黑龙江省', value: 1, itemStyle: { color: '#EDC3A5' } },
              { name: '吉林省', value: 1, itemStyle: { color: '#EDC3A5' } },
              { name: '辽宁省', value: 1, itemStyle: { color: '#EDC3A5' } },
            ],
          },
          {
            name: '华南区',
            itemStyle: { color: '#DBE4FB' },
            children: [
              { name: '广东省', value: 1, itemStyle: { color: '#DBE4FB' } },
              { name: '福建省', value: 1, itemStyle: { color: '#DBE4FB' } },
              { name: '海南省', value: 1, itemStyle: { color: '#DBE4FB' } },
            ],
          },
          {
            name: '黄淮海平原区',
            itemStyle: { color: '#ABD1BC' },
            children: [
              { name: '北京市', value: 1, itemStyle: { color: '#ABD1BC' } },
              { name: '天津市', value: 1, itemStyle: { color: '#ABD1BC' } },
              { name: '河北省', value: 1, itemStyle: { color: '#ABD1BC' } },
              { name: '山东省', value: 1, itemStyle: { color: '#ABD1BC' } },
              { name: '河南省', value: 1, itemStyle: { color: '#ABD1BC' } },
            ],
          },
          {
            name: '黄土高原区',
            itemStyle: { color: '#E3BBED' },
            children: [
              { name: '山西省', value: 1, itemStyle: { color: '#E3BBED' } },
              { name: '陕西省', value: 1, itemStyle: { color: '#E3BBED' } },
            ],
          },
          {
            name: '青藏高原区',
            itemStyle: { color: '#CCCC99' },
            children: [
              { name: '西藏', value: 1, itemStyle: { color: '#CCCC99' } },
              { name: '青海', value: 1, itemStyle: { color: '#CCCC99' } },
            ],
          },
          {
            name: '川渝地区',
            itemStyle: { color: '#F1F1F1' },
            children: [
              { name: '四川省', value: 1, itemStyle: { color: '#F1F1F1' } },
              { name: '重庆市', value: 1, itemStyle: { color: '#F1F1F1' } },
            ],
          },
          {
            name: '云贵高原区',
            itemStyle: { color: '#BED0F9' },
            children: [
              { name: '云南省', value: 1, itemStyle: { color: '#BED0F9' } },
              { name: '贵州省', value: 1, itemStyle: { color: '#BED0F9' } },
              { name: '广西', value: 1, itemStyle: { color: '#BED0F9' } },
            ],
          },
          {
            name: '长江中下游地区',
            itemStyle: { color: '#FCB6A5' },
            children: [
              { name: '江苏省', value: 1, itemStyle: { color: '#FCB6A5' } },
              { name: '上海市', value: 1, itemStyle: { color: '#FCB6A5' } },
              { name: '浙江省', value: 1, itemStyle: { color: '#FCB6A5' } },
              { name: '安徽省', value: 1, itemStyle: { color: '#FCB6A5' } },
              { name: '湖北省', value: 1, itemStyle: { color: '#FCB6A5' } },
              { name: '湖南省', value: 1, itemStyle: { color: '#FCB6A5' } },
              { name: '江西省', value: 1, itemStyle: { color: '#FCB6A5' } },
            ],
          },
        ],
        radius: ['10%', '80%'],
        label: {
          rotate: 'radial',
        },
        nodeClick: 'none', // 禁止点击下钻
      },
    };

      chart.setOption(option);

      // 添加点击事件
      chart.on('click', (params) => {
        if (params.name) {
          // 判断是否点击的是省份或区域
          const isProvince = this.isProvince(params.name);
          if (isProvince) {
            this.$emit('province-clicked', params.name);  // 点击省份时
          } else {
            this.$emit('region-clicked', params.name);  // 点击区域时
          }
        }
      });
    },
    isProvince(name) {
      // 判断名字是否为省份名称（可以通过正则匹配、名称列表等方式判断）
      const provinces = ['新疆', '甘肃省', '宁夏', '内蒙古自治区', '黑龙江省', '吉林省', '辽宁省', '广东省', '福建省', '海南省', '北京市', '天津市', '河北省', '山东省', '河南省', '山西省', '陕西省', '西藏', '青海', '四川省', '重庆市', '云南省', '贵州省', '广西', '江苏省', '上海市', '浙江省', '安徽省', '湖北省', '湖南省', '江西省'];
      return provinces.includes(name);
    },
  },
};
</script>
