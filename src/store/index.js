import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

//安装vuex
Vue.use(Vuex)

//创建store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations,
    getters,
    actions
})

// 挂载到vue实例上  main.js上
export default store