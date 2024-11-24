<template>
  <div class="economy-overview">
    <!-- 左侧：中国地图 -->
    <div class="map-container">
      <GDPMap @provinceClick="handleProvinceClick" />
    </div>
    
    <!-- 右侧：省份信息和省份高亮地图 -->
    <div class="info-chart-container">
      <div class="province-info">
        <ProvinceMap v-if="selectedProvince.name" :provinceName="selectedProvince.name" />
        <h3 v-else>请选择省份</h3>
        <p v-if="selectedProvince.name">GDP总量: {{ selectedProvince.value || 'N/A' }} 亿元</p>
      </div>
      <div class="pie-chart">
        <PieChartComponent :data="selectedProvinceData" />
      </div>
    </div>
  </div>
</template>

<script>
import GDPMap from '../components/GDPMap.vue';
import ProvinceMap from '../components/ProvinceMap.vue';
import PieChartComponent from '../components/PieChartComponent.vue';

export default {
  name: 'EconomyOverview',
  components: {
    GDPMap,
    ProvinceMap,
    PieChartComponent,
  },
  data() {
    return {
      selectedProvince: {}, // 存储选中省份信息
      selectedProvinceData: [
        { value: 30, name: '第一产业' },
        { value: 40, name: '第二产业' },
        { value: 30, name: '第三产业' },
      ],
    };
  },
  methods: {
    handleProvinceClick(province) {
      // 更新选中省份的信息和数据
      this.selectedProvince = province;
      this.selectedProvinceData = [
        { value: province.primary || 30, name: '第一产业' },
        { value: province.secondary || 40, name: '第二产业' },
        { value: province.tertiary || 30, name: '第三产业' },
      ];
    },
  },
};
</script>

<style scoped>
.economy-overview {
  display: flex;
  height: 100%;
}

.map-container {
  flex: 2;
  padding: 10px;
}

.info-chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.province-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.pie-chart {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
</style>
