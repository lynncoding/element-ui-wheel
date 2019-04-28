<template>
  <div>
    <h1 class="hello-world">hello world</h1>
    <current-user v-slot:default="slotProps">{{slotProps.user.firstName}}</current-user>
  </div>
</template>

<script>
import CurrentUser from './currentUser.vue'
export default {
  name: 'helloWorld',
  components: {
    CurrentUser
  },
  data () {
    return {
      data: '父给子的数据'
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
