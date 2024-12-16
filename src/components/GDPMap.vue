<template>
  <div class="map-container">
    <h2 class="map-title">中国各省GDP分布</h2>
    <div id="gdp-map" class="map"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import clustersData from "@/assets/clusters.json";
// import chinaMapPath from "@/assets/china.json";
import chinaGeoJSON from "@/assets/china.json";

export default {
  name: "GDPMap",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    year: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chart: null, // 保存图表实例
      isChartInitialized: false, // 标志位，表示图表是否已初始化
      provinceFileMap: {
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
      },
      colorPalette: {
        0: ["#744d5c", "#740938"],
        1: ["#af6c95", "#AF1740"],
        2: ["#cc80a7", "#CC2B52"],
        3: ["#dec2cb", "#DE7C7D"],
      },
      clusterRanges: {},
    };
  },
  mounted() {
    // 确保 DOM 渲染完成后初始化
    this.loadChinaMap();
  },
  watch: {
    data: {
      immediate: true,
      handler(newData) {
        if (this.isChartInitialized) {
          this.updateMap(newData);
        }
      },
    },
    year(newYear) {
      if (this.isChartInitialized) {
        this.updateMap(this.data);
      }
    },
  },
  methods: {
    // 加载中国地图数据
    loadChinaMap() {
      try {
        echarts.registerMap("china", chinaGeoJSON);
        this.initChart();
      } catch (error) {
        console.error("加载中国地图数据时出错:", error);
      }
    },
    // loadChinaMap() {
    //   fetch(chinaMapPath)
    //     .then((response) => response.json())
    //     .then((geoJSON) => {
    //       echarts.registerMap("china", geoJSON);
    //       this.initChart();
    //     })
    //     .catch((error) => {
    //       console.error("加载中国地图数据时出错:", error);
    //     });
    // },
    // 初始化图表
    initChart() {
      const mapContainer = document.getElementById("gdp-map");
      if (!mapContainer) {
        console.error("GDPMap: 容器未正确加载！");
        return;
      }
      if (this.chart) {
        this.chart.dispose(); // 防止重复初始化
      }
      this.chart = echarts.init(mapContainer);
      this.isChartInitialized = true; // 设置标志位为 true

      const option = {
        tooltip: { trigger: "item", formatter: "{b}: {c} (亿元)" },
        series: [
          {
            name: "GDP",
            type: "map",
            map: "china",
            roam: true,
            label: { show: false },
            emphasis: {
              itemStyle: {
                areaColor: "#ffb74d",
              },
            },
            data: [],
          },
        ],
      };

      this.chart.setOption(option);

      // this.chart.on("click", (params) => {
      //   const provinceName = params.name;
      //   const fileName = this.provinceFileMap[provinceName];

      //   if (!fileName) {
      //     console.error(`无法找到 ${provinceName} 的文件映射`);
      //     return;
      //   }

      //   const provinceData = this.chart
      //     .getOption()
      //     .series[0].data.find((item) => item.name === provinceName);
      //   const provinceColor = provinceData
      //     ? provinceData.itemStyle?.areaColor || "#CCCCCC"
      //     : "#CCCCCC";

      //   // 使用动态 `import` 加载 JSON 数据
      //   import(/* @vite-ignore */ `@/assets/provinces/${fileName}.json`)
      //     .then((provinceGeoJSON) => {
      //       // 触发事件并传递数据
      //       this.$emit("provinceClick", provinceName);
      //       this.$emit("provinceMapData", provinceGeoJSON);
      //       this.$emit("provinceColor", {
      //         name: provinceName,
      //         color: provinceColor,
      //       });
      //     })
      //     .catch((error) => {
      //       console.error(`加载 ${provinceName} 地图数据时出错:`, error);
      //     });
      // });

      this.chart.on("click", (params) => {
        const provinceName = params.name;
        const fileName = this.provinceFileMap[provinceName];

        if (!fileName) {
          console.error(`无法找到 ${provinceName} 的文件映射`);
          return;
        }

        const provinceData = this.chart
          .getOption()
          .series[0].data.find((item) => item.name === provinceName);
        const provinceColor = provinceData
          ? provinceData.itemStyle?.areaColor || "#CCCCCC"
          : "#CCCCCC";

        const provinceFile =`/assets/provinces/${fileName}.json`;
        fetch(provinceFile)
          .then((response) => {
            if (!response.ok) throw new Error(`文件 ${fileName} 不存在`);
            return response.json();
          })
          .then((provinceGeoJSON) => {
            this.$emit("provinceClick", provinceName);
            this.$emit("provinceMapData", provinceGeoJSON);
            this.$emit("provinceColor", {
              name: provinceName,
              color: provinceColor,
            });
          })
          .catch((error) => {
            console.error(`加载 ${provinceName} 地图数据时出错:`, error);
          });
      });

      window.addEventListener("resize", () => {
        this.chart.resize();
      });

      // 初始化完成后更新地图
      this.updateMap(this.data);
    },
    // 更新地图数据
    updateMap(data) {
      if (!this.isChartInitialized) {
        console.error("GDPMap: 图表未初始化！");
        return;
      }

      console.log("Updating map with data:", data);
      console.log("Clusters Data for year:", this.year, clustersData[this.year]);

      this.calculateClusterRanges(data);

      this.chart.setOption({
        series: [
          {
            data: data.map((item) => ({
              ...item,
              itemStyle: {
                areaColor: this.getColorForProvince(item),
              },
            })),
          },
        ],
      });

      console.log("Map updated for year:", this.year);
    },
    // 计算每个聚类的范围
    calculateClusterRanges(data) {
      this.clusterRanges = {
        0: { min: Infinity, max: -Infinity },
        1: { min: Infinity, max: -Infinity },
        2: { min: Infinity, max: -Infinity },
        3: { min: Infinity, max: -Infinity },
      };

      data.forEach((item) => {
        const province = item.name;
        const gdpValue = item.value;
        const cluster = clustersData[this.year]?.[province]?.GDP_Cluster;

        if (cluster === undefined) return;

        this.clusterRanges[cluster].min = Math.min(
          this.clusterRanges[cluster].min,
          gdpValue
        );
        this.clusterRanges[cluster].max = Math.max(
          this.clusterRanges[cluster].max,
          gdpValue
        );
      });

      for (const cluster in this.clusterRanges) {
        if (this.clusterRanges[cluster].min === Infinity) {
          this.clusterRanges[cluster].min = 0;
        }
        if (this.clusterRanges[cluster].max === -Infinity) {
          this.clusterRanges[cluster].max = 0;
        }
      }
    },
    // 获取省份颜色
    getColorForProvince(item) {
      const province = item.name;

      if (province === "中国") {
        return "#CCCCCC";
      }

      const cluster = clustersData[this.year]?.[province]?.GDP_Cluster;

      if (cluster === undefined) {
        console.warn(`未找到 ${this.year} 年 ${province} 的 GDP_Cluster 数据`);
        return "#CCCCCC";
      }

      const colorRange = this.colorPalette[cluster];
      const gdpValue = item.value;

      return this.getGradientColorInCluster(gdpValue, colorRange, cluster);
    },
    // 计算颜色梯度
    getGradientColorInCluster(value, colorRange, cluster) {
      const clusterMin = this.clusterRanges[cluster].min;
      const clusterMax = this.clusterRanges[cluster].max;
      const percent =
        clusterMax === clusterMin
          ? 0
          : (value - clusterMin) / (clusterMax - clusterMin);
      return echarts.color.lerp(percent, colorRange);
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.chart?.resize);
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 改为纵向布局 */
  
}

.map-title {
  cursor: pointer;
  font-size: 32px; /* 调整字体大小 */
  font-weight: bold;
  color: #fff;
  text-align: center; /* 竖排文字居中 */
  margin: 10px auto; /* 上下居中对齐，左右自动居中 */
}

.map {
  flex: 1;
  width: 100%;
  height: calc(100% - 60px); /* 剩余高度分配给地图 */
}
</style>

