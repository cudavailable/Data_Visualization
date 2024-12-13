<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>
  
<script>
  import * as echarts from "echarts";
  
  export default {
    name: "Echarts3",
    mounted() {
    var chartDom = this.$refs.chart;  // 使用 Vue 的 ref 获取 DOM
    var myChart = echarts.init(chartDom);

    var option = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
            // ['product', '2019', '2020', '2021', '2022', '2023'],
            // ['第一产业渗透率', 8.2, 8.9, 9.7, 10.5, 10.78],
            // ['第二产业渗透率', 19.5, 21.0, 22.4, 24.0, 25.03],
            // ['第三产业渗透率', 37.8, 40.7, 43.3, 44.7, 45.63],
            // ['总GDP渗透率', 36.2, 38.6, 39.8, 41.5, 42.8]
                ['product', '第一产业渗透率', '第二产业渗透率', '第三产业渗透率', '总GDP渗透率'],
                ['2019', 8.2, 19.5, 37.8, 36.2],
                ['2020', 8.9, 21.0, 40.7, 38.6],
                ['2021', 9.7, 22.4, 43.3, 39.8],
                ['2022', 10.5, 24.0, 44.7, 41.5],
                ['2023', 10.78, 25.03, 45.63, 42.8]
            ]
        },

        xAxis: { type: "category" }, // X 轴
        yAxis: { 
            axisLabel: {
            formatter: '{value}%' // Y 轴百分比格式
            }
        }, // Y 轴
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        // xAxis: [
        //     { type: 'category', gridIndex: 0 },
        //     { type: 'category', gridIndex: 1 }
        // ],
        // yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        // xAxis: { type: 'category' },
        // yAxis: {},
        // series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
        // grid: [{ bottom: '55%' }, { top: '55%' }],
        // series: [
        //     // These series are in the first grid.
        //     { type: 'bar', seriesLayoutBy: 'row' },
        //     { type: 'bar', seriesLayoutBy: 'row' },
        //     { type: 'bar', seriesLayoutBy: 'row' },
        //     { type: 'bar', seriesLayoutBy: 'row' },
        //     // These series are in the second grid.
        //     { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        //     { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        //     { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        //     { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
        //     { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
        // ]
    };

    myChart.setOption(option);
    }
}

</script>

<style scoped>
/* 自定义样式 */
</style>
    