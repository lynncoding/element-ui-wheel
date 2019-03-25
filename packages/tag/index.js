import LyTag from './src'

/* istanbul ignore next */
LyTag.install = function (Vue) {
  Vue.component(LyTag.name, LyTag)
}

export default LyTag
