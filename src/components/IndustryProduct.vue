<template>
  <div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts'; 

export default {
  name: 'IndustryProduct',
  mounted() {
    const myChart = echarts.init(this.$refs.chartDom); 
    myChart.setOption({
		backgroundColor: '#fff',
		  title: {
		    subtext: '2022年工业产品产量',
		    left: 'center'
		  },
		  series: [
		    {
		      type: 'sankey',
		      left: 50.0,
		      top: 20.0,
		      right: 150.0,
		      bottom: 25.0,
		      data: [
		        {
		          name: '原盐',
		          itemStyle: {
		            color: '#f18bbf',
		            borderColor: '#f18bbf'
		          }
		        },
		        {
		          name: '精制食用植物油',
		          itemStyle: {
		            color: '#0078D7',
		            borderColor: '#0078D7'
		          }
		        },
		        {
		          name: '成品糖',
		          itemStyle: {
		            color: '#3891A7',
		            borderColor: '#3891A7'
		          }
		        },
		        {
		          name: '罐头',
		          itemStyle: {
		            color: '#0037DA',
		            borderColor: '#0037DA'
		          }
		        },
		        {
		          name: '啤酒',
		          itemStyle: {
		            color: '#C0BEAF',
		            borderColor: '#C0BEAF'
		          }
		        },
		        {
		          name: '卷烟',
		          itemStyle: {
		            color: '#EA005E',
		            borderColor: '#EA005E'
		          }
		        },
		        {
		          name: '纱产量',
		          itemStyle: {
		            color: '#D13438',
		            borderColor: '#D13438'
		          }
		        },
		        {
		          name: '布产量',
		          itemStyle: {
		            color: '#567C73',
		            borderColor: '#567C73'
		          }
		        },
		        {
		          name: '机制纸及纸板',
		          itemStyle: {
		            color: '#9ed566',
		            borderColor: '#9ed566'
		          }
		        },
		        {
		          name: '硫酸',
		          itemStyle: {
		            color: '#2BCC7F',
		            borderColor: '#2BCC7F'
		          }
		        },
		        {
		          name: '烧碱',
		          itemStyle: {
		            color: '#809B48',
		            borderColor: '#809B48'
		          }
		        },
		        {
		          name: '纯碱',
		          itemStyle: {
		            color: '#9B2D1F',
		            borderColor: '#9B2D1F'
		          }
		        },
		        {
		          name: '乙烯',
		          itemStyle: {
		            color: '#604878',
		            borderColor: '#604878'
		          }
		        },
		        {
		          name: '合成氨',
		          itemStyle: {
		            color: '#A5644E',
		            borderColor: '#A5644E'
		          }
		        },
		        {
		          name: '农用氮、磷、钾化肥',
		          itemStyle: {
		            color: '#2D3F3A',
		            borderColor: '#2D3F3A'
		          }
		        },
		        {
		          name: '氮肥',
		          itemStyle: {
		            color: '#761721',
		            borderColor: '#761721'
		          }
		        },
		        {
		          name: '磷肥',
		          itemStyle: {
		            color: '#B1BADD',
		            borderColor: '#B1BADD'
		          }
		        },
		        {
		          name: '化学农药原药',
		          itemStyle: {
		            color: '#B0CCB0',
		            borderColor: '#B0CCB0'
		          }
		        },
		        {
		          name: '初级形态的塑料产量',
		          itemStyle: {
		            color: '#8164A3',
		            borderColor: '#8164A3'
		          }
		        },
		        {
		          name: '合成洗涤剂',
		          itemStyle: {
		            color: '#8E562E',
		            borderColor: '#8E562E'
		          }
		        },
		        {
		          name: '化学药品原药',
		          itemStyle: {
		            color: '#C1504D',
		            borderColor: '#C1504D'
		          }
		        },
		        {
		          name: '中成药',
		          itemStyle: {
		            color: '#CCAF0A',
		            borderColor: '#CCAF0A'
		          }
		        },
		        {
		          name: '化学纤维',
		          itemStyle: {
		            color: '#956251',
		            borderColor: '#956251'
		          }
		        },
		        {
		          name: '橡胶轮胎外胎',
		          itemStyle: {
		            color: '#C17529',
		            borderColor: '#C17529'
		          }
		        },
		        {
		          name: '水泥',
		          itemStyle: {
		            color: '#CEC597',
		            borderColor: '#CEC597'
		          }
		        },
		        {
		          name: '平板玻璃',
		          itemStyle: {
		            color: '#9F2936',
		            borderColor: '#9F2936'
		          }
		        },
		        {
		          name: '生铁',
		          itemStyle: {
		            color: '#ac7430',
		            borderColor: '#ac7430'
		          }
		        },
		        {
		          name: '粗钢',
		          itemStyle: {
		            color: '#00BCF2',
		            borderColor: '#00BCF2'
		          }
		        },
		        {
		          name: '钢材',
		          itemStyle: {
		            color: '#CD7B38',
		            borderColor: '#CD7B38'
		          }
		        },
		        {
		          name: '重轨',
		          itemStyle: {
		            color: '#424242',
		            borderColor: '#424242'
		          }
		        },
		        {
		          name: '大型型钢',
		          itemStyle: {
		            color: '#f63185',
		            borderColor: '#f63185'
		          }
		        },
		        {
		          name: '中小型型钢',
		          itemStyle: {
		            color: '#9CBC59',
		            borderColor: '#9CBC59'
		          }
		        },
		        {
		          name: '棒材',
		          itemStyle: {
		            color: '#4F4BD9',
		            borderColor: '#4F4BD9'
		          }
		        },
		        {
		          name: '钢筋',
		          itemStyle: {
		            color: '#3EC562',
		            borderColor: '#3EC562'
		          }
		        },
		        {
		          name: '线材',
		          itemStyle: {
		            color: '#F06F2E',
		            borderColor: '#F06F2E'
		          }
		        },
		        {
		          name: '特厚板',
		          itemStyle: {
		            color: '#C3986D',
		            borderColor: '#C3986D'
		          }
		        },
		        {
		          name: '厚钢板',
		          itemStyle: {
		            color: '#4D291C',
		            borderColor: '#4D291C'
		          }
		        },
		        {
		          name: '中厚宽钢带',
		          itemStyle: {
		            color: '#009c7a',
		            borderColor: '#009c7a'
		          }
		        },
		        {
		          name: '热轧薄宽钢带',
		          itemStyle: {
		            color: '#986F0B',
		            borderColor: '#986F0B'
		          }
		        },
		        {
		          name: '冷轧薄宽钢带',
		          itemStyle: {
		            color: '#3C8EA4',
		            borderColor: '#3C8EA4'
		          }
		        },
		        {
		          name: '镀层板',
		          itemStyle: {
		            color: '#4F82BE',
		            borderColor: '#4F82BE'
		          }
		        },
		        {
		          name: '十种有色金属',
		          itemStyle: {
		            color: '#D38017',
		            borderColor: '#D38017'
		          }
		        },
		        {
		          name: '精炼铜',
		          itemStyle: {
		            color: '#A8CDD7',
		            borderColor: '#A8CDD7'
		          }
		        },
		        {
		          name: '原铝(电解铝)',
		          itemStyle: {
		            color: '#7A072D',
		            borderColor: '#7A072D'
		          }
		        },
		        {
		          name: '氧化铝',
		          itemStyle: {
		            color: '#859599',
		            borderColor: '#859599'
		          }
		        },
		        {
		          name: '发动机',
		          itemStyle: {
		            color: '#84AA33',
		            borderColor: '#84AA33'
		          }
		        },
		        {
		          name: '金属切削机床',
		          itemStyle: {
		            color: '#ff8b67',
		            borderColor: '#ff8b67'
		          }
		        },
		        {
		          name: '矿山专用设备',
		          itemStyle: {
		            color: '#1B587C',
		            borderColor: '#1B587C'
		          }
		        },
		        {
		          name: '炼油、化工生产专用设备',
		          itemStyle: {
		            color: '#A19574',
		            borderColor: '#A19574'
		          }
		        },
		        {
		          name: '大中型拖拉机',
		          itemStyle: {
		            color: '#918485',
		            borderColor: '#918485'
		          }
		        },
		        {
		          name: '铁路客车',
		          itemStyle: {
		            color: '#FFA98C',
		            borderColor: '#FFA98C'
		          }
		        },
		        {
		          name: '铁路货车',
		          itemStyle: {
		            color: '#B0E3C0',
		            borderColor: '#B0E3C0'
		          }
		        },
		        {
		          name: '汽车',
		          itemStyle: {
		            color: '#4BADC7',
		            borderColor: '#4BADC7'
		          }
		        },
		        {
		          name: '轿车',
		          itemStyle: {
		            color: '#BA144C',
		            borderColor: '#BA144C'
		          }
		        },
		        {
		          name: '客车',
		          itemStyle: {
		            color: '#F0A22E',
		            borderColor: '#F0A22E'
		          }
		        },
		        {
		          name: '载货汽车',
		          itemStyle: {
		            color: '#A28E6A',
		            borderColor: '#A28E6A'
		          }
		        },
		        {
		          name: '摩托车整车',
		          itemStyle: {
		            color: '#9F413E',
		            borderColor: '#9F413E'
		          }
		        },
		        {
		          name: '纺织',
		          itemStyle: {
		            color: '#40699D',
		            borderColor: '#40699D'
		          }
		        },
		        {
		          name: '两轮脚踏自行车',
		          itemStyle: {
		            color: '#989391',
		            borderColor: '#989391'
		          }
		        },
		        {
		          name: "发电机组",
		          itemStyle: {
		            color: '#886CE4',
		            borderColor: '#886CE4'
		          }
		        },
		        {
		          name: '家用电冰箱',
		          itemStyle: {
		            color: '#964305',
		            borderColor: '#964305'
		          }
		        },
		        {
		          name: '房间空气调节器',
		          itemStyle: {
		            color: '#485FB5',
		            borderColor: '#485FB5'
		          }
		        },
		        {
		          name: '家用电风扇',
		          itemStyle: {
		            color: '#87a0c7',
		            borderColor: '#87a0c7'
		          }
		        },
		        {
		          name: '家用吸排油烟机',
		          itemStyle: {
		            color: '#FFE2C5',
		            borderColor: '#FFE2C5'
		          }
		        },
		        {
		          name: '家用洗衣机',
		          itemStyle: {
		            color: '#40699D',
		            borderColor: '#40699D'
		          }
		        },
		        {
		          name: '家用吸尘器',
		          itemStyle: {
		            color: '#7e7eb2',
		            borderColor: '#7e7eb2'
		          }
		        },
		        {
		          name: '程控交换机',
		          itemStyle: {
		            color: '#587C7D',
		            borderColor: '#587C7D'
		          }
		        },
		        {
		          name: '移动通信手持机',
		          itemStyle: {
		            color: '#F07F09',
		            borderColor: '#F07F09'
		          }
		        },
		        {
		          name: '微型计算机设备',
		          itemStyle: {
		            color: '#E3008C',
		            borderColor: '#E3008C'
		          }
		        },
		        {
		          name: '笔记本计算机',
		          itemStyle: {
		            color: '#4E8542',
		            borderColor: '#4E8542'
		          }
		        },
		        {
		          name: '显示器',
		          itemStyle: {
		            color: '#B58B80',
		            borderColor: '#B58B80'
		          }
		        },
		        {
		          name: '集成电路',
		          itemStyle: {
		            color: '#4dc0a6',
		            borderColor: '#4dc0a6'
		          }
		        },
		        {
		          name: '彩色电视机',
		          itemStyle: {
		            color: '#6A5286',
		            borderColor: '#6A5286'
		          }
		        },
		        {
		          name: '组合音响',
		          itemStyle: {
		            color: '#F89746',
		            borderColor: '#F89746'
		          }
		        },
		        {
		          name: '照相机',
		          itemStyle: {
		            color: '#744DA9',
		            borderColor: '#744DA9'
		          }
		        },
		        {
		          name: '数码照相机',
		          itemStyle: {
		            color: '#E8B7B7',
		            borderColor: '#E8B7B7'
		          }
		        },
		        {
		          name: '烟草',
		          itemStyle: {
		            color: '#C32D2E',
		            borderColor: '#C32D2E'
		          }
		        },
		        {
		          name: '复印和胶版印制设备',
		          itemStyle: {
		            color: '#F0C42E',
		            borderColor: '#F0C42E'
		          }
		        },
		        {
		          name: '食品',
		          itemStyle: {
		            color: '#4E342E',
		            borderColor: '#4E342E'
		          }
		        },
		        {
		          name: '造纸',
		          itemStyle: {
		            color: '#FFA836',
		            borderColor: '#FFA836'
		          }
		        },
		        {
		          name: '金属',
		          itemStyle: {
		            color: '#FF6551',
		            borderColor: '#FF6551'
		          }
		        },
		        {
		          name: '机械设备',
		          itemStyle: {
		            color: '#72A376',
		            borderColor: '#72A376'
		          }
		        },
		        {
		          name: '交通工具',
		          itemStyle: {
		            color: '#69797E',
		            borderColor: '#69797E'
		          }
		        },
		        {
		          name: '电子通信设备',
		          itemStyle: {
		            color: '#e65e20',
		            borderColor: '#e65e20'
		          }
		        },
		        {
		          name: '基础化工原料',
		          itemStyle: {
		            color: '#5ba33b',
		            borderColor: '#5ba33b'
		          }
		        },
		      ],
		      links: [
		        {
		          source: '基础化工原料',
		          target: '原盐',
		          value: 5359.88
		        },
		        {
		          source: '食品',
		          target: '精制食用植物油',
		          value: 4881.87
		        },
		        {
		          source: '食品',
		          target: '成品糖',
		          value: 4881.87
		        },
		        {
		          source: '食品',
		          target: '罐头',
		          value: 889.73
		        },
		        {
		          source: '食品',
		          target: '啤酒',
		          value: 3568.67
		        },
		        {
		          source: '烟草',
		          target: '卷烟',
		          value: 24321.5
		        },
		        {
		          source: '纺织',
		          target: '纱',
		          value: 2720.25
		        },
		        {
		          source: '纺织',
		          target: '布',
		          value: 467.74 
		        },
		        {
		          source: '造纸',
		          target: '机制纸及纸板',
		          value: 13691.36
		        },
		        {
		          source: '基础化工原料',
		          target: '硫酸',
		          value: 9504.58
		        },
		        {
		          source: '基础化工原料',
		          target: '烧碱',
		          value: 3980.53
		        },
		        {
		          source: '基础化工原料',
		          target: "纯碱",
		          value: 2920.21
		        },
		        {
		          source: '基础化工原料',
		          target: '乙烯',
		          value: 2897.51
		        },
		        {
		          source: '基础化工原料',
		          target: '合成氨',
		          value: 5321.01
		        },
		        {
		          source: '基础化工原料',
		          target: '农用氮、磷、钾化肥',
		          value: 5573.38
		        },
		        {
		          source: '基础化工原料',
		          target: '氮肥',
		          value: 3821.29
		        },
		        {
		          source: '基础化工原料',
		          target: '磷肥',
		          value: 984.02
		        },
		        {
		          source: '基础化工原料',
		          target: '化学农药原药',
		          value: 249.71
		        },
		        {
		          source: '基础化工原料',
		          target: '初级形态的塑料产量',
		          value: 11488.1
		        },
		        {
		          source: '基础化工原料',
		          target: '合成橡胶产量',
		          value: 836.21
		        },
		        {
		          source: '基础化工原料',
		          target: '合成洗涤剂',
		          value: 1071.45
		        },
		        {
		          source: '基础化工原料',
		          target: '化学药品原药',
		          value: 370.78
		        },
		        {
		          source: '基础化工原料',
		          target: '中成药',
		          value: 244.66
		        },
		        {
		          source: '基础化工原料',
		          target: '化学纤维',
		          value: 6697.84
		        },
		        {
		          source: '基础化工原料',
		          target: '橡胶轮胎外胎',
		          value: 85919.41
		        },
		        {
		          source: '基础化工原料',
		          target: '水泥',
		          value: 212927.16
		        },
		        {
		          source: '基础化工原料',
		          target: '平板玻璃',
		          value: 101668.65
		        },
		        {
		          source: '金属',
		          target: '生铁',
		          value: 86382.78
		        },
		        {
		          source: '金属',
		          target: '粗钢',
		          value: 101795.9
		        },
		        {
		          source: '金属',
		          target: '钢材',
		          value: 134033.48
		        },
		        {
		          source: '金属',
		          target: '重轨',
		          value: 355.49
		        },
		        {
		          source: '金属',
		          target: '大型型钢',
		          value: 2234.39
		        },
		        {
		          source: '金属',
		          target: '中小型型钢',
		          value: 5206.36
		        },
		        {
		          source: '金属',
		          target: '棒材',
		          value: 8692.32
		        },
		        {
		          source: '金属',
		          target: '钢筋',
		          value: 23762.81
		        },
		        {
		          source: '金属',
		          target: '线材',
		          value: 14136.79
		        },
		        {
		          source: '金属',
		          target: '特厚板',
		          value: 1138.68
		        },
		        {
		          source: '金属',
		          target: '厚钢板',
		          value: 3812.54
		        },
		        {
		          source: '金属',
		          target: '中厚宽钢带',
		          value: 18779.96
		        },
		        {
		          source: '金属',
		          target: '热轧薄宽钢带',
		          value: 10588.16
		        },
		        {
		          source: '金属',
		          target: '冷轧薄宽钢带',
		          value: 6890.68
		        },
		        {
		          source: '金属',
		          target: '镀层板',
		          value: 7299.77
		        },
		        {
		          source: '金属',
		          target: '十种有色金属',
		          value: 6789.82
		        },
		        {
		          source: '金属',
		          target: '精炼铜',
		          value: 1111.53
		        },
		        {
		          source: '金属',
		          target: '原铝(电解铝)',
		          value: 4014.43
		        },
		        {
		          source: '金属',
		          target: '氧化铝',
		          value: 8186.18
		        },
		        {
		          source: '机械设备',
		          target: '发动机',
		          value: 226890.99
		        },
		        {
		          source: '机械设备',
		          target: '金属切削机床',
		          value: 57.33
		        },
		        {
		          source: '机械设备',
		          target: '矿山专用设备',
		          value: 725.66
		        },
		        {
		          source: '机械设备',
		          target: '炼油、化工生产专用设备',
		          value: 152.69
		        },
		        {
		          source: '机械设备',
		          target: '大中型拖拉机',
		          value: 39.95 
		        },
		        {
		          source: '交通工具',
		          target: '铁路客车',
		          value: 473
		        },
		        {
		          source: '交通工具',
		          target: '铁路货车',
		          value: 41285
		        },
		        {
		          source: '交通工具',
		          target: '汽车',
		          value:2713.63
		        },
		        {
		          source: '交通工具',
		          target: '轿车',
		          value: 1044.95
		        },
		        {
		          source: '交通工具',
		          target: '客车',
		          value: 40.65
		        },
		        {
		          source: '交通工具',
		          target: '载货汽车',
		          value: 263.7
		        },
		        {
		          source: '交通工具',
		          target: '摩托车整车',
		          value: 2640.24
		        },
		        {
		          source: '交通工具',
		          target: '两轮脚踏自行车',
		          value: 4351.22
		        },
		        {
		          source: '电子通信设备',
		          target: '发电机组',
		          value: 18371.09
		        },
		        {
		          source: '电子通信设备',
		          target: '家用电冰箱',
		          value: 8664.43
		        },
		        {
		          source: '电子通信设备',
		          target: '房间空气调节器',
		          value: 22247.34
		        },
		        {
		          source: '电子通信设备',
		          target: '家用电风扇',
		          value: 19780.71
		        },
		        {
		          source: '电子通信设备',
		          target: '家用吸排油烟机',
		          value: 3970.66
		        },
		        {
		          source: '电子通信设备',
		          target: '家用洗衣机',
		          value: 9106.32
		        },
		        {
		          source: '电子通信设备',
		          target: '家用吸尘器',
		          value: 10585.09
		        },
		        {
		          source: '电子通信设备',
		          target: '程控交换机',
		          value: 883.8
		        },
		        {
		          source: '电子通信设备',
		          target: '移动通信手持机',
		          value: 156079.96
		        },
		        {
		          source: '电子通信设备',
		          target: '微型计算机设备',
		          value: 43418.16
		        },
		        {
		          source: '电子通信设备',
		          target: '笔记本计算机',
		          value: 22717.83
		        },
		        {
		          source: '电子通信设备',
		          target: '显示器',
		          value: 18230.13
		        },
		        {
		          source: '电子通信设备',
		          target: '集成电路',
		          value: 32418517.21
		        },
		        {
		          source: '电子通信设备',
		          target: '彩色电视机',
		          value: 19578.26
		        },
		        {
		          source: '电子通信设备',
		          target: '组合音响',
		          value: 21915.16
		        },
		        {
		          source: '电子通信设备',
		          target: '照相机',
		          value: 1012.27
		        },
		        {
		          source: '电子通信设备',
		          target: '数码照相机',
		          value: 588.97
		        },
		        {
		          source: '电子通信设备',
		          target: '复印和胶版印制设备',
		          value: 255.18
		        },
		      ],
		      lineStyle: {
		        color: 'source',
		        curveness: 0.5
		      },
		      itemStyle: {
		        color: '#1f77b4',
		        borderColor: '#1f77b4'
		      },
		      label: {
		        color: 'rgba(0,0,0,0.7)',
		        fontFamily: 'Arial',
		        fontSize: 10
		      }
		    }
		  ],
		  tooltip: {
		    trigger: 'item'
		  }
		
		});
	}
}
</script>

<style>
</style>