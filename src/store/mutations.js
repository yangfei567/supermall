export default {
    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        // 要放在push前面定义，不然checked不会到state里面，
        // vuex只有state里是响应式
        payload.checked = true

        state.cartList.push(payload)
    }
}