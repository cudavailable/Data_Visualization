<template>
  <div class="economy-overview">
    <!-- 上方区域 -->
    <div class="top-container">
      <!-- 左侧 GDPMap -->
      <div class="map-container">
        <GDPMap
          :data="mapData"
          :year="selectedYear"
          @provinceClick="handleProvinceClick"
          @provinceColor="handleProvinceColor"
          @provinceMapData="handleProvinceMapData"
        />
      </div>

      <!-- 右侧内容 -->
      <div class="right-container">
        <!-- 省份地图 -->
        <div class="province-info">
          <EchartsMap
            :data="selectedProvinceMap"
            :color="selectedProvinceColor"
          />
        </div>

        <!-- 饼图 -->
        <div class="pie-chart-container">
          <PieChartComponent
            :data="gdpDataByYear"
            :year="selectedYear"
            :province="selectedProvinceName"
          />
        </div>
      </div>
    </div>

    <!-- 底部河流图 -->
    <div class="footer">
      <RiverChartComponent
        ref="riverChart"
        :year="selectedYear"
        :minYear="minYear"
        :maxYear="maxYear"
        :gdpDataByYear="gdpDataByYear"
        :selectedProvince="selectedProvinceName"
        @yearChange="handleYearChange"
      />
    </div>
  </div>
</template>


<script>
import GDPMap from "../components/GDPMap.vue";
import PieChartComponent from "../components/PieChartComponent.vue";
import EchartsMap from "../components/EchartsMap.vue";
import RiverChartComponent from "../components/RiverChartComponent.vue";

export default {
  name: "EconomyOverview",
  components: {
    GDPMap,
    PieChartComponent,
    EchartsMap,
    RiverChartComponent,
  },
  data() {
    return {
      selectedProvinceName: "四川省", // 默认省份
      selectedProvinceMap: null,
      selectedProvinceColor: "#ef632b",
      selectedYear: 2022, // 默认年份
      minYear: 1952,
      maxYear: 2022,
      gdpDataByYear: {}, // GDP 数据
      mapData: [], // 地图展示数据
      isDataLoaded: false, // 数据加载完成标志
    };
  },
  mounted() {
    this.loadGDPData(); // 加载初始 GDP 数据
  },
  methods: {
    async loadGDPData() {
      try {
        const response = await fetch("/src/assets/gdpDataByYear.json");
        if (!response.ok) throw new Error("无法加载 GDP 数据！");
        const data = await response.json();
        console.log("Loaded GDP Data:", data);
        this.gdpDataByYear = data;

        // 检查默认年份的数据是否存在
        if (!this.gdpDataByYear[this.selectedYear]) {
          console.error(`默认年份 ${this.selectedYear} 的数据不存在！`);
        } else {
          this.updateDataByYear(this.selectedYear); // 初始化默认年份数据
        }
      } catch (error) {
        console.error("加载 GDP 数据时出错:", error);
      } finally {
        this.isDataLoaded = true; // 数据加载完成
        console.log("EconomyOverview: 数据加载完成，子组件已渲染");
		this.loadProvinceMap(this.selectedProvinceName);
      }
    },
    updateDataByYear(year) {
      const yearData = this.gdpDataByYear[year];
      if (yearData) {
        this.mapData = yearData.map; // 更新地图数据
        console.log(`Map data updated for year ${year}:`, this.mapData);
      } else {
        console.error(`未找到 ${year} 年的 GDP 数据`);
      }
    },
    handleYearChange(newYear) {
      this.selectedYear = newYear; // 更新选中的年份
      this.updateDataByYear(newYear);
      console.log(`EconomyOverview: 年份变化为 ${newYear}`);
    },
    handleProvinceClick(provinceName) {
      this.selectedProvinceName = provinceName;
      this.loadProvinceMap(provinceName);
      console.log(`EconomyOverview: Province clicked: ${provinceName}`);
    },
    handleProvinceMapData(geoJSON) {
      this.selectedProvinceMap = geoJSON;
    },
    handleProvinceColor({ name, color }) {
      if (name === this.selectedProvinceName) {
        this.selectedProvinceColor = color;
      }
    },
    loadProvinceMap(provinceName) {
      const fileName = this.getFileName(provinceName);
      if (!fileName) {
        console.error(`EconomyOverview: 未找到 ${provinceName} 的文件映射`);
        return;
      }

      const provinceMapFile = `/src/assets/provinces/${fileName}.json`;
      fetch(provinceMapFile)
        .then((response) => {
          if (!response.ok) throw new Error(`文件 ${fileName} 不存在`);
          return response.json();
        })
        .then((geoJSON) => {
          this.selectedProvinceMap = geoJSON;
          console.log(`EconomyOverview: Loaded map data for ${provinceName}`);
        })
        .catch((error) => {
          console.error(`EconomyOverview: 加载 ${provinceName} 地图数据时出错:`, error);
        });
    },
    getFileName(provinceName) {
      const mapping = {
        北京市: "beijing",
        上海市: "shanghai",
        天津市: "tianjin",
        重庆市: "chongqing",
        河北省: "hebei",
        山西省: "shanxi",
        内蒙古自治区: "neimeng",
        辽宁省: "liaoning",
        吉林省: "jilin",
        黑龙江省: "heilongjiang",
        江苏省: "jiangsu",
        浙江省: "zhejiang",
        安徽省: "anhui",
        福建省: "fujian",
        江西省: "jiangxi",
        山东省: "shandong",
        河南省: "henan",
        湖北省: "hubei",
        湖南省: "hunan",
        广东省: "guangdong",
        广西壮族自治区: "guangxi",
        海南省: "hainan",
        四川省: "sichuan",
        贵州省: "guizhou",
        云南省: "yunnan",
        西藏自治区: "xizang",
        陕西省: "shanxi2",
        甘肃省: "gansu",
        青海省: "qinghai",
        宁夏回族自治区: "ningxia",
        新疆维吾尔自治区: "xinjiang",
        香港特别行政区: "xianggang",
        澳门特别行政区: "aomen",
        台湾省: "taiwan",
      };
      return mapping[provinceName] || "";
    },
  },
};
</script>

<style scoped>
.economy-overview {
  flex-direction: column;
  height: 90vh; /* 整个屏幕高度 */
  width: 100%;
  background-color: #fff6f0;
  margin: 0; /* 去除外边距 */
  padding: 0; /* 去除内边距 */
  overflow: hidden; /* 防止内容溢出 */
  box-sizing: border-box; /* 确保边框和内边距不影响宽高 */
}

.top-container {
  display: flex;
  height: 70%; /* 上方区域占屏幕的 65% */
  box-sizing: border-box;
}

.map-container {
  flex: 3; /* 左侧 GDPMap 占 3/5 宽度 */
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.right-container {
  flex: 2; /* 右侧内容占 2/5 宽度 */
  display: flex;
  flex-direction: column;
}

.province-info {
  flex: 1; /* 省份地图占右侧竖向 1/3 */
  background-color: #ee7b7b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-chart-container {
  flex: 2; /* 饼图占右侧竖向 2/3 */
  background-color: #FADFA1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  height: 20%; /* 底部河流图占屏幕的 35% */
  background-color: #FFF4EA;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

</style>
