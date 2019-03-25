<template>
  <table border="1" width="100%">
    <tr>
      <th>组件名称</th>
      <th>描述</th>
      <th>作者</th>
      <th>更新时间</th>
    </tr>
    <tr v-for="(item, index) in tableData" :key="index">
      <td><a :href="'#' + item.path">{{item.name}}</a></td>
      <td>{{item.description}}</td>
      <td>{{item.auther}}</td>
      <td>{{item.udpateTime}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  data () {
    return {
      components: [
        // --------------- 添加测试页面描述（请不要修改此部分代码） ---------
        // -----------------------------------------------------------
        {
          path: '/example',
          name: 'example',
          title: '示例',
          description: '示例',
          auther: '',
          udpateTime: '2019-03-22 11:22:22'
        },
        {
          path: '/tag',
          name: 'Tag',
          title: '标签',
          description: 'tag',
          auther: '',
          udpateTime: '2019-03-22 11:22:22'
        }
      ]
    }
  },
  computed: {
    tableData () {
      return this.components
    }
  }
}
</script>

<style>

</style>
