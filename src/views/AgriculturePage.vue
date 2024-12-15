<template>
  <div class="section">
    <div class="card">
      <div class="header-container">
        <h3>近十年，中国农业实现了跨越式发展，尽管农村常住人口减少，但农业生产总值上升，<br>
        并且农业受灾面积不断减少，粮食产量连续多年稳定增长，<br>
        农业机械化水平显著提升，农产品也通过网络广泛销售。</h3>
        <button class="other-btn" @click="showOtherPopup">查看粮食产量信息</button>
      </div>
      <div class="container-wrapper">
        <div class="container">
          <RadarChart />
          <div class="txt-container">
            <button class="arrow up" @mouseenter="showPopup('近十年来,中国农业生产总值以年均约4.1%的增速稳定增长,从2013年的48342万亿元提升至2023年的87037万亿元,增幅接近180%。这种增长主要得益于科技赋能、农业现代化水平提升以及市场化改革带来的效率提升和农产品价值链优化。', 'nongye1')"
            @mouseleave="closePopup">▲ 上升180%</button>
            <button class="arrow down" @mouseenter="showPopup('近十年,中国农村常住人口从2013年的6.3亿人下降至2023年的4.77亿人,减少约25%。这种趋势反映了城镇化进程的加速，大量农村人口转移至城市寻求更高收入和生活条件的改善。', 'nongye2')"
            @mouseleave="closePopup">▼ 下降25%</button>
          </div>
        </div>
        <div class="container">
          <RadarChart2 />
          <div class="txt-container">
            <button class="arrow up" @mouseenter="showPopup('中国农产品受灾面积在过去十年间总体呈现下降趋势,从2013年的4721公顷减少到2023年的1207公顷,下降近75%。这得益于防灾减灾技术的进步和农业基础设施的完善，有效降低了自然灾害对农业的影响。', 'nongye3')"
            @mouseleave="closePopup">▼ 下降75%</button>
            <button class="arrow down" @mouseenter="showPopup('从2013年到2023年,中国粮食产量经历了波动变化。2013年的粮食产量为49804.23万吨,随后逐年增加,尤其在2019年达到65789.22万吨的高峰。整体来看,粮食产量在这十年间呈现上升趋势。', 'nongye4')"
            @mouseleave="closePopup">▲ 上升137%</button>
          </div>
        </div>
        <div class="container">
          <RadarChart3 />
          <div class="txt-container">
            <button class="arrow up" @mouseenter="showPopup('农业机械化逐渐普及，覆盖范围不断扩大。现代化设备的广泛应用不仅提高了耕作效率，还降低了生产成本，推动了农业生产方式的转型。这一进程改善了农业的劳动强度和生产效益，促进了农业现代化进程。', 'nongye5')"
            @mouseleave="closePopup">▲ 上升203%</button>
            <button class="arrow down" @mouseenter="showPopup('农产品网络销售逐渐普及，尤其随着电商平台的发展，越来越多的农民和农业企业通过线上渠道直接面向消费者。通过网络销售，农产品能够更快捷地进入市场，减少中间环节，提高了农民收入，也拓宽了消费者的选择范围。', 'nongye6')"
            @mouseleave="closePopup">▲ 上升2950%</button>
          </div>
        </div>
      </div>

      <!-- 弹窗容器 -->
      <div v-if="popupVisible" class="popup">
        <div class="popup-content">
          <span class="close-btn" @click="closePopup">&times;</span>
          <div class="popup-left">
            <img :src="popupImagePath" alt="农业图片" class="popup-image" />
          </div>
          <div class="popup-right">
            <p>{{ popupMessage }}</p>
          </div>
        </div>
      </div>

      <!-- 其他弹窗容器 -->
      <div v-if="otherPopupVisible" class="popup">
        <div class="other-popup-content">
          <span class="close-btn" @click="closeOtherPopup">&times;</span>
          <div class="other-popup-left">
            <FoodProductionChart />
          </div>
          <div class="other-popup-right">
            <p>左图动态展示了中国近10年各省的粮食产量。每个气泡代表一个省份。<br><br>气泡的颜色是按照地区对各省进行的划分。气泡的大小是人均粮食产量。<br><br>
              由图可知,近10年我国粮食产量总体呈上升趋势,但也有部分城市产量下降。<br><br>并且相同颜色的气泡往往数值相近,具有聚集性的特征。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from '../components/RadarChart.vue';
import RadarChart2 from '../components/RadarChart2.vue';
import RadarChart3 from '../components/RadarChart3.vue';
import FoodProductionChart from '../components/FoodProductionChart.vue';

// 直接引入图片
import nongye1 from '@/assets/images/nongye1.jpg';
import nongye2 from '@/assets/images/nongye2.jpg';
import nongye3 from '@/assets/images/nongye3.jpg';
import nongye4 from '@/assets/images/nongye4.jpg';
import nongye5 from '@/assets/images/nongye5.jpg';
import nongye6 from '@/assets/images/nongye6.jpg';

export default {
  name: 'GlobalRolePage',
  components: {
    RadarChart,
    RadarChart2,
    RadarChart3,
    FoodProductionChart
  },
  data() {
    return {
      popupVisible: false,
      popupMessage: '',
      popupImagePath: '',
      otherPopupVisible: false,
      // 把图片路径放入 data 中
      images: {
        nongye1,
        nongye2,
        nongye3,
        nongye4,
        nongye5,
        nongye6,
      },
    };
  },
  methods: {
    // showPopup(message, imagePath) {
    //   if (!this.popupVisible) {
    //     this.popupMessage = message;
    //     this.popupImagePath = imagePath;
    //     this.popupVisible = true;
    //   }
    // },
    showPopup(message, imageKey) {
      if (!this.popupVisible) {
        this.popupMessage = message;
        this.popupImagePath = this.images[imageKey];
        this.popupVisible = true;
      }
    },
    closePopup() {
      if (this.popupVisible) {
        this.popupVisible = false;
      }
    },
    showOtherPopup() {
      this.otherPopupVisible = true;
    },
    closeOtherPopup() {
      this.otherPopupVisible = false;
    },
  },
};
</script>

<style scoped>
.section {
  height:90vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-container {
  width: 80%;
  height: 15%;
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header-container h3 {
  margin: 10px;
  padding: 20px;
  line-height: 1.5;
  color: #ffffff;
}

.other-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 8px 16px;
  background-color: #95BE54;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.other-btn:hover {
  opacity: 0.8;
}

.container-wrapper {
  width: 100%;
  height: 70%;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
}

.container {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  position: relative;
  border-radius: 20px; 
}

.txt-container {
  width: 100%;
  height: 30%;  
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  text-align: center;
  position: relative;
  font-size: 16px; 
}

.arrow {
  position: relative;
  z-index: 1;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}

button.arrow {
  font-weight: bold;
  padding: 8px 16px;
  margin: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
}

button.up {
  background-color: #DBCC57;
  color: white;
}

button.down {
  background-color: #95BE54;
  color: white;
}

button.arrow:hover {
  opacity: 0.8;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
}

.popup-content {
  width: 60%;
  height: 40%;
  background-color: #f0f5ef;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  position: relative;
  z-index: 1001;
  align-items: center;
  pointer-events: auto;
}

.popup-left {
  width: 40%;
  padding: 30px;
}

.popup-right {
  width: 60%;
  font-size: 16px;
  padding: 20px;
}

.popup-image {
  width: 80%;
  max-height: 80%;
  border-radius: 5px;
  object-fit: cover;
  opacity: 0.8;
}

.popup-content p {
  font-size: 20px;
  line-height: 1.5;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  color: #aaa;
}

.close-btn:hover {
  color: #000;
}

.other-popup-content {
  display: flex;
  width: 70%;
  height: 70%;
  background-color: #f0f5ef;
  padding: 30px;
  border-radius: 20px;
  text-align: left;
  position: relative;
  pointer-events: auto;
}

.other-popup-left {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.other-popup-right {
  width: 40%;
  padding: 20px;
}

.other-popup-right p {
  font-size: 20px;
  line-height: 1.5;
}
</style>