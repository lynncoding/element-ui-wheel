
import example from './src'
example.install = function (Vue) {
  Vue.component(example.name, example)
}

export default example
