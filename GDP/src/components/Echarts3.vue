<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>
  
<script>
  import * as echarts from "echarts";
  import ecStat from "echarts-stat";
  
  export default {
    name: "Echarts3",
    props: {
      chartTitle: {
        type: String,
        default: "2021年3月各省数字经济指数和融合指数聚类（数据来源：财新智库）",
      },
    },
    mounted() {
      echarts.registerTransform(ecStat.transform.clustering);
      this.initChart();
    },
    methods: {
      initChart() {
        echarts.registerTransform(ecStat.transform.clustering);

        const data = [
          [1483, 52.0, "广东"],
          [1273, 50.5, "江苏"],
          [1107, 40.3, "重庆"],
          [1092, 45.5, "浙江"],
          [1072, 45.4, "四川"],
          [996, 51.3, "山东"],
          [996, 59.4, "陕西"],
          [989, 41.2, "北京"],
          [920, 39.7, "湖北"],
          [884, 46.4, "福建"],
          [855, 43.2, "安徽"],
          [817, 41.8, "上海"],
          [785, 57.9, "辽宁"],
          [738, 40.4, "河南"],
          [733, 39.4, "湖南"],
          [700, 40.2, "江西"],
          [627, 37.7, "天津"],
          [598, 38.4, "河北"],
          [543, 43.8, "吉林"],
          [529, 47.9, "海南"],
          [500, 40.8, "广西"],
          [489, 34.9, "云南"],
          [467, 31.9, "黑龙江"],
          [442, 42.5, "甘肃"],
          [437, 34.0, "山西"],
          [355, 34.7, "内蒙古"],
          [348, 35.8, "新疆"],
          [347, 32.4, "贵州"],
          [230, 29.4, "宁夏"],
          [191, 28.7, "青海"],
          [122, 22.0, "西藏"],
        ];
        const CLUSTER_COUNT = 3;
        const DIMENSION_CLUSTER_INDEX = 3;
        const COLOR_ALL = ["#37A2DA", "#e06343", "#37a354", "#b55dba", "#b5bd48", "#8378EA", "#96BFFF"];
        const pieces = Array.from({ length: CLUSTER_COUNT }, (_, i) => ({
          value: i,
          label: "聚类" + (i+1),
          color: COLOR_ALL[i],
        }));
  
        const chart = echarts.init(this.$refs.chart);
        
        const option = {
          title: {
            text: this.chartTitle, // 使用父级传递的标题
            left: "left",
            top: "top",
            textStyle: {
              fontSize: 19,
              fontWeight: "bold",
            },
          },
          dataset: [
            { source: data },
            {
              transform: {
                type: "ecStat:clustering",
                config: {
                  clusterCount: CLUSTER_COUNT,
                  outputType: "single",
                  outputClusterIndexDimension: DIMENSION_CLUSTER_INDEX,
                  dimensions: [0, 1], // 仅使用第 0 和第 1 维度进行聚类
                },
              },
            },
          ],
          tooltip: {
            position: "bottom",
            formatter: function (params) {
              return `省/直辖市: ${params.data[2]}<br>数字经济指数: ${params.data[0]}<br>融合指数: ${params.data[1]}`;
            }
          },
          visualMap: {
            type: "piecewise",
            top: "middle",
            min: 0,
            max: CLUSTER_COUNT - 1,
            left: 10,
            splitNumber: CLUSTER_COUNT,
            dimension: DIMENSION_CLUSTER_INDEX,
            pieces: pieces,
          },
          grid: {
            left: 120,
          },
          xAxis: {
            name: "数字经济",
          },
          yAxis: {
            name: "融合指数",
          },
          series: {
            type: "scatter",
            encode: { tooltip: [2, 0, 1] },
            symbolSize: 15,
            itemStyle: { borderColor: "#555" },
            datasetIndex: 1,
          },
        };

        chart.setOption(option);
      },
    },
  };
</script>
  
<style scoped>
  /* 图表的样式 */
</style>
  