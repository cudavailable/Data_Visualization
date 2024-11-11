<template>
  <div class="province-info">
    <h2>{{ provinceName || '未选择省份' }}</h2>
    <p v-if="gdpValue">GDP总量: {{ gdpValue }} 亿元</p>
    <p v-else>GDP数据不可用</p>
  </div>
</template>

<script>
export default {
  name: 'ProvinceMap',
  props: {
    provinceName: {
      type: String,
      required: true,
    },
    gdpValue: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
.province-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-size: 18px;
  color: #333;
}

.province-info h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.province-info p {
  margin: 0;
  font-size: 18px;
  color: #555;
}
</style>
