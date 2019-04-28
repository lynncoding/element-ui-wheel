<template>
  <div>
    <p>这是子组件</p>
    <slot :user="user"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        firstName: 'lynn',
        lastName: 'yang'
      }
    }
  }
}
</script>

<style lang="less">
  .hello-world
  {
    font-size: 22px;
  }
</style>
