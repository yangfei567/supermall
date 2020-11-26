import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 添加到事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms的延迟
fastclick.attach(document.body)
    // 使用图片懒加载
Vue.use(VueLazyLoad)

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')