import example from '../packages/example'
import LyTag from '../packages/tag'
import LyPercentageBar from '../packages/percentage-bar'
// --------------- 导入组件（请不要修改此部分代码） ---------------
// -----------------------------------------------------------

const components = [
  // --------------- 添加组件到数组中（请不要修改此部分代码） ---------
  // -----------------------------------------------------------
  example,
  LyTag,
  LyPercentageBar
]

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

let result = {
  version: '1.0.0',
  install
}

components.forEach(row => {
  result[row.name] = row
})

module.exports = result
