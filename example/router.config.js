const app = r => require.ensure([], () => r(require('./index.vue')), 'index')
const example = r => require.ensure([], () => r(require('./pages/example.vue')), 'example')
// --------------- 导入测试页面（请不要修改此部分代码） ------------
// -----------------------------------------------------------
export default {
  routes: [
    // --------------- 添加测试页面路由（请不要修改此部分代码） ---------
    // -----------------------------------------------------------
    {
      name: '首页',
      path: '/',
      component: app
    },
    {
      name: '示例',
      path: '/example',
      component: example
    }
  ]
}
