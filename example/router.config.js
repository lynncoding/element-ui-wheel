import app from './index.vue'
import example from './pages/example.vue'
import tag from './pages/tag.vue'
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
    },
    {
      name: '标签',
      path: '/tag',
      component: tag
    }
  ]
}
