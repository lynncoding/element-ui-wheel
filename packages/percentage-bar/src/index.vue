<template>
  <div class="ly-precentage-bar">
    <div class="bar-item"
      v-for="(item, index) in data" :key="index"
      :style="'background-color:' + item.color+';height:'+ height + 'px;width:'+ item.value + '%'">
      <span class="bar-item-tooltip" :style="'background-color:' + item.color">{{item.value + '%'}}</span>
    </div>
  </div>
</template>
<script>
/**
 * TODO:
 * 动态样式的处理
 */
export default {
  name: 'LyPercentageBar',
  props: {
    data: { // 数组数值想加为100
      type: Array,
      default: () => [
        {value: 50, color: '#f33f2b'},
        {value: 30, color: '#f76a00'},
        {value: 20, color: '#00a2af'}
      ]
    },
    height: {
      type: Number,
      default: 30
    },
    editable: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less">
.ly-precentage-bar {
  .bar-item {
    display: inline-block;
    position: relative;
  }
  .bar-item-tooltip {
    display: block;
    position: absolute;
    top: 40px;
    border-radius: 5px;
    padding: 5px;
    right: 0px;
    color: #ffffff;
    cursor: pointer;
    ::before {
    content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: inherit;
      transform: translate(-50%, 0);
    }
  }
}
</style>
