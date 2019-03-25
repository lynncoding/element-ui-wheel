<template>
  <div :class="['ly-tag', type]">
    <slot></slot>
    <span v-if="closable" class="ly-tag-close"></span>
  </div>
</template>
<script>
export default {
  name: 'LyTag',
  props: {
    type: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less">
.ly-tag {
  background-color: rgba(64,158,255,.1);
  display: inline-block;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64,158,255,.2);
  white-space: nowrap;
  &.success {
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  &.info {
    background-color: rgba(144,147,153,.1);
    border-color: rgba(144,147,153,.2);
    color: #909399;
  }
  &.warning {
    background-color: rgba(230,162,60,.1);
    border-color: rgba(230,162,60,.2);
    color: #e6a23c;
  }
  &.danger {
    background-color: rgba(245,108,108,.1);
    border-color: rgba(245,108,108,.2);
    color: #f56c6c;
  }
  .ly-tag-close {
    color: #409eff;
    width: 16px;
    display: inline-block;
    cursor: pointer;
    height: 16px;
    border-radius: 50%;
  }
  .ly-tag-close:after {
    content: 'x'
  }
  .ly-tag-close:hover {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
