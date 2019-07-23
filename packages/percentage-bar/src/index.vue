<template>
  <div class="ly-precentage-bar">
    <div class="bar-item"
      v-for="(item, index) in data" :key="index"
      :style="{backgroundColor:`${item.color}`, height: `${height}px`, width: `${item.value}%`}">
      <span
        :ref="`tooltip_${index}`"
        class="bar-item-tooltip"
        :style="{backgroundColor:`${item.color}`, borderColor:`${item.color}`, right:`${tooltipStyleRight(index)}` }">{{label(index)}}
      </span>
    </div>
  </div>
</template>
<script>
/**
 * TODO:
 * 根据元素获取width，计算其的right
 * 动画效果，不生硬
 */
export default {
  name: 'LyPercentageBar',
  props: {
    data: { // 数组数值想加为100
      type: Array,
      default: () => [
        {value: 50, color: '#f33f2b'},
        {value: 20, color: '#f76a00'},
        {value: 30, color: '#00a2af'}
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
      right1: '0px'
    }
  },
  computed: {
  },
  methods: {
    tooltipStyleRight (index) {
      // TODO: $nextTick是异步的，写成同步(aysnc/await)的，computed方法失效
      let offset = ''
      this.$nextTick(() => {
        let tooltip = this.$refs['tooltip_' + index] && this.$refs['tooltip_' + index][0]
        offset = Number(tooltip.clientWidth) + 2
      })
      console.log('始终为0的offset', offset)
      return '0px'
    },
    label (currentIndex) {
      let sum = 0
      this.data.forEach((item, index) => {
        if (index <= currentIndex) {
          sum += item.value
        }
      })
      return sum + '%'
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
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 40px;
    font-size: 14px;
    border-radius: 5px;
    padding: 5px;
    color: #ffffff;
    border: 1px solid;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      top: -11px;
      left: 50%;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-bottom-color: inherit;
      transform: translate(-50%, 0);
    }
  }
}
</style>
