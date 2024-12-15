<template>
  <div class="explain">
    <h3>工业增加值</h3>
    <h4>从2013年到2023年，中国的工业增加值总体呈现持续增长的趋势。在这段时间内中国的工业经济保持了稳定的增长势头，反映了国家在工业领域的持续投入和发展。</h4>
  </div>
  <div ref="chartDom" id="chartDom" style="width: 100%;height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'IndustryAdded',
  data() {
    return {
      yearEvents: {
        2013: `▶4月，"工业4.0"概念在德国汉诺威工博会正式推出，引发了全球
    新一轮的工业变革竞赛，引燃了工业互联网在中国落地的火种
        ▶12月，工业和信息化部向中国移动、中国电信、中国联通颁发了
        三张TD-LTE制式的4G牌照，中国正式进入4G时代`,
        2014: `▶制造强国战略揭开新篇章
        ▶智能制造成为两化深度融合主攻方向
        ▶新常态下产业结构调整步伐加快`,
        2015: `▶5月，国务院印发《中国制造2025》，提出了中国
        实施制造强国战略第一个十年的行动纲领`,
        2016: `▶《中国制造2025》由文件编制进入全面实施新阶段
        ▶一批重大标志性项目推进实施，高端装备发展取得系列重大突破，一连串"卡脖子"问题得到解决`,
        2017: `▶国家制造业创新体系建设不断完善，工业经济增长稳定，质量和效益明显提升。`,
        2018: `▶国际贸易摩擦加剧，对工业出口产生了一定影响
         ▶国内经济结构调整，传统产业面临众多问题，需要加快淘汰落后产能，推动产业升级
         ▶中国工业经济加快了创新驱动和转型升级的步伐`,
        2019: `▶制造业发展扎实推进，两化融合水平稳步提升
        ▶更大规模减税降费进一步落实，制造业等行业增值税率从16%降至13%`,
        2020: `▶疫情冲击下工业经济遭受重大影响，
        ▶促进了数字化转型的加速推进`,
        2021: `▶3月，"十四五"规划纲要发布，提出深入实施制造强国战略，坚持自主可控、
    安全高效，推进产业基础高级化、产业链现代化。
        ▶5G+工业互联网应用加速推进，全国在建"5G+工业互联网"项目超过1800个，
        覆盖20余个国民经济重要行业。`,
        2022: `▶疫情结束，工业经济企稳回升
        ▶工业投资稳定增长，同比增长10.3%
        ▶出口韧性凸显，工业出口交货值同比增长5.5%
        ▶新动能持续壮大，高技术制造业增加值同比增长7.4%`,
        2023: `▶中国工业经济持续稳定恢复，制造业高端化智能化绿色化发展步伐加快。`
      }
    };
  },
  mounted() {
    const myChart = echarts.init(this.$refs.chartDom);
    myChart.setOption({
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params) => {
          let tar;
          if (params[1] && params[1].value !== '-') {
            tar = params[1];
          } else {
            tar = params[2];
          }
          const year = tar.name;
          const eventDescription = this.yearEvents[year] || '';
          return `${tar.name}<br/>${tar.seriesName} : ${tar.value}<br/>${eventDescription.replace(/\n/g, '<br/>')}`;
        }
      },
      legend: {
        data: ['基数', '增加']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: (function () {
          let list = [];
          for (let i = 1; i <= 11; i++) {
            list.push(2012 + i);
          }
          return list;
        })()
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#ffffff'  // 设置y轴文字为白色
        }
      },
      series: [
        {
          name: '基数',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            color: '#E8F5E9'
          },
          data: [222333.2, 222333.2, 233197.4, 234968.9, 245406.4, 275119.3, 275119.3, 301089.3, 311858.7, 312902.9, 374545.6, 395043.7]
        },
        {
          name: '增加',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          itemStyle: {
            color: '#FFA500'
          },
          data: [0, 10864.2, 1771.5, 10437.5, 29712.9, 0, 25970, 10769.4, 1044.2, 61642.7, 20498.1, 4059.4]
        }
      ]
    });
  }
}
</script>

<style>
.explain {
  flex: 1;
  padding: 10px;
  padding-top: 30px;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 40%;
  color: white; /* 添加这一行来改变文字颜色 */
}

/* 如果需要单独设置标题颜色，可以添加以下样式 */
.explain h3 {
  color: white;
}

.explain h4 {
  color: white;
}
</style>