<template>
	<div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'; 

export default {
  name: 'IndustryProvince',
  mounted() {
    const myChart = echarts.init(this.$refs.chartDom); 
	
	var dataMap = {
		dataGDP : {
	  // 2022年
	  2022: [5115.5,10736.9,47688.4,28649.9,47356.9,755.9,28297,18013.3,5329,13864.3,//东部
	  17134.2,16240.8,13837,13400.2,10974.3,12759.9,//中部
	  16188.7,7966.3,13266,6959,5437.3,6727.8,3274.7,6228.2,1250.3,2084,214.9,9761.2,//西部
	  9929.6,3528.8,4198.3],//东北部
	  // 2021年
	  2021: [5855.1,10676.7,45730.7,26996,45510.3,693.1,26894.1,18292.8,5056.5,14132.3,
	  18113.7,16040.7,13959,12790.8,10862.9,10543.6,
	  15546.1,7940.5,11538.1,6555.8,5231.3,6439.8,2835.4,5057.9,980.2,1762.2,189.9,8443.8,
	  9386.5,3839.5,3751],
	  // 2020 
	  2020: [4255.1,9625.5,38198.1,22627.8,39353.9,557.4,22986.5,15615.5,4296.4,11664.1,
	  17147.2,13174.7,12401.4,11235.5,8991.6,6768.5,
	  13401,6990.8,8740.2,5579.4,4666.2,5172.8,2265.4,3683,792.2,1306.5,158.6,5597.6,
	  7906,3501.2,3121.8],
	  //2019   
	  2019: [4243.3,9565.1,37225.7,22520.9,39141.8,597.9,22755.1,15654,4372.3,11310.4,
	  17938.2,15707.6,11995.8,11181.7,8774.2,6582.7,
	  13165.9,6551.8,9459.9,5400.5,4459,5246.6,2319.8,3831,821.9,1272.5,131.7,5458.6,
	  8052.2,3347.8,3334],
	  //2018     
	  2018: [4139.9,9763.5,36113.2,21621.2,37651.1,582,22613,14781,4276.9,10930.3,
	  17323.4,14849.6,10785.6,10639.8,8264.2,6260.2,
	  12360.1,6268.1,9088.1,4911.7,4165.5,5101.9,2253.4,3758.5,777.5,1191,127,5104.2,
	  7728.7,3287.2,3266.7],
	  //2017   
	  2017: [3885.9,8977.4,33782.6,20038.7,35344,528.3,22515.8,12864.9,3942.5,11015.7,
	  16741.4,13431.6,10709.8,9739.9,7969.6,5887.3,
	  11437.8,6202.4,8232.9,4347.8,3821.4,4680.1,2020.5,3266.1,683.2,1129.2,110.1,4672,
	  7039,3235.2,3226.1],
	  //2016     
	  2016: [3635.5,8045.5,30291.4,18661.5,32677.9,482.5,21696,11712,3773,10755.9,
	  15536.8,12480.5,10540.1,8909.4,7349.3,4441.2,
	  10790.9,5896.2,7226.9,4087.5,3501.7,4307.3,1995.5,2686.8,597.4,925.4,91.6,4357.1,
	  6617.5,3148.2,3367.3],
	  //2015
	  2015:[3458.9,7888.6,28802.6,17803.3,31315.5,492.9,21156.5,11008.7,3815.1,10026.4,
	  14797.6,11677.3,10458.8,8360.5,7026.2,4597.2,
	  10735,5621.5,7103.3,4044.5,3196,4159.1,2031.6,2770.9,516.4,874.7,73.5,4121.2,
	  7115.7,3090.7,3593.9],
	  //2014
	  2014: [3522.8,8099.9,27154.5,16955.3,29497.8,485.9,20178.2,10682.2,3972.4,10056.3,
	  14229.3,11174.2,9859.9,8595.2,6930.7,5769.2,
	  10703.8,5369.9,7632.4,4085,2840.3,4023.8,2374.3,3211.2,504.5,881,69.7,4008.3,
	  7811.3,3065,4527.9],
	  //2013     
	  2013: [3336.6,7765.3,25564.4,15835.8,27142.1,441.6,19475.3,9650.2,3814.7,9847.5,
	  13441.5,10227.4,9179.7,8045.3,6523.3,6113.9,
	  10309,4775.7,7156.9,3903.4,2533.3,3699.7,2262.6,2951.6,502,846.3,63.9,3823.6,
	  8039.6,2852.7,4857.5]
	}
		};
	
	var buildSunburstData = (year) => {
	      let yearData = dataMap.dataGDP[year];
	      return [
	        {
	          name: '东部',
	          children: [
	            { name: '北京', value: yearData[0] },
	            { name: '上海', value: yearData[1] },
	            { name: '江苏', value: yearData[2] },
	            { name: '浙江', value: yearData[3] },
	            { name: '广东', value: yearData[4] },
	            { name: '海南', value: yearData[5] },
	            { name: '山东', value: yearData[6] },
	            { name: '福建', value: yearData[7] },
	            { name: '天津', value: yearData[8] },
	            { name: '河北', value: yearData[9] },
	          ]
	        },
	        {
	          name: '中部',
	          children: [
	            { name: '河南', value: yearData[10] },
	            { name: '湖北', value: yearData[11] },
	            { name: '湖南', value: yearData[12] },
	            { name: '安徽', value: yearData[13] },
	            { name: '江西', value: yearData[14] },
	            { name: '山西', value: yearData[15] }
	          ]
	        },
	        {
	          name: '西部',
	          children: [
	            { name: '四川', value: yearData[16] },
	            { name: '重庆', value: yearData[17] },
	            { name: '陕西', value: yearData[18] },
	            { name: '云南', value: yearData[19] },
	            { name: '贵州', value: yearData[20] },
	            { name: '广西', value: yearData[21] },
	            { name: '甘肃', value: yearData[22] },
	            { name: '新疆', value: yearData[23] },
	            { name: '青海', value: yearData[24] },
	            { name: '宁夏', value: yearData[25] },
	            { name: '西藏', value: yearData[26] },
	            { name: '内蒙古', value: yearData[27] },
	          ]
	        },
	        {
	          name: '东北地区',
	          children: [
	            { name: '辽宁', value: yearData[28] },
	            { name: '吉林', value: yearData[29] },
	            { name: '黑龙江', value: yearData[30] },
	          ],
	        },
	      ];
	    };
	
    myChart.setOption({ 
		//option = {
		      baseOption: {
		        title: {
		          subtext: '数据来自国家统计局'
		        },
		        tooltip: {
		          trigger: 'item',
		          triggerOn: 'mousemove'
		        },
		        visualMap: {
		          type: 'continuous',
		          min: 0,
		          max: 50000,
		          inRange: {
		            color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
		          }
		        },
		        series: {
		          type: 'sunburst',
		          data: buildSunburstData('2022'),
		          radius: [0, '65%'],
		          label: {
		            rotate: 'radial'
		          }
		        },
		        timeline: {
		          axisType: 'category',
		          autoPlay: false,
		          playInterval: 1000,
		          data: [
		            '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', 
		            { value: '2022', tooltip: { formatter: () => '疫情结束' }, symbol: 'diamond', symbolSize: 18 }
		          ],
		          label: {
		            formatter: s => new Date(s).getFullYear()
		          }
		        },
		      },
		      options: [
		        { title: { text: '2013年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2013') } },
		        { title: { text: '2014年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2014') } },
		        { title: { text: '2015年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2015') } },
		        { title: { text: '2016年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2016') } },
		        { title: { text: '2017年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2017') } },
		        { title: { text: '2018年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2018') } },
		        { title: { text: '2019年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2019') } },
		        { title: { text: '2020年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2020') } },
		        { title: { text: '2021年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2021') } },
		        { title: { text: '2022年各省工业增加值（亿元）' }, series: { data: buildSunburstData('2022') } },
		      ]
		    //};
		});
		    // 添加时间线点击事件监听器
		    myChart.on('timelinechanged', function (params) {
		      let currentIndex = params.currentIndex;
		      let year = option.timeline.data[currentIndex];
		      if (typeof year === 'object') year = year.value; // 处理特殊节点
		      myChart.setOption({
		        series: {
		          data: buildSunburstData(year)
		        },
		        title: {
		          text: `${year}年各省工业增加值（亿元）`
		        }
		      });
		    });
	
  }
}
</script>

<style>
</style>