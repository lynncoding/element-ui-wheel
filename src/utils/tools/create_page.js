const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const humps = require('humps')

console.log('创建组件，请按提示输入')
inquirer.prompt([
  {
    type: 'string',
    name: 'name',
    message: '组件名称',
    validate: function (input) {
      if (!input) {
        return '请输入组件名称'
      } else if (!(new RegExp('^[a-z]+([A-Z][a-z]*)*$').test(input))) {
        return '组件名称格式不正确, 需要以驼峰方式命名， 如: helloWorld'
      } else {
        return true
      }
    }
  },
  {
    type: 'string',
    name: 'title',
    message: '组件标题'
  },
  {
    type: 'string',
    name: 'desc',
    message: '组件描述'
  }
]).then(function (value) {
  // 在指定的位置插入字符串
  let insert = function (str, flg, offset) {
    return str.substr(0, offset) + flg + str.substr(offset, str.length - offset + 1)
  }
  // 获取应用页组件名称
  let getName = function () {
    let pkg = require(path.resolve(__dirname, '../../../package.json'))
    let name = pkg.name
    if (!name || name.indexOf('@jw/') !== 0) {
      throw new Error('无法获取到应用页组件库名称，请检查 package.json 中的 name 属性是否安要求命名： @jw/xxxx')
    }
    return humps.camelize(name.substr(name.indexOf('@jw/') + 4))
  }
  // 修改 index 文件
  let editIndex = function () {
    let findImportPosition = function (code) {
      let str = '// --------------- 导入组件（请不要修改此部分代码） ---------------'
      return code.indexOf(str) + str.length + 1
    }
    let findComponentsPosition = function (code) {
      let str = '// --------------- 添加组件到数组中（请不要修改此部分代码） ---------'
      return code.indexOf(str) + str.length + 1
    }
    let code = fs.readFileSync(path.resolve(__dirname, '../../index.js'), 'utf-8')
    code = insert(code, `import ${value.name} from '../packages/${value.componentFolderName}'\r\n`, findImportPosition(code))
    code = insert(code, `  ${value.name},\r\n`, findComponentsPosition(code))
    fs.writeFileSync(path.resolve(__dirname, '../../index.js'), code, 'utf-8')
  }
  // 添加组件
  let addComponent = function () {
    // 添加目录
    fs.mkdirSync(path.resolve(__dirname, `../../../packages/${value.componentFolderName}`))
    fs.mkdirSync(path.resolve(__dirname, `../../../packages/${value.componentFolderName}/src`))
    // 添加文件 package/xx/index.js
    let source = fs.readFileSync(path.resolve(__dirname, `./templates/index.js.hbs`), 'utf-8')
    let template = handlebars.compile(source)
    let code = template(value)
    fs.writeFileSync(path.resolve(__dirname, `../../../packages/${value.componentFolderName}/index.js`), code, 'utf-8')
    // 添加文件 package/xx/src/index.vue
    source = fs.readFileSync(path.resolve(__dirname, `./templates/index.vue.hbs`), 'utf-8')
    template = handlebars.compile(source)
    code = template(value)
    fs.writeFileSync(path.resolve(__dirname, `../../../packages/${value.componentFolderName}/src/index.vue`), code, 'utf-8')
  }
  // 添加示例
  let addExample = function () {
    let findRouterImportPosition = function (code) {
      let str = '// --------------- 导入测试页面（请不要修改此部分代码） ------------'
      return code.indexOf(str) + str.length + 1
    }
    let findRouterConfigPosition = function (code) {
      let str = '// --------------- 添加测试页面路由（请不要修改此部分代码） ---------'
      return code.indexOf(str) + str.length + 1
    }
    let findComponentDescPosition = function (code) {
      let str = '// --------------- 添加测试页面描述（请不要修改此部分代码） ---------'
      return code.indexOf(str) + str.length + 1
    }
    let code = fs.readFileSync(path.resolve(__dirname, '../../../example/router.config.js'), 'utf-8')
    code = insert(code, `const ${value.name} = r => require.ensure([], () => r(require('./pages/${value.componentFolderName}.vue')), '${value.componentFolderName}')\r\n`, findRouterImportPosition(code))
    code = insert(code, `    { name: '${value.name}', path: '/${value.name}', component: ${value.name} },\r\n`, findRouterConfigPosition(code))
    fs.writeFileSync(path.resolve(__dirname, '../../../example/router.config.js'), code, 'utf-8')
    code = fs.readFileSync(path.resolve(__dirname, '../../../example/index.vue'), 'utf-8')
    code = insert(code, `        { path: '/${value.name}', name: '${value.componentName}', title: '${value.title}', desc: '${value.desc}', auther: '', udpate: '${new Date().toLocaleString()}' },\r\n`, findComponentDescPosition(code))
    fs.writeFileSync(path.resolve(__dirname, '../../../example/index.vue'), code, 'utf-8')
    // 添加文件 package/xx/src/index.vue
    let source = fs.readFileSync(path.resolve(__dirname, `./templates/example.vue.hbs`), 'utf-8')
    let template = handlebars.compile(source)
    code = template(value)
    fs.writeFileSync(path.resolve(__dirname, `../../../example/pages/${value.componentFolderName}.vue`), code, 'utf-8')
  }
  // 首字母大写
  let ucfirst = function (str) {
    str = str.replace(/\b\w+\b/g, function (word) {
      return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    return str
  }
  value.prefix = getName()
  value.humps = humps.decamelize(value.name, { separator: '-' })
  value.componentName = value.prefix + ucfirst(value.name)
  value.componentNameHumps = humps.decamelize(value.componentName, { separator: '-' })
  value.componentFolderName = humps.decamelize(value.name, { separator: '_' })
  // console.log(value)
  addComponent()
  editIndex()
  addExample()
})
