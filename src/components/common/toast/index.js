import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  /*1.创建组件构造器*/
  const toastConstructor = Vue.extend(Toast)
  /*2.根据组件构造器创建一个组件*/
  const toast = new toastConstructor()
  /*3.手动挂载组件模板*/
  toast.$mount(document.createElement('div'))
  /*4.拿到toast的模板添加到body中*/
  document.body.appendChild(toast.$el)
  /*5.*/
  Vue.prototype.$toast = toast
}

export default  obj
